import { configureStore } from '@reduxjs/toolkit'
import { mlbApi } from './apiSlice'

export const store = configureStore({
    reducer: {
        [mlbApi.reducerPath]: mlbApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(mlbApi.middleware),
})
