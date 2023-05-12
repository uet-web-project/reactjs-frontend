import * as React from "react";
import Paper from "@mui/material/Paper";
import "./styles.css";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import { useEffect } from "react";

// car, registryCenter, expired
interface TableProps {
  cars: {
    id?: string;
    vin: string;
    registrationNumber: string;
    vehicleType: string;
    registrationDate: string;
    registrationLocation: string;
    licensePlate: string;
    vehicleOwner: string;
    manufacturer: string;
    model: string;
    version: string;
    purpose: string;
    width: number;
    length: number;
    wheelBase: number;
    emission: number;
    mileage: number;
    registrationCenter: string;
  }[];
  registryCenter: {}[];
}

export default function TestTable(props: any) {
  const rows = props[props.type];
  const [columns, setColumns] = React.useState<GridColDef[]>([
    {
      field: "",
      headerAlign: "left",
      flex: 1,
      align: "left",
      renderHeader: () => <strong>{""}</strong>,
    },
  ]);
  const [data, setData] = React.useState(rows);
  const [search, setSearch] = React.useState<Record<string, string[]>>({});

  useEffect(() => {
    const Columns: GridColDef[] = Object.keys(rows[0]).map((key) => ({
      field: key,
      headerAlign: "left",
      flex: 1,
      align: "left",
      renderHeader: () => <strong>{key.toUpperCase()}</strong>,
    }));
    setColumns(Columns);
  });

  // handle icon click to set colHeader to TextField
  function onFilterClick(){

  }

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
        rows={data}
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
