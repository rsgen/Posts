import { Pagination, Stack } from "@mui/material";
import { PostList } from "../components/postlist";

export const MainPage = ({
  posts,
  handlePostLike,
  handlePostDelete,
  handlePostEdit,
  page,
  pageQty,
  setPage,
}) => {
  return (
    <>
      <PostList
        list={posts}
        onPostLike={handlePostLike}
        onDelete={handlePostDelete}
        onEdit={handlePostEdit}
      />
      <Stack spacing={2}>
        {!!pageQty && (
          <Pagination
            count={pageQty}
            page={page}
            onChange={(_, num) => {
              window.scroll({
                top: 0,
                left: 0,
                behavior: "instant",
              });
              setPage(num);
            }}
            showFirstButton
            showLastButton
            sx={{ marginY: 7, marginX: "auto" }}
          />
        )}
      </Stack>
    </>
  );
};
