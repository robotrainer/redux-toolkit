import { api } from "..";

const tag = "Post"

export const postApi = api
  .enhanceEndpoints({ addTagTypes: [tag] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getPosts: builder.query({
        query: () => "posts",
        providesTags: (result) =>
          result
            ? [
                ...result.map(({ id }) => ({ type: tag, id })),
                { type: tag, id: "LIST" },
              ]
            : [{ type: tag, id: "LIST" }],
      }),

      addPost: builder.mutation({
        query: (body) => {
          return {
            url: "posts",
            method: tag,
            body,
          };
        },
        invalidatesTags: [{ type: tag, id: "LIST" }],
      }),
    }),
    overrideExisting: "throw",
  });

export const { useGetPostsQuery, useAddPostMutation } = postApi;
