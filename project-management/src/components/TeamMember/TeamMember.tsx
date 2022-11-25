import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as Git } from '../../assets/svg/github-icon.svg';
import './TeamMember.scss';
import '../../utils/i18n';

interface ITeamMember {
  avatar: string;
  name: string;
  major: string;
  github: string;
  avatarWebP: string;
}

export const TeamMember: React.FC<ITeamMember> = ({ name, major, avatar, avatarWebP, github }) => {
  const { t } = useTranslation();

  return (
    <div className='member__container'>
      <div className='member__avatar'>
        <picture>
          <source srcSet={t<string>(avatarWebP)} type='image/webp' />
          <img src={t<string>(avatar)} loading='lazy' alt='avatar' />
        </picture>
      </div>
      <div className='member__about-container'>
        <h5 className='member__name'>{t<string>(name)}</h5>
        <h6 className='member__major'>{t<string>(major)}</h6>
        <a className='member__github' href={t<string>(github)}>
          <Git fill='#ffffff' width='2rem' height='2rem' />
          <p>Github</p>
        </a>
      </div>
    </div>
  );
};
