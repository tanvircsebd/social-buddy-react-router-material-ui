import React, { useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { PostContext } from '../../App';
import { Link } from 'react-router-dom';


const useStyles = makeStyles({
    root: {
        maxWidth: 1050,
    },
    media: {
        height: 140,
    },
});

const Posts = () => {
    const classes = useStyles();
    const [posts, setPosts] = useContext(PostContext)
    useEffect(() => {
        const url = 'https://jsonplaceholder.typicode.com/posts';
        fetch(url)
            .then(res => res.json())
            .then(data => setPosts(data))
    }, [])
    const Post = posts.map(post => {
        const { id, title, body } = post;
        return (
            <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {body}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Link style={{ textDecoration: 'none' }} to={`/post/${id}`}>
                            <Button variant="contained" color="primary" href="#contained-buttons">
                                See More..
                            </Button>   
                        </Link>
                    </CardActions>
                </Card>
            </div>
        )
    })
    return (
        <div style={{ width: '50%', margin: 'auto' }}>
            {Post}
        </div>
    );
};

export default Posts;