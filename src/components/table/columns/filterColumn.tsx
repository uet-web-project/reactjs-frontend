import { TextField, Typography } from "@mui/material";
import {
  GridColDef,
  GridColumnHeaderParams,
  GridRowParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import moment from "moment";
import CarDialog from "../../profile-dialog/CarDialog";

export default function filterColumn(
  columns: GridColDef[],
  isSet: boolean,
  location?: string
) {
  const newColumns = columns.map((column: any) => {
    console.log(isSet);
    if (!isSet) {
      delete column.renderHeader;
      console.log(column);
      return column;
    }
    console.log("22");
    return {
      ...column,
      renderHeader: () => {
        return <TextField />;
      },
    };
  });
  return newColumns;
}
