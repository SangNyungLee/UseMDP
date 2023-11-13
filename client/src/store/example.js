import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    exmaple:'',
}

const exampleSlice = createSlice({
    name:'example',
    initialState,
    reducers:{
        example(state,action){
            state.exmaple = action.payload
        },
    }
})

export const exampleAction = exampleSlice.actions;
export default exampleSlice.reducer;