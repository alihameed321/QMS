// src/pages/StudentDetailPage.tsx
import React from "react";
import { useParams } from "react-router-dom";
import StudentDetail from "../../components/features/student/StudentDetail";

const StudentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>Invalid student ID</div>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Student Details</h1>
      <StudentDetail id={parseInt(id, 10)} />
    </div>
  );
};

export default StudentDetailPage;
