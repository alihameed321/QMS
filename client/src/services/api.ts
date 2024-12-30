import axios from 'axios';

// Create an Axios instance with default settings
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000', // Adjust this based on your Django server URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to get all departments
export const getDepartments = () => api.get('/departments');

// Function to create a new department
export const createDepartment = (data: any) => api.post('/departments', data);

// Function to update an existing department
export const updateDepartment = (id: string | number, data: any) => api.put(`/departments/${id}`, data);

// Function to delete a department
export const deleteDepartment = (id: string | number) => api.delete(`/departments/${id}`);

export default api; // Export the Axios instance for use in other files
