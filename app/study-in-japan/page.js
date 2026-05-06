"use client";
import { useState, useEffect, useRef } from "react";
import { useLang } from "../components/LanguageContext";
import JapaneseRain from "../components/JapaneseRain";

const C = {
  primary:"#4361EE", primaryDark:"#3651D4", primaryLight:"#EEF1FF",
  accent:"#6C8AFF", heroBg:"#E8EDF8", dark:"#1a1a2e",
  text:"#333", textLight:"#666", textMuted:"#999",
};

function useMobile(bp=768){const[m,s]=useState(false);useEffect(()=>{const c=()=>s(window.innerWidth<bp);c();window.addEventListener("resize",c);return()=>window.removeEventListener("resize",c)},[bp]);return m}

/* ═══ Scroll Reveal ═══ */
function Reveal({children, delay=0}){
  const ref=useRef(null);
  const[vis,setVis]=useState(false);
  useEffect(()=>{
    if(!ref.current)return;
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setVis(true);obs.disconnect()}},{threshold:0.15});
    obs.observe(ref.current);
    return()=>obs.disconnect();
  },[]);
  return <div ref={ref} style={{opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(30px)",transition:`all 0.7s ease-out ${delay}s`}}>{children}</div>;
}

/* ═══ Specialty Program Card ═══ */
function ProgramCard({emoji,title,titleJa,desc,m}){
  const[h,sH]=useState(false);
  return(
    <div onMouseEnter={()=>sH(true)} onMouseLeave={()=>sH(false)} style={{
      background:h?C.primary:"#fff",borderRadius:"20px",padding:m?"28px":"36px",
      border:h?"none":`1.5px solid #e4e8f2`,cursor:"pointer",
      transition:"all 0.4s",transform:h?"translateY(-8px) scale(1.02)":"none",
      boxShadow:h?"0 20px 50px rgba(67,97,238,0.25)":"0 4px 16px rgba(0,0,0,0.04)",
      position:"relative",overflow:"hidden",
    }}>
      <div style={{fontSize:m?"48px":"64px",marginBottom:"16px",transition:"transform 0.4s",transform:h?"scale(1.1) rotate(-5deg)":"none"}}>{emoji}</div>
      <div style={{fontSize:"10px",fontWeight:700,letterSpacing:"0.15em",color:h?"rgba(255,255,255,0.5)":C.textMuted,marginBottom:"4px",textTransform:"uppercase"}}>{titleJa}</div>
      <h3 style={{fontSize:m?"18px":"22px",fontWeight:800,color:h?"#fff":C.dark,marginBottom:"12px",transition:"color 0.4s"}}>{title}</h3>
      <p style={{fontSize:"14px",lineHeight:1.7,color:h?"rgba(255,255,255,0.75)":C.textLight,transition:"color 0.4s"}}>{desc}</p>
      {h&&<div style={{position:"absolute",top:"-20px",right:"-20px",width:"100px",height:"100px",borderRadius:"50%",background:"rgba(255,255,255,0.08)"}}/>}
    </div>
  );
}

/* ═══ Timeline Step ═══ */
function TimelineStep({num,title,desc,isLast,m}){
  return(
    <div style={{display:"flex",gap:m?"16px":"24px",position:"relative"}}>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0}}>
        <div style={{width:"44px",height:"44px",borderRadius:"50%",background:C.primary,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:"16px",boxShadow:"0 4px 16px rgba(67,97,238,0.3)"}}>{num}</div>
        {!isLast&&<div style={{width:"2px",flex:1,background:`linear-gradient(to bottom, ${C.primary}, ${C.primaryLight})`,minHeight:"40px"}}/>}
      </div>
      <div style={{paddingBottom:isLast?"0":"32px"}}>
        <h4 style={{fontSize:m?"16px":"18px",fontWeight:700,color:C.dark,marginBottom:"8px"}}>{title}</h4>
        <p style={{fontSize:"14px",lineHeight:1.7,color:C.textLight}}>{desc}</p>
      </div>
    </div>
  );
}

