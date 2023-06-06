import React, { useCallback, useEffect, useState } from "react";
import {
  useDropzone,
  FileWithPath,
  FileError,
  FileRejection,
  DropEvent,
} from "react-dropzone";
import "./styles.css";
import {
  Box,
  Button,
  Dialog,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { fileImportHooks } from "../../redux/hooks/fileImportHooks";

export default function CarDialog(props: any) {
  const data = props.data;
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    
  }, []);
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

  function onCloseButtonClick() {
    setOpen(false);
  }

  return (
    <React.Fragment>
      <button id="viewDetailBut" onClick={handleClickOpen}>
        View Detail
      </button>
      <Dialog
        fullScreen={false}
        fullWidth={true}
        maxWidth={"xl"}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        style={{}}
      >
        {open && (
          <Box className="dialogContainer">
            <Box className="nameAndPicture">
              <h2>
                {data.vehicleType}: {data.manufacturer} {data.model} {data.version}
              </h2>
              <Box className="pictureHolder">
                <img src="/src/assets/images/CarDialog/carImage.jpg" alt="" className="carImage" />
              </Box>
            </Box>
            <Box className="carInfo">
              <h4>Car Info</h4>
              {Object.entries(data).map(([key, value]: [string, unknown]) => {
                if (
                  ["_v", "id", "index", "model", "version", "_id", "__v", "vehicleType", "manufacturer"].includes(key)
                ) {
                  return null; // Skip mapping for unwanted keys
                }
                return (
                  <Box className="item">
                    <Box className="left">{key}</Box>
                    <Box className="right">{value as React.ReactNode}</Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        )}
      </Dialog>
    </React.Fragment>
  );
}
