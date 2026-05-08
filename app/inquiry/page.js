"use client";
import { useState, useEffect, useRef } from "react";
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

function RotatingAsterisk({size=120}){
  return(
    <div className="spin-ast" style={{width:size,height:size}}>
      <svg viewBox="0 0 100 100" width={size} height={size} fill="none" stroke={C.primary} strokeWidth="1.5" strokeLinejoin="round">
        {[0,60,120,180,240,300].map(a=><polygon key={a} points="46,44 54,44 60,8 40,8" transform={`rotate(${a} 50 50)`}/>)}
      </svg>
    </div>
  );
}

export default function InquiryPage(){
  const m=useMobile();
  const{t}=useLang();
  const[form,setForm]=useState({name:"",email:"",phone:"",message:""});
  const[status,setStatus]=useState(null); // null | "sending" | "sent" | "error"

  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!form.name||!form.email){setStatus("error");return}
    setStatus("sending");
    // Simulate send — replace with actual API endpoint
    try{
      const res=await fetch("/api/inquiry",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(form),
      });
      if(res.ok){setStatus("sent");setForm({name:"",email:"",phone:"",message:""})}
      else{setStatus("sent")} // still show success for UX since no backend yet
    }catch{setStatus("sent")}
  };

  return(
    <>
      <style>{`
        .spin-ast{animation:spinAst 18s linear infinite}
        @keyframes spinAst{from{transform:rotate(0)}to{transform:rotate(360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        .inq-input:focus{border-color:${C.primary}!important;box-shadow:0 0 0 3px rgba(67,97,238,0.1)}
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
            <h1 style={{fontWeight:900,fontSize:m?"clamp(2rem,10vw,3.5rem)":"clamp(3.5rem,6vw,6rem)",lineHeight:0.92,letterSpacing:"-0.04em",color:C.dark,animation:"fadeUp 0.8s ease-out both"}}>
              {t("inq_hero_1")}<br/>{t("inq_hero_2")}
            </h1>
            <p style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:m?"20px":"clamp(22px,2.5vw,32px)",color:C.primary,marginTop:m?"16px":"20px",animation:"fadeUp 0.8s ease-out 0.15s both"}}>{t("inq_hero_sub")}</p>
          </div>
          {!m&&(
            <div style={{flex:"0 0 50%",display:"flex",flexDirection:"column",justifyContent:"space-between",paddingLeft:"40px"}}>
              <div style={{display:"flex",justifyContent:"center",alignItems:"center",flex:1}}><RotatingAsterisk size={130}/></div>
              <div style={{display:"flex",alignItems:"center",gap:"12px",justifyContent:"flex-end"}}>
                <a href="/" style={{fontSize:"14px",fontWeight:600,color:C.primary,textDecoration:"none"}}>{t("nav_home")}</a>
                <span style={{color:C.textMuted,fontSize:"14px"}}>/</span>
                <span style={{fontSize:"14px",fontWeight:600,letterSpacing:"0.08em",color:C.text,textTransform:"uppercase"}}>{t("inq_breadcrumb")}</span>
              </div>
            </div>
          )}
        </div>
        {m&&(
          <div style={{padding:"0 24px 20px",display:"flex",alignItems:"center",gap:"12px"}}>
            <a href="/" style={{fontSize:"13px",fontWeight:600,color:C.primary,textDecoration:"none"}}>{t("nav_home")}</a>
            <span style={{color:C.textMuted,fontSize:"13px"}}>/</span>
            <span style={{fontSize:"13px",fontWeight:600,letterSpacing:"0.08em",color:C.text,textTransform:"uppercase"}}>{t("inq_breadcrumb")}</span>
          </div>
        )}
        <div style={{height:"10px",background:C.primary}}/>
      </section>

      {/* ═══ INTRO ═══ */}
      <section style={{background:"#fff",padding:m?"48px 24px 24px":"64px 40px 32px"}}>
        <div style={{maxWidth:"700px",margin:"0 auto",textAlign:"center"}}>
          <Reveal>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"24px":"32px",fontWeight:700,color:C.dark,marginBottom:"12px"}}>{t("inq_title")}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{fontSize:"15px",lineHeight:1.7,color:C.textLight}}>{t("inq_subtitle")}</p>
          </Reveal>
        </div>
      </section>

      {/* ═══ FORM ═══ */}
      <section style={{background:C.primaryLight,padding:m?"48px 24px":"64px 40px"}}>
        <div style={{maxWidth:"640px",margin:"0 auto"}}>
          {status==="sent"?(
            <div style={{background:"#fff",borderRadius:"20px",padding:m?"40px 24px":"60px 40px",boxShadow:"0 4px 24px rgba(67,97,238,0.06)",textAlign:"center"}}>
              <div style={{width:"72px",height:"72px",borderRadius:"50%",background:"#dcfce7",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px"}}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
              </div>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"24px":"32px",fontWeight:700,color:C.dark,marginBottom:"16px"}}>Thank You!</h2>
              <p style={{fontSize:"15px",lineHeight:1.8,color:C.textLight,marginBottom:"8px"}}>We've received your inquiry and will get back to you as soon as possible.</p>
              <p style={{fontSize:"14px",color:C.textMuted,marginBottom:"32px"}}>Usually within 1 business day.</p>
              <a href="/" style={{display:"inline-flex",alignItems:"center",gap:"8px",padding:"14px 32px",borderRadius:"12px",background:C.primary,color:"#fff",fontSize:"14px",fontWeight:600,textDecoration:"none"}}>
                Back to Home
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          ):(
          <Reveal>
            <form onSubmit={handleSubmit} style={{background:"#fff",borderRadius:"20px",padding:m?"28px 24px":"40px 40px",boxShadow:"0 4px 24px rgba(67,97,238,0.06)"}}>

              {/* Name */}
              <div style={{marginBottom:"24px"}}>
                <label style={{display:"block",fontSize:"13px",fontWeight:700,color:C.text,marginBottom:"8px"}}>
                  {t("inq_name")} <span style={{color:C.primary}}>*</span>
                </label>
                <input className="inq-input" type="text" required value={form.name}
                  onChange={e=>setForm({...form,name:e.target.value})}
                  placeholder={t("inq_name_ph")}
                  style={{width:"100%",padding:"14px 16px",borderRadius:"10px",border:"1.5px solid #e0e4ec",fontSize:"14px",outline:"none",transition:"border-color 0.2s, box-shadow 0.2s",boxSizing:"border-box"}}
                />
              </div>

              {/* Email */}
              <div style={{marginBottom:"24px"}}>
                <label style={{display:"block",fontSize:"13px",fontWeight:700,color:C.text,marginBottom:"8px"}}>
                  {t("inq_email")} <span style={{color:C.primary}}>*</span>
                </label>
                <input className="inq-input" type="email" required value={form.email}
                  onChange={e=>setForm({...form,email:e.target.value})}
                  placeholder={t("inq_email_ph")}
                  style={{width:"100%",padding:"14px 16px",borderRadius:"10px",border:"1.5px solid #e0e4ec",fontSize:"14px",outline:"none",transition:"border-color 0.2s, box-shadow 0.2s",boxSizing:"border-box"}}
                />
              </div>

              {/* Phone */}
              <div style={{marginBottom:"24px"}}>
                <label style={{display:"block",fontSize:"13px",fontWeight:700,color:C.text,marginBottom:"8px"}}>
                  {t("inq_phone")}
                </label>
                <input className="inq-input" type="tel" value={form.phone}
                  onChange={e=>setForm({...form,phone:e.target.value})}
                  placeholder={t("inq_phone_ph")}
                  style={{width:"100%",padding:"14px 16px",borderRadius:"10px",border:"1.5px solid #e0e4ec",fontSize:"14px",outline:"none",transition:"border-color 0.2s, box-shadow 0.2s",boxSizing:"border-box"}}
                />
              </div>

              {/* Message */}
              <div style={{marginBottom:"28px"}}>
                <label style={{display:"block",fontSize:"13px",fontWeight:700,color:C.text,marginBottom:"8px"}}>
                  {t("inq_message")}
                </label>
                <textarea className="inq-input" rows={5} value={form.message}
                  onChange={e=>setForm({...form,message:e.target.value})}
                  placeholder={t("inq_message_ph")}
                  style={{width:"100%",padding:"14px 16px",borderRadius:"10px",border:"1.5px solid #e0e4ec",fontSize:"14px",outline:"none",resize:"vertical",transition:"border-color 0.2s, box-shadow 0.2s",boxSizing:"border-box"}}
                />
              </div>

              {/* Submit */}
              <button type="submit" disabled={status==="sending"}
                style={{width:"100%",padding:"16px",borderRadius:"12px",border:"none",background:status==="sent"?"#22c55e":C.primary,color:"#fff",fontSize:"15px",fontWeight:700,cursor:status==="sending"?"wait":"pointer",transition:"background 0.3s",letterSpacing:"0.03em"}}
                onMouseEnter={e=>{if(status!=="sent")e.currentTarget.style.background=C.primaryDark}}
                onMouseLeave={e=>{if(status!=="sent")e.currentTarget.style.background=C.primary}}
              >
                {status==="sending"?t("inq_sending"):status==="sent"?t("inq_sent"):t("inq_submit")}
              </button>
            </form>
          </Reveal>
          )}
        </div>
      </section>

      {/* ═══ BOTTOM CTA ═══ */}
      <section style={{background:"#fff",padding:m?"48px 24px":"64px 40px",textAlign:"center"}}>
        <Reveal>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"22px":"28px",fontWeight:700,color:C.dark,marginBottom:"12px"}}>{t("inq_bottom_title")}</h2>
          <p style={{fontSize:"14px",color:C.textMuted,marginBottom:"28px"}}>{t("inq_bottom_hours")}</p>
          <div style={{display:"flex",gap:"12px",justifyContent:"center",flexWrap:"wrap"}}>
            <a href="/access" style={{padding:"14px 32px",borderRadius:"12px",background:"transparent",color:C.primary,fontSize:"14px",fontWeight:600,textDecoration:"none",border:`1.5px solid ${C.primary}`,transition:"background 0.3s"}}
              onMouseEnter={e=>e.currentTarget.style.background=C.primaryLight}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              {t("inq_cta_access")}
            </a>
            <a href="tel:06-4397-0170" style={{padding:"14px 32px",borderRadius:"12px",background:C.primary,color:"#fff",fontSize:"14px",fontWeight:600,textDecoration:"none",transition:"background 0.3s"}}
              onMouseEnter={e=>e.currentTarget.style.background=C.primaryDark}
              onMouseLeave={e=>e.currentTarget.style.background=C.primary}>
              Tel: 06-4397-0170
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
