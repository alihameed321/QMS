import React from 'react';
import DepartmentCard from './DepartmentCard';

interface DepartmentListProps {
    departments: Array<{ id: number; name: string; description: string; status: number }>;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const DepartmentList: React.FC<DepartmentListProps> = ({ departments, onEdit, onDelete }) => {
    return (
        <div className="department-list">
            {departments.map((department) => (
                <DepartmentCard
                    key={department.id}
                    department={department}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default DepartmentList;
