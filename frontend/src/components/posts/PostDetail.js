import React, {useEffect, useState} from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Card, Button, Badge } from 'react-bootstrap';
import axios from 'axios';
import { LinkContainer } from 'react-router-bootstrap';
import PostForm from './PostForm';



const PostDetail = (props) => {

    const match = useRouteMatch();
    const [post, setPost] = useState({});
    const [edit, setEdit] = useState(false);


    const deletePost = () => {
        console.log("Erase this shit with id" + match.params.id)
    }

    useEffect(() => {
        const fetchPost = async (id) => {
            const response = await axios({
                url: `http://127.0.0.1:8000/api/posts/${match.params.id}/`,
                method: "GET",
                headers: {"Content-Type": "application/json"},
            })
            response.status === 200 ? setPost(response.data) : console.log("Failure")
        } 
        fetchPost();
    }, []);    

    if (edit ===  false) {
        return (
            <Card 
                bg="#3B4252"
                className="post-card">
                <Card.Header className="post-card-header"> { post.title } </Card.Header>
                <Card.Body className="post-card-body">
                    <Card.Subtitle className="post-card-content"> <strong> Author </strong> - { post.author } </Card.Subtitle>
                    <strong className="post-card-content"> Content </strong>
                    <Card.Text className="post-card-content">  
                        { post.content }
                    </Card.Text>
                    <p className="post-card-content"> <strong className="post-card-content"> Words - { post.word_count } </strong> </p>
                    {
                        post.tags? post.tags.map(tag => <Badge key={ tag.id } variant="light">  { tag.title }  </Badge>) : ""
                    }
                    <br/>
                    <Button variant="primary" onClick={() => setEdit(true)}> Edit </Button>
                    <LinkContainer to={`${match.url.replace("/"+match.params.id, "")}`}>
                        <Button variant="success"> Return </Button>
                    </LinkContainer>
                    <Button variant="danger" onClick={() => deletePost(post.id)}> Delete </Button>
                </Card.Body>
            </Card>
        );
    } else {
        return (
            <PostForm id={post.id} title={post.title} content={post.content} tags={post.tags}/>
        );
    }

}



export default PostDetail;