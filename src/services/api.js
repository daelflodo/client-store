import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/', //URL de tu backend en Localhost
  // baseURL: 'https://server-store-sob3.onrender.com/', //URL de tu backend desplegado
  headers: {
    'Content-Type': 'application/json',
  },
});


export default api;

