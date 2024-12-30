import React from 'react';

interface DepartmentCardProps {
    department: {
        id: number;
        name: string;
        description: string;
        status: number;
    };
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const DepartmentCard: React.FC<DepartmentCardProps> = ({ department, onEdit, onDelete }) => {
    return (
        <div className="department-card">
            <h3>{department.name}</h3>
            <p>{department.description}</p>
            <p>Status: {department.status ? 'Active' : 'Inactive'}</p>
            <button onClick={() => onEdit(department.id)}>Edit</button>
            <button onClick={() => onDelete(department.id)}>Delete</button>
        </div>
    );
};

export default DepartmentCard;
