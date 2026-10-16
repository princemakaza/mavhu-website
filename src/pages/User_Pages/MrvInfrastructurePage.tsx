import React from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
    ArrowRight,
    Satellite,
    Sprout,
    Cpu,
    Plug,
    MapPin,
    ScanSearch,
    Footprints,
    Calculator,
    UserCheck,
    FileLock2,
    Sigma,
    ListChecks,
    LifeBuoy,
    BadgeCheck,
    CheckCircle,
    Leaf,
    Landmark,
    ShieldCheck,
    Tractor,
    FileSearch,
    Fingerprint,
    Settings2,
    Layers,
    Globe,
    FlaskConical,
    Scale,
    CalendarClock,
    BookOpen,
    Download,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import Footer from "../../components/Footer";
import Navbar from "../../components/navbar";
import { useNavigate } from "react-router-dom";
import heroImage from "../../assets/bg-land.png";

// ─── Color Palette (matching main site) ─────────────────────────────────────
const colors = {
    primaryDark: "#123E56",
    secondaryBlue: "#1F5C73",
    goldAccent: "#B89A2F",
    lightBackground: "#F4FAFA",
    softGrey: "#DCE7E8",
    white: "#FFFFFF",
};
const green = "#2E7D6B";

// ─── Animation Variants ─────────────────────────────────────────────────────
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};
const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const fadeInRight: Variants = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const MrvInfrastructurePage: React.FC = () => {
    const navigate = useNavigate();
    const [activeAudience, setActiveAudience] = React.useState(0);

    // ─── One architecture, four layers ────────────────────────────────────────
    const layers = [
        {
            name: "Sky",
            description: "Satellite Earth observation with a drone validation layer.",
            icon: <Satellite className="w-5 h-5" />,
            color: colors.secondaryBlue,
        },
        {
            name: "Earth",
            description: "Ground-truthing and Bayesian models.",
            icon: <Sprout className="w-5 h-5" />,
            color: green,
        },
        {
            name: "AI",
            description: "Automated MRV, predictive systems and workflows.",
            icon: <Cpu className="w-5 h-5" />,
            color: colors.goldAccent,
        },
        {
            name: "API",
            description: "Delivery into client systems.",
            icon: <Plug className="w-5 h-5" />,
            color: colors.primaryDark,
        },
    ];

    // ─── The verification gap ─────────────────────────────────────────────────
    const gaps = [
        {
            title: "Article 6 and national reporting raise the bar",
            description:
                "Article 6 cooperative approaches require authorised, uniquely identified units that cannot be double-counted. National Biennial Transparency Reports require inventory-grade, reviewable data. Both need the same evidence layer.",
        },
        {
            title: "Registration is not verification",
            description:
                "Uganda reports 1.6M coffee farmers registered against a 1.2M target (Daily Monitor, Oct 2026). Stakeholders still cite farmers never visited, registrations without consent, and rejected cards.",
        },
        {
            title: "Compliance costs hit smallholders hardest",
            description:
                "Estimated annual compliance costs of EUR 740 to nearly 2,000 per smallholder, against incomes of EUR 1,000 to 3,000 (AllAfrica, Dec 2025). Affordable, scalable verification matters.",
        },
        {
            title: "Self-reported data will not survive scrutiny",
            description:
                "Buyers, auditors, registries and lenders increasingly need independent, geolocated evidence that the same land is not claimed twice.",
        },
    ];

    // ─── The evidence chain ───────────────────────────────────────────────────
    const steps = [
        {
            title: "Capture",
            description:
                "Plot and forest boundaries, GPS polygons, Bayesian optimisation, ground truth and consent records from field teams, partners and existing registries, via manual entry, bulk upload or API.",
            icon: <MapPin className="w-5 h-5" />,
        },
        {
            title: "Verify from space",
            description:
                "Satellite and reanalysis data check land-cover change against the regulatory cut-off and flag clearing, degradation or overlap.",
            icon: <ScanSearch className="w-5 h-5" />,
        },
        {
            title: "Ground-truth",
            description: "Targeted field verification where satellite evidence is uncertain or the risk is high.",
            icon: <Footprints className="w-5 h-5" />,
        },
        {
            title: "Quantify",
            description:
                "Carbon, GHG and land-health indicators calculated with documented, explainable methods under recognised standards.",
            icon: <Calculator className="w-5 h-5" />,
        },
        {
            title: "Review and approve",
            description: "Statistical flags route to human reviewers. Nothing is auto-published.",
            icon: <UserCheck className="w-5 h-5" />,
        },
        {
            title: "Evidence and audit",
            description: "Locked, tamper-proof audit trail with full export. Auditors verify once and reuse.",
            icon: <FileLock2 className="w-5 h-5" />,
        },
    ];

    const assuranceRail = [
        { label: "Uncertainty quantification", icon: <Sigma className="w-5 h-5" /> },
        { label: "QA/QC and cross-checks", icon: <ListChecks className="w-5 h-5" /> },
        { label: "Failure and backup protocol", icon: <LifeBuoy className="w-5 h-5" /> },
        { label: "KYC/AML at registration", icon: <BadgeCheck className="w-5 h-5" /> },
    ];

    // ─── Assurance and uncertainty ────────────────────────────────────────────
    const assurance = [
        {
            title: "Standards and assurance",
            description:
                "Quantification follows documented, explainable methods designed to the requirements of Verra VCS, Gold Standard and the ICVCM Core Carbon Principles. MAvHU supplies the evidence; independent validation and verification bodies accredited to ISO 14065 do the verifying. Every output is traceable to its source data, its method and its reviewer.",
            icon: <Scale className="w-6 h-6" />,
            color: colors.secondaryBlue,
        },
        {
            title: "Uncertainty and accuracy",
            description:
                "Uncertainty is quantified at every stage (capture, ground-truth, quantification and land-change detection) and combined into a single statement per output. Where it cannot be quantified, a conservative deduction is applied and its basis documented. Residual error is reported with every result.",
            icon: <Sigma className="w-6 h-6" />,
            color: colors.goldAccent,
        },
        {
            title: "Carbon integrity tests",
            description:
                "Baseline and additionality evidence, permanence and reversal monitoring, and leakage checks, so developers can take DOE-ready monitoring reports into validation.",
            icon: <FlaskConical className="w-6 h-6" />,
            color: green,
        },
    ];

    // ─── Who we serve (tabs) ──────────────────────────────────────────────────
    const audiences = [
        {
            tab: "Carbon Project Developers",
            icon: <Leaf className="w-5 h-5" />,
            description:
                "Project design support and MRV for baselines, monitoring and credit issuance evidence.",
            points: [
                "PDD support",
                "Additionality and baseline evidence",
                "Permanence and reversal monitoring",
                "DOE-ready monitoring reports",
            ],
        },
        {
            tab: "Governments & Development Programmes",
            icon: <Landmark className="w-5 h-5" />,
            description:
                "Independent monitoring of land, restoration and agricultural programmes using transparent, defensible indicators.",
            points: [
                "National MRV programmes",
                "BTR and national GHG inventory inputs",
                "Article 6 registry integration",
                "Registration and traceability QA of national registers",
            ],
        },
        {
            tab: "Banks, Insurers & Pension Funds",
            icon: <ShieldCheck className="w-5 h-5" />,
            description:
                "MAvHU Financial Intelligence: climate-risk exposure, financed emissions and portfolio ground-truth, delivered through screens, APIs and automated workflows.",
            points: [
                "Verified land data for lenders and insurers",
                "Crop-damage and exposure ground-truth for parametric products",
                "Financed emissions and climate-risk exposure",
                "Portfolio ground-truth",
            ],
        },
        {
            tab: "Agricultural Enterprises, Exporters & Cooperatives",
            icon: <Tractor className="w-5 h-5" />,
            description:
                "MAvHU Agriculture Intelligence: EUDR due diligence, Scope 3 and ESG evidence built on verified plot-level data.",
            points: [
                "EUDR, CBAM or national due diligence",
                "Plot-level verification of export crops and other in-scope commodities",
                "Scope 3 and ESG evidence",
                "Protection against double-counting across counterparties",
            ],
        },
    ];

    // ─── Registries and reporting ─────────────────────────────────────────────
    const registries = [
        {
            title: "Article 6 evidence",
            description:
                "Every unit carries a unique identifier. The evidence chain is designed to support authorisation, first transfer and corresponding-adjustment reporting under Article 6.2, and design-document and monitoring-report requirements under Article 6.4.",
        },
        {
            title: "National registry integration",
            description:
                "MAvHU data is structured to feed national carbon registries. Designed to integrate with the Zimbabwe Carbon Registry, and with the national carbon-market frameworks of Kenya, Nigeria and Ghana.",
        },
        {
            title: "National transparency and NDC reporting",
            description:
                "Plot-level and programme-level data map to the mitigation and land-sector components of a Biennial Transparency Report, to national GHG inventory inputs, and to NDC progress indicators, in reviewable, machine-readable form for technical expert review.",
        },
    ];

    // ─── What you get ─────────────────────────────────────────────────────────
    const outcomes = [
        { title: "Audit-ready evidence", description: "Geolocated proof you can attach to due diligence statements and disclosures." },
        { title: "Assurance-ready", description: "Evidence structured for validation and verification bodies, with unique unit identifiers designed to support Article 6 corresponding adjustments." },
        { title: "Independent benchmark", description: "Check your suppliers or programme against the national system before others do." },
        { title: "Protection against double-counting", description: "Geolocated data stops the same plot being claimed across counterparties." },
        { title: "Forward-looking monitoring", description: "Continuous MRV with satellite signals flagging degradation, clearing or reversal before it becomes a compliance or credit event." },
        { title: "Lower assurance cost, every year", description: "A persistent evidence trail replaces fragmented data rebuilt each cycle." },
        { title: "Data you own: Sovereign MRV", description: "Full ownership and export-ready data at any time, hosted in Africa." },
    ];

    // ─── Why MAvHU ────────────────────────────────────────────────────────────
    const reasons = [
        {
            title: "Independent verification, not aggregation",
            description: "Exposure and land-change data derived from satellite and reanalysis datasets already in operational use, so data quality improves without extra manual collection.",
            icon: <ScanSearch className="w-6 h-6" />,
        },
        {
            title: "Explainable, human-led",
            description: "Transparent methods you can defend. Every output routes to a human decision and is audit-trailed.",
            icon: <UserCheck className="w-6 h-6" />,
        },
        {
            title: "Built once, reported many times",
            description: "Every field is tagged once to a standards matrix. Adding a framework is configuration, not a rebuild.",
            icon: <Layers className="w-6 h-6" />,
        },
        {
            title: "Governed and interoperable",
            description: "Documented tool approval, incident handling and a conflict-of-interest policy that separates tool provision from verification. Common data model, identifiers and metadata.",
            icon: <Settings2 className="w-6 h-6" />,
        },
        {
            title: "Africa-first infrastructure",
            description: "Hosted on AWS Cape Town with data residency, and can be hosted in-country as per government guidelines. Methods built around African environmental conditions and regulation.",
            icon: <Globe className="w-6 h-6" />,
        },
        {
            title: "Tested in the field",
            description: "Live pilot on a large-scale agricultural estate, available on request, with MRV across land, soil and crop indicators.",
            icon: <Fingerprint className="w-6 h-6" />,
        },
    ];

    // ─── Pilots ───────────────────────────────────────────────────────────────
    const pilots = [
        { title: "Project development pilot", description: "A scoped pilot on a sample of your project area covering baseline, additionality and permanence evidence, with a DOE-ready monitoring report you can take into validation." },
        { title: "National MRV pilot", description: "A scoped pilot on a sample of your programme area, benchmarked against your national system and the Enhanced Transparency Framework, with outputs structured for BTR and national inventory use." },
        { title: "Verification pilot", description: "Plot-level checks with audit-ready evidence you can use in due diligence." },
        { title: "Live demonstration", description: "See our dMRV platform run on a sample of your own plots." },
        { title: "A scoped proposal", description: "An implementation plan built around your commodities, geography and frameworks." },
    ];

    const standards = ["Verra VCS", "Gold Standard", "ICVCM Core Carbon Principles", "Enhanced Transparency Framework"];


    const audience = audiences[activeAudience];

    return (
        <div
            className="min-h-screen overflow-x-hidden"
            style={{ backgroundColor: colors.lightBackground, color: colors.primaryDark }}
        >
            <Helmet>
                <title>MRV Infrastructure – Independent, Plot-Level Verification | MAvHU</title>
                <meta
                    name="description"
                    content="MAvHU MRV Infrastructure: sovereign digital MRV for commodity supply chains, carbon projects and climate programmes. Plot-level verification, EUDR due diligence, Article 6 and BTR reporting, hosted in Africa."
                />
                <link rel="canonical" href="https://mavhuafrica.com/services/mrv-infrastructure" />
                <meta property="og:title" content="MAvHU MRV Infrastructure – Independent, Plot-Level Verification" />
                <meta property="og:description" content="From self-reported claims to evidence you can audit. Measured. Verified. Sovereign." />
                <meta property="og:url" content="https://mavhuafrica.com/services/mrv-infrastructure" />
            </Helmet>

            {/* Global fonts (same as main) */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Serif:wght@400;600;700&display=swap');
        * { font-family: 'IBM Plex Sans', 'Inter', system-ui, sans-serif; }
        h1, h2, h3 { font-family: 'IBM Plex Serif', Georgia, serif; }
        .gradient-text {
          background: linear-gradient(135deg, ${colors.goldAccent}, #D4A82E);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hover-lift {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .hover-lift:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(18,62,86,0.12);
        }
      `}</style>

            <Navbar />

            {/* ─── Hero: full-bleed image ───────────────────────────────────────── */}
            <section className="relative min-h-[88vh] flex items-center overflow-hidden">
                <img src={heroImage} alt="Agricultural landscape monitored by MAvHU MRV" className="absolute inset-0 w-full h-full object-cover" />
                <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(180deg, ${colors.primaryDark}E6 0%, ${colors.primaryDark}B3 55%, ${colors.primaryDark}F2 100%)` }}
                />
                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 text-center text-white">
                    <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
                        <div
                            className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider mb-6"
                            style={{ backgroundColor: `${colors.goldAccent}25`, border: `1px solid ${colors.goldAccent}60`, color: "#D4A82E" }}
                        >
                            MRV Infrastructure
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            From self-reported claims to <br className="hidden sm:block" />
                            <span className="gradient-text">evidence you can audit</span>
                        </h1>
                        <p className="text-base sm:text-lg mb-4 leading-relaxed text-white/85 max-w-3xl mx-auto">
                            Independent, plot-level verification for commodity supply chains, carbon projects and climate
                            programmes. Sovereign digital MRV: one verified evidence chain from the field to disclosure,
                            built on Earth observation and local ground-truthing.
                        </p>
                        <p className="text-sm font-semibold tracking-widest uppercase mb-10 text-white/70">
                            Measured. Verified. Sovereign.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => navigate("/request-demo")}
                                className="group px-8 py-3 rounded-xl font-bold transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                                style={{ background: `linear-gradient(135deg, ${colors.goldAccent}, #D4A82E)`, color: "#fff" }}
                            >
                                Request a Pilot <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                            </button>
                            <button
                                onClick={() => document.getElementById("evidence-chain")?.scrollIntoView({ behavior: "smooth" })}
                                className="px-8 py-3 rounded-xl font-semibold border-2 border-white/30 transition-all hover:bg-white/10"
                            >
                                See the Evidence Chain
                            </button>
                            <button
                                onClick={() => navigate("/taxonomy")}
                                className="px-8 py-3 rounded-xl font-semibold border-2 border-white/30 transition-all hover:bg-white/10 flex items-center justify-center gap-2"
                            >
                                <BookOpen className="w-4 h-4" /> View MRV Taxonomy
                            </button>
                        </div>
                    </motion.div>

                    {/* Four layers strip */}
                    <motion.div
                        className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-14"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                    >
                        {layers.map((layer) => (
                            <motion.div
                                key={layer.name}
                                variants={cardVariants}
                                className="rounded-xl p-4 text-left bg-white/10 border border-white/15 backdrop-blur-sm"
                            >
                                <div className="flex items-center gap-2 mb-1.5" style={{ color: "#D4A82E" }}>
                                    {layer.icon}
                                    <span className="font-bold text-white">{layer.name}</span>
                                </div>
                                <p className="text-xs leading-relaxed text-white/70">{layer.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ─── Who We Are: split with sticky heading ────────────────────────── */}
            <section className="py-20 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-5 gap-12">
                    <motion.div
                        className="lg:col-span-2 lg:sticky lg:top-28 h-fit"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-60px" }}
                        variants={fadeInLeft}
                    >
                        <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: colors.goldAccent }}>Who we are</p>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-5 leading-tight">
                            Africa's climate data infrastructure, <span className="gradient-text">built where the data is needed</span>
                        </h2>
                        <p className="text-lg leading-relaxed" style={{ color: `${colors.primaryDark}AA` }}>
                            Verification is the product, not an add-on.
                        </p>
                    </motion.div>

                    <motion.div
                        className="lg:col-span-3 space-y-5"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-60px" }}
                        variants={fadeInRight}
                    >
                        <div className="bg-white rounded-2xl p-7 border border-[#DCE7E8]">
                            <h3 className="text-xl font-bold mb-2">Verification is the product</h3>
                            <p className="text-sm leading-relaxed" style={{ color: `${colors.primaryDark}80` }}>
                                Sovereign digital MRV: one verified evidence chain from the field to disclosure, built on Earth
                                observation and local ground-truthing.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-7 border border-[#DCE7E8]">
                            <h3 className="text-xl font-bold mb-5">One architecture, four layers</h3>
                            <div className="space-y-3">
                                {layers.map((layer, idx) => (
                                    <div
                                        key={layer.name}
                                        className="flex items-center gap-4 rounded-xl p-3"
                                        style={{ backgroundColor: `${layer.color}0D`, borderLeft: `4px solid ${layer.color}`, marginLeft: `${idx * 12}px` }}
                                    >
                                        <span style={{ color: layer.color }}>{layer.icon}</span>
                                        <span className="font-bold w-14">{layer.name}</span>
                                        <span className="text-sm" style={{ color: `${colors.primaryDark}99` }}>{layer.description}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-7 border border-[#DCE7E8]">
                            <h3 className="text-xl font-bold mb-2">Africa-first</h3>
                            <p className="text-sm leading-relaxed" style={{ color: `${colors.primaryDark}80` }}>
                                Hosted on AWS Cape Town with data residency, and can be hosted in-country as per government
                                guidelines. Designed to ISO/IEC 27001 controls (certification in progress), with
                                tamper-evident audit logging. Methods built around African environmental conditions and
                                regulation.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ─── The Verification Gap: dark band ──────────────────────────────── */}
            <motion.section
                className="py-20 relative text-white"
                style={{ background: `linear-gradient(135deg, ${colors.primaryDark}, ${colors.secondaryBlue})` }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeInUp}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mb-12">
                        <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#D4A82E" }}>The verification gap</p>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Most systems still collect claims. Few check them.</h2>
                        <p className="text-lg text-white/75">
                            Markets, regulators and buyers now ask for proof of where and how a commodity was produced.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* EUDR callout */}
                        <div className="rounded-2xl p-8 bg-white/10 border border-white/15 h-fit">
                            <CalendarClock className="w-8 h-8 mb-4" style={{ color: "#D4A82E" }} />
                            <p className="text-sm uppercase tracking-widest text-white/60 mb-1">EUDR applies from</p>
                            <p className="text-4xl font-bold gradient-text mb-4" style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}>
                                30 Dec 2026
                            </p>
                            <h3 className="text-lg font-bold mb-2">Regulation is landing before the data is ready</h3>
                            <p className="text-sm leading-relaxed text-white/75">
                                African agriculture exporters must show plot-level GPS, no deforestation after 31 December
                                2020, legality, and a filed due diligence statement.
                            </p>
                        </div>

                        {/* Remaining gaps as divided list */}
                        <div className="lg:col-span-2 divide-y divide-white/15">
                            {gaps.map((gap, idx) => (
                                <div key={idx} className="flex gap-5 py-6 first:pt-0">
                                    <span className="text-2xl font-bold w-10 flex-shrink-0" style={{ color: "#D4A82E", fontFamily: "'IBM Plex Serif', Georgia, serif" }}>
                                        {String(idx + 2).padStart(2, "0")}
                                    </span>
                                    <div>
                                        <h3 className="text-lg font-bold mb-2">{gap.title}</h3>
                                        <p className="text-sm leading-relaxed text-white/75">{gap.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* ─── What MAvHU MRV Delivers: evidence-chain timeline ─────────────── */}
            <section id="evidence-chain" className="py-20 relative">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-14"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-60px" }}
                        variants={fadeInUp}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            What <span className="gradient-text">MAvHU MRV Delivers</span>
                        </h2>
                        <p className="text-lg max-w-3xl mx-auto" style={{ color: `${colors.primaryDark}AA` }}>
                            Sovereign climate data infrastructure: one verified evidence chain from the field to disclosure,
                            built on Earth observation and local ground-truthing.
                        </p>
                    </motion.div>

                    <div className="relative">
                        {/* Center line */}
                        <div
                            className="absolute left-5 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-1/2"
                            style={{ background: `linear-gradient(180deg, ${colors.secondaryBlue}, ${colors.goldAccent})` }}
                        />
                        <div className="space-y-8">
                            {steps.map((step, idx) => {
                                const isLeft = idx % 2 === 0;
                                return (
                                    <motion.div
                                        key={step.title}
                                        className={`relative flex md:items-center ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, margin: "-40px" }}
                                        variants={isLeft ? fadeInLeft : fadeInRight}
                                    >
                                        <div
                                            className="absolute left-5 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold z-10 shadow-md"
                                            style={{ background: `linear-gradient(135deg, ${colors.secondaryBlue}, ${colors.primaryDark})`, border: `3px solid ${colors.lightBackground}` }}
                                        >
                                            {idx + 1}
                                        </div>
                                        <div className={`ml-16 md:ml-0 md:w-1/2 ${isLeft ? "md:pr-12" : "md:pl-12"}`}>
                                            <div className="bg-white rounded-2xl p-6 border border-[#DCE7E8] hover-lift">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span style={{ color: colors.goldAccent }}>{step.icon}</span>
                                                    <h3 className="text-lg font-bold">{step.title}</h3>
                                                </div>
                                                <p className="text-sm leading-relaxed" style={{ color: `${colors.primaryDark}80` }}>
                                                    {step.description}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Assurance rail */}
                    <motion.div
                        className="mt-14 rounded-2xl p-6 sm:p-8 border-2 border-dashed"
                        style={{ borderColor: `${colors.goldAccent}60`, backgroundColor: `${colors.goldAccent}08` }}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-40px" }}
                        variants={fadeInUp}
                    >
                        <p className="text-center text-xs font-bold tracking-widest uppercase mb-6" style={{ color: colors.goldAccent }}>
                            Assurance rail: under every step
                        </p>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {assuranceRail.map((item) => (
                                <div key={item.label} className="flex items-center gap-3 bg-white rounded-xl p-4 border border-[#DCE7E8]">
                                    <span style={{ color: colors.secondaryBlue }}>{item.icon}</span>
                                    <span className="text-sm font-semibold">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <p className="text-center mt-10 text-sm font-bold tracking-widest uppercase" style={{ color: colors.secondaryBlue }}>
                        One verified data layer, many decisions
                    </p>

                    {/* Taxonomy link */}
                    <motion.div
                        className="mt-12 bg-white rounded-2xl border border-[#DCE7E8] p-6 sm:p-8 flex flex-col md:flex-row md:items-center gap-6 justify-between hover-lift"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-40px" }}
                        variants={fadeInUp}
                    >
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-xl flex-shrink-0" style={{ backgroundColor: `${colors.goldAccent}12`, border: `1px solid ${colors.goldAccent}25` }}>
                                <BookOpen className="w-6 h-6" style={{ color: colors.goldAccent }} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-1">The MAvHU MRV Taxonomy</h3>
                                <p className="text-sm leading-relaxed" style={{ color: `${colors.primaryDark}80` }}>
                                    Every element of this evidence chain, across nine domains, with its layer, status and
                                    the standards it serves.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                            <button
                                onClick={() => navigate("/taxonomy")}
                                className="group px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                                style={{ background: `linear-gradient(135deg, ${colors.goldAccent}, #D4A82E)`, color: "#fff" }}
                            >
                                View Taxonomy <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                            </button>
                            <a
                                href="/downloads/MAvHU-MRV-Taxonomy.pdf"
                                download
                                className="px-6 py-3 rounded-xl font-semibold border-2 transition-all hover:bg-[#F4FAFA] flex items-center justify-center gap-2"
                                style={{ borderColor: colors.softGrey, color: colors.primaryDark }}
                            >
                                <Download className="w-4 h-4" /> PDF
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ─── Assurance and Uncertainty: top-rule columns ──────────────────── */}
            <motion.section
                className="py-20 relative bg-white"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeInUp}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Assurance and <span className="gradient-text">Uncertainty</span>
                        </h2>
                        <p className="text-lg" style={{ color: `${colors.primaryDark}AA` }}>
                            Methods built to be auditable, not just accurate.
                        </p>
                    </div>
                    <motion.div
                        className="grid md:grid-cols-3 gap-10"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-40px" }}
                    >
                        {assurance.map((item) => (
                            <motion.div key={item.title} variants={cardVariants} className="pt-6" style={{ borderTop: `4px solid ${item.color}` }}>
                                <span className="block mb-4" style={{ color: item.color }}>{item.icon}</span>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-sm leading-relaxed" style={{ color: `${colors.primaryDark}80` }}>{item.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* ─── Who We Serve: tabs ───────────────────────────────────────────── */}
            <motion.section
                className="py-20 relative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeInUp}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Who We <span className="gradient-text">Serve</span>
                        </h2>
                        <p className="text-lg max-w-3xl mx-auto" style={{ color: `${colors.primaryDark}AA` }}>
                            Decision intelligence for those who must prove, price or fund climate outcomes. The same MRV
                            engine serves different buyers of trust.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        <div className="flex lg:flex-col gap-3 overflow-x-auto pb-2 lg:pb-0" role="tablist">
                            {audiences.map((a, idx) => {
                                const isActive = idx === activeAudience;
                                return (
                                    <button
                                        key={a.tab}
                                        role="tab"
                                        aria-selected={isActive}
                                        onClick={() => setActiveAudience(idx)}
                                        className="flex items-center gap-3 text-left rounded-xl px-5 py-4 font-semibold transition-all flex-shrink-0 lg:flex-shrink"
                                        style={{
                                            backgroundColor: isActive ? colors.primaryDark : colors.white,
                                            color: isActive ? colors.white : colors.primaryDark,
                                            border: `1px solid ${isActive ? colors.primaryDark : colors.softGrey}`,
                                        }}
                                    >
                                        <span style={{ color: isActive ? "#D4A82E" : colors.secondaryBlue }}>{a.icon}</span>
                                        <span className="text-sm sm:text-base">{a.tab}</span>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#DCE7E8] p-8 shadow-lg min-h-[320px]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeAudience}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -12 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <h3 className="text-2xl font-bold mb-3">{audience.tab}</h3>
                                    <p className="leading-relaxed mb-6" style={{ color: `${colors.primaryDark}AA` }}>{audience.description}</p>
                                    <ul className="grid sm:grid-cols-2 gap-3">
                                        {audience.points.map((point) => (
                                            <li key={point} className="flex items-start gap-2 text-sm">
                                                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: green }} />
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* ─── Registries and Reporting ─────────────────────────────────────── */}
            <motion.section
                className="py-20 relative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeInUp}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Registries and <span className="gradient-text">Reporting</span>
                        </h2>
                        <p className="text-lg" style={{ color: `${colors.primaryDark}AA` }}>
                            Article 6 and national reporting, from the same evidence chain.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 rounded-2xl overflow-hidden border border-[#DCE7E8] bg-white divide-y md:divide-y-0 md:divide-x divide-[#DCE7E8]">
                        {registries.map((item, idx) => (
                            <div key={item.title} className="p-8">
                                <span className="block text-5xl font-bold gradient-text mb-4" style={{ fontFamily: "'IBM Plex Serif', Georgia, serif" }}>
                                    {String(idx + 1).padStart(2, "0")}
                                </span>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-sm leading-relaxed" style={{ color: `${colors.primaryDark}80` }}>{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* ─── What You Get: checklist panel ────────────────────────────────── */}
            <motion.section
                className="py-20 relative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeInUp}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-10 items-start">
                        <div>
                            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: colors.goldAccent }}>What you get</p>
                            <h2 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
                                Verified evidence, <span className="gradient-text">not another subscription to report claims</span>
                            </h2>
                            <p className="leading-relaxed" style={{ color: `${colors.primaryDark}AA` }}>
                                Evidence that protects market access, defends decisions and lowers assurance cost.
                            </p>
                        </div>
                        <motion.div
                            className="lg:col-span-2 grid sm:grid-cols-2 gap-x-8 gap-y-6"
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-40px" }}
                        >
                            {outcomes.map((item) => (
                                <motion.div key={item.title} variants={cardVariants} className="flex gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${green}15` }}>
                                        <CheckCircle className="w-4 h-4" style={{ color: green }} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold mb-1">{item.title}</h3>
                                        <p className="text-sm leading-relaxed" style={{ color: `${colors.primaryDark}80` }}>{item.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* ─── Why MAvHU ────────────────────────────────────────────────────── */}
            <motion.section
                className="py-20 relative bg-white"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeInUp}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Why <span className="gradient-text">MAvHU?</span>
                        </h2>
                        <p className="text-lg" style={{ color: `${colors.primaryDark}AA` }}>
                            Because verification is the product, not an add-on.
                        </p>
                    </div>
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-40px" }}
                    >
                        {reasons.map((reason) => (
                            <motion.div
                                key={reason.title}
                                variants={cardVariants}
                                className="rounded-2xl p-6 hover-lift"
                                style={{ backgroundColor: colors.lightBackground, border: `1px solid ${colors.softGrey}` }}
                            >
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white"
                                    style={{ background: `linear-gradient(135deg, ${colors.secondaryBlue}, ${colors.primaryDark})` }}>
                                    {reason.icon}
                                </div>
                                <h3 className="text-lg font-bold mb-2">{reason.title}</h3>
                                <p className="text-sm leading-relaxed" style={{ color: `${colors.primaryDark}80` }}>{reason.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* ─── Call to Action: pilots ───────────────────────────────────────── */}
            <motion.section
                className="py-20 relative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeInUp}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div
                        className="rounded-2xl p-8 sm:p-12 shadow-lg text-white grid lg:grid-cols-2 gap-10"
                        style={{ background: `linear-gradient(135deg, ${colors.primaryDark}, ${colors.secondaryBlue})` }}
                    >
                        <div>
                            <h2 className="text-3xl sm:text-4xl font-bold mb-5">
                                Let's verify your <span className="gradient-text">climate asset</span>
                            </h2>
                            <p className="leading-relaxed text-white/80 mb-6">
                                Whether you are a carbon project developer, an agricultural enterprise in the VCM, or a
                                Ministry of Environment and Climate anywhere in Africa, connect with us for a scoped pilot on
                                a sample of your plots or programme area, benchmarked against your national system and
                                recognised standards.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-8">
                                {standards.map((s) => (
                                    <span key={s} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 border border-white/20">
                                        {s}
                                    </span>
                                ))}
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={() => navigate("/request-demo")}
                                    className="group px-8 py-3 rounded-xl font-bold transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                                    style={{ background: `linear-gradient(135deg, ${colors.goldAccent}, #D4A82E)`, color: "#fff" }}
                                >
                                    Request a Pilot <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                                </button>
                                <button
                                    onClick={() => navigate("/contact")}
                                    className="px-8 py-3 rounded-xl font-semibold border-2 border-white/30 transition-all hover:bg-white/10"
                                >
                                    Contact Us
                                </button>
                            </div>
                            <p className="mt-8 text-sm font-semibold tracking-widest uppercase text-white/70">
                                Measured. Verified. Sovereign.
                            </p>
                        </div>

                        <div className="space-y-3">
                            {pilots.map((pilot) => (
                                <button
                                    key={pilot.title}
                                    onClick={() => navigate("/request-demo")}
                                    className="group w-full text-left rounded-xl p-5 bg-white/10 border border-white/15 hover:bg-white/15 transition-all flex items-start justify-between gap-4"
                                >
                                    <div>
                                        <h3 className="font-bold mb-1 flex items-center gap-2">
                                            <FileSearch className="w-4 h-4" style={{ color: "#D4A82E" }} /> {pilot.title}
                                        </h3>
                                        <p className="text-sm leading-relaxed text-white/70">{pilot.description}</p>
                                    </div>
                                    <ArrowRight className="w-5 h-5 mt-1 flex-shrink-0 text-white/50 group-hover:text-white group-hover:translate-x-1 transition" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.section>

            <Footer />
        </div>
    );
};

export default MrvInfrastructurePage;
