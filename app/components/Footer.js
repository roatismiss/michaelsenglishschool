"use client";
import { useState, useEffect } from "react";
import { useLang } from "./LanguageContext";

const C = {
  primary: "#4361EE",
  accent: "#6C8AFF",
  dark: "#1a1a2e",
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

export default function Footer() {
  const m = useMobile();
  const [bh, sB] = useState(false);
  const { t } = useLang();
  const bg = "#1a1a2e";
  const brd = "rgba(255,255,255,0.08)";
  const dim = "rgba(255,255,255,0.45)";
  const bright = "rgba(255,255,255,0.85)";

  return (
    <>
      {/* CTA Banner */}
      <section style={{ background: C.primary, padding: m ? "40px 20px" : "60px 40px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: m ? "column" : "row", alignItems: m ? "flex-start" : "center", justifyContent: "space-between", gap: "24px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <span style={{ fontSize: "18px", display: "inline-flex" }}><svg width="1em" height="1em" viewBox="0 0 24 24" fill="rgba(255,255,255,0.5)" stroke="none"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/></svg></span>
              <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>{t("cta_label")}</span>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: m ? "28px" : "clamp(28px, 5vw, 44px)", fontWeight: 700, color: "#fff", lineHeight: 1.15 }}>{t("cta_title")}</h2>
          </div>
          <a href="/inquiry" onMouseEnter={() => sB(true)} onMouseLeave={() => sB(false)} style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            padding: "14px 14px 14px 28px", borderRadius: "999px",
            border: "1.5px solid rgba(255,255,255,0.4)",
            background: bh ? "#fff" : "transparent", color: bh ? C.primary : "#fff",
            fontSize: "14px", fontWeight: 600, cursor: "pointer", transition: "all 0.35s", textDecoration: "none",
          }}>
            {t("cta_btn")}
            <span style={{ width: "36px", height: "36px", borderRadius: "50%", border: bh ? `1.5px solid ${C.primary}` : "1.5px solid rgba(255,255,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.35s" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
            </span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: bg, padding: m ? "40px 20px 0" : "64px 40px 0", color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: m ? "1fr" : "1.5fr 1fr 1fr 1.3fr", gap: m ? "32px" : "40px", paddingBottom: "40px", borderBottom: `1px solid ${brd}` }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <img src="/MES-Bear.png" alt="MES" style={{ width: "44px", height: "auto" }} />
                <div style={{ lineHeight: 1.15 }}>
                  <div style={{ fontWeight: 900, fontSize: "16px" }}>{t("school_name")}</div>
                  <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.22em", color: C.accent, textTransform: "uppercase" }}>{t("school_sub")}</div>
                </div>
              </div>
              <p style={{ fontSize: "13px", lineHeight: 1.7, color: dim, marginBottom: "20px", maxWidth: "280px" }}>{t("footer_desc")}</p>
              <div style={{ display: "flex", gap: "10px" }}>
                {[
                  { href: "https://www.facebook.com/MichaelsEnglishSchool/", icon: <svg key="f" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg> },
                  { href: "https://x.com/mes_eikaiwa", icon: <svg key="x" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
                  { href: "https://www.instagram.com/michaels.english.school/", icon: <svg key="i" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" /></svg> },
                  { href: "https://jp.pinterest.com/michaelsenglishschool/", icon: <svg key="p" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg> },
                ].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" style={{ width: "34px", height: "34px", borderRadius: "50%", border: `1px solid ${brd}`, display: "flex", alignItems: "center", justifyContent: "center", color: dim }}>{s.icon}</a>
                ))}
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px", paddingBottom: "10px", borderBottom: `1px solid ${brd}` }}>{t("footer_courses")}</h4>
              {["sub_general", "sub_business", "sub_kids", "sub_ielts", "sub_cambridge", "sub_eiken"].map(k => (
                <a key={k} href="#" style={{ display: "block", fontSize: "13px", color: dim, padding: "5px 0", textDecoration: "none" }}>{t(k)}</a>
              ))}
            </div>

            <div>
              <h4 style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px", paddingBottom: "10px", borderBottom: `1px solid ${brd}` }}>{t("footer_info")}</h4>
              {[
                { key: "footer_about", href: "/about" },
                { key: "footer_teachers", href: "/teachers" },
                { key: "footer_tuition", href: "/tuition" },
                { key: "footer_access", href: "/access" },
                { key: "footer_blog", href: "/blog" },
                { key: "footer_study", href: "/study-in-japan" },
              ].map(x => (
                <a key={x.key} href={x.href} style={{ display: "block", fontSize: "13px", color: dim, padding: "5px 0", textDecoration: "none" }}>{t(x.key)}</a>
              ))}
            </div>

            <div>
              <h4 style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px", paddingBottom: "10px", borderBottom: `1px solid ${brd}` }}>{t("footer_contact")}</h4>
              <div style={{ marginBottom: "14px" }}>
                <div style={{ fontSize: "10px", fontWeight: 600, color: dim, marginBottom: "3px" }}>{t("footer_call")}</div>
                <a href="tel:0643970170" style={{ fontSize: "14px", fontWeight: 600, color: bright, textDecoration: "none" }}>06-4397-0170</a>
              </div>
              <div style={{ marginBottom: "14px" }}>
                <div style={{ fontSize: "10px", fontWeight: 600, color: dim, marginBottom: "3px" }}>{t("hero_tennoji")}</div>
                <div style={{ fontSize: "12px", color: dim, lineHeight: 1.5 }}>{t("hero_tennoji_addr")}</div>
              </div>
              <div style={{ marginBottom: "14px" }}>
                <div style={{ fontSize: "10px", fontWeight: 600, color: dim, marginBottom: "3px" }}>{t("hero_furuichi")}</div>
                <div style={{ fontSize: "12px", color: dim, lineHeight: 1.5 }}>{t("hero_furuichi_addr")}</div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: m ? "flex-start" : "center", justifyContent: "space-between", flexDirection: m ? "column" : "row", padding: "20px 0", gap: "8px" }}>
            <span style={{ fontSize: "11px", color: dim }}>{t("footer_copyright")}</span>
            <span style={{ fontSize: "11px", color: dim }}>{t("footer_powered")}</span>
          </div>
        </div>
      </footer>
    </>
  );
}