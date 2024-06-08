import * as yup from 'yup';

// Validation all inputs
const emailValidation = yup
  .string()
  .required('Email is required')
  .test(
    'no-spaces',
    'Email must not contain spaces',
    (value) => !/\s/.test(value || '')
  )
  .email('Email must be properly formatted (e.g., example@email.com)')
  .test(
    'formatted',
    'Email must be contain a domain name (e.g., example.com)',
    (value) => /^[A-Z0-9._%+-]+@[A-Z0-9-]+\.[A-Z]{2,4}$/i.test(value || '')
  );

const firstNameValidation = yup
  .string()
  .required('First name is required')
  .matches(
    /^[A-Za-z]+$/,
    'First name must contain at least one character and no special characters or numbers'
  );

const lastNameValidation = yup
  .string()
  .required('Last name is required')
  .matches(
    /^[A-Za-z]+$/,
    'Last name must contain at least one character and no special characters or numbers'
  );

// dateOfBirth
const minimumAge = 13;
const today = new Date();
export const minimumDateOfBirth = new Date(
  today.getFullYear() - minimumAge,
  today.getMonth(),
  today.getDate()
);

const dateOfBirthValidation = yup
  .date()
  .nullable()
  .typeError('Date of birth is required')
  .required('Date of birth is required')
  .max(minimumDateOfBirth, 'You must be at least 13 years old');

// REGISTER FORM VALID
export const validationSchemaMain = yup
  .object({
    email: emailValidation,
    firstName: firstNameValidation,
    lastName: lastNameValidation,
    dateOfBirth: dateOfBirthValidation,
  })
  .required();

// TYPES
export type ValidationSchemaCall = yup.InferType<typeof validationSchemaMain>;
