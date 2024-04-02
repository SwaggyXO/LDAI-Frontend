import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: string | null;
  ciamId: string | null;
  grade: string | null;
  marbles: number;
  xp: number;
  streak: number;
  isNew: boolean;
  timeZone: string | null;
}

const initialState: UserState = {
  id: null,
  ciamId: null,
  grade: null,
  marbles: 0,
  xp: 0,
  streak: 0,
  isNew: false,
  timeZone: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearUser: (state) => {
      return {
        ...initialState,
      };
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
