import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';


const PostSearch = ({ searchQuery, handleOnChange }) => {
    return (
        <InputGroup>
            <InputGroup.Prepend>
                <InputGroup.Text> Post/Tag </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
                placeholder="search by author/post title"
                aria-label="author-post"
                value={searchQuery}
                onChange={(e) => handleOnChange(e.target.value)}
            />
        </InputGroup>
    )
}


export default PostSearch;