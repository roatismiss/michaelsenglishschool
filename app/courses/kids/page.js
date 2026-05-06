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

export default function KidsClassPage(){
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
            <h1 style={{fontWeight:900,fontSize:m?"clamp(3.5rem,18vw,5.5rem)":"clamp(5rem,9vw,9rem)",lineHeight:0.92,letterSpacing:"-0.04em",color:C.dark,animation:"fadeUp 0.8s ease-out both"}}>{t("kids_hero_title_1")}<br/>{t("kids_hero_title_2")}</h1>
            <p style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:m?"22px":"clamp(24px,3vw,36px)",color:C.primary,marginTop:m?"16px":"20px",animation:"fadeUp 0.8s ease-out 0.15s both"}}>{t("kids_hero_subtitle")}</p>
          </div>
          {!m&&(
            <div style={{flex:"0 0 50%",display:"flex",flexDirection:"column",justifyContent:"space-between",paddingLeft:"40px"}}>
              <div style={{display:"flex",justifyContent:"center",alignItems:"center",flex:1}}><RotatingAsterisk size={130}/></div>
              <div style={{display:"flex",alignItems:"center",gap:"12px",justifyContent:"flex-end"}}>
                <a href="/" style={{fontSize:"14px",fontWeight:600,color:C.primary,textDecoration:"none"}}>{t("nav_home")}</a>
                <span style={{color:C.textMuted,fontSize:"14px"}}>/</span>
                <a href="/courses" style={{fontSize:"14px",fontWeight:600,color:C.primary,textDecoration:"none"}}>{t("nav_courses")}</a>
                <span style={{color:C.textMuted,fontSize:"14px"}}>/</span>
                <span style={{fontSize:"14px",fontWeight:600,letterSpacing:"0.08em",color:C.text,textTransform:"uppercase"}}>{t("kids_breadcrumb")}</span>
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
            <span style={{fontSize:"13px",fontWeight:600,letterSpacing:"0.08em",color:C.text,textTransform:"uppercase"}}>{t("kids_breadcrumb")}</span>
          </div>
        )}
        <div style={{height:"10px",background:C.primary}}/>
      </section>

      {/* ═══ HERO IMAGE ═══ */}
      <section style={{background:"#fff",padding:m?"32px 24px":"48px 40px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto"}}>
          <div style={{borderRadius:"20px",overflow:"hidden",boxShadow:"0 8px 32px rgba(0,0,0,0.08)"}}>
            <img src="/japanese_kids_course.jpg" alt="Kids English Course" style={{width:"100%",height:m?"220px":"400px",objectFit:"cover",display:"block"}}/>
          </div>
        </div>
      </section>

      {/* ═══ INTRO ═══ */}
      <section style={{background:"#fff",padding:m?"48px 24px":"80px 40px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto",textAlign:"center"}}>
          <Reveal>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"12px",marginBottom:"16px"}}>
              <div style={{width:"40px",height:"1.5px",background:C.primary}}/><span style={{fontSize:"11px",fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",color:C.primary}}>{t("kids_intro_label")}</span><div style={{width:"40px",height:"1.5px",background:C.primary}}/>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"14px",color:C.textMuted,marginBottom:"8px"}}>{t("kids_intro_subtitle")}</p>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"28px":"clamp(28px,5vw,44px)",fontWeight:700,color:C.dark,lineHeight:1.2,marginBottom:"28px"}}>{t("kids_intro_title")}</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{fontSize:m?"15px":"17px",lineHeight:1.8,color:C.textLight,maxWidth:"700px",margin:"0 auto"}}>{t("kids_intro_desc")}</p>
          </Reveal>
        </div>
      </section>

      {/* ═══ EXAMS ═══ */}
      <section style={{background:C.primary,padding:m?"48px 24px":"64px 40px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto"}}>
          <Reveal>
            <h2 style={{fontSize:m?"24px":"32px",fontWeight:800,color:"#fff",marginBottom:"24px"}}>{t("kids_exams_title")}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{fontSize:"15px",lineHeight:1.8,color:"rgba(255,255,255,0.85)",marginBottom:"16px"}}>{t("kids_exams_desc1")}</p>
            <p style={{fontSize:"15px",lineHeight:1.8,color:"rgba(255,255,255,0.85)"}}>{t("kids_exams_desc2")}</p>
          </Reveal>
        </div>
      </section>

      {/* ═══ COURSE ACCORDION ═══ */}
      <section style={{background:C.primaryLight,padding:m?"48px 24px":"80px 40px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto"}}>
          <Reveal>
            <div style={{textAlign:"center",marginBottom:"48px"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"12px",marginBottom:"16px"}}>
                <div style={{width:"40px",height:"1.5px",background:C.primary}}/><span style={{fontSize:"11px",fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",color:C.primary}}>{t("kids_courses_label")}</span><div style={{width:"40px",height:"1.5px",background:C.primary}}/>
              </div>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"28px":"clamp(28px,5vw,40px)",fontWeight:700,color:C.dark,lineHeight:1.2}}>{t("kids_courses_title")}</h2>
            </div>
          </Reveal>

          <Reveal>
            <AccordionItem
              num={1}
              title={t("kids_course1_title")}
              items={[t("kids_course1_item1"),t("kids_course1_item2"),t("kids_course1_item3"),t("kids_course1_item4"),t("kids_course1_item5")]}
              open={openId===1}
              onToggle={()=>setOpenId(openId===1?null:1)}
              m={m}
            />
          </Reveal>

          <Reveal delay={0.1}>
            <AccordionItem
              num={2}
              title={t("kids_course2_title")}
              items={[]}
              extraContent={
                <div style={{display:"flex",flexDirection:"column",gap:"16px"}}>
                  <p style={{fontSize:"15px",lineHeight:1.8,color:C.textLight}}>{t("kids_yle_desc1")}</p>
                  <p style={{fontSize:"15px",lineHeight:1.8,color:C.textLight}}>{t("kids_yle_desc2")}</p>
                </div>
              }
              open={openId===2}
              onToggle={()=>setOpenId(openId===2?null:2)}
              m={m}
            />
          </Reveal>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{background:"#fff",padding:m?"48px 24px":"64px 40px",textAlign:"center"}}>
        <Reveal>
          <div style={{display:"inline-block",background:C.primaryLight,borderRadius:"999px",padding:"6px 18px",marginBottom:"20px"}}>
            <span style={{fontSize:"12px",fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:C.primary}}>{t("kids_cta_label")}</span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"28px":"clamp(28px,5vw,40px)",fontWeight:700,color:C.dark,lineHeight:1.2,marginBottom:"32px"}}>{t("kids_cta_title")}</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"16px",flexWrap:"wrap"}}>
            <a href="/inquiry" style={{display:"flex",alignItems:"center",gap:"8px",padding:"14px 32px",borderRadius:"12px",background:C.primary,color:"#fff",fontSize:"14px",fontWeight:600,textDecoration:"none",transition:"background 0.3s"}}
              onMouseEnter={e=>e.currentTarget.style.background=C.primaryDark}
              onMouseLeave={e=>e.currentTarget.style.background=C.primary}>
              {t("kids_cta_trial")}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
            </a>
            <a href="/access" style={{display:"flex",alignItems:"center",gap:"8px",padding:"14px 32px",borderRadius:"12px",background:"transparent",border:`1.5px solid ${C.primary}`,color:C.primary,fontSize:"14px",fontWeight:600,textDecoration:"none",transition:"all 0.3s"}}
              onMouseEnter={e=>{e.currentTarget.style.background=C.primary;e.currentTarget.style.color="#fff"}}
              onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=C.primary}}>
              {t("kids_cta_access")}
            </a>
            <a href="tel:0643970170" style={{display:"flex",alignItems:"center",gap:"8px",padding:"14px 32px",borderRadius:"12px",background:"transparent",border:"1.5px solid #ccc",color:C.dark,fontSize:"14px",fontWeight:600,textDecoration:"none"}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill={C.primary}><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.32.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z"/></svg>
              Tel: 06-4397-0170
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
