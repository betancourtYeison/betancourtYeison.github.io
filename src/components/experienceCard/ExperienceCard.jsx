import React, {useState, createRef} from "react";
import "./ExperienceCard.scss";
import {getColorSync} from "colorthief";

export default function ExperienceCard({cardInfo, isDark}) {
  const [bannerColor, setBannerColor] = useState(null);
  const imgRef = createRef();

  function getColorArrays() {
    const color = getColorSync(imgRef.current);
    setBannerColor(color ? color.css() : null);
  }

  const GetDescBullets = ({descBullets, isDark}) => {
    return descBullets
      ? descBullets.map((item, i) => (
          <li
            key={i}
            className={isDark ? "subTitle dark-mode-text" : "subTitle"}
          >
            {item}
          </li>
        ))
      : null;
  };

  return (
    <div className={isDark ? "experience-card-dark" : "experience-card"}>
      <div style={{background: bannerColor}} className="experience-banner">
        <div className="experience-blurred_div"></div>
        <div className="experience-div-company">
          <h5 className="experience-text-company">{cardInfo.company}</h5>
        </div>

        <img loading="lazy"
          crossOrigin={"anonymous"}
          ref={imgRef}
          className="experience-roundedimg"
          src={cardInfo.companylogo}
          alt={cardInfo.company}
          onLoad={() => getColorArrays()}
        />
      </div>
      <div className="experience-text-details">
        <h5
          className={
            isDark
              ? "experience-text-role dark-mode-text"
              : "experience-text-role"
          }
        >
          {cardInfo.role}
        </h5>
        <h5
          className={
            isDark
              ? "experience-text-date dark-mode-text"
              : "experience-text-date"
          }
        >
          {cardInfo.date}
        </h5>
        <p
          className={
            isDark
              ? "subTitle experience-text-desc dark-mode-text"
              : "subTitle experience-text-desc"
          }
        >
          {cardInfo.desc}
        </p>
        <ul>
          <GetDescBullets descBullets={cardInfo.descBullets} isDark={isDark} />
        </ul>
        {cardInfo.stack && cardInfo.stack.length > 0 && (
          <div className="experience-stack">
            {cardInfo.stack.map(tech => (
              <span
                key={tech}
                className={
                  isDark ? "experience-chip experience-chip-dark" : "experience-chip"
                }
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
