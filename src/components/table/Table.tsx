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
import { useEffect } from "react";
import { tableStatisticHook } from "../../redux/hooks/tableStatisticHook";
import moment from "moment";
import { Button } from "@mui/material";
// car, registryCenter, expired

export default function TestTable(props: any) {
  const { getCarTableData, tableInfo } = tableStatisticHook();
  const [search, setSearch] = React.useState<Record<string, string[]>>({});

  function openInfoDiaglog(row: any) {
    console.log(row);
  }
  const columns: GridColDef[] = [
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      getActions: (params: GridRowParams) => [
        <button onClick={() => openInfoDiaglog(params.row)}>hello</button>,
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

  useEffect(() => {
    getCarTableData();
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
        overflow: "hidden",
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
            paginationModel: { page: 0, pageSize: 100 },
          },
        }}
        pageSizeOptions={[5, 10, 100, 1000, 10000]}
        disableRowSelectionOnClick
      />
    </Paper>
  );
}
