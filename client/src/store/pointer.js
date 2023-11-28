import { createSlice } from '@reduxjs/toolkit';

const initialState = [-1, -1];

const pointSlice = createSlice({
    name: 'point',
    initialState,
    reducers: {
        setPoint(state, action) {
            state = action.payload;
            return state;
        },
        clearPoint(state) {
            state = [-1, -1];
            return state;
        },
    },
});
export const pointActions = pointSlice.actions;
export default pointSlice.reducer;
