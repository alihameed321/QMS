import React, { useEffect, useState } from 'react';
import DepartmentForm from '../components/features/department/DepartmentForm';
import DepartmentList from '../components/features/department/DepartmentList';
import api from '../services/api'; // Assume this is your API service file

const DepartmentPage = () => {
    const [departments, setDepartments] = useState([]);
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        const response = await api.get('/departments'); // Adjust based on your API endpoint
        setDepartments(response.data);
    };

    const handleAddOrUpdate = async (data) => {
        if (editingId) {
            await api.put(`/departments/${editingId}`, data); // Update department
            setEditingId(null);
        } else {
            await api.post('/departments', data); // Create new department
        }
        fetchDepartments();
    };

    const handleEdit = (id) => {
        const deptToEdit = departments.find((dept) => dept.id === id);
        if (deptToEdit) {
            setEditingId(id);
            // Populate form fields for editing if needed
        }
    };

    const handleDelete = async (id) => {
        await api.delete(`/departments/${id}`);
        fetchDepartments();
    };

    return (
        <div className="department-page">
            <h1>Manage Departments</h1>
            <DepartmentForm initialData={editingId ? departments.find(d => d.id === editingId) : undefined} onSubmit={handleAddOrUpdate} />
            <DepartmentList departments={departments} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default DepartmentPage;
