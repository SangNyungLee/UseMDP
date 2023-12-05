import { configureStore } from '@reduxjs/toolkit';
import planner from './planner';
import plannerList from './plannerList';
import plannerInfo from './plannerInfo';
import calendar from './calendar';
import site from './site';
import pointer from './pointer';
import like from './like';
import noEditPlanner from './noEditPlanner';
const store = configureStore({
    reducer: {
        site,
        planner,
        plannerList,
        plannerInfo,
        calendar,
        pointer,
        like,
        noEditPlanner,
    },
});

export default store;
