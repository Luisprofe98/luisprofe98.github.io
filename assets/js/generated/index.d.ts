import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;


export enum FormStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
};

export enum FormType {
  DEPORTISTA = "DEPORTISTA",
  SOCIO = "SOCIO",
  TORNEO = "TORNEO",
  EVENTO = "EVENTO",
  VOLUNTARIO = "VOLUNTARIO",
};

export enum SystemRole {
  SUPER_ADMIN = "SUPER_ADMIN",
};

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
};



export interface ActivateFormData {
  form_update?: Form_Key | null;
}

export interface ActivateFormVariables {
  clubId: UUIDString;
  formId: UUIDString;
}

export interface BudgetItem_Key {
  id: UUIDString;
  __typename?: 'BudgetItem_Key';
}

export interface ClubAssociate_Key {
  id: UUIDString;
  __typename?: 'ClubAssociate_Key';
}

export interface ClubMember_Key {
  id: UUIDString;
  __typename?: 'ClubMember_Key';
}

export interface Club_Key {
  id: UUIDString;
  __typename?: 'Club_Key';
}

export interface CountFormInscriptionsData {
  users: ({
    clubMembers_on_user: ({
      club: {
        forms_on_club: ({
          inscriptions_on_form: ({
            _count: number;
          })[];
        })[];
      };
    })[];
  })[];
}

export interface CountFormInscriptionsVariables {
  clubId: UUIDString;
  formId: UUIDString;
}

export interface CreateFormData {
  form: Form_Key;
  firstName: FormField_Key;
  lastName: FormField_Key;
  birthDate: FormField_Key;
  nationalId: FormField_Key;
}

export interface CreateFormFieldData {
  formField_insert: FormField_Key;
}

export interface CreateFormFieldVariables {
  clubId: UUIDString;
  formId: UUIDString;
  name: string;
  label: string;
  fieldType: string;
  position: number;
  options?: unknown | null;
  config?: unknown | null;
}

export interface CreateFormVariables {
  clubId: UUIDString;
  name: string;
  formType: FormType;
  publicSlug: string;
}

export interface DeactivateFormData {
  form_update?: Form_Key | null;
}

export interface DeactivateFormVariables {
  clubId: UUIDString;
  formId: UUIDString;
}

export interface DeleteOptionalFormFieldData {
  formField_delete?: FormField_Key | null;
}

export interface DeleteOptionalFormFieldVariables {
  clubId: UUIDString;
  formId: UUIDString;
  fieldId: UUIDString;
}

export interface Document_Key {
  id: UUIDString;
  __typename?: 'Document_Key';
}

export interface EventAttendee_Key {
  id: UUIDString;
  __typename?: 'EventAttendee_Key';
}

export interface FeeAssignment_Key {
  id: UUIDString;
  __typename?: 'FeeAssignment_Key';
}

export interface FeePlan_Key {
  id: UUIDString;
  __typename?: 'FeePlan_Key';
}

export interface FormField_Key {
  id: UUIDString;
  __typename?: 'FormField_Key';
}

export interface Form_Key {
  id: UUIDString;
  __typename?: 'Form_Key';
}

export interface GetCurrentUserData {
  users: ({
    id: UUIDString;
    name?: string | null;
    email: string;
    systemRole?: SystemRole | null;
    status: UserStatus;
    clubMembers_on_user: ({
      id: UUIDString;
      role: ClubRole;
      status: MembershipStatus;
      club: {
        id: UUIDString;
        name: string;
        status: ClubStatus;
      } & Club_Key;
    } & ClubMember_Key)[];
  } & User_Key)[];
}

export interface GetFormData {
  users: ({
    clubMembers_on_user: ({
      club: {
        forms_on_club: ({
          id: UUIDString;
          name: string;
          formType: FormType;
          status: FormStatus;
          publicSlug: string;
          createdAt: TimestampString;
          updatedAt: TimestampString;
          formFields_on_form: ({
            id: UUIDString;
            name: string;
            label: string;
            fieldType: string;
            required: boolean;
            position: number;
            status: FormStatus;
            options?: unknown | null;
            config?: unknown | null;
          } & FormField_Key)[];
        } & Form_Key)[];
      };
    })[];
  })[];
}

export interface GetFormFieldsData {
  users: ({
    clubMembers_on_user: ({
      club: {
        forms_on_club: ({
          formFields_on_form: ({
            id: UUIDString;
            name: string;
            label: string;
            fieldType: string;
            required: boolean;
            position: number;
            status: FormStatus;
            options?: unknown | null;
            config?: unknown | null;
          } & FormField_Key)[];
        })[];
      };
    })[];
  })[];
}

