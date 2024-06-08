import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import {
  validationSchemaLogin,
  FormDataLogin,
  placeholder,
} from '../validationRulesInput';
import { useAppDispatch } from '../../../redux/hooks';
import {
  setUserLogged,
  User,
  setAuthToken,
  AuthToken,
} from '../../../redux/store/userSlice';
import { login } from '../../../services/api/login';
import store from '../../../redux/store/store';
import Input from '../elements/input';
import Password from '../elements/password';
import { getCustomerInfo } from '../../../services/api/getCustomerInfo';

function LoginForm(): React.ReactElement {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    const appTokenStore = store.getState().userSlice.authToken.access_token;
    if (appTokenStore.length > 0) {
      navigate(`/`);
    }
  });

  const dispatch = useAppDispatch();
  const setAuthUserToken = (tokenNew: AuthToken) => {
    dispatch(setAuthToken(tokenNew));
  };
  const setUserLogIn = (userNew: User) => {
    dispatch(setUserLogged(userNew));
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<FormDataLogin>({
    resolver: yupResolver(validationSchemaLogin),
    mode: 'onChange',
  });

  // Disable button submit
  useEffect(() => {
    setIsSubmitDisabled(!isValid && isDirty);
  }, [isValid, isDirty]);

  const onSubmit = async (data: FormDataLogin) => {
    const tokenNew = await login(data);

    if (tokenNew.statusCode) {
      const { message } = tokenNew;
      const errorsBlock = document.getElementById('errorsAnswer');
      if (message && errorsBlock) {
        errorsBlock.innerText = message;
        setTimeout(() => {
          errorsBlock.innerText = '';
        }, 5000);
      }
    } else {
      setAuthUserToken(tokenNew);
      const userInfo = await getCustomerInfo();

      if (userInfo) setUserLogIn(userInfo);

      navigate(`/`);
    }
    return data;
  };

  return (
    <form className="form__login form" onSubmit={handleSubmit(onSubmit)}>
      <legend>Login</legend>

      <Input
        id="email"
        classNameComponent="input-wrapper form__login-wrapper"
        title="Email"
        isRequared
        placeholder={placeholder.email}
        className="form__login-login input-text"
        errorMessage={errors.email?.message}
        registerObject={register('email')}
      />

      <Password
        id="password"
        classNameComponent="input-wrapper form__login-wrapper"
        title="Password"
        isRequared
        className="form__registration-password input-text"
        classNameButton="btn-submit btn-show"
        errorMessage={errors.password?.message}
        registerObject={register('password')}
      />

      <div className="input-wrapper form__login-wrapper">
        <div className="input-error" id="errorsAnswer" />
        <button
          type="submit"
          className="btn-submit form__login-btn"
          disabled={isSubmitDisabled}
        >
          Login
        </button>
      </div>
      <div className="input-wrapper link-box form__login-wrapper">
        <span className="link-text">
          If you don&apos;t have an account,
          <br /> you can register here
        </span>
        <Link to="/registration" className="btn-submit link">
          Register
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;
