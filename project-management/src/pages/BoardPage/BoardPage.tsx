import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { PATH__ROUTES } from 'utils/path_routes';
import './BoardPage.scss';
import '../../utils/i18n';
import { useTranslation } from 'react-i18next';
import { Button, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { addAllColumns } from 'store/actions/boardsApi';
import { Spinner } from 'components/Spinner/Spinner';
import { Columns } from 'components/Columns/Columns';

const btnBackStyle = {
  position: 'absolute',
  top: 0,
  height: '4rem',
  fontWeight: 600,
  fontSize: { xs: '1.2rem', md: '1.4rem' },
  padding: '0.5rem',
  gap: ' 0.5rem',
  alignItems: 'center',
  backgroundColor: '#ff8004',
  '&:hover': { backgroundColor: '#db6f04' },
  '@media (max-width: 648px)': { height: '3rem' },
};

const iconBtnStyle = {
  width: '3rem',
  height: '3rem',
  '@media (max-width: 648px)': { width: '2rem', height: '2rem' },
};

const textBtnStyle = { fontWeight: 600, fontSize: '1.4rem' };

export const BoardPage = () => {
  const { currentBoard, isLoading, error } = useAppSelector((state) => state.boardsSlice);
  const { token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const title = currentBoard ? JSON.parse(currentBoard.title) : 'error';

  useEffect(() => {
    if (currentBoard) {
      dispatch(addAllColumns(currentBoard._id));
    }
  }, []);

  if (!token) {
    localStorage.removeItem('currentBoard');
    return <Navigate to={PATH__ROUTES.LOGIN} />;
  }

  if (!currentBoard) {
    return <Navigate to={PATH__ROUTES.BOARDS} />;
  }

  const goBack = () => {
    localStorage.removeItem('currentBoard');
    return navigate(-1);
  };

  return (
    <div className='board-page__container'>
      <Button variant='contained' sx={btnBackStyle} onClick={goBack}>
        <ArrowBackIcon sx={iconBtnStyle} />
        <Typography sx={textBtnStyle}>{t('boardPage.backBtn')}</Typography>
      </Button>
      <div className='board-page__title-container'>
        <h1 className='board-page__title'>{title.title}</h1>
        <h2 className='board-page__description'>{title.description}</h2>
      </div>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <h3 className='board-page__description'>{error as string}</h3>
      ) : (
        <Columns idBoard={currentBoard._id} />
      )}
    </div>
  );
};
