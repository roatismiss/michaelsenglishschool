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
  useEffect(()=>{if(!ref.current)return;const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){sV(true);o.disconnect()}},{threshold:0.1});o.observe(ref.current);return()=>o.disconnect()},[]);
  return <div ref={ref} style={{opacity:v?1:0,transform:v?"translateY(0)":"translateY(24px)",transition:`opacity 0.7s ease-out ${delay}s, transform 0.7s ease-out ${delay}s`}}>{children}</div>;
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

const CONTENT = {
  en: {
    badge: "Educational Partnership · Cebu, Philippines",
    tagline: "Who said English should be studied just in class?",
    title: ["DIVE", "INTO", "ENGLISH"],
    subtitle: "Your teacher. Your instructor. One unforgettable experience.",
    cta1: "Claim Your Spot",
    cta2: "See What's Included",
    stat1: ["5 Days · 4 Nights", "Moalboal, Cebu"],
    stat2: ["PADI 5★", "Open Water Incl."],
    stat3: ["$899 USD", "Partnership Rate"],
    whyLabel: "Why This Works",
    whyTitle: ["One teacher. Two worlds.", "An experience no classroom can replicate."],
    whyP1: "English is the official language of the Philippines — the only country in Asia where it is. Constitutionally official. Used in government, courts, business, and from the first day of school.",
    whyP2: "At Blue Orchid Resort, students learn from English teachers who are also certified PADI scuba diving instructors. The same person on the boat, in the water, and at the table. Students return with a PADI Open Water certification, four days of true immersion, and a story they'll tell forever.",
    pillarsTitle: "Three pillars. One journey.",
    pillars: [
      {word:"Speak.", desc:"Four days of total English immersion — in the water, on the boat, at the table. Structured vocabulary sessions with your dual-skilled instructor."},
      {word:"Dive.", desc:"PADI 5-Star Resort. Open Water certification included. All equipment included. Moalboal's world-famous sardine run minutes from the door."},
      {word:"Adventure.", desc:"Kawasan Falls canyoneering — jumping, swimming, sliding through turquoise rivers. A full Filipino adventure built into the programme."},
    ],
    includesLabel: "Everything Covered",
    includesTitle: "What's Included",
    includes: [
      {title:"PADI Open Water", desc:"Full certification — theory, confined water, four open-water dives. All equipment included."},
      {title:"English Immersion", desc:"Structured sessions with your English-teaching dive instructor. CEFR A2–B1."},
      {title:"Kawasan Falls", desc:"Jumping, swimming, sliding through turquoise rivers. A full Filipino adventure."},
      {title:"4 Nights Accommodation", desc:"Blue Orchid Resort — a PADI 5-Star Resort on the shores of Moalboal, Cebu."},
      {title:"Round-Trip Transfer", desc:"Private airport transfer between Cebu International and Blue Orchid, both ways."},
      {title:"Daily Breakfast", desc:"Filipino and international breakfast served each morning at the resort."},
    ],
    pricingQuote: '"Who said English should be studied just in class?"',
    pricingLabel: "Partnership Rate · Per Student · May–October",
    pricingWas: "$1,100",
    pricingNote: "USD per student",
    partnerBadge: "In partnership with Blue Orchid Resort — supporting English education",
    reserveBtn: "Reserve Your Spot",
    checkList: ["5 days · 4 nights at Blue Orchid Resort","PADI Open Water with all equipment","English immersion sessions","Round-trip airport transfer","Daily breakfast","Kawasan Falls canyoneering"],
    formLabel: "Reserve Your Spot",
    formTitle: "Interested? Get in touch.",
    formDesc: "Send us a message and we'll get back to you with all the details about the programme.",
    formName: "Your Name *",
    formEmail: "Email Address *",
    formPhone: "Phone Number",
    formMsg: "Message",
    formMsgPh: "Tell us about your group, dates, or any questions...",
    formBtn: "Send Inquiry",
    formSending: "Sending...",
    formThanks: "Thank You!",
    formThanksDesc: "We'll be in touch shortly with all the details.",
    formError: "Something went wrong. Please try again.",
    ctaTitle: "Limited cohorts. Reserved by agreement.",
    ctaDesc: "Contact Michael's English School to secure spots for the May–October season.",
    ctaBtn: "Get in Touch",
    ctaPhone: "Visit Osaka School",
  },
  ja: {
    badge: "教育パートナーシップ · セブ島、フィリピン",
    tagline: "英語は教室だけで学ぶものではない。",
    title: ["ダイブ", "イン", "イングリッシュ"],
    subtitle: "あなたの先生は、ダイビングインストラクターでもある。忘れられない体験。",
    cta1: "スポットを確保する",
    cta2: "含まれるものを見る",
    stat1: ["5日間 · 4泊", "モアルボアル、セブ"],
    stat2: ["PADI 5★", "オープンウォーター含む"],
    stat3: ["$899 USD", "パートナーシップ料金"],
    whyLabel: "なぜこのプログラムが効果的か",
    whyTitle: ["一人の先生。二つの世界。", "教室では再現できない体験。"],
    whyP1: "英語はフィリピンの公用語です — アジアで唯一、英語が公式に使われている国。政府、裁判所、ビジネス、そして初日の学校から英語が使われています。",
    whyP2: "ブルーオーキッドリゾートでは、英語教師でもあり認定PADIスキューバダイビングインストラクターでもある講師から学びます。ボートの上でも、水中でも、食卓でも同じ人が教えます。学生はPADIオープンウォーター認定証と4日間の真の英語漬け体験を持ち帰り、一生語り継ぐ思い出を作ります。",
    pillarsTitle: "三つの柱。一つの旅。",
    pillars: [
      {word:"話す。", desc:"4日間の完全英語漬け体験 — 水中でも、ボートの上でも、食卓でも。デュアルスキルインストラクターとの語彙セッション付き。"},
      {word:"潜る。", desc:"PADI5スターリゾート。オープンウォーター認定含む。全機材含む。モアルボアル名物のイワシの群れはリゾートから数分。"},
      {word:"冒険する。", desc:"カワサン滝キャニオニング — ターコイズブルーの川でジャンプ、スイム、スライド。フィリピンの大冒険がプログラムに組み込まれています。"},
    ],
    includesLabel: "すべて含まれています",
    includesTitle: "含まれるもの",
    includes: [
      {title:"PADIオープンウォーター", desc:"完全認定コース — 学科、限定水域、4回のオープンウォーターダイブ。全機材含む。"},
      {title:"英語イマージョン", desc:"英語教師のダイビングインストラクターによる構造化セッション。CEFR A2〜B1対応。"},
      {title:"カワサン滝", desc:"ターコイズブルーの川でジャンプ、スイム、スライド。フィリピンの大冒険。"},
      {title:"4泊宿泊", desc:"ブルーオーキッドリゾート — モアルボアル海岸のPADI5スターリゾート。"},
      {title:"往復送迎", desc:"セブ国際空港〜ブルーオーキッドリゾート間のプライベート送迎（往復）。"},
      {title:"毎朝の朝食", desc:"フィリピン料理と国際料理の朝食がリゾートで毎朝提供されます。"},
    ],
    pricingQuote: '「英語は教室だけで学ぶものではない。」',
    pricingLabel: "パートナーシップ料金 · 1名様 · 5〜10月",
    pricingWas: "$1,100",
    pricingNote: "USD / 1名様",
    partnerBadge: "ブルーオーキッドリゾートとのパートナーシップ — 日本の英語教育を支援",
    reserveBtn: "スポットを予約する",
    checkList: ["5日間 · 4泊（ブルーオーキッドリゾート）","全機材付きPADIオープンウォーター","英語イマージョンセッション","往復空港送迎","毎朝の朝食","カワサン滝キャニオニング"],
    formLabel: "スポットを確保する",
    formTitle: "ご興味をお持ちですか？",
    formDesc: "メッセージをお送りください。プログラムの詳細についてご連絡いたします。",
    formName: "お名前 *",
    formEmail: "メールアドレス *",
    formPhone: "電話番号",
    formMsg: "メッセージ",
    formMsgPh: "グループ人数、希望日程、ご質問などをお知らせください...",
    formBtn: "お問い合わせを送る",
    formSending: "送信中...",
    formThanks: "ありがとうございます！",
    formThanksDesc: "詳細についてすぐにご連絡いたします。",
    formError: "エラーが発生しました。もう一度お試しください。",
    ctaTitle: "定員制。事前予約が必要です。",
    ctaDesc: "5〜10月シーズンのスポット確保のため、マイケルズイングリッシュスクールまでお問い合わせください。",
    ctaBtn: "お問い合わせ",
    ctaPhone: "大阪校を訪問する",
  }
};

