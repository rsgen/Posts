import {
  ExpandMore as ExpandMoreIcon,
  Favorite as FavoriteIcon,
  Delete as DeleteIcon,
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
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useContext, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ru";
import { isLiked } from "../utils/posts";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/current-user-conext";
import EditIcon from "@mui/icons-material/Edit";
import CommentIcon from "@mui/icons-material/Comment";
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
  comments,
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
  const [imageUrl, setImageUrl] = useState(image);

  const like = isLiked(likes, currentUser?._id);
  const canDelete = currentUser?._id === author?._id;
  const shortName = author?.name.split(" ", 2);

  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
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
                  <IconButton onClick={handleOpen} disableRipple>
                    <EditIcon sx={{ color: "darkgray" }} />
                  </IconButton>
                  <IconButton
                    aria-label="settings"
                    onClick={handleClickDelete}
                    disableRipple
                  >
                    <DeleteIcon sx={{ color: "darkgray" }} />
                  </IconButton>
                </>
              )
            }
            title={shortName?.join(" ")}
            subheader={author?.about}
          />
          <Link to={`/postpage/${_id}`} style={{ textDecoration: "none" }}>
            <Box
              mb={1}
              mr={1}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
              }}
            >
              <Typography variant="body2" color="text.primary" component="p">
                {dayjs(created_at).fromNow()}
              </Typography>
            </Box>
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
              {heightImg === 194 && (
                <Typography
                  variant="body2"
                  color="text.primary"
                  component="p"
                  noWrap
                >
                  {text}
                </Typography>
              )}
              {heightImg === "auto" && (
                <Typography variant="body2" color="text.primary" component="p">
                  {text}
                </Typography>
              )}
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
          <CardActions
            disableSpacing
            sx={{
              marginTop: "auto",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                aria-label="add to favorites"
                onClick={handleClickButtonLike}
                disableRipple
              >
                <FavoriteIcon sx={{ color: like ? "red" : "darkgray" }} />
              </IconButton>
              <Typography ml={"5px"}>{likes?.length}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {!!comments?.length && (
                <>
                  <CommentIcon />
                  <IconButton
                    sx={{
                      transform: !expanded ? "rotate(0deg)" : "rotate(180deg)",
                    }}
                    onClick={handleExpandClick}
                    disableRipple
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </>
              )}
            </Box>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              {comments?.map((item) => (
                <p key={item._id}>
                  {item.author.name}: {item.text}
                </p>
              ))}
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
              defaultValue={image}
              fullWidth
              error={!!errors.image}
              helperText={errors?.image ? errors.image.message : null}
            />
            {imageUrl && (
              <CardMedia component="img" image={imageUrl} alt={title} />
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
              defaultValue={title}
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
              defaultValue={text}
              fullWidth
            />
            <TextField
              {...register("tags")}
              margin="dense"
              id="tags"
              label="Tags, plese enter separated by commas"
              type="text"
              defaultValue={tags?.join(", ")}
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
