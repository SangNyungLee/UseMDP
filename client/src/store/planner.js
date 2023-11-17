import { createSlice } from '@reduxjs/toolkit';

const initialState = [{}, {}, {}];

const planSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        setTodoList(state, action) {
            state = action.payload;
            return state;
        },
    },
});
export const planActions = planSlice.actions;
export default planSlice.reducer;
