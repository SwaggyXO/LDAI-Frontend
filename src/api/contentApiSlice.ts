import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: 'https://ldai-content-ms.azurewebsites.net/api/ldai-content/v1' });

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

