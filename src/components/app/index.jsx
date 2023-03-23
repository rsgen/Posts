import { Delete as DeleteIcon, RestoreFromTrash as RestoreFromTrashIcon } from '@mui/icons-material';
import { Container } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline';
import { Header } from '../header';
import { Footer } from '../footer';
import { PostList } from '../post-list';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { MyPagination } from '../pagination';
import api from '../../utils/api';
import { useState, useEffect } from 'react';
import { isLiked } from '../../utils/posts';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export const App = () => {
    const [posts, setPosts] = useState([]);
    const [currentUser, setCurrentUser] = useState(null)

    function handleUpdateUser(dataUserUpdate) {
        api.setUserInfo(dataUserUpdate)
            .then((dataServer) => {
                setCurrentUser(dataServer)
            })
    }

    function handlePostLike(post) {
        const like = isLiked(post.likes, currentUser._id)
        api.changeLikePostStatus(post._id, like)
            .then((updatePost) => {
                const newPosts = posts.map(post => {
                    return post._id === updatePost._id ? updatePost : post;
                })
                setPosts(newPosts)
            })
    }

    function handlePostDelete(post) {
        api.deletePost(post._id)
            .then((updatePost) => {
                const newPosts = posts.filter(post => {
                    return post._id !== updatePost._id;
                })
                setPosts(newPosts)

            })
    }

    useEffect(() => {
        api.getAllInfo()
            .then(([postsData, userInfoData]) => {
                setCurrentUser(userInfoData);
                setPosts(postsData);
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <Container>
                    <Header user={currentUser} />
                    <PostList list={posts}
                        onPostLike={handlePostLike}
                        currentUser={currentUser}
                        onDelete={handlePostDelete}
                    />
                    <MyPagination />
                </Container>
                <Footer />
            </ThemeProvider>
        </>
    )

}