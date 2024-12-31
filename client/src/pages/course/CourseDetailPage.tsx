import React from "react";
import { useParams } from "react-router-dom";
import CourseDetail from "../../components/features/courses/CourseDetail";

const CourseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>Invalid course ID</div>;
  }

  return (
    <div>
      <h1>Course Details</h1>
      <CourseDetail id={parseInt(id, 10)} />
    </div>
  );
};

export default CourseDetailPage;
