// src/pages/DepartmentPage.tsx
import React, { useState } from "react";
import DepartmentList from "../../components/features/department/DepartmentList";
import DepartmentForm from "../../components/features/department/DepartmentForm";
import { Department } from "../../types/Department";
import { deleteDepartment } from "../../services/departmentService";

const DepartmentPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Partial<Department> | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateNew = () => {
    setSelectedDepartment(null);
    setShowForm(true);
  };

  const handleEdit = (department: Department) => {
    setSelectedDepartment(department);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        await deleteDepartment(id);
        setRefreshKey(refreshKey + 1);
      } catch (err) {
        console.error("Failed to delete department", err);
      }
    }
  };

  const handleFormSuccess = (department: Department) => {
    setShowForm(false);
    setSelectedDepartment(null);
    setRefreshKey(refreshKey + 1);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Departments</h1>
      <button onClick={handleCreateNew}>Create New Department</button>

      {showForm && (
        <DepartmentForm
          initialData={selectedDepartment || {}}
          onSuccess={handleFormSuccess}
        />
      )}

      <DepartmentList
        key={refreshKey}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default DepartmentPage;
