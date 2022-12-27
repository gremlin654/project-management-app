import React, { useState } from 'react';
import '../../../utils/i18n';
import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useTranslation } from 'react-i18next';
import { boardsSlice } from 'store/reducers/boardsSlice';
import { useDeleteBoardMutation } from 'store/actions/boardsApi';
import { btnDeleteStyle, btnCloseStyle } from '../DeleteModal';
import { IDeleteProps } from 'models/assets';

export const DeleteBoard: React.FC<IDeleteProps> = ({ closeModal }) => {
  const { deleteBoard, setSpinnerBoard, deleteBoardModal } = boardsSlice.actions;
  const [deleteBoardApi] = useDeleteBoardMutation();
  const { deleteBoardId } = useAppSelector((state) => state.boardsSlice);
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string>('');
  const { t } = useTranslation();

  const handelDeleteBoard = async () => {
    try {
      dispatch(setSpinnerBoard(true));
      await deleteBoardApi(deleteBoardId);
      dispatch(deleteBoard(deleteBoardId));
    } catch (error) {
      const err = error as Error;
      setError(err.message);
    } finally {
      dispatch(deleteBoardModal(false));
      dispatch(setSpinnerBoard(false));
    }
  };

  return (
    <>
      <h3 className='delete-modal__title'>{t('deleteModal.boardTitle')}</h3>
      <p className='delete-modal__text'>{t('deleteModal.boardText')}</p>
      <div className='delete-modal__btn-container'>
        <Button variant='contained' sx={btnDeleteStyle} onClick={handelDeleteBoard}>
          {t('deleteModal.deleteBtn')}
        </Button>
        <Button variant='contained' sx={btnCloseStyle} onClick={closeModal}>
          {t('deleteModal.closeBtn')}
        </Button>
      </div>
    </>
  );
};
