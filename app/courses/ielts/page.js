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

/* ═══ Score Table ═══ */
function ScoreTable({headers,rows,m}){
  return(
    <div style={{overflowX:"auto",borderRadius:"12px",border:"1.5px solid #e4e8f2"}}>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:m?"13px":"14px"}}>
        <thead>
          <tr style={{background:C.primary}}>
            {headers.map((h,i)=>(
              <th key={i} style={{padding:m?"10px 12px":"12px 16px",color:"#fff",fontWeight:700,textAlign:"left",whiteSpace:"nowrap",borderBottom:"2px solid "+C.primaryDark}}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row,ri)=>(
            <tr key={ri} style={{background:ri%2===0?"#fff":C.primaryLight}}>
              {row.map((cell,ci)=>(
                <td key={ci} style={{padding:m?"10px 12px":"12px 16px",color:C.text,borderBottom:"1px solid #e4e8f2",whiteSpace:"nowrap"}}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function IeltsPage(){
  const[openId,setOpenId]=useState(1);
  const m=useMobile();
  const{t}=useLang();

  const keypoints=[
    {icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2"/><circle cx="9" cy="7" r="4"/></svg>,key:"ielts_kp1"},
    {icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,key:"ielts_kp2"},
    {icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,key:"ielts_kp3"},
    {icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,key:"ielts_kp4"},
    {icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/></svg>,key:"ielts_kp5"},
  ];

  const comparisonHeaders=[t("ielts_tbl_ielts"),t("ielts_tbl_cefr_level"),t("ielts_tbl_cefr_score"),t("ielts_tbl_toeic"),t("ielts_tbl_eiken"),t("ielts_tbl_toefl")];
  const comparisonRows=[
    ["9","Proficient","C2","990",t("ielts_eiken_1"),"300"],
    ["8.5","","","957","","290"],
    ["8","","","891","","280"],
    ["7.5","","","858","","260"],
    ["7","Advanced","C1","792",t("ielts_eiken_pre1"),"240"],
    ["6.5","","","759","","220"],
    ["6","Upper-Intermediate","B2","693","","210"],
    ["5.5","","","627","","190"],
    ["5","","","594","","170"],
    ["4.5","Intermediate","B1","529",t("ielts_eiken_2"),"160"],
    ["4","","","461","","140"],
  ];

  const goalHeaders=[t("ielts_goal_purpose"),t("ielts_goal_score")];
  const goalRows=[
    [t("ielts_goal_prep"),"4.5 ~ 5.5"],
    [t("ielts_goal_exchange"),"5 ~ 6"],
    [t("ielts_goal_uni"),"5.5 ~ 6.5"],
    [t("ielts_goal_professional"),"6.5 ~ 7"],
    [t("ielts_goal_grad"),"7+"],
    [t("ielts_goal_migration"),"7+"],
  ];

  const timeHeaders=[t("ielts_time_situation"),t("ielts_time_approach"),t("ielts_time_schedule")];
  const timeRows=[
    [t("ielts_time_s1"),t("ielts_time_a1"),t("ielts_time_t1")],
    [t("ielts_time_s2"),t("ielts_time_a2"),t("ielts_time_t2")],
    [t("ielts_time_s3"),t("ielts_time_a3"),t("ielts_time_t3")],
    [t("ielts_time_s4"),t("ielts_time_a4"),t("ielts_time_t4")],
    [t("ielts_time_s5"),t("ielts_time_a5"),t("ielts_time_t5")],
  ];

  const courseHeaders=[t("ielts_course_name"),t("ielts_course_schedule"),t("ielts_course_details"),t("ielts_course_fee")];
  const courseRows=[
    ["IELTS Exclusive",t("ielts_course_excl_sched"),t("ielts_course_excl_detail"),t("ielts_course_excl_fee")],
    ["IELTS Express",t("ielts_course_expr_sched"),t("ielts_course_expr_detail"),t("ielts_course_expr_fee")],
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
            <h1 style={{fontWeight:900,fontSize:m?"clamp(3rem,16vw,5rem)":"clamp(4.5rem,8vw,8rem)",lineHeight:0.92,letterSpacing:"-0.04em",color:C.dark,animation:"fadeUp 0.8s ease-out both"}}>{t("ielts_hero_1")}<br/>{t("ielts_hero_2")}</h1>
            <p style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:m?"22px":"clamp(24px,3vw,36px)",color:C.primary,marginTop:m?"16px":"20px",animation:"fadeUp 0.8s ease-out 0.15s both"}}>{t("ielts_hero_sub")}</p>
          </div>
          {!m&&(
            <div style={{flex:"0 0 50%",display:"flex",flexDirection:"column",justifyContent:"space-between",paddingLeft:"40px"}}>
              <div style={{display:"flex",justifyContent:"center",alignItems:"center",flex:1}}><RotatingAsterisk size={130}/></div>
              <div style={{display:"flex",alignItems:"center",gap:"12px",justifyContent:"flex-end"}}>
                <a href="/" style={{fontSize:"14px",fontWeight:600,color:C.primary,textDecoration:"none"}}>{t("nav_home")}</a>
                <span style={{color:C.textMuted,fontSize:"14px"}}>/</span>
                <a href="/courses" style={{fontSize:"14px",fontWeight:600,color:C.primary,textDecoration:"none"}}>{t("nav_courses")}</a>
                <span style={{color:C.textMuted,fontSize:"14px"}}>/</span>
                <span style={{fontSize:"14px",fontWeight:600,letterSpacing:"0.08em",color:C.text,textTransform:"uppercase"}}>{t("ielts_breadcrumb")}</span>
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
            <span style={{fontSize:"13px",fontWeight:600,letterSpacing:"0.08em",color:C.text,textTransform:"uppercase"}}>{t("ielts_breadcrumb")}</span>
          </div>
        )}
        <div style={{height:"10px",background:C.primary}}/>
      </section>

      {/* ═══ INTRO ═══ */}
      <section style={{background:"#fff",padding:m?"48px 24px":"80px 40px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto",textAlign:"center"}}>
          <Reveal>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"12px",marginBottom:"16px"}}>
              <div style={{width:"40px",height:"1.5px",background:C.primary}}/><span style={{fontSize:"11px",fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",color:C.primary}}>{t("ielts_intro_label")}</span><div style={{width:"40px",height:"1.5px",background:C.primary}}/>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"14px",color:C.textMuted,marginBottom:"8px"}}>{t("ielts_intro_subtitle")}</p>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"26px":"clamp(28px,5vw,40px)",fontWeight:700,color:C.dark,lineHeight:1.2,marginBottom:"28px"}}>{t("ielts_intro_title")}</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{fontSize:m?"15px":"17px",lineHeight:1.8,color:C.textLight,maxWidth:"700px",margin:"0 auto"}}>{t("ielts_intro_desc")}</p>
          </Reveal>
        </div>
      </section>

      {/* ═══ KEY POINTS ═══ */}
      <section style={{background:C.primary,padding:m?"48px 24px":"64px 40px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto"}}>
          <Reveal>
            <h2 style={{fontSize:m?"24px":"32px",fontWeight:800,color:"#fff",marginBottom:"32px"}}>{t("ielts_kp_title")}</h2>
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

      {/* ═══ WHAT IS IELTS ═══ */}
      <section style={{background:"#fff",padding:m?"48px 24px":"80px 40px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto"}}>
          <Reveal>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"26px":"36px",fontWeight:700,color:C.dark,marginBottom:"24px"}}>{t("ielts_what_title")}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{fontSize:"15px",lineHeight:1.8,color:C.textLight,marginBottom:"16px"}}>{t("ielts_what_desc1")}</p>
            <p style={{fontSize:"15px",lineHeight:1.8,color:C.textLight,marginBottom:"16px"}}>{t("ielts_what_desc2")}</p>
            <p style={{fontSize:"15px",lineHeight:1.8,color:C.textLight}}>{t("ielts_what_desc3")}</p>
          </Reveal>
        </div>
      </section>

      {/* ═══ WHY IELTS ═══ */}
      <section style={{background:"#fff",padding:m?"48px 24px":"80px 40px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto"}}>
          <Reveal>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"26px":"36px",fontWeight:700,color:C.dark,marginBottom:"24px"}}>{t("ielts_why_title")}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{fontSize:"15px",lineHeight:1.8,color:C.textLight,marginBottom:"24px"}}>{t("ielts_why_desc")}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <ul style={{listStyle:"none",margin:0,padding:0,display:"flex",flexDirection:"column",gap:"12px",marginBottom:"24px"}}>
              {["ielts_why_item1","ielts_why_item2","ielts_why_item3","ielts_why_item4"].map((k,i)=>(
                <li key={k} style={{display:"flex",gap:"10px",alignItems:"flex-start"}}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2.5" style={{flexShrink:0,marginTop:"2px"}}><path d="M20 6L9 17l-5-5"/></svg>
                  <span style={{fontSize:"15px",lineHeight:1.7,color:C.textLight}}>{t(k)}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ═══ SCORE COMPARISON TABLE ═══ */}
      <section style={{background:C.primaryLight,padding:m?"48px 24px":"80px 40px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto"}}>
          <Reveal>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"26px":"36px",fontWeight:700,color:C.dark,marginBottom:"12px"}}>{t("ielts_compare_title")}</h2>
            <p style={{fontSize:"15px",lineHeight:1.8,color:C.textLight,marginBottom:"32px"}}>{t("ielts_compare_desc")}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <ScoreTable headers={comparisonHeaders} rows={comparisonRows} m={m}/>
          </Reveal>
        </div>
      </section>

      {/* ═══ GOALS TABLE ═══ */}
      <section style={{background:"#fff",padding:m?"48px 24px":"80px 40px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto"}}>
          <Reveal>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"26px":"36px",fontWeight:700,color:C.dark,marginBottom:"12px"}}>{t("ielts_goals_title")}</h2>
            <p style={{fontSize:"15px",lineHeight:1.8,color:C.textLight,marginBottom:"32px"}}>{t("ielts_goals_desc")}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <ScoreTable headers={goalHeaders} rows={goalRows} m={m}/>
          </Reveal>
        </div>
      </section>

      {/* ═══ OUR SUPPORT ═══ */}
      <section style={{background:"#fff",padding:m?"48px 24px":"80px 40px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto"}}>
          <Reveal>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"12px",marginBottom:"16px"}}>
              <div style={{width:"40px",height:"1.5px",background:C.primary}}/><span style={{fontSize:"11px",fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",color:C.primary}}>{t("ielts_support_label")}</span><div style={{width:"40px",height:"1.5px",background:C.primary}}/>
            </div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"26px":"36px",fontWeight:700,color:C.dark,textAlign:"center",marginBottom:"36px"}}>{t("ielts_support_title")}</h2>
          </Reveal>

          <Reveal>
            <AccordionItem num={1} title={t("ielts_sup1_title")}
              items={[]} extraContent={<p style={{fontSize:"15px",lineHeight:1.8,color:C.textLight}}>{t("ielts_sup1_desc")}</p>}
              open={openId===1} onToggle={()=>setOpenId(openId===1?null:1)} m={m}/>
          </Reveal>
          <Reveal delay={0.05}>
            <AccordionItem num={2} title={t("ielts_sup2_title")}
              items={[t("ielts_sup2_item1"),t("ielts_sup2_item2"),t("ielts_sup2_item3"),t("ielts_sup2_item4")]}
              open={openId===2} onToggle={()=>setOpenId(openId===2?null:2)} m={m}/>
          </Reveal>
          <Reveal delay={0.1}>
            <AccordionItem num={3} title={t("ielts_sup3_title")}
              items={[]} extraContent={<p style={{fontSize:"15px",lineHeight:1.8,color:C.textLight}}>{t("ielts_sup3_desc")}</p>}
              open={openId===3} onToggle={()=>setOpenId(openId===3?null:3)} m={m}/>
          </Reveal>
          <Reveal delay={0.15}>
            <AccordionItem num={4} title={t("ielts_sup4_title")}
              items={[]} extraContent={<p style={{fontSize:"15px",lineHeight:1.8,color:C.textLight}}>{t("ielts_sup4_desc")}</p>}
              open={openId===4} onToggle={()=>setOpenId(openId===4?null:4)} m={m}/>
          </Reveal>
          <Reveal delay={0.2}>
            <AccordionItem num={5} title={t("ielts_sup5_title")}
              items={[]} extraContent={<p style={{fontSize:"15px",lineHeight:1.8,color:C.textLight}}>{t("ielts_sup5_desc")}</p>}
              open={openId===5} onToggle={()=>setOpenId(openId===5?null:5)} m={m}/>
          </Reveal>
        </div>
      </section>

      {/* ═══ COURSE TABLE ═══ */}
      <section style={{background:C.primaryLight,padding:m?"48px 24px":"80px 40px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto"}}>
          <Reveal>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"26px":"36px",fontWeight:700,color:C.dark,marginBottom:"32px"}}>{t("ielts_courses_title")}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <ScoreTable headers={courseHeaders} rows={courseRows} m={m}/>
          </Reveal>
        </div>
      </section>

      {/* ═══ TIME ESTIMATE TABLE ═══ */}
      <section style={{background:"#fff",padding:m?"48px 24px":"80px 40px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto"}}>
          <Reveal>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"26px":"36px",fontWeight:700,color:C.dark,marginBottom:"12px"}}>{t("ielts_time_title")}</h2>
            <p style={{fontSize:"15px",lineHeight:1.8,color:C.textLight,marginBottom:"32px"}}>{t("ielts_time_desc")}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <ScoreTable headers={timeHeaders} rows={timeRows} m={m}/>
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
            <p style={{fontSize:"15px",lineHeight:1.8,color:C.textLight,flex:1}}>{t("ielts_trial_desc")}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <div style={{display:"flex",gap:"12px",flexWrap:"wrap"}}>
              <a href="/inquiry" style={{padding:"14px 32px",borderRadius:"12px",background:C.primary,color:"#fff",fontSize:"14px",fontWeight:600,textDecoration:"none",whiteSpace:"nowrap",flexShrink:0,transition:"background 0.3s"}}
                onMouseEnter={e=>e.currentTarget.style.background=C.primaryDark}
                onMouseLeave={e=>e.currentTarget.style.background=C.primary}>
                {t("ielts_trial_btn")}
              </a>
              <a href="/access" style={{padding:"14px 32px",borderRadius:"12px",background:"transparent",color:C.primary,fontSize:"14px",fontWeight:600,textDecoration:"none",whiteSpace:"nowrap",flexShrink:0,border:`1.5px solid ${C.primary}`,transition:"background 0.3s"}}
                onMouseEnter={e=>{e.currentTarget.style.background=C.primaryLight}}
                onMouseLeave={e=>{e.currentTarget.style.background="transparent"}}>
                {t("ielts_trial_access")}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
