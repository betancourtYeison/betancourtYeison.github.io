import React, {useContext} from "react";
import "./Footer.scss";
import {Fade} from "../../components/reveal/Reveal";
import StyleContext from "../../contexts/StyleContext";
import {useUI} from "../../hooks/usePortfolio";

export default function Footer() {
  const {isDark} = useContext(StyleContext);
  const ui = useUI();
  return (
    <Fade bottom duration={1000} distance="5px">
      <div className="footer-div">
        <p className={isDark ? "dark-mode footer-text" : "footer-text"}>
          {ui.madeWith}
        </p>
        <p className={isDark ? "dark-mode footer-text" : "footer-text"}>
          {ui.copyright}
        </p>
      </div>
    </Fade>
  );
}
