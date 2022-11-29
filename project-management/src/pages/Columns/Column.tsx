import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { IColumn, IColumnProps } from 'models/assets';
import React from 'react';
import { useDeleteColumnMutation } from 'store/actions/columnsApi';
import { columnSlice } from 'store/reducers/columnSlice';

export function Column(props: IColumnProps) {
  const { currentBoard } = useAppSelector((state) => state.columns);

  const [deleteColumnApi] = useDeleteColumnMutation();

  const dispatch = useAppDispatch();
  const { deleteColumn } = columnSlice.actions;

  const handleDeleteColumn = async () => {
    try {
      const body = {
        boardId: currentBoard,
        columnId: props.column._id,
      };
      await deleteColumnApi(body);
      dispatch(deleteColumn(props.column._id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='columns__item'>
      <h2>{props.column.title}</h2>
      <div className='columns__item__task'>Some</div>
      <div className='columns__item__task'>Some</div>
      <div className='columns__item__task'>Some</div>
      <div className='columns__item__bottom'>
        <div className='columns__item__bottom__btn'>+ Add task</div>
        <div className='columns__item__bottom__btn' onClick={() => handleDeleteColumn()}>
          - Delete collumn
        </div>
      </div>
    </div>
  );
}
