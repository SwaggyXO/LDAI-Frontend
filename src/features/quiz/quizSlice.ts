import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { removeQuizCookie, setQuizCookie } from './quizCookieHandler';
import { update } from 'three/examples/jsm/libs/tween.module.js';

interface Question {
    id: string;
    text: string;
    imageUrl: string | null;
    options: string[];
    paraphrased: string
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
    quizId: string | undefined;
    questions: Question[];
    timelimit: number;
    timeLeft: number; 
    result: Result | null;
    activatedBoosters: string[];
}

const initialState: QuizState = {
    quizId: undefined,
    questions: [],
    timelimit: 0,
    timeLeft: 0,
    result: null,
    activatedBoosters: []
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
        state.questions = [];
        state.timeLeft = 0;
        state.activatedBoosters = [];
    },
    updateActivatedBoosters(state, action: PayloadAction<string>) {
        if (state.activatedBoosters.length < 2) {
            state.activatedBoosters.push(action.payload);
        }
    }
  },
});

export const { updateQuizState, updateTimeLeft, resetQuizState, updateActivatedBoosters } = quizSlice.actions;
export default quizSlice.reducer;
