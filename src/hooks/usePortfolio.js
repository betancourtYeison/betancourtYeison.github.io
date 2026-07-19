import {useContext} from "react";
import LanguageContext from "../contexts/LanguageContext";

// The active-language portfolio content object (greeting, skillsSection, …).
export const usePortfolio = () => useContext(LanguageContext).portfolio;

// UI strings (nav labels, buttons, headings) for the active language.
export const useUI = () => useContext(LanguageContext).portfolio.ui;

// Language state + toggle: {language, changeLanguage}.
export const useLanguage = () => {
  const {language, changeLanguage} = useContext(LanguageContext);
  return {language, changeLanguage};
};
