import { notificationsSlice } from './reducers/notifications';
import { authApi } from './actions/authAPi';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userSlice } from './reducers/userSlice';

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  user: userSlice.reducer,
  notifications: notificationsSlice.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
