import React from "react";
import "./Education.scss";
import EducationCard from "../../components/educationCard/EducationCard";
import {usePortfolio, useUI} from "../../hooks/usePortfolio";

export default function Education() {
  const {educationInfo} = usePortfolio();
  const ui = useUI();
  if (educationInfo.display) {
    return (
      <div className="education-section" id="education">
        <h2 className="education-heading">{ui.educationHeading}</h2>
        <div className="education-card-container">
          {educationInfo.schools.map((school, index) => (
            <EducationCard key={index} school={school} />
          ))}
        </div>
      </div>
    );
  }
  return null;
}
