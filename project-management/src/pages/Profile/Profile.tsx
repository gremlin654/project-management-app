import { Button, TextField } from '@mui/material';
import { Spinner } from 'components/Spinner/Spinner';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { IError } from 'models/assets';
import React, { useEffect, useState } from 'react';
import {
  useGetUserByIdQuery,
  useUserDeleteMutation,
  useUserUpdateMutation,
} from 'store/actions/userApi';
import { notificationsSlice } from 'store/reducers/notifications';
import './Profile.scss';
import '../../utils/i18n';
import { useTranslation } from 'react-i18next';

export function Profile() {
  const { setUnsuccessful, setSuccessful, setMessage } = notificationsSlice.actions;
  const dispatch = useAppDispatch();

  const [newName, setNewName] = useState('');
  const [newLogin, setNewLogin] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [nameBtn, setNameBtn] = useState(false);
  const [loginBtn, setLoginBtn] = useState(false);
  const [passwordBtn, setPasswordBtn] = useState(false);

  const [userUpdate, { isLoading: loading }] = useUserUpdateMutation();
  const [userDelete, { isLoading: loadingDelete }] = useUserDeleteMutation();
  const { id } = useAppSelector((state) => state.user);

  const { data, isLoading } = useGetUserByIdQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  const { t } = useTranslation();

  useEffect(() => {
    if (newName.length < 3 || !!newName.match(/[^a-zA-Zа-яА-Я]/)) {
      setNameBtn(true);
    } else {
      setNameBtn(false);
    }
    if (!!newLogin.match(/[^a-zA-Z0-9]/) || newLogin.length < 3) {
      setLoginBtn(true);
    } else {
      setLoginBtn(false);
    }
    if (!!newPassword.match(/[^a-zA-Z0-9]/) || newPassword.length < 6) {
      setPasswordBtn(true);
    } else {
      setPasswordBtn(false);
    }
  }, [newName, newLogin, newPassword]);

  const handleUserDelete = async () => {
    try {
      await userDelete(id).unwrap();
      dispatch(setSuccessful(true));
      dispatch(setMessage('User deleted'));
      setTimeout(() => {
        dispatch(setSuccessful(false));
      }, 9000);
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      location.assign('/');
    } catch (e) {
      const errorMessage = e as IError;
      dispatch(setUnsuccessful(true));
      dispatch(setMessage(errorMessage.data.message));
      setTimeout(() => {
        dispatch(setUnsuccessful(false));
      }, 9000);
    }
  };

  const handleUserChange = async () => {
    try {
      await userUpdate({ id, name: newName, login: newLogin, password: newPassword }).unwrap();
      dispatch(setSuccessful(true));
      dispatch(setMessage('User data changed'));
      setTimeout(() => {
        dispatch(setSuccessful(false));
        dispatch(setMessage(''));
      }, 9000);
    } catch (err) {
      const errMessage = err as IError;
      dispatch(setMessage(errMessage.data.message));
      dispatch(setUnsuccessful(true));
      setTimeout(() => {
        dispatch(setUnsuccessful(false));
        dispatch(setMessage(''));
      }, 9000);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      setNewName(data.name);
      setNewLogin(data.login);
    }
  }, [data]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setNewName(value);
        break;
      case 'login':
        setNewLogin(value);
        break;
      case 'password':
        setNewPassword(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className='profile'>
      <h1>{t('profile.title')}</h1>
      <div className='profile__info'>
        <div className='profile__info__container'>
          <h2>{t('profile.changeNameTitle')}</h2>
          <TextField
            id='standard-basic'
            variant='standard'
            autoComplete='off'
            inputProps={{ style: { fontSize: 20 } }} // font size of input text
            InputLabelProps={{ style: { fontSize: 20 } }} // font size of input label
            FormHelperTextProps={{ style: { fontSize: 10 } }} // font size of helper text
            value={newName}
            onChange={(e) => handleInputChange(e)}
            name='name'
            error={newName.length < 3 || !!newName.match(/[^a-zA-Zа-яА-Я]/)}
            helperText={t('profile.changeNameHelper')}
          />
        </div>
        <div className='profile__info__container'>
          <h2>{t('profile.changeLoginTitle')}</h2>
          <TextField
            id='standard-basic'
            variant='standard'
            name='login'
            inputProps={{ style: { fontSize: 20 } }} // font size of input text
            InputLabelProps={{ style: { fontSize: 20 } }} // font size of input label
            FormHelperTextProps={{ style: { fontSize: 10 } }} // font size of helper text
            value={newLogin}
            onChange={(e) => handleInputChange(e)}
            error={newLogin.length < 3 || !!newLogin.match(/[^a-zA-Z0-9]/)}
            helperText={t('profile.changeLoginHelper')}
          />
        </div>
        <div className='profile__info__container'>
          <h2>{t('profile.changePasswordTitle')}</h2>
          <TextField
            id='standard-basic'
            variant='standard'
            name='password'
            inputProps={{ style: { fontSize: 20 } }} // font size of input text
            InputLabelProps={{ style: { fontSize: 20 } }} // font size of input label
            FormHelperTextProps={{ style: { fontSize: 10 } }} // font size of helper text
            value={newPassword}
            onChange={(e) => handleInputChange(e)}
            error={newPassword.length < 6 || !!newPassword.match(/[^a-zA-Z0-9]/)}
            helperText={t('profile.changePasswordHelper')}
          />
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <Button
          className='profile__btn'
          disabled={loginBtn || nameBtn || passwordBtn}
          sx={{
            marginTop: '4em',
            height: '8vh',
            width: '35vh',
            fontSize: '25px',
          }}
          onClick={() => handleUserChange()}
          variant='contained'
        >
          {t('profile.changeBtn')}
        </Button>
      )}
      {loadingDelete ? (
        <div className='box'>
          <div className='spinner ease'></div>
        </div>
      ) : (
        <Button
          className='profile__btn'
          sx={{
            fontSize: '15px',
            display: 'block',
            margin: '5em auto',
          }}
          onClick={() => handleUserDelete()}
          variant='outlined'
          color='error'
        >
          {t('profile.deleteBtn')}
        </Button>
      )}
    </div>
  );
}
