const localConfig = Object.freeze({
  apiKey: "clubox-local-api-key",
  appId: "1:000000000000:web:clubox-local",
  projectId: "clubox-dev"
});
const isLocal = ["localhost", "127.0.0.1"].includes(globalThis.location?.hostname);
const runtimeConfig = globalThis.CLUBOX_FIREBASE_CONFIG || (isLocal ? localConfig : {});
const emulatorOverride = globalThis.CLUBOX_FIREBASE_EMULATORS;
const useLocalDefaults = isLocal && emulatorOverride !== false;

export const firebaseConfig = Object.freeze({ ...runtimeConfig });
export const firebaseEmulators = Object.freeze({
  auth: Boolean(emulatorOverride?.auth ?? useLocalDefaults),
  dataConnect: Boolean(emulatorOverride?.dataConnect ?? useLocalDefaults),
  host: emulatorOverride?.host || "127.0.0.1",
  authPort: Number(emulatorOverride?.authPort) || 9099,
  dataConnectPort: Number(emulatorOverride?.dataConnectPort) || 9399
});

export function hasFirebaseConfig() {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.appId && firebaseConfig.projectId);
}
