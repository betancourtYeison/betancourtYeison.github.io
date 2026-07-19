import React, {useContext} from "react";
import manOnTable from "../../assets/images/manOnTable.svg";
import {Fade} from "../../components/reveal/Reveal";
import "./Greeting.scss";
import landingPerson from "../../assets/lottie/landingPerson";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import Button from "../../components/button/Button";

import {usePortfolio, useUI} from "../../hooks/usePortfolio";
import StyleContext from "../../contexts/StyleContext";

export default function Greeting() {
  const {isDark} = useContext(StyleContext);
  const {illustration, greeting, isHireable} = usePortfolio();
  const ui = useUI();
  if (!greeting.displayGreeting) {
    return null;
  }
  return (
    <Fade bottom duration={1000} distance="40px">
      <div className="greet-main" id="greeting">
        <div className="greeting-main">
          <div className="greeting-text-div">
            <div>
              {isHireable && (
                <span className="hireable-badge">
                  <span className="hireable-dot" aria-hidden="true"></span>
                  {ui.openToOpportunities}
                </span>
              )}
              <h1
                className={isDark ? "dark-mode greeting-text" : "greeting-text"}
              >
                {" "}
                {greeting.title} <span className="wave-emoji">👋</span>
              </h1>
              <p
                className={
                  isDark
                    ? "dark-mode greeting-text-p"
                    : "greeting-text-p subTitle"
                }
              >
                {greeting.subTitle}
              </p>
              <SocialMedia />
              <div className="button-greeting-div">
                <Button text={ui.contactMe} href="#contact" />
                {greeting.resumeLink && (
                  <Button
                    text={ui.seeResume}
                    newTab={true}
                    href={greeting.resumeLink}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="greeting-image-div">
            {illustration.animated ? (
              <DisplayLottie animationData={landingPerson} />
            ) : (
              <img
                alt="man sitting on table"
                src={manOnTable}
              ></img>
            )}
          </div>
        </div>
      </div>
    </Fade>
  );
}
