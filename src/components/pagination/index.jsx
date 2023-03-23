import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export const MyPagination = () => {
    return (
        <Stack spacing={1} sx={{ marginTop: 5, marginLeft: 46}}>
            <Pagination count={10} size="large" />
        </Stack>
    );
}