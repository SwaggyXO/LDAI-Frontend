import { configureStore } from '@reduxjs/toolkit';
import { contentApi } from '../api/contentApiSlice';
import { oldUserApi } from '../api/oldUserApiSlice';
import { usersApi } from '../api/userApiSlice';
import userReducer from '../features/user/userSlice';

const store = configureStore({
    reducer: {
        [contentApi.reducerPath]: contentApi.reducer,
        [oldUserApi.reducerPath]: oldUserApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        user: userReducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(
            contentApi.middleware, 
            oldUserApi.middleware,
            usersApi.middleware,
        ),
});

export default store;