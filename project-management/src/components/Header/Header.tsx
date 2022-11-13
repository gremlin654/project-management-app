import { Box, Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ViewKanbanOutlinedIcon from '@mui/icons-material/ViewKanbanOutlined';
import React from 'react';
import { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import './Header.scss';

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
  height: '4rem',
  fontWeight: 600,
  mr: '2rem',
};

const langBtnStyle = {
  fontSize: { xs: '0.8rem', md: '1rem' },
  fontWeight: 600,
  padding: { xs: '0.5rem', md: '1.1rem' },
  color: '#000000',
  '&.Mui-selected': { backgroundColor: 'rgb(108 99 255 / 51%)', color: '#ffffff' },
};

const loginContainerStyle = {
  display: 'flex',
  gap: '1rem',
};

const loginBtnStyle = {
  height: '4rem',
  fontWeight: 600,
  fontSize: { xs: '1.2rem', md: '1.4rem' },
  padding: { xs: '0.6rem 0.1rem', md: '0.6rem 1.6rem' },
};

export const Header = () => {
  const [alignment, setAlignment] = useState('web');

  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setAlignment(newAlignment);
  };

  return (
    <AppBar position='sticky' sx={{ backgroundColor: 'rgb(129, 212, 250)' }}>
      <Toolbar>
        <Typography variant='h6' noWrap component='a' href='#' sx={logoStyle}>
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
        <Box sx={loginContainerStyle}>
          <Button
            variant='contained'
            sx={{
              ...loginBtnStyle,
              backgroundColor: '#ffffa5',
              color: '#000000',
              '&:hover': { backgroundColor: '#ffffcc' },
            }}
          >
            Sign In
          </Button>
          <Button
            variant='contained'
            sx={{
              ...loginBtnStyle,
              backgroundColor: '#6c63ff',
              '&:hover': { backgroundColor: '#9f9af1' },
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
