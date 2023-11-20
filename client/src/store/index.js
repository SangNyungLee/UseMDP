import { configureStore } from '@reduxjs/toolkit';
import move from './move';
import card from './card';
import planner from './planner';
import plannerList from './plannerList';

const store = configureStore({
    reducer: { move, card, planner, plannerList },
});

export default store;
