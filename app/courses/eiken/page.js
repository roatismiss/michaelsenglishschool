"use client";
import { useState, useEffect, useRef } from "react";
import { useLang } from "../../components/LanguageContext";

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

function RotatingAsterisk({size=120}){
  return(
    <div className="spin-ast" style={{width:size,height:size}}>
      <svg viewBox="0 0 100 100" width={size} height={size} fill="none" stroke={C.primary} strokeWidth="1.5" strokeLinejoin="round">
        {[0,60,120,180,240,300].map(a=><polygon key={a} points="46,44 54,44 60,8 40,8" transform={`rotate(${a} 50 50)`}/>)}
      </svg>
    </div>
  );
}

function AccordionItem({num,title,items,extraContent,open,onToggle,m}){
  return(
    <div style={{borderRadius:"16px",border:`1.5px solid ${open?C.primary:"#e4e8f2"}`,overflow:"hidden",marginBottom:"16px",transition:"border-color 0.3s"}}>
      <div onClick={onToggle} style={{padding:m?"18px 20px":"20px 28px",cursor:"pointer",background:open?C.primary:C.primaryLight,display:"flex",alignItems:"center",justifyContent:"space-between",gap:"16px",transition:"background 0.3s"}}>
        <div style={{display:"flex",alignItems:"center",gap:"14px"}}>
          <div style={{width:"32px",height:"32px",borderRadius:"8px",background:open?"rgba(255,255,255,0.2)":"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <span style={{fontSize:"13px",fontWeight:800,color:open?"#fff":C.primary}}>{num}</span>
          </div>
          <span style={{fontSize:m?"15px":"17px",fontWeight:700,color:open?"#fff":C.dark}}>{title}</span>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={open?"#fff":C.primary} strokeWidth="2.5" style={{transition:"transform 0.3s",transform:open?"rotate(180deg)":"rotate(0)",flexShrink:0}}><path d="M6 9l6 6 6-6"/></svg>
      </div>
      <div style={{maxHeight:open?"2000px":"0",overflow:"hidden",transition:"max-height 0.5s ease-out"}}>
        <div style={{background:"#fff",padding:open?(m?"20px 20px 24px":"24px 28px 28px"):"0 28px"}}>
          {items&&items.length>0&&(
            <ul style={{listStyle:"none",margin:0,padding:0,display:"flex",flexDirection:"column",gap:"12px"}}>
              {items.map((item,i)=>(
                <li key={i} style={{display:"flex",gap:"10px",alignItems:"flex-start"}}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2.5" style={{flexShrink:0,marginTop:"2px"}}><path d="M20 6L9 17l-5-5"/></svg>
                  <span style={{fontSize:"15px",lineHeight:1.7,color:C.textLight}}>{item}</span>
                </li>
              ))}
            </ul>
          )}
          {extraContent&&<div style={{marginTop:items&&items.length>0?"20px":"0"}}>{extraContent}</div>}
        </div>
      </div>
    </div>
  );
}

/* ═══ Animated Counter ═══ */
function Counter({target,suffix=""}){
  const[count,setCount]=useState(0);const[started,setStarted]=useState(false);const ref=useRef(null);
  useEffect(()=>{if(!ref.current)return;const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){setStarted(true);o.disconnect()}},{threshold:0.3});o.observe(ref.current);return()=>o.disconnect()},[]);
  useEffect(()=>{if(!started)return;const n=parseFloat(target);if(isNaN(n))return;const steps=60;let c=0;const t=setInterval(()=>{c++;const p=1-Math.pow(1-c/steps,3);setCount(Math.round(p*n));if(c>=steps){setCount(n);clearInterval(t)}},33);return()=>clearInterval(t)},[started,target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

export default function EikenPage(){
  const[openId,setOpenId]=useState(1);
  const m=useMobile();
  const{t}=useLang();

  const keypoints=[
    {icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,key:"eiken_kp1"},
    {icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,key:"eiken_kp2"},
    {icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,key:"eiken_kp3"},
    {icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/></svg>,key:"eiken_kp4"},
  ];

  return(
    <>
      <style>{`
        .spin-ast{animation:spinAst 18s linear infinite}
        @keyframes spinAst{from{transform:rotate(0)}to{transform:rotate(360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      {/* ═══ HERO ═══ */}
      <section style={{background:"#fff",position:"relative",overflow:"hidden"}}>
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
        <div style={{display:"flex",flexDirection:m?"column":"row",position:"relative",zIndex:2,padding:m?"40px 24px 24px":"60px 48px 40px"}}>
          <div style={{flex:m?"none":"0 0 50%",position:"relative"}}>
            {m&&<div style={{position:"absolute",top:0,right:0}}><RotatingAsterisk size={72}/></div>}
            <h1 style={{fontWeight:900,fontSize:m?"clamp(3rem,16vw,5rem)":"clamp(4.5rem,8vw,8rem)",lineHeight:0.92,letterSpacing:"-0.04em",color:C.dark,animation:"fadeUp 0.8s ease-out both"}}>{t("eiken_hero_1")}<br/>{t("eiken_hero_2")}</h1>
            <p style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:m?"22px":"clamp(24px,3vw,36px)",color:C.primary,marginTop:m?"16px":"20px",animation:"fadeUp 0.8s ease-out 0.15s both"}}>{t("eiken_hero_sub")}</p>
          </div>
          {!m&&(
            <div style={{flex:"0 0 50%",display:"flex",flexDirection:"column",justifyContent:"space-between",paddingLeft:"40px"}}>
              <div style={{display:"flex",justifyContent:"center",alignItems:"center",flex:1}}><RotatingAsterisk size={130}/></div>
              <div style={{display:"flex",alignItems:"center",gap:"12px",justifyContent:"flex-end"}}>
                <a href="/" style={{fontSize:"14px",fontWeight:600,color:C.primary,textDecoration:"none"}}>{t("nav_home")}</a>
                <span style={{color:C.textMuted,fontSize:"14px"}}>/</span>
                <a href="/courses" style={{fontSize:"14px",fontWeight:600,color:C.primary,textDecoration:"none"}}>{t("nav_courses")}</a>
                <span style={{color:C.textMuted,fontSize:"14px"}}>/</span>
                <span style={{fontSize:"14px",fontWeight:600,letterSpacing:"0.08em",color:C.text,textTransform:"uppercase"}}>{t("eiken_breadcrumb")}</span>
              </div>
            </div>
          )}
        </div>
        {m&&(
          <div style={{padding:"0 24px 20px",display:"flex",alignItems:"center",gap:"12px"}}>
            <a href="/" style={{fontSize:"13px",fontWeight:600,color:C.primary,textDecoration:"none"}}>{t("nav_home")}</a>
            <span style={{color:C.textMuted,fontSize:"13px"}}>/</span>
            <a href="/courses" style={{fontSize:"13px",fontWeight:600,color:C.primary,textDecoration:"none"}}>{t("nav_courses")}</a>
            <span style={{color:C.textMuted,fontSize:"13px"}}>/</span>
            <span style={{fontSize:"13px",fontWeight:600,letterSpacing:"0.08em",color:C.text,textTransform:"uppercase"}}>{t("eiken_breadcrumb")}</span>
          </div>
        )}
        <div style={{height:"10px",background:C.primary}}/>
      </section>

      {/* ═══ INTRO ═══ */}
      <section style={{background:"#fff",padding:m?"48px 24px":"80px 40px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto",textAlign:"center"}}>
          <Reveal>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"12px",marginBottom:"16px"}}>
              <div style={{width:"40px",height:"1.5px",background:C.primary}}/><span style={{fontSize:"11px",fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",color:C.primary}}>{t("eiken_intro_label")}</span><div style={{width:"40px",height:"1.5px",background:C.primary}}/>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"14px",color:C.textMuted,marginBottom:"8px"}}>{t("eiken_intro_subtitle")}</p>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"26px":"clamp(28px,5vw,40px)",fontWeight:700,color:C.dark,lineHeight:1.2,marginBottom:"28px"}}>{t("eiken_intro_title")}</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{fontSize:m?"15px":"17px",lineHeight:1.8,color:C.textLight,maxWidth:"700px",margin:"0 auto"}}>{t("eiken_intro_desc")}</p>
          </Reveal>
        </div>
      </section>

      {/* ═══ KEY POINTS ═══ */}
      <section style={{background:C.primary,padding:m?"48px 24px":"64px 40px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto"}}>
          <Reveal>
            <h2 style={{fontSize:m?"24px":"32px",fontWeight:800,color:"#fff",marginBottom:"32px"}}>{t("eiken_kp_title")}</h2>
          </Reveal>
          <div style={{display:"flex",flexDirection:"column",gap:"16px"}}>
            {keypoints.map((kp,i)=>(
              <Reveal key={kp.key} delay={i*0.08}>
                <div style={{display:"flex",alignItems:"center",gap:"16px"}}>
                  <div style={{width:"36px",height:"36px",borderRadius:"10px",background:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{kp.icon}</div>
                  <span style={{fontSize:m?"14px":"16px",fontWeight:600,color:"#fff"}}>{t(kp.key)}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STUDY METHOD ═══ */}
      <section style={{background:"#fff",padding:m?"48px 24px":"80px 40px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto"}}>
          <Reveal>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"26px":"36px",fontWeight:700,color:C.dark,marginBottom:"24px"}}>{t("eiken_method_title")}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{fontSize:"15px",lineHeight:1.8,color:C.textLight,marginBottom:"16px"}}>{t("eiken_method_desc1")}</p>
            <p style={{fontSize:"15px",lineHeight:1.8,color:C.textLight}}>{t("eiken_method_desc2")}</p>
          </Reveal>
        </div>
      </section>

      {/* ═══ TESTIMONIAL 1 — Ruka ═══ */}
      <section style={{background:C.primaryLight,padding:m?"48px 24px":"64px 40px"}}>
        <div style={{maxWidth:"600px",margin:"0 auto",textAlign:"center"}}>
          <Reveal>
            <div style={{fontSize:"48px",color:C.accent,fontFamily:"Georgia,serif",lineHeight:1,marginBottom:"20px"}}>&ldquo;</div>
            <p style={{fontSize:"15px",lineHeight:1.8,color:C.textLight,fontStyle:"italic",marginBottom:"20px"}}>{t("eiken_test1_quote")}</p>
            <p style={{fontSize:"16px",fontWeight:700,color:C.dark}}>Ruka</p>
            <p style={{fontSize:"13px",color:C.textMuted}}>{t("eiken_test1_role")}</p>
            <div style={{fontSize:"48px",color:C.accent,fontFamily:"Georgia,serif",lineHeight:1,marginTop:"16px",textAlign:"right"}}>&rdquo;</div>
          </Reveal>
        </div>
      </section>

      {/* ═══ COURSE TYPES ═══ */}
      <section style={{background:"#fff",padding:m?"48px 24px":"80px 40px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto"}}>
          <Reveal>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"26px":"36px",fontWeight:700,color:C.dark,marginBottom:"36px"}}>{t("eiken_types_title")}</h2>
          </Reveal>

          <Reveal>
            <AccordionItem num={1} title={t("eiken_type1_title")}
              items={[]} extraContent={<p style={{fontSize:"15px",lineHeight:1.8,color:C.textLight}}>{t("eiken_type1_desc")}</p>}
              open={openId===1} onToggle={()=>setOpenId(openId===1?null:1)} m={m}/>
          </Reveal>
          <Reveal delay={0.05}>
            <AccordionItem num={2} title={t("eiken_type2_title")}
              items={[]} extraContent={<p style={{fontSize:"15px",lineHeight:1.8,color:C.textLight}}>{t("eiken_type2_desc")}</p>}
              open={openId===2} onToggle={()=>setOpenId(openId===2?null:2)} m={m}/>
          </Reveal>
          <Reveal delay={0.1}>
            <AccordionItem num={3} title={t("eiken_type3_title")}
              items={[]} extraContent={<p style={{fontSize:"15px",lineHeight:1.8,color:C.textLight}}>{t("eiken_type3_desc")}</p>}
              open={openId===3} onToggle={()=>setOpenId(openId===3?null:3)} m={m}/>
          </Reveal>
        </div>
      </section>

      {/* ═══ NATIVE SPEAKER NOTE ═══ */}
      <section style={{background:"#fff",padding:m?"32px 24px":"48px 40px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto"}}>
          <Reveal>
            <p style={{fontSize:"15px",lineHeight:1.8,color:C.textLight}}>{t("eiken_native_desc")}</p>
          </Reveal>
        </div>
      </section>

      {/* ═══ TESTIMONIAL 2 — Nili ═══ */}
      <section style={{background:C.primary,padding:m?"48px 24px":"64px 40px"}}>
        <div style={{maxWidth:"600px",margin:"0 auto",textAlign:"center"}}>
          <Reveal>
            <div style={{fontSize:"48px",color:C.accent,fontFamily:"Georgia,serif",lineHeight:1,marginBottom:"20px"}}>&ldquo;</div>
            <p style={{fontSize:"15px",lineHeight:1.8,color:"rgba(255,255,255,0.9)",fontStyle:"italic",marginBottom:"20px"}}>{t("eiken_test2_quote")}</p>
            <p style={{fontSize:"16px",fontWeight:700,color:"#fff"}}>Nili Roberts</p>
            <p style={{fontSize:"13px",color:"rgba(255,255,255,0.6)"}}>{t("eiken_test2_role")}</p>
            <div style={{fontSize:"48px",color:C.accent,fontFamily:"Georgia,serif",lineHeight:1,marginTop:"16px",textAlign:"right"}}>&rdquo;</div>
          </Reveal>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section style={{background:C.primaryLight,padding:m?"48px 24px":"64px 40px"}}>
        <div style={{maxWidth:"600px",margin:"0 auto",textAlign:"center"}}>
          <Reveal>
            <div style={{fontSize:m?"48px":"72px",fontWeight:900,color:C.primary,fontFamily:"'Playfair Display',serif",fontStyle:"italic"}}><Counter target={285}/></div>
            <p style={{fontSize:"18px",fontWeight:600,color:C.dark,marginTop:"8px"}}>{t("eiken_stat_label")}</p>
          </Reveal>
        </div>
      </section>

      {/* ═══ FREE TRIAL CTA ═══ */}
      <section style={{background:"#fff",padding:m?"48px 24px":"64px 40px"}}>
        <div style={{maxWidth:"800px",margin:"0 auto",display:"flex",alignItems:m?"flex-start":"center",gap:"24px",flexDirection:m?"column":"row"}}>
          <Reveal>
            <div style={{width:"56px",height:"56px",borderRadius:"50%",background:C.primaryLight,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{fontSize:"15px",lineHeight:1.8,color:C.textLight,flex:1}}>{t("eiken_trial_desc")}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <a href="/inquiry" style={{padding:"14px 32px",borderRadius:"12px",background:C.primary,color:"#fff",fontSize:"14px",fontWeight:600,textDecoration:"none",whiteSpace:"nowrap",flexShrink:0,transition:"background 0.3s"}}
              onMouseEnter={e=>e.currentTarget.style.background=C.primaryDark}
              onMouseLeave={e=>e.currentTarget.style.background=C.primary}>
              {t("eiken_trial_btn")}
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
