import { Button, Container, Toolbar } from "@mui/material";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post } from "../components/post";
import { UserContext } from "../contexts/current-user-conext";
import api from "../utils/api";
import { isLiked } from "../utils/posts";

import { NotFoundPage } from "./notfoundpage";

export const PostPage = ({
  handlePostDelete,
  handlePostEdit,
  navigate,
  setRefresh,
}) => {
  const currentUser = useContext(UserContext);
  const [post, setPost] = useState();
  const { postID } = useParams();
  const [errorState, setErrorState] = useState(null);

  function handlePostLike(post) {
    const like = isLiked(post.likes, currentUser._id);
    api.changeLikePostStatus(post._id, like).then((updatePost) => {
      setPost(updatePost);
    });
  }

  useEffect(() => {
    api
      .getPostById(postID)
      .then((postData) => {
        setPost(postData);
      })
      .catch((err) => {
        setErrorState(err);
      });
  }, [postID]);

  return (
    <>
      <Toolbar />
      <Toolbar />
      <Container>
        <Button
          onClick={() => {
            navigate("/");
            setRefresh((refresh) => !refresh);
          }}
          variant="outlined"
          size="small"
          color="inherit"
          sx={{ marginBottom: 2 }}
        >
          Back
        </Button>
        {!errorState && (
          <Post
            {...post}
            onPostLike={handlePostLike}
            onDelete={handlePostDelete}
            onEdit={handlePostEdit}
            heightImg={"auto"}
          />
        )}
        {errorState && <NotFoundPage />}
      </Container>
    </>
  );
};
