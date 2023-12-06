import { createSlice } from '@reduxjs/toolkit';
const initialState = [];

const planInfoSlice = createSlice({
    name: 'planInfo',
    initialState,
    reducers: {
        setPlanInfoInit(state, action) {
            state = action.payload;
            return state;
        },
        setPlanInfo(state, action) {
            state = action.payload;
            return state;
        },
    },
});
export const planInfoActions = planInfoSlice.actions;
export default planInfoSlice.reducer;
