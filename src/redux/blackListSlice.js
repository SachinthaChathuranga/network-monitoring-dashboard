import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blackListedIPs: [],
};

const blackListSlice = createSlice({
  name: "blacklist",
  initialState,
  reducers: {
    addToBlackList: (state, action) => {
      state.blackListedIPs.push(action.payload);
    },
    removeFromBlackList: (state, action) => {
      state.blackListedIPs = state.blackListedIPs.filter(
        (ip) => ip.ipv4 !== action.payload
      );
    },
  },
});

export const { addToBlackList, removeFromBlackList  } = blackListSlice.actions;
export default blackListSlice.reducer;
