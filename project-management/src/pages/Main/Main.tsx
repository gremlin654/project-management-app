import React from 'react';
import Button from '@mui/material/Button';
import { TeamMember } from 'components/TeamMember/TeamMember';
import './Main.scss';
import { teamMembers } from 'utils/member_team';
import { Link } from 'react-router-dom';

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
            <Link to={'/Boards'}>GET STARTED</Link>
          </Button>
        </div>
        <div className='first-block__image'></div>
      </section>
      <section className='team-block__container'>
        <h3 className='team-block__title'>Our team</h3>
        <div className='team-block__team-container'>
          {teamMembers.map((member) => (
            <TeamMember
              name={member.name}
              major={member.major}
              github={member.github}
              avatar={member.avatar}
              avatarWebP={member.avatarWebP}
              key={member.name}
            />
          ))}
        </div>
      </section>
    </main>
  );
};
