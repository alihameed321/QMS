// src/components/features/attendance/AttendanceForm.tsx
import React, { useState, FormEvent } from "react";
import { createAttendance, updateAttendance } from "../../../services/attendanceService";
import { Attendance } from "../../../types/Attendance";

interface AttendanceFormProps {
  initialData?: Partial<Attendance>;
  onSuccess?: (attendance: Attendance) => void;
}

const AttendanceForm: React.FC<AttendanceFormProps> = ({ initialData = {}, onSuccess }) => {
  const [classIns, setClassIns] = useState(initialData.classIns || 0);
  const [student, setStudent] = useState(initialData.student || 0);
  const [attendanceDate, setAttendanceDate] = useState(initialData.attendance_date || "");
  const [type, setType] = useState<"1" | "2" | "3">(initialData.type || "1");

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        classIns,
        student,
        attendance_date: attendanceDate,
        type,
      };

      let result: Attendance;
      if (initialData.id) {
        result = await updateAttendance(initialData.id, payload);
      } else {
        result = await createAttendance(payload);
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
      <h3>{initialData.id ? "Edit Attendance" : "Create Attendance"}</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <label>Class ID:</label>
        <input
          type="number"
          value={classIns}
          onChange={(e) => setClassIns(Number(e.target.value))}
          required
        />
      </div>

      <div>
        <label>Student ID:</label>
        <input
          type="number"
          value={student}
          onChange={(e) => setStudent(Number(e.target.value))}
          required
        />
      </div>

      <div>
        <label>Attendance Date:</label>
        <input
          type="date"
          value={attendanceDate}
          onChange={(e) => setAttendanceDate(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Type:</label>
        <select value={type} onChange={(e) => setType(e.target.value as "1" | "2" | "3")}>
          <option value="1">Present</option>
          <option value="2">Tardy</option>
          <option value="3">Absent</option>
        </select>
      </div>

      <button type="submit">{initialData.id ? "Update" : "Create"}</button>
    </form>
  );
};

export default AttendanceForm;
