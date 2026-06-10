"use client";
import { useState, useEffect } from "react";

const C = {
  primary:"#4361EE", primaryDark:"#3651D4", primaryLight:"#EEF1FF",
  accent:"#6C8AFF", dark:"#1a1a2e", text:"#333", textLight:"#666", textMuted:"#999",
};

const FLAGS = {
  UK:<svg width="1em" height="1em" viewBox="0 0 24 24" style={{borderRadius:"50%",overflow:"hidden"}}><rect width="24" height="24" fill="#012169"/><path d="M0 0L24 24M24 0L0 24" stroke="#fff" strokeWidth="4"/><path d="M0 0L24 24M24 0L0 24" stroke="#C8102E" strokeWidth="1.5"/><path d="M12 0v24M0 12h24" stroke="#fff" strokeWidth="6"/><path d="M12 0v24M0 12h24" stroke="#C8102E" strokeWidth="3.5"/></svg>,
  US:<svg width="1em" height="1em" viewBox="0 0 24 24" style={{borderRadius:"50%",overflow:"hidden"}}><rect width="24" height="24" fill="#B22234"/><rect y="4" width="24" height="2" fill="#fff"/><rect y="8" width="24" height="2" fill="#fff"/><rect y="12" width="24" height="2" fill="#fff"/><rect y="16" width="24" height="2" fill="#fff"/><rect y="20" width="24" height="2" fill="#fff"/><rect width="10" height="12" fill="#3C3B6E"/></svg>,
  AU:<svg width="1em" height="1em" viewBox="0 0 24 24" style={{borderRadius:"50%",overflow:"hidden"}}><rect width="24" height="24" fill="#00008B"/><circle cx="6" cy="18" r="1.8" fill="#fff"/><circle cx="14" cy="6" r="1.2" fill="#fff"/><circle cx="18" cy="10" r="1.2" fill="#fff"/><circle cx="17" cy="16" r="1.2" fill="#fff"/><circle cx="13" cy="13" r="1.2" fill="#fff"/></svg>,
  CA:<svg width="1em" height="1em" viewBox="0 0 24 24" style={{borderRadius:"50%",overflow:"hidden"}}><rect width="7" height="24" fill="#FF0000"/><rect x="7" width="10" height="24" fill="#fff"/><rect x="17" width="7" height="24" fill="#FF0000"/><path d="M12 6l1.5 3.5-1.5 1 2 2-1.5.5.5 2.5h-2l-.5 1.5-.5-1.5h-2l.5-2.5-1.5-.5 2-2-1.5-1z" fill="#FF0000"/></svg>,
  JP:<svg width="1em" height="1em" viewBox="0 0 24 24" style={{borderRadius:"50%",overflow:"hidden"}}><rect width="24" height="24" fill="#fff"/><circle cx="12" cy="12" r="5.5" fill="#BC002D"/></svg>,
  NP:<svg width="1em" height="1em" viewBox="0 0 24 24" style={{borderRadius:"50%",overflow:"hidden"}}><rect width="24" height="24" fill="#fff"/><path d="M4 22L4 2L18 9L4 9L18 16L4 22Z" fill="#DC143C" stroke="#003893" strokeWidth="1.5"/></svg>,
};

const FEATURED = [
  { name:"Michael", role:"Founder", flag:"UK", quote:"Studying is fun and studying English is important.", bio:"British citizen who has lived in Japan for 33 years. Oxford educated with advanced levels in English, English Literature and Modern Languages. Speaks French, German, Dutch, Japanese, Portuguese, Russian and Thai. Graduated with honors in Management Science from Kent University, Canterbury. Father of six, Aikido practitioner, and has visited 51 countries.", img:"/teachers/michael-square.jpg" },
];

