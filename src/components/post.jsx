import {
  ExpandMore as ExpandMoreIcon,
  Favorite as FavoriteIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useContext, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ru";
import { isLiked } from "../utils/posts";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/current-user-conext";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
// import { useContext } from "react";
// import { useState } from "react";
import { useForm } from "react-hook-form";

dayjs.locale("ru");
dayjs.extend(relativeTime);

export const Post = ({
  image,
  title,
  text,
  tags,
  created_at,
  author,
  likes,
  _id,
  onPostLike,
  onDelete,
  heightImg,
  onEdit,
}) => {
  const currentUser = useContext(UserContext);
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const like = isLiked(likes, currentUser?._id);
  const canDelete = currentUser?._id === author?._id;
  const shortName = author?.name.split(" ", 2);

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
    onEdit({ _id, ...data });
    handleClose();
    reset();
  };

  function handleClickButtonLike() {
    onPostLike({ likes, _id });
  }

  function handleClickDelete() {
    onDelete({ _id });
  }

  return (
    <>
      <Grid2 item sx={{ display: "flex" }} xs={12} sm={6} md={4} lg={3}>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <CardHeader
            avatar={<Avatar aria-label="recipe" src={author?.avatar}></Avatar>}
            action={
              canDelete && (
                <>
                  <IconButton onClick={handleOpen}>
                    <EditIcon sx={{ color: "lightgray" }} />
                  </IconButton>
                  <IconButton aria-label="settings" onClick={handleClickDelete}>
                    <DeleteIcon sx={{ color: "lightgray" }} />
                  </IconButton>
                </>
              )
            }
            title={shortName?.join(" ")}
            subheader={currentUser?.about}
          />
          <Link to={`/postpage/${_id}`} style={{ textDecoration: "none" }}>
            <CardMedia
              component="img"
              image={image}
              alt={title}
              sx={{ height: heightImg }}
            />
            <CardContent>
              <Typography
                variant="h5"
                color="text.primary"
                component="h3"
                gutterBottom
              >
                {title}
              </Typography>
              <Typography
                variant="body2"
                color="text.primary"
                component="p"
                noWrap
              >
                {text}
              </Typography>
              <Toolbar />
              <Typography
                variant="body2"
                color="text.secondary"
                component="p"
                noWrap
              >
                {tags?.join(" ")}
              </Typography>
            </CardContent>
          </Link>
          <CardActions disableSpacing sx={{ marginTop: "auto" }}>
            <IconButton
              aria-label="add to favorites"
              onClick={handleClickButtonLike}
            >
              <FavoriteIcon sx={{ color: like ? "red" : "lightgray" }} />
            </IconButton>
            <Typography sx={{ marginLeft: "6px" }}>{likes?.length}</Typography>
            <Typography
              variant="body2"
              color="text.primary"
              component="p"
              sx={{ marginLeft: "60px" }}
            >
              {dayjs(created_at).fromNow()}
            </Typography>
            <IconButton
              sx={{
                transform: !expanded ? "rotate(0deg)" : "rotate(180deg)",
                marginLeft: "auto",
              }}
              onClick={handleExpandClick}
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>{text}</Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Grid2>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id="form-dialog-title">Edit Post</DialogTitle>
          <DialogContent>
            <Box mb={1}>
              <DialogContentText>You can change your post</DialogContentText>
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
    </>
  );
};
