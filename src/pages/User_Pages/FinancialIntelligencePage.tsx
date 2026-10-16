import React from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
    ArrowRight,
    Landmark,
    ShieldCheck,
    Building2,
    Globe,
    Database,
    Calculator,
    PieChart,
    AlertTriangle,
    Satellite,
    FileLock2,
    CheckCircle,
    Layers,
    Settings2,
    MapPin,
    TrendingUp,
    Activity,
    GitCompare,
    Gauge,
    Lightbulb,
    ChevronDown,
    MonitorPlay,
    ClipboardList,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import Footer from "../../components/Footer";
import Navbar from "../../components/navbar";
import { useNavigate } from "react-router-dom";
import dashboardImage from "../../assets/dashboard.png";

// ─── Color Palette (matching main site) ─────────────────────────────────────
const colors = {
    primaryDark: "#123E56",
    secondaryBlue: "#1F5C73",
    goldAccent: "#B89A2F",
    lightBackground: "#F4FAFA",
    softGrey: "#DCE7E8",
    white: "#FFFFFF",
};

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

const FinancialIntelligencePage: React.FC = () => {
    const navigate = useNavigate();
    const [openFaq, setOpenFaq] = React.useState<number | null>(0);

    // ─── Who we serve ─────────────────────────────────────────────────────────
    const institutions = [
        {
            title: "Banks",
            description:
                "PCAF Part A financed emissions across lending books, climate risk informing credit decisions, and one entity-scoped, auditable view across the Group and its subsidiaries.",
            icon: <Landmark className="w-6 h-6" />,
            color: colors.secondaryBlue,
        },
        {
            title: "Insurers & Reinsurers",
            description:
                "PCAF Part C insurance-associated emissions, independently checked exposure data for insured assets and reinsurance treaties, and physical risk informing underwriting.",
            icon: <ShieldCheck className="w-6 h-6" />,
            color: colors.goldAccent,
        },
        {
            title: "Central Banks & Regulators",
            description:
                "Decision-grade climate data aligned to central-bank climate risk guidelines and IFRS S1/S2, sitting on a tamper-proof audit trail.",
            icon: <Building2 className="w-6 h-6" />,
            color: "#2E7D6B",
        },
        {
            title: "Development Finance Institutions (DFIs)",
            description:
                "Verified data on land-based exposures and portfolio companies, giving Decision Intelligence across Climate Finance, Adaptation and Carbon Market participation.",
            icon: <Globe className="w-6 h-6" />,
            color: colors.secondaryBlue,
        },
    ];

    // ─── The data fragmentation problem ───────────────────────────────────────
    const problems = [
        {
            title: "Regulatory pressure is compounding",
            description:
                "IFRS S1/S2 adoption, central-bank climate risk guidelines, exchange disclosure rules, and insurance, reinsurance and securities regulator obligations are landing on institutions at the same time.",
        },
        {
            title: "ESG now drives risk decisions",
            description:
                "Risk pricing, capital allocation, product design and access to sustainable finance all depend on ESG data quality. It requires the same discipline institutions already apply to financial data.",
        },
        {
            title: "Group structures make it worse",
            description:
                "A bank, its subsidiaries and its portfolio companies, or a cedant and portfolio network, each hold partial, disconnected data, with no single, entity-scoped, auditable view across the Group.",
        },
        {
            title: "Reporting tools aggregate… they don't verify",
            description:
                "Most ESG software repeats back what an institution tells it. Underlying exposure, whether an insured asset, a reinsurance treaty, land use or physical risk data, is rarely independently checked.",
        },
    ];

    // ─── What MAvHU delivers ──────────────────────────────────────────────────
    const lifecycle = ["Capture", "Validation", "Calculation", "Approval", "Disclosure", "Audit & Traceability"];

    const capabilities = [
        {
            title: "ESG Data Collection",
            description:
                "A three-channel model matched to how data actually exists inside a financial institution: manual entry, bulk upload, and API integration.",
            icon: <Database className="w-6 h-6" />,
            color: colors.secondaryBlue,
        },
        {
            title: "GHG Accounting",
            description:
                "Scope 1, 2 and operational Scope 3, under the GHG Protocol, with dual Scope 2 reporting.",
            icon: <Calculator className="w-6 h-6" />,
            color: colors.goldAccent,
        },
        {
            title: "Financed & Insurance Emissions",
            description:
                "PCAF Part A across asset classes for lending books, PCAF Part B for capital-markets activity, and PCAF Part C for insurance-associated emissions.",
            icon: <PieChart className="w-6 h-6" />,
            color: "#2E7D6B",
        },
        {
            title: "Climate Risk Management",
            description:
                "A structured risk register, NGFS scenario analysis, and a documented chain through to Climate Value at Risk, informing credit, underwriting and portfolio decisions.",
            icon: <AlertTriangle className="w-6 h-6" />,
            color: colors.secondaryBlue,
        },
        {
            title: "MRV Verification Layer",
            description:
                "Satellite and field verification lifting the data quality of land-based exposures, without extra manual collection from the institution or its borrowers.",
            icon: <Satellite className="w-6 h-6" />,
            color: colors.goldAccent,
        },
        {
            title: "Disclosure & Audit",
            description:
                "Framework-mapped disclosure output, locked once published, sitting on a tamper-proof audit trail.",
            icon: <FileLock2 className="w-6 h-6" />,
            color: "#2E7D6B",
        },
    ];

    // ─── Why MAvHU ────────────────────────────────────────────────────────────
    const differentiators = [
        {
            title: "Independent verification, not aggregation",
            description:
                "The MRV layer derives exposure and hazard data from satellite and reanalysis datasets already in operational use, lifting PCAF data-quality scores without extra manual collection from the client.",
            icon: <CheckCircle className="w-6 h-6" />,
        },
        {
            title: "A standards-change process already tested",
            description:
                "Not hypothetical, but proven on a live client engagement, where new PCAF guidance was received mid-project, diffed, classified and shipped without disrupting existing builds.",
            icon: <Settings2 className="w-6 h-6" />,
        },
        {
            title: "Framework coverage built once, reported many times",
            description:
                "Every data field is tagged once against a standards alignment matrix. One entry serves every disclosure output. Adding a new framework is configuration, not a rebuild.",
            icon: <Layers className="w-6 h-6" />,
        },
        {
            title: "Africa-first infrastructure",
            description:
                "Hosting (AWS Cape Town), data residency and methodology are built around African environmental conditions and regulatory requirements, not adapted from a northern-hemisphere template.",
            icon: <MapPin className="w-6 h-6" />,
        },
    ];

    // ─── Explainable AI ───────────────────────────────────────────────────────
    const aiCapabilities = [
        {
            title: "Emissions forecasting",
            description: "Transparent trend regression per entity, projected forward from its own reporting history.",
            icon: <TrendingUp className="w-5 h-5" />,
        },
        {
            title: "Anomaly detection",
            description: "Statistical flags against each entity's own baseline, routed to human review, never auto-published.",
            icon: <Activity className="w-5 h-5" />,
        },
        {
            title: "Inconsistency detection",
            description: "Cross-checks a value against Group peers, prior periods and derived-ratio bands.",
            icon: <GitCompare className="w-5 h-5" />,
        },
        {
            title: "Climate risk prediction",
            description: "A documented chain from exposure through hazard and vulnerability to credit impact and Climate VaR.",
            icon: <Gauge className="w-5 h-5" />,
        },
        {
            title: "Insight generation",
            description: "States what moved, by how much and since when, with a named owner for the decision.",
            icon: <Lightbulb className="w-5 h-5" />,
        },
    ];

    const aiPrinciples = [
        "Approved data only",
        "Explainable method, no black-box scoring",
        "Every output routes to a human decision",
        "Fully audit-trailed",
    ];

    // ─── FAQ ──────────────────────────────────────────────────────────────────
    const faqs = [
        {
            q: "What's the standard implementation timeline?",
            a: "10–12 weeks from contract signature to go-live, phase-gated: discovery & configuration → data migration & validation → user acceptance testing → training & change management → go-live & hypercare. Timeline scales with entity count and data sources.",
        },
        {
            q: "Is data hosted per entity, or across a Group?",
            a: "Both models are supported. A single institution runs on its own dedicated instance. A Group with subsidiaries runs on one consolidated instance with entity-scoped access and reporting, or on fully separate instances where strict segregation is required. All hosting is on AWS Cape Town (af-south-1), keeping data on the continent.",
        },
        {
            q: "Which standards does MAvHU align to?",
            a: "GHG Protocol (Scope 1, 2, 3), PCAF (financed and insurance emissions), GRI, and IFRS S1/S2, plus local regulatory alignment, currently RBZ's Climate Risk Guidelines, with further jurisdictions added as engagements require. Every field is mapped once against a standards matrix, so adding a new framework is configuration, not a rebuild.",
        },
        {
            q: "Is MAvHU certified?",
            a: "ISO 27001 is on an active, documented roadmap. Governance controls are already in place ahead of certification: AES-256 encryption, IAM-based role access control, and point-in-time recovery, all on AWS Cape Town infrastructure.",
        },
        {
            q: "How is pricing structured?",
            a: "A platform subscription plus a one-time implementation fee. Optional add-ons, such as satellite/MRV verification and custom analytics, are scoped and priced separately, only where you want them.",
        },
        {
            q: "Can MAvHU integrate with our existing systems?",
            a: "Yes. API integration sits alongside manual entry and bulk upload, so data can flow from core banking, ERP or data warehouse systems without manual re-entry.",
        },
        {
            q: "Who owns the data?",
            a: "You do, in full. MAvHU provides a tamper-proof audit trail and full export capability at any time.",
        },
    ];

    // ─── Engagement options ───────────────────────────────────────────────────
    const engagements = [
        {
            title: "Live platform demonstration",
            description: "See the platform run against a sample of your own reporting structure.",
            icon: <MonitorPlay className="w-6 h-6" />,
        },
        {
            title: "MRV data layer demo",
            description: "Explore MAvHU's enterprise data infrastructure supporting Credit Risk and Climate Finance.",
            icon: <Satellite className="w-6 h-6" />,
        },
        {
            title: "A scoped proposal",
            description: "An implementation plan built around your entities and frameworks.",
            icon: <ClipboardList className="w-6 h-6" />,
        },
    ];


    return (
        <div
            className="min-h-screen overflow-x-hidden"
            style={{ backgroundColor: colors.lightBackground, color: colors.primaryDark }}
        >
            <Helmet>
                <title>Financial Intelligence – Climate Data Infrastructure for Financial Institutions | MAvHU</title>
                <meta
                    name="description"
                    content="MAvHU Financial Intelligence gives banks, insurers, central banks and DFIs a single, auditable source of ESG: PCAF financed and insurance emissions, climate risk, MRV verification and IFRS S1/S2 disclosure, hosted in Africa."
                />
                <link rel="canonical" href="https://mavhuafrica.com/services/financial-intelligence" />
                <meta property="og:title" content="MAvHU Financial Intelligence – Climate Data Infrastructure for Financial Institutions" />
                <meta property="og:description" content="From fragmented spreadsheets to a single, auditable source of ESG. Measured. Verified. Sovereign." />
                <meta property="og:url" content="https://mavhuafrica.com/services/financial-intelligence" />
            </Helmet>

            {/* Global fonts & scrollbar (same as main) */}
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

            {/* ─── Hero ─────────────────────────────────────────────────────────── */}
            <section className="relative pt-28 pb-20 sm:pt-32 sm:pb-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#F4FAFA] via-white to-[#DCE7E8]/30" />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeInLeft}
                            className="text-center lg:text-left"
                        >
                            <div
                                className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider mb-6"
                                style={{ backgroundColor: `${colors.goldAccent}12`, border: `1px solid ${colors.goldAccent}30`, color: colors.goldAccent }}
                            >
                                Financial Intelligence
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                                Climate Data Infrastructure <br />
                                <span className="gradient-text">for Financial Institutions</span>
                            </h1>
                            <p className="text-base sm:text-lg mb-4 leading-relaxed" style={{ color: `${colors.primaryDark}CC` }}>
                                From fragmented spreadsheets to a single, auditable source of ESG. MAvHU connects Earth
                                observation, field evidence, environmental datasets and institutional information into
                                verifiable, auditable, decision-grade intelligence for banks, insurers, central banks and
                                development finance institutions.
                            </p>
                            <p className="text-sm font-semibold tracking-widest uppercase mb-8" style={{ color: colors.secondaryBlue }}>
                                Measured. Verified. Sovereign.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <button
                                    onClick={() => navigate("/request-demo")}
                                    className="group px-8 py-3 rounded-xl font-bold transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                                    style={{ background: `linear-gradient(135deg, ${colors.goldAccent}, #D4A82E)`, color: "#fff" }}
                                >
                                    Request Demo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                                </button>
                                <button
                                    onClick={() => document.getElementById("capabilities")?.scrollIntoView({ behavior: "smooth" })}
                                    className="px-8 py-3 rounded-xl font-semibold border-2 transition-all hover:bg-white/50"
                                    style={{ borderColor: colors.softGrey, color: colors.primaryDark }}
                                >
                                    What MAvHU Delivers
                                </button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeInRight}
                            className="flex justify-center lg:justify-end"
                        >
                            <div className="relative w-full max-w-md lg:max-w-lg">
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#1F5C73]/20 to-[#B89A2F]/20 rounded-2xl blur-2xl" />
                                <img
                                    src={dashboardImage}
                                    alt="MAvHU Financial Intelligence platform"
                                    className="relative rounded-2xl shadow-2xl w-full h-auto object-cover border border-white/30"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ─── Who We Serve ─────────────────────────────────────────────────── */}
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
                            Built for <span className="gradient-text">Financial Institutions</span>
                        </h2>
                        <p className="text-lg max-w-3xl mx-auto" style={{ color: `${colors.primaryDark}AA` }}>
                            Economic decisions, from climate finance and insurance to banking and government policy,
                            increasingly depend on trusted environmental data.
                        </p>
                    </div>

                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-40px" }}
                    >
                        {institutions.map((inst, idx) => (
                            <motion.div
                                key={idx}
                                variants={cardVariants}
                                className="bg-white rounded-2xl p-7 border border-[#DCE7E8] hover-lift text-center"
                            >
                                <div
                                    className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5"
                                    style={{ backgroundColor: `${inst.color}12`, border: `1px solid ${inst.color}25` }}
                                >
                                    <span style={{ color: inst.color }}>{inst.icon}</span>
                                </div>
                                <h3 className="text-lg font-bold mb-3">{inst.title}</h3>
                                <p className="text-sm leading-relaxed" style={{ color: `${colors.primaryDark}80` }}>
                                    {inst.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* ─── The Data Fragmentation Problem ───────────────────────────────── */}
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
                            The Data <span className="gradient-text">Fragmentation Problem</span>
                        </h2>
                        <p className="text-lg max-w-3xl mx-auto" style={{ color: `${colors.primaryDark}AA` }}>
                            African financial institutions all describe the same infrastructural challenge, almost word
                            for word: ESG data is fragmented, manually collected and largely spreadsheet-based, creating
                            data integrity risk and limited audit readiness.
                        </p>
                    </div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-40px" }}
                    >
                        {problems.map((problem, idx) => (
                            <motion.div
                                key={idx}
                                variants={cardVariants}
                                className="bg-white rounded-2xl p-6 border border-[#DCE7E8] hover-lift flex gap-5"
                            >
                                <div
                                    className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-lg font-bold"
                                    style={{ backgroundColor: `${colors.goldAccent}12`, border: `1px solid ${colors.goldAccent}30`, color: colors.goldAccent }}
                                >
                                    {idx + 1}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold mb-2">{problem.title}</h3>
                                    <p className="text-sm leading-relaxed" style={{ color: `${colors.primaryDark}80` }}>
                                        {problem.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* ─── What MAvHU Delivers ──────────────────────────────────────────── */}
            <motion.section
                id="capabilities"
                className="py-20 relative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeInUp}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            What <span className="gradient-text">MAvHU Delivers</span>
                        </h2>
                        <p className="text-lg max-w-3xl mx-auto" style={{ color: `${colors.primaryDark}AA` }}>
                            A single platform that goes beyond SaaS and mere reporting: Climate Data Infrastructure rooted
                            in local environmental realities and ground-truthing, covering the full ESG data lifecycle.
                        </p>
                    </div>

                    {/* Lifecycle strip */}
                    <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-12">
                        {lifecycle.map((step, idx) => (
                            <React.Fragment key={step}>
                                <span
                                    className="px-4 py-2 rounded-full text-sm font-semibold"
                                    style={{ backgroundColor: colors.white, border: `1px solid ${colors.softGrey}`, color: colors.secondaryBlue }}
                                >
                                    {step}
                                </span>
                                {idx < lifecycle.length - 1 && (
                                    <ArrowRight className="w-4 h-4 hidden sm:block" style={{ color: colors.goldAccent }} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-40px" }}
                    >
                        {capabilities.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                variants={cardVariants}
                                className="bg-white rounded-2xl p-6 border border-[#DCE7E8] hover-lift"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="p-2.5 rounded-xl" style={{ backgroundColor: `${feature.color}12`, border: `1px solid ${feature.color}20` }}>
                                        <span style={{ color: feature.color }}>{feature.icon}</span>
                                    </div>
                                    <h3 className="text-lg font-bold" style={{ color: colors.primaryDark }}>{feature.title}</h3>
                                </div>
                                <p className="text-sm leading-relaxed" style={{ color: `${colors.primaryDark}80` }}>
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>

                    <p className="text-center mt-10 text-sm font-bold tracking-widest uppercase" style={{ color: colors.goldAccent }}>
                        One data layer – multiple economic decisions
                    </p>
                </div>
            </motion.section>

            {/* ─── Why MAvHU ────────────────────────────────────────────────────── */}
            <motion.section
                className="py-20 relative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeInUp}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl border border-[#DCE7E8] p-8 sm:p-12 shadow-lg">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                                Why <span className="gradient-text">MAvHU?</span>
                            </h2>
                            <p className="text-lg max-w-3xl mx-auto" style={{ color: `${colors.primaryDark}AA` }}>
                                Because we are not just another reporting tool. Conventional ESG software aggregates what an
                                institution tells it. The MAvHU MRV engine independently verifies it.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            {differentiators.map((item, idx) => (
                                <div key={idx} className="flex gap-4">
                                    <div className="flex-shrink-0 p-3 h-fit rounded-xl" style={{ backgroundColor: `${colors.secondaryBlue}12` }}>
                                        <span style={{ color: colors.secondaryBlue }}>{item.icon}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                        <p className="text-sm leading-relaxed" style={{ color: `${colors.primaryDark}80` }}>
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* ─── Explainable AI ───────────────────────────────────────────────── */}
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
                            Explainable AI, <span className="gradient-text">Proven Live</span>
                        </h2>
                        <p className="text-lg max-w-3xl mx-auto" style={{ color: `${colors.primaryDark}AA` }}>
                            Five analytical capabilities run in the MAvHU platform today, built to a simple principle: a
                            financial institution is better served by methods it can explain and defend than by a broad
                            claim it cannot evidence.
                        </p>
                    </div>

                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-40px" }}
                    >
                        {aiCapabilities.map((cap, idx) => (
                            <motion.div
                                key={idx}
                                variants={cardVariants}
                                className="bg-white rounded-2xl p-6 border border-[#DCE7E8] text-center hover-lift"
                            >
                                <div className="flex justify-center mb-4">
                                    <div className="p-3 rounded-xl" style={{ backgroundColor: `${colors.goldAccent}12` }}>
                                        <span style={{ color: colors.goldAccent }}>{cap.icon}</span>
                                    </div>
                                </div>
                                <h3 className="font-bold text-base mb-2">{cap.title}</h3>
                                <p className="text-xs leading-relaxed" style={{ color: `${colors.primaryDark}70` }}>
                                    {cap.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>

                    <div className="flex flex-wrap justify-center gap-3 mt-10">
                        {aiPrinciples.map((principle) => (
                            <span
                                key={principle}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                                style={{ backgroundColor: `${colors.secondaryBlue}10`, color: colors.secondaryBlue }}
                            >
                                <CheckCircle className="w-4 h-4" /> {principle}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* ─── FAQ ──────────────────────────────────────────────────────────── */}
            <motion.section
                className="py-20 relative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeInUp}
            >
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Frequently Asked <span className="gradient-text">Questions</span>
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, idx) => {
                            const isOpen = openFaq === idx;
                            return (
                                <div key={idx} className="bg-white rounded-2xl border border-[#DCE7E8] overflow-hidden">
                                    <button
                                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                                        className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
                                        aria-expanded={isOpen}
                                    >
                                        <span className="font-bold text-base sm:text-lg">{faq.q}</span>
                                        <ChevronDown
                                            className={`w-5 h-5 flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                                            style={{ color: colors.goldAccent }}
                                        />
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.25 }}
                                            >
                                                <p className="px-5 sm:px-6 pb-6 text-sm leading-relaxed" style={{ color: `${colors.primaryDark}99` }}>
                                                    {faq.a}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </motion.section>

            {/* ─── Call to Action ───────────────────────────────────────────────── */}
            <motion.section
                className="py-20 relative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeInUp}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div
                        className="rounded-2xl p-8 sm:p-12 shadow-lg text-white"
                        style={{ background: `linear-gradient(135deg, ${colors.primaryDark}, ${colors.secondaryBlue})` }}
                    >
                        <div className="text-center mb-10">
                            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                                Let's talk about your <span className="gradient-text">institution's ESG data</span>
                            </h2>
                            <p className="text-lg max-w-3xl mx-auto text-white/80">
                                A working platform demonstration, configured around the reporting frameworks and portfolio
                                structure that matter to your institution.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 mb-10">
                            {engagements.map((item, idx) => (
                                <div key={idx} className="rounded-2xl p-6 bg-white/10 border border-white/15 text-center">
                                    <div className="flex justify-center mb-4">
                                        <div className="p-3 rounded-xl bg-white/10" style={{ color: "#D4A82E" }}>
                                            {item.icon}
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                    <p className="text-sm leading-relaxed text-white/75">{item.description}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => navigate("/request-demo")}
                                className="group px-8 py-3 rounded-xl font-bold transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                                style={{ background: `linear-gradient(135deg, ${colors.goldAccent}, #D4A82E)`, color: "#fff" }}
                            >
                                Request Demo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                            </button>
                            <button
                                onClick={() => navigate("/contact")}
                                className="px-8 py-3 rounded-xl font-semibold border-2 border-white/30 transition-all hover:bg-white/10"
                            >
                                Contact Us
                            </button>
                        </div>
                        <p className="text-center mt-8 text-sm font-semibold tracking-widest uppercase text-white/70">
                            Measured. Verified. Sovereign.
                        </p>
                    </div>
                </div>
            </motion.section>

            <Footer />
        </div>
    );
};

export default FinancialIntelligencePage;
