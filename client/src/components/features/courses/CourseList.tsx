// src/components/features/courses/CourseList.tsx
import React, { useEffect, useState } from "react";
import { getCourses } from "../../../services/courseService";
import { Course } from "../../../types/Course";
import Card from "../common/Card"; // If you have a Card component
import { Link } from "react-router-dom";

interface CourseListProps {
  onEdit?: (course: Course) => void;
  onDelete?: (id: number) => void;
}

const CourseList: React.FC<CourseListProps> = ({ onEdit, onDelete }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (err: any) {
        setError(err.message || "Error fetching courses.");
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  return (
    <div style={{ marginTop: "1rem" }}>
      <h2>All Courses</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1rem",
        }}
      >
        {courses.map((course) => (
          <Card key={course.id}>
            <h3>{course.name}</h3>
            {course.description && <p>{course.description}</p>}
            <p>Status: {course.status}</p>
            {/* Department? Possibly display course.department if you have the ID or name */}
            {/* Example: <p>Department ID: {course.department}</p> */}
            {/* View Details Link */}
            <Link to={`/courses/${course.id}`}>View Details</Link>
            {onEdit && (
              <button onClick={() => onEdit(course)}>Edit</button>
            )}
            {onDelete && (
              <button onClick={() => onDelete(course.id)}>Delete</button>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
