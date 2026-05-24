import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: '/api', // This tells Vite to use the proxy in vite.config.js
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default axiosInstance;