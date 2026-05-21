// distributor.jsx — CSS/SVG candy dispenser, transforms driven by scroll.
//
// Exports <Distributor /> and <Stage />.
// Stage is the FIXED viewport that holds the model; it watches scroll and
// switches between "scenes" (one per section) each with a translate/rotate/scale.
// Inside, <Distributor /> renders the actual model — body in CSS, candies as
// little gradient circles that float subtly.

(function () {
  const { useState, useEffect, useRef, useMemo } = React;

  // Generate stable candy positions in the dome
  function generateCandies(seed = 7) {
    const colors = ['var(--candy-1)', 'var(--candy-2)', 'var(--candy-3)',
                    'var(--candy-4)', 'var(--candy-5)', 'var(--candy-6)'];
    // pseudo-random but deterministic
    const rng = (i) => {
      const x = Math.sin(seed * 9.13 + i * 3.71) * 10000;
      return x - Math.floor(x);
    };
    const candies = [];
    let placed = 0, tries = 0;
    while (placed < 18 && tries < 400) {
      tries++;
      const r = Math.sqrt(rng(tries)) * 0.40; // distance from center (0..0.40 of dome radius)
      const a = rng(tries + 99) * Math.PI * 2;
      const x = 0.5 + r * Math.cos(a);
      const y = 0.5 + r * Math.sin(a);
      // collision check
      let ok = true;
      for (const c of candies) {
        const dx = c.x - x, dy = c.y - y;
        if (Math.sqrt(dx * dx + dy * dy) < 0.13) { ok = false; break; }
      }
      if (!ok) continue;
      candies.push({
        x, y,
        c: colors[Math.floor(rng(tries + 33) * colors.length)],
        d: 0.5 + rng(tries + 55) * 3, // animation delay
        sz: 11 + rng(tries + 77) * 4, // size %
      });
      placed++;
    }
    return candies;
  }

  function Distributor({ dispensing = false }) {
    const candies = useMemo(() => generateCandies(13), []);
    return (
      <div className={"distributor" + (dispensing ? " dispense" : "")}>
        <div className="dist-cap" />
        <div className="dist-dome">
          <div className="candies">
            {candies.map((k, i) => (
              <span
                key={i}
                className="candy"
                style={{
                  left: `calc(${k.x * 100}% - ${k.sz / 2}%)`,
                  top:  `calc(${k.y * 100}% - ${k.sz / 2}%)`,
                  width: `${k.sz}%`,
                  height: `${k.sz}%`,
                  ['--c']: k.c,
                  animationDelay: `${k.d}s`,
                }}
              />
            ))}
          </div>
          <div className="etch">Coco</div>
        </div>
        <div className="dist-collar" />
        <div className="dist-neck" />
        <div className="dist-base">
          <div className="slot" />
          <div className="window" />
          <div className="lever" />
        </div>
        <div className="dist-pedestal">
          <div className="label">Coco Bonbons · MK1</div>
        </div>
      </div>
    );
  }

  // InlineDistributor — a static, in-flow wrapper used to place the model
  // inside a section's column. No fixed-position, no scroll-linked motion;
  // the model sits exactly where it's placed in the page.
  function InlineDistributor({ height = 560, ry = 0, withLabels = true }) {
    return (
      <div className="stage stage-inline"
           style={{ height }}
           aria-hidden="true">
        <div className="stage-inner" style={{ transform: `rotateY(${ry}deg)` }}>
          <Distributor />
        </div>
        {withLabels && (
          <>
            <span className="stage-label stage-label-tl">01 · DÔME VERRE</span>
            <span className="stage-label stage-label-mr">02 · ALU BROSSÉ</span>
            <span className="stage-label stage-label-bl">03 · SOCLE</span>
          </>
        )}
      </div>
    );
  }

  window.InlineDistributor = InlineDistributor;
})();
