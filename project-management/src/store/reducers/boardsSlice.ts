import { sendNewBoard } from './../actions/boardsApi';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoardsInitial } from 'models/assets';

const initialState: IBoardsInitial = {
  addBoardModal: false,
  isLoading: false,
  error: '',
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setAddBoardModal: (state, action: PayloadAction<boolean>) => {
      state.addBoardModal = action.payload;
    },
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
