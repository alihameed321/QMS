// src/pages/CoursePage.tsx
import React, { useState } from "react";
import CourseList from "../../components/features/courses/CourseList";
import CourseForm from "../../components/features/courses/CourseForm";
import { Course } from "../../types/Course";
import { deleteCourse } from "../../services/courseService";

const CoursePage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Partial<Course> | null>(null);
  const [refreshKey, setRefreshKey] = useState(0); // trick to re-render list

  const handleCreate = () => {
    setSelectedCourse(null);
    setShowForm(true);
  };

  const handleEdit = (course: Course) => {
    setSelectedCourse(course);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await deleteCourse(id);
        setRefreshKey(refreshKey + 1);
      } catch (error) {
        console.error("Delete error:", error);
      }
    }
  };

  // Called after creating or updating a course
  const handleFormSuccess = (course: Course) => {
    // Hide form, reset selection
    setShowForm(false);
    setSelectedCourse(null);
    // trigger CourseList re-fetch
    setRefreshKey(refreshKey + 1);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Courses</h1>
      <button onClick={handleCreate}>Create New Course</button>

      {showForm && (
        <CourseForm
          initialData={selectedCourse || {}}
          onSuccess={handleFormSuccess}
        />
      )}

      {/* Pass key so it refetches courses when refreshKey changes */}
      <CourseList
        key={refreshKey}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default CoursePage;
