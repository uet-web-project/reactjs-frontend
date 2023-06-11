import React, { useCallback, useEffect, useState } from "react";
import "./styles.css";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
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
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";

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
  const [isDetail, setViewDetail] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    if (location === "center") setViewDetail(true);
  };

  const handleClose = (event: {}, reason: "escapeKeyDown") => {
    setOpen(false);
    setViewDetail(false);
  };

  function onCloseButtonClick() {
    setOpen(false);
    setViewDetail(false);
  }

  function onDetailClick() {
    setViewDetail(!isDetail);
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
        maxWidth={"md"}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <IconButton onClick={onCloseButtonClick}>
          <CloseIcon />
        </IconButton>

        {open && (
          <Box className={`dialogContainer ${open ? "open" : ""}`}>
            {location !== "center" && (
              <Box className="nameAndPicture">
                <div className="simple-info">
                  {Object.entries(data).map(
                    ([key, value]: [string, unknown]) => {
                      if (typeof value === "string") {
                        value = value.replace("_", " ");
                      }
                      if (
                        key === "registrationDate" ||
                        key === "registrationExpirationDate"
                      ) {
                        const date = new Date(value as string);
                        const formattedDate = moment(date).format("DD/MM/YYYY");
                        value = formattedDate;
                      }

                      if (
                        [
                          "registrationNumber",
                          "registrationDate",
                          "registrationExpirationDate",
                          "licensePlate",
                          "purpose",
                        ].includes(key)
                      ) {
                        return (
                          <Box
                            className="item"
                            key={key}
                            sx={{ textTransform: "capitalize" }}
                          >
                            <Box className="simple-left">
                              <Typography
                                style={{
                                  wordBreak: "break-all",
                                  fontWeight: "bold",
                                }}
                              >
                                {key.replace(/([a-z])([A-Z])/g, "$1 $2")}
                              </Typography>
                            </Box>
                            <Box className="simple-right">
                              <Typography style={{ wordBreak: "break-all" }}>
                                {value as React.ReactNode}
                              </Typography>
                            </Box>
                          </Box>
                        );
                      }
                    }
                  )}

                  <Box className="item" onClick={onDetailClick}>
                    <Box
                      style={{
                        display: "flex",
                        margin: "auto",
                        cursor: "pointer",
                      }}
                    >
                      <Typography
                        style={{
                          wordBreak: "break-all",
                          fontWeight: "bold",
                        }}
                      >
                        More details
                      </Typography>
                      <Typography style={{ wordBreak: "break-all" }}>
                        {isDetail ? (
                          <KeyboardArrowDownIcon />
                        ) : (
                          <KeyboardArrowRightIcon />
                        )}
                      </Typography>
                    </Box>
                  </Box>
                </div>
                <div className="title-picture">
                  <DialogTitle
                    style={{ cursor: "move" }}
                    id="draggable-dialog-title"
                  >
                    {location === "car" ? (
                      <Typography
                        variant="h5"
                        sx={{ textTransform: "capitalize" }}
                      >
                        {data.vehicleType}: {data.manufacturer} {data.model}{" "}
                        {data.version}
                      </Typography>
                    ) : (
                      <Typography
                        variant="h5"
                        sx={{ textTransform: "capitalize" }}
                      >
                        {data.name}
                      </Typography>
                    )}
                  </DialogTitle>
                  <Box className="pictureHolder">
                    {location !== "center" &&
                      (data.vehicleType === "car" ? (
                        <img
                          src="/src/assets/images/CarDialog/carImage.jpg"
                          alt=""
                          className="info-image"
                        />
                      ) : data.vehicleType === "truck" ? (
                        <img
                          src="/src/assets/images/CarDialog/truckImage.jpg"
                          alt=""
                          className="info-image"
                        />
                      ) : (
                        <img
                          src="/src/assets/images/CarDialog/busImage.jpg"
                          alt=""
                          className="info-image"
                        />
                      ))}
                  </Box>
                </div>
              </Box>
            )}
            {isDetail && (
              <Box className={`Info ${isDetail ? "open" : ""}`}>
                <Typography
                  sx={{ fontWeight: "bold", marginBottom: "20px" }}
                  variant="h5"
                >
                  Detail Info
                </Typography>
                {Object.entries(data).map(([key, value]: [string, unknown]) => {
                  if (typeof value === "string") {
                    value = value.replace("_", " ");
                  }
                  // filter out unneccessary fields
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

                  // format date
                  if (
                    key === "registrationDate" ||
                    key === "registrationExpirationDate"
                  ) {
                    const date = new Date(value as string);
                    const formattedDate = moment(date).format("DD/MM/YYYY");
                    value = formattedDate;
                  }

                  // format number (add measurement unit)
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
                    <Box
                      className="item"
                      key={key}
                      sx={{ textTransform: "capitalize" }}
                    >
                      <Box className="left primary-font">
                        <Typography
                          style={{
                            wordBreak: "break-all",
                            fontWeight: "bold",
                          }}
                        >
                          {key.replace(/([a-z])([A-Z])/g, "$1 $2")}
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
            )}
          </Box>
        )}
      </Dialog>
    </React.Fragment>
  );
}
