"use client";
import { LanguageProvider } from "./LanguageContext";
import DivePopup from "./DivePopup";

export default function Providers({ children }) {
  return (
    <LanguageProvider>
      <DivePopup />
      {children}
    </LanguageProvider>
  );
}