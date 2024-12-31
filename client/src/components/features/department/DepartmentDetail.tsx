import React, { useEffect, useState } from "react";
import { getDepartment } from "../../../services/departmentService";
import { Department } from "../../../types/Department";

interface DepartmentDetailProps {
  id: number; // ID of the department
}

const DepartmentDetail: React.FC<DepartmentDetailProps> = ({ id }) => {
  const [department, setDepartment] = useState<Department | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const data = await getDepartment(id);
        setDepartment(data);
      } catch (err: any) {
        setError(err.message || "Error fetching department details");
      }
    };
    fetchDepartment();
  }, [id]);

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  if (!department) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{department.name}</h2>
      <p>Description: {department.description || "No description available"}</p>
      <p>Status: {department.status === 1 ? "Active" : "Inactive"}</p>
      <p>Date Added: {new Date(department.date_added).toLocaleDateString()}</p>
      <p>Last Updated: {new Date(department.date_updated).toLocaleDateString()}</p>
    </div>
  );
};

export default DepartmentDetail;
