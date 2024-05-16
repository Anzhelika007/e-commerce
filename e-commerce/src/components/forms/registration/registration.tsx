import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import {
  validationSchemaRegister,
  FormDataRegister,
  placeholder,
} from '../validationRulesInput';

function RegistrationForm(): React.ReactElement {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid, isDirty },
    trigger,
  } = useForm<FormDataRegister>({
    resolver: yupResolver(validationSchemaRegister),
    mode: 'onTouched',
  });

  // dis btn submit
  useEffect(() => {
    setIsSubmitDisabled(!(isValid && isDirty));
  }, [isValid, isDirty]);

  // address for invoice
  const watchShowAddressInvoice = watch('addressForInvoice', true);

  const onSubmit = (data: FormDataRegister) => {
    const dataUser = data;
    return dataUser;
  };

  return (
    <form className="form__registration form" onSubmit={handleSubmit(onSubmit)}>
      <legend>Registration</legend>

      <div className="input-wrapper-line">
        <div className="input-wrapper-names">
          <label htmlFor="firstName">
            first Name:
            <input
              id="firstName"
              type="text"
              placeholder={placeholder.firstName}
              className={`form__registration-firstName input-text ${
                errors.firstName ? 'error-background-input' : ''
              }`}
              /* eslint-disable react/jsx-props-no-spreading */
              {...register('firstName', { onBlur: () => trigger('firstName') })}
            />
            {errors.firstName && (
              <div className="input-error">{errors.firstName.message}</div>
            )}
          </label>
        </div>

        <div className="input-wrapper-names">
          <label htmlFor="lastName">
            last Name:
            <input
              id="lastName"
              type="text"
              placeholder={placeholder.lastName}
              className={`form__registration-lastName input-text ${
                errors.lastName ? 'error-background-input' : ''
              }`}
              /* eslint-disable react/jsx-props-no-spreading */
              {...register('lastName', { onBlur: () => trigger('lastName') })}
            />
            {errors.lastName && (
              <div className="input-error">{errors.lastName.message}</div>
            )}
          </label>
        </div>

        <div className="input-wrapper-names">
          <label htmlFor="dateOfBirth">
            Date of Birth:
            <input
              id="dateOfBirth"
              type="date"
              className={`form__registration-login input-text ${
                errors.dateOfBirth ? 'error-background-input' : ''
              }`}
              /* eslint-disable react/jsx-props-no-spreading */
              {...register('dateOfBirth', {
                onBlur: () => trigger('dateOfBirth'),
              })}
            />
            {errors.dateOfBirth && (
              <div className="input-error">{errors.dateOfBirth.message}</div>
            )}
          </label>
        </div>
      </div>

      <div className="registration-adress">
        <div className="registration-address-title">Shipping address</div>
        <div className="input-wrapper-address">
          <label htmlFor="address.street">
            Street
            <input
              id="address.street"
              type="text"
              className={`form__registration-adress input-text ${
                errors.address?.street ? 'error-background-input' : ''
              }`}
              /* eslint-disable react/jsx-props-no-spreading */
              {...register('address.street', {
                onBlur: () => trigger('address.street'),
              })}
            />
          </label>
          {errors.address?.street && (
            <div className="input-error">{errors.address.street.message}</div>
          )}
        </div>

        <div className="input-wrapper-address">
          <label htmlFor="address.city">
            City
            <input
              id="address.city"
              type="text"
              className={`form__registration-adress input-text ${
                errors.address?.city ? 'error-background-input' : ''
              }`}
              /* eslint-disable react/jsx-props-no-spreading */
              {...register('address.city', {
                onBlur: () => trigger('address.city'),
              })}
            />
          </label>
          {errors.address?.city && (
            <div className="input-error">{errors.address.city.message}</div>
          )}
        </div>

        <div className="input-wrapper-address">
          <label htmlFor="address.country">
            Country
            <select
              id="address.country"
              className={`form__registration-adress input-text ${
                errors.address?.country ? 'error-background-input' : ''
              }`}
              /* eslint-disable react/jsx-props-no-spreading */
              {...register('address.country', {
                onBlur: () => trigger('address.country'),
              })}
              onChange={() =>
                setValue('address.postalCode', '', {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
            >
              <option value="">--- Choose ---</option>
              <option value="Belarus">Belarus</option>
              <option value="Georgia">Georgia</option>
              <option value="Russia">Russia</option>
              <option value="Ukraine">Ukraine</option>
            </select>
          </label>
          {errors.address?.country && (
            <div className="input-error">{errors.address.country.message}</div>
          )}
        </div>

        <div className="input-wrapper-address">
          <label htmlFor="address.postalCode">
            POST Code
            <input
              id="address.postalCode"
              type="text"
              className={`form__registration-adress input-text ${
                errors.address?.postalCode ? 'error-background-input' : ''
              }`}
              /* eslint-disable react/jsx-props-no-spreading */
              {...register('address.postalCode', {
                onBlur: () => trigger('address.postalCode'),
              })}
            />
          </label>
          {errors.address?.postalCode && (
            <div className="input-error">
              {errors.address.postalCode.message}
            </div>
          )}
        </div>
      </div>

      <label htmlFor="addressForInvoice">
        <input
          type="checkbox"
          id="addressForInvoice"
          className="input-checkbox"
          {...register('addressForInvoice')}
        />
        Is your shipping address the same as your billing address?
      </label>
      {!watchShowAddressInvoice && (
        <fieldset className="fieldset">
          Address for invoices
          <div className="registration-adress">
            <div className="input-wrapper-address">
              <label htmlFor="address.street">
                Street
                <input
                  id="address.street"
                  type="text"
                  className={`form__registration-adress input-text ${
                    errors.address?.street ? 'error-background-input' : ''
                  }`}
                  /* eslint-disable react/jsx-props-no-spreading */
                  {...register('address.street', {
                    onBlur: () => trigger('address.street'),
                  })}
                />
              </label>
              {errors.address?.street && (
                <div className="input-error">
                  {errors.address.street.message}
                </div>
              )}
            </div>

            <div className="input-wrapper-address">
              <label htmlFor="address.city">
                City
                <input
                  id="address.city"
                  type="text"
                  className={`form__registration-adress input-text ${
                    errors.address?.city ? 'error-background-input' : ''
                  }`}
                  /* eslint-disable react/jsx-props-no-spreading */
                  {...register('address.city', {
                    onBlur: () => trigger('address.city'),
                  })}
                />
              </label>
              {errors.address?.city && (
                <div className="input-error">{errors.address.city.message}</div>
              )}
            </div>

            <div className="input-wrapper-address">
              <label htmlFor="address.country">
                Country
                <select
                  id="address.country"
                  className={`form__registration-adress input-text ${
                    errors.address?.country ? 'error-background-input' : ''
                  }`}
                  /* eslint-disable react/jsx-props-no-spreading */
                  {...register('address.country', {
                    onBlur: () => trigger('address.country'),
                  })}
                  onChange={() =>
                    setValue('address.postalCode', '', {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                >
                  <option value="">--- Choose ---</option>
                  <option value="Belarus">Belarus</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Russia">Russia</option>
                  <option value="Ukraine">Ukraine</option>
                </select>
              </label>
              {errors.address?.country && (
                <div className="input-error">
                  {errors.address.country.message}
                </div>
              )}
            </div>

            <div className="input-wrapper-address">
              <label htmlFor="address.postalCode">
                POST Code
                <input
                  id="address.postalCode"
                  type="text"
                  className={`form__registration-adress input-text ${
                    errors.address?.postalCode ? 'error-background-input' : ''
                  }`}
                  /* eslint-disable react/jsx-props-no-spreading */
                  {...register('address.postalCode', {
                    onBlur: () => trigger('address.postalCode'),
                  })}
                />
              </label>
              {errors.address?.postalCode && (
                <div className="input-error">
                  {errors.address.postalCode.message}
                </div>
              )}
            </div>
          </div>
        </fieldset>
      )}
      {watchShowAddressInvoice && (
        <fieldset className="fieldset">
          Address for invoices
          <div className="registration-adress">
            <div className="input-wrapper-address">
              <label htmlFor="address.street">
                Street
                <input
                  id="address.street"
                  type="text"
                  disabled
                  className={`form__registration-adress input-text ${
                    errors.address?.street ? 'error-background-input' : ''
                  }`}
                  /* eslint-disable react/jsx-props-no-spreading */
                  {...register('address.street', {
                    onBlur: () => trigger('address.street'),
                  })}
                />
              </label>
              {errors.address?.street && (
                <div className="input-error">
                  {errors.address.street.message}
                </div>
              )}
            </div>

            <div className="input-wrapper-address">
              <label htmlFor="address.city">
                City
                <input
                  id="address.city"
                  type="text"
                  disabled
                  className={`form__registration-adress input-text ${
                    errors.address?.city ? 'error-background-input' : ''
                  }`}
                  /* eslint-disable react/jsx-props-no-spreading */
                  {...register('address.city', {
                    onBlur: () => trigger('address.city'),
                  })}
                />
              </label>
              {errors.address?.city && (
                <div className="input-error">{errors.address.city.message}</div>
              )}
            </div>

            <div className="input-wrapper-address">
              <label htmlFor="address.country">
                Country
                <select
                  id="address.country"
                  disabled
                  className={`form__registration-adress input-text input-select ${
                    errors.address?.country ? 'error-background-input' : ''
                  }`}
                  /* eslint-disable react/jsx-props-no-spreading */
                  {...register('address.country', {
                    onBlur: () => trigger('address.country'),
                  })}
                  onChange={() =>
                    setValue('address.postalCode', '', {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                >
                  <option value="">--- Choose ---</option>
                  <option value="Belarus">Belarus</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Russia">Russia</option>
                  <option value="Ukraine">Ukraine</option>
                </select>
              </label>
              {errors.address?.country && (
                <div className="input-error">
                  {errors.address.country.message}
                </div>
              )}
            </div>

            <div className="input-wrapper-address">
              <label htmlFor="address.postalCode">
                POST Code
                <input
                  id="address.postalCode"
                  type="text"
                  disabled
                  className={`form__registration-adress input-text ${
                    errors.address?.postalCode ? 'error-background-input' : ''
                  }`}
                  /* eslint-disable react/jsx-props-no-spreading */
                  {...register('address.postalCode', {
                    onBlur: () => trigger('address.postalCode'),
                  })}
                />
              </label>
              {errors.address?.postalCode && (
                <div className="input-error">
                  {errors.address.postalCode.message}
                </div>
              )}
            </div>
          </div>
        </fieldset>
      )}

      <div className="input-wrapper-line">
        <div className="input-wrapper">
          <label htmlFor="email">
            Email:
            <input
              id="email"
              type="text"
              className={`form__registration-email input-text ${
                errors.email ? 'error-background-input' : ''
              }`}
              /* eslint-disable react/jsx-props-no-spreading */
              {...register('email', { onBlur: () => trigger('email') })}
            />
            {errors.email && (
              <div className="input-error">{errors.email.message}</div>
            )}
          </label>
        </div>

        <div className="input-wrapper">
          <label htmlFor="password">
            Password:
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className={`form__registration-password input-text ${errors.password ? 'error-background-input' : ''}`}
              /* eslint-disable react/jsx-props-no-spreading */
              {...register('password', { onBlur: () => trigger('password') })}
            />
          </label>
          {errors.password && (
            <div className="input-error">{errors.password.message}</div>
          )}
          <button
            type="button"
            className="btn-show"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>

      <div className="input-wrapper-btn">
        <button
          type="submit"
          className="btn-submit"
          disabled={isSubmitDisabled}
        >
          Register
        </button>
      </div>
      <div className="input-wrapper-link link-box">
        <span className="link-text">
          If you have an account, you can logIn here
        </span>
        <Link to="/login" className="btn-submit link">
          Login
        </Link>
      </div>
    </form>
  );
}

export default RegistrationForm;
