import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

type View = {
    width: number
    height: number
}

interface ViewState {
    value: View
}

const initialState: ViewState = {
    value: {width: 0, height: 0}
}

export const viewSlice = createSlice({
    name: 'view',
    initialState,
    reducers: {
        setViewWidth: (state, action: PayloadAction<number>) => {
            state.value.width = action.payload
        },
        setViewHeight: (state, action: PayloadAction<number>) => {
            state.value.height = action.payload
        }
    }
})

export const { setViewWidth, setViewHeight } = viewSlice.actions
export const selectView = (state: RootState) => state.view.value
export const viewReducer = viewSlice.reducer