// src/components/features/class/ClassList.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getClasses } from "../../../services/classService";
import { Class } from "../../../types/Class";
import Card from "../common/Card";

interface ClassListProps {
  onEdit?: (classItem: Class) => void;
  onDelete?: (id: number) => void;
}

const ClassList: React.FC<ClassListProps> = ({ onEdit, onDelete }) => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getClasses();
        setClasses(data);
      } catch (err: any) {
        setError(err.message || "Error fetching classes");
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  return (
    <div style={{ marginTop: "1rem" }}>
      <h2>All Classes</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1rem",
        }}
      >
        {classes.map((classItem) => (
          <Card key={classItem.id}>
            <h3>{classItem.name}</h3>
            <p>Level: {classItem.level}</p>
            <p>School Year: {classItem.school_year}</p>
            <p>Assigned Responsible ID: {classItem.assigned_responsible}</p>

            {/* View Details Link */}
            <Link to={`/classes/${classItem.id}`}>View Details</Link>

            {/* Edit and Delete Buttons */}
            {onEdit && (
              <button onClick={() => onEdit(classItem)}>Edit</button>
            )}
            {onDelete && (
              <button onClick={() => onDelete(classItem.id)}>Delete</button>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClassList;
