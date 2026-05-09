"use client";
import { useState, useEffect } from "react";
import { useLang } from "./LanguageContext";

const C = {
  primary: "#4361EE",
  primaryDark: "#3651D4",
  primaryLight: "#EEF1FF",
  accent: "#6C8AFF",
  dark: "#1a1a2e",
  text: "#333",
  textLight: "#666",
};

function useMobile(bp = 768) {
  const [m, s] = useState(false);
  useEffect(() => {
    const c = () => s(window.innerWidth < bp);
    c();
    window.addEventListener("resize", c);
    return () => window.removeEventListener("resize", c);
  }, [bp]);
  return m;
}

const subItems = [
  {key:"sub_general",href:"/courses/general"},
  {key:"sub_business",href:"/courses/business"},
  {key:"sub_kids",href:"/courses/kids"},
  {key:"sub_instructor",href:"/courses/instructor"},
  {key:"sub_eiken",href:"/courses/eiken"},
  {key:"sub_cambridge",href:"/courses/cambridge"},
  {key:"sub_ielts",href:"/courses/ielts"},
  {key:"sub_onsite",href:"/courses/onsite"},
];

function MenuItem({ item }) {
  const [o, sO] = useState(false);
  const { t } = useLang();
  const [hov, setHov] = useState(false);
  return (
    <div style={{ position: "relative" }} onMouseEnter={() => { setHov(true); item.hasSub && sO(true) }} onMouseLeave={() => { setHov(false); item.hasSub && sO(false) }}>
      <a href={item.href} style={{ fontSize: "15px", fontWeight: 600, letterSpacing: "0.04em", color: hov ? C.primary : C.text, textDecoration: "none", display: "flex", alignItems: "center", gap: "4px", whiteSpace: "nowrap", transition: "color 0.2s", padding: "8px 0" }}>
        {item.label}
        {item.hasSub && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6" /></svg>}
      </a>
      {item.hasSub && o && (
        <div style={{ position: "absolute", top: "100%", left: "-8px", paddingTop: "4px", zIndex: 100 }}>
          <div style={{ background: "#fff", borderRadius: "10px", padding: "8px 0", boxShadow: "0 8px 30px rgba(67,97,238,0.12)", minWidth: "200px", border: `1px solid ${C.primaryLight}` }}>
            {subItems.map(s => (
              <a key={s.key} href={s.href} style={{ display: "block", padding: "10px 18px", fontSize: "13px", fontWeight: 500, color: "#444", textDecoration: "none", transition: "all 0.2s" }}
                onMouseEnter={e => { e.target.style.background = C.primaryLight; e.target.style.color = C.primary }}
                onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "#444" }}>
                {t(s.key)}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function LangToggle() {
  const { lang, toggleLang } = useLang();
  return (
    <div onClick={toggleLang} style={{ display: "flex", alignItems: "center", background: "#f4f5f9", borderRadius: "999px", padding: "4px", cursor: "pointer", userSelect: "none" }}>
      <span style={{ padding: "6px 14px", borderRadius: "999px", fontSize: "12px", fontWeight: 700, background: lang === "en" ? C.primary : "transparent", color: lang === "en" ? "#fff" : "#999", transition: "all 0.25s" }}>EN</span>
      <span style={{ padding: "6px 14px", borderRadius: "999px", fontSize: "12px", fontWeight: 700, background: lang === "ja" ? C.primary : "transparent", color: lang === "ja" ? "#fff" : "#999", transition: "all 0.25s" }}>JP</span>
    </div>
  );
}

export default function Navbar() {
  const m = useMobile();
  const [mo, sMo] = useState(false);
  const [mc, sMc] = useState(false);
  const { t } = useLang();

  const navLinks = [
    { key: "nav_home", href: "/" },
    { key: "nav_courses", href: "/courses", hasSub: true },
    { key: "nav_tuition", href: "/tuition" },
    { key: "nav_teachers", href: "/teachers" },
    { key: "nav_access", href: "/access" },
    { key: "nav_inquiry", href: "/inquiry" },
    { key: "nav_blog", href: "/blog" },
    { key: "nav_dive", href: "/dive-into-english" },
  ];

  if (m) {
    return (
      <>
        <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", background: "#fff" }}>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
            <img src="/MES-Bear.png" alt="MES" style={{ width: "44px", height: "auto" }} />
            <div style={{ lineHeight: 1.15 }}>
              <div style={{ fontWeight: 900, fontSize: "16px", color: C.dark }}>{t("school_name")}</div>
              <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em", color: C.primary, textTransform: "uppercase" }}>{t("school_sub")}</div>
            </div>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <LangToggle />
            <button onClick={() => sMo(!mo)} style={{ background: "none", border: "none", cursor: "pointer", padding: "8px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <span style={{ width: "22px", height: "2px", background: C.dark, display: "block", transition: "all 0.3s", transform: mo ? "rotate(45deg) translateY(7px)" : "none" }} />
                <span style={{ width: "22px", height: "2px", background: C.dark, display: "block", transition: "all 0.3s", opacity: mo ? 0 : 1 }} />
                <span style={{ width: "22px", height: "2px", background: C.dark, display: "block", transition: "all 0.3s", transform: mo ? "rotate(-45deg) translateY(-7px)" : "none" }} />
              </div>
            </button>
          </div>
        </nav>
        {mo && (
          <div style={{ background: "#fff", padding: "12px 20px 20px", borderTop: "1px solid #eee" }}>
            {navLinks.map(item => (
              <div key={item.key}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <a href={item.href} style={{ display: "block", padding: "12px 0", fontSize: "15px", fontWeight: 600, color: C.text, borderBottom: "1px solid #f0f0f0", flex: 1, textDecoration: "none" }}>{t(item.key)}</a>
                  {item.hasSub && (
                    <button onClick={() => sMc(!mc)} style={{ background: "none", border: "none", cursor: "pointer", padding: "8px" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" style={{ transform: mc ? "rotate(180deg)" : "none", transition: "0.2s" }}><path d="M6 9l6 6 6-6" /></svg>
                    </button>
                  )}
                </div>
                {item.hasSub && mc && (
                  <div style={{ paddingLeft: "14px", paddingBottom: "6px" }}>
                    {subItems.map(s => (
                      <a key={s.key} href={s.href} style={{ display: "block", padding: "8px 0", fontSize: "13px", color: C.textLight, borderBottom: "1px solid #f7f7f7", textDecoration: "none" }}>{t(s.key)}</a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div style={{ height: "1px", background: "#f0f0f0", margin: "8px 0" }} />
            <a href="/study-in-japan" style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: "8px", padding: "12px 20px", borderRadius: "12px",
              background: C.primary, color: "#fff",
              fontSize: "14px", fontWeight: 600, marginTop: "8px", textDecoration: "none",
            }}>
              {t("nav_study")}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
            </a>
          </div>
        )}
      </>
    );
  }

  return (
    <nav style={{ position: "relative", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 40px", background: "#fff" }}>
      <a href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
        <img src="/MES-Bear.png" alt="MES" style={{ width: "50px", height: "auto" }} />
        <div style={{ lineHeight: 1.15 }}>
          <div style={{ fontWeight: 900, fontSize: "18px", color: C.dark }}>{t("school_name")}</div>
          <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.22em", color: C.primary, textTransform: "uppercase" }}>{t("school_sub")}</div>
        </div>
      </a>
      <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
        {navLinks.map(item => (
          <MenuItem key={item.key} item={{ ...item, label: t(item.key) }} />
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <a href="/inquiry" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 8px 8px 22px", border: `1.5px solid ${C.dark}`, borderRadius: "999px", fontSize: "14px", fontWeight: 600, color: C.dark, flexShrink: 0, textDecoration: "none" }}>
          {t("nav_inquiry_btn")}
          <span style={{ width: "36px", height: "36px", borderRadius: "50%", border: `1.5px solid ${C.dark}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
          </span>
        </a>
        <a href="/study-in-japan" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 8px 8px 22px", background: C.primary, borderRadius: "999px", fontSize: "14px", fontWeight: 600, color: "#fff", flexShrink: 0, textDecoration: "none" }}>
          {t("nav_study")}
          <span style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
          </span>
        </a>
        <LangToggle />
      </div>
    </nav>
  );
}