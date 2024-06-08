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

const passwordValidation = yup
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
  .matches(/\d/, 'Password must contain at least one digit')
  .test(
    'no-spaces',
    'Password must not contain leading or trailing whitespace',
    (value) => !/^\s+|\s+$/.test(value || '')
  )
  .required('Password is required');

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

const addressValidation = yup.object({
  default: yup.boolean(),
  streetName: yup.string().required('Street is required'),
  city: yup
    .string()
    .required('City is required')
    .matches(
      /^[A-Za-z\s]+$/,
      'City must contain at least one character and no special characters or numbers'
    ),
  postalCode: yup
    .string()
    .required('Postal code is required')
    .test(
      'postal-code-fit-format',
      'Postal code must be 2#####',
      (value, validationContext) => {
        const {
          parent: { country },
        } = validationContext;

        if (country === '-') {
          return true;
        }
        if (country === 'BY') {
          return /^2[0-9]{5}$/.test(value || '');
        }
        return true;
      }
    )
    .test(
      'postal-code-fit-format',
      'Postal code must be 4 digit',
      (value, validationContext) => {
        const {
          parent: { country },
        } = validationContext;

        if (country === 'GE') {
          return /^[0-9]{4}$/.test(value || '');
        }
        return true;
      }
    )
    .test(
      'postal-code-fit-format',
      'Postal code must be 6 digit',
      (value, validationContext) => {
        const {
          parent: { country },
        } = validationContext;

        if (country === 'RU') {
          return /^[0-9]{6}$/.test(value || '');
        }
        return true;
      }
    )
    .test(
      'postal-code-fit-format',
      'Postal code must be 5 digit',
      (value, validationContext) => {
        const {
          parent: { country },
        } = validationContext;
        if (country === 'UA') {
          return /^[0-9]{5}$/.test(value || '');
        }
        return true;
      }
    ),
  country: yup // RSS-ECOMM-2_09: из предопределенного списка или поля автозаполнения. e-commerce - setting project - area
    .string()
    .required('Country is required')
    .oneOf(
      ['BY', 'GE', 'RU', 'UA'], // e-commerce - setting project - area
      'Country is required'
    ),
});

const addressForInvoice = yup.boolean();

// LOGIN FORM VALID
export const validationSchemaLogin = yup
  .object({
    email: emailValidation,
    password: passwordValidation,
  })
  .required();

// REGISTER FORM VALID
export const validationSchemaRegister = yup
  .object({
    email: emailValidation,
    password: passwordValidation,
    firstName: firstNameValidation,
    lastName: lastNameValidation,
    dateOfBirth: dateOfBirthValidation,
    address: addressValidation,
    addressForInvoice,
    addressInvoice: addressValidation,
  })
  .required();

// CALL FORM VALID
export const validationSchemaCall = yup
  .object({
    email: emailValidation,
    firstName: firstNameValidation,
  })
  .required();

// PLACEHOLDERS
export const placeholder = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'example@email.com',
  dateOfBirth: minimumDateOfBirth,
};

// TYPES
export type FormDataLogin = yup.InferType<typeof validationSchemaLogin>;
export type FormDataRegister = yup.InferType<typeof validationSchemaRegister>;
export type FormDataCall = yup.InferType<typeof validationSchemaCall>;
