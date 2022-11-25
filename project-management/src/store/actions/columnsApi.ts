import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const columnsApi = createApi({
  reducerPath: 'columnsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://final-task-rest-production.up.railway.app' }),
  endpoints: (builder) => ({
    getColumns: builder.query({
      query: (boardId) => ({
        url: `/boards/${boardId}/columns`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          accept: 'application/json',
        },
      }),
    }),
    createColumn: builder.mutation({
      query: (body) => ({
        url: `/boards/${body.boardId}/columns`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          accept: 'application/json',
        },
        body: {
          title: body.title,
          order: body.order,
        },
      }),
    }),
    getColumnById: builder.query({
      query: (body) => ({
        url: `/boards/${body.bId}/columns/${body.cId}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          accept: 'application/json',
        },
      }),
    }),
    updateColumn: builder.mutation({
      query: (body) => ({
        url: `/boards/${body.boardId}/columns/${body.columnId}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          accept: 'application/json',
        },
        body: {
          title: body.title,
          order: body.order,
        },
      }),
    }),
    deleteColumn: builder.mutation({
      query: (body) => ({
        url: `/boards/${body.boardId}/columns/${body.columnId}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          accept: 'application/json',
        },
      }),
    }),
    // getColumnSet: builder.query({
    //     query: (body) => ({
    //         url: `/columnSet`,
    //         method: 'GET',

    //     }),
    // }),
    // I have no idea how to implement this endpoint
  }),
});

export const {
  useGetColumnsQuery,
  useCreateColumnMutation,
  useGetColumnByIdQuery,
  useUpdateColumnMutation,
  useDeleteColumnMutation,
} = columnsApi;
