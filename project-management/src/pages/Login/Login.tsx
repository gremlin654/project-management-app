import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { IError } from 'models/assets';
import React, { useEffect, useState } from 'react';
import { useLoginMutation } from 'store/actions/authAPi';
import { useGetAllUsersQuery, useGetUserByIdQuery } from 'store/actions/userApi';
import { notificationsSlice } from 'store/reducers/notifications';
import { userSlice } from 'store/reducers/userSlice';
import '../Registration/Registration.scss';
import '../../utils/i18n';
import { useTranslation } from 'react-i18next';

export function Login() {
  const { setUnsuccessful, setSuccessful, setMessage } = notificationsSlice.actions;

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const [loginIn] = useLoginMutation();
  const { data: allUsers, isError: getAllErr } = useGetAllUsersQuery('');

  const { setToken } = userSlice.actions;
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
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
      const response = await loginIn({ login, password }).unwrap();
      localStorage.setItem('token', response.token);
      dispatch(setToken(response.token));
      dispatch(setSuccessful(true));
      dispatch(setMessage('Login successful'));
      setTimeout(() => {
        dispatch(setSuccessful(false));
      }, 9000);
      localStorage.setItem('login', login);
      // localStorage.setItem(
      //   'userId',
      //   allUsers.find((user: { login: string; _id: string; name: string }) => user.login === login)
      //     ._id,
      // );
      location.assign('/');
    } catch (error) {
      const currentError = error as IError;
      dispatch(setUnsuccessful(true));
      dispatch(setMessage(currentError.data.message || 'Something went wrong'));
      setTimeout(() => {
        dispatch(setUnsuccessful(false));
        dispatch(setMessage(''));
      }, 9000);
    }
  };
  return (
    <div className='registration'>
      <form action='' onSubmit={(e) => handleSubmit(e)}>
        <div className='registration__form'>
          <div className='registration__form__title'>
            <h1>{t('signIn.title')}</h1>
          </div>
          <div className='registration__form__input'>
            <input
              autoComplete='off'
              type='text'
              placeholder={`${t('signIn.placeholder1')}`}
              name='login'
              onChange={(e) => handleInputChange(e)}
            />
          </div>

          <div className='registration__form__input'>
            <input
              autoComplete='off'
              type='text'
              placeholder={`${t('signIn.placeholder2')}`}
              name='password'
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <input
            type='submit'
            className='registration__form__input__submit'
            value={`${t('signIn.submitBtn')}`}
          />
        </div>
      </form>
    </div>
  );
}
