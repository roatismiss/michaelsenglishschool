"use client";
import PageShell from "../components/PageShell";

const posts = [
  { title: "5 Tips for IELTS Speaking Success", date: "March 10, 2026", tag: "IELTS", excerpt: "Prepare for your IELTS speaking test with these proven strategies from our experienced instructors." },
  { title: "Why Kids Should Start Learning English Early", date: "March 3, 2026", tag: "Kids", excerpt: "Research shows that children who begin language learning before age 7 develop more natural pronunciation." },
  { title: "Business English: Email Writing Essentials", date: "February 25, 2026", tag: "Business", excerpt: "Master the art of professional email communication with these practical tips and templates." },
  { title: "Eiken Grade 1 Study Guide", date: "February 18, 2026", tag: "Eiken", excerpt: "A comprehensive guide to preparing for the most challenging level of the Eiken English proficiency test." },
  { title: "Living in Japan: A Language Guide", date: "February 10, 2026", tag: "Culture", excerpt: "Essential English and Japanese phrases for daily life, plus tips for navigating bilingual situations." },
  { title: "Cambridge UMS: What to Expect", date: "February 3, 2026", tag: "Cambridge", excerpt: "Everything you need to know about our Cambridge UMS program and how it can benefit your English skills." },
];

export default function BlogPage() {
  return (
    <PageShell title="Blog" subtitle="Tips, news, and insights about learning English">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" }}>
        {posts.map(p => (
          <article key={p.title} style={{
            borderRadius: "16px", border: "1.5px solid #e8ecf4", overflow: "hidden",
            cursor: "pointer", transition: "all 0.3s"
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(67,97,238,0.08)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <div style={{ height: "160px", background: "linear-gradient(135deg, #EEF1FF, #d8dff5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: "#4361EE", background: "#fff", padding: "6px 14px", borderRadius: "999px" }}>{p.tag}</span>
            </div>
            <div style={{ padding: "24px" }}>
              <div style={{ fontSize: "12px", color: "#999", marginBottom: "8px" }}>{p.date}</div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#1a1a2e", marginBottom: "10px", lineHeight: 1.3 }}>{p.title}</h3>
              <p style={{ fontSize: "14px", lineHeight: 1.6, color: "#666" }}>{p.excerpt}</p>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
