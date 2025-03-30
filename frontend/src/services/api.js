import axios from 'axios';

const api = axios.create({
    baseURL: '/api', 
    timeout: 5000, 
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized! Please log in again.');
            localStorage.removeItem('accessToken');
        }
        return Promise.reject(error);
    }
);

export default api;
