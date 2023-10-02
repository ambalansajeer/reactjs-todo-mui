import { Button, Popover, Typography } from "@mui/material";
import React from "react";

function AppPopover(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Typography
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      >
        {props.data}
      </Typography>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ fontSize: { xs: 12, sm: 16, md: 25, lg: 30 }, p: 1 }}>
          {props.data}
        </Typography>
      </Popover>
    </div>
  );
}

export default AppPopover;
