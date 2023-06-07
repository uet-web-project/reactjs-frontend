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

  useEffect(() => {
    setLocationState("center");
  }, []);

  return (
    <div className="pageContainer">
      <div className="transitionTabDiv">
        <TransitionTab />
      </div>
      <div className="tableContainer">
        <InfoTable location="center" />
      </div>
    </div>
  );
}
export default RegistryCenter;
