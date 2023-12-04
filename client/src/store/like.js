import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    setLikesInit(state, action) {
      //   console.log(action.payload);
      const data = action.payload.data;
      if (Number.isInteger(data)) {
        state = [data];
        return state;
      } else {
        state = action.payload.map((like) => like.plannerId);
        return state;
      }
    },
    addPlannerLike(state, action) {
      return [...state, action.payload];
    },
    delPlannerLike(state, action) {
      return state.filter((plannerId) => plannerId !== action.payload);
    },
  },
});
export const likeActions = likeSlice.actions;
export default likeSlice.reducer;
