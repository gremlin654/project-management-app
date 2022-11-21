import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { INewBoardResponse, IQueryNewBoard } from 'models/assets';
import { URL_API } from 'utils/url_api';

export const sendNewBoard = createAsyncThunk(
  'boards/newBoard',
  async (query: IQueryNewBoard, { rejectWithValue }) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      };
      const response: AxiosResponse<INewBoardResponse> = await axios.post(
        URL_API.ADD_BOARD,
        query,
        {
          headers,
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to send data');
    }
  },
);
