import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { createTask } from 'store/actions/boardsApi';
import '../../../utils/i18n';
import { useTranslation } from 'react-i18next';
import { FormTaskData } from 'models/assets';

export const TaskForm = () => {
  const { currentBoard, allTasks, currentColumnId } = useAppSelector((state) => state.boardsSlice);
  const { id } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const tasksColumn = allTasks.filter(
    (task) => task.columnId === currentColumnId && task.boardId === currentBoard?._id,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormTaskData>({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const onSubmitData: SubmitHandler<FieldValues> = (data) => {
    const formData = {
      title: data.title as string,
      order: tasksColumn.length,
      description: data.description as string,
      userId: id,
      users: [''],
      idBoard: currentBoard ? currentBoard._id : '1',
      idColumn: currentColumnId,
    };
    dispatch(createTask(formData));
  };

  return (
    <form
      className='add-board-form__container'
      onSubmit={handleSubmit((data) => onSubmitData(data))}
    >
      <label className='add-board-form__label'>
        <input
          {...register('title', {
            required: `${t('boardPage.errorTask1')}`,
          })}
          className={`add-board-form__input ${errors.title ? 'add-board-form__input-error' : ''}`}
          placeholder={errors.title ? errors.title.message : `${t('addBoard.placeholder1')}`}
          autoComplete='off'
        />
      </label>
      <label className='add-board-form__label'>
        <input
          {...register('description', {
            required: `${t('boardPage.errorTask2')}`,
          })}
          className={`add-board-form__input ${
            errors.description ? 'add-board-form__input-error' : ''
          }`}
          placeholder={
            errors.description ? errors.description.message : `${t('addBoard.placeholder2')}`
          }
          autoComplete='off'
        />
      </label>
      <div className='add-board-form__submit-container'>
        <Button
          type='submit'
          variant='contained'
          sx={{
            m: '2rem auto 0',
            fontSize: '2rem',
            backgroundColor: '#ffffa5',
            color: '#000000',
            '&:hover': { backgroundColor: '#ffffcc' },
          }}
        >
          {t('addBoard.createBtn')}
        </Button>
      </div>
    </form>
  );
};
