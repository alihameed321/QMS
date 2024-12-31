// src/components/features/attendance/AttendanceList.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAttendances } from "../../../services/attendanceService";
import { Attendance } from "../../../types/Attendance";
import Card from "../common/Card";

interface AttendanceListProps {
  onEdit?: (attendance: Attendance) => void;
  onDelete?: (id: number) => void;
}

const AttendanceList: React.FC<AttendanceListProps> = ({ onEdit, onDelete }) => {
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAttendances();
        setAttendances(data);
      } catch (err: any) {
        setError(err.message || "Error fetching attendance records");
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  return (
    <div style={{ marginTop: "1rem" }}>
      <h2>Attendance Records</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1rem",
        }}
      >
        {attendances.map((attendance) => (
          <Card key={attendance.id}>
            <h3>Class: {attendance.classIns}</h3>
            <p>Student ID: {attendance.student}</p>
            <p>Attendance Date: {attendance.attendance_date}</p>
            <p>Type: {attendance.type === "1" ? "Present" : attendance.type === "2" ? "Tardy" : "Absent"}</p>

            {/* View Details Link */}
            <Link to={`/attendances/${attendance.id}`}>View Details</Link>

            {/* Edit and Delete Buttons */}
            {onEdit && (
              <button onClick={() => onEdit(attendance)}>Edit</button>
            )}
            {onDelete && (
              <button onClick={() => onDelete(attendance.id)}>Delete</button>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AttendanceList;
