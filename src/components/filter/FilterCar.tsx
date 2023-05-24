import * as React from "react";
import "./style.css";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Box, Dialog } from "@mui/material";

interface Props {
  row: {
    name: string;
    code: string;
    population: number;
    density: number;
  }[];
  onContentChange(event: any): void;
}

export default function FilterCar(props: any) {
  const rows = props.row;
  const [data, setData] = React.useState(rows);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (
    event: {},
    reason: "backdropClick" | "escapeKeyDown"
  ) => {
    if (reason === "backdropClick") {
      console.log(reason);
    } else {
      setOpen(false);
    }
  };
  const changes = (event: any) => {
    setData([{ name: "41234", code: "4124", population: 1, density: 1 }]);
    props.onContentChange([
      { name: "41234", code: "4124", population: 1, density: 1 },
    ]);
    console.log(134124);
  };
  return (
    <React.Fragment>
      <button id="filterButton" onClick={handleClickOpen}>
        Advanced Filter
      </button>
      <Dialog
        fullScreen={false}
        maxWidth={false}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        style={{}}
      >
        <Box
          className="filterCarDialog"
          noValidate
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            m: "auto",
            width: "fit-content",
          }}
        >
          <h1>Filter</h1>

          <div className="inputCard">registrationDateregistrationDate</div>
          <div className="inputCard">registrationNumber</div>
          <div className="inputCard">registrationLocation</div>
          <div className="inputCard">licensePlate</div>
          <div className="inputCard">vehicleType</div>
          <div className="inputCard">manufacturer</div>
          <div className="inputCard">model</div>
          <div className="inputCard">version</div>
          <div className="inputCard">purpose</div>
          <div className="inputCard">size</div>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}