// src/components/features/class/ClassDetail.tsx
import React, { useEffect, useState } from "react";
import { getClass } from "../../../services/classService";
import { Class } from "../../../types/Class";

interface ClassDetailProps {
  id: number;
}

const ClassDetail: React.FC<ClassDetailProps> = ({ id }) => {
  const [classItem, setClassItem] = useState<Class | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const data = await getClass(id);
        setClassItem(data);
      } catch (err: any) {
        setError(err.message || "Error fetching class details");
      }
    };
    fetchClass();
  }, [id]);

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  if (!classItem) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Class: {classItem.name}</h2>
      <p>Level: {classItem.level}</p>
      <p>School Year: {classItem.school_year}</p>
      <p>Assigned Responsible ID: {classItem.assigned_responsible}</p>
    </div>
  );
};

export default ClassDetail;
