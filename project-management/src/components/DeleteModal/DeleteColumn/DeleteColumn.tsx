import React from 'react';
import '../../../utils/i18n';
import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useTranslation } from 'react-i18next';
import { deleteColumn } from 'store/actions/boardsApi';
import { IDeleteProps } from 'models/assets';
import { btnDeleteStyle, btnCloseStyle } from '../DeleteModal';

export const DeleteColumn: React.FC<IDeleteProps> = ({ closeModal }) => {
  const { deleteBoardId, currentColumnId } = useAppSelector((state) => state.boardsSlice);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const deleteCurrentColumn = () => {
    const query = {
      idBoard: deleteBoardId,
      idColumn: currentColumnId,
    };
    dispatch(deleteColumn(query));
  };
  return (
    <>
      <h3 className='delete-modal__title'>{t('deleteModal.columnTitle')}</h3>
      <p className='delete-modal__text'>{t('deleteModal.columnText')}</p>
      <div className='delete-modal__btn-container'>
        <Button variant='contained' sx={btnDeleteStyle} onClick={deleteCurrentColumn}>
          {t('deleteModal.deleteBtn')}
        </Button>
        <Button variant='contained' sx={btnCloseStyle} onClick={closeModal}>
          {t('deleteModal.closeBtn')}
        </Button>
      </div>
    </>
  );
};
