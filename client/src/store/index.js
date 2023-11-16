import { configureStore } from '@reduxjs/toolkit';
import move from './move';
import card from './card';

const store = configureStore({
    reducer: { move, card },
});

export default store;
