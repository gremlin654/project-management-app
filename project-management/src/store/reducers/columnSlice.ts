import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  columns: [
    {
      _id: '1',
      title: 'To Do',
      order: 0,
      boardId: '',
    },
  ],
  currentBoard: localStorage.getItem('currentBoard') || '',
};

export const columnSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    setCollumns: (state, action) => {
      state.columns = action.payload;
    },
    addColumn: (state, action) => {
      state.columns.push(action.payload);
    },
    deleteColumn: (state, action) => {
      state.columns = state.columns.filter((column) => column._id !== action.payload);
    },
    updateColumn: (state, action) => {
      state.columns = state.columns.map((column) => {
        if (column._id === action.payload.id) {
          return action.payload;
        }
        return column;
      });
    },
    setCurrentBoard: (state, action) => {
      state.currentBoard = action.payload;
    },
  },
});

export const { addColumn, deleteColumn, updateColumn } = columnSlice.actions;
