// src/pages/ClassPage.tsx
import React, { useState } from "react";
import ClassList from "../../components/features/class/ClassList";
import ClassForm from "../../components/features/class/ClassForm";
import { Class } from "../../types/Class";
import { deleteClass } from "../../services/classService";

const ClassPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedClass, setSelectedClass] = useState<Partial<Class> | null>(
    null
  );
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateNew = () => {
    setSelectedClass(null);
    setShowForm(true);
  };

  const handleEdit = (classItem: Class) => {
    setSelectedClass(classItem);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      try {
        await deleteClass(id);
        setRefreshKey(refreshKey + 1);
      } catch (err) {
        console.error("Failed to delete class", err);
      }
    }
  };

  const handleFormSuccess = (classItem: Class) => {
    setShowForm(false);
    setSelectedClass(null);
    setRefreshKey(refreshKey + 1); // Trigger list refresh
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Classes</h1>
      <button onClick={handleCreateNew}>Create New Class</button>

      {showForm && (
        <ClassForm
          initialData={selectedClass || {}}
          onSuccess={handleFormSuccess}
        />
      )}

      <ClassList
        key={refreshKey}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ClassPage;
