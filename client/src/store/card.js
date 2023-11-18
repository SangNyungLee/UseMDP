import { createSlice } from '@reduxjs/toolkit';
import copy from 'fast-copy';
const initialState = {
    cardId: 0,
    description: '',
    title: '',
    coverColor: '#FFD6DA',
    start_date: new Date().toISOString(),
    end_date: new Date().toISOString(),
    todolist: [{}],
    intOrder: 0,
    separator: [],
};

const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        setInitialState(state, action) {
            state.title = action.payload.title;
            state.description = action.payload.description;
            state.coverColor = action.payload.coverColor;
            state.start_date = action.payload.start_date;
            state.end_date = action.payload.end_date;
            state.todolist = action.payload.todolist;
            state.cardId = action.payload.cardId;
            state.intOrder = action.payload.intOrder;
            state.separator = action.payload.separator;
        },
        setCard(state, action) {
            console.log('action.payload', action.payload);
            state = copy(action.payload);
            return state;
        },
        setTitle(state, action) {
            state.title = action.payload.title;
            state.description = action.payload.description;
        },
        setCover(state, action) {
            state.coverColor = action.payload;
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
