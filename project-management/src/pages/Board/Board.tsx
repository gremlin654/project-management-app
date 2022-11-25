import React from 'react';
import { ReactComponent as Trash } from '../../assets/svg/trashcan.svg';
import './Board.scss';
import { useAppDispatch } from 'hooks/redux';
import { IBoardsProps } from 'models/assets';
import { useDeleteBoardMutation } from 'store/actions/boardsApi';
import { boardsSlice } from 'store/reducers/boardsSlice';

export default function Board(props: IBoardsProps) {
  const [deleteBoardApi] = useDeleteBoardMutation();
  const dispatch = useAppDispatch();
  const { deleteBoard } = boardsSlice.actions;

  const title = props.card.title ? JSON.parse(props.card.title) : console.log('error');

  const handelDeleteBoard = async (id: string) => {
    try {
      await deleteBoardApi(id);
      dispatch(deleteBoard(id));
      console.log('deleteBoard');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='board'>
      <button className='board__trash' onClick={() => handelDeleteBoard(props.card._id)}>
        <Trash />
      </button>
      <h3 className='board__title'>{title.title}</h3>
      <div className='board__description'>{title.description}</div>
    </div>
  );
}
