import React from "react";
import { Link } from "react-router-dom";
import Card from "../../components/features/common/Card"; // updated path to Card component

// You can define a simple "resource" interface for clarity
interface Resource {
  name: string;
  path: string;
}

const resources: Resource[] = [
  { name: "Departments", path: "/departments" },
  { name: "Profiles", path: "/profiles" },
  { name: "Courses", path: "/courses" },
  { name: "Students", path: "/students" },
  { name: "Classes", path: "/classes" },
  { name: "ClassStudents", path: "/classstudents" },
  { name: "Attendance", path: "/attendance" },
  { name: "Availabilities", path: "/availabilities" },
];

const HomePage: React.FC = () => {
  return (
    <div style={{ padding: "1rem" }}>
      <h1>Welcome to Our Application</h1>
      <p>This page lists the main Django REST Framework endpoints:</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1rem",
          marginTop: "2rem",
        }}
      >
        {resources.map((resource) => (
          <Card key={resource.name} style={{ padding: "1rem" }}>
            <h2>{resource.name}</h2>
            <p>API Endpoint:</p>
            <code>{`/${resource.path}/`}</code>
            
            {/* 
              If you have a dedicated React route for each resource, 
              you can link to that route. Otherwise, you can link directly 
              to the DRF endpoint for raw JSON:
            */}
            <div style={{ marginTop: "1rem" }}>
              <a href={`/api${resource.path}/`} target="_blank" rel="noreferrer">
                View Raw Data
              </a>
            </div>

            {/*
              Or link to a React route if you have one:
              <Link to={resource.path}>Go to {resource.name} Page</Link>
            */}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
