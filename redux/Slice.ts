import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    jsonData: null,
    selectedId: null,
    recent: null,
    isPlaying: false,
    currentPlaybackTime: 0,
    duration:0,
    userData:null
  },
  reducers: {
    setData: (state, action) => {
      state.jsonData = action.payload;
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setRecent: (state, action) => {
      state.recent = action.payload;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setCurrentPlaybackTime: (state, action) => {
      state.currentPlaybackTime = action.payload;
    },
    resetCurrentPlaybackTime: (state) => {
      state.currentPlaybackTime = 0;
    },
    setCurrentDuration: (state, action) => {
      state.duration = action.payload;
    },
    setUserData: (state,action)=>{
      state.userData = action.payload

    }
  },
});

export const {
  setData,
  setSelectedId,
  setRecent,
  setIsPlaying,
  setCurrentPlaybackTime,
  setCurrentDuration,
  resetCurrentPlaybackTime,
  setUserData
} = dataSlice.actions;
export default dataSlice.reducer;
