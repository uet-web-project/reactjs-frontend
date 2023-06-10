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
  Checkbox,
  Dialog,
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { TransitionProps } from "@mui/material/transitions";
import { PaperProps } from "@mui/material/Paper";
import Draggable from "react-draggable";
import DialogTitle from "@mui/material/DialogTitle";

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

export default function FilterDialog(props: any) {
  const itemsToRemove = ["_id", "vin", "__v", "id", "index"];
  const data = props.data.filter((item: any) => !itemsToRemove.includes(item));
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const [search, setSearch] = React.useState<Record<string, string[]>>({});

  useEffect(() => {
    console.log(search);
  }, [search]);
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

  function handleFiltersChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const value = e.target.value;
    setSearch((prevState) => ({
      ...prevState,
      [e.target.name]: [value],
    }));
  }

  function handleSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const checked = e.target.checked;
    if (checked) {
      setSearch((prevState) => ({
        ...prevState,
        [e.target.name]: [...(prevState[e.target.name] || []), e.target.id],
      }));
    } else {
      setSearch((prevState) => {
        const updatedState = { ...prevState };
        const values = updatedState[e.target.name] || [];
        const index = values.indexOf(e.target.id);
        if (index !== -1) {
          values.splice(index, 1);
          if (values.length === 0) {
            delete updatedState[e.target.name];
          } else {
            updatedState[e.target.name] = values;
          }
        }
        return updatedState;
      });
    }
  }

  function onFilterButtonClick() {
    props.onFilter(search);
    setSearch({});
    setOpen(false);
  }
  return (
    <React.Fragment>
      <button id="filterByColumns" onClick={handleClickOpen}>
        Filter
      </button>
      <Dialog
        PaperComponent={PaperComponent}
        TransitionComponent={Transition}
        fullScreen={false}
        fullWidth={true}
        maxWidth={"md"}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        style={{}}
      >
        {open && (
          <div className="row">
            <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
              <Typography variant="h4">Filter</Typography>
            </DialogTitle>
            <div className="column">
              <div className="filterTextField">
                <TextField
                  variant="standard"
                  label="License Plate"
                  type="text"
                  name="licensePlate"
                  onChange={handleFiltersChange}
                  onKeyDown={(event) => event.stopPropagation()}
                />
              </div>
              <div className="filterTextField">
                <TextField
                  variant="standard"
                  label="Manufacturer"
                  type="text"
                  name="manufacturer"
                  onChange={handleFiltersChange}
                  onKeyDown={(event) => event.stopPropagation()}
                />
              </div>
              <div className="filterTextField">
                <TextField
                  variant="standard"
                  label="Registration Location"
                  type="text"
                  name="registrationLocation"
                  onChange={handleFiltersChange}
                  onKeyDown={(event) => event.stopPropagation()}
                />
              </div>
            </div>
            <div className="column">
              <div className="filterTextField">
                <TextField
                  variant="standard"
                  label="Registration Number"
                  type="text"
                  name="registrationNumber"
                  onChange={handleFiltersChange}
                  onKeyDown={(event) => event.stopPropagation()}
                />
              </div>
              <div className="filterTextField">
                <TextField
                  variant="standard"
                  label="Registration Date"
                  type="text"
                  name="registrationDate"
                  onChange={handleFiltersChange}
                  onKeyDown={(event) => event.stopPropagation()}
                />
              </div>
              <div className="filterTextField">
                <TextField
                  variant="standard"
                  label="Registration Expiration Date"
                  type="text"
                  name="registrationExpirationDate"
                  onChange={handleFiltersChange}
                  onKeyDown={(event) => event.stopPropagation()}
                />
              </div>
            </div>
            <div className="column">
              <div className="filterTextField">
                <TextField
                  variant="standard"
                  label="Model"
                  type="text"
                  name="model"
                  onChange={handleFiltersChange}
                  onKeyDown={(event) => event.stopPropagation()}
                />
              </div>
              <div className="filterTextField">
                <TextField
                  variant="standard"
                  label="Version"
                  type="text"
                  name="version"
                  onChange={handleFiltersChange}
                  onKeyDown={(event) => event.stopPropagation()}
                />
              </div>
              <div className="filterTextField">
                <TextField
                  variant="standard"
                  label="Vehicle Owner Cid"
                  type="text"
                  name="vehicleOwnerCid"
                  onChange={handleFiltersChange}
                  onKeyDown={(event) => event.stopPropagation()}
                />
              </div>
            </div>
            <div className="column">
              <div className="filterTextField">
                <FormControlLabel
                  control={
                    <Checkbox
                      name="purpose"
                      onChange={handleSelect}
                      id="personal_transportation"
                    />
                  }
                  label="Personal Transportation"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                    className="checkBoxContainer"
                      name="purpose"
                      onChange={handleSelect}
                      id="public_transportation"
                    />
                  }
                  label="Public Transportation"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="purpose"
                      onChange={handleSelect}
                      id="Delivery"
                    />
                  }
                  label="Delivery"
                />
              </div>
              <div className="filterTextField">
                <FormControlLabel
                  control={
                    <Checkbox
                      name="vehicleType"
                      onChange={handleSelect}
                      id="Car"
                    />
                  }
                  label="Car"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="vehicleType"
                      onChange={handleSelect}
                      id="Bus"
                    />
                  }
                  label="Bus"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="vehicleType"
                      onChange={handleSelect}
                      id="Truck"
                    />
                  }
                  label="Truck"
                />
              </div>
            </div>
            <div className="column">
              <div className="filterTextField1">
                <TextField
                  variant="standard"
                  label="Width (mm)"
                  type="text"
                  name="width"
                  onChange={handleFiltersChange}
                  onKeyDown={(event) => event.stopPropagation()}
                />
              </div>
              <div className="filterTextField1">
                <TextField
                  variant="standard"
                  label="Length (mm)"
                  type="text"
                  name="length"
                  onChange={handleFiltersChange}
                  onKeyDown={(event) => event.stopPropagation()}
                />
              </div>
              <div className="filterTextField1">
                <TextField
                  variant="standard"
                  label="Wheel Base (mm)"
                  type="text"
                  name="wheelBase"
                  onChange={handleFiltersChange}
                  onKeyDown={(event) => event.stopPropagation()}
                />
              </div>
              <div className="filterTextField1">
                <TextField
                  variant="standard"
                  label="Emission (kg CO2/km)"
                  type="text"
                  name="emission"
                  onChange={handleFiltersChange}
                  onKeyDown={(event) => event.stopPropagation()}
                />
              </div>
            </div>
            <div className="column">
              <div className="filterTextField1">
                <TextField
                  variant="standard"
                  label="Mileage (mm)"
                  type="text"
                  name="mileage"
                  onChange={handleFiltersChange}
                  onKeyDown={(event) => event.stopPropagation()}
                />
              </div>
              <div className="filterTextField1">
                <TextField
                  variant="standard"
                  label="Registration Center Id"
                  type="text"
                  name="registrationCenterId"
                  onChange={handleFiltersChange}
                  onKeyDown={(event) => event.stopPropagation()}
                />
              </div>
            </div>
            <Box display="flex" justifyContent="flex-end">
              <Button
                onClick={onCloseButtonClick}
                variant="contained"
                style={{
                  marginTop: "10px",
                  backgroundColor: "#62b7d3",
                }}
              >
                cancel
              </Button>
              <Button
                onClick={onFilterButtonClick}
                variant="contained"
                style={{
                  marginLeft: "10px",
                  marginTop: "10px",
                  backgroundColor: "#62b7d3",
                }}
              >
                Filter
              </Button>
            </Box>
          </div>
        )}
      </Dialog>
    </React.Fragment>
  );
}
