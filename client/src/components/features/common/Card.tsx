// src/components/common/Card.tsx
import React, { ReactNode, CSSProperties } from "react";

interface CardProps {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, style, className }) => {
  return (
    <div
      className={className}
      style={{
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
        padding: "1rem",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Card;
