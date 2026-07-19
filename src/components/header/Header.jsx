import React, {useContext} from "react";
import "./Header.scss";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import LanguageToggle from "../languageToggle/LanguageToggle";
import StyleContext from "../../contexts/StyleContext";
import {usePortfolio, useUI} from "../../hooks/usePortfolio";

function Header() {
  const {isDark} = useContext(StyleContext);
  const {
    greeting,
    workExperiences,
    skillsSection,
    bigProjects,
    blogSection,
    talkSection,
    achievementSection
  } = usePortfolio();
  const ui = useUI();

  const viewExperience = workExperiences.display;
  // "Featured Projects" in the nav points at the visible Big Projects
  // section (#projects). The GitHub-repos section only renders with a
  // token, so its #opensource anchor is unreliable to link to.
  const viewProjects = bigProjects.display;
  const viewSkills = skillsSection.display;
  const viewAchievement = achievementSection.display;
  const viewBlog = blogSection.display;
  const viewTalks = talkSection.display;

  return (
    <header className={isDark ? "dark-menu header" : "header"}>
      <a href="/" className="logo">
        <span className="grey-color"> &lt;</span>
        <span className="logo-name">{greeting.username}</span>
        <span className="grey-color">/&gt;</span>
      </a>
      <input className="menu-btn" type="checkbox" id="menu-btn" />
      <label className="menu-icon" htmlFor="menu-btn" style={{color: "white"}}>
        <span className={isDark ? "navicon navicon-dark" : "navicon"}></span>
      </label>
      <ul className={isDark ? "dark-menu menu" : "menu"}>
        {viewExperience && (
          <li>
            <a href="#experience">{ui.navExperience}</a>
          </li>
        )}
        {viewProjects && (
          <li>
            <a href="#projects">{ui.navProjects}</a>
          </li>
        )}
        {viewSkills && (
          <li>
            <a href="#skills">{ui.navSkills}</a>
          </li>
        )}
        {viewAchievement && (
          <li>
            <a href="#achievements">{ui.navCertifications}</a>
          </li>
        )}
        {viewBlog && (
          <li>
            <a href="#blogs">Blogs</a>
          </li>
        )}
        {viewTalks && (
          <li>
            <a href="#talks">Talks</a>
          </li>
        )}
        <li>
          <a href="#contact">{ui.navContact}</a>
        </li>
        <li className="header-lang-item">
          <LanguageToggle />
        </li>
        <li>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a>
            <ToggleSwitch />
          </a>
        </li>
      </ul>
    </header>
  );
}
export default Header;
