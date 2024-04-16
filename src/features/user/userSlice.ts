import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { removeUserCookie, setUserCookie } from './userCookieHandler';

export interface UserState {
  userId: string | null;
  ciamId: string | null;
  grade: string | null;
  marbles: number;
  xp: number;
  streak: number;
  isNew: boolean;
  timeZone: string | null;
  subject: string | null;
}

const initialState: UserState = {
  userId: null,
  ciamId: null,
  grade: null,
  marbles: 0,
  xp: 0,
  streak: 0,
  isNew: true,
  timeZone: null,
  subject: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
      setUserCookie(action.payload);
      return {
        ...state,
        ...action.payload,
      };
    },
    clearUser: () => {
      removeUserCookie();
      return {
        ...initialState,
      };
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
