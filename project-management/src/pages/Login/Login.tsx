import { useAppDispatch } from 'hooks/redux';
import { IError } from 'models/assets';
import React, { useState } from 'react';
import { useLoginMutation } from 'store/actions/authAPi';
import { notificationsSlice } from 'store/reducers/notifications';
import { userSlice } from 'store/reducers/userSlice';
import '../Registration/Registration.scss';
export function Login() {
  const { setUnsuccessful, setSuccessful, setMessage } = notificationsSlice.actions;

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const [loginIn] = useLoginMutation();

  const { setToken } = userSlice.actions;
  const dispatch = useAppDispatch();

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
            <h1>Login</h1>
          </div>
          <div className='registration__form__input'>
            <input
              type='text'
              placeholder='Login'
              name='login'
              onChange={(e) => handleInputChange(e)}
            />
          </div>

          <div className='registration__form__input'>
            <input
              type='text'
              placeholder='Password'
              name='password'
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <input type='submit' className='registration__form__input__submit' value={'Submit'} />
        </div>
      </form>
    </div>
  );
}
