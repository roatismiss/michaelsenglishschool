"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import en from "../translations/en";
import ja from "../translations/ja";

const LanguageContext = createContext({ lang: "ja", toggleLang: () => {}, t: (k) => k });

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("ja");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("mes-lang");
      if (saved === "ja" || saved === "en") setLang(saved);
    } catch (e) {}
  }, []);

  const toggleLang = useCallback(() => {
    const next = lang === "en" ? "ja" : "en";
    setLang(next);
    try { localStorage.setItem("mes-lang", next); } catch (e) {}
  }, [lang]);

  const t = useCallback((key) => {
    const dict = lang === "ja" ? ja : en;
    return dict[key] !== undefined ? dict[key] : (en[key] !== undefined ? en[key] : key);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t, mounted }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}