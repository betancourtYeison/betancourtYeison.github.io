import React, {useContext, useRef} from "react";
import StyleContext from "../../contexts/StyleContext";
import "./ToggleSwitch.scss";

const ToggleSwitch = () => {
  const {isDark, changeTheme} = useContext(StyleContext);
  const switchRef = useRef(null);

  // The circular reveal starts from the center of the toggle, so it looks
  // the same whether the user clicks or toggles with the keyboard.
  const handleChange = () => {
    const rect = switchRef.current?.getBoundingClientRect();
    const origin = rect
      ? {x: rect.left + rect.width / 2, y: rect.top + rect.height / 2}
      : undefined;
    changeTheme(origin);
  };

  return (
    <label className="switch" ref={switchRef}>
      <input type="checkbox" checked={isDark} onChange={handleChange} />
      <span className="slider round">
        <span className="emoji">{isDark ? "🌜" : "☀️"}</span>
      </span>
    </label>
  );
};
export default ToggleSwitch;
