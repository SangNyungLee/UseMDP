import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import move from "./move";
import card from "./card";
import planner from "./planner";
import plannerList from "./plannerList";
import plannerInfo from "./plannerInfo";
import calendar from "./calendar";
import site from "./site";
import like from "./like";

// const persistConfig = {
//   key: 'like',
//   storage,
// };

//const persistedReducer = persistReducer(persistConfig, like);

const store = configureStore({
  reducer: {
    site,
    move,
    card,
    planner,
    plannerList,
    plannerInfo,
    calendar,
    // persistedReducer,
  },
});

//const persistor = persistStore(store);

export default store;
