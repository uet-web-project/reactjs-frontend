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
  const { setLocationState, setTypeState, loading } = loadingHook();

  useEffect(() => {}, []);

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
          <InfoTable location="center" />
        </div>
      </div>
    </div>
  );
}
export default RegistryCenter;
