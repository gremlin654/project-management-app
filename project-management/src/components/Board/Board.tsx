import React from 'react';
import { ReactComponent as Trash } from '../../assets/svg/trashcan.svg';
import './Board.scss';
import { useAppDispatch } from 'hooks/redux';
import { IBoardsProps } from 'models/assets';
import { boardsSlice } from 'store/reducers/boardsSlice';
import { Link } from 'react-router-dom';

export const Board: React.FC<IBoardsProps> = ({ card }) => {
  const dispatch = useAppDispatch();
  const { getCurrentBoard, setDeleteBoardId, deleteBoardModal } = boardsSlice.actions;

  const title = card.title ? JSON.parse(card.title) : '';

  const setCurrentBoard = () => {
    dispatch(getCurrentBoard(card));
  };

  const setDeleteBord = () => {
    dispatch(setDeleteBoardId(card._id));
    dispatch(deleteBoardModal(true));
  };

  return (
    <div className='board'>
      <Link className='board__link' to={`/board/${card._id}`} onClick={setCurrentBoard} />
      <button className='board__trash' onClick={setDeleteBord}>
        <Trash />
      </button>
      <h3 className='board__title'>{title.title}</h3>
      <div className='board__description'>{title.description}</div>
    </div>
  );
};
