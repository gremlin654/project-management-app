import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://final-task-rest-production.up.railway.app' }),
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: (body) => ({
        url: `/boards/${body.boardId}/columns/${body.columnId}/tasks`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          accept: 'application/json',
        },
      }),
    }),
    createTask: builder.mutation({
      query: (body) => ({
        url: `/boards/${body.boardId}/columns/${body.columnId}/tasks`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          accept: 'application/json',
        },
        body: {
          title: body.title,
          order: body.order,
          description: body.description,
          userId: body.userId,
          users: body.users,
        },
      }),
    }),
    getTaskById: builder.query({
      query: (body) => ({
        url: `/boards/${body.boardId}/columns/${body.columnId}/tasks/${body.taskId}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          accept: 'application/json',
        },
      }),
    }),
    updateTask: builder.mutation({
      query: (body) => ({
        url: `/boards/${body.boardId}/columns/${body.columnId}/tasks/${body.taskId}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          accept: 'application/json',
        },
        body: {
          title: body.title,
          order: body.order,
          description: body.description,
          columnId: body.columnId,
          userId: body.userId,
          users: body.users,
        },
      }),
    }),
    deleteTask: builder.mutation({
      query: (body) => ({
        url: `/boards/${body.boardId}/columns/${body.columnId}/tasks/${body.taskId}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          accept: 'application/json',
        },
      }),
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useGetTaskByIdQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
