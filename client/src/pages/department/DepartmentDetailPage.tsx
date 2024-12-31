import React from "react";
import { useParams } from "react-router-dom";
import DepartmentDetail from "../../components/features/department/DepartmentDetail";

const DepartmentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>Invalid department ID</div>;
  }

  return (
    <div>
      <h1>Department Details</h1>
      <DepartmentDetail id={parseInt(id, 10)} />
    </div>
  );
};

export default DepartmentDetailPage;
