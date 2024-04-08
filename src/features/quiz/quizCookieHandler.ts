import Cookies from 'js-cookie';
import { QuizState } from './quizSlice';

export const setQuizCookie = (quiz: Partial<QuizState>) => {
  Cookies.set('quiz', JSON.stringify(quiz), { expires: 7 }); // Cookie will expire after 7 days
};

export const getQuizCookie = (): Partial<QuizState> | null => {
  const quizCookie = Cookies.get('quiz');

  if (!quizCookie) {
    return null;
  }

  return JSON.parse(quizCookie);
};

export const removeQuizCookie = () => {
  Cookies.remove('quiz');
};