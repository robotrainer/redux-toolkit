import { configureStore } from "@reduxjs/toolkit";

import todosReducer from "./slices/todosSlice";
import authReducer from "./slices/authSlice";

import { api } from "./api";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    auth: authReducer,

    [api.reducerPath]: api.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
