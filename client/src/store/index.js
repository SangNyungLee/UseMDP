import { configureStore } from '@reduxjs/toolkit';
import plannerList from './plannerList';
import calendar from './calendar';
import site from './site';
import pointer from './pointer';
import like from './like';
import noEditPlanner from './noEditPlanner';
const store = configureStore({
    reducer: {
        site,
        plannerList,
        calendar,
        pointer,
        like,
        noEditPlanner,
    },
});

export default store;
