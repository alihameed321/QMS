// src/components/features/student/StudentDetail.tsx
import React, { useEffect, useState } from "react";
import { getStudent } from "../../../services/studentService";
import { Student } from "../../../types/Student";

interface StudentDetailProps {
  id: number; // ID of the student to fetch
}

const StudentDetail: React.FC<StudentDetailProps> = ({ id }) => {
  const [student, setStudent] = useState<Student | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const data = await getStudent(id);
        setStudent(data);
      } catch (err: any) {
        setError(err.message || "Error fetching student details");
      }
    };

    fetchStudent();
  }, [id]);

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Student Details</h2>
      <p><strong>Student Code:</strong> {student.student_code || "N/A"}</p>
      <p><strong>First Name:</strong> {student.first_name}</p>
      <p><strong>Middle Name:</strong> {student.middle_name || "N/A"}</p>
      <p><strong>Last Name:</strong> {student.last_name}</p>
      <p><strong>Gender:</strong> {student.gender || "N/A"}</p>
      <p><strong>Date of Birth:</strong> {student.dob ? new Date(student.dob).toLocaleDateString() : "N/A"}</p>
      <p><strong>Contact:</strong> {student.contact || "N/A"}</p>
      <p><strong>Course ID:</strong> {student.course}</p>
      <p><strong>Date Added:</strong> {new Date(student.date_added).toLocaleDateString()}</p>
      <p><strong>Last Updated:</strong> {new Date(student.date_updated).toLocaleDateString()}</p>
    </div>
  );
};

export default StudentDetail;
