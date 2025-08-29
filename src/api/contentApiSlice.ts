import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: import.meta.env.VITE_CONTENT_MS_BASE_URL });

export const contentApi = createApi({
    reducerPath: "contentApi",
    baseQuery,
    endpoints: (builder) => ({
        getContent: builder.query<any, { contentParent: string; content: string}>({
            query: ({ contentParent, content }) => `/media/${contentParent}/${content}`,
        }),
    }),
});

export const {
    useGetContentQuery
} = contentApi;

