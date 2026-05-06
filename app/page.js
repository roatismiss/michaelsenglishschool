"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useLang } from "./components/LanguageContext";
import JapaneseRain from "./components/JapaneseRain";

const C = {
  primary:"#4361EE", primaryDark:"#3651D4", primaryLight:"#EEF1FF",
  accent:"#6C8AFF", heroBg:"#E8EDF8", white:"#fff",
  dark:"#1a1a2e", text:"#333", textLight:"#666", textMuted:"#999",
};

function useTyping(w){const[t,sT]=useState("");const[wi,sW]=useState(0);const[ci,sC]=useState(0);const[d,sD]=useState(false);useEffect(()=>{const word=w[wi];if(!word)return;let x;if(!d&&ci<=word.length){x=setTimeout(()=>{sT(word.substring(0,ci));sC(c=>c+1)},120)}else if(!d&&ci>word.length){x=setTimeout(()=>sD(true),2000)}else if(d&&ci>0){x=setTimeout(()=>{sC(c=>c-1);sT(word.substring(0,ci-1))},80)}else if(d&&ci===0){sD(false);sW(i=>(i+1)%w.length)}return()=>clearTimeout(x)},[ci,d,wi,w]);return t}
function useMobile(bp=768){const[m,s]=useState(false);useEffect(()=>{const c=()=>s(window.innerWidth<bp);c();window.addEventListener("resize",c);return()=>window.removeEventListener("resize",c)},[bp]);return m}

