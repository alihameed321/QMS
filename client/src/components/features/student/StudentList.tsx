// src/components/features/student/StudentList.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStudents } from "../../../services/studentService";
import { Student } from "../../../types/Student";
import Card from "../common/Card";

interface StudentListProps {
  onEdit?: (student: Student) => void;
  onDelete?: (id: number) => void;
}

const StudentList: React.FC<StudentListProps> = ({ onEdit, onDelete }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStudents();
        setStudents(data);
      } catch (err: any) {
        setError(err.message || "Error fetching students");
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  return (
    <div style={{ marginTop: "1rem" }}>
      <h2>All Students</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1rem",
        }}
      >
        {students.map((student) => (
          <Card key={student.id}>
            <h3>{student.first_name} {student.last_name}</h3>
            <p>Student Code: {student.student_code || "N/A"}</p>
            <p>Contact: {student.contact || "N/A"}</p>
            <p>Course ID: {student.course}</p>

            {/* View Details Link */}
            <Link to={`/students/${student.id}`}>View Details</Link>

            {/* Edit and Delete Buttons */}
            {onEdit && (
              <button onClick={() => onEdit(student)}>Edit</button>
            )}
            {onDelete && (
              <button onClick={() => onDelete(student.id)}>Delete</button>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudentList;
