import { configureStore } from '@reduxjs/toolkit'
import { scrollReducer } from './scrollSlice'
import viewReducer from './viewSlice'

const store = configureStore({
    reducer : {
        scroll: scrollReducer,
        view: viewReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store