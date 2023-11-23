import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    select:[0],
}


const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        setSelect(state, action) {
            state.select = action.payload;
            return state;
        },
    },
});
export const calendarActions = calendarSlice.actions;
export default calendarSlice.reducer;