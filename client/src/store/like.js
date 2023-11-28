import { createSlice } from "@reduxjs/toolkit";

const likeSlice = createSlice({
  name: "like",
  initialState: {
    likedPlanners: [],
  },
  reducers: {
    //좋아요
    addLike: (state, action) => {
      const { plannerId } = action.payload;
      state.likedPlanners.push({ plannerId });
    },
    //좋아요 취소
    removeLike: (state, action) => {
      const { plannerId } = action.payload;
      state.likedPlanners = state.likedPlanners.filter(
        (like) => !(like.plannerId === plannerId)
      );
    },
  },
});

export const { addLike, removeLike } = likeSlice.actions;
export default likeSlice.reducer;
