import React, { useState } from 'react';
import { Pagination } from 'react-bootstrap';


const Paginator = ({postsPerPage, totalPosts, handlePageChange, currentPage}) => {

    const maxPages = Math.ceil(totalPosts/postsPerPage);
    const pageNumber = Array.from(new Array(maxPages), (val, index) => index+1);  

    return (
        <Pagination>
            <Pagination.Prev onClick={() => currentPage>1?  handlePageChange({"type": "DECREMENT"}) : ""} />
            {
                pageNumber.map((page, index) => (
                    <Pagination.Item 
                        key={index} 
                        onClick={() => handlePageChange({"type": "SET_PAGE_NUMBER", "payload": page})}
                    > { page } </Pagination.Item>
                ))
            }
            <Pagination.Next onClick={() => currentPage < maxPages? handlePageChange({"type": "INCREMENT"}) : ""}/>
        </Pagination>
    );
}


export default Paginator;