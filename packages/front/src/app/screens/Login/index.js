import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import i18next from 'i18next';

// Replace for project logo and/or banner
import PageLogo from '~assets/zerflogo.png';
import LoginBanner from '~assets/zerf-banner.jpg';
import { isValidEmail } from '~utils/validations';
import Input from '~app/components/Input';
import actionCreators from '~redux/Auth/actions';

import styles from './styles.module.scss';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const dispatch = useDispatch();

  const handleUserChange = event => {
    const { value } = event?.currentTarget;
    setEmailError(!isValidEmail(value) && i18next.t('Validations:invalidEmail'));
    setEmail(value);
  };

  const handlePassChange = event => setPassword(event?.currentTarget?.value);

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(actionCreators.signIn({ email, password }));
  };

  return (
    <div className="row full-width space-between">
      <div className={`column full-width center middle ${styles.loginContainer}`}>
        <img className={styles.loginIconTitle} src={PageLogo} alt="zerf-icon" />
        <h1 className={styles.loginWelcome}>{i18next.t('Login:welcome')}</h1>
        <form className={`column ${styles.loginFormContainer}`} onSubmit={handleSubmit}>
          <Input
            name="email"
            label={i18next.t('Login:user')}
            className="m-bottom-4"
            type="email"
            inputType="text"
            onChange={handleUserChange}
            value={email}
            error={emailError}
          />
          <Input
            name="password"
            label={i18next.t('Login:password')}
            className="m-bottom-4"
            type="password"
            inputType="text"
            value={password}
            onChange={handlePassChange}
          />
          <button type="submit" className={`row middle center m-bottom-4 ${styles.loginButton}`}>
            <span className={`${styles.loginButtonText} bold text-uppercase`}>
              {i18next.t('Login:login')}
            </span>
          </button>
          <span className={styles.forgotPassword}>{i18next.t('Login:forgotPassword')}</span>
        </form>
        <img src={LoginBanner} className={`full-width ${styles.loginBanner}`} />
      </div>
    </div>
  );
}

export default Login;
