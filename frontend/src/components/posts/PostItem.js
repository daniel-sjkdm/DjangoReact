import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import '../../assets/css/PostItem.css';
 


const PostItem = ({title, content, word_count, author, tags}) => {
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
				<Card.Link href="#" > View </Card.Link>
			</Card.Body>
		</Card>
    );
}


export default PostItem;