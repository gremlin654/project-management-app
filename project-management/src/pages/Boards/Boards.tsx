import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { boardsSlice } from 'store/reducers/boardsSlice';
import { useGetAllBoardsQuery } from 'store/actions/boardsApi';
import { Spinner } from 'components/Spinner/Spinner';
import './Boards.scss';
import '../../utils/i18n';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router';
import { PATH__ROUTES } from 'utils/path_routes';
import { Board } from 'components/Board/Board';

export default function Boards() {
  const dispatch = useAppDispatch();
  const { getAllBoards } = useAppSelector((state) => state.boardsSlice);
  const { token } = useAppSelector((state) => state.user);
  const { setGetAllBoards } = boardsSlice.actions;
  const { t } = useTranslation();

  const {
    isLoading,
    data: allBoards,
    isSuccess,
  } = useGetAllBoardsQuery('', {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (allBoards) {
      dispatch(setGetAllBoards(allBoards));
    }
  }, [isLoading, isSuccess]);

  if (!token) {
    return <Navigate to={PATH__ROUTES.WELCOME} />;
  }

  return (
    <div className='boards'>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className='boards__container'>
          <h1 className='boards__title'>{t('boards.title')}</h1>
          <div className='board__wrapper'>
            <div className='board__container'>
              {getAllBoards.map((card, index) => (
                <Board card={card} key={index} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
