"use client";
import { useState, useEffect } from "react";
import { useLang } from "../components/LanguageContext";

const C = {
  primary:"#4361EE", primaryDark:"#3651D4", primaryLight:"#EEF1FF",
  accent:"#6C8AFF", dark:"#1a1a2e", text:"#333", textLight:"#666", textMuted:"#999",
};

function useMobile(bp=768){const[m,s]=useState(false);useEffect(()=>{const c=()=>s(window.innerWidth<bp);c();window.addEventListener("resize",c);return()=>window.removeEventListener("resize",c)},[bp]);return m}

/* ═══ Rotating Asterisk SVG ═══ */
function RotatingAsterisk({ size = 120 }) {
  return (
    <div className="spin-ast" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" width={size} height={size} fill="none" stroke={C.primary} strokeWidth="1.5" strokeLinejoin="round">
        {[0, 60, 120, 180, 240, 300].map(angle => (
          <polygon key={angle} points="46,44 54,44 60,8 40,8" transform={`rotate(${angle} 50 50)`} />
        ))}
      </svg>
    </div>
  );
}

/* ═══ Price Card ═══ */
function PriceCard({ plan, t }) {
  const [hov, setHov] = useState(false);
  if (plan.subtle) {
    return (
      <div style={{ padding:"20px 24px", borderRadius:"12px", background:"#f8f9fc", border:"1px dashed #dde1ec", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"12px" }}>
        <div>
          <span style={{ fontSize:"14px", fontWeight:600, color:C.textMuted }}>{plan.type}</span>
          <span style={{ fontSize:"13px", color:C.textMuted, marginLeft:"8px" }}>• {plan.freq}</span>
        </div>
        <span style={{ fontSize:"16px", fontWeight:800, color:"#22c55e" }}>{plan.price}</span>
      </div>
    );
  }
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
      padding: plan.popular ? "32px 28px" : "28px 24px", borderRadius:"16px",
      border: plan.popular ? `2px solid ${C.primary}` : hov ? `1.5px solid ${C.accent}` : "1.5px solid #e4e8f2",
      background: plan.popular ? C.primary : "#fff", position:"relative",
      transition:"all 0.35s", transform: hov && !plan.popular ? "translateY(-4px)" : "none",
      boxShadow: plan.popular ? "0 12px 32px rgba(67,97,238,0.2)" : hov ? "0 8px 24px rgba(0,0,0,0.06)" : "none", cursor:"pointer"
    }}>
      {plan.popular && <div style={{ position:"absolute", top:"-11px", right:"20px", background:"#fff", color:C.primary, fontSize:"10px", fontWeight:800, letterSpacing:"0.12em", padding:"4px 14px", borderRadius:"999px", textTransform:"uppercase" }}>{t("tuition_best_value")}</div>}
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:"16px" }}>
        <div>
          <div style={{ fontSize:"11px", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color: plan.popular ? "rgba(255,255,255,0.5)" : C.primary, marginBottom:"4px" }}>{plan.type}</div>
          <div style={{ fontSize:"14px", fontWeight:600, color: plan.popular ? "rgba(255,255,255,0.75)" : C.textLight }}>{plan.duration} • {plan.freq}</div>
        </div>
        <div style={{ width:"40px", height:"40px", borderRadius:"10px", background: plan.popular ? "rgba(255,255,255,0.15)" : C.primaryLight, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={plan.popular ? "#fff" : C.primary} strokeWidth="2"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/></svg>
        </div>
      </div>
      <div>
        {plan.custom ? (
          <div style={{ fontSize:"24px", fontWeight:800, color: plan.popular ? "#fff" : C.dark }}>{t("tuition_get_quote")}</div>
        ) : (
          <div>
            {plan.wasPrice && <span style={{ fontSize:"13px", color:"rgba(255,255,255,0.5)", textDecoration:"line-through", marginRight:"8px" }}>{plan.wasPrice}</span>}
            <span style={{ fontSize:"32px", fontWeight:900, color: plan.popular ? "#fff" : C.dark, letterSpacing:"-0.02em" }}>{plan.price}</span>
            <span style={{ fontSize:"13px", fontWeight:500, color: plan.popular ? "rgba(255,255,255,0.5)" : C.textMuted, marginLeft:"4px" }}>{t("tuition_per_month")}</span>
          </div>
        )}
      </div>
      {plan.note && <div style={{ fontSize:"12px", color: plan.popular ? "rgba(255,255,255,0.6)" : C.textMuted, marginTop:"8px" }}>{plan.note}</div>}
      <div style={{ fontSize:"11px", color: plan.popular ? "rgba(255,255,255,0.4)" : "#bbb", marginTop:"8px" }}>{t("tuition_tax_included")}</div>
    </div>
  );
}

