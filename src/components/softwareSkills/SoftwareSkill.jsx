import React from "react";
import "./SoftwareSkill.scss";
import {skillsSection} from "../../portfolio";
import {FaAws} from "react-icons/fa";
import {
  SiHtml5,
  SiCss,
  SiSass,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiAngular,
  SiVuedotjs,
  SiFlutter,
  SiNodedotjs,
  SiNestjs,
  SiGraphql,
  SiPhp,
  SiPython,
  SiFirebase,
  SiDocker,
  SiGit,
  SiGithub,
  SiBitbucket
} from "react-icons/si";

const iconMap = {
  html5: SiHtml5,
  css: SiCss,
  sass: SiSass,
  javascript: SiJavascript,
  typescript: SiTypescript,
  react: SiReact,
  nextjs: SiNextdotjs,
  angular: SiAngular,
  vuejs: SiVuedotjs,
  flutter: SiFlutter,
  nodejs: SiNodedotjs,
  nestjs: SiNestjs,
  graphql: SiGraphql,
  php: SiPhp,
  python: SiPython,
  aws: FaAws,
  firebase: SiFirebase,
  docker: SiDocker,
  git: SiGit,
  github: SiGithub,
  bitbucket: SiBitbucket
};

export default function SoftwareSkill() {
  return (
    <div className="software-skills-main-div">
      {skillsSection.softwareSkills.map(group => (
        <div key={group.category} className="skill-category">
          <h3 className="skill-category-title">{group.category}</h3>
          <ul className="dev-icons">
            {group.skills.map(skill => {
              const Icon = iconMap[skill.icon];
              return (
                <li
                  key={skill.skillName}
                  className="software-skill-inline"
                  title={skill.skillName}
                >
                  {Icon ? <Icon aria-hidden="true" /> : null}
                  <p>{skill.skillName}</p>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
