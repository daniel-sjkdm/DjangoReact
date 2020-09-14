import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../../assets/css/RegisterForm.css';
import axios from 'axios';



const registerUser = async (values) => {
    const response = await axios({
        url: "http://127.0.0.1:8000/api/accounts/register/",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        data: JSON.stringify(values)
    })
    response.status === 201 ? console.log(response.data) : console.log("Error")
}


// TODO
// verify both passwords matchs
const RegisterForm = (props) => {
	const formik = useFormik({
		initialValues: {
			username: "",
			email: "",
			password: "",
			confirmPassword: ""
		},
		validationSchema: Yup.object({
			username: Yup.string().required("This field is required"),
			email: Yup.string().email("Invalid email").notRequired(),
			password: Yup.string().required("This field is required"),
			confirmPassword: Yup.string().required("This field is required")
		}),
            onSubmit: values => {registerUser(values)}
	});

    return (
		<div className="root" >
			<Form onSubmit={formik.handleSubmit}>
				<p className="title"> Feel free to join us! </p>
				<Form.Group>
					<Form.Label htmlFor="username"> Username </Form.Label>
					<Form.Control 
						name="username"
						type="text" 
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.username}
					/> 
					{ formik.touched.username && formik.errors.username? <Form.Text className="error-message"> { formik.errors.username } </Form.Text> : "" }
				</Form.Group>
					<Form.Label htmlFor="email"> Email </Form.Label>
					<Form.Control 
						name="email"
						type="email"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.email} 
					/>
					{ formik.touched.email && formik.errors.email? <Form.Text className="error-message"> { formik.errors.email } </Form.Text> : "" }
				<Form.Group>
					<Form.Label htmlFor="password"> Password </Form.Label>
					<Form.Control 
						name="password"
						type="password" 
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.password}
					/>
					{ formik.touched.password && formik.errors.password? <Form.Text className="error-message"> { formik.errors.password } </Form.Text> : "" }
				</Form.Group>
				<Form.Group>
					<Form.Label htmlFor="confirmPassword"> Password </Form.Label>
					<Form.Control 
						type="password" 
						name="confirmPassword"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.confirmPassword}	
					/>
					{ formik.touched.confirmPassword && formik.errors.confirmPassword? <Form.Text className="error-message"> { formik.errors.confirmPassword } </Form.Text> : "" }
				</Form.Group>
				<Button variant="primary" type="submit">
					Join
				</Button>
			</Form>
		</div>
    );
}


export default RegisterForm;
