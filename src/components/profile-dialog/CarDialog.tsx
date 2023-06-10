import React, { useCallback, useEffect, useState } from "react";
import "./styles.css";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Paper,
  Slide,
  Typography,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { TransitionProps } from "@mui/material/transitions";
import { PaperProps } from "@mui/material/Paper";
import Draggable from "react-draggable";
import { loadingHook } from "../../redux/hooks/loadingHooks";

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CarDialog(props: any) {
  const { location } = loadingHook();
  const data = props.data;
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
        Detail
      </button>
      <Dialog
        TransitionComponent={Transition}
        PaperComponent={PaperComponent}
        fullScreen={false}
        fullWidth={false}
        maxWidth={"sm"}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        style={{}}
      >
        {open && (
          <Box className="dialogContainer">
            <Box className="nameAndPicture">
              <DialogTitle
                style={{ cursor: "move" }}
                id="draggable-dialog-title"
              >
                {location === "car" ? (
                  <Typography variant="h4">
                    {data.vehicleType}: {data.manufacturer} {data.model}{" "}
                    {data.version}
                  </Typography>
                ) : (
                  <Typography variant="h4">{data.name}</Typography>
                )}
              </DialogTitle>
              <Box className="pictureHolder">
                {location !== "center" && (
                  <img
                    src="/src/assets/images/CarDialog/carImage.jpg"
                    alt=""
                    className="carImage"
                  />
                )}
              </Box>
            </Box>
            <Box className="Info">
              <h4>Info</h4>
              {Object.entries(data).map(([key, value]: [string, unknown]) => {
                if (
                  [
                    "_v",
                    "id",
                    "index",
                    "model",
                    "version",
                    "_id",
                    "__v",
                    "vehicleType",
                    "manufacturer",
                  ].includes(key)
                ) {
                  return null;
                }

                if (
                  key === "registrationDate" ||
                  key === "registrationExpirationDate"
                ) {
                  const date = new Date(value as string);
                  const formattedDate = `${date.getDate()}/${
                    date.getMonth() + 1
                  }/${date.getFullYear()}`;
                  value = formattedDate;
                }

                if (
                  [
                    "width",
                    "length",
                    "wheelBase",
                    "emission",
                    "mileage",
                  ].includes(key)
                ) {
                  key += " (mm)";
                }

                return (
                  <Box className="item" key={key}>
                    <Box className="left">
                      <Typography style={{ wordBreak: "break-all" }}>
                        {key}
                      </Typography>
                    </Box>
                    <Box className="right">
                      <Typography style={{ wordBreak: "break-all" }}>
                        {value as React.ReactNode}
                      </Typography>
                    </Box>
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
