// src/components/features/attendance/AttendanceDetail.tsx
import React, { useEffect, useState } from "react";
import { getAttendance } from "../../../services/attendanceService";
import { Attendance } from "../../../types/Attendance";

interface AttendanceDetailProps {
  id: number; // ID of the attendance record
}

const AttendanceDetail: React.FC<AttendanceDetailProps> = ({ id }) => {
  const [attendance, setAttendance] = useState<Attendance | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const data = await getAttendance(id);
        setAttendance(data);
      } catch (err: any) {
        setError(err.message || "Error fetching attendance details");
      }
    };

    fetchAttendance();
  }, [id]);

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  if (!attendance) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Attendance Details</h2>
      <p><strong>Class ID:</strong> {attendance.classIns}</p>
      <p><strong>Student ID:</strong> {attendance.student}</p>
      <p><strong>Attendance Date:</strong> {attendance.attendance_date}</p>
      <p><strong>Type:</strong> {attendance.type === "1" ? "Present" : attendance.type === "2" ? "Tardy" : "Absent"}</p>
      <p><strong>Last Updated:</strong> {new Date(attendance.date_updated).toLocaleDateString()}</p>
    </div>
  );
};

export default AttendanceDetail;