export interface GetFormFieldsVariables {
  clubId: UUIDString;
  formId: UUIDString;
}

export interface GetFormVariables {
  clubId: UUIDString;
  formId: UUIDString;
}

export interface GetPublicFormData {
  forms: ({
    name: string;
    formType: FormType;
    fields: ({
      name: string;
      label: string;
      inputType: string;
      required: boolean;
      position: number;
    })[];
  })[];
}

export interface GetPublicFormVariables {
  publicSlug: string;
}

export interface Inscription_Key {
  id: UUIDString;
  __typename?: 'Inscription_Key';
}

export interface ListFormsData {
  users: ({
    clubMembers_on_user: ({
      club: {
        forms_on_club: ({
          id: UUIDString;
          name: string;
          formType: FormType;
          status: FormStatus;
          publicSlug: string;
          createdAt: TimestampString;
          updatedAt: TimestampString;
          inscriptions_on_form: ({
            _count: number;
          })[];
        } & Form_Key)[];
      };
    })[];
  })[];
}

export interface ListFormsVariables {
  clubId: UUIDString;
}

export interface Movement_Key {
  id: UUIDString;
  __typename?: 'Movement_Key';
}

export interface Payment_Key {
  id: UUIDString;
  __typename?: 'Payment_Key';
}

export interface PlayerSeason_Key {
  playerId: UUIDString;
  seasonId: UUIDString;
  __typename?: 'PlayerSeason_Key';
}

export interface PlayerTeam_Key {
  playerId: UUIDString;
  teamId: UUIDString;
  __typename?: 'PlayerTeam_Key';
}

export interface Player_Key {
  id: UUIDString;
  __typename?: 'Player_Key';
}

export interface ReorderFormFieldData {
  formField_update?: FormField_Key | null;
}

export interface ReorderFormFieldVariables {
  clubId: UUIDString;
  formId: UUIDString;
  fieldId: UUIDString;
  position: number;
}

export interface ResetFormTypeData {
  formField_deleteMany: number;
  form_update?: Form_Key | null;
}

export interface ResetFormTypeVariables {
  clubId: UUIDString;
  formId: UUIDString;
  name: string;
  formType: FormType;
  publicSlug: string;
}

export interface Season_Key {
  id: UUIDString;
  __typename?: 'Season_Key';
}

export interface StaffTeam_Key {
  staffId: UUIDString;
  teamId: UUIDString;
  __typename?: 'StaffTeam_Key';
}

export interface Staff_Key {
  id: UUIDString;
  __typename?: 'Staff_Key';
}

export interface SubmitPublicInscriptionData {
  inscription_insert: Inscription_Key;
}

export interface SubmitPublicInscriptionVariables {
  publicSlug: string;
  submittedData: unknown;
}

export interface Team_Key {
  id: UUIDString;
  __typename?: 'Team_Key';
}

export interface TournamentEntry_Key {
  id: UUIDString;
  __typename?: 'TournamentEntry_Key';
}

export interface UpdateFormData {
  form_update?: Form_Key | null;
}

export interface UpdateFormFieldData {
  formField_update?: FormField_Key | null;
}

export interface UpdateFormFieldVariables {
  clubId: UUIDString;
  formId: UUIDString;
  fieldId: UUIDString;
  label: string;
  fieldType: string;
  status: FormStatus;
  options?: unknown | null;
  config?: unknown | null;
}

export interface UpdateFormVariables {
  clubId: UUIDString;
  formId: UUIDString;
  name: string;
  formType: FormType;
  publicSlug: string;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

export interface Volunteer_Key {
  id: UUIDString;
  __typename?: 'Volunteer_Key';
}

interface CreateFormRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateFormVariables): MutationRef<CreateFormData, CreateFormVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateFormVariables): MutationRef<CreateFormData, CreateFormVariables>;
  operationName: string;
}
export const createFormRef: CreateFormRef;

export function createForm(vars: CreateFormVariables): MutationPromise<CreateFormData, CreateFormVariables>;
export function createForm(dc: DataConnect, vars: CreateFormVariables): MutationPromise<CreateFormData, CreateFormVariables>;

interface UpdateFormRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateFormVariables): MutationRef<UpdateFormData, UpdateFormVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateFormVariables): MutationRef<UpdateFormData, UpdateFormVariables>;
  operationName: string;
}
export const updateFormRef: UpdateFormRef;

