import * as yup from 'yup';

// Validation all inputs
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
  .required('Field is required');

// LOGIN FORM VALID
export const validationSchema = yup
  .object({
    currentPassword: passwordValidation,
    newPassword: passwordValidation,
  })
  .required();

// TYPES
export type FormDataChangePassword = yup.InferType<typeof validationSchema>;
