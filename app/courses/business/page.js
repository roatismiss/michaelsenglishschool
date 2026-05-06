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

/* ═══ Table Row inside Accordion ═══ */
function TableRow({label,children,m}){
  return(
    <div style={{display:m?"block":"flex",borderBottom:"1px solid #eef0f5"}}>
      <div style={{flex:m?"none":"0 0 160px",padding:m?"16px 20px 4px":"16px 24px",fontWeight:700,fontSize:"13px",color:C.dark,background:m?"transparent":"#fafbfe"}}>{label}</div>
      <div style={{flex:1,padding:m?"4px 20px 16px":"16px 24px"}}>{children}</div>
    </div>
  );
}

/* ═══ Business Accordion ═══ */
function BizAccordion({num,title,rows,open,onToggle,m}){
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
      <div style={{maxHeight:open?"3000px":"0",overflow:"hidden",transition:"max-height 0.5s ease-out"}}>
        <div style={{background:"#fff"}}>
          {rows.map((r,i)=>(
            <TableRow key={i} label={r.label} m={m}>
              <ul style={{listStyle:"none",margin:0,padding:0,display:"flex",flexDirection:"column",gap:"6px"}}>
                {r.items.map((item,j)=>(
                  <li key={j} style={{display:"flex",gap:"8px",alignItems:"flex-start",fontSize:"14px",lineHeight:1.7,color:C.textLight}}>
                    <span style={{color:C.primary,flexShrink:0,marginTop:"2px"}}>&#x2022;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </TableRow>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BusinessClassPage(){
  const[openId,setOpenId]=useState(1);
  const m=useMobile();
  const{t}=useLang();

  const keypoints = [
    {icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>, key:"biz_kp1"},
    {icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>, key:"biz_kp2"},
    {icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>, key:"biz_kp3"},
    {icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/></svg>, key:"biz_kp4"},
  ];

  const levels = [
    {id:1,titleKey:"biz_level1_title",rows:[
      {labelKey:"biz_tbl_level",itemKeys:["biz_l1_cefr"]},
      {labelKey:"biz_tbl_target",itemKeys:["biz_l1_t1","biz_l1_t2","biz_l1_t3","biz_l1_t4"]},
      {labelKey:"biz_tbl_plan",itemKeys:["biz_l1_p1","biz_l1_p2","biz_l1_p3","biz_l1_p4","biz_l1_p5","biz_l1_p6","biz_l1_p7"]},
      {labelKey:"biz_tbl_goals",itemKeys:["biz_l1_g1","biz_l1_g2","biz_l1_g3","biz_l1_g4","biz_l1_g5","biz_l1_g6","biz_l1_g7"]},
      {labelKey:"biz_tbl_materials",itemKeys:["biz_l1_m1","biz_l1_m2"]},
    ]},
    {id:2,titleKey:"biz_level2_title",rows:[
      {labelKey:"biz_tbl_level",itemKeys:["biz_l2_cefr"]},
      {labelKey:"biz_tbl_target",itemKeys:["biz_l2_t1","biz_l2_t2","biz_l2_t3","biz_l2_t4"]},
      {labelKey:"biz_tbl_plan",itemKeys:["biz_l2_p1","biz_l2_p2","biz_l2_p3","biz_l2_p4","biz_l2_p5","biz_l2_p6","biz_l2_p7"]},
      {labelKey:"biz_tbl_goals",itemKeys:["biz_l2_g1","biz_l2_g2","biz_l2_g3","biz_l2_g4","biz_l2_g5","biz_l2_g6","biz_l2_g7"]},
      {labelKey:"biz_tbl_materials",itemKeys:["biz_l2_m1","biz_l2_m2"]},
    ]},
    {id:3,titleKey:"biz_level3_title",rows:[
      {labelKey:"biz_tbl_level",itemKeys:["biz_l3_cefr"]},
      {labelKey:"biz_tbl_target",itemKeys:["biz_l3_t1","biz_l3_t2","biz_l3_t3"]},
      {labelKey:"biz_tbl_plan",itemKeys:["biz_l3_p1","biz_l3_p2","biz_l3_p3","biz_l3_p4","biz_l3_p5","biz_l3_p6"]},
      {labelKey:"biz_tbl_goals",itemKeys:["biz_l3_g1","biz_l3_g2","biz_l3_g3","biz_l3_g4","biz_l3_g5","biz_l3_g6"]},
      {labelKey:"biz_tbl_materials",itemKeys:["biz_l3_m1"]},
    ]},
    {id:4,titleKey:"biz_level4_title",rows:[
      {labelKey:"biz_tbl_level",itemKeys:["biz_l4_cefr"]},
      {labelKey:"biz_tbl_target",itemKeys:["biz_l4_t1","biz_l4_t2","biz_l4_t3"]},
      {labelKey:"biz_tbl_plan",itemKeys:["biz_l4_p1","biz_l4_p2","biz_l4_p3","biz_l4_p4","biz_l4_p5","biz_l4_p6"]},
      {labelKey:"biz_tbl_goals",itemKeys:["biz_l4_g1","biz_l4_g2","biz_l4_g3","biz_l4_g4","biz_l4_g5"]},
      {labelKey:"biz_tbl_materials",itemKeys:["biz_l4_m1"]},
    ]},
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
            <h1 style={{fontWeight:900,fontSize:m?"clamp(3.5rem,18vw,5.5rem)":"clamp(5rem,9vw,9rem)",lineHeight:0.92,letterSpacing:"-0.04em",color:C.dark,animation:"fadeUp 0.8s ease-out both"}}>{t("biz_hero_title_1")}<br/>{t("biz_hero_title_2")}</h1>
            <p style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:m?"22px":"clamp(24px,3vw,36px)",color:C.primary,marginTop:m?"16px":"20px",animation:"fadeUp 0.8s ease-out 0.15s both"}}>{t("biz_hero_subtitle")}</p>
          </div>
          {!m&&(
            <div style={{flex:"0 0 50%",display:"flex",flexDirection:"column",justifyContent:"space-between",paddingLeft:"40px"}}>
              <div style={{display:"flex",justifyContent:"center",alignItems:"center",flex:1}}><RotatingAsterisk size={130}/></div>
              <div style={{display:"flex",alignItems:"center",gap:"12px",justifyContent:"flex-end"}}>
                <a href="/" style={{fontSize:"14px",fontWeight:600,color:C.primary,textDecoration:"none"}}>{t("nav_home")}</a>
                <span style={{color:C.textMuted,fontSize:"14px"}}>/</span>
                <a href="/courses" style={{fontSize:"14px",fontWeight:600,color:C.primary,textDecoration:"none"}}>{t("nav_courses")}</a>
                <span style={{color:C.textMuted,fontSize:"14px"}}>/</span>
                <span style={{fontSize:"14px",fontWeight:600,letterSpacing:"0.08em",color:C.text,textTransform:"uppercase"}}>{t("biz_breadcrumb")}</span>
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
            <span style={{fontSize:"13px",fontWeight:600,letterSpacing:"0.08em",color:C.text,textTransform:"uppercase"}}>{t("biz_breadcrumb")}</span>
          </div>
        )}
        <div style={{height:"10px",background:C.primary}}/>
      </section>

      {/* ═══ HERO IMAGE ═══ */}
      <section style={{background:"#fff",padding:m?"32px 24px":"48px 40px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto"}}>
          <div style={{borderRadius:"20px",overflow:"hidden",boxShadow:"0 8px 32px rgba(0,0,0,0.08)"}}>
            <img src="/japanese_business_class.jpeg" alt="Business English Class" style={{width:"100%",height:m?"220px":"400px",objectFit:"cover",display:"block"}}/>
          </div>
        </div>
      </section>

      {/* ═══ INTRO ═══ */}
      <section style={{background:"#fff",padding:m?"48px 24px":"80px 40px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto",textAlign:"center"}}>
          <Reveal>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"12px",marginBottom:"16px"}}>
              <div style={{width:"40px",height:"1.5px",background:C.primary}}/><span style={{fontSize:"11px",fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",color:C.primary}}>{t("biz_intro_label")}</span><div style={{width:"40px",height:"1.5px",background:C.primary}}/>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"14px",color:C.textMuted,marginBottom:"8px"}}>{t("biz_intro_subtitle")}</p>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"28px":"clamp(28px,5vw,44px)",fontWeight:700,color:C.dark,lineHeight:1.2,marginBottom:"28px"}}>{t("biz_intro_title")}</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{fontSize:m?"15px":"17px",lineHeight:1.8,color:C.textLight,maxWidth:"700px",margin:"0 auto"}}>{t("biz_intro_desc")}</p>
          </Reveal>
        </div>
      </section>

      {/* ═══ TOEIC KEY POINTS ═══ */}
      <section style={{background:C.primary,padding:m?"48px 24px":"64px 40px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto"}}>
          <Reveal>
            <h2 style={{fontSize:m?"24px":"32px",fontWeight:800,color:"#fff",marginBottom:"32px"}}>{t("biz_kp_title")}</h2>
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

      {/* ═══ BUSINESS LEVELS INFO ═══ */}
      <section style={{background:"#fff",padding:m?"48px 24px":"80px 40px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto"}}>
          <Reveal>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"28px":"36px",fontWeight:700,color:C.dark,marginBottom:"24px"}}>{t("biz_levels_title")}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{fontSize:"15px",lineHeight:1.8,color:C.textLight,marginBottom:"16px"}}>{t("biz_levels_desc1")}</p>
            <p style={{fontSize:"15px",lineHeight:1.8,color:C.textLight}}>{t("biz_levels_desc2")}</p>
          </Reveal>
        </div>
      </section>

      {/* ═══ COURSE LEVELS ACCORDION ═══ */}
      <section style={{background:C.primaryLight,padding:m?"48px 24px":"80px 40px"}}>
        <div style={{maxWidth:"1000px",margin:"0 auto"}}>
          <Reveal>
            <div style={{textAlign:"center",marginBottom:"48px"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"12px",marginBottom:"16px"}}>
                <div style={{width:"40px",height:"1.5px",background:C.primary}}/><span style={{fontSize:"11px",fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",color:C.primary}}>{t("biz_accordion_label")}</span><div style={{width:"40px",height:"1.5px",background:C.primary}}/>
              </div>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"28px":"clamp(28px,5vw,40px)",fontWeight:700,color:C.dark,lineHeight:1.2}}>{t("biz_accordion_title")}</h2>
            </div>
          </Reveal>
          {levels.map((lv,i)=>(
            <Reveal key={lv.id} delay={i*0.08}>
              <BizAccordion
                num={lv.id}
                title={t(lv.titleKey)}
                rows={lv.rows.map(r=>({label:t(r.labelKey),items:r.itemKeys.map(k=>t(k))}))}
                open={openId===lv.id}
                onToggle={()=>setOpenId(openId===lv.id?null:lv.id)}
                m={m}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══ BUSINESS BOOKS ═══ */}
      <section style={{background:"#fff",padding:m?"48px 24px":"80px 40px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto"}}>
          <Reveal>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"28px":"36px",fontWeight:700,color:C.dark,marginBottom:"24px"}}>{t("biz_books_title")}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{fontSize:"15px",lineHeight:1.8,color:C.textLight,marginBottom:"32px"}}>{t("biz_books_desc")}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <h3 style={{fontSize:m?"22px":"28px",fontWeight:700,color:C.dark,marginBottom:"16px"}}>{t("biz_content_title")}</h3>
            <p style={{fontSize:"15px",lineHeight:1.8,color:C.textLight,marginBottom:"20px"}}>{t("biz_content_desc")}</p>
            <ul style={{listStyle:"none",margin:0,padding:0,display:"flex",flexDirection:"column",gap:"12px"}}>
              {["biz_content_item1","biz_content_item2","biz_content_item3","biz_content_item4"].map(k=>(
                <li key={k} style={{display:"flex",gap:"10px",alignItems:"flex-start"}}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2.5" style={{flexShrink:0,marginTop:"3px"}}><path d="M20 6L9 17l-5-5"/></svg>
                  <span style={{fontSize:"15px",lineHeight:1.7,color:C.textLight}}>{t(k)}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ═══ SPECIAL COURSES ═══ */}
      <section style={{background:C.primaryLight,padding:m?"48px 24px":"80px 40px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto"}}>
          <Reveal>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"28px":"36px",fontWeight:700,color:C.dark,marginBottom:"16px"}}>{t("biz_special_title")}</h2>
            <p style={{fontSize:"15px",lineHeight:1.8,color:C.textLight,marginBottom:"32px"}}>{t("biz_special_desc")}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 style={{fontSize:m?"22px":"28px",fontWeight:700,color:C.dark,marginBottom:"16px"}}>{t("biz_special_content_title")}</h3>
            <p style={{fontSize:"15px",lineHeight:1.8,color:C.textLight,marginBottom:"20px"}}>{t("biz_special_content_desc")}</p>
            <ul style={{listStyle:"none",margin:0,padding:0,display:"flex",flexDirection:"column",gap:"12px"}}>
              {["biz_special_item1","biz_special_item2","biz_special_item3","biz_special_item4"].map(k=>(
                <li key={k} style={{display:"flex",gap:"10px",alignItems:"flex-start"}}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2.5" style={{flexShrink:0,marginTop:"3px"}}><path d="M20 6L9 17l-5-5"/></svg>
                  <span style={{fontSize:"15px",lineHeight:1.7,color:C.textLight}}>{t(k)}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{background:"#fff",padding:m?"48px 24px":"64px 40px",textAlign:"center"}}>
        <Reveal>
          <div style={{display:"inline-block",background:C.primaryLight,borderRadius:"999px",padding:"6px 18px",marginBottom:"20px"}}>
            <span style={{fontSize:"12px",fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:C.primary}}>{t("biz_cta_label")}</span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"28px":"clamp(28px,5vw,40px)",fontWeight:700,color:C.dark,lineHeight:1.2,marginBottom:"32px"}}>{t("biz_cta_title")}</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"16px",flexWrap:"wrap"}}>
            <a href="/tuition" style={{display:"flex",alignItems:"center",gap:"8px",padding:"14px 32px",borderRadius:"12px",background:C.primary,color:"#fff",fontSize:"14px",fontWeight:600,textDecoration:"none",transition:"background 0.3s"}}
              onMouseEnter={e=>e.currentTarget.style.background=C.primaryDark}
              onMouseLeave={e=>e.currentTarget.style.background=C.primary}>
              {t("biz_cta_tuition")}
            </a>
            <a href="/inquiry" style={{display:"flex",alignItems:"center",gap:"8px",padding:"14px 32px",borderRadius:"12px",background:"transparent",border:`1.5px solid ${C.primary}`,color:C.primary,fontSize:"14px",fontWeight:600,textDecoration:"none",transition:"all 0.3s"}}
              onMouseEnter={e=>{e.currentTarget.style.background=C.primary;e.currentTarget.style.color="#fff"}}
              onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=C.primary}}>
              {t("biz_cta_inquiry")}
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
