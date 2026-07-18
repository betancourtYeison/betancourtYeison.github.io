import React from "react";
import {render} from "@testing-library/react";
import {vi} from "vitest";
import App from "./App";

// lottie-web needs canvas APIs that jsdom doesn't implement.
vi.mock("lottie-react", () => ({default: () => null}));

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // Deprecated
    removeListener: () => {}, // Deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false
  })
});

it("renders without crashing", () => {
  render(<App />);
});
