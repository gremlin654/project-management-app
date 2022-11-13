import Button from '@mui/material/Button';
import React from 'react';
import './Main.scss';

export const Main = () => {
  return (
    <main className='main'>
      <section className='first-block__container'>
        <div className='first-block__text-container'>
          <h1 className='first-block__title'>Project Management Application</h1>
          <p className='first-block__text'>
            We are glad to present to your attention our application PMApp. With it, you can easily
            manage your project, be aware of all the tasks and control the progress of their
            implementation.
          </p>
          <p className='first-block__text'>
            Start with board, lists and cards. Manage projects, organize tasks, and build team
            spirit.
          </p>
          <Button
            variant='contained'
            sx={{
              m: '2rem auto 0',
              fontSize: '2rem',
              backgroundColor: '#6c63ff',
              '&:hover': { backgroundColor: '#9f9af1' },
            }}
          >
            GET STARTED
          </Button>
        </div>
        <div className='first-block__image'></div>
      </section>
    </main>
  );
};
