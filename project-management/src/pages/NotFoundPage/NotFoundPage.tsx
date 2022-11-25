import React from 'react';
import './NotFoundPage.scss';
import errorImg from '../../assets/png/error404.png';
import errorImgWebP from '../../assets/webp/error404.webp';
import { Button } from '@mui/material';
import { PATH__ROUTES } from 'utils/path_routes';
import { Link } from 'react-router-dom';
import '../../utils/i18n';
import { useTranslation } from 'react-i18next';

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className='error-page'>
      <div className='error-page__container'>
        <div className='error-page__image-container'>
          <picture>
            <source srcSet={errorImgWebP} type='image/webp' />
            <img src={errorImg} alt='404' />
          </picture>
        </div>
        <h2 className='error-page__title'>{t('page404.title')}</h2>
        <p className='error-page__text'>{t('page404.text')}</p>
        <Button
          variant='contained'
          sx={{
            m: '2rem auto 0',
            padding: 0,
            fontSize: '2rem',
            backgroundColor: '#6c63ff',
            '&:hover': { backgroundColor: '#9f9af1' },
          }}
        >
          <Link className='error-page__button-link' to={PATH__ROUTES.MAIN}>
            {t('page404.homeBtn')}
          </Link>
        </Button>
      </div>
    </div>
  );
};
