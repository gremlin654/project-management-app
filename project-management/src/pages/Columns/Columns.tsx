import './Columns.scss';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { Column } from './Column';
import { useCreateColumnMutation, useGetColumnsQuery } from 'store/actions/columnsApi';
import { Spinner } from 'components/Spinner/Spinner';
import { IColumn } from 'models/assets';
import { columnSlice } from 'store/reducers/columnSlice';
import { ColumnModal } from 'components/ColumnModal/ColumnModal';

export function Columns() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { currentBoard } = useAppSelector((state) => state.columns);
  const { columns } = useAppSelector((state) => state.columns);

  const { data: columnsApi, isLoading } = useGetColumnsQuery(currentBoard, {
    refetchOnMountOrArgChange: true,
  });

  const dispatch = useAppDispatch();
  const { setCollumns, addColumn } = columnSlice.actions;

  const [createColumn] = useCreateColumnMutation();

  const handleCreateColumn = async (titleStr: string) => {
    try {
      const response = await createColumn({
        title: titleStr,
        order: 1,
        boardId: currentBoard,
      }).unwrap();
      dispatch(addColumn(response));
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      dispatch(setCollumns(columnsApi));
    }
  }, [isLoading]);

  return (
    <div className='columns'>
      <h1>Columns</h1>
      <div className='columns__flex'>
        {isLoading ? (
          <Spinner />
        ) : (
          columns.map((column: IColumn) => <Column key={column._id} column={column} />)
        )}
        <div className='columns__add'>
          <div className='columns__add__btn' onClick={() => handleOpen()}>
            + Add column
          </div>
        </div>
      </div>
      <ColumnModal open={open} handleClose={handleClose} handleCreateColumn={handleCreateColumn} />
    </div>
  );
}
