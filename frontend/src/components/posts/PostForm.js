import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../../assets/css/PostForm.css';
import { authorizationHeader } from '../../services/auth';
import axios from 'axios';


    
const PostForm = (props) => {

    const createPost = async (values) => {
        const authHeader = authorizationHeader();
        console.log(authHeader)
        const response = await axios({
            url: "http://127.0.0.1:8000/api/posts/create/",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": authHeader.token 
            },
            data: JSON.stringify(values)
        })
        response.status === 201 ? console.log(response.data) : console.log("Error")
    }
    

    const updatePost = async (values) => {
        console.log(values)
        const response = await axios({
            url: `http://127.0.0.1:8000/api/posts/${props.id}/`,
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            data: JSON.stringify(values)
        })
        response.status === 201 ? console.log(response.data) : console.log("Error")
    }

    const formik = useFormik({
        initialValues: {
            title: props.title? props.title : "",
            content: props.content? props.content : "",
            tags: props.tags? props.tags.map(tag => tag.title) : ""
        },
        onSubmit: values => {
            createPost(values)
        },
        validationSchema: Yup.object({
            title: Yup.string().required("This field is required"),
            content: Yup.string().max(200, "Content must be 200 characters or less").required("This field is required"),
            tags: Yup.string().notRequired()
        })
    })

    return (
        <div className="root">
            <Form onSubmit={props.id? ( () => updatePost(formik.values)) : formik.handleSubmit} autoComplete="false"> 
            <p className="title"> Create a post! </p>
                <Form.Group>
                    <Form.Label htmlFor="title"> Title </Form.Label>
                    <Form.Control 
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                    />
                    { formik.touched.title && formik.errors.title? <Form.Text className="error-message"> { formik.errors.title } </Form.Text> : "" }
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="content"> Content </Form.Label>
                    <Form.Control 
                        name="content"
                        value={formik.values.content}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        as="textarea"
                        rows="8"
                        className="post-content"
                    />
                        { formik.touched.content && formik.errors.content? <Form.Text className="error-message" style={{flexGrow: 1}}> { formik.errors.content } </Form.Text> : "" }
                        { <Form.Text className="helper-text"> { formik.values.content.length + "/" + 200 } </Form.Text> }
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="tags"> Tags </Form.Label>
                    <Form.Control 
                        name="tags"
                        value={formik.values.tags}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                    />
                    <Form.Text className="helper-text"> Multiple tags must be comma separated </Form.Text>
                </Form.Group>
                { props.id ? <Button type="submit"> Update </Button>  : <Button type="submit"> Submit </Button> }
            </Form>
        </div>
    );
}

export default PostForm;
