// src/components/features/courses/CourseForm.tsx
import React, { FormEvent, useState } from "react";
import { createCourse, updateCourse } from "../../../services/courseService";
import { Course } from "../../../types/Course";

interface CourseFormProps {
  initialData?: Partial<Course>;
  onSuccess?: (course: Course) => void;
}

const CourseForm: React.FC<CourseFormProps> = ({
  initialData = {},
  onSuccess,
}) => {
  const [name, setName] = useState(initialData.name || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [status, setStatus] = useState<number>(initialData.status ?? 1);
  const [department, setDepartment] = useState<number>(initialData.department ?? 0);

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Build the payload with the fields you want to send
      const payload: Partial<Course> = {
        name,
        description,
        status,
        department, // if your Django model expects an integer ID for department
      };

      let result: Course;
      if (initialData.id) {
        result = await updateCourse(initialData.id, payload);
      } else {
        result = await createCourse(payload);
      }
      onSuccess && onSuccess(result);
    } catch (err: any) {
      setError(err.message || "Failed to save course.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
      <h3>{initialData.id ? "Edit Course" : "Create Course"}</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <label>Course Name:</label>
        <input
          type="text"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
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
        <input
          type="number"
          value={status}
          onChange={(e) => setStatus(parseInt(e.target.value, 10))}
        />
      </div>

      {/* If you want to pick department, you can do a dropdown or something */}
      <div>
        <label>Department ID:</label>
        <input
          type="number"
          value={department}
          onChange={(e) => setDepartment(parseInt(e.target.value, 10))}
        />
      </div>

      <button type="submit">{initialData.id ? "Update" : "Create"}</button>
    </form>
  );
};

export default CourseForm;
