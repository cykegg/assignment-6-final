import { getToken } from './authenticate';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function addToFavourites(id) {

  const res = await fetch(`${API_URL}/favourites/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `JWT ${getToken()}`,
      'Content-Type': 'application/json'

    }
  });


  if (res.status === 200) {
    return res.json();

  } else {
    return [];
  }
}

async function removeFromFavourites(id) {

  const res = await fetch(`${API_URL}/favourites/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `JWT ${getToken()}`,
      'Content-Type': 'application/json'
    }
  });


  if (res.status === 200) {
    return res.json();

  } else {
    return [];
  }
}


async function getFavourites() {
  const res = await fetch(`${API_URL}/favourites`, {
    method: 'GET',
    headers: {
      'Authorization': `JWT ${getToken()}`,
      'Content-Type': 'application/json'
    }
  });

  if (res.status === 200) {
    return res.json();
  } else {
    return [];
  }
}

async function addToHistory(id) {
  const res = await fetch(`${API_URL}/history/${id}`, {
    method: 'PUT',
    
    headers: {
      'Authorization': `JWT ${getToken()}`,
      'Content-Type': 'application/json'
    }

  });

  if (res.status === 200) {
    return res.json();
  } else {
    return [];
  }
}

async function removeFromHistory(id) {
  const res = await fetch(`${API_URL}/history/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `JWT ${getToken()}`,
      'Content-Type': 'application/json'
    }
  });

  if (res.status === 200) {
    return res.json();
  } else {
    return [];
  }
}

async function getHistory() {
  const res = await fetch(`${API_URL}/history`, {
    method: 'GET',
    headers: {
      'Authorization': `JWT ${getToken()}`,
      'Content-Type': 'application/json'
    }
  });

  if (res.status === 200) {
    return res.json();
  } else {
    return [];
  }
}

export {
  addToFavourites,
  removeFromFavourites,
  getFavourites,
  addToHistory,
  removeFromHistory,
  getHistory
};
