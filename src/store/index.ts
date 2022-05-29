import { configureStore } from '@reduxjs/toolkit'
import catsSlice from './slices/catsSlice'

export const store = configureStore({
    reducer: {
        cats: catsSlice,
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>