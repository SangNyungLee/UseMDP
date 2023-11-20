import { createSlice } from '@reduxjs/toolkit';
//todo     doing    done

const initialState = [];

const plannerListSlice = createSlice({
    name: 'planners',
    initialState,
    reducers: {
        setPlannersInit(state, action) {
            state = action.payload;
            return state;
        },
        addPlanner(state,action){
            state = [...state,action.payload];
            return state;
        }
    },
});
export const plannerListActions = plannerListSlice.actions;
export default plannerListSlice.reducer;