/* ═══ Visa Stepper ═══ */
function VisaStepper({steps,m}){
  return(
    <div style={{display:"grid",gridTemplateColumns:m?"1fr":"repeat(4,1fr)",gap:m?"16px":"24px"}}>
      {steps.map((s,i)=>(
        <div key={i} style={{background:"#fff",borderRadius:"16px",padding:m?"24px":"28px",border:"1.5px solid #e4e8f2",position:"relative",textAlign:"center"}}>
          <div style={{width:"56px",height:"56px",borderRadius:"16px",background:C.primaryLight,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",fontSize:"28px"}}>{s.icon}</div>
          <div style={{position:"absolute",top:"16px",right:"16px",fontSize:"11px",fontWeight:800,color:C.primary,background:C.primaryLight,padding:"4px 10px",borderRadius:"999px"}}>0{i+1}</div>
          <h4 style={{fontSize:"15px",fontWeight:700,color:C.dark,marginBottom:"8px"}}>{s.title}</h4>
          <p style={{fontSize:"13px",lineHeight:1.6,color:C.textLight}}>{s.desc}</p>
        </div>
      ))}
    </div>
  );
}

/* ═══ Osaka Life Card ═══ */
function OsakaCard({emoji,title,desc,m,accent}){
  return(
    <div style={{background:accent||"#fff",borderRadius:"20px",padding:m?"28px":"36px",border:accent?"none":"1.5px solid #e4e8f2"}}>
      <div style={{fontSize:"40px",marginBottom:"16px"}}>{emoji}</div>
      <h3 style={{fontSize:m?"18px":"20px",fontWeight:700,color:accent?"#fff":C.dark,marginBottom:"12px"}}>{title}</h3>
      <p style={{fontSize:"14px",lineHeight:1.8,color:accent?"rgba(255,255,255,0.8)":C.textLight}}>{desc}</p>
    </div>
  );
}

/* ═══ Weather Chart ═══ */
function WeatherChart({m}){
  const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const highs=[8,9,13,19,24,27,31,33,29,23,17,11];
  const lows=[1,2,4,10,15,19,23,25,21,14,8,3];
  const maxT=35;
  return(
    <div style={{background:"#fff",borderRadius:"20px",padding:m?"24px 16px":"36px",border:"1.5px solid #e4e8f2"}}>
      <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",height:m?"160px":"200px",gap:m?"4px":"8px"}}>
        {months.map((mo,i)=>(
          <div key={mo} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:"4px"}}>
            <span style={{fontSize:"10px",fontWeight:700,color:C.primary}}>{highs[i]}°</span>
            <div style={{width:"100%",maxWidth:"28px",borderRadius:"8px 8px 0 0",background:`linear-gradient(to top, ${C.primaryLight}, ${C.primary})`,height:`${(highs[i]/maxT)*100}%`,transition:"height 0.5s",opacity:0.8}}/>
            <div style={{width:"100%",maxWidth:"28px",borderRadius:"0 0 8px 8px",background:C.primaryLight,height:`${(lows[i]/maxT)*60}%`,transition:"height 0.5s"}}/>
            <span style={{fontSize:"9px",color:C.textMuted,marginTop:"4px"}}>{mo}</span>
          </div>
        ))}
      </div>
      <div style={{display:"flex",justifyContent:"center",gap:"24px",marginTop:"16px"}}>
        <div style={{display:"flex",alignItems:"center",gap:"6px"}}><div style={{width:"12px",height:"12px",borderRadius:"3px",background:C.primary}}/><span style={{fontSize:"11px",color:C.textMuted}}>High °C</span></div>
        <div style={{display:"flex",alignItems:"center",gap:"6px"}}><div style={{width:"12px",height:"12px",borderRadius:"3px",background:C.primaryLight}}/><span style={{fontSize:"11px",color:C.textMuted}}>Low °C</span></div>
      </div>
    </div>
  );
}

