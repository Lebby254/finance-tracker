import axios from 'axios';

// Base API URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Create a reusable axios instance
const api = axios.create({
    baseURL: `${API_URL}/api`,
});

// Attach auth token automatically
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// General endpoints (auth, budget, transaction)
export const generalApi = api;

// AI endpoints
export const aiApi = {
    getOverview: (token) =>
        axios.get(`${API_URL}/api/ai/overview`, {
            headers: { Authorization: `Bearer ${token}` },
        }),

    getForecast: (data, token) =>
        axios.post(`${API_URL}/api/ai/forecast`, data, {
            headers: { Authorization: `Bearer ${token}` },
        }),

    getAdvice: (data, token) =>
        axios.post(`${API_URL}/api/ai/advice`, data, {
            headers: { Authorization: `Bearer ${token}` },
        }),
};

export default api;