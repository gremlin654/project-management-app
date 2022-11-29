import './Columns.scss';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { Column } from './Column';
import { useCreateColumnMutation, useGetColumnsQuery } from 'store/actions/columnsApi';
import { Spinner } from 'components/Spinner/Spinner';
import { IColumn } from 'models/assets';
import { columnSlice } from 'store/reducers/columnSlice';

export function Columns() {
  const { currentBoard } = useAppSelector((state) => state.columns);
  const { columns } = useAppSelector((state) => state.columns);

  const { data: columnsApi, isLoading } = useGetColumnsQuery(currentBoard, {
    refetchOnMountOrArgChange: true,
  });

  const dispatch = useAppDispatch();
  const { setCollumns, addColumn } = columnSlice.actions;

  const [createColumn] = useCreateColumnMutation();

  const handleCreateColumn = async () => {
    try {
      const response = await createColumn({
        title: 'Column',
        order: '1',
        boardId: currentBoard,
      }).unwrap();
      dispatch(addColumn(response));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      console.log(columnsApi);
      dispatch(setCollumns(columnsApi));
    }
  }, [isLoading]);
  useEffect(() => {
    console.log(columns);
    console.log(columnsApi);
  }, [columns, isLoading]);
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
          <div className='columns__add__btn' onClick={() => handleCreateColumn()}>
            + Add column
          </div>
        </div>
      </div>
    </div>
  );
}
