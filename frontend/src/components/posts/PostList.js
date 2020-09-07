import React, { useEffect, useState } from 'react';
import PostItem from './PostItem';
import axios from 'axios';
import { Container } from 'react-bootstrap';




const PostList = (props) => {

	const [ posts, setPosts ] = useState([])

	useEffect(() => {
		const fetchPosts = () => {
			axios.get("http://127.0.0.1:8000/api/posts/")
			.then(response => (
				setPosts(response.data)
			))
			.catch(err => console.log(err))
		}
		fetchPosts();
	}, []);


    return (
        <div>
   	            {
	            	posts.length>0? (
	            		posts.map(post => (
	            			<PostItem
	  							key={post.id}
	            				title={post.title}
	            				content={post.content}
	            				wordcount={post.word_count}
	            				author={post.author}
	            				tags={post.tags}
	            			/>
	            		))
	            	) : (
	            		<h3> Not posts yet@ </h3>
	            	)
	            }
        </div>
    );
}


export default PostList;