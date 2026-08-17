# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `clubox`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetCurrentUser*](#getcurrentuser)
  - [*ListForms*](#listforms)
  - [*GetForm*](#getform)
  - [*GetFormFields*](#getformfields)
  - [*CountFormInscriptions*](#countforminscriptions)
  - [*GetPublicForm*](#getpublicform)
- [**Mutations**](#mutations)
  - [*CreateForm*](#createform)
  - [*UpdateForm*](#updateform)
  - [*ResetFormType*](#resetformtype)
  - [*ActivateForm*](#activateform)
  - [*DeactivateForm*](#deactivateform)
  - [*CreateFormField*](#createformfield)
  - [*UpdateFormField*](#updateformfield)
  - [*DeleteOptionalFormField*](#deleteoptionalformfield)
  - [*ReorderFormField*](#reorderformfield)
  - [*SubmitPublicInscription*](#submitpublicinscription)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `clubox`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@clubox/dataconnect` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@clubox/dataconnect';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@clubox/dataconnect';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `clubox` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetCurrentUser
You can execute the `GetCurrentUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
getCurrentUser(options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;

interface GetCurrentUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentUserData, undefined>;
}
export const getCurrentUserRef: GetCurrentUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCurrentUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;

interface GetCurrentUserRef {
  ...
  (dc: DataConnect): QueryRef<GetCurrentUserData, undefined>;
}
export const getCurrentUserRef: GetCurrentUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCurrentUserRef:
```typescript
const name = getCurrentUserRef.operationName;
console.log(name);
```

### Variables
The `GetCurrentUser` query has no variables.
### Return Type
Recall that executing the `GetCurrentUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCurrentUserData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetCurrentUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCurrentUser } from '@clubox/dataconnect';


// Call the `getCurrentUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCurrentUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCurrentUser(dataConnect);

console.log(data.users);

// Or, you can use the `Promise` API.
getCurrentUser().then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `GetCurrentUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCurrentUserRef } from '@clubox/dataconnect';


// Call the `getCurrentUserRef()` function to get a reference to the query.
const ref = getCurrentUserRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCurrentUserRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## ListForms
You can execute the `ListForms` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
listForms(vars: ListFormsVariables, options?: ExecuteQueryOptions): QueryPromise<ListFormsData, ListFormsVariables>;

interface ListFormsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListFormsVariables): QueryRef<ListFormsData, ListFormsVariables>;
}
export const listFormsRef: ListFormsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listForms(dc: DataConnect, vars: ListFormsVariables, options?: ExecuteQueryOptions): QueryPromise<ListFormsData, ListFormsVariables>;

interface ListFormsRef {
  ...
  (dc: DataConnect, vars: ListFormsVariables): QueryRef<ListFormsData, ListFormsVariables>;
}
export const listFormsRef: ListFormsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listFormsRef:
```typescript
const name = listFormsRef.operationName;
console.log(name);
```

### Variables
The `ListForms` query requires an argument of type `ListFormsVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListFormsVariables {
  clubId: UUIDString;
}
```
### Return Type
Recall that executing the `ListForms` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListFormsData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListForms`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listForms, ListFormsVariables } from '@clubox/dataconnect';

// The `ListForms` query requires an argument of type `ListFormsVariables`:
const listFormsVars: ListFormsVariables = {
  clubId: ..., 
};

// Call the `listForms()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listForms(listFormsVars);
// Variables can be defined inline as well.
const { data } = await listForms({ clubId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listForms(dataConnect, listFormsVars);

console.log(data.users);

// Or, you can use the `Promise` API.
listForms(listFormsVars).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `ListForms`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listFormsRef, ListFormsVariables } from '@clubox/dataconnect';

// The `ListForms` query requires an argument of type `ListFormsVariables`:
const listFormsVars: ListFormsVariables = {
  clubId: ..., 
};

// Call the `listFormsRef()` function to get a reference to the query.
const ref = listFormsRef(listFormsVars);
// Variables can be defined inline as well.
const ref = listFormsRef({ clubId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listFormsRef(dataConnect, listFormsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## GetForm
You can execute the `GetForm` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
getForm(vars: GetFormVariables, options?: ExecuteQueryOptions): QueryPromise<GetFormData, GetFormVariables>;

interface GetFormRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetFormVariables): QueryRef<GetFormData, GetFormVariables>;
}
export const getFormRef: GetFormRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getForm(dc: DataConnect, vars: GetFormVariables, options?: ExecuteQueryOptions): QueryPromise<GetFormData, GetFormVariables>;

interface GetFormRef {
  ...
  (dc: DataConnect, vars: GetFormVariables): QueryRef<GetFormData, GetFormVariables>;
}
export const getFormRef: GetFormRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getFormRef:
```typescript
const name = getFormRef.operationName;
console.log(name);
```

### Variables
The `GetForm` query requires an argument of type `GetFormVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetFormVariables {
  clubId: UUIDString;
  formId: UUIDString;
}
```
### Return Type
Recall that executing the `GetForm` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetFormData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetForm`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getForm, GetFormVariables } from '@clubox/dataconnect';

// The `GetForm` query requires an argument of type `GetFormVariables`:
const getFormVars: GetFormVariables = {
  clubId: ..., 
  formId: ..., 
};

// Call the `getForm()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getForm(getFormVars);
// Variables can be defined inline as well.
const { data } = await getForm({ clubId: ..., formId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getForm(dataConnect, getFormVars);

console.log(data.users);

// Or, you can use the `Promise` API.
getForm(getFormVars).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `GetForm`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getFormRef, GetFormVariables } from '@clubox/dataconnect';

// The `GetForm` query requires an argument of type `GetFormVariables`:
const getFormVars: GetFormVariables = {
  clubId: ..., 
  formId: ..., 
};

// Call the `getFormRef()` function to get a reference to the query.
const ref = getFormRef(getFormVars);
// Variables can be defined inline as well.
const ref = getFormRef({ clubId: ..., formId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getFormRef(dataConnect, getFormVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## GetFormFields
You can execute the `GetFormFields` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
getFormFields(vars: GetFormFieldsVariables, options?: ExecuteQueryOptions): QueryPromise<GetFormFieldsData, GetFormFieldsVariables>;

interface GetFormFieldsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetFormFieldsVariables): QueryRef<GetFormFieldsData, GetFormFieldsVariables>;
}
export const getFormFieldsRef: GetFormFieldsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getFormFields(dc: DataConnect, vars: GetFormFieldsVariables, options?: ExecuteQueryOptions): QueryPromise<GetFormFieldsData, GetFormFieldsVariables>;

interface GetFormFieldsRef {
  ...
  (dc: DataConnect, vars: GetFormFieldsVariables): QueryRef<GetFormFieldsData, GetFormFieldsVariables>;
}
export const getFormFieldsRef: GetFormFieldsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getFormFieldsRef:
```typescript
const name = getFormFieldsRef.operationName;
console.log(name);
```

### Variables
The `GetFormFields` query requires an argument of type `GetFormFieldsVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetFormFieldsVariables {
  clubId: UUIDString;
  formId: UUIDString;
}
```
### Return Type
Recall that executing the `GetFormFields` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetFormFieldsData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetFormFields`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getFormFields, GetFormFieldsVariables } from '@clubox/dataconnect';

// The `GetFormFields` query requires an argument of type `GetFormFieldsVariables`:
const getFormFieldsVars: GetFormFieldsVariables = {
  clubId: ..., 
  formId: ..., 
};

// Call the `getFormFields()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getFormFields(getFormFieldsVars);
// Variables can be defined inline as well.
const { data } = await getFormFields({ clubId: ..., formId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getFormFields(dataConnect, getFormFieldsVars);

console.log(data.users);

// Or, you can use the `Promise` API.
getFormFields(getFormFieldsVars).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `GetFormFields`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getFormFieldsRef, GetFormFieldsVariables } from '@clubox/dataconnect';

// The `GetFormFields` query requires an argument of type `GetFormFieldsVariables`:
const getFormFieldsVars: GetFormFieldsVariables = {
  clubId: ..., 
  formId: ..., 
};

// Call the `getFormFieldsRef()` function to get a reference to the query.
const ref = getFormFieldsRef(getFormFieldsVars);
// Variables can be defined inline as well.
const ref = getFormFieldsRef({ clubId: ..., formId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getFormFieldsRef(dataConnect, getFormFieldsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## CountFormInscriptions
You can execute the `CountFormInscriptions` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
countFormInscriptions(vars: CountFormInscriptionsVariables, options?: ExecuteQueryOptions): QueryPromise<CountFormInscriptionsData, CountFormInscriptionsVariables>;

interface CountFormInscriptionsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CountFormInscriptionsVariables): QueryRef<CountFormInscriptionsData, CountFormInscriptionsVariables>;
}
export const countFormInscriptionsRef: CountFormInscriptionsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
countFormInscriptions(dc: DataConnect, vars: CountFormInscriptionsVariables, options?: ExecuteQueryOptions): QueryPromise<CountFormInscriptionsData, CountFormInscriptionsVariables>;

interface CountFormInscriptionsRef {
  ...
  (dc: DataConnect, vars: CountFormInscriptionsVariables): QueryRef<CountFormInscriptionsData, CountFormInscriptionsVariables>;
}
export const countFormInscriptionsRef: CountFormInscriptionsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the countFormInscriptionsRef:
```typescript
const name = countFormInscriptionsRef.operationName;
console.log(name);
```

### Variables
The `CountFormInscriptions` query requires an argument of type `CountFormInscriptionsVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CountFormInscriptionsVariables {
  clubId: UUIDString;
  formId: UUIDString;
}
```
### Return Type
Recall that executing the `CountFormInscriptions` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CountFormInscriptionsData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `CountFormInscriptions`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, countFormInscriptions, CountFormInscriptionsVariables } from '@clubox/dataconnect';

// The `CountFormInscriptions` query requires an argument of type `CountFormInscriptionsVariables`:
const countFormInscriptionsVars: CountFormInscriptionsVariables = {
  clubId: ..., 
  formId: ..., 
};

// Call the `countFormInscriptions()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await countFormInscriptions(countFormInscriptionsVars);
// Variables can be defined inline as well.
const { data } = await countFormInscriptions({ clubId: ..., formId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await countFormInscriptions(dataConnect, countFormInscriptionsVars);

console.log(data.users);

// Or, you can use the `Promise` API.
countFormInscriptions(countFormInscriptionsVars).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `CountFormInscriptions`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, countFormInscriptionsRef, CountFormInscriptionsVariables } from '@clubox/dataconnect';

// The `CountFormInscriptions` query requires an argument of type `CountFormInscriptionsVariables`:
const countFormInscriptionsVars: CountFormInscriptionsVariables = {
  clubId: ..., 
  formId: ..., 
};

// Call the `countFormInscriptionsRef()` function to get a reference to the query.
const ref = countFormInscriptionsRef(countFormInscriptionsVars);
// Variables can be defined inline as well.
const ref = countFormInscriptionsRef({ clubId: ..., formId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = countFormInscriptionsRef(dataConnect, countFormInscriptionsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## GetPublicForm
You can execute the `GetPublicForm` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
getPublicForm(vars: GetPublicFormVariables, options?: ExecuteQueryOptions): QueryPromise<GetPublicFormData, GetPublicFormVariables>;

interface GetPublicFormRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPublicFormVariables): QueryRef<GetPublicFormData, GetPublicFormVariables>;
}
export const getPublicFormRef: GetPublicFormRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getPublicForm(dc: DataConnect, vars: GetPublicFormVariables, options?: ExecuteQueryOptions): QueryPromise<GetPublicFormData, GetPublicFormVariables>;

interface GetPublicFormRef {
  ...
  (dc: DataConnect, vars: GetPublicFormVariables): QueryRef<GetPublicFormData, GetPublicFormVariables>;
}
export const getPublicFormRef: GetPublicFormRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getPublicFormRef:
```typescript
const name = getPublicFormRef.operationName;
console.log(name);
```

### Variables
The `GetPublicForm` query requires an argument of type `GetPublicFormVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetPublicFormVariables {
  publicSlug: string;
}
```
### Return Type
Recall that executing the `GetPublicForm` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetPublicFormData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetPublicForm`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getPublicForm, GetPublicFormVariables } from '@clubox/dataconnect';

// The `GetPublicForm` query requires an argument of type `GetPublicFormVariables`:
const getPublicFormVars: GetPublicFormVariables = {
  publicSlug: ..., 
};

// Call the `getPublicForm()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getPublicForm(getPublicFormVars);
// Variables can be defined inline as well.
const { data } = await getPublicForm({ publicSlug: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getPublicForm(dataConnect, getPublicFormVars);

console.log(data.forms);

// Or, you can use the `Promise` API.
getPublicForm(getPublicFormVars).then((response) => {
  const data = response.data;
  console.log(data.forms);
});
```

### Using `GetPublicForm`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getPublicFormRef, GetPublicFormVariables } from '@clubox/dataconnect';

// The `GetPublicForm` query requires an argument of type `GetPublicFormVariables`:
const getPublicFormVars: GetPublicFormVariables = {
  publicSlug: ..., 
};

// Call the `getPublicFormRef()` function to get a reference to the query.
const ref = getPublicFormRef(getPublicFormVars);
// Variables can be defined inline as well.
const ref = getPublicFormRef({ publicSlug: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getPublicFormRef(dataConnect, getPublicFormVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.forms);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.forms);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `clubox` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateForm
You can execute the `CreateForm` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
createForm(vars: CreateFormVariables): MutationPromise<CreateFormData, CreateFormVariables>;

interface CreateFormRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateFormVariables): MutationRef<CreateFormData, CreateFormVariables>;
}
export const createFormRef: CreateFormRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createForm(dc: DataConnect, vars: CreateFormVariables): MutationPromise<CreateFormData, CreateFormVariables>;

interface CreateFormRef {
  ...
  (dc: DataConnect, vars: CreateFormVariables): MutationRef<CreateFormData, CreateFormVariables>;
}
export const createFormRef: CreateFormRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createFormRef:
```typescript
const name = createFormRef.operationName;
console.log(name);
```

### Variables
The `CreateForm` mutation requires an argument of type `CreateFormVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateFormVariables {
  clubId: UUIDString;
  name: string;
  formType: FormType;
  publicSlug: string;
}
```
### Return Type
Recall that executing the `CreateForm` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateFormData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateFormData {
  form: Form_Key;
  firstName: FormField_Key;
  lastName: FormField_Key;
  birthDate: FormField_Key;
  nationalId: FormField_Key;
}
```
### Using `CreateForm`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createForm, CreateFormVariables } from '@clubox/dataconnect';

// The `CreateForm` mutation requires an argument of type `CreateFormVariables`:
const createFormVars: CreateFormVariables = {
  clubId: ..., 
  name: ..., 
  formType: ..., 
  publicSlug: ..., 
};

// Call the `createForm()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createForm(createFormVars);
// Variables can be defined inline as well.
const { data } = await createForm({ clubId: ..., name: ..., formType: ..., publicSlug: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createForm(dataConnect, createFormVars);

console.log(data.form);
console.log(data.firstName);
console.log(data.lastName);
console.log(data.birthDate);
console.log(data.nationalId);

// Or, you can use the `Promise` API.
createForm(createFormVars).then((response) => {
  const data = response.data;
  console.log(data.form);
  console.log(data.firstName);
  console.log(data.lastName);
  console.log(data.birthDate);
  console.log(data.nationalId);
});
```

### Using `CreateForm`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createFormRef, CreateFormVariables } from '@clubox/dataconnect';

// The `CreateForm` mutation requires an argument of type `CreateFormVariables`:
const createFormVars: CreateFormVariables = {
  clubId: ..., 
  name: ..., 
  formType: ..., 
  publicSlug: ..., 
};

// Call the `createFormRef()` function to get a reference to the mutation.
const ref = createFormRef(createFormVars);
// Variables can be defined inline as well.
const ref = createFormRef({ clubId: ..., name: ..., formType: ..., publicSlug: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createFormRef(dataConnect, createFormVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.form);
console.log(data.firstName);
console.log(data.lastName);
console.log(data.birthDate);
console.log(data.nationalId);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.form);
  console.log(data.firstName);
  console.log(data.lastName);
  console.log(data.birthDate);
  console.log(data.nationalId);
});
```

## UpdateForm
You can execute the `UpdateForm` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
updateForm(vars: UpdateFormVariables): MutationPromise<UpdateFormData, UpdateFormVariables>;

interface UpdateFormRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateFormVariables): MutationRef<UpdateFormData, UpdateFormVariables>;
}
export const updateFormRef: UpdateFormRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateForm(dc: DataConnect, vars: UpdateFormVariables): MutationPromise<UpdateFormData, UpdateFormVariables>;

interface UpdateFormRef {
  ...
  (dc: DataConnect, vars: UpdateFormVariables): MutationRef<UpdateFormData, UpdateFormVariables>;
}
export const updateFormRef: UpdateFormRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateFormRef:
```typescript
const name = updateFormRef.operationName;
console.log(name);
```

### Variables
The `UpdateForm` mutation requires an argument of type `UpdateFormVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateFormVariables {
  clubId: UUIDString;
  formId: UUIDString;
  name: string;
  formType: FormType;
  publicSlug: string;
}
```
### Return Type
Recall that executing the `UpdateForm` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateFormData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateFormData {
  form_update?: Form_Key | null;
}
```
### Using `UpdateForm`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateForm, UpdateFormVariables } from '@clubox/dataconnect';

// The `UpdateForm` mutation requires an argument of type `UpdateFormVariables`:
const updateFormVars: UpdateFormVariables = {
  clubId: ..., 
  formId: ..., 
  name: ..., 
  formType: ..., 
  publicSlug: ..., 
};

// Call the `updateForm()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateForm(updateFormVars);
// Variables can be defined inline as well.
const { data } = await updateForm({ clubId: ..., formId: ..., name: ..., formType: ..., publicSlug: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateForm(dataConnect, updateFormVars);

console.log(data.form_update);

// Or, you can use the `Promise` API.
updateForm(updateFormVars).then((response) => {
  const data = response.data;
  console.log(data.form_update);
});
```

### Using `UpdateForm`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateFormRef, UpdateFormVariables } from '@clubox/dataconnect';

// The `UpdateForm` mutation requires an argument of type `UpdateFormVariables`:
const updateFormVars: UpdateFormVariables = {
  clubId: ..., 
  formId: ..., 
  name: ..., 
  formType: ..., 
  publicSlug: ..., 
};

// Call the `updateFormRef()` function to get a reference to the mutation.
const ref = updateFormRef(updateFormVars);
// Variables can be defined inline as well.
const ref = updateFormRef({ clubId: ..., formId: ..., name: ..., formType: ..., publicSlug: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateFormRef(dataConnect, updateFormVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.form_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.form_update);
});
```

## ResetFormType
You can execute the `ResetFormType` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
resetFormType(vars: ResetFormTypeVariables): MutationPromise<ResetFormTypeData, ResetFormTypeVariables>;

interface ResetFormTypeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ResetFormTypeVariables): MutationRef<ResetFormTypeData, ResetFormTypeVariables>;
}
export const resetFormTypeRef: ResetFormTypeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
resetFormType(dc: DataConnect, vars: ResetFormTypeVariables): MutationPromise<ResetFormTypeData, ResetFormTypeVariables>;

interface ResetFormTypeRef {
  ...
  (dc: DataConnect, vars: ResetFormTypeVariables): MutationRef<ResetFormTypeData, ResetFormTypeVariables>;
}
export const resetFormTypeRef: ResetFormTypeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the resetFormTypeRef:
```typescript
const name = resetFormTypeRef.operationName;
console.log(name);
```

### Variables
The `ResetFormType` mutation requires an argument of type `ResetFormTypeVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ResetFormTypeVariables {
  clubId: UUIDString;
  formId: UUIDString;
  name: string;
  formType: FormType;
  publicSlug: string;
}
```
### Return Type
Recall that executing the `ResetFormType` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ResetFormTypeData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ResetFormTypeData {
  formField_deleteMany: number;
  form_update?: Form_Key | null;
}
```
### Using `ResetFormType`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, resetFormType, ResetFormTypeVariables } from '@clubox/dataconnect';

// The `ResetFormType` mutation requires an argument of type `ResetFormTypeVariables`:
const resetFormTypeVars: ResetFormTypeVariables = {
  clubId: ..., 
  formId: ..., 
  name: ..., 
  formType: ..., 
  publicSlug: ..., 
};

// Call the `resetFormType()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await resetFormType(resetFormTypeVars);
// Variables can be defined inline as well.
const { data } = await resetFormType({ clubId: ..., formId: ..., name: ..., formType: ..., publicSlug: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await resetFormType(dataConnect, resetFormTypeVars);

console.log(data.formField_deleteMany);
console.log(data.form_update);

// Or, you can use the `Promise` API.
resetFormType(resetFormTypeVars).then((response) => {
  const data = response.data;
  console.log(data.formField_deleteMany);
  console.log(data.form_update);
});
```

### Using `ResetFormType`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, resetFormTypeRef, ResetFormTypeVariables } from '@clubox/dataconnect';

// The `ResetFormType` mutation requires an argument of type `ResetFormTypeVariables`:
const resetFormTypeVars: ResetFormTypeVariables = {
  clubId: ..., 
  formId: ..., 
  name: ..., 
  formType: ..., 
  publicSlug: ..., 
};

// Call the `resetFormTypeRef()` function to get a reference to the mutation.
const ref = resetFormTypeRef(resetFormTypeVars);
// Variables can be defined inline as well.
const ref = resetFormTypeRef({ clubId: ..., formId: ..., name: ..., formType: ..., publicSlug: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = resetFormTypeRef(dataConnect, resetFormTypeVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.formField_deleteMany);
console.log(data.form_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.formField_deleteMany);
  console.log(data.form_update);
});
```

## ActivateForm
You can execute the `ActivateForm` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
activateForm(vars: ActivateFormVariables): MutationPromise<ActivateFormData, ActivateFormVariables>;

interface ActivateFormRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ActivateFormVariables): MutationRef<ActivateFormData, ActivateFormVariables>;
}
export const activateFormRef: ActivateFormRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
activateForm(dc: DataConnect, vars: ActivateFormVariables): MutationPromise<ActivateFormData, ActivateFormVariables>;

interface ActivateFormRef {
  ...
  (dc: DataConnect, vars: ActivateFormVariables): MutationRef<ActivateFormData, ActivateFormVariables>;
}
export const activateFormRef: ActivateFormRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the activateFormRef:
```typescript
const name = activateFormRef.operationName;
console.log(name);
```

### Variables
The `ActivateForm` mutation requires an argument of type `ActivateFormVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ActivateFormVariables {
  clubId: UUIDString;
  formId: UUIDString;
}
```
### Return Type
Recall that executing the `ActivateForm` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ActivateFormData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ActivateFormData {
  form_update?: Form_Key | null;
}
```
### Using `ActivateForm`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, activateForm, ActivateFormVariables } from '@clubox/dataconnect';

// The `ActivateForm` mutation requires an argument of type `ActivateFormVariables`:
const activateFormVars: ActivateFormVariables = {
  clubId: ..., 
  formId: ..., 
};

// Call the `activateForm()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await activateForm(activateFormVars);
// Variables can be defined inline as well.
const { data } = await activateForm({ clubId: ..., formId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await activateForm(dataConnect, activateFormVars);

console.log(data.form_update);

// Or, you can use the `Promise` API.
activateForm(activateFormVars).then((response) => {
  const data = response.data;
  console.log(data.form_update);
});
```

### Using `ActivateForm`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, activateFormRef, ActivateFormVariables } from '@clubox/dataconnect';

// The `ActivateForm` mutation requires an argument of type `ActivateFormVariables`:
const activateFormVars: ActivateFormVariables = {
  clubId: ..., 
  formId: ..., 
};

// Call the `activateFormRef()` function to get a reference to the mutation.
const ref = activateFormRef(activateFormVars);
// Variables can be defined inline as well.
const ref = activateFormRef({ clubId: ..., formId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = activateFormRef(dataConnect, activateFormVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.form_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.form_update);
});
```

## DeactivateForm
You can execute the `DeactivateForm` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
deactivateForm(vars: DeactivateFormVariables): MutationPromise<DeactivateFormData, DeactivateFormVariables>;

interface DeactivateFormRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeactivateFormVariables): MutationRef<DeactivateFormData, DeactivateFormVariables>;
}
export const deactivateFormRef: DeactivateFormRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deactivateForm(dc: DataConnect, vars: DeactivateFormVariables): MutationPromise<DeactivateFormData, DeactivateFormVariables>;

interface DeactivateFormRef {
  ...
  (dc: DataConnect, vars: DeactivateFormVariables): MutationRef<DeactivateFormData, DeactivateFormVariables>;
}
export const deactivateFormRef: DeactivateFormRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deactivateFormRef:
```typescript
const name = deactivateFormRef.operationName;
console.log(name);
```

### Variables
The `DeactivateForm` mutation requires an argument of type `DeactivateFormVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeactivateFormVariables {
  clubId: UUIDString;
  formId: UUIDString;
}
```
### Return Type
Recall that executing the `DeactivateForm` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeactivateFormData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeactivateFormData {
  form_update?: Form_Key | null;
}
```
### Using `DeactivateForm`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deactivateForm, DeactivateFormVariables } from '@clubox/dataconnect';

// The `DeactivateForm` mutation requires an argument of type `DeactivateFormVariables`:
const deactivateFormVars: DeactivateFormVariables = {
  clubId: ..., 
  formId: ..., 
};

// Call the `deactivateForm()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deactivateForm(deactivateFormVars);
// Variables can be defined inline as well.
const { data } = await deactivateForm({ clubId: ..., formId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deactivateForm(dataConnect, deactivateFormVars);

console.log(data.form_update);

// Or, you can use the `Promise` API.
deactivateForm(deactivateFormVars).then((response) => {
  const data = response.data;
  console.log(data.form_update);
});
```

### Using `DeactivateForm`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deactivateFormRef, DeactivateFormVariables } from '@clubox/dataconnect';

// The `DeactivateForm` mutation requires an argument of type `DeactivateFormVariables`:
const deactivateFormVars: DeactivateFormVariables = {
  clubId: ..., 
  formId: ..., 
};

// Call the `deactivateFormRef()` function to get a reference to the mutation.
const ref = deactivateFormRef(deactivateFormVars);
// Variables can be defined inline as well.
const ref = deactivateFormRef({ clubId: ..., formId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deactivateFormRef(dataConnect, deactivateFormVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.form_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.form_update);
});
```

## CreateFormField
You can execute the `CreateFormField` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
createFormField(vars: CreateFormFieldVariables): MutationPromise<CreateFormFieldData, CreateFormFieldVariables>;

interface CreateFormFieldRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateFormFieldVariables): MutationRef<CreateFormFieldData, CreateFormFieldVariables>;
}
export const createFormFieldRef: CreateFormFieldRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createFormField(dc: DataConnect, vars: CreateFormFieldVariables): MutationPromise<CreateFormFieldData, CreateFormFieldVariables>;

interface CreateFormFieldRef {
  ...
  (dc: DataConnect, vars: CreateFormFieldVariables): MutationRef<CreateFormFieldData, CreateFormFieldVariables>;
}
export const createFormFieldRef: CreateFormFieldRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createFormFieldRef:
```typescript
const name = createFormFieldRef.operationName;
console.log(name);
```

### Variables
The `CreateFormField` mutation requires an argument of type `CreateFormFieldVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `CreateFormField` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateFormFieldData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateFormFieldData {
  formField_insert: FormField_Key;
}
```
### Using `CreateFormField`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createFormField, CreateFormFieldVariables } from '@clubox/dataconnect';

// The `CreateFormField` mutation requires an argument of type `CreateFormFieldVariables`:
const createFormFieldVars: CreateFormFieldVariables = {
  clubId: ..., 
  formId: ..., 
  name: ..., 
  label: ..., 
  fieldType: ..., 
  position: ..., 
  options: ..., // optional
  config: ..., // optional
};

// Call the `createFormField()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createFormField(createFormFieldVars);
// Variables can be defined inline as well.
const { data } = await createFormField({ clubId: ..., formId: ..., name: ..., label: ..., fieldType: ..., position: ..., options: ..., config: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createFormField(dataConnect, createFormFieldVars);

console.log(data.formField_insert);

// Or, you can use the `Promise` API.
createFormField(createFormFieldVars).then((response) => {
  const data = response.data;
  console.log(data.formField_insert);
});
```

### Using `CreateFormField`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createFormFieldRef, CreateFormFieldVariables } from '@clubox/dataconnect';

// The `CreateFormField` mutation requires an argument of type `CreateFormFieldVariables`:
const createFormFieldVars: CreateFormFieldVariables = {
  clubId: ..., 
  formId: ..., 
  name: ..., 
  label: ..., 
  fieldType: ..., 
  position: ..., 
  options: ..., // optional
  config: ..., // optional
};

// Call the `createFormFieldRef()` function to get a reference to the mutation.
const ref = createFormFieldRef(createFormFieldVars);
// Variables can be defined inline as well.
const ref = createFormFieldRef({ clubId: ..., formId: ..., name: ..., label: ..., fieldType: ..., position: ..., options: ..., config: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createFormFieldRef(dataConnect, createFormFieldVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.formField_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.formField_insert);
});
```

## UpdateFormField
You can execute the `UpdateFormField` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
updateFormField(vars: UpdateFormFieldVariables): MutationPromise<UpdateFormFieldData, UpdateFormFieldVariables>;

interface UpdateFormFieldRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateFormFieldVariables): MutationRef<UpdateFormFieldData, UpdateFormFieldVariables>;
}
export const updateFormFieldRef: UpdateFormFieldRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateFormField(dc: DataConnect, vars: UpdateFormFieldVariables): MutationPromise<UpdateFormFieldData, UpdateFormFieldVariables>;

interface UpdateFormFieldRef {
  ...
  (dc: DataConnect, vars: UpdateFormFieldVariables): MutationRef<UpdateFormFieldData, UpdateFormFieldVariables>;
}
export const updateFormFieldRef: UpdateFormFieldRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateFormFieldRef:
```typescript
const name = updateFormFieldRef.operationName;
console.log(name);
```

### Variables
The `UpdateFormField` mutation requires an argument of type `UpdateFormFieldVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `UpdateFormField` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateFormFieldData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateFormFieldData {
  formField_update?: FormField_Key | null;
}
```
### Using `UpdateFormField`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateFormField, UpdateFormFieldVariables } from '@clubox/dataconnect';

// The `UpdateFormField` mutation requires an argument of type `UpdateFormFieldVariables`:
const updateFormFieldVars: UpdateFormFieldVariables = {
  clubId: ..., 
  formId: ..., 
  fieldId: ..., 
  label: ..., 
  fieldType: ..., 
  status: ..., 
  options: ..., // optional
  config: ..., // optional
};

// Call the `updateFormField()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateFormField(updateFormFieldVars);
// Variables can be defined inline as well.
const { data } = await updateFormField({ clubId: ..., formId: ..., fieldId: ..., label: ..., fieldType: ..., status: ..., options: ..., config: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateFormField(dataConnect, updateFormFieldVars);

console.log(data.formField_update);

// Or, you can use the `Promise` API.
updateFormField(updateFormFieldVars).then((response) => {
  const data = response.data;
  console.log(data.formField_update);
});
```

### Using `UpdateFormField`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateFormFieldRef, UpdateFormFieldVariables } from '@clubox/dataconnect';

// The `UpdateFormField` mutation requires an argument of type `UpdateFormFieldVariables`:
const updateFormFieldVars: UpdateFormFieldVariables = {
  clubId: ..., 
  formId: ..., 
  fieldId: ..., 
  label: ..., 
  fieldType: ..., 
  status: ..., 
  options: ..., // optional
  config: ..., // optional
};

// Call the `updateFormFieldRef()` function to get a reference to the mutation.
const ref = updateFormFieldRef(updateFormFieldVars);
// Variables can be defined inline as well.
const ref = updateFormFieldRef({ clubId: ..., formId: ..., fieldId: ..., label: ..., fieldType: ..., status: ..., options: ..., config: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateFormFieldRef(dataConnect, updateFormFieldVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.formField_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.formField_update);
});
```

## DeleteOptionalFormField
You can execute the `DeleteOptionalFormField` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
deleteOptionalFormField(vars: DeleteOptionalFormFieldVariables): MutationPromise<DeleteOptionalFormFieldData, DeleteOptionalFormFieldVariables>;

interface DeleteOptionalFormFieldRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteOptionalFormFieldVariables): MutationRef<DeleteOptionalFormFieldData, DeleteOptionalFormFieldVariables>;
}
export const deleteOptionalFormFieldRef: DeleteOptionalFormFieldRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteOptionalFormField(dc: DataConnect, vars: DeleteOptionalFormFieldVariables): MutationPromise<DeleteOptionalFormFieldData, DeleteOptionalFormFieldVariables>;

interface DeleteOptionalFormFieldRef {
  ...
  (dc: DataConnect, vars: DeleteOptionalFormFieldVariables): MutationRef<DeleteOptionalFormFieldData, DeleteOptionalFormFieldVariables>;
}
export const deleteOptionalFormFieldRef: DeleteOptionalFormFieldRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteOptionalFormFieldRef:
```typescript
const name = deleteOptionalFormFieldRef.operationName;
console.log(name);
```

### Variables
The `DeleteOptionalFormField` mutation requires an argument of type `DeleteOptionalFormFieldVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteOptionalFormFieldVariables {
  clubId: UUIDString;
  formId: UUIDString;
  fieldId: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteOptionalFormField` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteOptionalFormFieldData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteOptionalFormFieldData {
  formField_delete?: FormField_Key | null;
}
```
### Using `DeleteOptionalFormField`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteOptionalFormField, DeleteOptionalFormFieldVariables } from '@clubox/dataconnect';

// The `DeleteOptionalFormField` mutation requires an argument of type `DeleteOptionalFormFieldVariables`:
const deleteOptionalFormFieldVars: DeleteOptionalFormFieldVariables = {
  clubId: ..., 
  formId: ..., 
  fieldId: ..., 
};

// Call the `deleteOptionalFormField()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteOptionalFormField(deleteOptionalFormFieldVars);
// Variables can be defined inline as well.
const { data } = await deleteOptionalFormField({ clubId: ..., formId: ..., fieldId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteOptionalFormField(dataConnect, deleteOptionalFormFieldVars);

console.log(data.formField_delete);

// Or, you can use the `Promise` API.
deleteOptionalFormField(deleteOptionalFormFieldVars).then((response) => {
  const data = response.data;
  console.log(data.formField_delete);
});
```

### Using `DeleteOptionalFormField`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteOptionalFormFieldRef, DeleteOptionalFormFieldVariables } from '@clubox/dataconnect';

// The `DeleteOptionalFormField` mutation requires an argument of type `DeleteOptionalFormFieldVariables`:
const deleteOptionalFormFieldVars: DeleteOptionalFormFieldVariables = {
  clubId: ..., 
  formId: ..., 
  fieldId: ..., 
};

// Call the `deleteOptionalFormFieldRef()` function to get a reference to the mutation.
const ref = deleteOptionalFormFieldRef(deleteOptionalFormFieldVars);
// Variables can be defined inline as well.
const ref = deleteOptionalFormFieldRef({ clubId: ..., formId: ..., fieldId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteOptionalFormFieldRef(dataConnect, deleteOptionalFormFieldVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.formField_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.formField_delete);
});
```

## ReorderFormField
You can execute the `ReorderFormField` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
reorderFormField(vars: ReorderFormFieldVariables): MutationPromise<ReorderFormFieldData, ReorderFormFieldVariables>;

interface ReorderFormFieldRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ReorderFormFieldVariables): MutationRef<ReorderFormFieldData, ReorderFormFieldVariables>;
}
export const reorderFormFieldRef: ReorderFormFieldRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
reorderFormField(dc: DataConnect, vars: ReorderFormFieldVariables): MutationPromise<ReorderFormFieldData, ReorderFormFieldVariables>;

interface ReorderFormFieldRef {
  ...
  (dc: DataConnect, vars: ReorderFormFieldVariables): MutationRef<ReorderFormFieldData, ReorderFormFieldVariables>;
}
export const reorderFormFieldRef: ReorderFormFieldRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the reorderFormFieldRef:
```typescript
const name = reorderFormFieldRef.operationName;
console.log(name);
```

### Variables
The `ReorderFormField` mutation requires an argument of type `ReorderFormFieldVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ReorderFormFieldVariables {
  clubId: UUIDString;
  formId: UUIDString;
  fieldId: UUIDString;
  position: number;
}
```
### Return Type
Recall that executing the `ReorderFormField` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ReorderFormFieldData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ReorderFormFieldData {
  formField_update?: FormField_Key | null;
}
```
### Using `ReorderFormField`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, reorderFormField, ReorderFormFieldVariables } from '@clubox/dataconnect';

// The `ReorderFormField` mutation requires an argument of type `ReorderFormFieldVariables`:
const reorderFormFieldVars: ReorderFormFieldVariables = {
  clubId: ..., 
  formId: ..., 
  fieldId: ..., 
  position: ..., 
};

// Call the `reorderFormField()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await reorderFormField(reorderFormFieldVars);
// Variables can be defined inline as well.
const { data } = await reorderFormField({ clubId: ..., formId: ..., fieldId: ..., position: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await reorderFormField(dataConnect, reorderFormFieldVars);

console.log(data.formField_update);

// Or, you can use the `Promise` API.
reorderFormField(reorderFormFieldVars).then((response) => {
  const data = response.data;
  console.log(data.formField_update);
});
```

### Using `ReorderFormField`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, reorderFormFieldRef, ReorderFormFieldVariables } from '@clubox/dataconnect';

// The `ReorderFormField` mutation requires an argument of type `ReorderFormFieldVariables`:
const reorderFormFieldVars: ReorderFormFieldVariables = {
  clubId: ..., 
  formId: ..., 
  fieldId: ..., 
  position: ..., 
};

// Call the `reorderFormFieldRef()` function to get a reference to the mutation.
const ref = reorderFormFieldRef(reorderFormFieldVars);
// Variables can be defined inline as well.
const ref = reorderFormFieldRef({ clubId: ..., formId: ..., fieldId: ..., position: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = reorderFormFieldRef(dataConnect, reorderFormFieldVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.formField_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.formField_update);
});
```

## SubmitPublicInscription
You can execute the `SubmitPublicInscription` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):
```typescript
submitPublicInscription(vars: SubmitPublicInscriptionVariables): MutationPromise<SubmitPublicInscriptionData, SubmitPublicInscriptionVariables>;

interface SubmitPublicInscriptionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SubmitPublicInscriptionVariables): MutationRef<SubmitPublicInscriptionData, SubmitPublicInscriptionVariables>;
}
export const submitPublicInscriptionRef: SubmitPublicInscriptionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
submitPublicInscription(dc: DataConnect, vars: SubmitPublicInscriptionVariables): MutationPromise<SubmitPublicInscriptionData, SubmitPublicInscriptionVariables>;

interface SubmitPublicInscriptionRef {
  ...
  (dc: DataConnect, vars: SubmitPublicInscriptionVariables): MutationRef<SubmitPublicInscriptionData, SubmitPublicInscriptionVariables>;
}
export const submitPublicInscriptionRef: SubmitPublicInscriptionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the submitPublicInscriptionRef:
```typescript
const name = submitPublicInscriptionRef.operationName;
console.log(name);
```

### Variables
The `SubmitPublicInscription` mutation requires an argument of type `SubmitPublicInscriptionVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SubmitPublicInscriptionVariables {
  publicSlug: string;
  submittedData: unknown;
}
```
### Return Type
Recall that executing the `SubmitPublicInscription` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SubmitPublicInscriptionData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SubmitPublicInscriptionData {
  inscription_insert: Inscription_Key;
}
```
### Using `SubmitPublicInscription`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, submitPublicInscription, SubmitPublicInscriptionVariables } from '@clubox/dataconnect';

// The `SubmitPublicInscription` mutation requires an argument of type `SubmitPublicInscriptionVariables`:
const submitPublicInscriptionVars: SubmitPublicInscriptionVariables = {
  publicSlug: ..., 
  submittedData: ..., 
};

// Call the `submitPublicInscription()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await submitPublicInscription(submitPublicInscriptionVars);
// Variables can be defined inline as well.
const { data } = await submitPublicInscription({ publicSlug: ..., submittedData: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await submitPublicInscription(dataConnect, submitPublicInscriptionVars);

console.log(data.inscription_insert);

// Or, you can use the `Promise` API.
submitPublicInscription(submitPublicInscriptionVars).then((response) => {
  const data = response.data;
  console.log(data.inscription_insert);
});
```

### Using `SubmitPublicInscription`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, submitPublicInscriptionRef, SubmitPublicInscriptionVariables } from '@clubox/dataconnect';

// The `SubmitPublicInscription` mutation requires an argument of type `SubmitPublicInscriptionVariables`:
const submitPublicInscriptionVars: SubmitPublicInscriptionVariables = {
  publicSlug: ..., 
  submittedData: ..., 
};

// Call the `submitPublicInscriptionRef()` function to get a reference to the mutation.
const ref = submitPublicInscriptionRef(submitPublicInscriptionVars);
// Variables can be defined inline as well.
const ref = submitPublicInscriptionRef({ publicSlug: ..., submittedData: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = submitPublicInscriptionRef(dataConnect, submitPublicInscriptionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.inscription_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.inscription_insert);
});
```

