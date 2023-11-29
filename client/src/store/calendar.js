import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    home: [1],
    quote: [0],
    // [ plannerId, cardStatusIndex, cardId ] 형태로 사용
}


const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        setHome(state, action) {
            state.home = action.payload;
            return state;
        },
        setQuote(state, action) {
            state.quote = action.payload;
            return state;
        },
        setSelect(state,action){
            const { target, value } = action.payload
            switch(target){
                case "HOME":
                    state.home = value;
                    break;
                case "QUOTE":
                    state.quote = value;
                    break;
            }
            return state;
        }
    },
});
export const calendarActions = calendarSlice.actions;
export default calendarSlice.reducer;
