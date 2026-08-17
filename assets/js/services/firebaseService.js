import { getApp, getApps, initializeApp } from "firebase/app";
import {
  browserLocalPersistence,
  connectAuthEmulator,
  getAuth,
  setPersistence
} from "firebase/auth";
import { connectDataConnectEmulator, getDataConnect } from "firebase/data-connect";
import { firebaseConfig, firebaseEmulators, hasFirebaseConfig } from "../firebaseConfig.js";
import { connectorConfig } from "../generated/esm/index.esm.js";

let firebaseApp;
let firebaseAuth;
let authReady;
let dataConnect;

export function getFirebaseApp() {
  if (firebaseApp) return firebaseApp;
  if (!hasFirebaseConfig()) {
    throw new Error("FIREBASE_CONFIG_MISSING");
  }
  firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
  return firebaseApp;
}

export function getFirebaseAuth() {
  if (firebaseAuth) return firebaseAuth;
  firebaseAuth = getAuth(getFirebaseApp());
  if (firebaseEmulators.auth) {
    connectAuthEmulator(
      firebaseAuth,
      `http://${firebaseEmulators.host}:${firebaseEmulators.authPort}`,
      { disableWarnings: true }
    );
  }
  authReady = setPersistence(firebaseAuth, browserLocalPersistence);
  return firebaseAuth;
}

export async function prepareFirebaseAuth() {
  getFirebaseAuth();
  await authReady;
  return firebaseAuth;
}

export function getFirebaseDataConnect() {
  if (dataConnect) return dataConnect;
  dataConnect = getDataConnect(getFirebaseApp(), connectorConfig);
  if (firebaseEmulators.dataConnect) {
    connectDataConnectEmulator(
      dataConnect,
      firebaseEmulators.host,
      firebaseEmulators.dataConnectPort
    );
  }
  return dataConnect;
}
