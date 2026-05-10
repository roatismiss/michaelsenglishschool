"use client";
import { LanguageProvider } from "./LanguageContext";
export default function Providers({ children }) {
  return (
    <LanguageProvider>
      {children}
    </LanguageProvider>
  );
}