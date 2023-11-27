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
import like from "./like";
import site from "./site";

const rootReducer = combineReducers({
  like: like,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: {
    site,
    move,
    card,
    planner,
    plannerList,
    plannerInfo,
    calendar,
    persistedReducer,
  },
  // preloadedState: JSON.parse(localStorage.getItem("likeState")) || {
  //   like: { likedPlanners: [] },
  // },
});

// store.subscribe(() => {
//   const likeState = store.getState().like;
//   localStorage.setItem("likeState", JSON.stringify(likeState));
// });

const persistor = persistStore(store);

export { store, persistor };
