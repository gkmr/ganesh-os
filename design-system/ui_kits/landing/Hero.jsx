// Ganesh OS landing — Hero. Kicker, gradient headline, lede, CTA, domain lanes panel, metrics row.
const { Button, Badge, DomainLane, StatTile } = window.GaneshOSDesignSystem_462320;

function Hero({ onNav }) {
  const [calm, setCalm] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setCalm(true), 2600);
    return () => clearTimeout(t);
  }, []);

  return (
    <header id="top" style={{ position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "78px 24px 34px" }}>
        <Badge variant="kicker" pulse style={{ marginBottom: 24 }}>
          A personal AI operating system, run at the scale of one life
        </Badge>
        <h1 style={{
          fontSize: "clamp(34px,5.4vw,62px)", lineHeight: 1.03, fontWeight: 900,
          margin: "0 0 22px", maxWidth: "17ch", letterSpacing: "-.03em",
          background: "linear-gradient(180deg,#fff 30%,#aeb8d4)",
          WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
        }}>One loud domain was quietly eating my whole life.</h1>
        <p style={{ fontSize: "clamp(18px,2.1vw,21px)", color: "var(--body)", maxWidth: "62ch", margin: "0 0 16px" }}>
          <b style={{ color: "var(--ink)" }}>Work shouts. Everything that matters whispers.</b> Your body, the people who love you, the person you're becoming — none of them send a push notification. So the loudest thing wins every day, and you call the wreckage "focus."
        </p>
        <p style={{ fontSize: "clamp(18px,2.1vw,21px)", color: "var(--body)", maxWidth: "62ch", margin: "0 0 16px" }}>
          I didn't have a discipline problem. I had a governance problem. So I stopped managing a to-do list and built a personal AI operating system to run my life: 27 AI agents, one law (every field has exactly one owner), and at 7:42 each morning, one text that already knows what the day is for.
        </p>
        <p style={{ fontWeight: 700, color: "var(--ink)", fontSize: "clamp(19px,2.2vw,22px)", maxWidth: "62ch", margin: 0 }}>
          The dread is gone. Not because there's less to carry. Because nothing I love slips in silence anymore.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 26 }}>
          <Button as="a" href="#" onClick={(e)=>e.preventDefault()}>▶ Watch one day decide itself</Button>
          <Button variant="ghost" as="a" href="#router" onClick={(e)=>{e.preventDefault();onNav("router");}}>The four disciplines ↓</Button>
        </div>

        {/* domain lanes panel */}
        <div style={{
          marginTop: 44, background: "var(--grad-surface)", border: "1px solid var(--line)",
          borderRadius: 20, padding: "24px 26px", boxShadow: "var(--shadow-lg)", position: "relative", overflow: "hidden",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8, gap: 12, flexWrap: "wrap" }}>
            <h4 style={{ margin: 0, color: "#fff", fontSize: 14, fontWeight: 700 }}>Four domains, one of them far too loud</h4>
            <p style={{ margin: 0, color: "var(--muted)", fontSize: 12.5, fontFamily: "var(--font-mono)" }}>
              {calm ? "after: balanced, one slot per domain" : "before: work floods, the rest go dim"}
            </p>
          </div>
          <DomainLane name="Work / company" sub="build, GTM, capital" domain="work" count="48 today" />
          <DomainLane name="Health" sub="lift, cardio, racket, PT" domain="health" count="11d since PT" quiet={!calm} delay={0.6} />
          <DomainLane name="People" sub="date night, family, friends" domain="people" count="3 owed calls" quiet={!calm} delay={1.1} />
          <DomainLane name="Growth" sub="panels, writing, mentoring" domain="growth" count="on hold" quiet={!calm} delay={1.6} />
        </div>

        {/* metrics */}
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap", marginTop: 32, paddingTop: 26, borderTop: "1px solid var(--line)" }}>
          <StatTile boxed={false} size="sm" value="99" label="overdue, then held at zero" />
          <StatTile boxed={false} size="sm" value="27" label="coordinated agents" />
          <StatTile boxed={false} size="sm" value="1 rule" label="every field, one owner" />
          <StatTile boxed={false} size="sm" value="0" label="cross-lane writes, enforced in CI" />
        </div>
      </div>
    </header>
  );
}
window.Hero = Hero;
