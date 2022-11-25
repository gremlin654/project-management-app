import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React, { useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { boardsSlice } from 'store/reducers/boardsSlice';
// import { sendNewBoard } from 'store/actions/boardsApi';
import { Spinner } from 'components/Spinner/Spinner';
import { FormData } from '../../models/assets';
import { useTranslation } from 'react-i18next';
import '../../utils/i18n';
import './AddBoard.scss';
import { useCreateBoardMutation } from 'store/actions/boardsApi';

export const AddBoard = () => {
  const { isLoading } = useAppSelector((state) => state.boardsSlice);
  const { setAddBoardModal, addBoard } = boardsSlice.actions;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [createBoard, { isLoading: loading }] = useCreateBoardMutation();

  useEffect(() => {
    document.body.classList.add('block');

    return () => {
      document.body.classList.remove('block');
    };
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const closeModal = () => {
    dispatch(setAddBoardModal(false));
  };

  const onSubmitData: SubmitHandler<FieldValues> = async (data) => {
    const formData = {
      title: JSON.stringify({ title: data.title, description: data.description }),
      owner: localStorage.getItem('userId') || '',
      users: [''],
    };
    try {
      const response = await createBoard(formData).unwrap();
      dispatch(addBoard(response));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='add-board-modal__wrapper' onClick={closeModal}>
      <div className='add-board-modal__container' onClick={(event) => event.stopPropagation()}>
        <button className='add-board-modal__close-btn' onClick={closeModal}>
          ╳
        </button>
        <h3 className='add-board-modal__title'>{t('addBoard.title')}</h3>
        {isLoading ? (
          <Spinner />
        ) : (
          <form
            className='add-board-form__container'
            onSubmit={handleSubmit((data) => onSubmitData(data))}
          >
            <label className='add-board-form__label'>
              <input
                {...register('title', {
                  required: `${t('addBoard.error1')}`,
                })}
                className={`add-board-form__input ${
                  errors.title ? 'add-board-form__input-error' : ''
                }`}
                placeholder={errors.title ? errors.title.message : `${t('addBoard.placeholder1')}`}
              />
            </label>
            <label className='add-board-form__label'>
              <input
                {...register('description', {
                  required: `${t('addBoard.error2')}`,
                })}
                className={`add-board-form__input ${
                  errors.description ? 'add-board-form__input-error' : ''
                }`}
                placeholder={
                  errors.description ? errors.description.message : `${t('addBoard.placeholder2')}`
                }
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
        )}
      </div>
    </div>
  );
};
