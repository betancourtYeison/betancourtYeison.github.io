import React from "react";
import skillImage from "../../assets/images/skill.svg";
import "./Progress.scss";
import {usePortfolio} from "../../hooks/usePortfolio";
import {Fade} from "../../components/reveal/Reveal";
import Build from "../../assets/lottie/build";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";

export default function StackProgress() {
  const {illustration, techStack} = usePortfolio();
  if (techStack.viewSkillBars) {
    return (
      <Fade bottom duration={1000} distance="20px">
        <div className="skills-container">
          <div className="skills-bar">
            <h2 className="skills-heading">Proficiency</h2>
            {techStack.experience.map((exp, i) => {
              const progressStyle = {
                width: exp.progressPercentage
              };
              return (
                <div key={i} className="skill">
                  <p>{exp.Stack}</p>
                  <div className="meter">
                    <span style={progressStyle}></span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="skills-image">
            {illustration.animated ? (
              <DisplayLottie animationData={Build} />
            ) : (
              <img loading="lazy"
                alt="Skills"
                src={skillImage}
              />
            )}
          </div>
        </div>
      </Fade>
    );
  }
  return null;
}
