import { columnSlice } from './reducers/columnSlice';
import { columnsApi } from './actions/columnsApi';
import { notificationsSlice } from './reducers/notifications';
import { authApi } from './actions/authAPi';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userSlice } from './reducers/userSlice';
import { userApi } from './actions/userApi';
import { boardsSlice } from './reducers/boardsSlice';
import { boardsApi } from './actions/boardsApi';

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [boardsApi.reducerPath]: boardsApi.reducer,
  [columnsApi.reducerPath]: columnsApi.reducer,
  columns: columnSlice.reducer,
  user: userSlice.reducer,
  notifications: notificationsSlice.reducer,
  boardsSlice: boardsSlice.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authApi.middleware,
        userApi.middleware,
        boardsApi.middleware,
        columnsApi.middleware,
      ),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