// Images matched to each include card in order:
// PADI, English Immersion, Kawasan Falls, Accommodation, Transfer, Breakfast
const IMGS = [
  "/dive/beach.jpeg",    // PADI — sardine run diver
  "/dive/underwater.jpeg", // English Immersion — diver with turtle
  "/dive/diver.jpeg",    // Kawasan Falls
  "/dive/img11.jpeg",    // Accommodation — bungalow with ocean view
  "/dive/img10.jpeg",    // Transfer — aerial resort coastline
  "/dive/img15.jpeg",    // Breakfast — aerial pool resort view
];

function DiveForm({m, c}){
  const[form,setForm]=useState({name:"",email:"",phone:"",message:""});
  const[status,setStatus]=useState(null);

  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!form.name||!form.email)return;
    setStatus("sending");
    try{
      const res=await fetch("/api/dive-inquiry",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});
      if(res.ok){setStatus("sent");setForm({name:"",email:"",phone:"",message:""})}
      else setStatus("error");
    }catch{setStatus("error")}
  };

  if(status==="sent") return(
    <div style={{background:C.primaryLight,borderRadius:"16px",padding:"40px 24px",textAlign:"center"}}>
      <div style={{width:"56px",height:"56px",borderRadius:"50%",background:"#dcfce7",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"}}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
      </div>
      <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"22px",fontWeight:700,color:C.dark,marginBottom:"8px"}}>{c.formThanks}</h3>
      <p style={{fontSize:"15px",color:C.textLight}}>{c.formThanksDesc}</p>
    </div>
  );

  return(
    <form onSubmit={handleSubmit} style={{background:C.primaryLight,borderRadius:"20px",padding:m?"24px":"36px"}}>
      <style>{`.dive-input:focus{border-color:${C.primary}!important;box-shadow:0 0 0 3px rgba(67,97,238,0.1)}`}</style>
      {[
        {label:c.formName, type:"text", key:"name", ph:""},
        {label:c.formEmail, type:"email", key:"email", ph:""},
        {label:c.formPhone, type:"tel", key:"phone", ph:""},
      ].map(f=>(
        <div key={f.key} style={{marginBottom:"16px"}}>
          <label style={{display:"block",fontSize:"13px",fontWeight:700,color:C.text,marginBottom:"6px"}}>{f.label}</label>
          <input className="dive-input" type={f.type} required={f.label.includes("*")} value={form[f.key]}
            onChange={e=>setForm({...form,[f.key]:e.target.value})}
            style={{width:"100%",padding:"12px 14px",borderRadius:"10px",border:"1.5px solid #e0e4ec",fontSize:"14px",outline:"none",background:"#fff",boxSizing:"border-box"}}
          />
        </div>
      ))}
      <div style={{marginBottom:"20px"}}>
        <label style={{display:"block",fontSize:"13px",fontWeight:700,color:C.text,marginBottom:"6px"}}>{c.formMsg}</label>
        <textarea className="dive-input" rows={4} value={form.message}
          onChange={e=>setForm({...form,message:e.target.value})}
          placeholder={c.formMsgPh}
          style={{width:"100%",padding:"12px 14px",borderRadius:"10px",border:"1.5px solid #e0e4ec",fontSize:"14px",outline:"none",resize:"vertical",background:"#fff",boxSizing:"border-box"}}
        />
      </div>
      <button type="submit" disabled={status==="sending"} style={{width:"100%",padding:"14px",borderRadius:"10px",border:"none",background:C.primary,color:"#fff",fontSize:"15px",fontWeight:700,cursor:status==="sending"?"wait":"pointer",transition:"background 0.3s"}}
        onMouseEnter={e=>{if(status!=="sending")e.currentTarget.style.background=C.primaryDark}}
        onMouseLeave={e=>{if(status!=="sending")e.currentTarget.style.background=C.primary}}>
        {status==="sending"?c.formSending:c.formBtn}
      </button>
      {status==="error"&&<p style={{fontSize:"13px",color:"#ef4444",marginTop:"10px",textAlign:"center"}}>{c.formError}</p>}
    </form>
  );
}

