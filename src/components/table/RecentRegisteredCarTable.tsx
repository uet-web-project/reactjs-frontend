import React, { useEffect, useLayoutEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import axiosInstance from "../../utils/axios";
import { getAPI } from "../../api/getAPI";
import moment from "moment";
import "./styles.css";

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
  const [screenWidth, screenHeight] = useWindowSize();
  const rowWidth = (screenWidth * 17) / 100;
  const columns: GridColDef[] = [
    {
      field: "licensePlate",
      headerName: "License Plate",
      headerAlign: "center",
      width: rowWidth,
      editable: false,
      align: "center",
    },
    {
      field: "vehicleType",
      headerName: "Vehicle Type",
      headerAlign: "center",
      width: rowWidth,
      editable: false,
      align: "center",
    },
    {
      field: "manufacturer",
      headerName: "Manufacturer",
      headerAlign: "center",
      width: rowWidth,
      editable: false,
      align: "center",
    },
    {
      field: "registrationDate",
      headerName: "Registration Date",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      headerAlign: "center",
      width: rowWidth,
      align: "center",
      valueGetter: (params: GridValueGetterParams) =>
        `${moment(params.value).format("DD/MM/YYYY")}`,
    },
  ];
  const [data, setData] = useState([]);

  useEffect(() => {
    const getAllVehicles = async () => {
      const res = await axiosInstance.get(getAPI().getAllVehicles);
      return res;
    };

    getAllVehicles()
      .then((res) => {
        console.log(res);
        const moddedData = res.data.map((item: any, index: number) => ({
          ...item,
          id: item._id,
        }));
        setData(moddedData);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box className="recent-registered-table-container">
      <DataGrid
        className="recent-registered-table"
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
