import React, { useEffect, useState } from 'react';
import { IColumnProps } from 'models/assets';
import { ReactComponent as Trash } from '../../assets/svg/trashcan.svg';
import './Column.scss';
import '../../utils/i18n';
import { useTranslation } from 'react-i18next';
import { Button, Typography } from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { boardsSlice } from 'store/reducers/boardsSlice';
import { ColumnTask } from 'components/ColumnTask/ColumnTask';
import { changeColumnTitle, getTasks } from 'store/actions/boardsApi';
import { TitleInput } from 'components/TitleInput/TitleInput';

const btnAddTaskStyle = {
  width: '21rem',
  height: '4rem',
  fontWeight: 600,
  fontSize: { xs: '1.2rem', md: '1.4rem' },
  padding: '0.6rem 1.6rem',
  gap: ' 0.5rem',
  alignItems: 'center',
  backgroundColor: '#ffffa5',
  color: '#000000',
  '&:hover': { backgroundColor: '#ffffcc' },
  '@media (max-width: 648px)': { height: '3rem' },
};

const iconBtnStyle = {
  width: '3rem',
  height: '3rem',
  '@media (max-width: 648px)': { width: '2rem', height: '2rem' },
};

const textBtnStyle = { fontWeight: 600, fontSize: '1.4rem' };

export const Column: React.FC<IColumnProps> = ({ item }) => {
  const { _id, boardId, order, title } = item;

  const [titleInput, setTitleInput] = useState<string>(title);
  const [isInputActive, setIsInputActive] = useState<boolean>(false);
  const { allTasks } = useAppSelector((state) => state.boardsSlice);
  const { addTask, setColumnId, setDeleteBoardId, deleteColumnModal } = boardsSlice.actions;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const tasksColumn = allTasks.filter((task) => task.columnId === _id && task.boardId === boardId);

  useEffect(() => {
    const query = {
      idBoard: boardId,
      idColumn: _id,
    };
    dispatch(getTasks(query));
  }, []);

  const setAddTask = () => {
    dispatch(addTask(true));
    dispatch(setColumnId(_id));
  };

  const deleteCurrentColumn = () => {
    dispatch(setDeleteBoardId(boardId));
    dispatch(setColumnId(_id));
    dispatch(deleteColumnModal(true));
  };

  const setActiveInput = () => {
    setTitleInput(title);
    setIsInputActive(true);
  };

  const sendNewTitle = () => {
    if (title !== titleInput) {
      const query = {
        boardId: boardId,
        columnId: _id,
        order,
        title: titleInput,
      };
      dispatch(changeColumnTitle(query));
      setIsInputActive(false);
    } else {
      setIsInputActive(false);
    }
  };

  return (
    <div className='column__container'>
      <button
        className={`column__delete-btn ${isInputActive ? 'disabled' : ''}`}
        onClick={deleteCurrentColumn}
      >
        <Trash />
      </button>
      <div className='column__task-length'>{tasksColumn.length}</div>
      {isInputActive ? (
        <TitleInput
          titleInput={titleInput}
          setIsInputActive={setIsInputActive}
          sendNewTitle={sendNewTitle}
          setTitleInput={setTitleInput}
        />
      ) : (
        <h3 className='column__title' onClick={setActiveInput}>
          {titleInput}
        </h3>
      )}
      <div className='column__task-container'>
        <div className='column__task-wrapper'>
          {tasksColumn.map((task) => (
            <ColumnTask key={task._id} task={task} />
          ))}
        </div>
      </div>
      <Button variant='contained' sx={btnAddTaskStyle} onClick={setAddTask}>
        <NoteAddIcon sx={iconBtnStyle} />
        <Typography sx={textBtnStyle}>{t('boardPage.addTaskBtn')}</Typography>
      </Button>
    </div>
  );
};
