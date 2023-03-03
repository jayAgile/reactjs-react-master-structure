import { createSlice } from "@reduxjs/toolkit";
import {
  ALBUM_INFO_S,
  ALBUM_INFO_F,
  ALBUM_LIST_S,
  ALBUM_LIST_F,
  API_ALBUM,
} from "../constants";

const initialState = {
  isLoading: false,
  albumList: [],
  albumInfo: {},
};

export const getAlbumList = (page = 1) => ({
  type: "API3",
  payload: {
    url: `${page}/${API_ALBUM}`,
    hideLoader: false,
    success: (data) => ({
      type: ALBUM_LIST_S,
      payload: data,
    }),
    error: (data) => ({
      type: ALBUM_LIST_F,
      payload: [],
    }),
  },
});

// Reducer
const albumSlice = createSlice({
  name: "album",
  initialState: initialState,
  reducers: {
    loaderChange: (state, payload) => {
      console.log(payload);
      state.isLoading = payload.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(ALBUM_LIST_S, (state, action) => {
      // console.log(state);
      state.albumList = action.payload;
    });
    builder.addCase(ALBUM_LIST_F, (state) => {
      state.albumList = [];
    });
    builder.addCase(ALBUM_INFO_S, (state, action) => {
      state.albumInfo = action.payload;
    });
    builder.addCase(ALBUM_INFO_F, (state) => {
      state.albumInfo = {};
    });
  },
});

export const { loaderChange } = albumSlice.actions;
export default albumSlice.reducer;
