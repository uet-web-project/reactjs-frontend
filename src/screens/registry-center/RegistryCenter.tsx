import "./styles.css";
import {
  GridColDef,
  GridRowParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import moment from "moment";
import CarDialog from "../../components/profile-dialog/CarDialog";
import InfoTable from "../../components/table/InfoTable";
import { useEffect, useState } from "react";
import { chartStatisticHook } from "../../redux/hooks/chartStatisticHook";
import { loadingHook } from "../../redux/hooks/loadingHooks";
import { Box, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TransitionTab from "../../components/transitionTab/TransitionTab";

function RegistryCenter() {
  const { setTypeState, loading } = loadingHook();

  useEffect(() => {}, []);

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

  return (
    <div className="pageContainer">
      <div className="transitionTabDiv">
        <TransitionTab />
      </div>
      <div className="tableContainer">
        <div className="firstPart">
          <div className="generalInputContainer">
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <SearchIcon sx={{ color: "white", mr: 1, my: 0.5 }} />
              <TextField
                id="input-with-sx"
                label="Search"
                sx={{ color: "white", mr: 1, my: 0.5 }}
                variant="standard"
              />
            </Box>
          </div>
        </div>
        <div className="secondPart">
          <InfoTable location="center" columns={centerColumns}/>
        </div>
      </div>
    </div>
  );
}
export default RegistryCenter;
