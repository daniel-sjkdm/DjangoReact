import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import '../../assets/css/PostItem.css';
import axios from 'axios';




const PostItem = ({id, title, content, word_count, author, tags}) => {
    
    const deletePost = async (id) => {
        const response = await axios({
            url: `http://127.0.0.1:8000/api/posts/${id}/`,
            method: "DELETE",
            headers: {"Content-Type": "application/json"}
        })
        response.status === 200 ? console.log(response.data) : console.log({"error": "The post doesn't exist"})
    }

    return (
		<Card 
			bg="#3B4252"
			className="post-card">
			<Card.Header className="post-card-header"> { title } </Card.Header>
			<Card.Body className="post-card-body">
				<Card.Subtitle className="post-card-content"> <strong> Author </strong> - { author } </Card.Subtitle>
				<strong className="post-card-content"> Content </strong>
				<Card.Text className="post-card-content">  
					{ content }
				</Card.Text>
				<p className="post-card-content"> <strong className="post-card-content"> Words - { word_count } </strong> </p>
				{
					tags.length>0? tags.map(tag => <Badge key={ tag.id } variant="light">  { tag.title }  </Badge>) : ""
				}
				<br/>
                                <Button variant="danger" onClick={() => deletePost(id)}> Delete </Button>
			</Card.Body>
		</Card>
    );
}


export default PostItem;