const Social=({v})=>{const i=[{icon:<svg key="f" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>,href:"https://www.facebook.com/MichaelsEnglishSchool/"},{icon:<svg key="i" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>,href:"https://www.instagram.com/michaels.english.school/"},{icon:<svg key="y" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.4 19.6C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 001.94-2A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12z"/></svg>,href:"https://www.youtube.com/@michaelsenglishschool"},{icon:<svg key="t" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.51a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.71a8.21 8.21 0 004.76 1.52V6.79a4.84 4.84 0 01-1-.1z"/></svg>,href:"https://www.tiktok.com/@michaelsenglishschool"}];return(<div style={{display:"flex",flexDirection:v?"column":"row",alignItems:"center",gap:v?"18px":"20px"}}>{i.map((x,j)=><a key={j} href={x.href} target="_blank" rel="noopener noreferrer" style={{color:"#aab"}}>{x.icon}</a>)}</div>)};

/* ═══ DISCOVER MORE SPINNER — pure JS rotation, zero CSS dependency ═══ */
function Rot({size=100}){
  const spinRef = useRef(null);

  useEffect(()=>{
    let raf;
    let a = 0;
    const tick = () => {
      a += 0.3;
      if(spinRef.current) spinRef.current.style.transform = `rotate(${a}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  },[]);

  const text = "DISCOVER MORE • DISCOVER MORE • ";
  const chars = text.split("");

  return(
    <div style={{width:size,height:size,borderRadius:"50%",background:C.heroBg,position:"relative"}}>
      <div ref={spinRef} style={{width:"100%",height:"100%",position:"absolute",top:0,left:0}}>
        {chars.map((ch, i) => (
          <span key={i} style={{
            position:"absolute",
            left:"50%", top:"4px",
            fontSize: Math.max(size * 0.075, 7) + "px",
            fontWeight:600,
            color:"#667",
            letterSpacing:"0.05em",
            transformOrigin: `0px ${size/2 - 4}px`,
            transform: `rotate(${(360 / chars.length) * i}deg)`,
          }}>{ch}</span>
        ))}
      </div>
      <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
        <div style={{width:size*.32,height:size*.32,borderRadius:"50%",border:`1.5px solid ${C.accent}`,display:"flex",alignItems:"center",justifyContent:"center",background:C.heroBg}}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
        </div>
      </div>
    </div>
  );
}

/* ═══ ANIMATED COUNTER ═══ */
function AnimatedCounter({target, suffix="", duration=2000}){
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if(!ref.current) return;
    const obs = new IntersectionObserver(([entry]) => {
      if(entry.isIntersecting && !started) { setStarted(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);
  useEffect(() => {
    if(!started) return;
    const numTarget = parseFloat(target);
    if(isNaN(numTarget)) return;
    const steps = 60;
    const stepDuration = duration / steps;
    let current = 0;
    const timer = setInterval(() => {
      current++;
      const progress = current / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * numTarget));
      if(current >= steps) { setCount(numTarget); clearInterval(timer); }
    }, stepDuration);
    return () => clearInterval(timer);
  }, [started, target, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ═══ ABOUT ═══ */
function AboutSection({m, t}){return(
  <section style={{background:"#fff",padding:m?"48px 20px":"80px 28px"}}>
    <div style={{maxWidth:"900px",margin:"0 auto",textAlign:"center"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"12px",marginBottom:"16px"}}>
        <div style={{width:"40px",height:"1.5px",background:C.primary}}/><span style={{fontSize:"11px",fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",color:C.primary}}>{t("about_label")}</span><div style={{width:"40px",height:"1.5px",background:C.primary}}/>
      </div>
      <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"28px":"clamp(28px,5vw,44px)",fontWeight:700,color:C.dark,lineHeight:1.2,marginBottom:"28px"}}>{t("about_title_1")} <span style={{color:C.primary,fontStyle:"italic"}}>{t("about_title_highlight")}</span> {t("about_title_2")}</h2>
      <p style={{fontSize:m?"14px":"15px",lineHeight:2,color:C.textLight,maxWidth:"750px",margin:"0 auto"}}>{t("about_desc")}</p>
      <div style={{display:"flex",justifyContent:"center",gap:m?"24px":"48px",marginTop:m?"32px":"48px",flexWrap:"wrap"}}>
        {[{num:"60",suffix:"%",label:t("about_stat_beginners")},{num:"3",suffix:"",label:t("about_stat_locations")},{num:"15",suffix:"+",label:t("about_stat_years")},{num:"7",suffix:"",label:t("about_stat_levels")}].map(s=>(
          <div key={s.label} style={{textAlign:"center"}}><div style={{fontSize:m?"28px":"36px",fontWeight:900,color:C.primary,lineHeight:1}}><AnimatedCounter target={s.num} suffix={s.suffix} /></div><div style={{fontSize:"10px",fontWeight:600,letterSpacing:"0.1em",color:C.textMuted,marginTop:"6px",textTransform:"uppercase"}}>{s.label}</div></div>
        ))}
      </div>
    </div>
  </section>
)}

/* ═══ COURSES ═══ */
function CoursesSection({m, t}){
  const COURSES = [
    {icon:"GE",title:t("course_general"),desc:t("course_general_desc")},
    {icon:"BC",title:t("course_business"),desc:t("course_business_desc")},
    {icon:"KC",title:t("course_kids"),desc:t("course_kids_desc")},
    {icon:"TC",title:t("course_teacher"),desc:t("course_teacher_desc")},
    {icon:"EK",title:t("course_eiken"),desc:t("course_eiken_desc")},
    {icon:"CM",title:t("course_cambridge"),desc:t("course_cambridge_desc")},
    {icon:"IE",title:t("course_ielts"),desc:t("course_ielts_desc")},
    {icon:"OL",title:t("course_onsite"),desc:t("course_onsite_desc")},
    {icon:"FT",title:t("course_trial"),desc:t("course_trial_desc")},
  ];
  const cards=[...COURSES,...COURSES];
  return(
  <section id="courses" style={{background:C.primary,padding:m?"48px 0":"64px 0",overflow:"hidden"}}>
    <div style={{textAlign:"center",marginBottom:m?"24px":"40px",padding:"0 20px"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"12px",marginBottom:"16px"}}><div style={{width:"40px",height:"1.5px",background:"rgba(255,255,255,0.3)"}}/><span style={{fontSize:"11px",fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",color:"rgba(255,255,255,0.6)"}}>{t("courses_label")}</span><div style={{width:"40px",height:"1.5px",background:"rgba(255,255,255,0.3)"}}/></div>
      <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"26px":"clamp(28px,5vw,40px)",fontWeight:700,color:"#fff"}}>{t("courses_title")}</h2>
    </div>
    {[{a:"scrollLeft",d:"40s"},{a:"scrollRight",d:"45s"}].map((r,i)=>(
      <div key={i} style={{overflow:"hidden",marginBottom:i===0?"16px":"0"}}>
        <div style={{display:"flex",gap:m?"12px":"20px",paddingLeft:"12px",animation:`${r.a} ${r.d} linear infinite`,width:"max-content"}}>
          {(i===0?cards:[...cards].reverse()).map((c,j)=><CCard key={j} c={c} m={m}/>)}
        </div>
      </div>
    ))}
  </section>
)}
function CCard({c,m}){const[h,sH]=useState(false);return(
  <div onMouseEnter={()=>sH(true)} onMouseLeave={()=>sH(false)} style={{width:m?"240px":"300px",minWidth:m?"240px":"300px",padding:m?"20px":"28px",background:h?"#fff":"rgba(255,255,255,0.08)",borderRadius:"16px",border:h?`1.5px solid ${C.accent}`:"1.5px solid rgba(255,255,255,0.15)",cursor:"pointer",transition:"all 0.35s",transform:h?"translateY(-4px)":"none",boxShadow:h?"0 12px 30px rgba(0,0,0,0.12)":"none"}}>
    <div style={{width:"40px",height:"40px",borderRadius:"10px",background:h?C.primary:"rgba(255,255,255,0.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",fontWeight:800,color:h?"#fff":"rgba(255,255,255,0.8)",marginBottom:"12px",transition:"all 0.35s"}}>{c.icon}</div>
    <h3 style={{fontSize:m?"14px":"16px",fontWeight:700,color:h?C.dark:"#fff",marginBottom:"8px",transition:"color 0.35s"}}>{c.title}</h3>
    <p style={{fontSize:m?"12px":"13px",lineHeight:1.6,color:h?C.textLight:"rgba(255,255,255,0.65)",transition:"color 0.35s"}}>{c.desc}</p>
  </div>
)}

/* ═══ PARTNERS ═══ */
function PartnersSection({m, t}){return(
  <section style={{background:C.primaryLight,padding:m?"40px 20px":"56px 28px"}}>
    <div style={{maxWidth:"1000px",margin:"0 auto"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"12px",marginBottom:m?"24px":"40px"}}><div style={{width:"40px",height:"1.5px",background:"#ccd"}}/><span style={{fontSize:"12px",fontWeight:600,letterSpacing:"0.1em",color:C.textMuted,fontFamily:"'Playfair Display',serif",fontStyle:"italic"}}>{t("partners_label")}</span><div style={{width:"40px",height:"1.5px",background:"#ccd"}}/></div>
      <div style={{display:"grid",gridTemplateColumns:m?"1fr 1fr":"repeat(4,1fr)",gap:m?"12px":"24px"}}>
        {[{name:"Cambridge",sub:t("partners_cambridge")},{name:"IELTS",sub:t("partners_ielts")},{name:"英検",sub:t("partners_eiken")},{name:"TOEFL",sub:t("partners_toefl")}].map(p=>(
          <div key={p.name} style={{background:"#fff",borderRadius:"14px",padding:m?"20px 14px":"28px 20px",textAlign:"center",border:"1px solid #e4e8f4"}}>
            <div style={{fontSize:m?"16px":"22px",fontWeight:800,color:C.primaryDark,marginBottom:"4px"}}>{p.name}</div>
            <div style={{fontSize:m?"9px":"10px",fontWeight:500,color:C.textMuted}}>{p.sub}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
)}

/* ═══ FREE TRIAL ═══ */
function FreeTrialSection({m, t}){const[bh,sB]=useState(false);return(
  <section style={{background:"#fff",padding:m?"48px 20px 24px":"80px 0 0"}}>
    <div style={{maxWidth:"1200px",margin:"0 auto",display:"flex",flexDirection:m?"column":"row",minHeight:m?"auto":"500px"}}>
      <div style={{width:m?"100%":"45%",flexShrink:0,minHeight:m?"250px":"auto",position:"relative"}}>
        <img src="/Free_trial.webp" alt="Free trial lesson" style={{width:m?"100%":"calc(100% - 40px)",height:m?"250px":"100%",marginLeft:m?"0":"40px",borderRadius:"16px",objectFit:"cover",display:"block"}} />
      </div>
      <div style={{flex:1,background:C.primary,padding:m?"40px 24px":"80px 56px",display:"flex",flexDirection:"column",justifyContent:"center",borderRadius:m?"0 0 16px 16px":"0"}}>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"26px":"clamp(28px,4vw,38px)",fontWeight:700,color:"#fff",lineHeight:1.2,marginBottom:"20px"}}>{t("trial_title")}</h2>
        <p style={{fontSize:m?"14px":"15px",lineHeight:2,color:"rgba(255,255,255,0.75)",marginBottom:"28px"}}>{t("trial_desc")}</p>
        <a href="/inquiry" onMouseEnter={()=>sB(true)} onMouseLeave={()=>sB(false)} style={{display:"inline-flex",alignItems:"center",gap:"10px",padding:"14px 28px",borderRadius:"999px",border:"1.5px solid rgba(255,255,255,0.5)",background:bh?"#fff":"transparent",color:bh?C.primary:"#fff",fontSize:"14px",fontWeight:600,cursor:"pointer",transition:"all 0.35s",textDecoration:"none",width:"fit-content"}}>{t("trial_btn")} <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
      </div>
    </div>
  </section>
)}

/* ═══ BEGINNERS ═══ */
function BeginnersSection({m, t}){const[bh,sB]=useState(false);return(
  <section style={{background:C.primary,padding:m?"48px 20px":"80px 0"}}>
    <div style={{maxWidth:"1200px",margin:"0 auto",display:"flex",flexDirection:m?"column":"row",gap:m?"32px":"60px",alignItems:"center",padding:m?"0":"0 40px"}}>
      <div style={{flex:1}}>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"26px":"clamp(28px,4vw,40px)",fontWeight:700,color:"#fff",lineHeight:1.2,marginBottom:"20px"}}>{t("beginners_title")}</h2>
        <p style={{fontSize:m?"14px":"15px",lineHeight:2,color:"rgba(255,255,255,0.7)",marginBottom:"28px"}}>{t("beginners_desc")}</p>
        <div style={{display:"flex",gap:"24px",marginBottom:"28px",flexWrap:"wrap"}}>
          {[t("beginners_flex"), t("beginners_custom")].map(f=>(
            <div key={f} style={{display:"flex",alignItems:"center",gap:"10px"}}>
              <div style={{width:"40px",height:"40px",borderRadius:"10px",background:"rgba(255,255,255,0.12)",display:"flex",alignItems:"center",justifyContent:"center"}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></div>
              <span style={{fontSize:"13px",fontWeight:600,color:"#fff",maxWidth:"140px",lineHeight:1.3}}>{f}</span>
            </div>
          ))}
        </div>
        <a href="/tuition" onMouseEnter={()=>sB(true)} onMouseLeave={()=>sB(false)} style={{display:"inline-flex",alignItems:"center",gap:"10px",padding:"14px 28px",borderRadius:"999px",border:"1.5px solid rgba(255,255,255,0.5)",background:bh?"#fff":"transparent",color:bh?C.primary:"#fff",fontSize:"14px",fontWeight:600,cursor:"pointer",transition:"all 0.35s",textDecoration:"none"}}>{t("beginners_btn")} <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
      </div>
      <div style={{width:m?"100%":"45%",flexShrink:0,position:"relative"}}>
        <img src="/students.webp" alt="Students at Michael's English School" style={{width:"100%",height:m?"280px":"420px",borderRadius:"16px",objectFit:"cover",display:"block"}} />
        <div style={{position:"abfsolute",bottom:m?"-20px":"-30px",left:m?"16px":"-20px",zIndex:10,width:m?"220px":"260px",padding:m?"20px":"28px",background:C.primaryDark,borderRadius:"16px",boxShadow:"0 12px 30px rgba(0,0,0,0.2)"}}>
          <h4 style={{fontSize:m?"14px":"16px",fontWeight:700,color:"#fff",marginBottom:"8px"}}>{t("bargain_title").split(",")[0]}</h4>
          <p style={{fontSize:m?"12px":"13px",lineHeight:1.6,color:"rgba(255,255,255,0.65)"}}>{t("bargain_desc").substring(0,80)}...</p>
        </div>
      </div>
    </div>
  </section>
)}

/* ═══ BARGAIN ═══ */
function BargainSection({m, t}){const[bh,sB]=useState(false);return(
  <section style={{background:"#fff",padding:m?"60px 20px":"100px 0 80px"}}>
    <div style={{maxWidth:"1200px",margin:"0 auto",display:"flex",flexDirection:m?"column":"row",gap:m?"32px":"60px",alignItems:"flex-start",padding:m?"0":"0 40px"}}>
      <div style={{width:m?"100%":"45%",flexShrink:0,position:"relative"}}>
        <img src="/japanese_cheering.webp" alt="Happy student" style={{width:"100%",height:m?"280px":"480px",borderRadius:"16px",objectFit:"cover",display:"block"}} />
        {!m&&<div style={{position:"absolute",top:"40px",right:"-24px",display:"flex",flexDirection:"column",gap:"12px"}}>{Array(8).fill(0).map((_,i)=><div key={i} style={{display:"flex",gap:"12px"}}><div style={{width:"6px",height:"6px",borderRadius:"50%",background:C.accent,opacity:0.5}}/><div style={{width:"6px",height:"6px",borderRadius:"50%",background:C.accent,opacity:0.5}}/></div>)}</div>}
        <div style={{position:"absolute",bottom:m?"-16px":"-20px",right:m?"16px":"-30px",zIndex:10,width:m?"220px":"280px",padding:m?"20px":"28px",background:C.primary,borderRadius:"16px",boxShadow:"0 16px 40px rgba(67,97,238,0.3)"}}>
          <h4 style={{fontSize:m?"14px":"17px",fontWeight:700,color:"#fff",marginBottom:"8px"}}>{t("bargain_title").split(",")[0]}</h4>
          <p style={{fontSize:m?"12px":"13px",lineHeight:1.65,color:"rgba(255,255,255,0.7)"}}>{t("bargain_desc").substring(0,80)}...</p>
        </div>
      </div>
      <div style={{flex:1,paddingTop:m?"24px":"16px"}}>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"26px":"clamp(28px,4vw,42px)",fontWeight:700,color:C.dark,lineHeight:1.15,marginBottom:"24px"}}>{t("bargain_title")}</h2>
        <p style={{fontSize:m?"14px":"15px",lineHeight:2,color:C.textLight,marginBottom:"28px"}}>{t("bargain_desc")}</p>
        <div style={{display:"flex",gap:m?"20px":"36px",marginBottom:"32px",flexWrap:"wrap"}}>
          {[t("bargain_private"), t("bargain_group")].map(f=>(
            <div key={f} style={{display:"flex",alignItems:"center",gap:"12px"}}>
              <div style={{width:"44px",height:"44px",borderRadius:"50%",background:C.primaryLight,display:"flex",alignItems:"center",justifyContent:"center"}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></div>
              <span style={{fontSize:"13px",fontWeight:700,color:C.dark,lineHeight:1.3}}>{f}</span>
            </div>
          ))}
        </div>
        <a href="/tuition" onMouseEnter={()=>sB(true)} onMouseLeave={()=>sB(false)} style={{display:"inline-flex",alignItems:"center",gap:"10px",padding:"16px 32px",borderRadius:"12px",background:bh?C.primaryDark:C.primary,color:"#fff",fontSize:"14px",fontWeight:600,cursor:"pointer",transition:"all 0.35s",textDecoration:"none",boxShadow:bh?"0 8px 24px rgba(67,97,238,0.35)":"0 4px 12px rgba(67,97,238,0.2)"}}>{t("bargain_btn")} <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
      </div>
    </div>
  </section>
)}

/* ═══ MAIN ═══ */
export default function App(){
  const { t } = useLang();
  const words = t("hero_words");
  const typed = useTyping(Array.isArray(words) ? words : ["SPEAK"]);
  const m = useMobile();

  const locations = [
    { name: t("hero_tennoji"), addr: t("hero_tennoji_addr"), tel: "06-4397-0170" },
    { name: t("hero_furuichi"), addr: t("hero_furuichi_addr"), tel: "06-4397-0170" },
  ];

  return(
    <div style={{fontFamily:"'DM Sans','Noto Sans JP',sans-serif",width:"100%"}}>
      <style dangerouslySetInnerHTML={{__html:`
        .cursor-blink{animation:blink 1s step-end infinite}
        @keyframes blink{0%,50%{opacity:1}51%,100%{opacity:0}}
        .marquee-move{display:inline-block;animation:slide 25s linear infinite}
        @keyframes slide{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        .bounce-arrow{animation:bounceY 2s ease-in-out infinite}
        @keyframes bounceY{0%,100%{transform:translateY(0)}50%{transform:translateY(5px)}}
        @keyframes scrollLeft{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes scrollRight{0%{transform:translateX(-50%)}100%{transform:translateX(0)}}
      `}} />

      {/* ═══ HERO ═══ */}
      {m?(
        <div>
          <div style={{background:"#fff",padding:"20px 20px 28px",position:"relative",overflow:"hidden"}}><JapaneseRain /><div style={{position:"relative",zIndex:2}}><div style={{marginBottom:"16px"}}><Social v={false}/></div><h1 style={{fontWeight:900,fontSize:"clamp(3rem,16vw,5.5rem)",lineHeight:0.9,letterSpacing:"-0.04em",color:C.dark}}>{typed}<span className="cursor-blink" style={{display:"inline-block",width:"3px",height:"0.8em",background:"#bbc",marginLeft:"3px",verticalAlign:"baseline"}}/></h1><div style={{display:"flex",alignItems:"center",gap:"8px",marginTop:"16px"}}><div style={{width:"2px",height:"20px",background:"#bbc",flexShrink:0}}/><div style={{overflow:"hidden",flex:1}}><div className="marquee-move" style={{whiteSpace:"nowrap",fontSize:"12px",fontWeight:600,letterSpacing:"0.18em",color:"#889",textTransform:"uppercase"}}>{Array(10).fill(t("hero_marquee")).join("  •  ")}</div></div><div style={{width:"2px",height:"20px",background:"#bbc",flexShrink:0}}/></div></div></div>
          <div style={{background:C.heroBg,padding:"28px 20px"}}><p style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"20px",lineHeight:1.4,color:C.text,marginBottom:"24px"}}>{t("hero_tagline")}</p>{locations.map(l=><div key={l.name} style={{marginBottom:"20px"}}><h3 style={{fontSize:"20px",fontWeight:700,color:C.dark,marginBottom:"8px"}}>{l.name}</h3><a href={`tel:${l.tel.replace(/-/g,"")}`} style={{display:"flex",alignItems:"center",gap:"8px",fontSize:"15px",color:C.text,marginBottom:"6px"}}><svg width="16" height="16" viewBox="0 0 24 24" fill={C.primary}><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.32.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z"/></svg>{l.tel}</a><span style={{fontSize:"13px",color:C.textLight}}>{l.addr}</span></div>)}<div style={{position:"relative",marginTop:"12px"}}><img src="/Learn_english.webp" alt="Do you speak English?" style={{width:"100%",height:"280px",borderRadius:"16px",objectFit:"cover",display:"block"}} /><div style={{position:"absolute",bottom:"-36px",left:"50%",transform:"translateX(-50%)",zIndex:20}}><Rot size={100}/></div></div><div style={{height:"50px"}}/></div>
        </div>
      ):(
        <div style={{height:"calc(100vh - 88px)",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:0,left:0,right:0,height:"52%",background:"#fff"}}/><div style={{position:"absolute",bottom:0,left:0,right:0,height:"48%",background:C.heroBg}}/>
          <JapaneseRain />
          <div style={{position:"relative",zIndex:10,display:"flex",height:"100%"}}><div style={{width:"40px",flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",paddingLeft:"14px"}}><Social v={true}/></div><div style={{flex:1,display:"flex",flexDirection:"column"}}><div style={{flex:"52",display:"flex",alignItems:"center",paddingLeft:"28px"}}><div><h1 style={{fontWeight:900,fontSize:"clamp(3.5rem,13vw,8rem)",lineHeight:0.9,letterSpacing:"-0.04em",color:C.dark,whiteSpace:"nowrap"}}>{typed}<span className="cursor-blink" style={{display:"inline-block",width:"3px",height:"0.82em",background:"#bbc",marginLeft:"4px",verticalAlign:"baseline"}}/></h1><div style={{display:"flex",alignItems:"center",gap:"10px",marginTop:"18px"}}><div style={{width:"2px",height:"22px",background:"#bbc",flexShrink:0}}/><div style={{overflow:"hidden",maxWidth:"400px"}}><div className="marquee-move" style={{whiteSpace:"nowrap",fontSize:"13px",fontWeight:600,letterSpacing:"0.18em",color:"#889",textTransform:"uppercase"}}>{Array(10).fill(t("hero_marquee")).join("  •  ")}</div></div><div style={{width:"2px",height:"22px",background:"#bbc",flexShrink:0}}/></div></div></div>
            <div style={{flex:"48",display:"flex",paddingTop:"24px",paddingLeft:"28px"}}><div style={{flex:1,paddingRight:"20px"}}><p style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"clamp(18px,3vw,26px)",lineHeight:1.45,color:C.text,marginBottom:"28px"}}>{t("hero_tagline")}</p><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"28px"}}>{locations.map(l=><div key={l.name} style={{paddingLeft:"14px",borderLeft:`2.5px solid ${C.primary}`}}><h3 style={{fontSize:"22px",fontWeight:700,color:C.dark,marginBottom:"10px"}}>{l.name}</h3><div style={{display:"flex",flexDirection:"column",gap:"8px"}}><a href={`tel:${l.tel.replace(/-/g,"")}`} style={{display:"flex",alignItems:"center",gap:"8px",fontSize:"15px",color:C.text}}><svg width="16" height="16" viewBox="0 0 24 24" fill={C.primary}><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.32.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z"/></svg>{l.tel}</a><span style={{fontSize:"13px",color:C.textLight}}>{l.addr}</span></div></div>)}</div></div>
              <div style={{width:"32%",flexShrink:0,position:"relative"}}><div style={{position:"absolute",top:"0",right:"16px",bottom:"24px",width:"calc(100% - 16px)",borderRadius:"18px",overflow:"hidden"}}><img src="/Learn_english.webp" alt="Do you speak English?" style={{width:"100%",height:"100%",objectFit:"cover"}} /></div><div style={{position:"absolute",top:"50%",left:"-10px",transform:"translateY(-50%)",zIndex:20}}><Rot size={100}/></div></div>
            </div>
          </div></div>
          <div style={{position:"absolute",bottom:"14%",left:"18px",zIndex:30,display:"flex",flexDirection:"column",alignItems:"center",gap:"6px"}}><div style={{width:"2px",height:"24px",background:C.primary}}/><div className="bounce-arrow" style={{width:"34px",height:"34px",borderRadius:"50%",border:`1.5px solid ${C.accent}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2"><path d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg></div></div>
        </div>
      )}

      <AboutSection m={m} t={t}/>
      <PartnersSection m={m} t={t}/>
      <CoursesSection m={m} t={t}/>
      <FreeTrialSection m={m} t={t}/>
      <BeginnersSection m={m} t={t}/>
      <BargainSection m={m} t={t}/>
    </div>
  );
}