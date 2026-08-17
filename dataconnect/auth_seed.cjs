// LOCAL DEVELOPMENT ONLY. These accounts exist only inside Firebase Auth Emulator.
const { getApps, initializeApp } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const { getDataConnect } = require("firebase-admin/data-connect");

const localUsers = Object.freeze([
  { uid: "local-test-firebase-uid", email: "admin.local@clubox.test", password: "CluboxLocal123!", displayName: "Admin Local" },
  { uid: "local-rival-firebase-uid", email: "admin.rival@clubox.test", password: "CluboxLocal123!", displayName: "Admin Rival" },
  { uid: "local-no-club-firebase-uid", email: "noclub.local@clubox.test", password: "CluboxLocal123!", displayName: "No Club Local" },
  { uid: "local-no-user-firebase-uid", email: "nouser.local@clubox.test", password: "CluboxLocal123!", displayName: "No Internal User" }
]);

async function seedAuthUsers() {
  if (!process.env.FIREBASE_AUTH_EMULATOR_HOST) {
    throw new Error("AUTH_EMULATOR_REQUIRED");
  }
  const app = getApps()[0] || initializeApp({ projectId: "clubox-dev" });
  const auth = getAuth(app);
  for (const user of localUsers) {
    try {
      await auth.getUser(user.uid);
      await auth.updateUser(user.uid, user);
    } catch (error) {
      if (error.code !== "auth/user-not-found") throw error;
      await auth.createUser(user);
    }
  }
  await seedDataConnect(app);
  console.log("AUTH_AND_DATA_CONNECT_SEED_OK");
}

async function seedDataConnect(app) {
  if (!process.env.FIREBASE_DATA_CONNECT_EMULATOR_HOST) {
    throw new Error("DATA_CONNECT_EMULATOR_REQUIRED");
  }
  const dataConnect = getDataConnect({
    location: "europe-southwest1",
    serviceId: "clubox-dev-service",
    connector: "clubox"
  }, app);
  await dataConnect.executeGraphql(`mutation LocalAuthSeed @transaction {
    clubA: club_upsert(data: { id: "11111111-1111-4111-8111-111111111111", name: "Clubox Demo", status: ACTIVE })
    clubB: club_upsert(data: { id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa", name: "Clubox Rival", status: ACTIVE })
    userA: user_upsert(data: { id: "33333333-3333-4333-8333-333333333333", firebaseUid: "local-test-firebase-uid", email: "admin.local@clubox.test", name: "Admin Local", systemRole: SUPER_ADMIN, status: ACTIVE })
    userB: user_upsert(data: { id: "13333333-3333-4333-8333-333333333333", firebaseUid: "local-rival-firebase-uid", email: "admin.rival@clubox.test", name: "Admin Rival", status: ACTIVE })
    userNoClub: user_upsert(data: { id: "23333333-3333-4333-8333-333333333333", firebaseUid: "local-no-club-firebase-uid", email: "noclub.local@clubox.test", name: "No Club Local", status: ACTIVE })
    memberA: clubMember_upsert(data: { id: "77777777-7777-4777-8777-777777777777", userId: "33333333-3333-4333-8333-333333333333", clubId: "11111111-1111-4111-8111-111111111111", role: CLUB_ADMIN, status: ACTIVE })
    memberB: clubMember_upsert(data: { id: "17777777-7777-4777-8777-777777777777", userId: "13333333-3333-4333-8333-333333333333", clubId: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa", role: CLUB_ADMIN, status: ACTIVE })
    rivalForm: form_upsert(data: { id: "10000000-0000-4000-8000-000000000024", clubId: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa", name: "Formulario Rival Auth", formType: VOLUNTARIO, status: ACTIVE, publicSlug: "rival-auth-form" })
  }`);
}

if (require.main === module) {
  seedAuthUsers().catch((error) => {
    console.error("AUTH_EMULATOR_SEED_FAILED", error);
    process.exitCode = 1;
  });
}

module.exports = { localUsers, seedAuthUsers };
