import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { getCurrentUser } from "./services/dataService.js";
import { getFirebaseAuth, prepareFirebaseAuth } from "./services/firebaseService.js";

const listeners = new Set();
let authState = Object.freeze({
  status: "loading",
  authUid: null,
  session: null,
  error: null
});
let initialization;
let authRevision = 0;

export function initializeAuth() {
  if (initialization) return initialization;
  initialization = new Promise((resolve) => {
    prepareFirebaseAuth().then((firebaseAuth) => {
      let initialStatePending = true;
      const resolveInitial = () => {
        if (!initialStatePending) return;
        initialStatePending = false;
        resolve(authState);
      };
      onAuthStateChanged(
        firebaseAuth,
        (firebaseUser) => resolveFirebaseUser(firebaseUser).finally(resolveInitial),
        (error) => {
          updateState({ status: "error", authUid: null, session: null, error });
          resolveInitial();
        }
      );
    }).catch((error) => {
      updateState({ status: "error", authUid: null, session: null, error });
      resolve(authState);
    });
  });
  return initialization;
}

export async function waitForAuth() {
  await initializeAuth();
  if (authState.status !== "loading") return authState;
  return waitForState((state) => state.status !== "loading");
}

export function observeSession(callback) {
  listeners.add(callback);
  callback(authState);
  initializeAuth();
  return () => listeners.delete(callback);
}

export async function loginUser(emailValue, passwordValue) {
  const email = String(emailValue || "").trim().toLowerCase();
  const password = String(passwordValue || "");
  if (!email || !password) throw authError("AUTH_CREDENTIALS_REQUIRED");
  await initializeAuth();
  const credential = await signInWithEmailAndPassword(getFirebaseAuth(), email, password);
  const state = await waitForState((nextState) => (
    nextState.authUid === credential.user.uid && nextState.status !== "loading"
  ));
  if (state.status === "authenticated") return state.session;
  const error = state.error || authError("CLUBOX_ACCESS_DENIED");
  await logoutUser();
  throw error;
}

export async function logoutUser() {
  await signOut(getFirebaseAuth());
  if (authState.status !== "unauthenticated") {
    await waitForState((state) => state.status === "unauthenticated");
  }
}

export function getAuthState() {
  return authState;
}

export function getSession() {
  return authState.session;
}

export function hasSession() {
  return authState.status === "authenticated" && Boolean(authState.session?.user);
}

export function getUser() {
  return getSession()?.user || null;
}

export function getClub() {
  return getSession()?.activeClub || null;
}

export function getRole() {
  return getClub()?.role || null;
}

export function setClub(clubId) {
  const session = getSession();
  const activeClub = session?.clubList.find((club) => club.dataConnectClubId === clubId);
  if (!activeClub) return false;
  updateState({ ...authState, session: { ...session, activeClub } });
  return true;
}

async function resolveFirebaseUser(firebaseUser) {
  const revision = ++authRevision;
  if (!firebaseUser) {
    updateState({ status: "unauthenticated", authUid: null, session: null, error: null });
    return;
  }
  const previousClubId = authState.session?.activeClub?.dataConnectClubId;
  updateState({ status: "loading", authUid: firebaseUser.uid, session: null, error: null });
  try {
    const result = await getCurrentUser();
    const internalUser = result.data.users?.[0];
    if (!internalUser) throw authError("CLUBOX_USER_NOT_FOUND");
    const clubList = internalUser.clubMembers_on_user
      .filter((membership) => membership.status === "ACTIVE" && membership.club?.status === "ACTIVE")
      .map(mapClub)
      .sort((first, second) => first.dataConnectClubId.localeCompare(second.dataConnectClubId));
    if (!clubList.length) throw authError("CLUBOX_CLUB_NOT_FOUND");
    if (revision !== authRevision) return;
    const activeClub = clubList.find((club) => club.dataConnectClubId === previousClubId) || clubList[0];
    updateState({
      status: "authenticated",
      authUid: firebaseUser.uid,
      error: null,
      session: {
        user: {
          id: internalUser.id,
          firebaseUid: firebaseUser.uid,
          email: internalUser.email,
          nombre: internalUser.name || internalUser.email,
          estado: "activo",
          systemRole: mapSystemRole(internalUser.systemRole)
        },
        clubList,
        activeClub
      }
    });
  } catch (error) {
    if (revision !== authRevision) return;
    updateState({ status: "denied", authUid: firebaseUser.uid, session: null, error });
  }
}

function mapClub(membership) {
  return {
    clubId: membership.club.id,
    dataConnectClubId: membership.club.id,
    nombre: membership.club.name,
    role: membership.role === "CLUB_ADMIN" ? "clubAdmin" : "clubStaff",
    estado: "activo",
    permissionList: []
  };
}

function mapSystemRole(role) {
  return role === "SUPER_ADMIN" ? "superAdmin" : null;
}

function updateState(nextState) {
  authState = Object.freeze(nextState);
  for (const listener of listeners) listener(authState);
}

function waitForState(predicate) {
  if (predicate(authState)) return Promise.resolve(authState);
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      listeners.delete(listener);
      reject(authError("AUTH_STATE_TIMEOUT"));
    }, 15000);
    const listener = (state) => {
      if (!predicate(state)) return;
      clearTimeout(timeoutId);
      listeners.delete(listener);
      resolve(state);
    };
    listeners.add(listener);
  });
}

function authError(code) {
  const error = new Error(code);
  error.code = code;
  return error;
}
