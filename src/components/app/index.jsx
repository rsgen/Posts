import { Delete as DeleteIcon, RestoreFromTrash as RestoreFromTrashIcon } from '@mui/icons-material';
import { Container } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { postData } from '../../postData';
import { Header } from '../header';
import { Footer } from '../footer';
import { PostList } from '../post-list';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { MyPagination } from '../pagination';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});


export const App = () => {
    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <Container>
                    <Header />
                    <PostList posts={postData} />
                    <MyPagination />
                </Container>
                <Footer />
            </ThemeProvider>
        </>
    )

}