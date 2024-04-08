import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { removeQuizCookie, setQuizCookie } from './quizCookieHandler';

interface Question {
    id: string;
    text: string;
    imageUrl: string | null;
    options: string[];
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

interface Result {
    resultId: string;
    userId: string;
    quizId: string;
    score: number;
    timeTaken: string;
    winnings: Winning[];
    responses: Response[];
}

export interface QuizState {
    id: string | undefined;
    questions: Question[];
    timeLimit: number;
    timeLeft: number; 
    result: Result | null;
}

const initialState: QuizState = {
    id: undefined,
    questions: [],
    timeLimit: 0,
    timeLeft: 0,
    result: null
};


const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    updateQuizState(state, action: PayloadAction<Partial<QuizState>>) {
        setQuizCookie(action.payload);
        return {
          ...state,
          ...action.payload,
        };
    },
    updateTimeLeft(state, action: PayloadAction<number>) {
        state.timeLeft = action.payload;
    },
    resetQuizState(state) {
        removeQuizCookie();
        state.questions = [];
        state.timeLeft = 0;
    },
  },
});

export const { updateQuizState, updateTimeLeft, resetQuizState } = quizSlice.actions;
export default quizSlice.reducer;
