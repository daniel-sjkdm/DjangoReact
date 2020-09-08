import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../../assets/css/PostForm.css';
import axios from 'axios';


const createPost = async (values) => {
    const response = await axios({
        url: "http://127.0.0.1:8000/api/posts/create/",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        data: JSON.stringify(values)
    })
    response.status === 201 ? console.log(response.data) : console.log("Error")
}


const PostForm = (props) => {

    const formik = useFormik({
        initialValues: {
            title: "",
            content: "",
            tags: ""
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
            <Form onSubmit={formik.handleSubmit}> 
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
                        type="text"
                        className="post-content"
                    />
                    <div className="post-content-messages">
                        { formik.touched.content && formik.errors.content? <Form.Text className="error-message" style={{flexGrow: 1}}> { formik.errors.content } </Form.Text> : "" }
                        { <Form.Text> { formik.values.content.length + "/" + 200 } </Form.Text> }
                    </div>
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
                    <Form.Text> Multiple tags must be comma separated </Form.Text>
                </Form.Group>
                <Button type="submit" > Create </Button>
            </Form>
        </div>
    );
}

export default PostForm;
