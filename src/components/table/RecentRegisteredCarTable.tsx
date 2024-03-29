import React, { useEffect, useLayoutEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import axiosInstance from "../../utils/axios";
import { getAPI } from "../../api/getAPI";
import { chartStatisticHook } from "../../redux/hooks/chartStatisticHook";
import moment from "moment";
import "./styles.css";
import { accountHook } from "../../redux/hooks/accountHooks";

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

export default function RecentRegisteredCarTable() {
  const { isDepLogin } = accountHook();
  const { carInfoOverviewTable, getVehicleTableData } = chartStatisticHook();
  const [screenWidth, screenHeight] = useWindowSize();
  let rowWidth = !isDepLogin
    ? (screenWidth * 18) / 100
    : (screenWidth * 14) / 100;

  if (isDepLogin && screenWidth < 1200) {
    rowWidth = (screenWidth * 18) / 100;
  }
  const columns: GridColDef[] = [
    {
      field: "licensePlate",
      headerName: "License Plate",
      headerAlign: "center",
      width: rowWidth,
      editable: false,
      align: "center",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "vehicleType",
      headerName: "Vehicle Type",
      headerAlign: "center",
      width: rowWidth,
      editable: false,
      align: "center",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "manufacturer",
      headerName: "Manufacturer",
      headerAlign: "center",
      width: rowWidth,
      editable: false,
      align: "center",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "registrationDate",
      headerName: "Registration Date",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      headerAlign: "center",
      width: rowWidth,
      align: "center",
      flex: 1,
      minWidth: 100,
      valueGetter: (params: GridValueGetterParams) =>
        `${moment(params.value).format("DD/MM/YYYY")}`,
    },
    {
      field: "registrationExpirationDate",
      headerName: "Registration Expiration Date",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      headerAlign: "center",
      width: rowWidth,
      align: "center",
      flex: 1,
      minWidth: 100,
      valueGetter: (params: GridValueGetterParams) =>
        `${moment(params.value).format("DD/MM/YYYY")}`,
    },
  ];

  useEffect(() => {
    getVehicleTableData();
  }, []);

  return (
    <Box
      className={`recent-registered-table-container ${
        isDepLogin ? "width-responsive" : null
      }`}
      sx={isDepLogin ? { width: "75%" } : { width: "100%" }}
    >
      <DataGrid
        className="recent-registered-table"
        rows={carInfoOverviewTable}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableColumnSelector
      />
    </Box>
  );
}
