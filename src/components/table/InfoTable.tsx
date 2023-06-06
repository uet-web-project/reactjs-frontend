import * as React from "react";
import Paper from "@mui/material/Paper";
import "./styles.css";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { tableStatisticHook } from "../../redux/hooks/tableStatisticHook";
import moment from "moment";
import { Button } from "@mui/material";
import CarDialog from "../profile-dialog/CarDialog";
// car, registryCenter, expired

export default function InfoTable(prop: any) {
  const columns = prop.columns;
  const location = prop.location;
  const {
    getCarTableData,
    getCenterTableData,
    getNearExpiredCarTableData,
    tableInfo,
  } = tableStatisticHook();
  const [search, setSearch] = React.useState<Record<string, string[]>>({});

  useEffect(() => {
    switch (location) {
      case "car":
        getCarTableData();
        break;
      case "center":
        getCenterTableData();
        break;
      case "nearExpired":
        getNearExpiredCarTableData();
        break;
    }

    console.log(tableInfo);
  }, []);
  
  // handle icon click to set colHeader to TextField
  function onFilterClick() {}

  //filtering
  function inputSearch(id: string, e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearch((prevState) => ({
      ...prevState,
      [id]: [value],
    }));
    console.log(search);
  }

  return (
    <Paper
      sx={{
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      <DataGrid
        rows={tableInfo}
        columns={columns}
        slots={{
          toolbar: GridToolbar,
        }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 25 },
          },
        }}
        pageSizeOptions={[5, 10, 25, 50, 100, 1000, 10000]}
        disableRowSelectionOnClick
      />
    </Paper>
  );
}
