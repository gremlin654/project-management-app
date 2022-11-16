import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  successful: false,
  unsuccessful: false,
  message: '',
};

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setSuccessful: (state, action) => {
      state.successful = action.payload;
    },
    setUnsuccessful: (state, action) => {
      state.unsuccessful = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { setSuccessful, setUnsuccessful } = notificationsSlice.actions;
