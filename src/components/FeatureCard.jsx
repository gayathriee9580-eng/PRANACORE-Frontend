import React from "react";
import "./FeatureCard.css";

const FeatureCard = ({ icon, title, description, linkText, onClick, className = "" }) => {
  return (
    <article className={`reusable-feature-card ${className}`} onClick={onClick}>
      {icon && (
        <div className="reusable-feature-card-icon-wrapper" aria-hidden="true">
          {icon}
        </div>
      )}
      {title && <h3 className="reusable-feature-card-title">{title}</h3>}
      {description && (
        <p className="reusable-feature-card-description">{description}</p>
      )}
      {linkText && (
        <span className="reusable-feature-card-link">
          {linkText}
          <span className="reusable-feature-card-arrow" aria-hidden="true">
            &rarr;
          </span>
        </span>
      )}
    </article>
  );
};

export default FeatureCard;
