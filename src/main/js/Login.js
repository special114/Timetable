import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Form, Col } from 'react-bootstrap';
import * as yup from 'yup';
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button"

import AuthService from "./services/auth.service";
import { Alert } from "react-bootstrap";

const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required()
});

const Login = () => {
    const [validated, setValidated] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            const username = event.currentTarget['0'].value;
            const password = event.currentTarget['1'].value;
            AuthService.login(username, password)
                .then(() => {
                    window.location.replace("../");
                }, error => {
                    console.log("invalid");
                })
        }

        setValidated(true);
    }

    return (
        <div>
            <h2>Log in</h2>
            <br/>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                    <Form.Label>username</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="username"
                    />
                    <Form.Control.Feedback type="invalid">
                        * Username is required.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                    />
                    <Form.Control.Feedback type="invalid">
                        * Password is required.
                    </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" >Log in</Button>
            </Form>
        </div>
    );
};

export default Login;