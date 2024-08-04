import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { logOut } from "../slices/authSlice";

const baseQuery = fetchBaseQuery({ baseUrl: "http://localhost:3001/" });
async function customBaseQuery(args, api, extraOptions) {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.originalStatus === 401) {
    const state = api.getState();

    if (state.auth.auth) {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  // tagTypes: ["Todo", "Post", "Auth"],
  baseQuery: customBaseQuery,
  endpoints: () => ({}),
});
