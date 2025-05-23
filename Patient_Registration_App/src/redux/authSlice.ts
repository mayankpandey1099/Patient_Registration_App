import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, User } from "../types";

const initialState: AuthState = {
  user: null,
  token: null,
};

type AuthPayload = {
  user: User | null;
  token: string | null;
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthPayload>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
