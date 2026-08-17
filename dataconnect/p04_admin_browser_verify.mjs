import assert from "node:assert/strict";
import { chromium } from "playwright-core";
import authSeed from "./auth_seed.cjs";
import { getDataConnect } from "firebase-admin/data-connect";

const BASE_URL = "http://127.0.0.1/clubox/";
const CLUB_A = "11111111-1111-4111-8111-111111111111";
const CLUB_B = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
const RIVAL_FORM = "10000000-0000-4000-8000-000000000024";
const PASSWORD = "CluboxLocal123!";
const browserErrors = [];

await authSeed.seedAuthUsers();

const browser = await chromium.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: true,
  args: ["--no-first-run", "--disable-gpu"]
});

try {
  const mainContext = await browser.newContext();
  const page = await mainContext.newPage();
  monitorPage(page);
  await login(page, "admin.local@clubox.test", PASSWORD);

  const identity = await page.evaluate(async () => {
    const auth = await import("/clubox/assets/js/auth.js");
    const firebase = await import("/clubox/assets/js/services/firebaseService.js");
    return {
      uid: firebase.getFirebaseAuth().currentUser?.uid,
      status: auth.getAuthState().status,
      userId: auth.getUser()?.id,
      clubId: auth.getClub()?.dataConnectClubId
    };
  });
  assert.deepEqual(identity, {
    uid: "local-test-firebase-uid",
    status: "authenticated",
    userId: "33333333333343338333333333333333",
    clubId: CLUB_A.replaceAll("-", "")
  });
  console.log("OK Login Firebase -> User -> ClubMember -> Club A");

  await goToForms(page);
  const initialIsolation = await crossTenantProbe(page, CLUB_B, RIVAL_FORM);
  assert.equal(initialIsolation.listed, 0);
  assert.equal(initialIsolation.read, 0);
  assert.ok(initialIsolation.rejected.every(Boolean));
  console.log("OK Club A no lista, lee, edita, activa ni inactiva Club B");

  const suffix = Date.now();
  const originalName = `P04 Navegador ${suffix}`;
  const editedName = `${originalName} editado`;
  await createForm(page, originalName);
  let row = await waitForFormRow(page, originalName);
  assert.ok(row.formId && row.publicSlug && row.status.includes("Inactivo"));
  console.log("OK Crear DEPORTISTA desde navegador");

  await page.reload({ waitUntil: "domcontentloaded" });
  row = await waitForFormRow(page, originalName);
  const restored = await page.evaluate(async () => {
    const firebase = await import("/clubox/assets/js/services/firebaseService.js");
    return firebase.getFirebaseAuth().currentUser?.uid || null;
  });
  assert.equal(restored, "local-test-firebase-uid");
  console.log("OK Recarga restaura Firebase Auth y listado privado");

  await editForm(page, originalName, editedName);
  row = await waitForFormRow(page, editedName);
  assert.equal(row.publicSlug.length > 0, true);
  console.log("OK Editar nombre y anadir email desde navegador");

  await clickRowAction(page, editedName, "activate");
  row = await waitForRowStatus(page, editedName, "Activo");
  const publicUrl = `${BASE_URL}#/formulario/${encodeURIComponent(row.publicSlug)}`;
  console.log("OK Publicar formulario desde navegador");

  const publicContext = await browser.newContext();
  const publicPage = await publicContext.newPage();
  monitorPage(publicPage);
  await publicPage.goto(publicUrl, { waitUntil: "domcontentloaded" });
  await publicPage.waitForFunction((name) => document.querySelector("h1")?.textContent === name, editedName);
  assert.equal(await publicPage.$$eval("input[required]", (inputs) => inputs.length), 4);
  console.log("OK URL publica abre sin sesion privada");

  await clickRowAction(page, editedName, "deactivate");
  await waitForRowStatus(page, editedName, "Inactivo");
  await publicPage.reload({ waitUntil: "domcontentloaded" });
  await publicPage.waitForFunction(() => document.body.innerText.includes("Formulario no disponible"));
  console.log("OK Inactivar bloquea URL publica");

  const persisted = await readPersistedForm(row.publicSlug);
  assert.equal(persisted.status, "INACTIVE");
  assert.equal(persisted.name, editedName);
  assert.equal(persisted.clubId, CLUB_A.replaceAll("-", ""));
  assert.ok(persisted.formFields_on_form.some((field) => field.name === "email"));
  console.log("OK SQL Connect confirma club, edicion, campo y estado");

  const rivalContext = await browser.newContext();
  const rivalPage = await rivalContext.newPage();
  monitorPage(rivalPage);
  await login(rivalPage, "admin.rival@clubox.test", PASSWORD);
  await goToForms(rivalPage);
  await waitForFormRow(rivalPage, "Formulario Rival Auth");
  assert.equal(await findFormRow(rivalPage, editedName), null);
  const rivalProbe = await crossTenantProbe(rivalPage, CLUB_A, row.formId);
  assert.equal(rivalProbe.listed, 0);
  assert.equal(rivalProbe.read, 0);
  assert.ok(rivalProbe.rejected.every(Boolean));
  console.log("OK Club B no accede al formulario creado por Club A");

  await page.bringToFront();
  await page.click("#headLogout");
  await page.waitForFunction(() => location.hash === "#/login");
  const signedOut = await page.evaluate(async () => {
    const firebase = await import("/clubox/assets/js/services/firebaseService.js");
    return firebase.getFirebaseAuth().currentUser === null;
  });
  assert.equal(signedOut, true);
  await page.evaluate(() => { location.hash = "#/app/formularios"; });
  await page.waitForFunction(() => location.hash === "#/login");
  assert.equal(await page.$("#formsRoot"), null);
  console.log("OK Logout Firebase bloquea rutas privadas");

  await expectLoginError(page, "nouser.local@clubox.test", PASSWORD, "no tiene acceso configurado");
  await expectLoginError(page, "noclub.local@clubox.test", PASSWORD, "ningun club activo");
  await expectLoginError(page, "admin.local@clubox.test", "incorrecta", "no son correctos");
  console.log("OK Errores de acceso y credenciales son comprensibles");

  assert.deepEqual(browserErrors, []);
  console.log("P04_ADMIN_BROWSER_FLOW_OK");
} finally {
  await browser.close();
}

