import { configureStore } from '@reduxjs/toolkit';
import { contentApi } from '../api/contentApiSlice';
import { oldUserApi } from '../api/oldUserApiSlice';
import { usersApi } from '../api/userApiSlice';
import { quizApi } from '../api/quizApiSlice';
import userReducer from '../features/user/userSlice';

const store = configureStore({
    reducer: {
        [contentApi.reducerPath]: contentApi.reducer,
        [oldUserApi.reducerPath]: oldUserApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [quizApi.reducerPath]: quizApi.reducer,
        user: userReducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(
            contentApi.middleware, 
            oldUserApi.middleware,
            usersApi.middleware,
            quizApi.middleware
        ),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;