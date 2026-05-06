"use client";
import PageShell from "../components/PageShell";
import { useState } from "react";

const faqs = [
  { q: "What levels do you offer?", a: "We offer 7 levels from complete beginner to advanced. 60% of our students start as beginners, so you'll feel right at home regardless of your current level." },
  { q: "How much do lessons cost?", a: "We use a safe monthly payment system. Group lessons start from ¥10,000/month and private lessons from ¥18,000/month. No hidden fees or long-term contracts." },
  { q: "Can I take a free trial lesson?", a: "Yes! We offer free trial lessons at all three locations. Simply fill out our inquiry form or call us to schedule one." },
  { q: "Are your teachers native English speakers?", a: "Yes, all our English instructors are native speakers with professional teaching qualifications and years of experience in Japan." },
  { q: "What age groups do you teach?", a: "We teach all ages — from children as young as 3 years old through elementary, middle, and high school students, to working adults." },
  { q: "Where are your schools located?", a: "We have two locations in Osaka: Tennoji (Abeno-ku) and Furuichi (Habikino City)." },
  { q: "Do you offer IELTS/Eiken preparation?", a: "Yes, we offer specialized preparation courses for IELTS, Eiken, Cambridge, and TOEFL exams with high pass rates." },
  { q: "Can you come to my office for lessons?", a: "Yes! Our on-site lesson service brings instructors to your workplace, home, or any convenient location." },
];

function FaqItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #eef0f5", padding: "20px 0", cursor: "pointer" }} onClick={() => setOpen(!open)}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#1a1a2e", flex: 1 }}>{faq.q}</h3>
        <span style={{ fontSize: "20px", color: "#4361EE", transition: "transform 0.3s", transform: open ? "rotate(45deg)" : "none", flexShrink: 0, marginLeft: "16px" }}>+</span>
      </div>
      {open && <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#666", marginTop: "12px", paddingRight: "40px" }}>{faq.a}</p>}
    </div>
  );
}

export default function FaqPage() {
  return (
    <PageShell title="FAQ" subtitle="Frequently asked questions about our school">
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        {faqs.map(f => <FaqItem key={f.q} faq={f} />)}
      </div>
    </PageShell>
  );
}
