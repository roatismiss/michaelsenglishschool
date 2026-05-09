"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const C = {
  primary:"#4361EE", primaryDark:"#3651D4", primaryLight:"#EEF1FF",
  dark:"#1a1a2e", text:"#333", textLight:"#666", textMuted:"#999",
};

export default function DivePopup() {
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;
    const t = setTimeout(() => {
      setShow(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    }, 2800);
    return () => clearTimeout(t);
  }, [pathname]);

  const close = () => {
    setVisible(false);
    setTimeout(() => setShow(false), 350);
  };

  if (!show) return null;

  return (
    <div onClick={close} style={{
      position:"fixed", inset:0, zIndex:99999,
      background:`rgba(26,26,46,${visible?0.65:0})`,
      backdropFilter:`blur(${visible?6:0}px)`,
      display:"flex", alignItems:"center", justifyContent:"center",
      padding:"20px",
      transition:"background 0.35s, backdrop-filter 0.35s",
    }}>
      <style>{`
        .dp-inner{transition:all 0.4s cubic-bezier(0.16,1,0.3,1)}
        .dp-close:hover{background:#f0f0f0!important}
        .dp-close{transition:background 0.2s}
        .dp-cta:hover{background:${C.primaryDark}!important;transform:translateY(-2px)}
        .dp-cta{transition:all 0.25s}
      `}</style>

      <div className="dp-inner" onClick={e=>e.stopPropagation()} style={{
        background:"#fff",
        borderRadius:"20px",
        maxWidth:"500px", width:"100%",
        overflow:"hidden",
        boxShadow:"0 24px 80px rgba(0,0,0,0.2)",
        transform:visible?"translateY(0) scale(1)":"translateY(28px) scale(0.95)",
        opacity:visible?1:0,
      }}>
        {/* Image */}
        <div style={{position:"relative",height:"200px",overflow:"hidden"}}>
          <img src="/dive/underwater.jpeg" alt="Dive Into English" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center 35%"}}/>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(26,26,46,0.5),transparent)"}}/>

          {/* Limited offer badge */}
          <div style={{position:"absolute",top:"14px",left:"14px",background:C.primary,borderRadius:"8px",padding:"5px 12px",display:"flex",alignItems:"center",gap:"6px"}}>
            <div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#4ade80",animation:"pulse 1.5s ease-in-out infinite"}}/>
            <span style={{fontSize:"11px",fontWeight:700,color:"#fff",letterSpacing:"0.08em"}}>LIMITED OFFER</span>
          </div>

          {/* Close */}
          <button className="dp-close" onClick={close} style={{
            position:"absolute",top:"12px",right:"12px",
            background:"rgba(255,255,255,0.9)",border:"none",borderRadius:"50%",
            width:"32px",height:"32px",cursor:"pointer",
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px",color:C.dark,lineHeight:1,
          }}>Ã—</button>
        </div>

        {/* Content */}
        <div style={{padding:"24px 24px 28px"}}>
          {/* Label */}
          <div style={{fontSize:"10px",fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",color:C.primary,marginBottom:"8px"}}>
            New Programme Â· Cebu, Philippines Â· Mayâ€“October
          </div>

          {/* Title */}
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"22px",fontWeight:700,color:C.dark,lineHeight:1.2,marginBottom:"8px"}}>
            Dive Into English â€”<br/><em style={{color:C.primary}}>Study English while scuba diving</em>
          </h2>

          {/* Tagline */}
          <p style={{fontSize:"13px",lineHeight:1.7,color:C.textLight,marginBottom:"16px"}}>
            5 days Â· 4 nights Â· PADI Open Water + full English immersion in the Philippines. Your teacher is also your dive instructor.
          </p>

          {/* Price + CTA */}
          <div style={{background:C.primaryLight,borderRadius:"12px",padding:"14px 16px",marginBottom:"16px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"12px",flexWrap:"wrap"}}>
            <div>
              <div style={{fontSize:"11px",color:C.textMuted,marginBottom:"2px"}}>Partnership rate</div>
              <div style={{display:"flex",alignItems:"baseline",gap:"8px"}}>
                <s style={{fontSize:"14px",color:C.textMuted,fontWeight:400}}>$1,100</s>
                <span style={{fontFamily:"'Playfair Display',serif",fontSize:"32px",fontWeight:700,color:C.primary,lineHeight:1}}>$899</span>
                <span style={{fontSize:"12px",color:C.textMuted}}>USD/student</span>
              </div>
            </div>
            <div style={{fontSize:"12px",color:C.textLight,textAlign:"right",maxWidth:"160px"}}>
              In partnership with<br/><strong style={{color:C.text}}>Blue Orchid Resort</strong>
            </div>
          </div>

          <div style={{display:"flex",gap:"10px"}}>
            <a href="/dive-into-english" className="dp-cta" style={{
              flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",
              padding:"13px 20px",borderRadius:"10px",
              background:C.primary,color:"#fff",
              fontSize:"14px",fontWeight:700,textDecoration:"none",
            }}>
              Discover the Programme
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <button onClick={close} style={{padding:"13px 16px",borderRadius:"10px",border:`1.5px solid #e4e8f2`,background:"transparent",color:C.textMuted,fontSize:"13px",cursor:"pointer",fontWeight:600,transition:"all 0.2s"}}>
              Later
            </button>
          </div>
        </div>
      </div>

      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
    </div>
  );
}

