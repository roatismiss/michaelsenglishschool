"use client";

const C = {
  primary: "#4361EE",
  primaryLight: "#EEF1FF",
  dark: "#1a1a2e",
  textLight: "#666",
};

export default function PageShell({ title, subtitle, children }) {
  return (
    <>
      {/* Hero Banner */}
      <div style={{
        background: C.primary, padding: "80px 40px", textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "200px", height: "200px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.06)" }} />
        <div style={{ position: "absolute", bottom: "-80px", left: "-40px", width: "250px", height: "250px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.04)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 6vw, 52px)", fontWeight: 700, color: "#fff", marginBottom: "12px" }}>{title}</h1>
          {subtitle && <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", maxWidth: "500px", margin: "0 auto" }}>{subtitle}</p>}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "60px 28px" }}>
        {children || (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: C.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="1.5">
                <path d="M12 6v6l4 2" /><circle cx="12" cy="12" r="10" />
              </svg>
            </div>
            <h3 style={{ fontSize: "20px", fontWeight: 700, color: C.dark, marginBottom: "12px" }}>Coming Soon</h3>
            <p style={{ fontSize: "15px", color: C.textLight }}>This page is under construction. Check back soon!</p>
          </div>
        )}
      </div>
    </>
  );
}