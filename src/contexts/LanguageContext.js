import React from "react";

// Provides the active language, a toggle, and the assembled portfolio +
// UI strings for that language. See Main.jsx for the provider and
// src/hooks/usePortfolio.js for the consumer hooks.
const LanguageContext = React.createContext();

export const LanguageProvider = LanguageContext.Provider;
export const LanguageConsumer = LanguageContext.Consumer;

export default LanguageContext;
