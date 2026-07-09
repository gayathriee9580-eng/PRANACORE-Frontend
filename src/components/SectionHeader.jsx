import React from "react";
import "./SectionHeader.css";

const SectionHeader = ({ badge, title, highlight, description }) => {
  const renderTitle = () => {
    if (!highlight || !title) return title;
    
    const index = title.indexOf(highlight);
    if (index === -1) return title;
    
    const before = title.substring(0, index);
    const after = title.substring(index + highlight.length);
    
    return (
      <>
        {before}
        <span className="section-title-highlight">{highlight}</span>
        {after}
      </>
    );
  };

  return (
    <header className="section-header-container">
      {badge && (
        <span className="section-header-badge">
          <span className="section-header-badge-dot" />
          {badge}
        </span>
      )}
      {title && <h2 className="section-header-title">{renderTitle()}</h2>}
      {description && <p className="section-header-description">{description}</p>}
    </header>
  );
};

export default SectionHeader;
