import React, { useEffect, useState } from "react";
import { getCourse } from "../../../services/courseService";
import { Course } from "../../../types/Course";

interface CourseDetailProps {
  id: number; // ID of the course
}

const CourseDetail: React.FC<CourseDetailProps> = ({ id }) => {
  const [course, setCourse] = useState<Course | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourse(id);
        setCourse(data);
      } catch (err: any) {
        setError(err.message || "Error fetching course details");
      }
    };
    fetchCourse();
  }, [id]);

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{course.name}</h2>
      <p>Description: {course.description || "No description available"}</p>
      <p>Status: {course.status === 1 ? "Active" : "Inactive"}</p>
      <p>Date Added: {new Date(course.date_added).toLocaleDateString()}</p>
      <p>Last Updated: {new Date(course.date_updated).toLocaleDateString()}</p>
    </div>
  );
};

export default CourseDetail;
