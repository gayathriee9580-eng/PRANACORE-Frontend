import React from "react";
import "./PrimaryButton.css";

const PrimaryButton = ({
  text,
  icon,
  variant = "primary",
  onClick,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`pranacore-btn pranacore-btn-${variant} ${className}`}
      onClick={onClick}
      {...props}
    >
      {icon && (
        <span className="btn-icon-wrapper" aria-hidden="true">
          {icon}
        </span>
      )}

      <span>{text}</span>
    </button>
  );
};

export default PrimaryButton;