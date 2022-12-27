import React, { useEffect } from 'react';
import './DeleteModal.scss';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { boardsSlice } from 'store/reducers/boardsSlice';
import { DeleteBoard } from 'components/DeleteModal/DeleteBoard/DeleteBoard';
import { DeleteColumn } from './DeleteColumn/DeleteColumn';
import { DeleteTask } from './DeleteTask/DeleteTask';

export const btnDeleteStyle = {
  fontSize: '2rem',
  backgroundColor: '#ff1c19',
  color: '#ffffff',
  '&:hover': { backgroundColor: '#ff0300' },
  '@media (max-width: 648px)': {
    fontSize: '1.4rem',
  },
};

export const btnCloseStyle = {
  fontSize: '2rem',
  backgroundColor: '#ffffa5',
  color: '#000000',
  '&:hover': { backgroundColor: '#ffffcc' },
  '@media (max-width: 648px)': {
    fontSize: '1.4rem',
  },
};

export const DeleteModal = () => {
  const { isDeleteBoard, isDeleteColumn, isDeleteTask } = useAppSelector(
    (state) => state.boardsSlice,
  );
  const { deleteBoardModal, deleteColumnModal, deleteTaskModal } = boardsSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.body.classList.add('block');

    return () => {
      document.body.classList.remove('block');
    };
  }, []);

  const closeModal = () => {
    if (isDeleteBoard) {
      dispatch(deleteBoardModal(false));
    }
    if (isDeleteColumn) {
      dispatch(deleteColumnModal(false));
    }
    if (isDeleteTask) {
      dispatch(deleteTaskModal(false));
    }
  };

  return (
    <div className='delete-modal__wrapper' onClick={closeModal}>
      <div className='delete-modal__container' onClick={(event) => event.stopPropagation()}>
        <button className='delete-modal__close-btn' onClick={closeModal}>
          ╳
        </button>
        {isDeleteBoard && <DeleteBoard closeModal={closeModal} />}
        {isDeleteColumn && <DeleteColumn closeModal={closeModal} />}
        {isDeleteTask && <DeleteTask closeModal={closeModal} />}
      </div>
    </div>
  );
};
