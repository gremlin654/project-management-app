import React, { useState } from 'react';
import './Columns.scss';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { Button, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import '../../utils/i18n';
import { useTranslation } from 'react-i18next';
import { boardsSlice } from 'store/reducers/boardsSlice';
import { Column } from 'components/Column/Column';
import { IColumns } from 'models/assets';
import { changeColumnTitle, changeTask } from 'store/actions/boardsApi';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

const btnAddBoardStyle = {
  width: '22rem',
  height: '4rem',
  fontWeight: 600,
  fontSize: { xs: '1.2rem', md: '1.4rem' },
  padding: '0.6rem 1.4rem',
  gap: ' 0.5rem',
  alignItems: 'center',
  backgroundColor: '#a3ca01',
  '&:hover': { backgroundColor: '#809f00' },
  '@media (max-width: 648px)': { height: '3rem' },
};

const iconBtnStyle = {
  width: '3rem',
  height: '3rem',
  '@media (max-width: 648px)': { width: '2rem', height: '2rem' },
};

const textBtnStyle = { fontWeight: 600, fontSize: '1.4rem' };

export const Columns: React.FC<IColumns> = ({ idBoard }) => {
  const { currentColumns, allTasks } = useAppSelector((state) => state.boardsSlice);
  const { addColumn } = boardsSlice.actions;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const setAddColumn = () => {
    dispatch(addColumn(true));
  };

  const onDragEnd = (res: DropResult) => {
    const { source, destination } = res;
    const taskId = res.draggableId;
    if (!destination) return;
    if (!currentColumns) return;
    if (destination.droppableId === idBoard) {
      const movedColumn = currentColumns.find((column) => column._id === res.draggableId);
      if (movedColumn) {
        const query = {
          boardId: idBoard,
          columnId: movedColumn._id,
          title: movedColumn?.title,
          order: destination.index + 1,
        };
        dispatch(changeColumnTitle(query));
        return;
      }
    }

    const colIdx = allTasks.findIndex((col) => col.columnId === source.droppableId);
    const movedTask = allTasks.find((task) => task._id === res.draggableId);
    if (movedTask) {
      const data = {
        columnId: destination.droppableId,
        boardId: idBoard,
        _id: movedTask._id,
        title: movedTask.title,
        description: movedTask.description,
        order: destination.index + 1,
        userId: movedTask.userId,
        users: movedTask.users,
      };
      dispatch(changeTask(data));
    }
  };

  return (
    <div className='columns__container'>
      <div className='columns__wrapper'>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={idBoard} type='COLUMNS' direction='horizontal'>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ display: 'flex', gap: '2rem' }}
              >
                {currentColumns.map((column, index) => (
                  <Draggable key={column._id} draggableId={column._id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {<Column key={column._id} item={column} idBoard={idBoard} />}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <Button variant='contained' sx={btnAddBoardStyle} onClick={setAddColumn}>
          <PostAddIcon sx={iconBtnStyle} />
          <Typography sx={textBtnStyle}>{t('boardPage.addColumnBtn')}</Typography>
        </Button>
      </div>
    </div>
  );
};
