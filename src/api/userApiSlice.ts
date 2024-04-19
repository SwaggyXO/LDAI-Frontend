import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: 'https://ldotai-core-ms.azurewebsites.net/api/ldai-core/v1/user' });

type CreateUserRequest = {
    ciamId: string;
    timeZone: string;
}

type User = {
    id: string;
    ciamId: string;
    grade: string;
    subjectId: string | null;
    marbles: number;
    xp: number;
    streak: number;
    isNew: boolean;
    timeZone: string;
}

interface CreateResponseData {
  newlyCreated: boolean;
  user: User;
}

interface CreateResponse {
  code: number;
  status: string;
  data: CreateResponseData;
  error: Object | null;
}

interface FetchResponse {
  code: number;
  status: string;
  data: User;
  error: Object | null;
}

interface UpdateResponse {
  data: FetchResponse;
}

interface CreateUserResponseResponse {
  id: string;
  userId: string;
  questionId: string;
  resultId: string;
  response: string[];
}

export interface CreateUserResponseRequest {
  userId: string;
  quizId: string;
  questionId: string;
  response: string[];
  timeTaken: number;
  score?: number;
}

interface Winning {
  amount: number;
  currency: string;
}

interface Response {
  questionId: string;
  text: string;
  options: string[];
  response: string[];
  score: number;
}

interface ResultData {
  resultId: string;
  userId: string;
  quizId: string;
  score: number;
  timeTaken: string;
  winnings: Winning[];
  responses: Response[];
}

interface FetchUserResultResponse {
  code: number;
  status: string;
  data: ResultData;
  error: Object | null;
}

interface StartQuizResponse {
  code: number;
  status: string;
  data: string;
  error: Object | null;
}

interface Quizzes {
  userId: string,
  grade: string,
  streak: 0,
  quizzes: [
    {
      quizId: string,
      subject: string,
      title: string,
      description: string,
      quizType: string,
      attemptedAt: string,
      imageUrl: string
    }
  ]
}

interface FetchUserQuizzesResponse {
  code: number;
  status: string;
  data: Quizzes;
  error: Object | null;
}


export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery, 
  tagTypes: ['User'],
  endpoints: builder => ({
    fetchUserById: builder.query<FetchResponse, string>({
      query: (ciamId) => `/fetch/${ciamId}`,
      providesTags: ['User'],
    }),
    createUser: builder.mutation<CreateResponse, CreateUserRequest>({
      query: requestData => ({
        url: '/create',
        method: 'POST',
        body: requestData,
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation<UpdateResponse, Partial<User>>({
        query: (body) => ({
          url: `/update`,
          method: 'PATCH',
          body,
        }),
        invalidatesTags: ['User'],
    }),
    createUserResponse: builder.mutation<CreateUserResponseResponse, CreateUserResponseRequest>({
      query: requestData => ({
        url: '/response/create',
        method: 'POST',
        body: requestData,
      }),
    }),
    fetchUserResult: builder.query<FetchUserResultResponse, [string, string]>({
      query: ([userId, quizId]) => ({
        url: `/result/${userId}/fetch/${quizId}`,
        method: 'GET',
      }),
    }),
    fetchUserResultStream: builder.query<ResultData, []>({
      query: () => ({
        url: `/result/stream`,
        method: 'GET',
      }),
    }),
    startQuiz: builder.mutation<StartQuizResponse, { userId: string, quizId: string }>({
      query: requestData => ({
        url: '/quiz/start',
        method: 'POST',
        body: requestData,
      }),
    }),
    fetchUserQuizzes: builder.query<FetchUserQuizzesResponse, { userId: string, limit?: number }>({
      query: ({ userId, limit }) => {
        let url = `/quizzes/${userId}`;
        if (limit) url += `?limit=${limit}`;
        return url;
      },
      providesTags: ['User'],
    }),
  }),
});

export const { 
    useFetchUserByIdQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useCreateUserResponseMutation,
    useFetchUserResultQuery,
    useFetchUserResultStreamQuery,
    useStartQuizMutation,
    useFetchUserQuizzesQuery,
} = usersApi;
