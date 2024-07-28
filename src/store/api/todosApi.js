import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todosApi = createApi({
  reducerPath: "todosApi",
  tagTypes: ["Todo"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "todos",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Todo", id })),
              { type: "Todo", id: "LIST" },
            ]
          : [{ type: "Todo", id: "LIST" }],
    }),

    addTodo: builder.mutation({
      query: (body) => {
        return {
          url: "todos",
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "Todo", id: "LIST" }],
    }),
  }),
});

export const { useGetTodosQuery, useAddTodoMutation } = todosApi;
