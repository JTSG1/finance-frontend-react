import React from 'react';
import { Card, CardHeader, CardText, CardBody, CardFooter, Container, Form, Button } from 'react-bootstrap';
import './LoginPage.css'; // Import your custom CSS
import axios from 'axios';
import api from '../../api/api'; // Import the Axios instance

const LoginPage = ( {onLogin} ) => {

    let errors = {};

    const [formValues, setFormValues] = React.useState({
        username: '',
        password: '',
        rememberMe: false,
    }
    
    );
     // Form values state
    const [formErrors, setFormErrors] = React.useState({}); // Form errors state
    const [isSubmitting, setIsSubmitting] = React.useState(false); // Is submitting state

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormValues({
            ...formValues,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    // more validaition needed
    // function needs more work
    const handleSubmit = async (event) => {
        event.preventDefault();

        //const errors = validate();
        if (Object.keys(errors).length === 0) {
            setIsSubmitting(true); // Set submitting state to true

            try {
                const response = await api.post('/api/token/', {
                    username: formValues.username,
                    password: formValues.password,
                });

                const { access, refresh } = response.data; // Assuming the token is in the response data
                localStorage.setItem('access', access); // Store JWT in localStorage
                localStorage.setItem('refresh', refresh); // Store refresh token in localStorage
                if (typeof onLogin === 'function') {
                    onLogin(); // Call the onLogin function if it's valid
                }
            } catch (error) {
                console.error('Login failed:', error);
                // Handle server-side validation errors or network errors
                if (error.response && error.response.data) {
                    setFormErrors({ ...formErrors, server: error.response.data.message });
                } else {
                    setFormErrors({ ...formErrors, server: 'An unexpected error occurred' });
                }
            } finally {
                setIsSubmitting(false); // Reset submitting state
            }
        } else {
            //setFormErrors(errors);
        }

    }

    return (
        <Container className="centered-container">
            <Card>
                <CardHeader>
                    Login
                </CardHeader>
                <CardBody>
                    <CardText>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="username"
                                    placeholder="Enter email" 
                                    value={formValues.username}
                                    onChange={handleChange}
                                />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    name="password"
                                    placeholder="Password" 
                                    value={formValues.password}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Remember me" />
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100">
                                Login
                            </Button>
                        </Form>
                    </CardText>
                </CardBody>
            </Card>
        </Container>
    );
}

export default LoginPage;
