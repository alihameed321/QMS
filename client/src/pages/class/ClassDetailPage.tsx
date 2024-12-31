// src/pages/ClassDetailPage.tsx
import React from "react";
import { useParams } from "react-router-dom";
import ClassDetail from "../../components/features/class/ClassDetail";

const ClassDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>Invalid class ID</div>;
  }

  return (
    <div>
      <h1>Class Details</h1>
      <ClassDetail id={parseInt(id, 10)} />
    </div>
  );
};

export default ClassDetailPage;
