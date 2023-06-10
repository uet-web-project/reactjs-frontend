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
import { Button, Typography } from "@mui/material";
import CarDialog from "../profile-dialog/CarDialog";
import DropZone from "../data-import/DropZone";
import { Box, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./infoStyle.css";
import { ICarInfoTable } from "../../redux/slices/tablesSlice";
import FilterDialog from "../filter-by-columns/FilterDialog";
import FilterCenterDialog from "../filter-by-columns/FilterCenterDialog";
import filterColumn from "./columns/filterColumn";
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
  const [searchAll, setSearchAll] = React.useState("");
  const [set, Set] = React.useState(false);
  const [isFilterCol, setFilterCol] = React.useState(false);
  const [columns, setColumns] = React.useState<GridColDef[]>(
    "car" ? carColumns : "center" ? centerColumns : carColumns
  );

  const filterRows = tableInfo.filter((row) => {
    return (
      Object.entries(row).some(([key, value]) => {
        return row[key as keyof ICarInfoTable]
          ?.toString()
          .toLowerCase()
          .includes(searchAll.toLowerCase());
      }) &&
      Object.entries(search).every(([key, values]) => {
        return values.some((value) =>
          row[key as keyof ICarInfoTable]
            ?.toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      })
    );
  });
  useEffect(() => {
    switch (location) {
      case "car":
        getCarTableData();
        setColumns(carColumns);
        break;
      case "center":
        getCenterTableData();
        setColumns(centerColumns);
        break;
      case "nearExpired":
        getNearExpiredCarTableData();
        setColumns(carColumns);
        break;
    }
  }, []);

  //filtering
  function inputSearch(searchFilter: Record<string, string[]>) {
    setSearch(searchFilter);
    Set(!set);
  }

  let timeoutId: any;
  function onGeneralSearch(e: React.ChangeEvent<HTMLInputElement>) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      setSearchAll(e.target.value);
    }, 1000);
  }
  function handleFiltersChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const value = e.target.value;
    timeoutId = setTimeout(() => {
      setSearch((prevState) => ({
        ...prevState,
        [e.target.id]: [value],
      }));
    }, 1000);
  }
  function clearFilter() {
    Set(!set);
    setSearch({});
  }
  useEffect(() => {
    if (isFilterCol) {
      setColumns((current) => {
        return current.map((item, index) => {
          return index >= 2
            ? {
                ...item,
                minWidth: 300,
                renderHeader: () => (
                  <TextField
                    id={item.field}
                    className="filterField"
                    label="Standard"
                    variant="standard"
                    onChange={handleFiltersChange}
                    onKeyDown={(event) => event.stopPropagation()}
                  />
                ),
                className: isFilterCol ? "column-animation" : "",
              }
            : { ...item, minWidth: 70 };
        });
      });
    } else {
      setColumns((current) => {
        return current.map((item, index) => {
          return {
            ...item,
            minWidth: 200,
            renderHeader: undefined,
            className: isFilterCol ? "column-animation" : "",
          };
        });
      });
    }
  }, [isFilterCol]);

  function onClick() {
    // if (isFilterCol) setColumns(filterColumn() as GridColDef[]);
    // else setColumns(carColumns);
    // setFilterCol(!isFilterCol);
    setFilterCol(!isFilterCol);
  }
  return (
    <Paper
      className="paperContainer"
      sx={{
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      <button onClick={onClick}>click</button>
      <div className="firstPart">
        {tableInfo &&
          tableInfo[0] &&
          (location === "center" ? (
            <FilterCenterDialog
              data={Object.keys(tableInfo[0])}
              onFilter={inputSearch}
            />
          ) : (
            <FilterDialog
              data={Object.keys(tableInfo[0])}
              onFilter={inputSearch}
            />
          ))}
        {set && Object.keys(search).length !== 0 && (
          <button id="clearFilterBut" onClick={clearFilter}>
            clear filter
          </button>
        )}
        <div className="generalInputContainer">
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <SearchIcon
              sx={{ color: "black", mr: 1, my: 0.5 }}
              style={{ marginTop: "0px" }}
            />
            <TextField
              id="input-with-sx"
              label="Search"
              variant="standard"
              sx={{ color: "white", mr: 1, my: 0.5 }}
              onChange={onGeneralSearch}
            />
          </Box>
        </div>
        {location === "car" && <DropZone />}
      </div>
      <div className="secondPart">
        <DataGrid
          className="dataGrid"
          density="compact"
          rows={filterRows}
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
      </div>
    </Paper>
  );
}
const carColumns: GridColDef[] = [
  {
    field: "actions",
    headerName: "Actions",
    type: "actions",
    minWidth: 70,
    flex: 1,
    getActions: (params: GridRowParams<any>) => [
      <CarDialog data={params.row} />,
    ],
  },
  {
    field: "index",
    headerName: "Index",
    headerAlign: "center",
    minWidth: 20,
    flex: 1,
    editable: false,
    align: "center",
  },
  {
    field: "licensePlate",
    headerName: "License Plate",
    headerAlign: "center",
    minWidth: 100,
    flex: 2,
    editable: false,
    align: "center",
  },
  {
    field: "vehicleType",
    headerName: "Vehicle Type",
    headerAlign: "center",
    minWidth: 100,
    flex: 2,
    editable: false,
    align: "center",
  },
  {
    field: "manufacturer",
    headerName: "Manufacturer",
    headerAlign: "center",
    minWidth: 100,
    flex: 2,
    editable: false,
    align: "center",
  },
  {
    field: "model",
    headerName: "Model",
    headerAlign: "center",
    minWidth: 100,
    flex: 1,
    editable: false,
    align: "center",
  },
  {
    field: "purpose",
    headerName: "Purpose",
    headerAlign: "center",
    minWidth: 100,
    flex: 1,
    editable: false,
    align: "center",
    renderCell: (params) => {
      const formattedValue = params.value
        ? params.value.replace(/_/g, " ")
        : params.value;
      return (
        <div
          style={{
            overflow: "visible",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {formattedValue}
        </div>
      );
    },
  },
  {
    field: "registrationLocation",
    headerName: "Registration Location",
    headerAlign: "center",
    minWidth: 120,
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
    flex: 2,
    align: "center",
    valueGetter: (params: GridValueGetterParams) =>
      `${moment(params.value).format("DD/MM/YYYY")}`,
  },
  {
    field: "registrationExpirationDate",
    headerName: "Registration Expiration Date",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    headerAlign: "center",
    flex: 2,
    align: "center",
    valueGetter: (params: GridValueGetterParams) =>
      `${moment(params.value).format("DD/MM/YYYY")}`,
    renderHeader(params) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            padding: "0.5rem",
          }}
        >
          <Typography style={{ textAlign: "center" }}>
            Registration Expiration Date
          </Typography>
        </div>
      );
    },
  },
  {
    field: "width",
    headerName: "Width",
    headerAlign: "center",
    flex: 1,
    align: "center",
  },
  {
    field: "length",
    headerName: "Length",
    headerAlign: "center",
    flex: 1,
    align: "center",
  },
  {
    field: "wheelBase",
    headerName: "Wheel Base",
    headerAlign: "center",
    flex: 1,
    align: "center",
  },
  {
    field: "emission",
    headerName: "Emission",
    headerAlign: "center",
    flex: 1,
    align: "center",
  },
  {
    field: "mileage",
    headerName: "Mileage",
    headerAlign: "center",
    flex: 1,
    align: "center",
  },
  {
    field: "registrationCenterId",
    headerName: "Registration Center ID",
    headerAlign: "center",
    flex: 1,
    align: "center",
  },
];

const centerColumns: GridColDef[] = [
  {
    field: "actions",
    headerName: "Actions",
    type: "actions",
    minWidth: 70,
    maxWidth: 70,
    flex: 1,
    getActions: (params: GridRowParams<any>) => [
      <CarDialog data={params.row} />,
    ],
  },
  {
    field: "centerId",
    headerName: "Center ID",
    headerAlign: "center",
    minWidth: 100,
    flex: 1,
    align: "center",
  },
  {
    field: "password",
    headerName: "Password",
    headerAlign: "center",
    minWidth: 100,
    flex: 2,
    align: "center",
  },
  {
    field: "name",
    headerName: "Name",
    headerAlign: "center",
    minWidth: 100,
    flex: 2,
    align: "center",
  },
  {
    field: "location",
    headerName: "Location",
    headerAlign: "center",
    minWidth: 100,
    flex: 1,
    align: "center",
  },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    headerAlign: "center",
    minWidth: 100,
    flex: 1,
    align: "center",
  },
  {
    field: "registrationDep",
    headerName: "Registration Department",
    headerAlign: "center",
    minWidth: 100,
    flex: 2,
    align: "center",
  },
];
