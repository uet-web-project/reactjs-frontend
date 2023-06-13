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
import moment from "moment";
import { Typography } from "@mui/material";
import CarDialog from "../profile-dialog/CarDialog";
import DropZone from "../data-import/DropZone";
import { Box, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./infoStyle.css";
import { ICarInfoTable } from "../../redux/slices/tablesSlice";
import FilterDialog from "../filter-by-columns/FilterDialog";
import FilterCenterDialog from "../filter-by-columns/FilterCenterDialog";
import filterColumn from "./columns/filterColumn";
import IconFilterAlt from "@mui/icons-material/FilterAlt";
import IconButton from "@mui/material/IconButton";
import { loadingHook } from "../../redux/hooks/loadingHooks";
import { chartStatisticHook } from "../../redux/hooks/chartStatisticHook";
import Button from "../button/Button";

// car, registryCenter, expired

export default function InfoTable(prop: any) {
  const { location } = loadingHook();
  const { tableInfo } = chartStatisticHook();
  const { getDataForDetailedTable } = chartStatisticHook();
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
        setColumns(carColumns);
        break;
      case "center":
        setColumns(centerColumns);
        break;
      case "nearExpired":
        setColumns(carColumns);
        break;
    }
    getDataForDetailedTable();
  }, [location]);

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
                hideSortIcons: true,
                renderHeader: () => (
                  <TextField
                    id={item.field}
                    className="filterField"
                    label={item.headerName}
                    variant="standard"
                    onChange={handleFiltersChange}
                    onKeyDown={(event) => event.stopPropagation()}
                    onClick={(event) => event.stopPropagation()}
                    size="small"
                  />
                ),
                className: isFilterCol ? "column-animation" : "",
              }
            : { ...item, hideSortIcons: false };
        });
      });
    } else {
      setColumns((current) => {
        return current.map((item, index) => {
          return {
            ...item,
            hideSortIcons: false,
            renderHeader: undefined,
            className: isFilterCol ? "column-animation" : "",
          };
        });
      });
      setSearch({});
    }
  }, [isFilterCol]);

  const carInvisibility = {
    width: false,
    length: false,
    emission: false,
    mileage: false,
    wheelBase: false,
  };
  return (
    <Paper
      className="paperContainer"
      sx={{
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      <div className="firstPart">
        <IconButton onClick={() => setFilterCol((current) => !current)}>
          <IconFilterAlt color={isFilterCol ? "primary" : "action"} />
        </IconButton>
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
          <Button
            content="Clear Filter"
            onClick={clearFilter}
            style={{ marginLeft: "5px" }}
          />
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
          className="data-grid"
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
            columns: {
              columnVisibilityModel: carInvisibility,
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
    headerAlign: "left",
    minWidth: 50,
    flex: 1,
    editable: false,
    sortable: false,
    align: "left",
  },
  {
    field: "licensePlate",
    headerName: "License Plate",
    headerAlign: "left",
    minWidth: 100,
    flex: 2,
    editable: false,
    align: "left",
  },
  {
    field: "vehicleType",
    headerName: "Vehicle Type",
    headerAlign: "left",
    minWidth: 100,
    flex: 2,
    editable: false,
    align: "left",
  },
  {
    field: "manufacturer",
    headerName: "Manufacturer",
    headerAlign: "left",
    minWidth: 100,
    flex: 2,
    editable: false,
    align: "left",
  },
  {
    field: "model",
    headerName: "Model",
    headerAlign: "left",
    minWidth: 130,
    flex: 1,
    editable: false,
    align: "left",
  },
  {
    field: "purpose",
    headerName: "Purpose",
    headerAlign: "left",
    minWidth: 170,
    flex: 1,
    editable: false,
    align: "left",
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
    headerAlign: "left",
    minWidth: 300,
    flex: 3,
    editable: false,
    align: "left",
  },
  {
    field: "registrationDate",
    headerName: "Registration Date",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    headerAlign: "left",
    minWidth: 130,
    flex: 2,
    align: "left",
    valueGetter: (params: GridValueGetterParams) =>
      `${moment(params.value).format("DD/MM/YYYY")}`,
  },
  {
    field: "registrationExpirationDate",
    headerName: "Registration Expiration Date",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    headerAlign: "left",
    minWidth: 190,
    flex: 2,
    align: "left",
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
    headerName: "Width(mm)",
    headerAlign: "left",
    minWidth: 80,
    flex: 1,
    align: "left",
  },
  {
    field: "length",
    headerName: "Length(mm)",
    headerAlign: "left",
    minWidth: 100,
    flex: 1,
    align: "left",
  },
  {
    field: "wheelBase",
    headerName: "Wheel Base(mm)",
    headerAlign: "left",
    minWidth: 125,
    flex: 1,
    align: "left",
  },
  {
    field: "emission",
    headerName: "Emission(kgCo2/km)",
    headerAlign: "left",
    minWidth: 150,
    flex: 1,
    align: "left",
  },
  {
    field: "mileage",
    headerName: "Mileage(mm)",
    headerAlign: "left",
    minWidth: 100,
    flex: 1,
    align: "left",
  },
  {
    field: "registrationCenterId",
    headerName: "Registration Center ID",
    headerAlign: "left",
    minWidth: 160,
    flex: 1,
    align: "left",
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
    headerAlign: "left",
    minWidth: 70,
    flex: 1,
    align: "left",
  },
  {
    field: "name",
    headerName: "Name",
    headerAlign: "left",
    minWidth: 300,
    flex: 2,
    align: "left",
  },
  {
    field: "fullAdress",
    headerName: "Location",
    headerAlign: "left",
    minWidth: 330,
    flex: 4,
    align: "left",
  },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    headerAlign: "left",
    minWidth: 120,
    flex: 1,
    align: "left",
  },
  {
    field: "registrationDep",
    headerName: "Registration Department",
    headerAlign: "left",
    minWidth: 210,
    flex: 2,
    align: "left",
  },
];
