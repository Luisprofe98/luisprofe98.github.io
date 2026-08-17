const assert = require("node:assert/strict");
const { initializeApp } = require("firebase-admin/app");
const { getDataConnect } = require("firebase-admin/data-connect");

const CLUB_A = "11111111-1111-4111-8111-111111111111";
const CLUB_B = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
const RIVAL_FORM = "10000000-0000-4000-8000-000000000024";
const UID_A = "local-test-firebase-uid";
const REQUIRED = ["firstName", "lastName", "birthDate", "nationalId"];
const TYPES = ["DEPORTISTA", "SOCIO", "TORNEO", "EVENTO", "VOLUNTARIO"];
const OPTIONAL = {
  DEPORTISTA: [["phone", "Telefono", "tel"], ["email", "Email", "email"]],
  SOCIO: [["address", "Direccion", "text"]],
  TORNEO: [["phone", "Telefono", "tel"], ["clubOrigin", "Club de origen", "text"], ["teamName", "Equipo", "text"], ["category", "Categoria", "text"], ["notes", "Observaciones", "textarea"]],
  EVENTO: [["organization", "Organizacion", "text"], ["notes", "Observaciones", "textarea"]],
  VOLUNTARIO: [["availability", "Disponibilidad", "textarea"], ["experience", "Experiencia", "textarea"], ["notes", "Observaciones", "textarea"]],
};

initializeApp({ projectId: "clubox-dev" });
const dc = getDataConnect({
  location: "europe-southwest1",
  serviceId: "clubox-dev-service",
  connector: "clubox",
});
const asUser = (uid = UID_A) => ({ impersonate: { authClaims: { sub: uid } } });
const asPublic = { impersonate: { unauthenticated: true } };
const pass = (name) => console.log(`OK ${name}`);

async function expectReject(action, name) {
  let rejected = false;
  try { await action(); } catch { rejected = true; }
  assert.equal(rejected, true, name);
  pass(name);
}

function formsFrom(result) {
  return result.data.users?.[0]?.clubMembers_on_user?.[0]?.club?.forms_on_club || [];
}

async function getForm(formId, clubId = CLUB_A, options = asUser()) {
  const result = await dc.executeQuery("GetForm", { clubId, formId }, options);
  return formsFrom(result)[0] || null;
}

async function targetCounts() {
  const query = `query P03TargetCounts {
    players { _count }
    clubAssociates { _count }
    tournamentEntries { _count }
    eventAttendees { _count }
    volunteers { _count }
  }`;
  return (await dc.executeGraphqlRead(query)).data;
}

async function inscriptions(formId) {
  const query = `query P03Inscriptions($formId: UUID!) {
    inscriptions(where: { formId: { eq: $formId } }) {
      clubId formId status submittedData
    }
  }`;
  return (await dc.executeGraphqlRead(query, { variables: { formId } })).data.inscriptions;
}

