import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const noEditPlannerSlice = createSlice({
    name: 'plans',
    initialState,
    reducers: {
        //초기에 useEffect를 받고, payload를 받아서 수정해야한다.
        setPlansInit(state, action) {
            //음.. 좀 다를수 있는데 이걸 바꿔야한다.
            state = action.payload;
            return state;
        },
    },
});
export const noEditPlannerAction = noEditPlannerSlice.actions;
export default noEditPlannerSlice.reducer;