export function updateForm(vars: UpdateFormVariables): MutationPromise<UpdateFormData, UpdateFormVariables>;
export function updateForm(dc: DataConnect, vars: UpdateFormVariables): MutationPromise<UpdateFormData, UpdateFormVariables>;

interface ResetFormTypeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ResetFormTypeVariables): MutationRef<ResetFormTypeData, ResetFormTypeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ResetFormTypeVariables): MutationRef<ResetFormTypeData, ResetFormTypeVariables>;
  operationName: string;
}
export const resetFormTypeRef: ResetFormTypeRef;

export function resetFormType(vars: ResetFormTypeVariables): MutationPromise<ResetFormTypeData, ResetFormTypeVariables>;
export function resetFormType(dc: DataConnect, vars: ResetFormTypeVariables): MutationPromise<ResetFormTypeData, ResetFormTypeVariables>;

interface ActivateFormRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ActivateFormVariables): MutationRef<ActivateFormData, ActivateFormVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ActivateFormVariables): MutationRef<ActivateFormData, ActivateFormVariables>;
  operationName: string;
}
export const activateFormRef: ActivateFormRef;

export function activateForm(vars: ActivateFormVariables): MutationPromise<ActivateFormData, ActivateFormVariables>;
export function activateForm(dc: DataConnect, vars: ActivateFormVariables): MutationPromise<ActivateFormData, ActivateFormVariables>;

interface DeactivateFormRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeactivateFormVariables): MutationRef<DeactivateFormData, DeactivateFormVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeactivateFormVariables): MutationRef<DeactivateFormData, DeactivateFormVariables>;
  operationName: string;
}
export const deactivateFormRef: DeactivateFormRef;

export function deactivateForm(vars: DeactivateFormVariables): MutationPromise<DeactivateFormData, DeactivateFormVariables>;
export function deactivateForm(dc: DataConnect, vars: DeactivateFormVariables): MutationPromise<DeactivateFormData, DeactivateFormVariables>;

interface GetCurrentUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetCurrentUserData, undefined>;
  operationName: string;
}
export const getCurrentUserRef: GetCurrentUserRef;

export function getCurrentUser(options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;
export function getCurrentUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;

interface ListFormsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListFormsVariables): QueryRef<ListFormsData, ListFormsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListFormsVariables): QueryRef<ListFormsData, ListFormsVariables>;
  operationName: string;
}
export const listFormsRef: ListFormsRef;

export function listForms(vars: ListFormsVariables, options?: ExecuteQueryOptions): QueryPromise<ListFormsData, ListFormsVariables>;
export function listForms(dc: DataConnect, vars: ListFormsVariables, options?: ExecuteQueryOptions): QueryPromise<ListFormsData, ListFormsVariables>;

interface GetFormRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetFormVariables): QueryRef<GetFormData, GetFormVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetFormVariables): QueryRef<GetFormData, GetFormVariables>;
  operationName: string;
}
export const getFormRef: GetFormRef;

export function getForm(vars: GetFormVariables, options?: ExecuteQueryOptions): QueryPromise<GetFormData, GetFormVariables>;
export function getForm(dc: DataConnect, vars: GetFormVariables, options?: ExecuteQueryOptions): QueryPromise<GetFormData, GetFormVariables>;

interface GetFormFieldsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetFormFieldsVariables): QueryRef<GetFormFieldsData, GetFormFieldsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetFormFieldsVariables): QueryRef<GetFormFieldsData, GetFormFieldsVariables>;
  operationName: string;
}
export const getFormFieldsRef: GetFormFieldsRef;

export function getFormFields(vars: GetFormFieldsVariables, options?: ExecuteQueryOptions): QueryPromise<GetFormFieldsData, GetFormFieldsVariables>;
export function getFormFields(dc: DataConnect, vars: GetFormFieldsVariables, options?: ExecuteQueryOptions): QueryPromise<GetFormFieldsData, GetFormFieldsVariables>;

interface CountFormInscriptionsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CountFormInscriptionsVariables): QueryRef<CountFormInscriptionsData, CountFormInscriptionsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CountFormInscriptionsVariables): QueryRef<CountFormInscriptionsData, CountFormInscriptionsVariables>;
  operationName: string;
}
export const countFormInscriptionsRef: CountFormInscriptionsRef;

