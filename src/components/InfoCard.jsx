import React from "react";
import "./InfoCard.css";

const InfoCard = ({ icon, title, description, className = "" }) => {
  return (
    <div className={`reusable-info-card ${className}`}>
      {icon && (
        <div className="reusable-info-card-icon-wrapper" aria-hidden="true">
          {icon}
        </div>
      )}
      {title && <h4 className="reusable-info-card-title">{title}</h4>}
      {description && (
        <p className="reusable-info-card-description">{description}</p>
      )}
    </div>
  );
};

export default InfoCard;
