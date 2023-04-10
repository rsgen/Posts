import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import { Post } from "./post";

export const PostList = ({ list, onPostLike, onDelete, onEdit }) => {
  return (
    <Grid2 container spacing={4} sx={{ marginTop: 8 }}>
      {list.map((item) => (
        <Post
          key={item._id}
          {...item}
          onPostLike={onPostLike}
          onDelete={onDelete}
          onEdit={onEdit}
          heightImg={194}
        />
      ))}
    </Grid2>
  );
};
