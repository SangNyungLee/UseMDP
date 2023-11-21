import { configureStore } from '@reduxjs/toolkit';
import move from './move';
import card from './card';
import planner from './planner';
import plannerList from './plannerList';
import plannerInfo from './plannerInfo';

const store = configureStore({
    reducer: { move, card, planner, plannerList, plannerInfo },
});

export default store;
