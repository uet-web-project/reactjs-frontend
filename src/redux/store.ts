import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import chartStatisticSlice from "./slices/chartsSlice";
import loadingSlice from "./slices/loadingSlice";
import accountSlice from "./slices/accountSlice";
import certificationSlice from "./slices/certificationSlice";
import certificationStepSlice from "./slices/certificationStepSlice";
import tableStatisticSlice from "./slices/tablesSlice";
import fileImportSlice from "./slices/fileImportSlice";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export const store = configureStore({
  reducer: {
    chartStatistic: chartStatisticSlice,
    loading: loadingSlice,
    isDepLogin: persistReducer(
      {
        key: "profile",
        storage,
      },
      accountSlice
    ),
    certification: certificationSlice,
    step:certificationStepSlice,
    tableStatistic: tableStatisticSlice,
    fileImport: fileImportSlice,
  },
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
