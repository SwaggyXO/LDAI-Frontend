import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: 'https://ldotai-core-ms.azurewebsites.net/api/ldai-core/v1/quiz' });

interface Quiz {
  quizId: string;
  questions: string[];
  title: string;
  description: string;
  subject: string;
  quizType: string;
  timelimit: number;
  imageUrl: string;
}

interface Response {
    code: number;
    status: string;
    data: Array<Quiz>;
    error: Object | null;
}

export const quizApi = createApi({
  reducerPath: 'quizApi',
  baseQuery, 
  endpoints: (builder) => ({
    fetchQuizById: builder.query<Quiz, string>({
      query: (quizId) => `/fetch/${quizId}`,
    }),
    fetchLatestQuizzes: builder.query<Response, number>({
        query: (limit) => `/fetch/latest?limit=${limit}`,
    }),
  }),
});

export const { 
    useFetchQuizByIdQuery,
    useFetchLatestQuizzesQuery
} = quizApi;
