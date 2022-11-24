import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { boardsSlice } from 'store/reducers/boardsSlice';
import { AppDispatch } from 'store/store';
import axios from 'axios';
import { URL_API } from 'utils/url_api';
import Board from './Board';
import { createAsyncThunk } from '@reduxjs/toolkit';

export default function Boards() {
  const dispatch = useAppDispatch();
  const { getAllBoards } = useAppSelector((state) => state.boardsSlice);
  const { setGetAllBoards } = boardsSlice.actions;
  const [update, setUpdate] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // const getAllBoardsAPI = () => async (dispatch: AppDispatch) => {
  //   try {
  //     const headers = {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${localStorage.getItem('token')}`,
  //     };
  //     const response: any = await axios.get(URL_API.ADD_BOARD, { headers });
  //     dispatch(setGetAllBoards(response.data));
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log('error');
  //   }
  // };
  const getAllBoardsAPI = createAsyncThunk('boards', async () => {
    try {
      setIsLoading(true);
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      };
      const response: any = await axios.get(URL_API.ADD_BOARD, {
        headers,
      });
      dispatch(setGetAllBoards(response.data));
      console.log(response.data);
      // return response.data;
    } catch (error) {
      //return rejectWithValue('Failed to send data');
      console.log('error');
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  });

  useEffect(() => {
    dispatch(getAllBoardsAPI());
    console.log(getAllBoards, 'ertf');
  }, [update]);

  return (
    <div>
      {!isLoading ? (
        <div className='boards'>
          <h1 className='boards__title'>Your Boards</h1>
          <div className='board-container'>
            {!isLoading &&
              getAllBoards.map((card, index) => (
                <Board card={card} key={index} update={update} setUpdate={setUpdate} />
              ))}
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
