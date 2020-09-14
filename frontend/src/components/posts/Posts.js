import React, { useState } from 'react';
import PostSearch from './PostSearch';
import PostList from './PostList';


const Posts = () => {
    const [ searchQuery, setSearchQuery ] = useState("");
    return (
        <div>
            <PostSearch 
                searchQuery={searchQuery}
                handleOnChange={setSearchQuery}    
            />
            <PostList 
                searchQuery={searchQuery}
            />
        </div>
    )
}


export default Posts;