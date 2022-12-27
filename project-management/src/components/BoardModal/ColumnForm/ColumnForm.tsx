import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { createColumn } from 'store/actions/boardsApi';
import '../../../utils/i18n';
import { useTranslation } from 'react-i18next';
import { FormColumnData } from 'models/assets';

const submitBtnStyle = {
  m: '2rem auto 0',
  fontSize: '2rem',
  backgroundColor: '#ffffa5',
  color: '#000000',
  '&:hover': { backgroundColor: '#ffffcc' },
};

export const ColumnForm = () => {
  const { currentBoard, currentColumns } = useAppSelector((state) => state.boardsSlice);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormColumnData>({
    defaultValues: {
      title: '',
    },
  });

  const onSubmitData: SubmitHandler<FieldValues> = (data) => {
    const formData = {
      id: currentBoard ? currentBoard._id : '1',
      title: data.title,
      order: currentColumns.length,
    };
    dispatch(createColumn(formData));
  };

  return (
    <form
      className='add-board-form__container'
      onSubmit={handleSubmit((data) => onSubmitData(data))}
    >
      <label className='add-board-form__label'>
        <input
          {...register('title', {
            required: `${t('boardPage.errorColumn')}`,
          })}
          className={`add-board-form__input ${errors.title ? 'add-board-form__input-error' : ''}`}
          placeholder={errors.title ? errors.title.message : `${t('addBoard.placeholder1')}`}
          autoComplete='off'
        />
      </label>
      <div className='add-board-form__submit-container'>
        <Button type='submit' variant='contained' sx={submitBtnStyle}>
          {t('addBoard.createBtn')}
        </Button>
      </div>
    </form>
  );
};
