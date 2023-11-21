import { createSlice } from '@reduxjs/toolkit';
const initialState = [];

const planInfoSlice = createSlice({
    name: 'planInfo',
    initialState,
    reducers: {
        //초기에 useEffect를 받고, payload를 받아서 수정해야한다.
        setPlanInfoInit(state, action) {
            //음.. 좀 다를수 있는데 이걸 바꿔야한다.
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
