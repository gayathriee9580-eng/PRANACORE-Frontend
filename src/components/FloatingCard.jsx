import React from "react";
import "./FloatingCard.css";

const FloatingCard = ({ icon, title, subtitle, className = "" }) => {
  return (
    <div className={`reusable-floating-card ${className}`}>
      {icon && (
        <div className="reusable-floating-card-icon" aria-hidden="true">
          {icon}
        </div>
      )}
      <div className="reusable-floating-card-text">
        {title && <h4>{title}</h4>}
        {subtitle && <p>{subtitle}</p>}
      </div>
    </div>
  );
};

export default FloatingCard;
