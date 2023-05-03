import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

interface ScrollState {
    value: number
}

const initialState: ScrollState = {
    value: 0
}

export const scrollSlice = createSlice({
    name: 'scroll',
    initialState,
    reducers: {
        setScroll: (state, action: PayloadAction<number>) => {
            state.value = action.payload
        }
    }
})

export const { setScroll } = scrollSlice.actions
export const selectScroll = (state: RootState) => state.scroll.value
export const scrollReducer = scrollSlice.reducer