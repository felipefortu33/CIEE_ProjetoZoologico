import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5130/api', // Alterado para porta 5130
  headers: {
    'Content-Type': 'application/json',
  },
});

// Configuração de interceptors permanece a mesma
api.interceptors.response.use(
  response => response,
  error => {
    console.error('Erro na requisição:', error);
    return Promise.reject(error);
  }
);

export default api;