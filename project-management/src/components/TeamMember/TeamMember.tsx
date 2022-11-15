import React from 'react';
import { ReactComponent as Git } from '../../assets/svg/github-icon.svg';
import './TeamMember.scss';

interface ITeamMember {
  avatar: string;
  name: string;
  major: string;
  github: string;
  avatarWebP: string;
}

export const TeamMember: React.FC<ITeamMember> = ({ name, major, avatar, avatarWebP, github }) => {
  return (
    <div className='member__container'>
      <div className='member__avatar'>
        <picture>
          <source srcSet={avatarWebP} type='image/webp' />
          <img src={avatar} loading='lazy' alt='avatar' />
        </picture>
      </div>
      <div className='member__about-container'>
        <h5 className='member__name'>{name}</h5>
        <h6 className='member__major'>{major}</h6>
        <a className='member__github' href={github}>
          <Git fill='#ffffff' width='2rem' height='2rem' />
          <p>Github</p>
        </a>
      </div>
    </div>
  );
};
