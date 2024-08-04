import { api } from "..";

export const todosApi = api
  .enhanceEndpoints({ addTagTypes: ["Todo"] })
  .injectEndpoints({
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

      deleteTodo: builder.mutation({
        query: (id) => {
          return {
            url: `todos/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: [{ type: "Todo", id: "LIST" }],
      }),
    }),
    overrideExisting: "throw",
  });

export const { useGetTodosQuery, useAddTodoMutation, useDeleteTodoMutation } =
  todosApi;
