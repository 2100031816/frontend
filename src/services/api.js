import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export function setAuthToken(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}

export const api = {
  login: (email, password) => axios.post(`${API_URL}/auth/login`, { email, password }),
  invite: (email, role) => axios.post(`${API_URL}/auth/invite`, { email, role }),
  upgrade: (slug) => axios.post(`${API_URL}/auth/tenants/${slug}/upgrade`),
  getNotes: () => axios.get(`${API_URL}/notes`),
  createNote: (title, content) => axios.post(`${API_URL}/notes`, { title, content }),
  updateNote: (id, title, content) => axios.put(`${API_URL}/notes/${id}`, { title, content }),
  deleteNote: (id) => axios.delete(`${API_URL}/notes/${id}`),
};
