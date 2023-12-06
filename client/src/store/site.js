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
    },
    setIsData(state, action) {
      state.isData = action.payload;
    },
    setAllTrue(state) {
      state.isData = true;
      state.isLogin = true;
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
