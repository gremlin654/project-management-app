import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { IError } from '../../models/assets';
import React, { useState } from 'react';
import { useRegisterMutation, useLoginMutation } from 'store/actions/authAPi';
import { notificationsSlice } from 'store/reducers/notifications';
import { userSlice } from 'store/reducers/userSlice';
import './Registration.scss';
import '../../utils/i18n';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router';
import { PATH__ROUTES } from 'utils/path_routes';

export function Registration() {
  const { setUnsuccessful, setSuccessful, setMessage } = notificationsSlice.actions;
  const { token } = useAppSelector((state) => state.user);

  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const [register] = useRegisterMutation();
  const [loginIn] = useLoginMutation();

  const { setUser } = userSlice.actions;
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  if (token) {
    return <Navigate to={PATH__ROUTES.BOARDS} />;
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'login':
        setLogin(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await register({ name, login, password }).unwrap();
      const loginResponse = await loginIn({ login, password }).unwrap();
      localStorage.setItem('token', loginResponse.token);
      localStorage.setItem('userId', response._id);
      localStorage.setItem('login', login);
      const newUser = {
        name: response.name,
        login: response.login,
        id: response._id,
        token: loginResponse.token,
      };
      dispatch(setUser(newUser));
      setName('');
      setLogin('');
      setPassword('');
      dispatch(setSuccessful(true));
      dispatch(setMessage(t('signUp.regSucces')));
      setTimeout(() => {
        dispatch(setSuccessful(false));
      }, 9000);
      // location.assign('/');
    } catch (error) {
      const currentError = error as IError;
      dispatch(setUnsuccessful(true));
      dispatch(setMessage(currentError.data.message));
      setTimeout(() => {
        dispatch(setUnsuccessful(false));
        dispatch(setMessage(''));
      }, 9000);
    }
  };

  return (
    <div className='registration'>
      <form className='registration__form-container' action='' onSubmit={(e) => handleSubmit(e)}>
        <div className='registration__form'>
          <div className='registration__form__title'>
            <h1>{t('signUp.title')}</h1>
          </div>
          <div className='registration__form__input'>
            <input
              autoComplete='off'
              type='text'
              pattern='[A-Za-zА-Яа-яЁё]{2,100}'
              onInvalid={(e) => {
                e.currentTarget.setCustomValidity(t('signUp.valid1'));
              }}
              onInput={(e) => {
                e.currentTarget.setCustomValidity('');
              }}
              placeholder={`${t('signUp.placeholder1')}`}
              name='name'
              value={name}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className='registration__form__input'>
            <input
              autoComplete='off'
              type='text'
              pattern='[a-zA-Z0-9]{3,}'
              onInvalid={(e) => {
                e.currentTarget.setCustomValidity(t('signUp.valid2'));
              }}
              onInput={(e) => {
                e.currentTarget.setCustomValidity('');
              }}
              placeholder={`${t('signUp.placeholder2')}`}
              name='login'
              value={login}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className='registration__form__input'>
            <input
              autoComplete='off'
              type='text'
              pattern='[a-zA-Z0-9]{6,}'
              onInvalid={(e) => {
                e.currentTarget.setCustomValidity(t('signUp.valid3'));
              }}
              onInput={(e) => {
                e.currentTarget.setCustomValidity('');
              }}
              placeholder={`${t('signUp.placeholder3')}`}
              name='password'
              value={password}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <input
            type='submit'
            className='registration__form__input__submit'
            value={`${t('signUp.regBtn')}`}
          />
        </div>
      </form>
    </div>
  );
}
