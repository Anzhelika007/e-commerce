import * as yup from 'yup';

const validationAddress = yup.object({
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
  shipping: yup.boolean(),
  billing: yup.boolean(),
  shippingDefault: yup.boolean(),
  billingDefault: yup.boolean(),
});

export const ValidationSchemaAddress = yup
  .object({
    address: validationAddress,
  })
  .required();

// TYPES
export type ValidationAddressType = yup.InferType<
  typeof ValidationSchemaAddress
>;
