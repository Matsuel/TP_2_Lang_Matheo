import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
});

export const userService = {
    getAll: () => api.get('/users'),
    getById: (id: number | string) => api.get(`/users/${id}`),
    create: (data: unknown) => api.post('/users', data),
    update: (id: number | string, data: unknown) => api.put(`/users/${id}`, data),
    remove: (id: number | string) => api.delete(`/users/${id}`),
};
