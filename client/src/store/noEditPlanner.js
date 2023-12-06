import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const noEditPlannerSlice = createSlice({
    name: 'plans',
    initialState,
    reducers: {
        setPlansInit(state, action) {
            state = action.payload;
            return state;
        },
    },
});
export const noEditPlannerAction = noEditPlannerSlice.actions;
export default noEditPlannerSlice.reducer;
