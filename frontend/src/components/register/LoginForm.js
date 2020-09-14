import React, {useState, useContext} from 'react';
import { UserContext } from '../UserContext';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { login } from '../../services/auth';



const LoginForm = () => {

    const [state, dispatch] = useContext(UserContext);


    const registerUser = async (values) => {
        const {username, password} = values;
        login(username, password)? dispatch({"type": "LOGIN"}) : dispatch({"type": "ERROR"})
    }

    

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

    if (!state.isAuthenticated) {
        return (
            <div className="root">
            <Form onSubmit={formik.handleSubmit}>
                <p className="title"> Sign In </p>
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
    else {
        return (
          <Redirect to="/post" />  
        );
    }

}


export default LoginForm;