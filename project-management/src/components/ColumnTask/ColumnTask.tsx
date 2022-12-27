import { useAppDispatch } from 'hooks/redux';
import { IColumnTaskProps } from 'models/assets';
import React from 'react';
import { boardsSlice } from 'store/reducers/boardsSlice';
import { ReactComponent as Trash } from '../../assets/svg/trashcan.svg';
import './ColumnTask.scss';

export const ColumnTask: React.FC<IColumnTaskProps> = ({ task }) => {
  const {
    setColumnId,
    setDeleteTaskId,
    setDeleteBoardId,
    deleteTaskModal,
    changeTaskModal,
    getCurrentTask,
  } = boardsSlice.actions;
  const dispatch = useAppDispatch();
  const { title, boardId, columnId, _id } = task;

  const deleteCurrentTask = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    dispatch(setColumnId(columnId));
    dispatch(setDeleteTaskId(_id));
    dispatch(setDeleteBoardId(boardId));
    dispatch(deleteTaskModal(true));
  };

  const openTaskModal = () => {
    dispatch(getCurrentTask(task));
    dispatch(changeTaskModal(true));
  };

  return (
    <div className='column-task__container' onClick={openTaskModal}>
      <p className='column-task__title'>{title}</p>
      <button className='column-task__trash-btn' onClick={deleteCurrentTask}>
        <Trash />
      </button>
    </div>
  );
};
