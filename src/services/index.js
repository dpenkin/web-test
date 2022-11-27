import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  SERVER_API,
  TODOS_ROUTE,
  POST_ROUTE,
  DELETE_ROUTE,
  UPDATE_ROUTE,
} from '../constants/Endpoints';

export const todoApiServer = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_API,
  }),
  endpoints: (builder) => ({
    getFullListTodo: builder.mutation({
      query: () => `${TODOS_ROUTE}`,
      transformResponse: ({ data }) => data,
    }),
    postTodo: builder.mutation({
      query: (data) => ({
        url: `${POST_ROUTE}`,
        method: 'POST',
        body: data,
      }),
      transformResponse: ({ data }) => data,
    }),
    updateTodo: builder.mutation({
      query: (id) => ({
        url: `${UPDATE_ROUTE}/${id}`,
        method: 'PUT',
        body: { status: true },
      }),
      transformResponse: ({ data }) => data,
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `${DELETE_ROUTE}/${id}`,
        method: 'DELETE',
      }),
      transformResponse: ({ data }) => data,
    }),
  }),
});

export const {
  useGetFullListTodoMutation,
  usePostTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApiServer;
