import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import axiosInstance from "../../utils/axios";
import { getAPI } from "../../api/getAPI";

const columns: GridColDef[] = [
  {
    field: "licensePlate",
    headerName: "License Plate",
    width: 150,
    editable: false,
    align:"center",
  },
  {
    field: "vehicleType",
    headerName: "Vehicle Type",
    width: 150,
    editable: false,
    align:"center",
  },
  {
    field: "manufacturer",
    headerName: "Manufacturer",
    width: 110,
    editable: false,
    align:"center",
  },
  {
    field: "registrationDate",
    headerName: "Registration Date",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    align:"center",
    // valueGetter: (params: GridValueGetterParams) =>
    //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];


export default function RecentRegisteredCarTable() {
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
    <Box sx={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 8,
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
