export default function Loading() {
  return (
    <section className="hero">
      <div className="container hero-wrapper">
        <div className="hero-content">
          <div
            style={{
              width: 200,
              height: 28,
              borderRadius: 14,
              background: "rgba(255,255,255,0.05)",
            }}
          />
          <h1 style={{ opacity: 0.3 }}>Ігри українською —</h1>
          <p style={{ opacity: 0.2, maxWidth: 500 }}>
            Грайте в улюблені ігри рідною мовою в один клік. LBK Launcher — це
            безкоштовний інструмент з відкритим кодом.
          </p>
        </div>
      </div>
    </section>
  );
}
