import React from "react";
import {useLanguage} from "../../hooks/usePortfolio";
import "./LanguageToggle.scss";

// Segmented EN | ES switch. Toggles the active language on click and
// exposes the current one via aria-pressed for assistive tech.
const LanguageToggle = () => {
  const {language, changeLanguage} = useLanguage();
  const isEs = language === "es";

  return (
    <button
      type="button"
      className="language-toggle"
      onClick={changeLanguage}
      aria-label={isEs ? "Cambiar idioma a inglés" : "Switch language to Spanish"}
      title={isEs ? "Cambiar a inglés" : "Switch to Spanish"}
    >
      <span className={!isEs ? "lang-option active" : "lang-option"}>EN</span>
      <span className={isEs ? "lang-option active" : "lang-option"}>ES</span>
    </button>
  );
};

export default LanguageToggle;
