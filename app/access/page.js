"use client";
import PageShell from "../components/PageShell";

const locations = [
  { name: "Tennoji", address: "7th Floor, Yodono Building, 1-1-9 Asahimachi, Abeno-ku, Osaka City", phone: "06-4397-0170", hours: "Mon-Sat: 10:00 - 21:00" },
  { name: "Furuichi", address: "3rd Floor, Shiroho Building, 2-1 Sakaemachi, Habikino City", phone: "06-4397-0170", hours: "Mon-Sat: 10:00 - 21:00" },
];

export default function AccessPage() {
  return (
    <PageShell title="Access Map" subtitle="Find our schools across Osaka">
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {locations.map(l => (
          <div key={l.name} style={{ display: "flex", gap: "24px", padding: "32px", borderRadius: "16px", border: "1.5px solid #e8ecf4", alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ width: "64px", height: "64px", borderRadius: "16px", background: "#4361EE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div style={{ flex: 1, minWidth: "200px" }}>
              <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#1a1a2e", marginBottom: "8px" }}>{l.name}</h3>
              <p style={{ fontSize: "14px", color: "#666", marginBottom: "4px" }}>{l.address}</p>
              <p style={{ fontSize: "14px", color: "#666", marginBottom: "4px" }}>Tel: {l.phone}</p>
              <p style={{ fontSize: "13px", color: "#999" }}>{l.hours}</p>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