const TEACHERS = [
  { name:"Nili", role:"Instructor", flag:"UK", quote:"My life has been shaped by a blend of languages and diverse cultures.", bio:"Having lived and worked in London, Paris, and Istanbul, she speaks English, French, and Turkish fluently, and converses comfortably in Japanese. She has been in Japan for 21 years. Originally came to train in Aikido but stayed, drawn in by everything Japan has to offer. She trains regularly in Aikido and has a deep appreciation for Japanese manners, precision, and aesthetics. She particularly loves the atmosphere of Osaka. In her free time, she enjoys writing poems and stories, reading, watching films, and studying ancient languages.", img:"/teachers/nilinew.jpeg", imgPos:"center 20%", imgSize:"contain" },
  { name:"Tom", flag:"UK", role:"Instructor", quote:"One new thing every day.", bio:"From London. Specializes in medical English. Creates a comfortable, relaxed learning environment. Fascinated by Japanese culture. Enjoys a nice cup of tea and pleasant conversation.", img:"/teachers/Tom.jpg" },
  { name:"Troy", flag:"US", role:"Instructor", quote:"Period dramas and Westerns are my thing.", bio:"From the countryside of Los Angeles, California. Studied digital media at Texas A&M University. Worked in criminal investigation before coming to Japan. Enjoys DIY, fringe theory, and American/Italian Westerns.", img:"/teachers/TROY.jpeg" },
  { name:"Angela", flag:"AU", role:"Instructor", quote:"Teaching a new language brings me joy.", bio:"From Adelaide, Australia. Has been living in Japan for over 15 years. Loves the culture, customs, and Japanese food. Passionate about protecting the environment and promoting eco-friendly sustainability. Enjoys hiking, reading, baking, and flower arrangement.", img:"/teachers/angela-square.jpg" },
  { name:"Bilal", flag:"UK", role:"Instructor", quote:"Twenty-one years and it still feels new.", bio:"Originally from Pakistan, grew up across Dubai, Thailand, Singapore, and Japan. Cambridge O and A levels. Graduated from Kindai University with a degree in International Trade Management.", img:"/teachers/Bilal.png" },
  { name:"Ken", flag:"US", role:"Instructor", quote:"I'm into fashion and classical music.", bio:"An American from sunny California. Has been in Japan for 10 years. Loves fashion and classical music. Enjoys learning about Japan and teaching people about world cultures.", img:"/teachers/ken.jpeg" },
  { name:"Alex", role:"Instructor", flag:"UK", quote:"Engineering meets education.", bio:"Graduated from Oxford University with a Master's in Engineering in 2010. First came to Japan in 2007 to study Japanese. Earned CELTA certification in London in 2009, then volunteered teaching English to refugees in Oxford. Joined Michael's English School in April 2015 as manager. Passionate about Japanese language study, camping, hot springs, and visiting historic sites.", img:"/teachers/Alex.png" },
  { name:"Levi", flag:"US", role:"Instructor", quote:"I love animals, technology, and teaching!", bio:"From Wisconsin, USA. Has a background in aviation, automotive design and engineering. Lived in Los Angeles, Chicago, and northern Italy. Living in Osaka for two and a half years. Thirty years ago lived in Iwakuni, Yamaguchi Ken, for five years. Teaches all levels from beginners through advanced.", img:"/teachers/levi.jpeg" },
  { name:"Rawat", flag:"NP", role:"Instructor", quote:"First of all, have fun!", bio:"Born in Nepal. Lived and worked in England, Nepal, and Scotland. In Osaka for 11 years. Holds an MBA in Coaching and Mentoring from a British university. Teaches English in junior high and high schools and guides students for EIKEN prep. Loves traveling, cooking, and reading.", img:"/teachers/rawat.jpeg" },
  { name:"Rie", flag:"JP", role:"Instructor", quote:"Speaking English is like having a World Passport.", bio:"Japanese instructor who believes learning English truly expands your world. Uses English as a tool to communicate with people from all over the globe. Once at a resort in Cebu, she shared a dinner table with Dutch, German, Israeli, Greek, and Japanese guests — all chatting in English. She was never naturally gifted at English and never studied abroad, proving you can learn to speak English while living in Japan. Passionate about encouraging students to come to Michael's and discover English for themselves.", img:"/teachers/rie.png" },
  { name:"Patrick", flag:"UK", role:"Instructor", quote:"The best way to learn is in conversation.", bio:"Has lived in many different countries, teaching English to people from all over the world. Speaks several languages. Many hobbies including martial arts, cycling, drawing, trading card games, and video games. Living in Osaka since 2023. Loves the city, the food, and the locals.", img:"/teachers/patrick.jpeg" },
  { name:"Biny", flag:"JP", role:"Instructor", quote:"Let's learn English and have fun at the same time!", bio:"Originally from Tokyo. Has lived in the UAE, Malaysia, and Thailand. Learnt English in international school and studied other languages too. Loves learning about different cultures and trying different foods. Enjoys traveling, cooking, baking, swimming, music, YouTube, and anime.", img:"/teachers/biny.jpeg" },
];

