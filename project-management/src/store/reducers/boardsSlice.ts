import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoards, IBoardsInitial } from 'models/assets';

const initialState: IBoardsInitial = {
  addBoardModal: false,
  getAllBoards: [],
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
    addBoard: (state, action: PayloadAction<IBoards>) => {
      state.getAllBoards.push(action.payload);
      state.addBoardModal = false;
    },
    deleteBoard: (state, action: PayloadAction<string>) => {
      state.getAllBoards = state.getAllBoards.filter((board) => board._id !== action.payload);
    },
  },
});
