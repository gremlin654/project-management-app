import { ITaskInitial } from './../../models/assets';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ITaskInitial = {
  tasks: [],
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks.push(...action.payload);
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
    },
    updateTask: (state, action) => {
      state.tasks = state.tasks.map((task) => {
        if (task._id === action.payload.id) {
          return action.payload;
        }
        return task;
      });
    },
  },
});