function useMobile(bp=768){const[m,s]=useState(false);useEffect(()=>{const c=()=>s(window.innerWidth<bp);c();window.addEventListener("resize",c);return()=>window.removeEventListener("resize",c)},[bp]);return m}

/* ═══ Rotating Asterisk ═══ */
function RotatingAsterisk({ size = 120 }) {
  return (
    <div className="spin-ast" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" width={size} height={size} fill="none" stroke={C.primary} strokeWidth="1.5" strokeLinejoin="round">
        {[0, 60, 120, 180, 240, 300].map(a => (
          <polygon key={a} points="46,44 54,44 60,8 40,8" transform={`rotate(${a} 50 50)`} />
        ))}
      </svg>
    </div>
  );
}

/* ═══ Pull Quote ═══ */
function PullQuote({ text, author }) {
  return (
    <div style={{ padding:"40px 0", borderTop:`2px solid ${C.primary}`, borderBottom:"1px solid #e8ecf2", margin:"40px 0" }}>
      <p style={{ fontFamily:"'Playfair Display',serif", fontStyle:"italic", fontSize:"clamp(22px, 3vw, 32px)", lineHeight:1.4, color:C.dark, marginBottom:"16px" }}>"{text}"</p>
      <span style={{ fontSize:"12px", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:C.primary }}>{author}</span>
    </div>
  );
}

/* ═══ Featured Card — blue card, rounded photo top-left ═══ */
function FeaturedCard({ t, reverse, m }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
      background: C.primary, borderRadius:"20px", padding: m ? "28px 24px" : "40px 44px",
      marginBottom: m ? "28px" : "48px", transition:"all 0.4s",
      transform: hov ? "translateY(-4px)" : "none",
      boxShadow: hov ? "0 20px 50px rgba(67,97,238,0.3)" : "0 8px 30px rgba(67,97,238,0.15)",
    }}>
      {/* Header: rounded photo + name + flag */}
      <div style={{ display:"flex", alignItems:"center", gap: m ? "16px" : "24px", marginBottom:"24px" }}>
        {t.img ? (
          <img src={t.img} alt={t.name} style={{ width: m ? "90px" : "120px", height: m ? "90px" : "120px", borderRadius:"50%", objectFit: t.imgSize || "cover", objectPosition: t.imgPos || "top center", border:"4px solid rgba(255,255,255,0.3)", flexShrink:0, background:"rgba(255,255,255,0.15)" }} />
        ) : (
          <div style={{ width: m ? "90px" : "120px", height: m ? "90px" : "120px", borderRadius:"50%", background:"rgba(255,255,255,0.15)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
        )}
        <div style={{ flex:1 }}>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize: m ? "26px" : "34px", fontWeight:700, color:"#fff", lineHeight:1.15, marginBottom:"6px" }}>{t.name}</h2>
          <div style={{ fontSize:"13px", color:"rgba(255,255,255,0.8)", marginBottom:"4px" }}>{t.role}</div>
          {t.tag && <div style={{ fontSize:"12px", fontWeight:700, letterSpacing:"0.1em", color:"rgba(255,255,255,0.6)", textTransform:"uppercase" }}>{t.tag}</div>}
        </div>
        <div style={{ fontSize:"32px", alignSelf:"flex-start", flexShrink:0 }}>{FLAGS[t.flag]}</div>
      </div>
      {/* Quote */}
      <div style={{ borderLeft:"3px solid rgba(255,255,255,0.4)", paddingLeft:"16px", marginBottom:"20px" }}>
        <p style={{ fontFamily:"'Playfair Display',serif", fontStyle:"italic", fontSize: m ? "16px" : "18px", lineHeight:1.5, color:"rgba(255,255,255,0.9)" }}>"{t.quote}"</p>
      </div>
      {/* Bio */}
      <p style={{ fontSize:"14px", lineHeight:1.8, color:"rgba(255,255,255,0.85)" }}>{t.bio}</p>
    </div>
  );
}

