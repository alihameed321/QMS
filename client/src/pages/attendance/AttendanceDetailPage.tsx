// src/pages/AttendanceDetailPage.tsx
import React from "react";
import { useParams } from "react-router-dom";
import AttendanceDetail from "../../components/features/attendance/AttendanceDetail";

const AttendanceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>Invalid attendance ID</div>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Attendance Record Details</h1>
      <AttendanceDetail id={parseInt(id, 10)} />
    </div>
  );
};

export default AttendanceDetailPage;
