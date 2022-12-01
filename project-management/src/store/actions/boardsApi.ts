import { createAsyncThunk } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios, { AxiosResponse } from 'axios';
import {
  IAddAllColumns,
  IChangeColumnTitle,
  ICreateColumn,
  ICreateTaskQuery,
  IDeleteColumnQuery,
  IDeleteTaskQuery,
  IGetTasksQuery,
  IGetTasksResponse,
} from 'models/assets';
import { URL_API } from 'utils/url_api';

export const boardsApi = createApi({
  reducerPath: 'boardsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://final-task-rest-production.up.railway.app' }),
  endpoints: (builder) => ({
    getAllBoards: builder.query({
      query: () => ({
        url: '/boards',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          accept: 'application/json',
        },
      }),
    }),
    createBoard: builder.mutation({
      query: (body) => ({
        url: '/boards',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          accept: 'application/json',
        },
        body,
      }),
    }),
    getBoardById: builder.query({
      query: (id) => ({
        url: `/boards/${id}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          accept: 'application/json',
        },
      }),
    }),
    updateBoard: builder.mutation({
      query: (body) => ({
        url: `/boards/${body.id}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          accept: 'application/json',
        },
        body: {
          title: body.title,
          owner: body.owner,
          users: [...body.users],
        },
      }),
    }),
    deleteBoard: builder.mutation({
      query: (id) => ({
        url: `/boards/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    }),
    getBoardSet: builder.query({
      query: (ids) => ({
        url: `/boardsSet?ids=${ids}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          accept: 'application/json',
        },
      }),
    }),
    getBoardSetByUser: builder.query({
      query: (id) => ({
        url: `/boardsSet?userId=${id}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          accept: 'application/json',
        },
      }),
    }),
  }),
});

export const addAllColumns = createAsyncThunk(
  'boards/addAllColumns',
  async (id: string, { rejectWithValue }) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      };
      const response: AxiosResponse<IAddAllColumns[]> = await axios.get(
        `${URL_API.BOARDS}/${id}/columns`,
        {
          headers,
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to get columns');
    }
  },
);

export const createColumn = createAsyncThunk(
  'boards/createColumn',
  async (query: ICreateColumn, { rejectWithValue }) => {
    try {
      const { id, order, title } = query;
      const body = {
        title,
        order,
      };
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      };
      const response: AxiosResponse<IAddAllColumns> = await axios.post(
        `${URL_API.BOARDS}/${id}/columns`,
        body,
        {
          headers,
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to create column');
    }
  },
);

export const changeColumnTitle = createAsyncThunk(
  'boards/changeColumnTitle',
  async (query: IChangeColumnTitle, { rejectWithValue }) => {
    try {
      const { boardId, columnId, order, title } = query;
      const body = {
        title,
        order,
      };
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      };
      const response: AxiosResponse<IAddAllColumns> = await axios.put(
        `${URL_API.BOARDS}/${boardId}/columns/${columnId}`,
        body,
        {
          headers,
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to change column title');
    }
  },
);

export const createTask = createAsyncThunk(
  'boards/createTask',
  async (query: ICreateTaskQuery, { rejectWithValue }) => {
    try {
      const { idBoard, idColumn, title, description, order, userId, users } = query;
      const body = {
        title,
        order,
        description,
        userId,
        users,
      };
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      };
      const response: AxiosResponse<IGetTasksResponse> = await axios.post(
        `${URL_API.BOARDS}/${idBoard}/columns/${idColumn}/tasks`,
        body,
        {
          headers,
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to create task');
    }
  },
);

export const getTasks = createAsyncThunk(
  'boards/getTasks',
  async (query: IGetTasksQuery, { rejectWithValue }) => {
    try {
      const { idBoard, idColumn } = query;
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      };
      const response: AxiosResponse<IGetTasksResponse[]> = await axios.get(
        `${URL_API.BOARDS}/${idBoard}/columns/${idColumn}/tasks`,
        {
          headers,
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to get tasks');
    }
  },
);

export const deleteColumn = createAsyncThunk(
  'boards/deleteColumn',
  async (query: IDeleteColumnQuery, { rejectWithValue }) => {
    try {
      const { idBoard, idColumn } = query;
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      };
      const response: AxiosResponse<IAddAllColumns> = await axios.delete(
        `${URL_API.BOARDS}/${idBoard}/columns/${idColumn}`,
        {
          headers,
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to delete column');
    }
  },
);

export const deleteTask = createAsyncThunk(
  'boards/deleteTask',
  async (query: IDeleteTaskQuery, { rejectWithValue }) => {
    try {
      const { taskId, boardId, columnId } = query;
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      };
      const response: AxiosResponse<IGetTasksResponse> = await axios.delete(
        `${URL_API.BOARDS}/${boardId}/columns/${columnId}/tasks/${taskId}`,
        {
          headers,
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to delete task');
    }
  },
);

export const changeTask = createAsyncThunk(
  'boards/changeTask',
  async (query: IGetTasksResponse, { rejectWithValue }) => {
    try {
      const { _id, boardId, columnId, description, order, title, userId, users } = query;
      const body = {
        title,
        order,
        description,
        columnId,
        userId,
        users,
      };
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      };
      const response: AxiosResponse<IGetTasksResponse> = await axios.put(
        `${URL_API.BOARDS}/${boardId}/columns/${columnId}/tasks/${_id}`,
        body,
        {
          headers,
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to change task');
    }
  },
);

export const {
  useGetAllBoardsQuery,
  useCreateBoardMutation,
  useGetBoardByIdQuery,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
  useGetBoardSetQuery,
  useGetBoardSetByUserQuery,
} = boardsApi;
