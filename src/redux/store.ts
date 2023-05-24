import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import chartStatisticSlice from "./slices/chartsSlice";
import loadingSlice from "./slices/loadingSlice";
import accountSlice from "./slices/accountSlice";
import tableStatisticSlice from "./slices/tablesSlice";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// ...

export const store = configureStore({
  reducer: {
    chartStatistic: chartStatisticSlice,
    loading: loadingSlice,
    isDepLogin: accountSlice,
    tableStatistic: tableStatisticSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
