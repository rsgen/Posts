import { ExpandMore as ExpandMoreIcon, Favorite as FavoriteIcon, MoreVert as MoreVertIcon, WidthFull } from '@mui/icons-material'
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ru';
import { isLiked } from '../../utils/posts';
import { Delete as DeleteIcon } from '@mui/icons-material';

dayjs.locale('ru');
dayjs.extend(relativeTime)

export const Post = ({
    image,
    title,
    text,
    created_at,
    author,
    likes,
    _id,
    onPostLike,
    onDelete,
    currentUser
}) => {
    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const like = isLiked(likes, currentUser?._id)
    const canDelete = currentUser?._id === author._id
    const shortName = author.name.split(" ", 2)

    function handleClickButtonLike() {
        onPostLike({ likes, _id })
    }

    function handleClickDelete() {
        onDelete({ _id })
    }

    return (
        <Grid2 item sx={{ display: 'flex' }} xs={12} sm={6} md={4} lg={3} >
            <Card sx={{
                display: 'flex',
                flexDirection: 'column',
                width: "100%"
            }}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" src={author.avatar}>
                        </Avatar>
                    }
                    action={canDelete &&
                        (<IconButton aria-label="settings" onClick={handleClickDelete} >
                            <DeleteIcon />
                        </IconButton>)
                    }
                    title={shortName.join(" ")}
                    subheader={dayjs(created_at).fromNow()}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={image}
                    alt={title}
                />
                <CardContent>
                    <Typography variant='h5' component="h3" gutterBottom>{title}</Typography>
                    <Typography variant="body2" color="text.secondary" component="p" noWrap>
                        {text}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing sx={{ marginTop: 'auto' }}>
                    <IconButton aria-label="add to favorites" onClick={handleClickButtonLike}>
                        <FavoriteIcon sx={{ color: like ? "red" : "white" }} />
                    </IconButton>
                    <Typography sx={{ marginLeft: "6px" }}>
                        {likes.length}
                    </Typography>
                    <IconButton
                        sx={{
                            transform: !expanded ? 'rotate(0deg)' : 'rotate(180deg)',
                            marginLeft: 'auto',
                        }}
                        onClick={handleExpandClick}
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>
                            {text}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </Grid2 >
    )
}