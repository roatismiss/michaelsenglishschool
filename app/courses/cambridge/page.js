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

function AccordionItem({num,title,items,open,onToggle,m}){
  return(
    <div style={{borderRadius:"16px",border:`1.5px solid ${open?C.primary:"#e4e8f2"}`,overflow:"hidden",marginBottom:"16px",transition:"border-color 0.3s"}}>
      <div onClick={onToggle} style={{padding:m?"18px 20px":"20px 28px",cursor:"pointer",background:open?C.primary:C.primaryLight,display:"flex",alignItems:"center",justifyContent:"space-between",gap:"12px",transition:"background 0.3s"}}>
        <div style={{display:"flex",alignItems:"center",gap:"14px",minWidth:0}}>
          <div style={{width:"32px",height:"32px",borderRadius:"8px",background:open?"rgba(255,255,255,0.2)":"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <span style={{fontSize:"13px",fontWeight:800,color:open?"#fff":C.primary}}>{num}</span>
          </div>
          <span style={{fontSize:m?"13px":"15px",fontWeight:700,color:open?"#fff":C.dark}}>{title}</span>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={open?"#fff":C.primary} strokeWidth="2.5" style={{transition:"transform 0.3s",transform:open?"rotate(180deg)":"rotate(0)",flexShrink:0}}><path d="M6 9l6 6 6-6"/></svg>
      </div>
      <div style={{maxHeight:open?"2000px":"0",overflow:"hidden",transition:"max-height 0.5s ease-out"}}>
        <div style={{background:"#fff",padding:open?(m?"20px 20px 24px":"24px 28px 28px"):"0 28px"}}>
          <ul style={{listStyle:"none",margin:0,padding:0,display:"flex",flexDirection:"column",gap:"12px"}}>
            {items.map((item,i)=>(
              <li key={i} style={{display:"flex",gap:"10px",alignItems:"flex-start"}}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2.5" style={{flexShrink:0,marginTop:"2px"}}><path d="M20 6L9 17l-5-5"/></svg>
                <span style={{fontSize:"15px",lineHeight:1.7,color:C.textLight}}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function CambridgePage(){
  const[openId,setOpenId]=useState(1);
  const m=useMobile();
  const{t}=useLang();

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
            <h1 style={{fontWeight:900,fontSize:m?"clamp(2.5rem,12vw,4rem)":"clamp(3.5rem,6vw,6.5rem)",lineHeight:0.92,letterSpacing:"-0.04em",color:C.dark,animation:"fadeUp 0.8s ease-out both"}}>{t("cam_hero_1")}<br/>{t("cam_hero_2")}</h1>
            <p style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:m?"20px":"clamp(22px,3vw,32px)",color:C.primary,marginTop:m?"16px":"20px",animation:"fadeUp 0.8s ease-out 0.15s both"}}>{t("cam_hero_sub")}</p>
          </div>
          {!m&&(
            <div style={{flex:"0 0 50%",display:"flex",flexDirection:"column",justifyContent:"space-between",paddingLeft:"40px"}}>
              <div style={{display:"flex",justifyContent:"center",alignItems:"center",flex:1}}><RotatingAsterisk size={130}/></div>
              <div style={{display:"flex",alignItems:"center",gap:"12px",justifyContent:"flex-end"}}>
                <a href="/" style={{fontSize:"14px",fontWeight:600,color:C.primary,textDecoration:"none"}}>{t("nav_home")}</a>
                <span style={{color:C.textMuted,fontSize:"14px"}}>/</span>
                <a href="/courses" style={{fontSize:"14px",fontWeight:600,color:C.primary,textDecoration:"none"}}>{t("nav_courses")}</a>
                <span style={{color:C.textMuted,fontSize:"14px"}}>/</span>
                <span style={{fontSize:"14px",fontWeight:600,letterSpacing:"0.08em",color:C.text,textTransform:"uppercase"}}>{t("cam_breadcrumb")}</span>
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
            <span style={{fontSize:"13px",fontWeight:600,letterSpacing:"0.08em",color:C.text,textTransform:"uppercase"}}>{t("cam_breadcrumb")}</span>
          </div>
        )}
        <div style={{height:"10px",background:C.primary}}/>
      </section>

      {/* ═══ INTRO ═══ */}
      <section style={{background:"#fff",padding:m?"48px 24px":"80px 40px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto",textAlign:"center"}}>
          <Reveal>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"12px",marginBottom:"16px"}}>
              <div style={{width:"40px",height:"1.5px",background:C.primary}}/><span style={{fontSize:"11px",fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",color:C.primary}}>{t("cam_intro_label")}</span><div style={{width:"40px",height:"1.5px",background:C.primary}}/>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"14px",color:C.textMuted,marginBottom:"8px"}}>{t("cam_intro_subtitle")}</p>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"24px":"clamp(28px,5vw,38px)",fontWeight:700,color:C.dark,lineHeight:1.2,marginBottom:"28px"}}>{t("cam_intro_title")}</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{fontSize:m?"15px":"17px",lineHeight:1.8,color:C.textLight,maxWidth:"750px",margin:"0 auto"}}>{t("cam_intro_desc")}</p>
          </Reveal>
        </div>
      </section>

      {/* ═══ ABOUT ADVANCED QUALIFICATIONS ═══ */}
      <section style={{background:C.primaryLight,padding:m?"48px 24px":"80px 40px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto"}}>
          <Reveal>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"24px":"32px",fontWeight:700,color:C.dark,marginBottom:"24px"}}>{t("cam_advanced_title")}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{fontSize:"15px",lineHeight:1.8,color:C.textLight,marginBottom:"16px"}}>{t("cam_advanced_desc1")}</p>
            <p style={{fontSize:"15px",lineHeight:1.8,color:C.textLight,marginBottom:"16px"}}>{t("cam_advanced_desc2")}</p>
            <p style={{fontSize:"15px",lineHeight:1.8,color:C.textLight,marginBottom:"16px"}}>{t("cam_advanced_desc3")}</p>
            <p style={{fontSize:"15px",lineHeight:1.8,color:C.textLight}}>{t("cam_advanced_desc4")}</p>
          </Reveal>
        </div>
      </section>

      {/* ═══ CEFR LEVELS ═══ */}
      <section style={{background:"#fff",padding:m?"48px 24px":"80px 40px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto"}}>
          <Reveal>
            <h2 style={{fontSize:m?"28px":"40px",fontWeight:900,color:C.dark,marginBottom:"36px"}}>CEFR Levels</h2>
          </Reveal>

          <Reveal>
            <AccordionItem num={"B2"} title="FCE: First Certificate in English (CEFR B2)"
              items={[
                t("cam_fce_1"),t("cam_fce_2"),t("cam_fce_3"),t("cam_fce_4"),
              ]}
              open={openId===1} onToggle={()=>setOpenId(openId===1?null:1)} m={m}/>
          </Reveal>

          <Reveal delay={0.05}>
            <AccordionItem num={"C1"} title="CAE: Certificate of Advanced English (CEFR C1/C2) * Grade B,C=C1, Grade A=C2"
              items={[
                t("cam_cae_1"),t("cam_cae_2"),t("cam_cae_3"),t("cam_cae_4"),
              ]}
              open={openId===2} onToggle={()=>setOpenId(openId===2?null:2)} m={m}/>
          </Reveal>

          <Reveal delay={0.1}>
            <AccordionItem num={"C2"} title="CPE: Certificate of Proficiency in English (CEFR C2)"
              items={[
                t("cam_cpe_1"),t("cam_cpe_2"),t("cam_cpe_3"),
              ]}
              open={openId===3} onToggle={()=>setOpenId(openId===3?null:3)} m={m}/>
          </Reveal>

          <Reveal delay={0.15}>
            <p style={{fontSize:"15px",lineHeight:1.8,color:C.textLight,marginTop:"24px"}}>{t("cam_closing")}</p>
          </Reveal>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{background:C.primaryLight,padding:m?"48px 24px":"64px 40px",textAlign:"center"}}>
        <Reveal>
          <div style={{display:"inline-block",background:"#fff",borderRadius:"999px",padding:"6px 18px",marginBottom:"20px"}}>
            <span style={{fontSize:"12px",fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:C.primary}}>{t("cam_cta_label")}</span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"28px":"clamp(28px,5vw,40px)",fontWeight:700,color:C.dark,lineHeight:1.2,marginBottom:"32px"}}>{t("cam_cta_title")}</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"16px",flexWrap:"wrap"}}>
            <a href="/inquiry" style={{padding:"14px 32px",borderRadius:"12px",background:C.primary,color:"#fff",fontSize:"14px",fontWeight:600,textDecoration:"none",transition:"background 0.3s"}}
              onMouseEnter={e=>e.currentTarget.style.background=C.primaryDark}
              onMouseLeave={e=>e.currentTarget.style.background=C.primary}>
              {t("cam_cta_trial")}
            </a>
            <a href="/access" style={{padding:"14px 32px",borderRadius:"12px",background:"transparent",border:`1.5px solid ${C.primary}`,color:C.primary,fontSize:"14px",fontWeight:600,textDecoration:"none",transition:"all 0.3s"}}
              onMouseEnter={e=>{e.currentTarget.style.background=C.primary;e.currentTarget.style.color="#fff"}}
              onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=C.primary}}>
              {t("cam_cta_access")}
            </a>
            <a href="tel:0643970170" style={{padding:"14px 32px",borderRadius:"12px",border:"1.5px solid #ccc",color:C.dark,fontSize:"14px",fontWeight:600,textDecoration:"none"}}>
              Tel: 06-4397-0170
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
