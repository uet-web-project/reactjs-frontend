import * as React from "react";
import Paper from "@mui/material/Paper";
import "./styles.css";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { useEffect } from "react";
import { chartStatisticHook } from "../../redux/hooks/chartStatisticHook";
import moment from "moment";
// car, registryCenter, expired

export default function TestTable(props: any) {
  const { loading, carInfoOverviewTable, getVehicleTableData } =
    chartStatisticHook();
  const [search, setSearch] = React.useState<Record<string, string[]>>({});

  const columns: GridColDef[] = [
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
      field: "vehicleOwner",
      headerName: "owner",
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
    getVehicleTableData();
    console.log(carInfoOverviewTable);
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
        rows={carInfoOverviewTable}
        columns={columns}
        slots={{
          toolbar: GridToolbar,
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Paper>
  );
}
