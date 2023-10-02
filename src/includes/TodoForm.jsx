import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AppContext } from "../context/context";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { postTodoApi } from "./ApiFunctions";
import { useEffect } from "react";
import dayjs from "dayjs";

export default function TodoForm() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const {
    showModal,
    setShowModal,
    currentTodo,
    setAction,
    setAlert,
    setCurrentTodo,
  } = React.useContext(AppContext);

  const handleClose = () => {
    setShowModal(false);

    setDescription("");
    setTitle("");
    setDueDate(dayjs(Date()));
  };

  useEffect(() => {
    console.log("currentTodo", currentTodo);
    if (currentTodo) {
      setDescription(currentTodo.description);
      setTitle(currentTodo.title);
      setDueDate(dayjs(currentTodo.dueDate));
    } else {
      setDescription("");
      setTitle("");
      setDueDate(dayjs(Date()));
    }
    return () => {
      setDescription("");
      setTitle("");
      setDueDate(dayjs(Date()));
    };
  }, [currentTodo]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [dueDateError, setDueDateError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setTitleError(false);
    setDescriptionError(false);
    setDueDateError(false);

    if (title === "") {
      setTitleError(true);
    }
    if (description === "") {
      setDescriptionError(true);
    }
    if (dueDateError === "") {
      setDueDateError(true);
    }
    console.log(title, description, dueDate);
    if (title && description && dueDate) {
      let id = currentTodo?.id;

      const response = await postTodoApi("add/" + (id ?? ""), {
        title,
        description,
        due_date: dueDate,
      });
      setAction("initial");
      setAlert(response);
      setCurrentTodo(null);
      handleClose();
    }
    return;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <Dialog open={showModal} onClose={handleClose}>
          <DialogTitle>TO-DO ADD</DialogTitle>
          <DialogContent>
            <form autoComplete="off" onSubmit={handleSubmit}>
              <Grid container spacing={2} marginTop={1}>
                <Grid item xs={12} md={6}>
                  <TextField
                    size="small"
                    label="Title"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    sx={{ mb: 3 }}
                    fullWidth
                    value={title}
                    error={titleError}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DatePicker
                    value={dueDate ?? dayjs(new Date())}
                    slotProps={{
                      textField: { size: "small", fullWidth: true },
                    }}
                    label="Due Date"
                    onChange={(newValue) => setDueDate(newValue)}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    multiline
                    rows={3}
                    size="small"
                    label="Description"
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    value={description}
                    error={descriptionError}
                    fullWidth
                    sx={{ mb: 3 }}
                  />
                </Grid>
              </Grid>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>
              {currentTodo ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </LocalizationProvider>
  );
}
