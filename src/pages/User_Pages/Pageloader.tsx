import React, { useEffect, useState } from "react";

// ─── MΛVHU Branded Full-Page Loader ─────────────────────────────────────────
// Drop this file at: src/components/PageLoader.tsx
// Usage: used automatically by React.Suspense in App.tsx

const PageLoader: React.FC = () => {
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState<"loading" | "ready">("loading");

    // Simulate realistic loading progress that waits for actual content
    useEffect(() => {
        let current = 0;

        // Fast initial burst (0 → 40%) — JS parsing
        const fastPhase = setInterval(() => {
            current += Math.random() * 8 + 4;
            if (current >= 40) {
                current = 40;
                clearInterval(fastPhase);

                // Slower middle phase (40 → 75%) — fetching assets
                const midPhase = setInterval(() => {
                    current += Math.random() * 4 + 1.5;
                    if (current >= 75) {
                        current = 75;
                        clearInterval(midPhase);

                        // Trickle phase (75 → 92%) — images, fonts
                        const trickle = setInterval(() => {
                            current += Math.random() * 2 + 0.5;
                            if (current >= 92) {
                                current = 92;
                                clearInterval(trickle);

                                // Final burst on DOM ready
                                const finish = setTimeout(() => {
                                    current = 100;
                                    setProgress(100);
                                    setTimeout(() => setPhase("ready"), 350);
                                }, 300);
                                return () => clearTimeout(finish);
                            }
                            setProgress(Math.min(current, 92));
                        }, 120);
                        return () => clearInterval(trickle);
                    }
                    setProgress(Math.min(current, 75));
                }, 180);
                return () => clearInterval(midPhase);
            }
            setProgress(Math.min(current, 40));
        }, 60);

        return () => clearInterval(fastPhase);
    }, []);

    if (phase === "ready") return null;

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 9999,
                backgroundColor: "#0A2E42",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'IBM Plex Sans', 'Inter', system-ui, sans-serif",
                overflow: "hidden",
            }}
        >
            {/* ── Subtle radial background glow ── */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(31,92,115,0.35) 0%, transparent 70%)",
                    pointerEvents: "none",
                }}
            />

            {/* ── Animated grid dots ── */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                        "radial-gradient(circle, rgba(184,154,47,0.08) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                    pointerEvents: "none",
                }}
            />

            {/* ── Logo + wordmark ── */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "20px",
                    marginBottom: "48px",
                    animation: "fadeSlideUp 0.5s ease-out both",
                }}
            >
                {/* Logo mark — SVG recreation of the MΛVHU fingerprint diamond */}
                <div style={{ position: "relative", width: 72, height: 72 }}>
                    {/* Outer pulse ring */}
                    <div
                        style={{
                            position: "absolute",
                            inset: -8,
                            borderRadius: "50%",
                            border: "1px solid rgba(184,154,47,0.25)",
                            animation: "pulse 2s ease-in-out infinite",
                        }}
                    />
                    <div
                        style={{
                            position: "absolute",
                            inset: -18,
                            borderRadius: "50%",
                            border: "1px solid rgba(184,154,47,0.12)",
                            animation: "pulse 2s ease-in-out infinite 0.4s",
                        }}
                    />

                    {/* Logo SVG — matches the MΛVHU diamond/fingerprint mark */}
                    <svg
                        viewBox="0 0 100 100"
                        width="72"
                        height="72"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Top diamond (gold fingerprint) */}
                        <polygon
                            points="50,4 72,26 50,48 28,26"
                            fill="none"
                            stroke="#B89A2F"
                            strokeWidth="3"
                            strokeLinejoin="round"
                            style={{ animation: "drawStroke 1.2s ease-out both" }}
                        />
                        {/* Inner lines mimicking fingerprint */}
                        <line x1="38" y1="26" x2="50" y2="14" stroke="#B89A2F" strokeWidth="1.5" opacity="0.6" />
                        <line x1="50" y1="14" x2="62" y2="26" stroke="#B89A2F" strokeWidth="1.5" opacity="0.6" />
                        <line x1="41" y1="29" x2="50" y2="20" stroke="#B89A2F" strokeWidth="1.2" opacity="0.4" />
                        <line x1="50" y1="20" x2="59" y2="29" stroke="#B89A2F" strokeWidth="1.2" opacity="0.4" />

                        {/* Middle-left chevron (teal) */}
                        <polyline
                            points="20,55 38,37 56,55"
                            fill="none"
                            stroke="#1F5C73"
                            strokeWidth="3.5"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            style={{ animation: "drawStroke 1.2s ease-out 0.15s both" }}
                        />
                        {/* Middle-left inner lines */}
                        <polyline points="24,58 38,44 52,58" fill="none" stroke="#1F5C73" strokeWidth="2" opacity="0.5" strokeLinejoin="round" />
                        <polyline points="28,61 38,51 48,61" fill="none" stroke="#1F5C73" strokeWidth="1.5" opacity="0.3" strokeLinejoin="round" />

                        {/* Bottom-right chevron (teal, offset) */}
                        <polyline
                            points="36,72 54,54 72,72"
                            fill="none"
                            stroke="#1F5C73"
                            strokeWidth="3.5"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            style={{ animation: "drawStroke 1.2s ease-out 0.3s both" }}
                        />
                        <polyline points="40,75 54,61 68,75" fill="none" stroke="#1F5C73" strokeWidth="2" opacity="0.5" strokeLinejoin="round" />
                        <polyline points="44,78 54,68 64,78" fill="none" stroke="#1F5C73" strokeWidth="1.5" opacity="0.3" strokeLinejoin="round" />
                    </svg>
                </div>

                {/* Wordmark */}
                <div style={{ textAlign: "center" }}>
                    <div
                        style={{
                            fontSize: "28px",
                            fontWeight: 700,
                            letterSpacing: "0.18em",
                            color: "#FFFFFF",
                            fontFamily: "'IBM Plex Serif', Georgia, serif",
                            lineHeight: 1,
                        }}
                    >
                        MΛ<span style={{ color: "#B89A2F" }}>V</span>HU
                    </div>
                    <div
                        style={{
                            fontSize: "9px",
                            letterSpacing: "0.3em",
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,0.4)",
                            marginTop: "6px",
                            fontWeight: 500,
                        }}
                    >
                        Climate Intelligence
                    </div>
                </div>
            </div>

            {/* ── Progress bar ── */}
            <div
                style={{
                    width: "min(320px, 80vw)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "12px",
                    animation: "fadeSlideUp 0.5s ease-out 0.2s both",
                }}
            >
                {/* Track */}
                <div
                    style={{
                        width: "100%",
                        height: "3px",
                        backgroundColor: "rgba(255,255,255,0.08)",
                        borderRadius: "99px",
                        overflow: "hidden",
                    }}
                >
                    {/* Fill */}
                    <div
                        style={{
                            height: "100%",
                            width: `${progress}%`,
                            background: "linear-gradient(90deg, #1F5C73, #B89A2F)",
                            borderRadius: "99px",
                            transition: "width 0.15s ease-out",
                            boxShadow: "0 0 10px rgba(184,154,47,0.5)",
                        }}
                    />
                </div>

                {/* Loading label */}
                <div
                    style={{
                        fontSize: "11px",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.35)",
                        fontWeight: 500,
                    }}
                >
                    {progress < 40
                        ? "Initialising…"
                        : progress < 75
                            ? "Loading assets…"
                            : progress < 95
                                ? "Almost ready…"
                                : "Ready"}
                </div>
            </div>

            {/* ── Tagline ── */}
            <div
                style={{
                    position: "absolute",
                    bottom: "32px",
                    fontSize: "11px",
                    letterSpacing: "0.12em",
                    color: "rgba(255,255,255,0.2)",
                    textTransform: "uppercase",
                    fontWeight: 500,
                }}
            >
                Measured · Verified · Sovereign
            </div>

            {/* ── Keyframes ── */}
            <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50%       { opacity: 0.8; transform: scale(1.06); }
        }
        @keyframes drawStroke {
          from { stroke-dashoffset: 200; opacity: 0; }
          to   { stroke-dashoffset: 0;   opacity: 1; }
        }
      `}</style>
        </div>
    );
};

export default PageLoader;