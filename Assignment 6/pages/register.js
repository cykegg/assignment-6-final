import { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button, Alert } from 'react-bootstrap';
import { registerUser } from '@/lib/authenticate';

export default function Register() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setError('Passwords do not match.');
      return;

    }
    const success = await registerUser(userName, password, password2);
    if (success) {
      router.push('/login');
    } else {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-page">

      <h1>Register</h1>
      <Form onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control

            type="text"
            placeholder="Enter username"

            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control

            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword2">

          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"

            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
}
