import { configureStore } from '@reduxjs/toolkit';
import move from './move';
import card from './card';
import planner from './planner';

const store = configureStore({
    reducer: { move, card, planner },
});

export default store;
