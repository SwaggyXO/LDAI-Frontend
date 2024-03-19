import { configureStore } from '@reduxjs/toolkit';
import { contentApi } from '../api/contentApiSlice';

const store = configureStore({
    reducer: {
        [contentApi.reducerPath]: contentApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(contentApi.middleware),
});

export default store;