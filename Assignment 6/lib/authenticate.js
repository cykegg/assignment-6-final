import jwt_decode from 'jwt-decode';

const TOKEN_KEY = 'access_token';

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}
export function readToken() {
  try {
    const token = getToken();
    return jwt_decode(token);
  } catch (e) {
    return null;
  }
}
export function isAuthenticated() {

  
  const token = readToken();
  return token ? true : false;
}
export async function authenticateUser(user, password) {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userName: user, password: password })
  });



  if (res.status === 200) {
    const { token } = await res.json();
    setToken(token);
    return true;

  } else {
    return false;

  }
}

export async function registerUser(user, password, password2) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userName: user, password: password, password2: password2 })
  });

  if (res.status === 200) {
    return true;
  } else {
    return false;
  }
}
