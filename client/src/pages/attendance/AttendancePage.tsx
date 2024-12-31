// src/pages/AttendancePage.tsx
import React, { useState } from "react";
import { Attendance } from "../../types/Attendance";
import { deleteAttendance } from "../../services/attendanceService";
import AttendanceForm from "../../components/features/attendance/AttendanceForm";
import AttendanceList from "../../components/features/attendance/AttendanceList";

const AttendancePage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState<Partial<Attendance> | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateNew = () => {
    setSelectedAttendance(null);
    setShowForm(true);
  };

  const handleEdit = (attendance: Attendance) => {
    setSelectedAttendance(attendance);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this attendance record?")) {
      try {
        await deleteAttendance(id);
        setRefreshKey(refreshKey + 1);
      } catch (err) {
        console.error("Failed to delete attendance record", err);
      }
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setSelectedAttendance(null);
    setRefreshKey(refreshKey + 1); // Refresh the list
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Attendance Records</h1>
      <button onClick={handleCreateNew}>Create New Attendance</button>

      {showForm && (
        <AttendanceForm
          initialData={selectedAttendance || {}}
          onSuccess={handleFormSuccess}
        />
      )}

      <AttendanceList
        key={refreshKey}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default AttendancePage;
