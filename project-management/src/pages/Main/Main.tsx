import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import { TeamMember } from 'components/TeamMember/TeamMember';
import './Main.scss';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { PATH__ROUTES } from '../../utils/path_routes';
import { useGetAllUsersQuery, useGetUserByIdQuery } from 'store/actions/userApi';
import { userSlice } from 'store/reducers/userSlice';
import { useTranslation } from 'react-i18next';
import '../../utils/i18n';

export interface ITeamObj {
  avatar: string;
  avatarWebP: string;
  name: string;
  major: string;
  github: string;
}

export const Main = () => {
  const { id, token } = useAppSelector((state) => state.user);
  const { isError } = useGetUserByIdQuery(id);
  const dispatch = useAppDispatch();
  const { setId } = userSlice.actions;
  const { t } = useTranslation();
  const teamObj = t<string, ITeamObj[]>('welcome.teamCards', { returnObjects: true });
  const { data, isError: getAllErr, isLoading } = useGetAllUsersQuery('');

  useEffect(() => {
    if (isError) {
      localStorage.removeItem('token');
    }
    if (!getAllErr && data) {
      localStorage.setItem(
        'userId',
        data.find(
          (item: { id: string; login: string; name: string }) =>
            item.login == localStorage.getItem('login'),
        )._id,
      );
      dispatch(setId(localStorage.getItem('userId')));
    }
  }, [isError, getAllErr, isLoading]);
  return (
    <main className='main'>
      <section className='first-block__container'>
        <div className='first-block__text-container'>
          <h1 className='first-block__title'>{t('welcome.title')}</h1>
          <p className='first-block__text'>{t('welcome.subTitle')}</p>
          <p className='first-block__text'>{t('welcome.subTitle2')}</p>
          <Button
            variant='contained'
            sx={{
              m: '2rem auto 0',
              fontSize: '2rem',
              backgroundColor: '#6c63ff',
              padding: 0,
              '&:hover': { backgroundColor: '#9f9af1' },
            }}
          >
            {token ? (
              <Link to={PATH__ROUTES.BOARDS} className='first-block__button-link'>
                {t('welcome.subTitleBtnIn')}
              </Link>
            ) : (
              <Link to={PATH__ROUTES.LOGIN} className='first-block__button-link'>
                {t('welcome.subTitleBtnOut')}
              </Link>
            )}
          </Button>
        </div>
        <div className='first-block__image'></div>
      </section>
      <section className='team-block__container'>
        <h3 className='team-block__title'>{t('welcome.teamTitle')}</h3>
        <div className='team-block__team-container'>
          {teamObj.map((member) => (
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
