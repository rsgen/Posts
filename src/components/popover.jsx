import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function BasicPopover({ children }) {
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
      <IconButton
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        color="inherit"
        disableRipple
      >
        <AccountCircleIcon />
      </IconButton>
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
        <Typography sx={{ p: 2 }}>{children}</Typography>
      </Popover>
    </div>
  );
}