async function main() {
  const suffix = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const initialTargets = await targetCounts();

  const listA = await dc.executeQuery("ListForms", { clubId: CLUB_A }, asUser());
  assert.ok(formsFrom(listA).every((form) => form.id !== RIVAL_FORM.replaceAll("-", "")));
  pass("Club A no lista formularios de Club B");

  const crossRead = await dc.executeQuery("GetForm", { clubId: CLUB_B, formId: RIVAL_FORM }, asUser());
  assert.equal(formsFrom(crossRead).length, 0);
  pass("Club A no obtiene formulario privado de Club B");
  await expectReject(
    () => dc.executeMutation("ActivateForm", { clubId: CLUB_B, formId: RIVAL_FORM }, asUser()),
    "Club A no cambia estado de formulario de Club B",
  );
  await expectReject(
    () => dc.executeMutation("UpdateForm", { clubId: CLUB_B, formId: RIVAL_FORM, name: "Ataque", formType: "VOLUNTARIO", publicSlug: "ataque" }, asUser()),
    "Club A no modifica formulario de Club B",
  );
  await expectReject(
    () => dc.executeQuery("ListForms", { clubId: CLUB_A }, asPublic),
    "Visitante no ejecuta operaciones administrativas",
  );

  const names = {
    DEPORTISTA: "Inscripcion Temporada",
    SOCIO: "Alta de socios",
    TORNEO: "Torneo P03",
    EVENTO: "Convocatoria P03",
    VOLUNTARIO: "Convocatoria P03",
  };
  const created = {};
  for (const type of TYPES) {
    const publicSlug = `p03-${type.toLowerCase()}-${suffix}`;
    const response = await dc.executeMutation("CreateForm", {
      clubId: CLUB_A, name: names[type], formType: type, publicSlug,
    }, asUser());
    const formId = response.data.form.id;
    assert.ok(formId && response.data.firstName.id && response.data.nationalId.id);
    created[type] = { formId, publicSlug };

    for (const [index, [name, label, fieldType]] of OPTIONAL[type].entries()) {
      await dc.executeMutation("CreateFormField", {
        clubId: CLUB_A, formId, name, label, fieldType,
        position: REQUIRED.length + index, options: null, config: null,
      }, asUser());
    }
    const form = await getForm(formId);
    assert.equal(form.formType, type);
    assert.equal(form.status, "INACTIVE");
    assert.equal(form.publicSlug, publicSlug);
    assert.deepEqual(form.formFields_on_form.slice(0, 4).map((field) => field.name), REQUIRED);
    assert.ok(form.formFields_on_form.slice(0, 4).every((field) => field.required));
  }
  assert.notEqual(created.EVENTO.publicSlug, created.VOLUNTARIO.publicSlug);
  pass("Cinco tipos creados con UUID servidor, obligatorios, opcionales, tenant y slugs unicos");

  const socio = created.SOCIO;
  await dc.executeMutation("UpdateForm", {
    clubId: CLUB_A, formId: socio.formId, name: "Alta de socios editada",
    formType: "SOCIO", publicSlug: socio.publicSlug,
  }, asUser());
  const editedSocio = await getForm(socio.formId);
  assert.equal(editedSocio.name, "Alta de socios editada");
  assert.equal(editedSocio.publicSlug, socio.publicSlug);
  pass("Edicion persiste y conserva publicSlug");

  const tournament = created.TORNEO;
  let tournamentForm = await getForm(tournament.formId);
  const reversed = [...tournamentForm.formFields_on_form].reverse();
  for (const [position, field] of reversed.entries()) {
    await dc.executeMutation("ReorderFormField", {
      clubId: CLUB_A, formId: tournament.formId, fieldId: field.id, position,
    }, asUser());
  }
  tournamentForm = await getForm(tournament.formId);
  assert.deepEqual(tournamentForm.formFields_on_form.map((field) => field.position), [...reversed.keys()]);
  assert.deepEqual(tournamentForm.formFields_on_form.map((field) => field.name), reversed.map((field) => field.name));
  pass("Reordenacion persiste sin posiciones duplicadas");

  const requiredField = tournamentForm.formFields_on_form.find((field) => field.name === "firstName");
  const phoneField = tournamentForm.formFields_on_form.find((field) => field.name === "phone");
  await expectReject(
    () => dc.executeMutation("DeleteOptionalFormField", { clubId: CLUB_A, formId: tournament.formId, fieldId: requiredField.id }, asUser()),
    "Campo obligatorio no se elimina",
  );
  await dc.executeMutation("DeleteOptionalFormField", {
    clubId: CLUB_A, formId: tournament.formId, fieldId: phoneField.id,
  }, asUser());
  assert.equal((await getForm(tournament.formId)).formFields_on_form.some((field) => field.name === "phone"), false);
  pass("Campo opcional se elimina y persiste");

  await dc.executeMutation("ResetFormType", {
    clubId: CLUB_A, formId: tournament.formId, name: "Torneo convertido a socios",
    formType: "SOCIO", publicSlug: tournament.publicSlug,
  }, asUser());
  tournamentForm = await getForm(tournament.formId);
  assert.equal(tournamentForm.formType, "SOCIO");
  assert.deepEqual(tournamentForm.formFields_on_form.map((field) => field.name).sort(), [...REQUIRED].sort());
  pass("Cambio TORNEO a SOCIO elimina opcionales incompatibles");

  for (const type of TYPES) {
    const item = created[type];
    await dc.executeMutation("ActivateForm", { clubId: CLUB_A, formId: item.formId }, asUser());
    const publicForm = await dc.executeQuery("GetPublicForm", { publicSlug: item.publicSlug }, asPublic);
    assert.equal(publicForm.data.forms.length, 1);
    assert.ok(REQUIRED.every((name) => publicForm.data.forms[0].fields.some((field) => field.name === name && field.required)));
    const data = { firstName: "QA", lastName: type, birthDate: "2000-01-02", nationalId: `P03${type}` };
    for (const field of publicForm.data.forms[0].fields.filter((entry) => !entry.required)) data[field.name] = `valor-${field.name}`;
    await dc.executeMutation("SubmitPublicInscription", { publicSlug: item.publicSlug, submittedData: data }, asPublic);
    const rows = await inscriptions(item.formId);
    assert.ok(rows.some((row) => row.status === "RECIBIDA" && row.clubId === CLUB_A.replaceAll("-", "")));
    assert.ok(rows.every((row) => !Object.keys(row.submittedData).some((key) => ["nombre", "apellidos", "fechaNacimiento", "dni"].includes(key))));
  }
  pass("Envio publico real crea Inscription RECIBIDA para los cinco tipos");

  const event = created.EVENTO;
  const beforeInactive = (await inscriptions(event.formId)).length;
  await dc.executeMutation("DeactivateForm", { clubId: CLUB_A, formId: event.formId }, asUser());
  assert.equal((await dc.executeQuery("GetPublicForm", { publicSlug: event.publicSlug }, asPublic)).data.forms.length, 0);
  await expectReject(
    () => dc.executeMutation("SubmitPublicInscription", { publicSlug: event.publicSlug, submittedData: { firstName: "No" } }, asPublic),
    "Formulario INACTIVE no admite envios",
  );
  assert.equal((await inscriptions(event.formId)).length, beforeInactive);
  await dc.executeMutation("ActivateForm", { clubId: CLUB_A, formId: event.formId }, asUser());
  pass("Inscripciones previas permanecen tras inactivar y reactivar");

  const athlete = created.DEPORTISTA;
  await expectReject(
    () => dc.executeMutation("SubmitPublicInscription", { publicSlug: athlete.publicSlug, submittedData: { firstName: "Faltan" } }, asPublic),
    "Backend rechaza campos obligatorios ausentes",
  );
  await expectReject(
    () => dc.executeMutation("SubmitPublicInscription", { publicSlug: athlete.publicSlug, submittedData: { firstName: "   ", lastName: "Vacio", birthDate: "2000-01-01", nationalId: "X" } }, asPublic),
    "Backend rechaza campos obligatorios vacios",
  );
  await expectReject(
    () => dc.executeMutation("SubmitPublicInscription", { publicSlug: athlete.publicSlug, submittedData: { firstName: "QA", lastName: "Extra", birthDate: "2000-01-01", nationalId: "X", interno: "no" } }, asPublic),
    "Backend rechaza campos desconocidos",
  );

  await dc.executeMutation("SubmitPublicInscription", {
    publicSlug: athlete.publicSlug,
    submittedData: { firstName: "QA2", lastName: "Conteo", birthDate: "2001-02-03", nationalId: "COUNT-P03" },
  }, asPublic);
  const countResult = await dc.executeQuery("CountFormInscriptions", { clubId: CLUB_A, formId: athlete.formId }, asUser());
  const count = formsFrom(countResult)[0].inscriptions_on_form[0]._count;
  assert.equal(count, (await inscriptions(athlete.formId)).length);
  pass("Conteo de listado procede de SQL Connect y coincide con inscripciones persistidas");

  assert.deepEqual(await targetCounts(), initialTargets);
  pass("Envios no crean Player, ClubAssociate, TournamentEntry, EventAttendee ni Volunteer");
  console.log("P03_DATA_CONNECT_QA_OK");
}

main().catch((error) => {
  console.error("P03_DATA_CONNECT_QA_FAILED", error);
  process.exitCode = 1;
});
