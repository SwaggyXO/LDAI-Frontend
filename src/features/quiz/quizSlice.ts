import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

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

interface QuizState {
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
        return {
          ...state,
          ...action.payload,
        };
    },
    updateTimeLeft(state, action: PayloadAction<number>) {
        state.timeLeft = action.payload;
    },
    endQuiz(state) {
        state.timeLeft = 0;
    },
    resetQuizState(state) {
        state.questions = [];
        state.timeLeft = 0;
    },
  },
});

export const saveQuizToCookie = (quiz: QuizState) => {
    const key = "Quiz";
    Cookies.set(key, JSON.stringify(quiz));
}

export const getQuizFromCookie = () => {
    const key = "Quiz";
    const cookieValue = Cookies.get(key);
    return cookieValue ? JSON.parse(cookieValue) : null;
}

export const { updateQuizState, updateTimeLeft, endQuiz, resetQuizState } = quizSlice.actions;
export default quizSlice.reducer;
