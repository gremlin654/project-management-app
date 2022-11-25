import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  columns: [
    {
      id: 1,
      title: 'To Do',
      order: 0,
      boardId: 1,
    },
  ],
};

export const columnSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    addColumn: (state, action) => {
      state.columns.push(action.payload);
    },
    deleteColumn: (state, action) => {
      state.columns = state.columns.filter((column) => column.id !== action.payload);
    },
    updateColumn: (state, action) => {
      state.columns = state.columns.map((column) => {
        if (column.id === action.payload.id) {
          return action.payload;
        }
        return column;
      });
    },
  },
});

export const { addColumn, deleteColumn, updateColumn } = columnSlice.actions;
