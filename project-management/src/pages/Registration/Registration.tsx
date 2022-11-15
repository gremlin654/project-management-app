import { useAppDispatch } from 'hooks/redux';
import React, { useState } from 'react';
import { useRegisterMutation, useLoginMutation } from 'store/actions/authAPi';
import { userSlice } from 'store/reducers/userSlice';
import './Registration.scss';
export function Registration() {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [register] = useRegisterMutation();
  const [loginIn] = useLoginMutation();
  const { setUser } = userSlice.actions;
  const dispatch = useAppDispatch();
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
      console.log('Registration successful');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='registration'>
      <form action='' onSubmit={(e) => handleSubmit(e)}>
        <div className='registration__form'>
          <div className='registration__form__title'>
            <h1>Registration</h1>
          </div>
          <div className='registration__form__input'>
            <input
              type='text'
              placeholder='Name'
              name='name'
              value={name}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className='registration__form__input'>
            <input
              type='text'
              placeholder='Login'
              name='login'
              value={login}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className='registration__form__input'>
            <input
              type='text'
              placeholder='Password'
              name='password'
              value={password}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <input type='submit' className='registration__form__input__submit' value={'Submit'} />
        </div>
      </form>
    </div>
  );
}
