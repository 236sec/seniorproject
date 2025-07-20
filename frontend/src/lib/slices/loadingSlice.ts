import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LoadingState {
  isLoading: boolean;
  loadingMessage?: string;
  loadingType?: string;
}

const initialState: LoadingState = {
  isLoading: false,
  loadingMessage: undefined,
  loadingType: undefined,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    showLoading: (
      state,
      action: PayloadAction<{ message?: string; type?: string }>
    ) => {
      state.isLoading = true;
      state.loadingMessage = action.payload.message || "Loading...";
      state.loadingType = action.payload.type;
    },
    hideLoading: (state) => {
      state.isLoading = false;
      state.loadingMessage = undefined;
      state.loadingType = undefined;
    },
    updateLoadingMessage: (state, action: PayloadAction<string>) => {
      if (state.isLoading) {
        state.loadingMessage = action.payload;
      }
    },
  },
});

export const { showLoading, hideLoading, updateLoadingMessage } =
  loadingSlice.actions;
export const loadingReducer = loadingSlice.reducer;