function monitorPage(page) {
  page.setDefaultTimeout(25000);
  page.on("pageerror", (error) => browserErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error" && !message.text().startsWith("Failed to load resource")) {
      browserErrors.push(message.text());
    }
  });
}

async function login(page, email, password) {
  await page.goto(`${BASE_URL}#/login`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("#loginForm");
  await page.type("#emailInput", email);
  await page.type("#passInput", password);
  await page.click("#loginButton");
  await page.waitForFunction(() => location.hash === "#/app/dashboard" && document.body.innerText.includes("Panel principal"));
}

async function goToForms(page) {
  await page.evaluate(() => { location.hash = "#/app/formularios"; });
  await page.waitForSelector("#formsRoot");
  await page.waitForFunction(() => !document.body.innerText.includes("Cargando formularios..."));
  assert.equal((await page.$eval("#formsRoot", (root) => root.innerText)).includes("No se pudieron cargar"), false);
}

async function createForm(page, name) {
  await page.click("#newForm");
  await page.waitForSelector("#formEditorModal.show");
  await page.type("#formName", name);
  await page.selectOption("#availableField", "phone");
  await page.click("#addField");
  await page.click("#saveForm");
  await waitForSaveResult(page, "Formulario creado correctamente");
}

async function editForm(page, currentName, nextName) {
  await clickRowAction(page, currentName, "edit");
  await page.waitForFunction((name) => (
    document.querySelector("#formEditorModal")?.classList.contains("show")
    && document.querySelector("#formName")?.value === name
  ), currentName);
  await page.$eval("#formName", (input) => { input.value = ""; });
  await page.type("#formName", nextName);
  await page.selectOption("#availableField", "email");
  await page.click("#addField");
  await page.click("#saveForm");
  await waitForSaveResult(page, "Formulario actualizado correctamente");
}

async function waitForSaveResult(page, successText) {
  try {
    await page.waitForFunction((text) => (
      document.body.innerText.includes(text)
      || Boolean(document.querySelector("#formEditorAlert")?.innerText.trim())
    ), successText, { timeout: 12000 });
  } catch {
    const state = await page.evaluate(() => ({
      editorAlert: document.querySelector("#formEditorAlert")?.innerText,
      pageAlert: document.querySelector("#alertRoot")?.innerText,
      saveText: document.querySelector("#saveForm")?.textContent,
      saveDisabled: document.querySelector("#saveForm")?.disabled,
      modalShown: document.querySelector("#formEditorModal")?.classList.contains("show")
    }));
    throw new Error(`FORM_SAVE_TIMEOUT ${JSON.stringify(state)} errors=${JSON.stringify(browserErrors)}`);
  }
  const editorError = await page.$eval("#formEditorAlert", (root) => root.innerText.trim());
  assert.equal(editorError, "", editorError);
}

async function clickRowAction(page, name, action) {
  const clicked = await page.evaluate(({ name, action }) => {
    const row = [...document.querySelectorAll("tbody tr")]
      .find((candidate) => candidate.cells[0]?.textContent.trim() === name);
    const button = row?.querySelector(`button[data-action="${action}"]`);
    button?.click();
    return Boolean(button);
  }, { name, action });
  assert.equal(clicked, true, `Missing ${action} for ${name}`);
}

async function waitForFormRow(page, name) {
  await page.waitForFunction((value) => [...document.querySelectorAll("tbody tr")]
    .some((row) => row.cells[0]?.textContent.trim() === value), name);
  return findFormRow(page, name);
}

async function waitForRowStatus(page, name, status) {
  await page.waitForFunction(({ name, status }) => [...document.querySelectorAll("tbody tr")]
    .some((row) => row.cells[0]?.textContent.trim() === name && row.innerText.includes(status)), { name, status });
  return findFormRow(page, name);
}

async function findFormRow(page, name) {
  return page.evaluate((value) => {
    const row = [...document.querySelectorAll("tbody tr")]
      .find((candidate) => candidate.cells[0]?.textContent.trim() === value);
    if (!row) return null;
    return {
      formId: row.querySelector('[data-form-id]')?.dataset.formId,
      publicSlug: row.querySelector('[data-slug]')?.dataset.slug,
      status: row.innerText
    };
  }, name);
}

async function crossTenantProbe(page, clubId, formId) {
  return page.evaluate(async ({ clubId, formId }) => {
    const data = await import("/clubox/assets/js/services/dataService.js");
    const listed = await data.listForms({ clubId });
    const read = await data.getForm({ clubId, formId });
    const attempts = [
      () => data.updateForm({ clubId, formId, name: "Ataque", formType: "VOLUNTARIO", publicSlug: "ataque-auth" }),
      () => data.activateForm({ clubId, formId }),
      () => data.deactivateForm({ clubId, formId })
    ];
    const rejected = [];
    for (const attempt of attempts) {
      try { await attempt(); rejected.push(false); } catch { rejected.push(true); }
    }
    return {
      listed: listed.data.users?.[0]?.clubMembers_on_user?.length || 0,
      read: read.data.users?.[0]?.clubMembers_on_user?.length || 0,
      rejected
    };
  }, { clubId, formId });
}

async function readPersistedForm(publicSlug) {
  const dataConnect = getDataConnect({ location: "europe-southwest1", serviceId: "clubox-dev-service", connector: "clubox" });
  const query = `query P04Persisted($publicSlug: String!) {
    forms(where: { publicSlug: { eq: $publicSlug } }, limit: 1) {
      name clubId status formFields_on_form { name }
    }
  }`;
  return (await dataConnect.executeGraphqlRead(query, { variables: { publicSlug } })).data.forms[0];
}

async function expectLoginError(page, email, password, expectedText) {
  await page.waitForSelector("#loginForm");
  await page.$eval("#emailInput", (input) => { input.value = ""; });
  await page.$eval("#passInput", (input) => { input.value = ""; });
  await page.type("#emailInput", email);
  await page.type("#passInput", password);
  await page.click("#loginButton");
  await page.waitForFunction((text) => document.querySelector("#alertRoot")?.innerText.includes(text), expectedText);
}