/* ═══ MAIN ═══ */
export default function StudyInJapanPage(){
  const m=useMobile();
  const { t }=useLang();

  const programs=[
    {emoji:<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8 2 4 4.5 4 9c0 3 1.5 5 3 6.5L12 22l5-6.5C18.5 14 20 12 20 9c0-4.5-4-7-8-7z"/><circle cx="12" cy="9" r="2.5"/><path d="M9 15h6"/></svg>,title:"Aikido Program",titleJa:"合気道",desc:"Train in the art of Aikido at authentic Japanese dojos, learning from experienced masters in the birthplace of this martial art."},
    {emoji:<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3c-1.5 2-4 3.5-4 6a4 4 0 008 0c0-2.5-2.5-4-4-6z"/><path d="M12 9v13"/><path d="M8 14c-2 0-4 1-4 3s2 3 4 3"/><path d="M16 14c2 0 4 1 4 3s-2 3-4 3"/><path d="M9 17l3-3 3 3"/></svg>,title:"Ikebana",titleJa:"生け花",desc:"Learn the ancient Japanese art of flower arrangement, discovering harmony, balance, and the beauty of nature through creative expression."},
    {emoji:<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3l-1.5 1.5M14 6l-8 8-2 6 6-2 8-8M14 6l4-4"/><path d="M9.5 13.5L6 17"/></svg>,title:"Shodo",titleJa:"書道",desc:"Master Japanese calligraphy with brush and ink, exploring the meditative art form that connects language with visual beauty."},
    {emoji:<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12a7 7 0 0114 0"/><path d="M5 12h14"/><path d="M8 12v6a2 2 0 002 2h4a2 2 0 002-2v-6"/><path d="M9 8c0-1 .5-3 3-3s3 2 3 3"/><path d="M10 3.5c.5-.5 1.2-.5 2-.5s1.5 0 2 .5"/></svg>,title:"Tea Ceremony",titleJa:"茶道",desc:"Experience the tranquil ritual of the Japanese tea ceremony, learning the philosophy of harmony, respect, purity, and tranquility."},
  ];

  const timeline=[
    {title:"Priority Application",desc:"Apply 4-6 months before class starts. Priority applicants receive ~10% discount and first housing preference."},
    {title:"One-to-One Consultation",desc:"Complete a personal consultation to assess eligibility and discuss your goals, visa requirements, and program selection."},
    {title:"Visa Sponsorship",desc:"Our faculty staff guides you through the entire visa application process. Valid passport required for all applicants."},
    {title:"Final Enrollment",desc:"Final deadline is 2 months before class. Final applicants enrolled at full tuition after cancellation deadline passes."},
    {title:"Arrival in Japan",desc:"Welcome to Osaka! Move into your fully equipped accommodation and begin your Japanese language and culture journey."},
  ];

  const visaSteps=[
    {icon:<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M8 18h8"/><path d="M9 14h6"/></svg>,title:"Valid Passport",desc:"Ensure your passport is current and valid for the duration of your stay."},
    {icon:<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M9 2v4h6V2"/><path d="M9 12h6"/><path d="M9 16h4"/></svg>,title:"Application Form",desc:"Complete the enrollment application and schedule your consultation."},
    {icon:<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="3"/><circle cx="16" cy="8" r="3"/><path d="M3 18c0-3 2.5-5 5-5"/><path d="M21 18c0-3-2.5-5-5-5"/><path d="M8 13c2 0 3.5 1 4 2.5"/><path d="M16 13c-2 0-3.5 1-4 2.5"/></svg>,title:"Consultation",desc:"One-to-one meeting to assess eligibility and plan your journey."},
    {icon:<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 15l5-5 3.5 3.5L16 8l6-6"/><path d="M16 2h6v6"/><path d="M22 22H2V8"/></svg>,title:"Visa & Travel",desc:"Our staff guides you through visa sponsorship and travel preparation."},
  ];

  return(
    <>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      `}</style>

      {/* ═══ HERO — Split screen with JapaneseRain ═══ */}
      <section style={{height:m?"auto":"calc(100vh - 88px)",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:"52%",background:"#fff"}}/>
        <div style={{position:"absolute",top:"52%",left:0,right:0,height:"10px",background:C.primary,zIndex:5}}/>
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:"48%",background:C.heroBg}}/>
        <JapaneseRain />
        {!m&&<img
          src="/study-in-japan-logo.png"
          alt="Study in Japan"
          style={{
            position:"absolute",
            top:"26%",
            right:"18%",
            transform:"translateY(-50%)",
            width:"180px",
            height:"180px",
            animation:"spin 10s linear infinite",
            zIndex:6,
            opacity:0.9,
            pointerEvents:"none",
          }}
        />}

        {m?(
          <div style={{position:"relative",zIndex:10}}>
            <div style={{background:"#fff",padding:"40px 24px 28px",position:"relative",overflow:"hidden"}}>
              <div style={{position:"relative",zIndex:2}}>
                <h1 style={{fontWeight:900,fontSize:"clamp(2.8rem,14vw,4.5rem)",lineHeight:0.92,letterSpacing:"-0.04em",color:C.dark,animation:"fadeUp 0.8s ease-out both"}}>STUDY IN<br/>JAPAN</h1>
                <p style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"20px",color:C.primary,marginTop:"16px",animation:"fadeUp 0.8s ease-out 0.15s both"}}>Language • Culture • Adventure</p>
              </div>
            </div>
            <div style={{display:"flex",justifyContent:"center",position:"relative",zIndex:6,marginTop:"-40px",marginBottom:"-40px"}}>
              <img src="/study-in-japan-logo.png" alt="Study in Japan" style={{width:"80px",height:"80px",animation:"spin 10s linear infinite"}}/>
            </div>
            <div style={{background:C.heroBg,padding:"28px 24px"}}>
              <p style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"18px",lineHeight:1.5,color:C.text,marginBottom:"20px"}}>Study Japanese language and culture in Japan through an immersive experience beyond classrooms.</p>
              <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill={C.primary}><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.32.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z"/></svg>
                <a href="tel:0643970170" style={{fontSize:"16px",fontWeight:700,color:C.dark}}>06-4397-0170</a>
              </div>
              <div style={{padding:"0 24px 20px",display:"flex",alignItems:"center",gap:"12px"}}>
                <a href="/" style={{fontSize:"13px",fontWeight:600,color:C.primary}}>Home</a>
                <span style={{color:C.textMuted,fontSize:"13px"}}>/</span>
                <span style={{fontSize:"13px",fontWeight:600,letterSpacing:"0.08em",color:C.text,textTransform:"uppercase"}}>Study in Japan</span>
              </div>
            </div>
          </div>
        ):(
          <div style={{position:"relative",zIndex:10,display:"flex",height:"100%"}}>
            <div style={{flex:"0 0 55%",display:"flex",flexDirection:"column"}}>
              <div style={{flex:"52",display:"flex",alignItems:"center",paddingLeft:"48px"}}>
                <div>
                  <h1 style={{fontWeight:900,fontSize:"clamp(4rem,8vw,8rem)",lineHeight:0.9,letterSpacing:"-0.04em",color:C.dark,animation:"fadeUp 0.8s ease-out both"}}>STUDY<br/>IN JAPAN</h1>
                  <p style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"clamp(22px,3vw,32px)",color:C.primary,marginTop:"20px",animation:"fadeUp 0.8s ease-out 0.15s both"}}>Language • Culture • Adventure</p>
                </div>
              </div>
              <div style={{flex:"48",paddingLeft:"48px",paddingTop:"28px",paddingRight:"40px"}}>
                <p style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"clamp(16px,2.5vw,22px)",lineHeight:1.5,color:C.text,marginBottom:"28px"}}>Study Japanese language and culture in Japan through an immersive experience beyond classrooms.</p>
                <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"16px"}}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={C.primary}><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.32.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z"/></svg>
                  <a href="tel:0643970170" style={{fontSize:"18px",fontWeight:700,color:C.dark}}>06-4397-0170</a>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
                  <a href="/" style={{fontSize:"14px",fontWeight:600,color:C.primary}}>Home</a>
                  <span style={{color:C.textMuted,fontSize:"14px"}}>/</span>
                  <span style={{fontSize:"14px",fontWeight:600,letterSpacing:"0.08em",color:C.text,textTransform:"uppercase"}}>Study in Japan</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ═══ INTRO — Why Japan? ═══ */}
      <section style={{background:"url('/background.webp') center/cover no-repeat",padding:m?"48px 24px":"80px 40px",position:"relative",overflow:"hidden"}}>
  <div style={{position:"absolute",inset:0,background:"rgba(255,255,255,0.82)",backdropFilter:"blur(2px)"}}/>
  <div style={{maxWidth:"900px",margin:"0 auto",textAlign:"center",position:"relative",zIndex:1}}>
    <Reveal>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"12px",marginBottom:"16px"}}>
        <div style={{width:"40px",height:"1.5px",background:C.primary}}/><span style={{fontSize:"11px",fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",color:C.primary}}>Why Japan?</span><div style={{width:"40px",height:"1.5px",background:C.primary}}/>
      </div>
    </Reveal>
    <Reveal delay={0.1}>
      <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"26px":"clamp(28px,5vw,44px)",fontWeight:700,color:C.dark,lineHeight:1.2,marginBottom:"24px"}}>An immersive <span style={{color:C.primary,fontStyle:"italic"}}>cultural experience</span><br/>beyond classrooms</h2>
    </Reveal>
    <Reveal delay={0.2}>
      <p style={{fontSize:"15px",lineHeight:2,color:C.textLight,maxWidth:"700px",margin:"0 auto"}}>Studying Japanese in Japan offers an immersive cultural experience beyond classrooms. You&apos;ll be surrounded by the language in its natural context, gaining a competitive edge in the job market. Living in Japan expands your worldview, challenges your notions, and fosters personal growth through resilience and intercultural skills.</p>
    </Reveal>
  </div>
</section>

      {/* ═══ SPECIALTY PROGRAMS ═══ */}
      <section style={{background:C.heroBg,padding:m?"48px 24px":"80px 40px"}}>
        <div style={{maxWidth:"1200px",margin:"0 auto"}}>
          <Reveal>
            <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"12px"}}>
              <div style={{width:"40px",height:"1.5px",background:C.primary}}/><span style={{fontSize:"11px",fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",color:C.primary}}>Specialty Programs</span>
            </div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"26px":"clamp(28px,4vw,40px)",fontWeight:700,color:C.dark,lineHeight:1.15,marginBottom:"12px"}}>Beyond Language</h2>
            <p style={{fontSize:"15px",color:C.textLight,marginBottom:m?"32px":"48px",maxWidth:"500px"}}>Choose one or more cultural programs to complement your Japanese language studies.</p>
          </Reveal>
          <div style={{display:"grid",gridTemplateColumns:m?"1fr":"repeat(2,1fr)",gap:m?"16px":"24px"}}>
            {programs.map((p,i)=>(
              <Reveal key={p.title} delay={i*0.1}>
                <ProgramCard {...p} m={m}/>
              </Reveal>
            ))}
          </div>
          {/* Language courses note */}
          <Reveal delay={0.4}>
            <div style={{marginTop:m?"24px":"40px",background:"#fff",borderRadius:"16px",padding:m?"24px":"32px",border:"1.5px solid #e4e8f2",display:"flex",flexDirection:m?"column":"row",gap:"24px",alignItems:m?"flex-start":"center"}}>
              <div style={{fontSize:"48px",flexShrink:0}}><svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19V5a2 2 0 012-2h8l6 6v10a2 2 0 01-2 2H6a2 2 0 01-2-2z"/><path d="M14 3v6h6"/><path d="M8 13h8"/><path d="M8 17h5"/></svg></div>
              <div>
                <h3 style={{fontSize:"18px",fontWeight:700,color:C.dark,marginBottom:"8px"}}>Core Language Courses</h3>
                <p style={{fontSize:"14px",lineHeight:1.7,color:C.textLight}}>Japanese Language is compulsory for all enrolled students (N5 to N1). English language courses also available — Beginner to Advanced, IELTS, TOEFL, English for Tourism. All taught at our Tennoji facility.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ APPLICATION TIMELINE ═══ */}
      <section style={{background:"#fff",padding:m?"48px 24px":"80px 40px"}}>
        <div style={{maxWidth:"800px",margin:"0 auto"}}>
          <Reveal>
            <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"12px"}}>
              <div style={{width:"40px",height:"1.5px",background:C.primary}}/><span style={{fontSize:"11px",fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",color:C.primary}}>Your Journey</span>
            </div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"26px":"clamp(28px,4vw,40px)",fontWeight:700,color:C.dark,lineHeight:1.15,marginBottom:m?"32px":"48px"}}>Application Process</h2>
          </Reveal>
          {timeline.map((step,i)=>(
            <Reveal key={i} delay={i*0.08}>
              <TimelineStep num={i+1} title={step.title} desc={step.desc} isLast={i===timeline.length-1} m={m}/>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══ LIFE IN OSAKA ═══ */}
      <section style={{background:C.heroBg,padding:m?"48px 24px":"80px 40px"}}>
        <div style={{maxWidth:"1200px",margin:"0 auto"}}>
          <Reveal>
            <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"12px"}}>
              <div style={{width:"40px",height:"1.5px",background:C.primary}}/><span style={{fontSize:"11px",fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",color:C.primary}}>Life in Japan</span>
            </div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"26px":"clamp(28px,4vw,40px)",fontWeight:700,color:C.dark,lineHeight:1.15,marginBottom:m?"32px":"48px"}}>Living in <span style={{color:C.primary,fontStyle:"italic"}}>Osaka</span></h2>
          </Reveal>
          <div style={{display:"grid",gridTemplateColumns:m?"1fr":"1fr 1fr 1fr",gap:m?"16px":"24px",marginBottom:m?"24px":"40px"}}>
            <Reveal><OsakaCard emoji={<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 16a9 9 0 0118 0"/><ellipse cx="12" cy="16" rx="9" ry="3"/><path d="M7 10c1-4 4-7 5-7s4 3 5 7"/><path d="M2 13l2-1M22 13l-2-1"/></svg>} title="Meals & Food" desc="Fully equipped kitchens in your lodgings plus a 2-hour lunch break daily. Enjoy local takoyaki, okonomiyaki, and kushikatsu at countless eateries." m={m}/></Reveal>
            <Reveal delay={0.1}><OsakaCard emoji={<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3L2 9l10 6 10-6-10-6z"/><path d="M2 17l10 6 10-6"/><path d="M2 13l10 6 10-6"/></svg>} title="Student Life" desc="From Tenjin Matsuri to modern concerts, Osaka offers endless activities. Parks like Osaka Castle Park provide tranquil spaces to unwind." m={m} accent={C.primary}/></Reveal>
            <Reveal delay={0.2}><OsakaCard emoji={<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h16"/><path d="M6 20v-6l6-10 6 10v6"/><path d="M10 20v-4h4v4"/><path d="M8 14h8"/><path d="M10 8h4"/></svg>} title="Culture & Fun" desc="Shopping districts, parks, attractions — there's never a dull moment. The perfect balance of cultural experiences and entertainment." m={m}/></Reveal>
          </div>

          {/* Weather */}
          <Reveal delay={0.3}>
            <div style={{marginBottom:"16px",display:"flex",alignItems:"center",gap:"12px"}}>
              <span style={{fontSize:"28px"}}><svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg></span>
              <div>
                <h3 style={{fontSize:"18px",fontWeight:700,color:C.dark}}>Osaka Weather</h3>
                <p style={{fontSize:"13px",color:C.textLight}}>Warm temperate climate • Summers hot & humid • Winters cool & clear</p>
              </div>
            </div>
            <WeatherChart m={m}/>
          </Reveal>
        </div>
      </section>

      {/* ═══ VISA — Stepper ═══ */}
      <section style={{background:"#fff",padding:m?"48px 24px":"80px 40px"}}>
        <div style={{maxWidth:"1200px",margin:"0 auto"}}>
          <Reveal>
            <div style={{textAlign:"center",marginBottom:m?"32px":"48px"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"12px",marginBottom:"12px"}}>
                <div style={{width:"40px",height:"1.5px",background:C.primary}}/><span style={{fontSize:"11px",fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",color:C.primary}}>Getting a Visa</span><div style={{width:"40px",height:"1.5px",background:C.primary}}/>
              </div>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"26px":"clamp(28px,4vw,40px)",fontWeight:700,color:C.dark,lineHeight:1.15}}>4 Simple Steps</h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <VisaStepper steps={visaSteps} m={m}/>
          </Reveal>
          <Reveal delay={0.2}>
            <div style={{marginTop:m?"24px":"40px",background:C.primaryLight,borderRadius:"16px",padding:m?"24px":"32px",textAlign:"center"}}>
              <p style={{fontSize:"14px",lineHeight:1.8,color:C.textLight,maxWidth:"700px",margin:"0 auto"}}>As a practical matter, it is each student&apos;s responsibility to establish their legal right to travel to Japan. All applicants provide valid passport information and complete a one-to-one consultation. Our faculty staff will guide you through the entire visa sponsorship process.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{background:C.primary,padding:m?"48px 24px":"80px 40px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:"-50px",right:"-50px",width:"200px",height:"200px",borderRadius:"50%",border:"1px solid rgba(255,255,255,0.06)"}}/>
        <div style={{position:"absolute",bottom:"-80px",left:"-40px",width:"250px",height:"250px",borderRadius:"50%",border:"1px solid rgba(255,255,255,0.04)"}}/>
        <div style={{maxWidth:"900px",margin:"0 auto",textAlign:"center",position:"relative",zIndex:1}}>
          <div style={{fontSize:"48px",marginBottom:"20px",animation:"float 3s ease-in-out infinite"}}><svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5h16v2H4z"/><path d="M12 7v14"/><path d="M8 7c0-2 1.5-4 4-4s4 2 4 4"/><path d="M9 21h6"/></svg></div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"28px":"clamp(28px,5vw,44px)",fontWeight:700,color:"#fff",lineHeight:1.15,marginBottom:"16px"}}>Ready to start your<br/>journey in Japan?</h2>
          <p style={{fontSize:"15px",lineHeight:1.8,color:"rgba(255,255,255,0.7)",maxWidth:"500px",margin:"0 auto 32px"}}>Contact us to learn more about our programs, visa sponsorship, and life in Osaka.</p>
          <div style={{display:"flex",justifyContent:"center",gap:"16px",flexWrap:"wrap"}}>
            <a href="/inquiry" style={{display:"inline-flex",alignItems:"center",gap:"10px",padding:"16px 32px",borderRadius:"999px",background:"#fff",color:C.primary,fontSize:"15px",fontWeight:700,textDecoration:"none"}}>
              Contact Us <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="tel:0643970170" style={{display:"inline-flex",alignItems:"center",gap:"10px",padding:"16px 32px",borderRadius:"999px",border:"1.5px solid rgba(255,255,255,0.4)",color:"#fff",fontSize:"15px",fontWeight:600,textDecoration:"none"}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg> 06-4397-0170
            </a>
          </div>
        </div>
      </section>
    </>
  );
}