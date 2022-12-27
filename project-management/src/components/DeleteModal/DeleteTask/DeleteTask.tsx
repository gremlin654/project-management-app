import React from 'react';
import '../../../utils/i18n';
import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useTranslation } from 'react-i18next';
import { deleteTask } from 'store/actions/boardsApi';
import { IDeleteProps } from 'models/assets';
import { btnDeleteStyle, btnCloseStyle } from '../DeleteModal';

export const DeleteTask: React.FC<IDeleteProps> = ({ closeModal }) => {
  const { currentColumnId, currentTaskId, deleteBoardId } = useAppSelector(
    (state) => state.boardsSlice,
  );
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const deleteCurrentTask = () => {
    const query = {
      taskId: currentTaskId,
      boardId: deleteBoardId,
      columnId: currentColumnId,
    };
    dispatch(deleteTask(query));
  };

  return (
    <>
      <h3 className='delete-modal__title'>{t('deleteModal.taskTitle')}</h3>
      <p className='delete-modal__text'>{t('deleteModal.taskText')}</p>
      <div className='delete-modal__btn-container'>
        <Button variant='contained' sx={btnDeleteStyle} onClick={deleteCurrentTask}>
          {t('deleteModal.deleteBtn')}
        </Button>
        <Button variant='contained' sx={btnCloseStyle} onClick={closeModal}>
          {t('deleteModal.closeBtn')}
        </Button>
      </div>
    </>
  );
};
