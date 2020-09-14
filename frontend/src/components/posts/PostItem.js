import React from 'react';
import { Card, Badge, Button, Popover, OverlayTrigger } from 'react-bootstrap';
import '../../assets/css/PostItem.css';
import axios from 'axios';
import { LinkContainer } from 'react-router-bootstrap';


// TODO
// - [ ] If user is authenticated enable the following buttons:
// * Like
// * Delete
// * Edit (only if author of the post)


const userPopover = (users) => {
	return (
		<Popover>
			<Popover.Title as="h4"> Liked by </Popover.Title>
			<Popover.Content>  
				<ul>
					<li> { users.map(user => <p key={user.id}> { user.username } </p> ) } </li>
				</ul>
			</Popover.Content>
		</Popover>
	)
}


const PostItem = ({id, title, content, word_count, author, tags, likes_users}) => {
    
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
					tags.length>0? tags.map(tag => <Badge key={ tag.id } variant="light" style={{ marginRight: "10px" }}>  { tag.title }  </Badge>) : ""
				}
				<br/>
				<div className="post-card-description">
					{
						likes_users.length > 0 ? (
							<OverlayTrigger trigger="focus" placement="top" overlay={userPopover(likes_users)}>
								<Button variant="success"> Likes <Badge variant="light"> { likes_users.length } </Badge> </Button>
							</OverlayTrigger>
						) : (
							<Button variant="success"> Likes <Badge variant="light"> { likes_users.length } </Badge> </Button>
						)
					}
					<Button variant="danger" onClick={() => deletePost(id)}> Delete </Button>
					<LinkContainer to={`/posts/${id}`}> 
						<Button variant="success"> Detail </Button>
					</LinkContainer>
				</div>
			</Card.Body>
		</Card>
    );
}


export default PostItem;
