import { notificationsSlice } from './reducers/notifications';
import { authApi } from './actions/authAPi';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userSlice } from './reducers/userSlice';
import { userApi } from './actions/userApi';

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  user: userSlice.reducer,
  notifications: notificationsSlice.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware, userApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
