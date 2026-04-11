import React from "react";
import { motion } from "framer-motion";
import {
    Cpu,
    Brain,
    FileText,
    Database,
    Zap,
    Shield,
    ArrowRight,
    CheckCircle,
    RefreshCw,
    TrendingUp,
} from "lucide-react";
import Footer from "../../components/Footer";
import Navbar from "../../components/navbar";
import { useNavigate } from "react-router-dom";
import aiHeroImage from "../../assets/ai-image.png";

const colors = {
    primaryDark: "#123E56",
    secondaryBlue: "#1F5C73",
    goldAccent: "#B89A2F",
    lightBackground: "#F4FAFA",
    softGrey: "#DCE7E8",
    white: "#FFFFFF",
    aiAccent: "#2E7D6B",
};

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const fadeInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};
const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, type: "spring", stiffness: 120 } },
};

const AiPage: React.FC = () => {
    const navigate = useNavigate();

    const capabilities = [
        {
            title: "Machine Learning Models",
            description: "Advanced algorithms for pattern recognition, anomaly detection, and predictive analytics across climate and land datasets.",
            icon: <Brain className="w-6 h-6" />,
            color: colors.aiAccent,
        },
        {
            title: "Automated MRV",
            description: "End-to-end automation of monitoring, reporting, and verification workflows – reducing manual effort by up to 80%.",
            icon: <RefreshCw className="w-6 h-6" />,
            color: colors.goldAccent,
        },
        {
            title: "Predictive Analytics",
            description: "Forecast climate trends, crop yields, carbon sequestration, and risk events with probabilistic models.",
            icon: <TrendingUp className="w-6 h-6" />,
            color: colors.secondaryBlue,
        },
        {
            title: "Natural Language Processing",
            description: "Automated report generation, compliance document analysis, and extraction of insights from unstructured text.",
            icon: <FileText className="w-6 h-6" />,
            color: colors.aiAccent,
        },
    ];

    const processSteps = [
        {
            step: "01",
            title: "Data Ingestion",
            description: "Raw satellite, drone, sensor, and field data are fed into our AI pipeline.",
            icon: <Database className="w-6 h-6" />,
        },
        {
            step: "02",
            title: "Model Training & Validation",
            description: "Custom models are trained on African‑specific datasets and continuously validated against ground truth.",
            icon: <Cpu className="w-6 h-6" />,
        },
        {
            step: "03",
            title: "Inference & Automation",
            description: "Trained models run predictions, flag anomalies, and trigger automated workflows.",
            icon: <Zap className="w-6 h-6" />,
        },
        {
            step: "04",
            title: "Output & Integration",
            description: "Results are delivered via APIs, dashboards, or automated reports for MRV and ESG compliance.",
            icon: <Shield className="w-6 h-6" />,
        },
    ];

    const themeClasses = {
        bg: colors.lightBackground,
        text: `text-[${colors.primaryDark}]`,
        textSecondary: `text-[${colors.primaryDark}]/80`,
        textMuted: `text-[${colors.primaryDark}]/60`,
        navBg: `${colors.white}/95`,
        cardBg: colors.white,
        border: `border-[${colors.softGrey}]`,
    };

    return (
        <div
            className="min-h-screen overflow-x-hidden"
            style={{ backgroundColor: colors.lightBackground, color: colors.primaryDark }}
        >
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
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(18,62,86,0.1);
        }
      `}</style>

            <Navbar />

            {/* Hero – compact, centered, image below */}
            <section className="relative pt-20 pb-12 sm:pt-24 sm:pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#F4FAFA] via-white to-[#DCE7E8]/20" />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <span
                            className="inline-block text-xs tracking-[0.2em] uppercase font-semibold mb-3 px-3 py-1 rounded-full"
                            style={{ backgroundColor: `${colors.aiAccent}12`, border: `1px solid ${colors.aiAccent}30`, color: colors.aiAccent }}
                        >
                            MAvHU Ai
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                            Automated MRV & <br />
                            <span className="gradient-text">Climate Intelligence</span>
                        </h1>
                        <p className="text-base sm:text-lg max-w-2xl mx-auto mb-6 leading-relaxed" style={{ color: `${colors.primaryDark}CC` }}>
                            MAvHU Ai brings the power of machine learning, automated MRV, and predictive analytics to climate action – transforming raw data into audit‑ready intelligence.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button
                                onClick={() => navigate("/request-demo")}
                                className="group px-6 py-2.5 rounded-xl font-semibold transition-all hover:scale-105 shadow-md flex items-center justify-center gap-2"
                                style={{ background: `linear-gradient(135deg, ${colors.goldAccent}, #D4A82E)`, color: "#fff" }}
                            >
                                Request a Demo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                            </button>
                            <button
                                onClick={() => document.getElementById("capabilities")?.scrollIntoView({ behavior: "smooth" })}
                                className="px-6 py-2.5 rounded-xl font-semibold border-2 transition-all hover:bg-white/50"
                                style={{ borderColor: colors.softGrey, color: colors.primaryDark }}
                            >
                                Explore Capabilities
                            </button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="mt-8 flex justify-center"
                    >
                        <div className="relative max-w-3xl w-full">
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#2E7D6B]/20 to-[#B89A2F]/20 rounded-2xl blur-xl" />
                            <img
                                src={aiHeroImage}
                                alt="MAvHU Ai – automated climate intelligence"
                                className="relative rounded-xl shadow-xl w-full h-auto object-cover border border-white/30"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* What is MAvHU Ai? – two-column overview */}
            <motion.section
                className="py-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeInUp}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        <motion.div variants={fadeInLeft}>
                            <h2 className="text-3xl font-bold mb-3">
                                What is <span className="gradient-text">MAvHU Ai?</span>
                            </h2>
                            <p className="text-base leading-relaxed mb-4" style={{ color: `${colors.primaryDark}CC` }}>
                                An intelligent layer that automates the entire MRV lifecycle – from data validation to report generation – using machine learning, predictive analytics, and natural language processing.
                            </p>
                            <h3 className="text-xl font-bold mb-2" style={{ color: colors.aiAccent }}>
                                Intelligence at Scale
                            </h3>
                            <p className="text-base leading-relaxed mb-4" style={{ color: `${colors.primaryDark}CC` }}>
                                MAvHU Ai processes millions of data points daily, detects anomalies, predicts climate trends, and produces audit‑ready ESG and carbon reports – all without manual intervention.
                            </p>
                            <ul className="space-y-2">
                                {[
                                    "80% reduction in manual MRV effort",
                                    "Real‑time anomaly detection and alerts",
                                    "Predictive models for carbon and crop yield",
                                    "Automated report generation aligned with GRI, SASB, TCFD",
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm" style={{ color: `${colors.primaryDark}BB` }}>
                                        <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: colors.aiAccent }} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div variants={fadeInRight} className="relative">
                            <div className="relative bg-white rounded-xl p-5 border border-[#DCE7E8] shadow-md">
                                <div className="flex items-center gap-2 mb-3">
                                    <Cpu className="w-5 h-5" style={{ color: colors.aiAccent }} />
                                    <h4 className="font-bold text-base">Key AI Capabilities</h4>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    {[
                                        "Anomaly detection",
                                        "Predictive analytics",
                                        "Automated MRV",
                                        "NLP reporting",
                                        "Trend forecasting",
                                        "Data fusion",
                                    ].map((out, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-xs">
                                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.aiAccent }} />
                                            <span>{out}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Capabilities – 4 cards */}
            <motion.section
                id="capabilities"
                className="py-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeInUp}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold mb-2">
                            Core <span className="gradient-text">Capabilities</span>
                        </h2>
                        <p className="text-base" style={{ color: `${colors.primaryDark}AA` }}>
                            MAvHU Ai’s intelligent engine for climate action.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {capabilities.map((cap, idx) => (
                            <motion.div
                                key={idx}
                                variants={cardVariants}
                                className="bg-white rounded-xl p-5 border border-[#DCE7E8] hover-lift group"
                            >
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform"
                                    style={{ backgroundColor: `${cap.color}12`, border: `1px solid ${cap.color}20` }}
                                >
                                    <span style={{ color: cap.color }}>{cap.icon}</span>
                                </div>
                                <h3 className="text-lg font-bold mb-1" style={{ color: colors.primaryDark }}>
                                    {cap.title}
                                </h3>
                                <p className="text-sm leading-relaxed" style={{ color: `${colors.primaryDark}80` }}>
                                    {cap.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Process – Vertical Timeline */}
            <motion.section
                id="process"
                className="py-12 relative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeInUp}
            >
                <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${colors.secondaryBlue}04, ${colors.aiAccent}04)` }} />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold mb-2">
                            How <span className="gradient-text">It Works</span>
                        </h2>
                        <p className="text-base" style={{ color: `${colors.primaryDark}AA` }}>
                            From raw data to automated intelligence.
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        {processSteps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeInRight}
                                className="relative flex gap-5 pb-8 last:pb-0 group"
                            >
                                {idx < processSteps.length - 1 && (
                                    <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gradient-to-b from-[#2E7D6B] to-[#1F5C73] opacity-30" />
                                )}
                                <div
                                    className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md"
                                    style={{ backgroundColor: colors.aiAccent }}
                                >
                                    {step.step}
                                </div>
                                <div className="flex-1 bg-white rounded-xl p-5 border border-[#DCE7E8] hover-lift">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="p-1.5 rounded-full" style={{ backgroundColor: `${colors.aiAccent}10` }}>
                                            {step.icon}
                                        </div>
                                        <h3 className="text-lg font-bold" style={{ color: colors.primaryDark }}>{step.title}</h3>
                                    </div>
                                    <p className="text-sm leading-relaxed" style={{ color: `${colors.primaryDark}80` }}>
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Standards & Compliance – compact */}
            <motion.section
                className="py-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeInUp}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl border border-[#DCE7E8] p-6 shadow-md text-center">
                        <h3 className="text-xl font-bold mb-4">
                            Aligned with <span className="gradient-text">Global Standards</span>
                        </h3>
                        <div className="flex flex-wrap justify-center gap-2">
                            {[
                                "Verra VCS MRV",
                                "Gold Standard",
                                "ISO 14064-3",
                                "GRI 306",
                                "SASB",
                                "TCFD",
                            ].map((std, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 rounded-full text-xs font-medium border"
                                    style={{ backgroundColor: `${colors.aiAccent}08`, borderColor: colors.softGrey, color: colors.primaryDark }}
                                >
                                    {std}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* CTA – compact */}
            <motion.section
                className="py-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeInUp}
            >
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div
                        className="rounded-2xl p-8 sm:p-10 shadow-xl"
                        style={{ background: `linear-gradient(135deg, ${colors.secondaryBlue}08, ${colors.aiAccent}08)`, border: `1px solid ${colors.softGrey}` }}
                    >
                        <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                            Ready to automate your <br />
                            <span className="gradient-text">climate MRV?</span>
                        </h2>
                        <p className="text-base mb-6 max-w-xl mx-auto" style={{ color: `${colors.primaryDark}BB` }}>
                            Let MAvHU Ai handle data validation, reporting, and compliance – so you can focus on impact.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button
                                onClick={() => navigate("/request-demo")}
                                className="group px-6 py-2.5 rounded-xl font-semibold transition-all hover:scale-105 shadow-md flex items-center justify-center gap-2"
                                style={{ background: `linear-gradient(135deg, ${colors.goldAccent}, #D4A82E)`, color: "#fff" }}
                            >
                                Request a Demo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                            </button>
                            <button
                                onClick={() => navigate("/contact")}
                                className="px-6 py-2.5 rounded-xl font-semibold border-2 transition-all hover:bg-white/50"
                                style={{ borderColor: colors.softGrey, color: colors.primaryDark }}
                            >
                                Contact Sales
                            </button>
                        </div>
                    </div>
                </div>
            </motion.section>

            <Footer isDarkMode={false} themeClasses={themeClasses} />
        </div>
    );
};

export default AiPage;