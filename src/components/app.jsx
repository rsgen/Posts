import { Container } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { Header } from "./header";
import { Footer } from "./footer";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import api from "../utils/api";
import { useState, useEffect } from "react";
import { isLiked } from "../utils/posts";
import { MainPage } from "../pages/mainpage";
import { PostPage } from "../pages/postpage";
import { Route, Routes, useNavigate } from "react-router-dom";
import { NotFoundPage } from "../pages/notfoundpage";
import { UserContext } from "../contexts/current-user-conext";

export const App = () => {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [page, setPage] = useState(1);
  const [pageQty, setPageQty] = useState(0);
  const [postsQty, setPostsQty] = useState(0);
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(true);
  const [theme, setTheme] = useState(
    createTheme({
      palette: {
        mode: "dark",
      },
    })
  );

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
    api.deletePost(post._id).then(() => {
      navigate("/");
      setRefresh((refresh) => !refresh);
    });
  }

  function handlePostEdit(newData) {
    api.editPost(newData).then(() => {
      navigate("/");
      setRefresh((refresh) => !refresh);
    });
  }

  function handlePostAdd(data) {
    api
      .addPost(data)
      .then(() =>
        page === 1 ? setRefresh((refresh) => !refresh) : setPage(1)
      );
  }

  function handleChangeTheme() {
    let newTheme = {};
    if (theme.palette.mode === "dark") {
      newTheme = createTheme({
        palette: {
          mode: "light",
        },
      });
      setTheme(newTheme);
    } else {
      newTheme = createTheme({
        palette: {
          mode: "dark",
        },
      });
      setTheme(newTheme);
    }
  }

  function handleClickPost() {
    navigate("/");
    page === 1 ? setRefresh((refresh) => !refresh) : setPage(1);
  }

  useEffect(() => {
    api
      .getPaginateInfo(page)
      .then(([postsData, userInfoData]) => {
        setCurrentUser(userInfoData);
        setPosts(postsData.posts);
        setPageQty(Math.ceil(postsData.total / 12));
        setPostsQty(postsData.total);
      })
      .catch((err) => console.log(err));
  }, [page, refresh]);

  return (
    <UserContext.Provider value={currentUser}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <Header
            onAdd={handlePostAdd}
            handleChangeTheme={handleChangeTheme}
            theme={theme}
            handleClickPost={handleClickPost}
          />
          <Routes>
            <Route
              path="/"
              element={
                <MainPage
                  posts={posts}
                  handlePostLike={handlePostLike}
                  handlePostDelete={handlePostDelete}
                  handlePostEdit={handlePostEdit}
                  page={page}
                  pageQty={pageQty}
                  postsQty={postsQty}
                  setPage={setPage}
                  navigate={navigate}
                />
              }
            />
            <Route
              path="/postpage/:postID"
              element={
                <PostPage
                  handlePostDelete={handlePostDelete}
                  handlePostEdit={handlePostEdit}
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
