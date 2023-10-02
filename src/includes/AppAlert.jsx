import { Alert, Snackbar } from "@mui/material";
import React, { useContext } from "react";
import { AppContext } from "../context/context";

function AppAlert() {
  const { alert, setAlert } = useContext(AppContext);
  return (
    <div>
      {alert ? (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={alert?.status}
          autoHideDuration={4000}
          onClose={() => {
            setAlert(null);
          }}
        >
          <Alert
            onClose={() => {
              setAlert(null);
            }}
            severity={alert?.status ? "success" : "error"}
            sx={{ width: "100%" }}
          >
            {alert?.message}
          </Alert>
        </Snackbar>
      ) : (
        <></>
      )}
    </div>
  );
}

export default AppAlert;
