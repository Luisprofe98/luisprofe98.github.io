import {
  activateForm as activateFormSdk,
  countFormInscriptions as countInscriptionsSdk,
  createForm as createFormSdk,
  createFormField as createFieldSdk,
  deactivateForm as deactivateFormSdk,
  deleteOptionalFormField as deleteFieldSdk,
  getForm as getFormSdk,
  getFormFields as getFieldsSdk,
  getCurrentUser as getCurrentUserSdk,
  getPublicForm as getPublicFormSdk,
  listForms as listFormsSdk,
  reorderFormField as reorderFieldSdk,
  resetFormType as resetFormTypeSdk,
  submitPublicInscription as submitInscriptionSdk,
  updateForm as updateFormSdk,
  updateFormField as updateFieldSdk
} from "../generated/esm/index.esm.js";
import { QueryFetchPolicy } from "firebase/data-connect";
import { getFirebaseDataConnect } from "./firebaseService.js";

export const getDataService = () => getFirebaseDataConnect();
const serverOnly = Object.freeze({ fetchPolicy: QueryFetchPolicy.SERVER_ONLY });

export const getCurrentUser = () => getCurrentUserSdk(getDataService(), serverOnly);
export const listForms = (vars) => listFormsSdk(getDataService(), vars, serverOnly);
export const getForm = (vars) => getFormSdk(getDataService(), vars, serverOnly);
export const createForm = (vars) => createFormSdk(getDataService(), vars);
export const updateForm = (vars) => updateFormSdk(getDataService(), vars);
export const resetFormType = (vars) => resetFormTypeSdk(getDataService(), vars);
export const activateForm = (vars) => activateFormSdk(getDataService(), vars);
export const deactivateForm = (vars) => deactivateFormSdk(getDataService(), vars);
export const getFormFields = (vars) => getFieldsSdk(getDataService(), vars, serverOnly);
export const createFormField = (vars) => createFieldSdk(getDataService(), vars);
export const updateFormField = (vars) => updateFieldSdk(getDataService(), vars);
export const deleteFormField = (vars) => deleteFieldSdk(getDataService(), vars);
export const reorderFormField = (vars) => reorderFieldSdk(getDataService(), vars);
export const countInscriptions = (vars) => countInscriptionsSdk(getDataService(), vars, serverOnly);
export const getPublicForm = (vars) => getPublicFormSdk(getDataService(), vars, serverOnly);
export const submitPublicInscription = (vars) => submitInscriptionSdk(getDataService(), vars);
