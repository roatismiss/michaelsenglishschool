"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useLang } from "../components/LanguageContext";

const C = {
  primary:"#4361EE", primaryDark:"#3651D4", primaryLight:"#EEF1FF",
  accent:"#6C8AFF", dark:"#1a1a2e", text:"#333", textLight:"#666", textMuted:"#999",
};

function useMobile(bp=768){const[m,s]=useState(false);useEffect(()=>{const c=()=>s(window.innerWidth<bp);c();window.addEventListener("resize",c);return()=>window.removeEventListener("resize",c)},[bp]);return m}

function Reveal({children,delay=0}){
  const ref=useRef(null);const[v,sV]=useState(false);
  useEffect(()=>{if(!ref.current)return;const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){sV(true);o.disconnect()}},{threshold:0.15});o.observe(ref.current);return()=>o.disconnect()},[]);
  return <div ref={ref} style={{opacity:v?1:0,transform:v?"translateY(0)":"translateY(30px)",transition:`opacity 0.7s ease-out ${delay}s, transform 0.7s ease-out ${delay}s`}}>{children}</div>;
}

/* ═══ MORPHING HERO ANIMATION ═══ */
function HeroAnimation({m}){
  const containerRef=useRef(null);
  const textRef=useRef(null);
  const subRef=useRef(null);
  const idxRef=useRef(0);

  const words=[
    {text:"英会話",sub:"Conversation"},
    {text:"ビジネス",sub:"Business English"},
    {text:"キッズ",sub:"Kids Classes"},
    {text:"英検",sub:"Eiken Prep"},
    {text:"IELTS",sub:"Study Abroad"},
    {text:"出張",sub:"Corporate"},
    {text:"翻 → A",sub:"Translation"},
    {text:"Cambridge",sub:"International Exams"},
  ];

  const jpChars=["あ","え","語","読","英","学","話","書","聞"];
  const enChars=["A","B","E","R","W","S","L","K"];

  const showWord=useCallback(()=>{
    if(!textRef.current||!subRef.current)return;
    const w=words[idxRef.current];
    textRef.current.innerHTML="";
    subRef.current.style.opacity="0";
    const chars=[...w.text];
    chars.forEach((c,i)=>{
      const span=document.createElement("span");
      span.style.cssText=`display:inline-block;opacity:0;animation:charReveal 0.5s ease-out ${i*0.06}s both`;
      span.textContent=c===" "?"\u00A0":c;
      textRef.current.appendChild(span);
    });
    setTimeout(()=>{
      if(subRef.current){subRef.current.textContent=w.sub;subRef.current.style.opacity="1";}
    },chars.length*60+200);
    idxRef.current=(idxRef.current+1)%words.length;
  },[]);

  const spawnChar=useCallback(()=>{
    if(!containerRef.current)return;
    const isJp=Math.random()>0.4;
    const pool=isJp?jpChars:enChars;
    const el=document.createElement("div");
    el.style.cssText=`position:absolute;font-weight:700;opacity:0;pointer-events:none;user-select:none;color:rgba(74,108,247,${isJp?0.18:0.12});${isJp?"":"font-family:Georgia,serif;font-style:italic;"}left:${10+Math.random()*80}%;top:${20+Math.random()*60}%;font-size:${1+Math.random()*2.5}rem;animation:charFloat ${4+Math.random()*5}s linear forwards`;
    el.textContent=pool[Math.floor(Math.random()*pool.length)];
    containerRef.current.appendChild(el);
    el.addEventListener("animationend",()=>el.remove());
  },[]);

  useEffect(()=>{
    showWord();
    const wInt=setInterval(showWord,2800);
    const cInt=setInterval(spawnChar,600);
    for(let i=0;i<6;i++)setTimeout(spawnChar,i*200);
    return()=>{clearInterval(wInt);clearInterval(cInt)};
  },[showWord,spawnChar]);

  const sz=m?220:320;

  return(
    <div ref={containerRef} style={{position:"relative",width:"100%",height:m?"280px":"100%",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
      {/* Orbit rings */}
      <div style={{position:"absolute",width:sz,height:sz,border:"1.5px solid rgba(74,108,247,0.12)",borderRadius:"50%",animation:"spinSlow 30s linear infinite"}}/>
      <div style={{position:"absolute",width:sz*0.75,height:sz*0.75,border:"1.5px dashed rgba(74,108,247,0.08)",borderRadius:"50%",animation:"spinSlow 22s linear infinite reverse"}}/>
      {/* Glow */}
      <div style={{position:"absolute",width:200,height:200,background:"radial-gradient(circle,rgba(74,108,247,0.15) 0%,transparent 70%)",borderRadius:"50%",animation:"glowPulse 4s ease-in-out infinite"}}/>
      {/* Dots left */}
      {!m&&<div style={{position:"absolute",left:"8%",top:"50%",transform:"translateY(-50%)",display:"flex",gap:6}}>
        {[0,0.15,0.3].map(d=><div key={d} style={{width:6,height:6,borderRadius:"50%",background:"rgba(74,108,247,0.25)",animation:`dotTrail 2s ease-in-out ${d}s infinite`}}/>)}
      </div>}
      {/* Dots right */}
      {!m&&<div style={{position:"absolute",right:"8%",top:"50%",transform:"translateY(-50%)",display:"flex",gap:6}}>
        {[0,0.15,0.3].map(d=><div key={d} style={{width:6,height:6,borderRadius:"50%",background:"rgba(74,108,247,0.25)",animation:`dotTrailR 2s ease-in-out ${d}s infinite`}}/>)}
      </div>}
      {/* Center text */}
      <div style={{position:"relative",zIndex:2,textAlign:"center"}}>
        <div ref={textRef} style={{fontSize:m?"clamp(2.2rem,10vw,3rem)":"clamp(2.8rem,5vw,5rem)",fontWeight:900,lineHeight:1,color:C.primary,minHeight:"1.2em"}}/>
        <div ref={subRef} style={{fontSize:m?"0.8rem":"clamp(0.85rem,2.5vw,1.1rem)",color:"rgba(74,108,247,0.45)",fontWeight:400,letterSpacing:"0.15em",marginTop:"0.6rem",textTransform:"uppercase",fontFamily:"Georgia,serif",fontStyle:"italic",transition:"opacity 0.5s ease",opacity:0}}/>
      </div>
    </div>
  );
}

const COURSES=[
  {titleKey:"course_general",descKey:"course_general_desc",level:"Beginner → Advanced",href:"/courses/general"},
  {titleKey:"course_business",descKey:"course_business_desc",level:"Intermediate → Advanced",href:"/courses/business"},
  {titleKey:"course_kids",descKey:"course_kids_desc",level:"Ages 3 → Elementary",href:"/courses/kids"},
  {titleKey:"course_teacher",descKey:"course_teacher_desc",level:"For Educators",href:"/courses/instructor"},
  {titleKey:"course_eiken",descKey:"course_eiken_desc",level:"Junior → Grade 1",href:"/courses/eiken"},
  {titleKey:"course_cambridge",descKey:"course_cambridge_desc",level:"All Levels",href:"/courses/cambridge"},
  {titleKey:"course_ielts",descKey:"course_ielts_desc",level:"Band 5.0 → 8.0+",href:"/courses/ielts"},
  {titleKey:"course_onsite",descKey:"course_onsite_desc",level:"Flexible",href:"/courses/onsite"},
];

export default function CoursesPage(){
  const m=useMobile();
  const{t}=useLang();

  return(
    <>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spinSlow{to{transform:rotate(360deg)}}
        @keyframes glowPulse{0%,100%{transform:scale(1);opacity:0.6}50%{transform:scale(1.4);opacity:1}}
        @keyframes charReveal{0%{opacity:0;transform:translateY(20px) rotateX(90deg);filter:blur(8px)}100%{opacity:1;transform:translateY(0) rotateX(0deg);filter:blur(0)}}
        @keyframes charFloat{0%{transform:translateY(60px) scale(0.7);opacity:0}15%{opacity:0.15}85%{opacity:0.15}100%{transform:translateY(-60px) scale(1.1);opacity:0}}
        @keyframes dotTrail{0%,100%{opacity:0.1;transform:translateX(0)}50%{opacity:0.5;transform:translateX(12px)}}
        @keyframes dotTrailR{0%,100%{opacity:0.1;transform:translateX(0)}50%{opacity:0.5;transform:translateX(-12px)}}
      `}</style>

      {/* ═══ HERO — Split: text left, animation right ═══ */}
      <section style={{background:"#fff",position:"relative",overflow:"hidden"}}>
        {/* Vertical guide lines (desktop) */}
        {!m&&<>
          <div style={{position:"absolute",left:"12%",top:0,bottom:"10px",width:"1px",background:"#e8ecf2",zIndex:1}}/>
          <div style={{position:"absolute",left:"calc(31% - 16px)",top:0,bottom:"10px",width:"1px",background:"#e8ecf2",zIndex:1}}/>
          <div style={{position:"absolute",left:"calc(31% + 16px)",top:0,bottom:"10px",width:"1px",background:"#e8ecf2",zIndex:1}}/>
          <div style={{position:"absolute",left:"calc(50% - 16px)",top:0,bottom:"10px",width:"1px",background:"#e8ecf2",zIndex:1}}/>
          <div style={{position:"absolute",left:"calc(50% + 16px)",top:0,bottom:"10px",width:"1px",background:"#e8ecf2",zIndex:1}}/>
          <div style={{position:"absolute",left:"calc(69% - 16px)",top:0,bottom:"10px",width:"1px",background:"#e8ecf2",zIndex:1}}/>
          <div style={{position:"absolute",left:"calc(69% + 16px)",top:0,bottom:"10px",width:"1px",background:"#e8ecf2",zIndex:1}}/>
          <div style={{position:"absolute",right:"12%",top:0,bottom:"10px",width:"1px",background:"#e8ecf2",zIndex:1}}/>
        </>}

        <div style={{display:"flex",flexDirection:m?"column":"row",position:"relative",zIndex:2,padding:m?"40px 24px 0":"60px 48px 40px",minHeight:m?"auto":"420px"}}>
          {/* Left: text */}
          <div style={{flex:m?"none":"0 0 50%",display:"flex",flexDirection:"column",justifyContent:"center"}}>
            <h1 style={{fontWeight:900,fontSize:m?"clamp(3.5rem,18vw,5.5rem)":"clamp(5rem,9vw,9rem)",lineHeight:0.92,letterSpacing:"-0.04em",color:C.dark,animation:"fadeUp 0.8s ease-out both"}}>{t("courses_hero_1")}<br/>{t("courses_hero_2")}</h1>
            <p style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:m?"22px":"clamp(24px,3vw,36px)",color:C.primary,marginTop:m?"16px":"20px",animation:"fadeUp 0.8s ease-out 0.15s both"}}>{t("courses_title_hero_sub")}</p>
            {!m&&(
              <div style={{display:"flex",alignItems:"center",gap:"12px",marginTop:"auto",paddingTop:"20px"}}>
                <a href="/" style={{fontSize:"14px",fontWeight:600,color:C.primary,textDecoration:"none"}}>{t("nav_home")}</a>
                <span style={{color:C.textMuted,fontSize:"14px"}}>/</span>
                <span style={{fontSize:"14px",fontWeight:600,letterSpacing:"0.08em",color:C.text,textTransform:"uppercase"}}>{t("nav_courses")}</span>
              </div>
            )}
          </div>
          {/* Right: animation */}
          <div style={{flex:m?"none":"0 0 50%"}}>
            <HeroAnimation m={m}/>
          </div>
        </div>

        {m&&(
          <div style={{padding:"16px 24px 20px",display:"flex",alignItems:"center",gap:"12px"}}>
            <a href="/" style={{fontSize:"13px",fontWeight:600,color:C.primary,textDecoration:"none"}}>{t("nav_home")}</a>
            <span style={{color:C.textMuted,fontSize:"13px"}}>/</span>
            <span style={{fontSize:"13px",fontWeight:600,letterSpacing:"0.08em",color:C.text,textTransform:"uppercase"}}>{t("nav_courses")}</span>
          </div>
        )}
        <div style={{height:"10px",background:C.primary}}/>
      </section>

      {/* ═══ COURSE CARDS ═══ */}
      <section style={{maxWidth:"1100px",margin:"0 auto",padding:m?"40px 20px":"60px 28px"}}>
        <div style={{display:"grid",gridTemplateColumns:m?"1fr":"repeat(auto-fill, minmax(280px, 1fr))",gap:"24px"}}>
          {COURSES.map((c,i)=>(
            <Reveal key={c.titleKey} delay={i*0.05}>
              <a href={c.href} style={{textDecoration:"none",display:"block"}}>
                <div style={{
                  padding:"32px",borderRadius:"16px",border:"1.5px solid #e8ecf4",
                  transition:"all 0.3s",cursor:"pointer",background:"#fff",height:"100%"
                }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=C.primary;e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(67,97,238,0.1)"}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="#e8ecf4";e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none"}}
                >
                  <div style={{fontSize:"11px",fontWeight:700,letterSpacing:"0.1em",color:C.primary,textTransform:"uppercase",marginBottom:"8px"}}>{c.level}</div>
                  <h3 style={{fontSize:"18px",fontWeight:700,color:C.dark,marginBottom:"12px"}}>{t(c.titleKey)}</h3>
                  <p style={{fontSize:"14px",lineHeight:1.7,color:C.textLight}}>{t(c.descKey)}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
