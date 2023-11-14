import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: 0,
    target: null,
    todo: [],
    progress: [],
    done: [],
}

const moveSlice = createSlice({
    name:'move',
    initialState,
    reducers:{
        setInitialState(state,action){
            return action.payload;
        },
        setTarget(state,action){
            state.target = action.payload;
        },
        setTodo(state,action){
            state.todo = action.payload;
        },
        addTodo(state,action){
            state.todo = [ ...state.todo, { ...action.payload, id: state.count } ]
            state.count = state.count + 1;
        },
        addProgress(state,action){
            state.progress = [ ...state.progress, { ...action.payload, id: state.count } ]
            state.count = state.count + 1;
        },
        addDone(state,action){
            state.done = [ ...state.done, { ...action.payload, id: state.count } ]
            state.count = state.count + 1;
        },
        delTarget(state){
            state.action = null
        },
        delTodo(state,action){
            state.todo = state.todo.filter( e => e.id !== action.payload )
        },
        delProgress(state,action){
            state.progress = state.progress.filter( e => e.id !== action.payload )
        },
        delDone(state,action){
            state.done = state.done.filter( e => e.id !== action.payload )
        },
        replaceTodo(state,action){
            const updatedComponents = [...state.todo];
            const { fromId, toId } = action.payload
            const fromIndex = updatedComponents.findIndex((c) => c.id === fromId);
            const toIndex = updatedComponents.findIndex((c) => c.id === toId);
            const movedComponent = updatedComponents.splice(fromIndex, 1)[0];
            updatedComponents.splice(toIndex, 0, movedComponent);
            state.todo = updatedComponents;
        },
        replaceProgress(state,action){
            const updatedComponents = [...state.progress];
            const { fromId, toId } = action.payload
            const fromIndex = updatedComponents.findIndex((c) => c.id === fromId);
            const toIndex = updatedComponents.findIndex((c) => c.id === toId);
            const movedComponent = updatedComponents.splice(fromIndex, 1)[0];
            updatedComponents.splice(toIndex, 0, movedComponent);
            state.progress = updatedComponents;
        },
        replaceDone(state,action){
            const updatedComponents = [...state.done];
            const { fromId, toId } = action.payload
            const fromIndex = updatedComponents.findIndex((c) => c.id === fromId);
            const toIndex = updatedComponents.findIndex((c) => c.id === toId);
            const movedComponent = updatedComponents.splice(fromIndex, 1)[0];
            updatedComponents.splice(toIndex, 0, movedComponent);
            state.done = updatedComponents;
        }
    }
})

export const moveAction = moveSlice.actions;
export default moveSlice.reducer;