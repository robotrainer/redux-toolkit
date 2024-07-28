import { configureStore } from "@reduxjs/toolkit";

import todosReducer from "./slices/todosSlice";

import { todosApi } from "./api/todosApi";

export const store = configureStore({
  reducer: {
    todos: todosReducer,

    [todosApi.reducerPath]: todosApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todosApi.middleware),
});
