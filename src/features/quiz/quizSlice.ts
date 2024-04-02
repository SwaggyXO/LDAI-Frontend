import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Question {
    id: string;
    text: string;
    imageUrl: string | null;
    options: string[];
}

interface QuizState {
    id: string | undefined;
    questions: Question[];
    timeLimit: number;
    timeLeft: number; 
}

const initialState: QuizState = {
    id: undefined,
    questions: [],
    timeLimit: 0,
    timeLeft: 0,
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

export const { updateQuizState, updateTimeLeft, endQuiz, resetQuizState } = quizSlice.actions;
export default quizSlice.reducer;
