import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useFormValidation from './useFormValidation';
import validateLogin from './validateLogin';
import firebase from '../../firebase';

const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
};

function Login(props) {
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    isSubmitting,
  } = useFormValidation(INITIAL_STATE, validateLogin, authenticateUser);
  const [login, setLogin] = useState(true);
  const [firebaseError, setFirebaseError] = useState(null);

  async function authenticateUser() {
    try {
      const { name, email, password } = values;

      login
        ? await firebase.login(email, password)
        : await firebase.register(name, email, password);

      props.history.push('/');
    } catch (error) {
      console.error('Authentication Error: ', error);
      setFirebaseError(error.message);
    }
  }

  return (
    <>
      <h2 className="mv3">{login ? 'Login' : 'Create Account'}</h2>

      <form onSubmit={handleSubmit} className="flex flex-column">
        {!login && (
          <input
            onChange={handleChange}
            value={values.name}
            name="name"
            type="text"
            placeholder="Your name"
            autoComplete="off"
          />
        )}

        <input
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          className={errors.email && 'error-input'}
          name="email"
          type="email"
          placeholder="Your email"
          autoComplete="off"
        />

        {errors.email && <p className="error-text">{errors.email}</p>}

        <input
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          className={errors.password && 'error-input'}
          name="password"
          type="password"
          placeholder="Your super secret password"
          autoComplete="off"
        />

        {errors.password && <p className="error-text">{errors.password}</p>}
        {firebaseError && <p className="error-text">{firebaseError}</p>}

        <div className="flex mt3">
          <button
            type="submit"
            className="button pointer mr2"
            disabled={isSubmitting}
            style={{ background: isSubmitting ? 'grey' : 'orange' }}
          >
            Submit
          </button>
          <button
            type="button"
            className="button pointer"
            onClick={() => setLogin(prevLogin => !prevLogin)}
          >
            {login ? 'Create new account' : 'Already have an account'}
          </button>
        </div>
      </form>
      <div className="forgot-password">
        <Link to="/forgot">Forgot password?</Link>
      </div>
    </>
  );
}

export default Login;
