import * as React from "react";
import {
  AppBar,
  Box,
  Button,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Toolbar,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import BasicPopover from "./popover";
import { useContext } from "react";
import { UserContext } from "../contexts/current-user-conext";

export const Header = ({
  onAdd,
  handleChangeTheme,
  theme,
  handleClickPost,
}) => {
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();
  const currentUser = useContext(UserContext);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setImageUrl(null);
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
    <>
      <Box sx={{ flexGrow: 2 }}>
        <AppBar position="fixed">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton
              sx={{ ml: 1, mr: 1 }}
              onClick={handleClickPost}
              color="inherit"
              size="large"
              disableRipple
            >
              Posts
            </IconButton>
            <Box sx={{ display: "flex" }}>
              <IconButton
                sx={{ ml: 1, mr: 1 }}
                onClick={handleOpen}
                color="inherit"
                disableRipple
              >
                <PostAddIcon />
              </IconButton>
              <IconButton
                sx={{ mr: 1 }}
                onClick={handleChangeTheme}
                color="inherit"
                disableRipple
              >
                {theme.palette.mode === "dark" ? (
                  <Brightness7Icon />
                ) : (
                  <Brightness4Icon />
                )}
              </IconButton>
              <BasicPopover>
                {currentUser?.name}
                <br />
                {currentUser?.about}
                <br />
                {currentUser?.group}
                <br />
                {currentUser?.email}
              </BasicPopover>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
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
              onBlur={() => setImageUrl(getValues("image"))}
              fullWidth
              error={!!errors.image}
              helperText={errors?.image ? errors.image.message : null}
            />
            {imageUrl && (
              <CardMedia
                component="img"
                image={imageUrl}
                alt={getValues("image")}
              />
            )}
            <TextField
              {...register("title", {
                required: true,
                minLength: 2,
              })}
              margin="dense"
              id="title"
              label="Post title"
              type="text"
              fullWidth
            />
            <TextField
              {...register("text", {
                required: true,
                minLength: 2,
              })}
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
    </>
  );
};
