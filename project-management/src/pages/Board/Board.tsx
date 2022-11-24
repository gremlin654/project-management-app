import React from 'react';
import '../../pages/Board/Board.scss';
import { ReactComponent as Trash } from '../../assets/svg/trashcan.svg';
import '../../pages/Board/Board.scss';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { IBoards, IBoardsProps } from 'models/assets';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export default function Board(props: IBoardsProps) {
  const dispatch = useAppDispatch();

  const deleteBoard = createAsyncThunk(
    'boards/deleteBoard',
    async (query: any, { rejectWithValue }) => {
      try {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        };
        const response: any = await axios.delete(
          `https://final-task-rest-production.up.railway.app/boards/${query}`,
          {
            headers,
          },
        );
        props.setUpdate((prev) => !prev);
        console.log(response.data);
      } catch (error) {
        return rejectWithValue('Failed to send data');
      }
    },
  );

  const req = () => {
    dispatch(deleteBoard(props.card._id));
  };

  const title = props.card.title ? JSON.parse(props.card.title) : console.log('error');
  return (
    <div className='board'>
      <Trash className='board__trash' onClick={() => req()} />
      <h3 className='board__title'>{title.title}</h3>
      <div className='board__description'>{title.description}</div>
    </div>
  );
}