/* ═══ MAIN ═══ */
export default function TuitionPage() {
  const [active, setActive] = useState("general");
  const m = useMobile();
  const { t } = useLang();

  const CATEGORIES = [
    { id:"general", label:t("tuition_cat_general"), plans:[
      { type:t("tuition_private"), duration:"45 min", freq:t("tuition_4x_month"), price:"¥17,600" },
      { type:t("tuition_private"), duration:"60 min", freq:t("tuition_4x_month"), price:"¥22,000" },
      { type:t("tuition_group"), duration:"60 min", freq:t("tuition_4x_month"), price:"¥11,000", note:t("tuition_note_friends"), popular:true },
      { type:t("tuition_transfer"), duration:"—", freq:t("tuition_reschedule"), price:"¥0", subtle:true },
    ]},
    { id:"business", label:t("tuition_cat_business"), plans:[
      { type:t("tuition_private"), duration:"45 min", freq:t("tuition_4x_month"), price:"¥19,800" },
      { type:t("tuition_private"), duration:"60 min", freq:t("tuition_4x_month"), price:"¥24,000" },
      { type:t("tuition_group"), duration:"60 min", freq:t("tuition_4x_month"), price:"¥12,000", note:t("tuition_note_business_friends"), popular:true },
      { type:t("tuition_transfer"), duration:"—", freq:t("tuition_reschedule"), price:"¥0", subtle:true },
    ]},
    { id:"kids", label:t("tuition_cat_kids"), plans:[
      { type:t("tuition_private"), duration:"30 min", freq:t("tuition_4x_month"), price:"¥11,000" },
      { type:t("tuition_private"), duration:"45 min", freq:t("tuition_4x_month"), price:"¥17,600" },
      { type:t("tuition_private"), duration:"60 min", freq:t("tuition_4x_month"), price:"¥22,000" },
      { type:t("tuition_group"), duration:"45 min", freq:t("tuition_4x_month"), price:"¥8,800", note:t("tuition_note_kids_friends"), popular:true },
      { type:t("tuition_group"), duration:"60 min", freq:t("tuition_4x_month"), price:"¥11,000", note:t("tuition_note_kids_friends") },
      { type:t("tuition_transfer"), duration:"—", freq:t("tuition_reschedule"), price:"¥0", subtle:true },
    ]},
    { id:"eiken", label:t("tuition_cat_eiken"), plans:[
      { type:t("tuition_private"), duration:"45 min", freq:t("tuition_4x_month"), price:"¥17,600" },
      { type:t("tuition_private"), duration:"60 min", freq:t("tuition_4x_month"), price:"¥22,000" },
      { type:t("tuition_transfer"), duration:"—", freq:t("tuition_reschedule"), price:"¥0", subtle:true },
    ]},
    { id:"cambridge", label:t("tuition_cat_cambridge"), plans:[
      { type:t("tuition_private"), duration:"45 min", freq:t("tuition_4x_month"), price:"¥19,800" },
      { type:t("tuition_private"), duration:"60 min", freq:t("tuition_4x_month"), price:"¥24,000" },
    ]},
    { id:"ielts", label:t("tuition_cat_ielts"), plans:[
      { type:t("tuition_private"), duration:"45 min", freq:t("tuition_4x_month"), price:"¥19,800" },
      { type:t("tuition_private"), duration:"60 min", freq:t("tuition_4x_month"), price:"¥24,000" },
    ]},
    { id:"specialized", label:t("tuition_cat_specialized"), plans:[
      { type:t("tuition_private"), duration:"45 min", freq:t("tuition_4x_month"), price:t("tuition_get_quote"), custom:true },
      { type:t("tuition_private"), duration:"60 min", freq:t("tuition_4x_month"), price:t("tuition_get_quote"), custom:true },
      { type:t("tuition_group"), duration:"60 min", freq:t("tuition_4x_month"), price:t("tuition_get_quote"), note:t("tuition_note_2_4_students"), custom:true },
      { type:t("tuition_transfer"), duration:"—", freq:t("tuition_reschedule"), price:"¥0", subtle:true },
    ]},
    { id:"onsite", label:t("tuition_cat_onsite"), plans:[
      { type:t("tuition_private"), duration:"60 min", freq:t("tuition_4x_month"), price:t("tuition_get_quote"), custom:true },
      { type:t("tuition_group"), duration:"60 min", freq:t("tuition_4x_month"), price:t("tuition_get_quote"), note:t("tuition_note_2_4_students"), custom:true },
      { type:t("tuition_transfer"), duration:"—", freq:t("tuition_reschedule"), price:"¥0", subtle:true },
    ]},
  ];

  const cat = CATEGORIES.find(c => c.id === active);

  return (
    <>
      <style>{`
        .spin-ast { animation: spinAst 18s linear infinite; }
        @keyframes spinAst { from{transform:rotate(0)} to{transform:rotate(360deg)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      {/* ═══ HERO ═══ */}
      <section style={{ background:"#fff", position:"relative", overflow:"hidden" }}>
        {!m && <>
          <div style={{ position:"absolute", left:"12%", top:0, bottom:"10px", width:"1px", background:"#e8ecf2", zIndex:1 }} />
          <div style={{ position:"absolute", left:"calc(31% - 16px)", top:0, bottom:"10px", width:"1px", background:"#e8ecf2", zIndex:1 }} />
          <div style={{ position:"absolute", left:"calc(31% + 16px)", top:0, bottom:"10px", width:"1px", background:"#e8ecf2", zIndex:1 }} />
          <div style={{ position:"absolute", left:"calc(50% - 16px)", top:0, bottom:"10px", width:"1px", background:"#e8ecf2", zIndex:1 }} />
          <div style={{ position:"absolute", left:"calc(50% + 16px)", top:0, bottom:"10px", width:"1px", background:"#e8ecf2", zIndex:1 }} />
          <div style={{ position:"absolute", left:"calc(69% - 16px)", top:0, bottom:"10px", width:"1px", background:"#e8ecf2", zIndex:1 }} />
          <div style={{ position:"absolute", left:"calc(69% + 16px)", top:0, bottom:"10px", width:"1px", background:"#e8ecf2", zIndex:1 }} />
          <div style={{ position:"absolute", right:"12%", top:0, bottom:"10px", width:"1px", background:"#e8ecf2", zIndex:1 }} />
        </>}

        <div style={{ display:"flex", flexDirection: m ? "column" : "row", position:"relative", zIndex:2, padding: m ? "40px 24px 24px" : "60px 48px 40px" }}>
          <div style={{ flex: m ? "none" : "0 0 50%", position:"relative" }}>
            {m && <div style={{ position:"absolute", top:0, right:0 }}><RotatingAsterisk size={72} /></div>}
            <h1 style={{ fontWeight:900, fontSize: m ? "clamp(3.5rem, 18vw, 5.5rem)" : "clamp(5rem, 9vw, 9rem)", lineHeight:0.92, letterSpacing:"-0.04em", color:C.dark, animation:"fadeUp 0.8s ease-out both" }}>{t("tuition_hero_title_1")}<br/>{t("tuition_hero_title_2")}</h1>
            <p style={{ fontFamily:"'Playfair Display', serif", fontStyle:"italic", fontSize: m ? "22px" : "clamp(24px, 3vw, 36px)", color:C.primary, marginTop: m ? "16px" : "20px", animation:"fadeUp 0.8s ease-out 0.15s both" }}>{t("tuition_hero_subtitle")}</p>
          </div>
          {!m && (
            <div style={{ flex:"0 0 50%", display:"flex", flexDirection:"column", justifyContent:"space-between", paddingLeft:"40px" }}>
              <div style={{ display:"flex", justifyContent:"center", alignItems:"center", flex:1 }}><RotatingAsterisk size={130} /></div>
              <div style={{ display:"flex", alignItems:"center", gap:"12px", justifyContent:"flex-end" }}>
                <a href="/" style={{ fontSize:"14px", fontWeight:600, color:C.primary }}>{t("nav_home")}</a>
                <span style={{ color:C.textMuted, fontSize:"14px" }}>/</span>
                <span style={{ fontSize:"14px", fontWeight:600, letterSpacing:"0.08em", color:C.text, textTransform:"uppercase" }}>{t("tuition_breadcrumb")}</span>
              </div>
            </div>
          )}
        </div>
        {m && (
          <div style={{ padding:"0 24px 20px", display:"flex", alignItems:"center", gap:"12px" }}>
            <a href="/" style={{ fontSize:"13px", fontWeight:600, color:C.primary }}>{t("nav_home")}</a>
            <span style={{ color:C.textMuted, fontSize:"13px" }}>/</span>
            <span style={{ fontSize:"13px", fontWeight:600, letterSpacing:"0.08em", color:C.text, textTransform:"uppercase" }}>{t("tuition_breadcrumb")}</span>
          </div>
        )}
        <div style={{ height:"10px", background:C.primary }} />
      </section>

      {/* ═══ ENROLLMENT FEE ═══ */}
      <div style={{ maxWidth:"1100px", margin:"0 auto", padding: m ? "32px 20px" : "48px 24px" }}>
        <div style={{ background:C.primaryLight, borderRadius:"16px", padding: m ? "24px 20px" : "32px 40px", display:"flex", alignItems: m ? "flex-start" : "center", justifyContent:"space-between", flexDirection: m ? "column" : "row", gap: m ? "16px" : "20px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"16px" }}>
            <div style={{ width:"52px", height:"52px", borderRadius:"14px", background:"#fff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            </div>
            <div>
              <div style={{ fontSize:"18px", fontWeight:700, color:C.dark }}>{t("tuition_enrollment_title")}</div>
              <div style={{ fontSize:"13px", color:C.textLight, marginTop:"2px" }}>{t("tuition_enrollment_desc")}</div>
            </div>
          </div>
          <div style={{ textAlign: m ? "left" : "right" }}>
            <div style={{ fontSize: m ? "28px" : "32px", fontWeight:900, color:C.primary }}>{t("tuition_enrollment_price")}</div>
            <div style={{ fontSize:"11px", color:C.textMuted }}>{t("tuition_enrollment_note")}</div>
          </div>
        </div>
      </div>

      {/* ═══ TABS ═══ */}
      <div style={{ maxWidth:"1100px", margin:"0 auto", padding: m ? "0 20px" : "0 24px" }}>
        <div style={{ display:"flex", gap:"6px", overflowX:"auto", paddingBottom:"4px", WebkitOverflowScrolling:"touch" }}>
          {CATEGORIES.map(c => (
            <button key={c.id} onClick={() => setActive(c.id)} style={{
              padding: m ? "8px 16px" : "10px 20px", borderRadius:"999px", border:"none",
              background: active === c.id ? C.primary : "#f4f5f9",
              color: active === c.id ? "#fff" : C.textLight,
              fontSize: m ? "12px" : "13px", fontWeight:600, cursor:"pointer",
              transition:"all 0.25s", whiteSpace:"nowrap", flexShrink:0
            }}>{c.label}</button>
          ))}
        </div>
        <div style={{ marginTop:"32px", display:"grid", gridTemplateColumns: m ? "1fr" : "repeat(auto-fill, minmax(280px, 1fr))", gap:"16px", paddingBottom:"32px" }}>
          {cat.plans.map((p, i) => <PriceCard key={`${active}-${i}`} plan={p} t={t} />)}
        </div>
      </div>

      {/* ═══ ONE MORE LESSON ═══ */}
      <div style={{ background:C.primaryLight, padding: m ? "40px 20px" : "48px 24px" }}>
        <div style={{ maxWidth:"800px", margin:"0 auto", textAlign:"center" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:"#fff", padding:"6px 16px", borderRadius:"999px", marginBottom:"20px" }}>
            <span style={{ fontSize:"16px", display:"inline-flex" }}><svg width="1em" height="1em" viewBox="0 0 24 24" fill="#4361EE" stroke="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></span>
            <span style={{ fontSize:"12px", fontWeight:700, letterSpacing:"0.1em", color:C.primary, textTransform:"uppercase" }}>{t("tuition_addon_label")}</span>
          </div>
          <h3 style={{ fontFamily:"'Playfair Display', serif", fontSize: m ? "24px" : "28px", fontWeight:700, color:C.dark, marginBottom:"16px" }}>{t("tuition_addon_title")}</h3>
          <p style={{ fontSize: m ? "14px" : "15px", lineHeight:1.7, color:C.textLight, maxWidth:"600px", margin:"0 auto 24px" }}>
            {t("tuition_addon_desc")} <strong style={{ color:C.primary }}>{t("tuition_addon_price")}</strong>. {t("tuition_addon_note")}
          </p>
          <a href="/inquiry" style={{ display:"inline-flex", alignItems:"center", gap:"10px", padding:"14px 32px", borderRadius:"12px", background:C.primary, color:"#fff", fontSize:"14px", fontWeight:600 }}>
            {t("tuition_addon_btn")} <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </>
  );
}