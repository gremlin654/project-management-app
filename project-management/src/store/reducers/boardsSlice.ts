import { sendNewBoard } from './../actions/boardsApi';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoards, IBoardsInitial } from 'models/assets';

const initialState: IBoardsInitial = {
  addBoardModal: false,
  isLoading: false,
  error: '',
  getAllBoards: [
    {
      _id: '',
      title: '',
      owner: '',
      users: [''],
    },
  ],
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setAddBoardModal: (state, action: PayloadAction<boolean>) => {
      state.addBoardModal = action.payload;
    },
    setGetAllBoards: (state, action: PayloadAction<IBoards[]>) => {
      state.getAllBoards = action.payload;
    },
    // parceTitles: (state, action: PayloadAction<string>) => {

    // },
  },
  extraReducers: (builder) => {
    builder.addCase(sendNewBoard.fulfilled, (state) => {
      state.addBoardModal = false;
      state.isLoading = false;
    });

    builder.addCase(sendNewBoard.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(sendNewBoard.rejected, (state) => {
      state.isLoading = false;
      state.error = `Don't send board`;
    });
  },
});
