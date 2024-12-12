import { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button, Alert } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { authenticateUser } from '@/lib/authenticate';
import { favouritesAtom, searchHistoryAtom } from '@/store';
import { getFavourites, getHistory } from '@/lib/userData';

export default function Login() {
  const router = useRouter();
  const [userName, setUserName] = useState('');

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const updateAtoms = async () => {
    setFavouritesList(await getFavourites());
    setSearchHistory(await getHistory());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await authenticateUser(userName, password);
    if (success) {
      await updateAtoms();
      router.push('/favourites');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group controlId="formBasicEmail">
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
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}
