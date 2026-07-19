import React, {useEffect, useMemo, useState} from "react";
import {flushSync} from "react-dom";
import Header from "../components/header/Header";
import Greeting from "./greeting/Greeting";
import Skills from "./skills/Skills";
import StackProgress from "./skillProgress/skillProgress";
import WorkExperience from "./workExperience/WorkExperience";
import Projects from "./projects/Projects";
import StartupProject from "./StartupProjects/StartupProject";
import Achievement from "./achievement/Achievement";
import Blogs from "./blogs/Blogs";
import Footer from "../components/footer/Footer";
import Talks from "./talks/Talks";
import Podcast from "./podcast/Podcast";
import Education from "./education/Education";
import ScrollToTopButton from "./topbutton/Top";
import Profile from "./profile/Profile";
import SplashScreen from "./splashScreen/SplashScreen";
import {getPortfolio, detectLanguage} from "../portfolio";
import {StyleProvider} from "../contexts/StyleContext";
import {LanguageProvider} from "../contexts/LanguageContext";
import {useLocalStorage} from "../hooks/useLocalStorage";
import "./Main.scss";

const Main = () => {
  const darkPref = window.matchMedia("(prefers-color-scheme: dark)");
  // Skip the splash animation for users who prefer reduced motion.
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", darkPref.matches);

  // Language: persisted like the theme, defaulting to the browser language.
  const [language, setLanguage] = useLocalStorage("lang", detectLanguage());
  const portfolio = useMemo(() => getPortfolio(language), [language]);
  const changeLanguage = () =>
    setLanguage(prev => (prev === "es" ? "en" : "es"));

  // Keep <html lang> in sync for a11y / SEO.
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const showSplash = portfolio.splashScreen.enabled && !prefersReducedMotion;
  const [isShowingSplashAnimation, setIsShowingSplashAnimation] =
    useState(showSplash);

  useEffect(() => {
    if (showSplash) {
      const splashTimer = setTimeout(
        () => setIsShowingSplashAnimation(false),
        portfolio.splashScreen.duration
      );
      return () => {
        clearTimeout(splashTimer);
      };
    }
  }, [showSplash]);

  // Animate the theme swap with the View Transitions API: a circular
  // reveal that irises out from the toggle (origin passed by the caller).
  // Falls back to an instant toggle when the API is unavailable or the
  // user prefers reduced motion.
  const changeTheme = origin => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!document.startViewTransition || prefersReducedMotion || !origin) {
      setIsDark(prev => !prev);
      return;
    }

    const {x, y} = origin;
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );
    const root = document.documentElement;
    root.style.setProperty("--vt-x", `${x}px`);
    root.style.setProperty("--vt-y", `${y}px`);
    root.style.setProperty("--vt-r", `${maxRadius}px`);

    // flushSync forces React to apply the theme class synchronously so the
    // browser captures the "new" snapshot with the theme already switched.
    document.startViewTransition(() => {
      flushSync(() => setIsDark(prev => !prev));
    });
  };

  return (
    <div className={isDark ? "dark-mode" : null}>
      <LanguageProvider value={{language, changeLanguage, portfolio}}>
        <StyleProvider value={{isDark: isDark, changeTheme: changeTheme}}>
          {isShowingSplashAnimation && portfolio.splashScreen.enabled ? (
            <SplashScreen />
          ) : (
            <>
              <Header />
              <Greeting />
              <WorkExperience />
              <StartupProject />
              <Skills />
              <StackProgress />
              <Achievement />
              <Education />
              <Projects />
              <Blogs />
              <Talks />
              <Podcast />
              <Profile />
              <Footer />
              <ScrollToTopButton />
            </>
          )}
        </StyleProvider>
      </LanguageProvider>
    </div>
  );
};

export default Main;
