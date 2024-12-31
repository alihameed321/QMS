// src/components/features/student/StudentForm.tsx
import React, { useState, FormEvent } from "react";
import { createStudent, updateStudent } from "../../../services/studentService";
import { Student } from "../../../types/Student";

interface StudentFormProps {
  initialData?: Partial<Student>;
  onSuccess?: (student: Student) => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ initialData = {}, onSuccess }) => {
  const [firstName, setFirstName] = useState(initialData.first_name || "");
  const [middleName, setMiddleName] = useState(initialData.middle_name || "");
  const [lastName, setLastName] = useState(initialData.last_name || "");
  const [studentCode, setStudentCode] = useState(initialData.student_code || "");
  const [gender, setGender] = useState<"Male" | "Female" | undefined>(initialData.gender);
  const [dob, setDob] = useState(initialData.dob || "");
  const [contact, setContact] = useState(initialData.contact || "");
  const [course, setCourse] = useState<number>(initialData.course || 0);

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        student_code: studentCode,
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        gender,
        dob,
        contact,
        course,
      };

      let result: Student;
      if (initialData.id) {
        result = await updateStudent(initialData.id, payload);
      } else {
        result = await createStudent(payload);
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
      <h3>{initialData.id ? "Edit Student" : "Create Student"}</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <label>First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Middle Name:</label>
        <input
          type="text"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
        />
      </div>

      <div>
        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Student Code:</label>
        <input
          type="text"
          value={studentCode}
          onChange={(e) => setStudentCode(e.target.value)}
        />
      </div>

      <div>
        <label>Gender:</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value as "Male" | "Female")}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <div>
        <label>Date of Birth:</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
      </div>

      <div>
        <label>Contact:</label>
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
      </div>

      <div>
        <label>Course ID:</label>
        <input
          type="number"
          value={course}
          onChange={(e) => setCourse(Number(e.target.value))}
          required
        />
      </div>

      <button type="submit">{initialData.id ? "Update" : "Create"}</button>
    </form>
  );
};

export default StudentForm;
