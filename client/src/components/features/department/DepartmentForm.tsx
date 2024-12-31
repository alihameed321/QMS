// src/components/features/department/DepartmentForm.tsx
import React, { useState, FormEvent } from "react";
import { createDepartment, updateDepartment } from "../../../services/departmentService";
import { Department } from "../../../types/Department";

interface DepartmentFormProps {
  initialData?: Partial<Department>;
  onSuccess?: (department: Department) => void;
}

const DepartmentForm: React.FC<DepartmentFormProps> = ({ initialData = {}, onSuccess }) => {
  const [name, setName] = useState(initialData.name || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [status, setStatus] = useState(initialData.status || 1);

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const payload = { name, description, status };
      let result: Department;
      if (initialData.id) {
        result = await updateDepartment(initialData.id, payload);
      } else {
        result = await createDepartment(payload);
      }
      if (onSuccess) {
        onSuccess(result);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{initialData.id ? "Edit Department" : "Create Department"}</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <label>Department Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(Number(e.target.value))}>
          <option value={1}>Active</option>
          <option value={0}>Inactive</option>
        </select>
      </div>

      <button type="submit">{initialData.id ? "Update" : "Create"}</button>
    </form>
  );
};

export default DepartmentForm;
