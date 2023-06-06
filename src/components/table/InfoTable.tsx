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
  const location = prop.location;
  const {
    getCarTableData,
    getCenterTableData,
    getNearExpiredCarTableData,
    tableInfo,
  } = tableStatisticHook();
  const [search, setSearch] = React.useState<Record<string, string[]>>({});
  const [columns, setColumns] = React.useState<GridColDef[]>(
    "car" ? carColumns : "center" ? centerColumns : nearExpiredColumns
  );
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

const carColumns: GridColDef[] = [
  {
    field: "actions",
    headerName: "Actions",
    type: "actions",
    getActions: (params: GridRowParams<any>) => [
      <CarDialog data={params.row} />,
    ],
  },
  {
    field: "index",
    headerName: "Index",
    headerAlign: "center",
    editable: false,
    align: "center",
  },
  {
    field: "licensePlate",
    headerName: "License Plate",
    headerAlign: "center",
    flex: 1,
    editable: false,
    align: "center",
  },
  {
    field: "vehicleType",
    headerName: "Vehicle Type",
    headerAlign: "center",
    flex: 1,
    editable: false,
    align: "center",
  },
  {
    field: "manufacturer",
    headerName: "Manufacturer",
    headerAlign: "center",
    flex: 1,
    editable: false,
    align: "center",
  },
  {
    field: "registrationDate",
    headerName: "Registration Date",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    headerAlign: "center",
    flex: 1,
    align: "center",
    valueGetter: (params: GridValueGetterParams) =>
      `${moment(params.value).format("DD/MM/YYYY")}`,
  },
];

const nearExpiredColumns: GridColDef[] = [
  {
    field: "actions",
    headerName: "Actions",
    type: "actions",
    getActions: (params: GridRowParams<any>) => [
      <CarDialog data={params.row} />,
    ],
  },
  {
    field: "index",
    headerName: "Index",
    headerAlign: "center",
    editable: false,
    align: "center",
  },
  {
    field: "licensePlate",
    headerName: "License Plate",
    headerAlign: "center",
    flex: 1,
    editable: false,
    align: "center",
  },
  {
    field: "vehicleType",
    headerName: "Vehicle Type",
    headerAlign: "center",
    flex: 1,
    editable: false,
    align: "center",
  },
  {
    field: "manufacturer",
    headerName: "Manufacturer",
    headerAlign: "center",
    flex: 1,
    editable: false,
    align: "center",
  },
  {
    field: "registrationDate",
    headerName: "Registration Date",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    headerAlign: "center",
    flex: 1,
    align: "center",
    valueGetter: (params: GridValueGetterParams) =>
      `${moment(params.value).format("DD/MM/YYYY")}`,
  },
];

const centerColumns: GridColDef[] = [
  {
    field: "actions",
    headerName: "Actions",
    type: "actions",
    getActions: (params: GridRowParams<any>) => [
      <CarDialog data={params.row} />,
    ],
  },
  {
    field: "index",
    headerName: "Index",
    headerAlign: "center",
    editable: false,
    align: "center",
  },
  {
    field: "licensePlate",
    headerName: "License Plate",
    headerAlign: "center",
    flex: 1,
    editable: false,
    align: "center",
  },
  {
    field: "vehicleType",
    headerName: "Vehicle Type",
    headerAlign: "center",
    flex: 1,
    editable: false,
    align: "center",
  },
  {
    field: "manufacturer",
    headerName: "Manufacturer",
    headerAlign: "center",
    flex: 1,
    editable: false,
    align: "center",
  },
  {
    field: "registrationDate",
    headerName: "Registration Date",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    headerAlign: "center",
    flex: 1,
    align: "center",
    valueGetter: (params: GridValueGetterParams) =>
      `${moment(params.value).format("DD/MM/YYYY")}`,
  },
];
