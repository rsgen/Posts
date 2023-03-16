import { Toolbar } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export const MyPagination = () => {
    return (
        <Stack spacing={4}>
            <Toolbar />
            <Pagination count={10} size="large" />
        </Stack>
    );
}