import { configureStore } from '@reduxjs/toolkit';
import { contentApi } from '../api/contentApiSlice';
import { userApi } from '../api/userApiSlice';

const store = configureStore({
    reducer: {
        [contentApi.reducerPath]: contentApi.reducer,
        [userApi.reducerPath]: userApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(contentApi.middleware, userApi.middleware),
});

export default store;