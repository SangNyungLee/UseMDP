import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: 0,
    content: '',
    title: '',
    cover_Color: '#FFD6DA',
    start_date: new Date().toString(),
    end_date: new Date().toString(),
    todolist: [{}],
};

const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        setInitialState(state, action) {
            state.title = action.payload.title;
            state.content = action.payload.title;
            state.cover_Color = action.payload.cover_Color;
            state.start_date = action.payload.start_date;
            state.end_date = action.payload.end_date;
            state.todolist = action.payload.todolist;
            state.id = action.payload.id;
        },
        setTitle(state, action) {
            state.title = action.payload;
            state.content = action.payload;
        },
        setCover(state, action) {
            state.cover_Color = action.payload;
        },
        setStartDate(state, action) {
            state.start_date = action.payload;
        },
        setEndDate(state, action) {
            state.end_date = action.payload;
        },
        setTodoList(state, action) {
            state.todolist = action.payload;
        },
    },
});

export const cardActions = cardSlice.actions;
export default cardSlice.reducer;