export function countFormInscriptions(vars: CountFormInscriptionsVariables, options?: ExecuteQueryOptions): QueryPromise<CountFormInscriptionsData, CountFormInscriptionsVariables>;
export function countFormInscriptions(dc: DataConnect, vars: CountFormInscriptionsVariables, options?: ExecuteQueryOptions): QueryPromise<CountFormInscriptionsData, CountFormInscriptionsVariables>;

interface CreateFormFieldRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateFormFieldVariables): MutationRef<CreateFormFieldData, CreateFormFieldVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateFormFieldVariables): MutationRef<CreateFormFieldData, CreateFormFieldVariables>;
  operationName: string;
}
export const createFormFieldRef: CreateFormFieldRef;

export function createFormField(vars: CreateFormFieldVariables): MutationPromise<CreateFormFieldData, CreateFormFieldVariables>;
export function createFormField(dc: DataConnect, vars: CreateFormFieldVariables): MutationPromise<CreateFormFieldData, CreateFormFieldVariables>;

interface UpdateFormFieldRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateFormFieldVariables): MutationRef<UpdateFormFieldData, UpdateFormFieldVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateFormFieldVariables): MutationRef<UpdateFormFieldData, UpdateFormFieldVariables>;
  operationName: string;
}
export const updateFormFieldRef: UpdateFormFieldRef;

export function updateFormField(vars: UpdateFormFieldVariables): MutationPromise<UpdateFormFieldData, UpdateFormFieldVariables>;
export function updateFormField(dc: DataConnect, vars: UpdateFormFieldVariables): MutationPromise<UpdateFormFieldData, UpdateFormFieldVariables>;

interface DeleteOptionalFormFieldRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteOptionalFormFieldVariables): MutationRef<DeleteOptionalFormFieldData, DeleteOptionalFormFieldVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteOptionalFormFieldVariables): MutationRef<DeleteOptionalFormFieldData, DeleteOptionalFormFieldVariables>;
  operationName: string;
}
export const deleteOptionalFormFieldRef: DeleteOptionalFormFieldRef;

export function deleteOptionalFormField(vars: DeleteOptionalFormFieldVariables): MutationPromise<DeleteOptionalFormFieldData, DeleteOptionalFormFieldVariables>;
export function deleteOptionalFormField(dc: DataConnect, vars: DeleteOptionalFormFieldVariables): MutationPromise<DeleteOptionalFormFieldData, DeleteOptionalFormFieldVariables>;

interface ReorderFormFieldRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ReorderFormFieldVariables): MutationRef<ReorderFormFieldData, ReorderFormFieldVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ReorderFormFieldVariables): MutationRef<ReorderFormFieldData, ReorderFormFieldVariables>;
  operationName: string;
}
export const reorderFormFieldRef: ReorderFormFieldRef;

export function reorderFormField(vars: ReorderFormFieldVariables): MutationPromise<ReorderFormFieldData, ReorderFormFieldVariables>;
export function reorderFormField(dc: DataConnect, vars: ReorderFormFieldVariables): MutationPromise<ReorderFormFieldData, ReorderFormFieldVariables>;

interface GetPublicFormRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPublicFormVariables): QueryRef<GetPublicFormData, GetPublicFormVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetPublicFormVariables): QueryRef<GetPublicFormData, GetPublicFormVariables>;
  operationName: string;
}
export const getPublicFormRef: GetPublicFormRef;

export function getPublicForm(vars: GetPublicFormVariables, options?: ExecuteQueryOptions): QueryPromise<GetPublicFormData, GetPublicFormVariables>;
export function getPublicForm(dc: DataConnect, vars: GetPublicFormVariables, options?: ExecuteQueryOptions): QueryPromise<GetPublicFormData, GetPublicFormVariables>;

interface SubmitPublicInscriptionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SubmitPublicInscriptionVariables): MutationRef<SubmitPublicInscriptionData, SubmitPublicInscriptionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SubmitPublicInscriptionVariables): MutationRef<SubmitPublicInscriptionData, SubmitPublicInscriptionVariables>;
  operationName: string;
}
export const submitPublicInscriptionRef: SubmitPublicInscriptionRef;

export function submitPublicInscription(vars: SubmitPublicInscriptionVariables): MutationPromise<SubmitPublicInscriptionData, SubmitPublicInscriptionVariables>;
export function submitPublicInscription(dc: DataConnect, vars: SubmitPublicInscriptionVariables): MutationPromise<SubmitPublicInscriptionData, SubmitPublicInscriptionVariables>;

