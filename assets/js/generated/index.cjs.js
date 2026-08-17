const { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const FormStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
}
exports.FormStatus = FormStatus;

const FormType = {
  DEPORTISTA: "DEPORTISTA",
  SOCIO: "SOCIO",
  TORNEO: "TORNEO",
  EVENTO: "EVENTO",
  VOLUNTARIO: "VOLUNTARIO",
}
exports.FormType = FormType;

const SystemRole = {
  SUPER_ADMIN: "SUPER_ADMIN",
}
exports.SystemRole = SystemRole;

const UserStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
}
exports.UserStatus = UserStatus;

const connectorConfig = {
  connector: 'clubox',
  service: 'clubox-dev-service',
  location: 'europe-southwest1'
};
exports.connectorConfig = connectorConfig;

const createFormRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateForm', inputVars);
}
createFormRef.operationName = 'CreateForm';
exports.createFormRef = createFormRef;

exports.createForm = function createForm(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createFormRef(dcInstance, inputVars));
}
;

const updateFormRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateForm', inputVars);
}
updateFormRef.operationName = 'UpdateForm';
exports.updateFormRef = updateFormRef;

exports.updateForm = function updateForm(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateFormRef(dcInstance, inputVars));
}
;

const resetFormTypeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ResetFormType', inputVars);
}
resetFormTypeRef.operationName = 'ResetFormType';
exports.resetFormTypeRef = resetFormTypeRef;

exports.resetFormType = function resetFormType(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(resetFormTypeRef(dcInstance, inputVars));
}
;

const activateFormRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ActivateForm', inputVars);
}
activateFormRef.operationName = 'ActivateForm';
exports.activateFormRef = activateFormRef;

exports.activateForm = function activateForm(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(activateFormRef(dcInstance, inputVars));
}
;

const deactivateFormRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeactivateForm', inputVars);
}
deactivateFormRef.operationName = 'DeactivateForm';
exports.deactivateFormRef = deactivateFormRef;

exports.deactivateForm = function deactivateForm(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deactivateFormRef(dcInstance, inputVars));
}
;

const getCurrentUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCurrentUser');
}
getCurrentUserRef.operationName = 'GetCurrentUser';
exports.getCurrentUserRef = getCurrentUserRef;

exports.getCurrentUser = function getCurrentUser(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getCurrentUserRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const listFormsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListForms', inputVars);
}
listFormsRef.operationName = 'ListForms';
exports.listFormsRef = listFormsRef;

exports.listForms = function listForms(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listFormsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getFormRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetForm', inputVars);
}
getFormRef.operationName = 'GetForm';
exports.getFormRef = getFormRef;

exports.getForm = function getForm(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getFormRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getFormFieldsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetFormFields', inputVars);
}
getFormFieldsRef.operationName = 'GetFormFields';
exports.getFormFieldsRef = getFormFieldsRef;

exports.getFormFields = function getFormFields(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getFormFieldsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const countFormInscriptionsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'CountFormInscriptions', inputVars);
}
countFormInscriptionsRef.operationName = 'CountFormInscriptions';
exports.countFormInscriptionsRef = countFormInscriptionsRef;

exports.countFormInscriptions = function countFormInscriptions(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(countFormInscriptionsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const createFormFieldRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateFormField', inputVars);
}
createFormFieldRef.operationName = 'CreateFormField';
exports.createFormFieldRef = createFormFieldRef;

exports.createFormField = function createFormField(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createFormFieldRef(dcInstance, inputVars));
}
;

const updateFormFieldRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateFormField', inputVars);
}
updateFormFieldRef.operationName = 'UpdateFormField';
exports.updateFormFieldRef = updateFormFieldRef;

exports.updateFormField = function updateFormField(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateFormFieldRef(dcInstance, inputVars));
}
;

const deleteOptionalFormFieldRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteOptionalFormField', inputVars);
}
deleteOptionalFormFieldRef.operationName = 'DeleteOptionalFormField';
exports.deleteOptionalFormFieldRef = deleteOptionalFormFieldRef;

exports.deleteOptionalFormField = function deleteOptionalFormField(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteOptionalFormFieldRef(dcInstance, inputVars));
}
;

const reorderFormFieldRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ReorderFormField', inputVars);
}
reorderFormFieldRef.operationName = 'ReorderFormField';
exports.reorderFormFieldRef = reorderFormFieldRef;

exports.reorderFormField = function reorderFormField(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(reorderFormFieldRef(dcInstance, inputVars));
}
;

const getPublicFormRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPublicForm', inputVars);
}
getPublicFormRef.operationName = 'GetPublicForm';
exports.getPublicFormRef = getPublicFormRef;

exports.getPublicForm = function getPublicForm(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getPublicFormRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const submitPublicInscriptionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SubmitPublicInscription', inputVars);
}
submitPublicInscriptionRef.operationName = 'SubmitPublicInscription';
exports.submitPublicInscriptionRef = submitPublicInscriptionRef;

exports.submitPublicInscription = function submitPublicInscription(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(submitPublicInscriptionRef(dcInstance, inputVars));
}
;
