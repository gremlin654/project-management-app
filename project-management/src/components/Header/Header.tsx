import React from 'react';
import { Alert, AlertTitle, Box, Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ViewKanbanOutlinedIcon from '@mui/icons-material/ViewKanbanOutlined';
import { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { PATH__ROUTES } from 'utils/path_routes';
import { Link } from 'react-router-dom';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import './Header.scss';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { userSlice } from 'store/reducers/userSlice';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import AppsIcon from '@mui/icons-material/Apps';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import { boardsSlice } from 'store/reducers/boardsSlice';

const logoStyle = {
  mr: 'auto',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  color: 'inherit',
};

const logoIconStyle = {
  width: { xs: '3rem', md: '4rem' },
  height: { xs: '3rem', md: '4rem' },
  color: '#000000',
};

const logoTextStyle = {
  display: { xs: 'none', md: 'inline-flex' },
  fontFamily: 'monospace',
  fontSize: { xs: '2rem', md: '2.3rem' },
  fontWeight: 700,
  letterSpacing: '.15rem',
  textDecoration: 'none',
  color: '#000000',
};

const langContainerStyle = {
  height: '3rem',
  mr: '2rem',
  '@media (max-width: 648px)': {
    height: '2.4rem',
  },
};

const langBtnStyle = {
  fontSize: { xs: '0.8rem', md: '1rem' },
  fontWeight: 600,
  padding: 0,
  width: '3rem',
  color: '#000000',
  '&.Mui-selected': { backgroundColor: 'rgb(108 99 255 / 51%)', color: '#ffffff' },
  '@media (max-width: 648px)': {
    width: '2.4rem',
  },
};

const loginContainerStyle = {
  display: 'flex',
  gap: '1rem',
};

const loginBtnStyle = {
  height: '4rem',
  fontWeight: 600,
  fontSize: { xs: '1.2rem', md: '1.4rem' },
  padding: { xs: '0.6rem 0.2rem', md: '0.6rem 1.6rem' },
  gap: ' 0.5rem',
  alignItems: 'center',
  '@media (max-width: 648px)': {
    padding: 0,
    height: '3rem',
    minWidth: '3rem',
    background: 'transparent',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#3f3d5629!important;',
    },
  },
};

const buttonTextSignUp = {
  fontWeight: 600,
  fontSize: '1.4rem',
  '@media (max-width: 648px)': {
    display: 'none',
  },
};

const buttonIconStyle = {
  width: '2rem',
  height: '2rem',
  '@media (max-width: 648px)': { width: '3rem', height: '3rem' },
};

export const Header = () => {
  const { token } = useAppSelector((state) => state.user);
  const { successful, unsuccessful, message } = useAppSelector((state) => state.notifications);
  const { setAddBoardModal } = boardsSlice.actions;
  const { setToken } = userSlice.actions;
  const dispatch = useAppDispatch();
  const [alignment, setAlignment] = useState<string>('web');

  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setAlignment(newAlignment);
  };

  const handleExit = () => {
    localStorage.removeItem('token');
    setToken('');
    location.assign('/');
  };

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <AppBar
      position='sticky'
      sx={{
        transition: 'all 0.3s',
        backgroundColor: trigger ? 'rgb(129, 212, 250)' : 'transparent',
      }}
    >
      {unsuccessful && (
        <Alert severity='error' className='registration__error'>
          <AlertTitle className='registration__error__title'>Error</AlertTitle>
          {message}
          <strong> check it out!</strong>
        </Alert>
      )}
      {successful && (
        <Alert severity='success' className='registration__success'>
          <AlertTitle>Success</AlertTitle>
          {message} — <strong>check it out!</strong>
        </Alert>
      )}
      <Toolbar>
        <Typography variant='h6' noWrap component={Link} to={PATH__ROUTES.MAIN} sx={logoStyle}>
          <ViewKanbanOutlinedIcon sx={logoIconStyle} />
          <Typography variant='h6' component='span' sx={logoTextStyle}>
            PMApp
          </Typography>
        </Typography>
        <ToggleButtonGroup
          color='primary'
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label='Platform'
          sx={langContainerStyle}
        >
          <ToggleButton className='header__button-lang' value='web' sx={langBtnStyle}>
            ENG
          </ToggleButton>
          <ToggleButton className='header__button-lang' value='android' sx={langBtnStyle}>
            RUS
          </ToggleButton>
        </ToggleButtonGroup>
        {token ? (
          <Box sx={loginContainerStyle}>
            <Button
              variant='contained'
              component={Link}
              to={PATH__ROUTES.BOARDS}
              sx={{
                ...loginBtnStyle,
                backgroundColor: '#6c63ff',
                '&:hover': { backgroundColor: '#9f9af1' },
              }}
            >
              <AppsIcon sx={buttonIconStyle} />
              <Typography sx={buttonTextSignUp}>Boards</Typography>
            </Button>
            <Button
              variant='contained'
              sx={{
                ...loginBtnStyle,
                backgroundColor: '#6c63ff',
                '&:hover': { backgroundColor: '#9f9af1' },
              }}
              onClick={() => dispatch(setAddBoardModal(true))}
            >
              <DashboardCustomizeIcon sx={buttonIconStyle} />
              <Typography sx={buttonTextSignUp}>Add Board</Typography>
            </Button>
            <Button
              variant='contained'
              component={Link}
              to={PATH__ROUTES.PROFILE}
              sx={{
                ...loginBtnStyle,
                backgroundColor: '#6c63ff',
                '&:hover': { backgroundColor: '#9f9af1' },
              }}
            >
              <AccountBoxIcon sx={buttonIconStyle} />
              <Typography sx={buttonTextSignUp}>Profile</Typography>
            </Button>
            <Button
              variant='contained'
              sx={{
                ...loginBtnStyle,
                backgroundColor: '#ffffa5',
                color: '#000000',
                '&:hover': { backgroundColor: '#ffffcc' },
              }}
              onClick={() => handleExit()}
            >
              <LogoutIcon sx={buttonIconStyle} />
              <Typography sx={buttonTextSignUp}>Sign Out</Typography>
            </Button>
          </Box>
        ) : (
          <Box sx={loginContainerStyle}>
            <Button
              variant='contained'
              sx={{
                ...loginBtnStyle,
                backgroundColor: '#ffffa5',
                color: '#000000',
                '&:hover': { backgroundColor: '#ffffcc' },
              }}
              component={Link}
              to={PATH__ROUTES.LOGIN}
            >
              <LoginIcon sx={buttonIconStyle} />
              <Typography sx={buttonTextSignUp}>Sign In</Typography>
            </Button>
            <Button
              variant='contained'
              component={Link}
              to={PATH__ROUTES.REGISTRATION}
              sx={{
                ...loginBtnStyle,
                backgroundColor: '#6c63ff',
                '&:hover': { backgroundColor: '#9f9af1' },
              }}
            >
              <PersonAddIcon sx={buttonIconStyle} />
              <Typography sx={buttonTextSignUp}>Sign Up</Typography>
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};
