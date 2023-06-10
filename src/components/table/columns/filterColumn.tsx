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
    if (!isSet) {
      delete column.renderHeader;
      return column;
    }
    return {
      ...column,
      renderHeader: () => {
        return <TextField />;
      },
    };
  });
  return newColumns;
}
