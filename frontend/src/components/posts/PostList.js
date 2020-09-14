import React, { useEffect, useState, useContext, useReducer } from 'react';
import PostItem from './PostItem';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import Paginator from '../Paginator';
import { Button } from 'react-bootstrap';
import '../../assets/css/PostList.css';


// TODO
// - [X] Add a paginator for the content
// - [ ] Fix the search logic in useEffect


const paginatorReducer = (state, action) => {
	const getBounds = (page) => {
		const low_bound = page*state.postsPerPage - (state.postsPerPage - 1);
		const high_bound =  low_bound + state.postsPerPage - 1;
		return {
			low_bound: low_bound,
			high_bound: high_bound
		}
	}
	switch (action.type) {
		case 'INCREMENT': {
			const current_page = state.currentPage + 1;
			const { low_bound, high_bound } = getBounds(current_page);
			return {
				...state,
				currentPage: current_page,
				low_bound: low_bound,
				high_bound: high_bound
			}
		}
		case 'DECREMENT': {
			const current_page = state.currentPage - 1;
			const { low_bound, high_bound } = getBounds(current_page);
			return {
				...state,
				currentPage: current_page,
				low_bound: low_bound,
				high_bound: high_bound
			}
		}
		case 'SET_PAGE_NUMBER': {
			const low = action.payload*state.postsPerPage - state.postsPerPage + 1;
			const high = low + state.postsPerPage - 1;
			return {
				...state,
				currentPage: action.payload,
				low_bound: low, 
				high_bound: high
			}
		}
		default: {
			return state
		}
	}
}


const PostList = ({searchQuery}) => {

	const [ state, dispatch ] = useContext(UserContext);
	const [ posts, setPosts ] = useState([]);
	const [ paginatorState, paginatorDispatch ] = useReducer(paginatorReducer, {
		currentPage: 1,
		postsPerPage: 3,
		low_bound: 1,
		high_bound: 3
	});

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await axios.get("http://127.0.0.1:8000/api/posts/");
			if (response.status === 200) {
				setPosts(response.data);
			}
			else {
				console.log({"error": response.statusText});
			}
		}
		const fetchPost = (query) => {
			console.log("Here with a query: ", query);
			axios.get(
				"http://127.0.0.1:8000/api/posts/query/", 
				{ params:{"query": query} })
			.then(response => setPosts(response.data))
			.catch((err) => setPosts([]))
		}
		searchQuery? fetchPost(searchQuery) : fetchPosts();
	}, [searchQuery]);

    return (
        <div>
			{
				posts.length>0? (
					posts.slice(paginatorState.low_bound-1, paginatorState.high_bound).map(post => (
						<PostItem
							key={post.id}
							id={post.id}
							title={post.title}
							content={post.content}
							word_count={post.word_count}
							author={post.author}
							tags={post.tags}
							likes_users={post.liked_by}
						/>
					))
				) : (
					<h2 className="no-posts"> No posts were found with the given query </h2>
				)
			}
			{ 
				state.isAuthenticated? (
					<Link to="/posts/create">
						<Button variant="primary"> Create Post </Button>
					</Link>
				) : ""
			}
			{
				posts.length > paginatorState.postsPerPage? (
					<Paginator 
						postsPerPage={paginatorState.postsPerPage} 
						totalPosts={posts.length} 
						currentPage={paginatorState.currentPage} 
						handlePageChange={paginatorDispatch}
					/>
				) : ""
			}
        </div>
    );
}


export default PostList;
