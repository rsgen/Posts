import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { UserContext } from "../contexts/current-user-conext";
import { useContext } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const Header = ({ onAdd }) => {
  const currentUser = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = (data) => {
    data.tags = data.tags.split(",");
    if (data.tags[0] === "") data.tags = [];
    for (let i = 0; i < data.tags.length; i++) {
      data.tags[i] = data.tags[i].trim();
    }
    onAdd(data);
    handleClose();
    reset();
  };

  return (
    <Box sx={{ flexGrow: 2 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h4"
            color="white"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Posts
          </Typography>
          <Button
            sx={{ marginRight: "20px" }}
            size="small"
            color="inherit"
            variant="outlined"
            onClick={handleOpen}
          >
            Create Post
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <DialogTitle id="form-dialog-title">New Post</DialogTitle>
              <DialogContent>
                <Box mb={1}>
                  <DialogContentText>Create your post</DialogContentText>
                </Box>
                <Box mb={2}>
                  <TextField
                    autoFocus
                    autoComplete="image"
                    {...register("image", {
                      required: true,
                      pattern: {
                        value:
                          /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
                      },
                    })}
                    margin="dense"
                    id="url"
                    label="Image Url"
                    type="text"
                    fullWidth
                    error={!!errors.image}
                    helperText={errors?.image ? errors.image.message : null}
                  />
                </Box>
                <TextField
                  {...register("title", { required: true })}
                  margin="dense"
                  id="title"
                  label="Post title"
                  type="text"
                  fullWidth
                />
                <TextField
                  {...register("text", { required: true })}
                  margin="dense"
                  id="text"
                  label="Post text"
                  type="text"
                  fullWidth
                />
                <TextField
                  {...register("tags")}
                  margin="dense"
                  id="tags"
                  label="Tags, plese enter separated by commas"
                  type="text"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Submit</Button>
              </DialogActions>
            </form>
          </Dialog>
          <Typography variant="h7">
            {currentUser?.name}
            <br />
            {currentUser?.email}
          </Typography>
          <IconButton size="large" color="inherit">
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
