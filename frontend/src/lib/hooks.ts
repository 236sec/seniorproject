import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Loading-specific hooks for convenience
export const useLoadingState = () => useAppSelector((state) => state.loading);
export const useIsLoading = () =>
  useAppSelector((state) => state.loading.isLoading);
export const useLoadingMessage = () =>
  useAppSelector((state) => state.loading.loadingMessage);
