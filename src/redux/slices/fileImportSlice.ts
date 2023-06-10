import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FileWithPath } from "react-dropzone";

interface fileState {
  files: FileWithPath[];
}
const initialState: fileState = {
  files: [],
};

export const fileImportSlice = createSlice({
  name: "fileImportSlice",
  initialState: initialState,
  reducers: {
    setFile(state, action: PayloadAction<FileWithPath[]>) {
      state.files = action.payload;
    },
  },
});

export const { setFile } = fileImportSlice.actions;
export default fileImportSlice.reducer;
