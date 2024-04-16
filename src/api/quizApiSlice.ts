import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: 'https://ldotai-core-ms.azurewebsites.net/api/ldai-core/v1/quiz' });

export interface Question {
    id: string;
    text: string;
    imageUrl: string | null;
    options: string[];
}

export interface Quiz {
  quizId: string;
  questions: Question[];
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
    data: Quiz;
    error: Object | null;
}

export interface ArrayResponse {
    code: number;
    status: string;
    data: Array<Quiz>;
    error: Object | null;
}

export const quizApi = createApi({
  reducerPath: 'quizApi',
  baseQuery, 
  tagTypes: ['Quiz'],
  endpoints: (builder) => ({
    fetchQuizById: builder.query<Response, string>({
      query: (quizId) => `/${quizId}`,
      providesTags: ['Quiz'],
    }),
    fetchLatestQuizzes: builder.query<ArrayResponse, { limit?: number, subject: string, quizType?: string }>({
      query: ({ limit, subject, quizType }) => {
        let url = `/fetch/latest?subject=${subject}`;
        if (limit) url += `&limit=${limit}`;
        if (quizType) url += `&quizType=${quizType}`;
        return url;
      },
      providesTags: ['Quiz'],
    }),
  }),
});

export const { 
    useFetchQuizByIdQuery,
    useFetchLatestQuizzesQuery
} = quizApi;
