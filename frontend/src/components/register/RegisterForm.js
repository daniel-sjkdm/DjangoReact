import React from 'react';
import { Form, Button } from 'react-bootstrap';


const RegisterForm = (props) => {
    return (
    	<Form>
    		<Form.Group>
    			<Form.Label> Username </Form.Label>
    			<Form.Control type="text" />
    		</Form.Group>
      			<Form.Label> Email </Form.Label>
    			<Form.Control type="email" />
    		<Form.Group>
    			<Form.Label> Password </Form.Label>
    			<Form.Control type="password" />
    		</Form.Group>
    		<Form.Group>
     			<Form.Label> Password </Form.Label>
    			<Form.Control type="password" />
    		</Form.Group>
    		<Button variant="secondary" type="submit">
    			Submit
    		</Button>
    	</Form>
    );
}


export default RegisterForm;