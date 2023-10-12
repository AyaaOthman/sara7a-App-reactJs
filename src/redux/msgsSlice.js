import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllMsgs = createAsyncThunk(
  "counter/getAllMsgs",
  async function () {
    let { data } = await axios.get(
      "https://sara7aiti.onrender.com/api/v1/message",
      {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      }
    );
    return data?.allMessages || [];
  }
);

let initialState = { msgsCounter: 0, msgs: [] };
let msgsSlice = createSlice({
  name: "msgsCounter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllMsgs.fulfilled, (state, action) => {
      state.msgs = action.payload;
    });
  },
});

export let counterReducer = msgsSlice.reducer;
