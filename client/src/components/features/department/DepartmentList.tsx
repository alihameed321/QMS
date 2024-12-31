// src/components/features/department/DepartmentList.tsx
import React, { useEffect, useState } from "react";
import { getDepartments } from "../../../services/departmentService";
import Card from "../common/Card";
import { Department } from "../../../types/Department";
import { Link } from "react-router-dom";

interface DepartmentListProps {
  onEdit?: (department: Department) => void; 
  onDelete?: (id: number) => void;
}

const DepartmentList: React.FC<DepartmentListProps> = ({ onEdit, onDelete }) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDepartments();
        setDepartments(data);
      } catch (err: any) {
        setError(err.message || "Error fetching departments");
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  return (
    <div style={{ marginTop: "1rem" }}>
      <h2>All Departments</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1rem",
        }}
      >
        {departments.map((department) => (
          <Card key={department.id}>
            <h3>{department.name}</h3>
            <p>Description: {department.description || "N/A"}</p>
            <p>Status: {department.status === 1 ? "Active" : "Inactive"}</p>

             {/* View Details Link */}
             <Link to={`/departments/${department.id}`}>View Details</Link>
             
            {onEdit && (
              <button onClick={() => onEdit(department)}>Edit</button>
            )}
            {onDelete && (
              <button onClick={() => onDelete(department.id)}>Delete</button>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DepartmentList;
