
import React, { useState } from 'react';
import { Form, Button} from 'react-bootstrap';
import '../css/pagecss/Signup.css';
import { Link } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Signup attempted with:', { email, password });
    // Here you would typically send a request to your server
  };

  return (
    <div className="Signup-wrapper">
      <div className="Signup-form-container">
        <h2 className="Signup-title">Signup</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your first name"
              />
            </Form.Group>

            <Form.Group controlId="formBasicName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your last name"
              />
            </Form.Group>




            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="success" type="submit" className="Signup-button">
              SIGN UP
            </Button>
            <Form.Text  className="text-right">
          Already Registered? <a href="#"><Link to="/login">Sign in</Link></a>
        </Form.Text>
          </Form>
          </div>
          </div>
  );
}

export default Signup;
