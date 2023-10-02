import AddBoxIcon from "@mui/icons-material/AddBox";
import { Button, Grid } from "@mui/material";

import React, { useContext } from "react";
import { AppContext } from "../context/context";

function AddBar() {
  const { setShowModal, setCurrentTodo } = useContext(AppContext);

  return (
    <Grid sx={{ marginTop: 1 }} container justifyContent="flex-end">
      <Button
        component="label"
        color="secondary"
        variant="contained"
        startIcon={<AddBoxIcon />}
        onClick={() => {
          setShowModal(true);
          setCurrentTodo(null);
        }}
      >
        Add TO-DO
      </Button>
    </Grid>
  );
}

export default AddBar;
