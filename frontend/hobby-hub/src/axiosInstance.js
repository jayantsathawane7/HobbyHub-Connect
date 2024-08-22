// src/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
