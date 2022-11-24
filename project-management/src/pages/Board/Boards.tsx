import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { boardsSlice } from 'store/reducers/boardsSlice';
import { AppDispatch } from 'store/store';
import axios from 'axios';
import { URL_API } from 'utils/url_api';
import Board from './Board';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { useGetAllBoardsQuery, useGetBoardByIdQuery } from 'store/actions/boardsApi';

export default function Boards() {
  const dispatch = useAppDispatch();
  const { getAllBoards } = useAppSelector((state) => state.boardsSlice);
  const { setGetAllBoards } = boardsSlice.actions;

  const {
    isLoading,
    data: allBoards,
    isSuccess,
  } = useGetAllBoardsQuery('', {
    refetchOnMountOrArgChange: true,
  });
  useEffect(() => {
    if (allBoards) {
      dispatch(setGetAllBoards(allBoards));
    }
  }, [isLoading, isSuccess]);

  // const getAllBoardsAPI = createAsyncThunk('boards', async () => {
  //   try {
  //     setIsLoading(true);
  //     const headers = {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${localStorage.getItem('token')}`,
  //     };
  //     const response: any = await axios.get(URL_API.ADD_BOARD, {
  //       headers,
  //     });
  //     dispatch(setGetAllBoards(response.data));
  //     console.log(response.data);
  //     // return response.data;
  //   } catch (error) {
  //     //return rejectWithValue('Failed to send data');
  //     console.log('error');
  //   } finally {
  //     setTimeout(() => {
  //       setIsLoading(false);
  //     }, 2000);
  //   }
  // });

  // useEffect(() => {
  //   dispatch(getAllBoardsAPI());
  //   console.log(getAllBoards, 'ertf');
  // }, [update]);

  return (
    <div>
      {getAllBoards.length !== 0 ? (
        <div className='boards'>
          <h1 className='boards__title'>Your Boards</h1>
          <div className='board-container'>
            {getAllBoards.map((card, index) => (
              <Board card={card} key={index} />
            ))}
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
