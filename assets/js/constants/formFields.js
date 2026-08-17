const baseFields = Object.freeze([
  field("firstName", "Nombre", "text", true),
  field("lastName", "Apellidos", "text", true),
  field("birthDate", "Fecha de nacimiento", "date", true),
  field("nationalId", "DNI", "text", true)
]);

export const formTypes = Object.freeze([
  "DEPORTISTA",
  "SOCIO",
  "TORNEO",
  "EVENTO",
  "VOLUNTARIO"
]);

export const formFields = Object.freeze({
  DEPORTISTA: fieldSet([
    field("phone", "Telefono", "tel"),
    field("email", "Email", "email"),
    field("address", "Direccion", "text")
  ]),
  SOCIO: fieldSet([
    field("phone", "Telefono", "tel"),
    field("email", "Email", "email"),
    field("address", "Direccion", "text")
  ]),
  TORNEO: fieldSet([
    field("phone", "Telefono", "tel"),
    field("email", "Email", "email"),
    field("clubOrigin", "Club de origen", "text"),
    field("teamName", "Equipo", "text"),
    field("category", "Categoria", "text"),
    field("notes", "Observaciones", "textarea")
  ]),
  EVENTO: fieldSet([
    field("phone", "Telefono", "tel"),
    field("email", "Email", "email"),
    field("address", "Direccion", "text"),
    field("organization", "Organizacion", "text"),
    field("notes", "Observaciones", "textarea")
  ]),
  VOLUNTARIO: fieldSet([
    field("phone", "Telefono", "tel"),
    field("email", "Email", "email"),
    field("address", "Direccion", "text"),
    field("availability", "Disponibilidad", "textarea"),
    field("experience", "Experiencia", "textarea"),
    field("notes", "Observaciones", "textarea")
  ])
});

export function getFormFields(formType) {
  return formFields[formType] || [];
}

export function getFormField(formType, fieldName) {
  return getFormFields(formType).find((fieldData) => fieldData.name === fieldName) || null;
}

function field(name, label, inputType, required = false) {
  return Object.freeze({ name, label, inputType, required });
}

function fieldSet(optionalFields) {
  return Object.freeze([...baseFields, ...optionalFields]);
}
