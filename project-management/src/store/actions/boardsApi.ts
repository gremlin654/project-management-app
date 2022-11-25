import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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

export const {
  useGetAllBoardsQuery,
  useCreateBoardMutation,
  useGetBoardByIdQuery,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
  useGetBoardSetQuery,
  useGetBoardSetByUserQuery,
} = boardsApi;
