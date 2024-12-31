// src/components/features/class/ClassForm.tsx
import React, { useState, FormEvent } from "react";
import { createClass, updateClass } from "../../../services/classService";
import { Class } from "../../../types/Class";

interface ClassFormProps {
  initialData?: Partial<Class>;
  onSuccess?: (classItem: Class) => void;
}

const ClassForm: React.FC<ClassFormProps> = ({ initialData = {}, onSuccess }) => {
  const [name, setName] = useState(initialData.name || "");
  const [level, setLevel] = useState(initialData.level || "");
  const [schoolYear, setSchoolYear] = useState(initialData.school_year || "");
  const [assignedFaculty, setAssignedFaculty] = useState<number | null>(
    initialData.assigned_faculty || null
  );
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name,
        level,
        school_year: schoolYear,
        assigned_faculty: assignedFaculty,
      };

      let result: Class;
      if (initialData.id) {
        // Update existing class
        result = await updateClass(initialData.id, payload);
      } else {
        // Create new class
        result = await createClass(payload);
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
      <h3>{initialData.id ? "Edit Class" : "Create Class"}</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <label>Class Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Class Level:</label>
        <input
          type="text"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          required
        />
      </div>

      <div>
        <label>School Year:</label>
        <input
          type="text"
          value={schoolYear}
          onChange={(e) => setSchoolYear(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Assigned Faculty ID:</label>
        <input
          type="number"
          value={assignedFaculty || ""}
          onChange={(e) => setAssignedFaculty(Number(e.target.value))}
          required
        />
      </div>

      <button type="submit">{initialData.id ? "Update" : "Create"}</button>
    </form>
  );
};

export default ClassForm;
