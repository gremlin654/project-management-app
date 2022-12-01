import React, { useEffect } from 'react';
import '../../utils/i18n';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { useTranslation } from 'react-i18next';
import { boardsSlice } from 'store/reducers/boardsSlice';
import { ColumnForm } from './ColumnForm/ColumnForm';
import { TaskForm } from './TaskForm/TaskForm';
import { ChangeTaskForm } from './ChangeTaskForm/ChangeTaskForm';

export const BoardModal = () => {
  const { isAddColumn, isAddTask, isChangeTask } = useAppSelector((state) => state.boardsSlice);
  const { addColumn, addTask, changeTaskModal } = boardsSlice.actions;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    document.body.classList.add('block');

    return () => {
      document.body.classList.remove('block');
    };
  }, []);

  const closeModal = () => {
    if (isAddColumn) {
      dispatch(addColumn(false));
    }
    if (isAddTask) {
      dispatch(addTask(false));
    }
    if (isChangeTask) {
      dispatch(changeTaskModal(false));
    }
  };

  return (
    <div className='add-board-modal__wrapper' onClick={closeModal}>
      <div className='add-board-modal__container' onClick={(event) => event.stopPropagation()}>
        <button className='add-board-modal__close-btn' onClick={closeModal}>
          ╳
        </button>
        {isChangeTask && (
          <>
            <h3 className='add-board-modal__title'>{t('changeTask.title')}</h3>
            <ChangeTaskForm />
          </>
        )}
        {isAddColumn && (
          <>
            <h3 className='add-board-modal__title'>{t('boardPage.addColumnBtn')}</h3>
            <ColumnForm />
          </>
        )}
        {isAddTask && (
          <>
            <h3 className='add-board-modal__title'>{t('boardPage.addTaskBtn')}</h3>
            <TaskForm />
          </>
        )}
      </div>
    </div>
  );
};