/* ═══ Teacher Popup Modal ═══ */
function TeacherModal({ t, onClose, m }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  return (
    <div onClick={onClose} style={{
      position:"fixed", inset:0, zIndex:9999, background:"rgba(0,0,0,0.6)", backdropFilter:"blur(6px)",
      display:"flex", alignItems:"center", justifyContent:"center", padding:"24px",
      animation:"fadeIn 0.25s ease-out both",
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background:C.primary, borderRadius:"24px", maxWidth:"560px", width:"100%",
        maxHeight:"85vh", overflowY:"auto", padding: m ? "28px 24px" : "40px 36px",
        boxShadow:"0 24px 80px rgba(0,0,0,0.4)", animation:"fadeUp 0.3s ease-out both",
      }}>
        {/* Close button */}
        <button onClick={onClose} style={{
          position:"sticky", top:0, float:"right", background:"rgba(255,255,255,0.15)",
          border:"none", borderRadius:"50%", width:"36px", height:"36px", cursor:"pointer",
          display:"flex", alignItems:"center", justifyContent:"center", marginLeft:"8px",
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>

        {/* Photo + Name */}
        <div style={{ display:"flex", alignItems:"center", gap:"20px", marginBottom:"24px" }}>
          {t.img ? (
            <img src={t.img} alt={t.name} style={{ width:"100px", height:"100px", borderRadius:"50%", objectFit:"cover", objectPosition: t.imgPos || "top center", border:"4px solid rgba(255,255,255,0.3)", flexShrink:0 }} />
          ) : (
            <div style={{ width:"100px", height:"100px", borderRadius:"50%", background:"rgba(255,255,255,0.15)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
          )}
          <div>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"28px", fontWeight:700, color:"#fff", lineHeight:1.15, marginBottom:"6px" }}>{t.name}</h2>
            <div style={{ fontSize:"13px", color:"rgba(255,255,255,0.8)" }}>{t.role}</div>
            <div style={{ fontSize:"24px", marginTop:"6px" }}>{FLAGS[t.flag]}</div>
          </div>
        </div>

        {/* Quote */}
        <div style={{ borderLeft:"3px solid rgba(255,255,255,0.4)", paddingLeft:"16px", marginBottom:"20px" }}>
          <p style={{ fontFamily:"'Playfair Display',serif", fontStyle:"italic", fontSize:"16px", lineHeight:1.5, color:"rgba(255,255,255,0.9)" }}>"{t.quote}"</p>
        </div>

        {/* Full Bio */}
        <p style={{ fontSize:"14px", lineHeight:1.8, color:"rgba(255,255,255,0.85)" }}>{t.bio}</p>
      </div>
    </div>
  );
}

/* ═══ Teacher Grid Card ═══ */
function TeacherCard({ t, m, onSelect }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={() => onSelect(t)} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{
      borderRadius:"16px", overflow:"hidden", background: C.primary, padding:"24px",
      transition:"all 0.35s", transform: hov ? "translateY(-6px)" : "none",
      boxShadow: hov ? "0 16px 40px rgba(67,97,238,0.3)" : "0 4px 16px rgba(67,97,238,0.1)", cursor:"pointer",
    }}>
      {/* Header: rounded photo + name + flag */}
      <div style={{ display:"flex", alignItems:"center", gap:"14px", marginBottom:"16px" }}>
        {t.img ? (
          <img src={t.img} alt={t.name} style={{ width:"70px", height:"70px", borderRadius:"50%", objectFit:"cover", objectPosition: t.imgPos || "top center", border:"3px solid rgba(255,255,255,0.3)", flexShrink:0 }} />
        ) : (
          <div style={{ width:"70px", height:"70px", borderRadius:"50%", background:"rgba(255,255,255,0.15)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
        )}
        <div style={{ flex:1 }}>
          <h3 style={{ fontSize:"18px", fontWeight:700, color:"#fff", marginBottom:"4px" }}>{t.name}</h3>
          <div style={{ fontSize:"11px", color:"rgba(255,255,255,0.7)" }}>{t.role}</div>
        </div>
        <div style={{ fontSize:"24px", alignSelf:"flex-start", flexShrink:0 }}>{FLAGS[t.flag]}</div>
      </div>
      {/* Quote */}
      <p style={{ fontFamily:"'Playfair Display',serif", fontStyle:"italic", fontSize:"13px", lineHeight:1.5, color:"rgba(255,255,255,0.8)", borderLeft:"2px solid rgba(255,255,255,0.4)", paddingLeft:"12px", marginBottom:"12px" }}>"{t.quote}"</p>
      {/* Full Bio */}
      <p style={{ fontSize:"13px", lineHeight:1.7, color:"rgba(255,255,255,0.75)" }}>{t.bio}</p>
    </div>
  );
}

/* ═══ MAIN ═══ */
export default function TeachersPage() {
  const m = useMobile();
  const [selected, setSelected] = useState(null);

  return (
    <>
      <style>{`
        .spin-ast { animation: spinAst 18s linear infinite; }
        @keyframes spinAst { from{transform:rotate(0)} to{transform:rotate(360deg)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
      `}</style>

      {/* ═══ HERO ═══ */}
      <section style={{
        minHeight: m ? "auto" : "60vh", width:"100%", display:"flex", flexDirection:"column",
        position:"relative", overflow:"hidden", background:"#fff",
      }}>
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

        <div style={{ flex:1, display:"flex", position:"relative", flexDirection: m ? "column" : "row", zIndex:2 }}>
          <div style={{ flex: m ? 1 : "0 0 50%", display:"flex", flexDirection:"column", justifyContent:"center", padding: m ? "40px 24px 20px" : "40px 60px 40px 48px", position:"relative" }}>
            {m && <div style={{ position:"absolute", top:"16px", right:"24px" }}><RotatingAsterisk size={72} /></div>}
            <h1 style={{ fontWeight:900, fontSize: m ? "clamp(3.5rem, 18vw, 5.5rem)" : "clamp(5rem, 9vw, 9rem)", lineHeight:0.92, letterSpacing:"-0.04em", color:C.dark, animation:"fadeUp 0.8s ease-out both" }}>OUR<br/>TEAM</h1>
            <p style={{ fontFamily:"'Playfair Display', serif", fontStyle:"italic", fontSize: m ? "22px" : "clamp(24px, 3vw, 36px)", color:C.primary, marginTop: m ? "16px" : "20px", animation:"fadeUp 0.8s ease-out 0.15s both" }}>Meet the Teachers</p>
          </div>
          {!m ? (
            <div style={{ flex:"0 0 50%", display:"flex", flexDirection:"column", justifyContent:"space-between", padding:"40px 48px 40px 40px" }}>
              <div style={{ display:"flex", justifyContent:"center", alignItems:"center", flex:1 }}><RotatingAsterisk size={130} /></div>
              <div style={{ display:"flex", alignItems:"center", gap:"12px", justifyContent:"flex-end" }}>
                <a href="/" style={{ fontSize:"14px", fontWeight:600, color:C.primary }}>Home</a>
                <span style={{ color:C.textMuted, fontSize:"14px" }}>/</span>
                <span style={{ fontSize:"14px", fontWeight:600, letterSpacing:"0.08em", color:C.text, textTransform:"uppercase" }}>Teachers</span>
              </div>
            </div>
          ) : (
            <div style={{ padding:"0 24px 20px", display:"flex", alignItems:"center", gap:"12px" }}>
              <a href="/" style={{ fontSize:"13px", fontWeight:600, color:C.primary }}>Home</a>
              <span style={{ color:C.textMuted, fontSize:"13px" }}>/</span>
              <span style={{ fontSize:"13px", fontWeight:600, letterSpacing:"0.08em", color:C.text, textTransform:"uppercase" }}>Teachers</span>
            </div>
          )}
        </div>
        <div style={{ height:"10px", background:C.primary, flexShrink:0 }} />
      </section>

      {/* ═══ INTRO ═══ */}
      <div style={{ maxWidth:"900px", margin:"0 auto", padding: m ? "40px 24px" : "64px 24px", textAlign:"center" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"12px", marginBottom:"16px" }}>
          <div style={{ width:"40px", height:"1.5px", background:C.primary }} />
          <span style={{ fontSize:"11px", fontWeight:700, letterSpacing:"0.25em", textTransform:"uppercase", color:C.primary }}>Native Speakers</span>
          <div style={{ width:"40px", height:"1.5px", background:C.primary }} />
        </div>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize: m ? "26px" : "clamp(28px, 4vw, 40px)", fontWeight:700, color:C.dark, lineHeight:1.2, marginBottom:"20px" }}>
          Experienced, professional,<br/>and <span style={{ color:C.primary, fontStyle:"italic" }}>friendly</span>
        </h2>
        <p style={{ fontSize:"15px", lineHeight:1.8, color:C.textLight, maxWidth:"650px", margin:"0 auto" }}>
          Our instructors come from the UK, US, Australia, and Canada — bringing diverse perspectives and a shared passion for teaching English in Osaka.
        </p>
      </div>

      {/* ═══ FEATURED TEACHERS ═══ */}
      <div style={{ maxWidth:"1200px", margin:"0 auto", padding: m ? "0 20px 20px" : "0 40px 40px" }}>
        {FEATURED.map((t, i) => (
          <FeaturedCard key={t.name} t={t} reverse={i % 2 === 1} m={m} />
        ))}
      </div>

      {/* ═══ PULL QUOTE ═══ */}
      <div style={{ maxWidth:"900px", margin:"0 auto", padding: m ? "0 24px" : "0 40px" }}>
        <PullQuote text="We are not a factory school. We care about each individual student and our emphasis is on education and fun." author="Michael Mccavish — Founder" />
      </div>

      {/* ═══ ALL TEACHERS GRID ═══ */}
      <div style={{ maxWidth:"1200px", margin:"0 auto", padding: m ? "20px 20px 40px" : "40px 40px 64px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"32px" }}>
          <div style={{ width:"40px", height:"1.5px", background:C.primary }} />
          <span style={{ fontSize:"11px", fontWeight:700, letterSpacing:"0.25em", textTransform:"uppercase", color:C.primary }}>Full Team</span>
          <div style={{ width:"40px", height:"1.5px", background:C.primary }} />
        </div>
        <div style={{ display:"grid", gridTemplateColumns: m ? "1fr" : "repeat(auto-fill, minmax(280px, 1fr))", gap:"24px" }}>
          {TEACHERS.map(t => <TeacherCard key={t.name} t={t} m={m} onSelect={setSelected} />)}
        </div>
      </div>

      {/* ═══ TEACHER MODAL ═══ */}
      {selected && <TeacherModal t={selected} m={m} onClose={() => setSelected(null)} />}

      {/* ═══ JOIN CTA ═══ */}
      <div style={{ background:C.primaryLight, padding: m ? "48px 24px" : "64px 40px" }}>
        <div style={{ maxWidth:"800px", margin:"0 auto", textAlign:"center" }}>
          <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize: m ? "24px" : "32px", fontWeight:700, color:C.dark, marginBottom:"16px" }}>Want to join our team?</h3>
          <p style={{ fontSize:"15px", lineHeight:1.7, color:C.textLight, marginBottom:"28px", maxWidth:"500px", margin:"0 auto 28px" }}>
            We're always looking for passionate, experienced English teachers to join Michael's English School.
          </p>
          <a href="/inquiry" style={{ display:"inline-flex", alignItems:"center", gap:"10px", padding:"16px 36px", borderRadius:"12px", background:C.primary, color:"#fff", fontSize:"15px", fontWeight:600 }}>
            Get in Touch <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </>
  );
}