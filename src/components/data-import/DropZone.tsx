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
  // Button,
  Dialog,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Slide,
  Typography,
} from "@mui/material";
import Button from "../button/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { fileImportHooks } from "../../redux/hooks/fileImportHooks";
import { TransitionProps } from "@mui/material/transitions";
import { PaperProps } from "@mui/material/Paper";
import Draggable from "react-draggable";

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

export default function DropZone(props: any) {
  const { uploadFile } = fileImportHooks();
  const [myFiles, setMyFiles] = useState<FileWithPath[]>([]);
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

  const onDrop = useCallback(
    (
      acceptedFiles: FileWithPath[],
      fileRejections: FileRejection[],
      event: DropEvent
    ) => {
      // Filter out already existing files
      const newFiles = acceptedFiles.filter(
        (file) =>
          !myFiles.some((existingFile) => existingFile.path === file.path)
      );

      // Add new files to the myFiles array
      setMyFiles([...myFiles, ...newFiles]);
      console.log(myFiles);
    },
    [myFiles]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
  });

  const removeFile = (file: FileWithPath) => {
    const newFiles: FileWithPath[] = [...myFiles];
    newFiles.splice(newFiles.indexOf(file), 1);
    setMyFiles(newFiles);
  };

  const removeAll = () => {
    setMyFiles([]);
  };

  const files = myFiles.map((file: FileWithPath) => (
    <ListItem key={file.path}>
      <ListItemIcon>
        <InsertDriveFileIcon />
      </ListItemIcon>
      <ListItemText primary={`${file.path} - ${file.size} bytes`} />
      <Button
        content="Remove File"
        onClick={() => removeFile(file)}
        style={{ marginLeft: "10px" }}
      />
    </ListItem>
  ));

  function onCloseButtonClick() {
    setOpen(false);
    removeAll();
  }

  function onUploadButtonClick() {
    const formData = new FormData();
    myFiles.forEach((fileWithPath) => {
      formData.append("file", fileWithPath);
    });
    uploadFile(formData);
    setOpen(false);
    removeAll();
  }
  return (
    <React.Fragment>
      {/* <button id="importButton" onClick={handleClickOpen} className=" text-base text-gray-700 text-sm">
        IMPORT DATA
      </button> */}
      <Button
        content="IMPORT DATA"
        onClick={handleClickOpen}
        className="text-base text-gray-700 text-sm"
      />
      <Dialog
        PaperComponent={PaperComponent}
        TransitionComponent={Transition}
        fullScreen={false}
        maxWidth={false}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        style={{}}
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          <Typography
            sx={{ mt: 4, mb: 2 }}
            variant="h6"
            component="div"
            style={{ margin: "10px" }}
          >
            IMPORT FILE
          </Typography>
        </DialogTitle>
        <Box className="dropZoneContainer">
          <Box>
            <Box {...getRootProps()} className="dropZone">
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </Box>
            <Typography
              sx={{ mt: 4, mb: 2 }}
              variant="h6"
              component="div"
              style={{ marginBottom: "0px" }}
            >
              Files
            </Typography>
            <Paper
              elevation={3}
              className="filesContainer"
              style={{ minHeight: "50px" }}
            >
              <List dense={true}>{files}</List>
            </Paper>
            {files.length > 0 && (
              <Button
                content="Remove all"
                onClick={removeAll}
                style={{ marginTop: "10px" }}
              />
            )}
          </Box>
          <Box display="flex" justifyContent="flex-end">
            <Button
              content="Cancel"
              onClick={onCloseButtonClick}
              style={{
                marginTop: "10px",
                backgroundColor: "#62b7d3",
              }}
            />
            <Button
              content="Upload"
              onClick={onUploadButtonClick}
              style={{
                marginLeft: "10px",
                marginTop: "10px",
                backgroundColor: "#62b7d3",
              }}
            />
          </Box>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
