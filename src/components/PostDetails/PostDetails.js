import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Comments from '../Comments/Comments';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';


const useStyles = makeStyles({
    root: {
        maxWidth: 1050,
    },
    media: {
        height: 140,
    },
});




const PostDetails = () => {
    const { postId } = useParams();
    const [post, setPost] = useState({});
    const [comments,setComments] = useState([]);
    useEffect(() => {
        const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;
        fetch(url)
            .then(res => res.json())
            .then(posts => setPost(posts))
    }, []);
    useEffect(()=>{
        const url = `https://jsonplaceholder.typicode.com/comments?postId=${postId}`;
        fetch(url)
            .then(res => res.json())
            .then(comments => setComments(comments))
    },[])

    const { title, body } = post;
    const classes = useStyles();

    for(let i = 0; i<comments.length ;i++){
        const random = Math.floor(Math.random() * 10 + 1);
        comments[i].image = `https://randomuser.me/api/portraits/men/${random}.jpg`;
    }
    return (
        <div style={{ width: '50%', margin: 'auto' }}>
            <div style={{ marginTop: '20px'}}>
                <Card className={classes.root}>
                    <CardActionArea style={{padding:'20px 0px 100px 20px'}}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                <h2> {title}</h2>
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {body}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions style={{padding:'0px 0px 10px 40px',color:'#696969'}}>
                        <FontAwesomeIcon icon={faCommentAlt} />-{comments.length}
                    </CardActions>
                </Card>
            </div>

            <div style={{width:'80%'}}>
                
                {
                    comments.map(comment => 
                    <Comments comment={comment}></Comments>)
                }
            </div>
        </div>
    );
};

export default PostDetails;