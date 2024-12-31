// src/pages/StudentPage.tsx
import React, { useState } from "react";
import { Student } from "../../types/Student";
import { deleteStudent } from "../../services/studentService";
import StudentForm from "../../components/features/student/StudentForm";
import StudentList from "../../components/features/student/StudentList";


const StudentPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Partial<Student> | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateNew = () => {
    setSelectedStudent(null);
    setShowForm(true);
  };

  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await deleteStudent(id);
        setRefreshKey(refreshKey + 1);
      } catch (err) {
        console.error("Failed to delete student", err);
      }
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setSelectedStudent(null);
    setRefreshKey(refreshKey + 1); // Refresh the list
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Students</h1>
      <button onClick={handleCreateNew}>Create New Student</button>

      {showForm && (
        <StudentForm
          initialData={selectedStudent || {}}
          onSuccess={handleFormSuccess}
        />
      )}

      <StudentList
        key={refreshKey}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default StudentPage;
