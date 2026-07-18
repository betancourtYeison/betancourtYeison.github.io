import React from "react";
import {motion, useReducedMotion} from "motion/react";

// Drop-in replacement for the subset of react-reveal this project used
// (react-reveal is abandoned and incompatible with React 17+). Same API:
// <Fade bottom duration={1000} distance="20px"> / <Slide left duration={2000}>.

const offsetFor = ({top, bottom, left, right}, distance) => {
  const d = parseInt(distance, 10) || 20;
  if (bottom) return {y: d};
  if (top) return {y: -d};
  if (left) return {x: -d};
  if (right) return {x: d};
  return {};
};

const Reveal = ({children, duration, distance, fade, ...direction}) => {
  const reducedMotion = useReducedMotion();
  const offset = reducedMotion ? {} : offsetFor(direction, distance);
  const hidden = fade ? {opacity: 0, ...offset} : offset;
  const visible = fade ? {opacity: 1, x: 0, y: 0} : {x: 0, y: 0};
  return (
    <motion.div
      initial={hidden}
      whileInView={visible}
      viewport={{once: true, amount: 0.1}}
      transition={{duration: duration / 1000, ease: "easeOut"}}
    >
      {children}
    </motion.div>
  );
};

export const Fade = ({duration = 1000, distance = "20px", ...props}) => (
  <Reveal fade duration={duration} distance={distance} {...props} />
);

export const Slide = ({duration = 1000, distance = "40px", ...props}) => (
  <Reveal duration={duration} distance={distance} {...props} />
);