export default function DiveIntoEnglishPage(){
  const m=useMobile();
  const {lang}=useLang();
  const c=CONTENT[lang]||CONTENT.en;

  return(
    <>
      <style>{`
        .spin-ast{animation:spinAst 18s linear infinite}
        @keyframes spinAst{from{transform:rotate(0)}to{transform:rotate(360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        .card-hover{transition:all 0.3s ease}
        .card-hover:hover{transform:translateY(-6px);box-shadow:0 16px 40px rgba(67,97,238,0.15)!important}
        .btn-primary{background:${C.primary};color:#fff;transition:background 0.25s,transform 0.25s}
        .btn-primary:hover{background:${C.primaryDark};transform:translateY(-2px)}
        .btn-outline{background:transparent;color:${C.primary};border:1.5px solid ${C.primary};transition:all 0.25s}
        .btn-outline:hover{background:${C.primaryLight}}
        .btn-white{background:#fff;color:${C.primary};transition:all 0.25s}
        .btn-white:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,0.12)}
        img{display:block}
      `}</style>

      {/* ═══ HERO ═══ */}
      <section style={{background:"#fff",position:"relative",overflow:"hidden"}}>
        {!m&&<>
          <div style={{position:"absolute",left:"12%",top:0,bottom:"10px",width:"1px",background:"#e8ecf2",zIndex:1}}/>
          <div style={{position:"absolute",left:"calc(31% - 16px)",top:0,bottom:"10px",width:"1px",background:"#e8ecf2",zIndex:1}}/>
          <div style={{position:"absolute",left:"calc(31% + 16px)",top:0,bottom:"10px",width:"1px",background:"#e8ecf2",zIndex:1}}/>
          <div style={{position:"absolute",right:"12%",top:0,bottom:"10px",width:"1px",background:"#e8ecf2",zIndex:1}}/>
        </>}
        <div style={{display:"flex",flexDirection:m?"column":"row",position:"relative",zIndex:2,padding:m?"40px 24px 24px":"60px 48px 40px"}}>
          <div style={{flex:m?"none":"0 0 52%",position:"relative"}}>
            {m&&<div style={{position:"absolute",top:"80px",right:0}}><RotatingAsterisk size={68}/></div>}
            <div style={{fontSize:"10px",fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",color:C.primary,marginBottom:"14px",animation:"fadeUp 0.6s ease-out both"}}>{c.badge}</div>
            <p style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:m?"17px":"clamp(17px,1.8vw,22px)",color:C.textMuted,marginBottom:"10px",animation:"fadeUp 0.6s ease-out 0.1s both"}}>{c.tagline}</p>
            <h1 style={{fontWeight:900,fontSize:m?"clamp(2.8rem,13vw,4.2rem)":"clamp(3.8rem,6.5vw,6.5rem)",lineHeight:0.9,letterSpacing:"-0.04em",color:C.dark,animation:"fadeUp 0.8s ease-out 0.2s both"}}>
              {c.title[0]}<br/>{c.title[1]}<br/>{c.title[2]}
            </h1>
            <p style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:m?"18px":"clamp(20px,2.2vw,26px)",color:C.primary,marginTop:m?"14px":"18px",marginBottom:m?"20px":"28px",animation:"fadeUp 0.8s ease-out 0.35s both"}}>{c.subtitle}</p>
            <div style={{display:"flex",gap:"12px",flexWrap:"wrap",animation:"fadeUp 0.8s ease-out 0.45s both"}}>
              <a href="/inquiry" className="btn-primary" style={{display:"inline-flex",alignItems:"center",gap:"8px",padding:"13px 28px",borderRadius:"10px",fontSize:"14px",fontWeight:700,textDecoration:"none"}}>
                {c.cta1} <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a href="#includes" className="btn-outline" style={{display:"inline-flex",alignItems:"center",gap:"8px",padding:"13px 28px",borderRadius:"10px",fontSize:"14px",fontWeight:700,textDecoration:"none"}}>{c.cta2}</a>
            </div>
          </div>
          {!m&&(
            <div style={{flex:"0 0 48%",display:"flex",flexDirection:"column",justifyContent:"space-between",paddingLeft:"40px"}}>
              <div style={{display:"flex",justifyContent:"center",alignItems:"center",flex:1}}><RotatingAsterisk size={120}/></div>
              <div style={{display:"flex",alignItems:"center",gap:"12px",justifyContent:"flex-end"}}>
                <a href="/" style={{fontSize:"13px",fontWeight:600,color:C.primary,textDecoration:"none"}}>Home</a>
                <span style={{color:C.textMuted}}>/</span>
                <span style={{fontSize:"13px",fontWeight:600,letterSpacing:"0.08em",color:C.text,textTransform:"uppercase"}}>Dive Into English</span>
              </div>
            </div>
          )}
        </div>
        <div style={{height:"10px",background:C.primary}}/>
      </section>

      {/* ═══ HERO IMAGE ═══ */}
      <section style={{background:"#fff",padding:m?"24px 24px 0":"40px 48px 0"}}>
        <div style={{maxWidth:"1000px",margin:"0 auto",borderRadius:"20px",overflow:"hidden",boxShadow:"0 8px 32px rgba(67,97,238,0.1)",position:"relative"}}>
          <img src="/dive/underwater.jpeg" alt="Dive Into English" style={{width:"100%",height:m?"220px":"440px",objectFit:"cover",objectPosition:"center 35%"}}/>
          <div style={{position:"absolute",bottom:0,left:0,right:0,background:"linear-gradient(to top,rgba(26,26,46,0.85),transparent)",padding:m?"16px 20px":"24px 32px",display:"flex",gap:m?"16px":"32px",flexWrap:"wrap"}}>
            {[c.stat1,c.stat2,c.stat3].map(([n,l])=>(
              <div key={l}>
                <div style={{fontSize:m?"13px":"16px",fontWeight:800,color:"#fff"}}>{n}</div>
                <div style={{fontSize:"10px",color:"rgba(255,255,255,0.55)",letterSpacing:"0.1em",textTransform:"uppercase"}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ INTRO ═══ */}
      <section style={{background:"#fff",padding:m?"40px 24px":"60px 48px"}}>
        <div style={{maxWidth:"900px",margin:"0 auto",textAlign:"center"}}>
          <Reveal>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"12px",marginBottom:"14px"}}>
              <div style={{width:"40px",height:"1.5px",background:C.primary}}/><span style={{fontSize:"10px",fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",color:C.primary}}>{c.whyLabel}</span><div style={{width:"40px",height:"1.5px",background:C.primary}}/>
            </div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"24px":"clamp(26px,3.5vw,38px)",fontWeight:700,color:C.dark,lineHeight:1.2,marginBottom:"20px"}}>
              {c.whyTitle[0]}<br/><em style={{color:C.primary}}>{c.whyTitle[1]}</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{fontSize:m?"15px":"16px",lineHeight:1.9,color:C.textLight,marginBottom:"12px"}}><strong style={{color:C.text}}>{c.whyP1.split("—")[0]}</strong>{c.whyP1.includes("—")?"—"+c.whyP1.split("—")[1]:""}</p>
            <p style={{fontSize:m?"15px":"16px",lineHeight:1.9,color:C.textLight}}>{c.whyP2}</p>
          </Reveal>
        </div>
      </section>

      {/* ═══ THREE PILLARS ═══ */}
      <section style={{background:C.primaryLight,padding:m?"40px 24px":"56px 48px"}}>
        <div style={{maxWidth:"1000px",margin:"0 auto"}}>
          <Reveal><h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"22px":"30px",fontWeight:700,color:C.dark,marginBottom:"28px"}}>{c.pillarsTitle}</h2></Reveal>
          <div style={{display:"grid",gridTemplateColumns:m?"1fr":"repeat(3,1fr)",gap:"20px"}}>
            {c.pillars.map((p,i)=>(
              <Reveal key={i} delay={i*0.1}>
                <div className="card-hover" style={{borderRadius:"16px",overflow:"hidden",background:"#fff",boxShadow:"0 4px 16px rgba(67,97,238,0.06)"}}>
                  <div style={{height:m?"160px":"180px",overflow:"hidden"}}>
                    <img src={["/dive/sardines.webp","/dive/beach.jpeg","/dive/diver.jpeg"][i]} alt={p.word} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                  </div>
                  <div style={{padding:"20px"}}>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:"34px",fontWeight:700,color:C.primary,lineHeight:1,marginBottom:"8px"}}>{p.word}</div>
                    <p style={{fontSize:"13px",lineHeight:1.75,color:C.textLight}}>{p.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHAT'S INCLUDED ═══ */}
      <section id="includes" style={{background:"#fff",padding:m?"40px 24px":"56px 48px"}}>
        <div style={{maxWidth:"1000px",margin:"0 auto"}}>
          <Reveal>
            <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"14px"}}>
              <div style={{width:"40px",height:"1.5px",background:C.primary}}/><span style={{fontSize:"10px",fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",color:C.primary}}>{c.includesLabel}</span><div style={{width:"40px",height:"1.5px",background:C.primary}}/>
            </div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"22px":"30px",fontWeight:700,color:C.dark,marginBottom:"28px"}}>{c.includesTitle}</h2>
          </Reveal>
          <div style={{display:"grid",gridTemplateColumns:m?"1fr 1fr":"repeat(3,1fr)",gap:"16px"}}>
            {c.includes.map((item,i)=>(
              <Reveal key={i} delay={i*0.07}>
                <div className="card-hover" style={{borderRadius:"14px",overflow:"hidden",border:"1.5px solid #e4e8f2",background:"#fff",boxShadow:"0 2px 12px rgba(67,97,238,0.05)"}}>
                  <div style={{height:m?"120px":"150px",overflow:"hidden"}}>
                    <img src={IMGS[i]} alt={item.title} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                  </div>
                  <div style={{padding:"14px 16px"}}>
                    <h3 style={{fontSize:"12px",fontWeight:700,color:C.dark,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:"5px"}}>{item.title}</h3>
                    <p style={{fontSize:"12px",lineHeight:1.7,color:C.textLight}}>{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section style={{background:C.primary,padding:m?"40px 24px":"56px 48px"}}>
        <div style={{maxWidth:"1000px",margin:"0 auto"}}>
          <Reveal>
            <p style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:m?"20px":"clamp(22px,2.8vw,32px)",color:"rgba(255,255,255,0.8)",lineHeight:1.35,marginBottom:"32px",maxWidth:"700px"}}>{c.pricingQuote}</p>
          </Reveal>
          <div style={{display:"grid",gridTemplateColumns:m?"1fr":"1fr 1fr",gap:m?"28px":"56px",alignItems:"start"}}>
            <Reveal>
              <div style={{fontSize:"10px",fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",color:"rgba(255,255,255,0.5)",marginBottom:"12px"}}>{c.pricingLabel}</div>
              <div style={{display:"flex",alignItems:"baseline",gap:"14px",marginBottom:"6px"}}>
                <s style={{fontSize:m?"24px":"32px",color:"rgba(255,255,255,0.25)",fontFamily:"'Playfair Display',serif"}}>{c.pricingWas}</s>
                <span style={{fontFamily:"'Playfair Display',serif",fontSize:m?"60px":"80px",fontWeight:700,color:"#c9a96e",lineHeight:1}}>$899</span>
              </div>
              <div style={{fontSize:"12px",color:"rgba(255,255,255,0.45)",marginBottom:"20px"}}>{c.pricingNote}</div>
              <div style={{display:"inline-flex",alignItems:"center",gap:"6px",background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:"100px",padding:"6px 16px",marginBottom:"24px"}}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span style={{fontSize:"11px",fontWeight:600,color:"rgba(255,255,255,0.85)"}}>{c.partnerBadge}</span>
              </div>
              <div style={{display:"flex",gap:"12px",flexWrap:"wrap"}}>
                <a href="#contact-form" className="btn-white" style={{display:"inline-flex",alignItems:"center",gap:"8px",padding:"13px 28px",borderRadius:"10px",fontSize:"14px",fontWeight:700,textDecoration:"none"}}>
                  {c.reserveBtn} <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div style={{background:"rgba(255,255,255,0.08)",borderRadius:"14px",padding:"20px 22px"}}>
                {c.checkList.map((item,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:"10px",padding:"8px 0",borderBottom:i<c.checkList.length-1?"1px solid rgba(255,255,255,0.07)":"none"}}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                    <span style={{fontSize:"14px",color:"rgba(255,255,255,0.85)"}}>{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ CONTACT FORM ═══ */}
      <section id="contact-form" style={{background:"#fff",padding:m?"40px 24px":"56px 48px"}}>
        <div style={{maxWidth:"640px",margin:"0 auto"}}>
          <Reveal>
            <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"14px"}}>
              <div style={{width:"40px",height:"1.5px",background:C.primary}}/><span style={{fontSize:"10px",fontWeight:700,letterSpacing:"0.25em",textTransform:"uppercase",color:C.primary}}>{c.formLabel}</span><div style={{width:"40px",height:"1.5px",background:C.primary}}/>
            </div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"22px":"30px",fontWeight:700,color:C.dark,marginBottom:"8px"}}>{c.formTitle}</h2>
            <p style={{fontSize:"15px",color:C.textLight,marginBottom:"28px",lineHeight:1.7}}>{c.formDesc}</p>
            <DiveForm m={m} c={c}/>
          </Reveal>
        </div>
      </section>

      {/* ═══ BOTTOM CTA ═══ */}
      <section style={{background:C.primaryLight,padding:m?"40px 24px":"56px 48px",textAlign:"center"}}>
        <Reveal>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"22px":"30px",fontWeight:700,color:C.dark,marginBottom:"10px"}}>{c.ctaTitle}</h2>
          <p style={{fontSize:"15px",lineHeight:1.7,color:C.textLight,marginBottom:"24px",maxWidth:"480px",margin:"0 auto 24px"}}>{c.ctaDesc}</p>
          <div style={{display:"flex",gap:"12px",justifyContent:"center",flexWrap:"wrap"}}>
            <a href="#contact-form" className="btn-primary" style={{display:"inline-flex",alignItems:"center",gap:"8px",padding:"14px 32px",borderRadius:"10px",fontSize:"14px",fontWeight:700,textDecoration:"none"}}>
              {c.ctaBtn} <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
            </a>
            <a href="/access" style={{display:"inline-flex",alignItems:"center",gap:"8px",padding:"14px 32px",borderRadius:"10px",background:"transparent",border:`1.5px solid ${C.primary}`,color:C.primary,fontSize:"14px",fontWeight:600,textDecoration:"none"}}>
              {c.ctaPhone}
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
