import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


const registerUser = async (values) => {
    const response = await axios({
        url: "http://127.0.0.1:8000/api/accounts/login/",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        data: JSON.stringify(values)
    })
    response.status === 200 ? console.log(response.data) : console.log("Error")
    
}


const LoginForm = (props) => {


    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: Yup.object({
            username: Yup.string().required("This field is required"),
            password: Yup.string().required("This field is required")
        }),
        onSubmit: values => {
            registerUser(values)
        }
    });

    return (
        <div className="root">
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group>
                    <Form.Label htmlFor="username"> Username </Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        onChange={formik.handleChange}
                        onBlur={formik.onBlur}
                        value={formik.values.username}
                    />
                    { formik.touched.username && formik.errors.username? <Form.Text style={{ color: "red" }}> { formik.errors.username } </Form.Text> : ""  }
                </Form.Group>
                <Form.Group>
                    <Form.Label> Password </Form.Label>
                    <Form.Control 
                        type="password"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.onBlur}
                        value={formik.values.password}
                    />
                    { formik.touched.password && formik.errors.password? <Form.Text style={{ color: "red" }}> { formik.errors.password } </Form.Text> : ""  }
                </Form.Group>
                <Button type="submit" variant="primary"> Submit </Button>
            </Form>
        </div>
    );
}


export default LoginForm;
