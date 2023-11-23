import { configureStore } from '@reduxjs/toolkit';
import move from './move';
import card from './card';
import planner from './planner';
import plannerList from './plannerList';
import plannerInfo from './plannerInfo';
import calendar from './calendar';

const store = configureStore({
    reducer: { move, card, planner, plannerList, plannerInfo, calendar },
});

export default store;
