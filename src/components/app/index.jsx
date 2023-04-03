import { Container } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { Header } from "../header";
import { Footer } from "../footer";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import api from "../../utils/api";
import { useState, useEffect } from "react";
import { isLiked } from "../../utils/posts";
import { MainPage } from "../../pages/main-page";
import { PostPage } from "../../pages/post-page";
import { Route, Routes, useNavigate } from "react-router-dom";
import { NotFoundPage } from "../../pages/not-found-page";
import { UserContext } from "../../contexts/current-user-conext";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const App = () => {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [page, setPage] = useState(1);
  const [pageQty, setPageQty] = useState(0);
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(true);

  function handleUpdateUser(dataUserUpdate) {
    api.setUserInfo(dataUserUpdate).then((dataServer) => {
      setCurrentUser(dataServer);
    });
  }

  function handlePostLike(post) {
    const like = isLiked(post.likes, currentUser._id);
    api.changeLikePostStatus(post._id, like).then((updatePost) => {
      const newPosts = posts.map((post) =>
        post._id === updatePost._id ? updatePost : post
      );
      setPosts(newPosts);
    });
  }

  function handlePostDelete(post) {
    api.deletePost(post._id).then((updatePost) => {
      navigate(-1);
      setRefresh((refresh) => !refresh);
    });
  }

  useEffect(() => {
    api
      .getPaginateInfo(page)
      .then(([postsData, userInfoData]) => {
        setCurrentUser(userInfoData);
        setPosts(postsData.posts);
        setPageQty(Math.ceil(postsData.total / 12));
      })
      .catch((err) => console.log(err));
  }, [page, refresh]);

  return (
    <UserContext.Provider value={currentUser}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <MainPage
                  posts={posts}
                  handlePostLike={handlePostLike}
                  handlePostDelete={handlePostDelete}
                  page={page}
                  pageQty={pageQty}
                  setPage={setPage}
                  navigate={navigate}
                />
              }
            />
            <Route
              path="/postpage/:postID"
              element={
                <PostPage
                  handlePostLike={handlePostLike}
                  handlePostDelete={handlePostDelete}
                  navigate={navigate}
                  setRefresh={setRefresh}
                />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Container>
        <Footer />
      </ThemeProvider>
    </UserContext.Provider>
  );
};
