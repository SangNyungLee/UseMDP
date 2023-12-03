import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  isData: false,
  memberId:''
};

const siteSlice = createSlice({
  name: "site",
  initialState,
  reducers: {
    setIsLogin(state, action) {
      state.isLogin = action.payload;
      // return state;
    },
    setIsData(state, action) {
      state.isData = action.payload;
      // return state;
    },
    setAllTrue(state) {
      state.isData = true;
      state.isLogin = true;
      // return state;
    },
    setAllFalse(state){
      state.isData = false;
      state.isLogin = false;
    },
    setMemberId(state,action){
      state.memberId = action.payload;
    }
  },
});

export const siteActions = siteSlice.actions;
export default siteSlice.reducer;
