import React from "react";
import { motion } from "framer-motion";
import {
    Database,
    Zap,
    Shield,
    ArrowRight,
    CheckCircle,
    Cloud,
    Code,
    Globe,
    BarChart3,
    Activity,
    Users,
    Lock,
    Server,
    Layers,
    KeyRound,
    BookOpen,
} from "lucide-react";
import Footer from "../../components/Footer";
import Navbar from "../../components/navbar";
import { useNavigate } from "react-router-dom";
import apiImage from "../../assets/serviceapi.png";

// Color Palette
const colors = {
    primaryDark: "#123E56",
    secondaryBlue: "#1F5C73",
    goldAccent: "#B89A2F",
    lightBackground: "#F4FAFA",
    softGrey: "#DCE7E8",
    white: "#FFFFFF",
};

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};
const fadeInLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const fadeInRight = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, type: "spring", stiffness: 120 } },
};

const ApiPage: React.FC = () => {
    const navigate = useNavigate();


    // Process steps – using imported icons
    const processSteps = [
        {
            step: "01",
            title: "Get API Keys",
            description: "Sign up, verify your organisation, and generate API keys from the developer portal.",
            icon: <KeyRound className="w-5 h-5" />,
        },
        {
            step: "02",
            title: "Read Documentation",
            description: "Explore interactive API docs with code examples in Python, JavaScript, and cURL.",
            icon: <BookOpen className="w-5 h-5" />,
        },
        {
            step: "03",
            title: "Integrate Endpoints",
            description: "Call our REST/GraphQL endpoints to pull climate intelligence into your apps.",
            icon: <Code className="w-5 h-5" />,
        },
        {
            step: "04",
            title: "Monitor & Scale",
            description: "Use our dashboard to track usage, manage rate limits, and upgrade as you grow.",
            icon: <Server className="w-5 h-5" />,
        },
    ];

    // Benefits
    const benefits = [
        {
            title: "Integration Speed",
            description: "Go from signup to first API call in under 10 minutes.",
            stat: "<10 min",
            icon: <Zap className="w-5 h-5" />,
        },
        {
            title: "Data Freshness",
            description: "Near‑real‑time updates for dynamic climate indicators.",
            stat: "Daily",
            icon: <Cloud className="w-5 h-5" />,
        },
        {
            title: "Uptime Guarantee",
            description: "Enterprise SLA with 99.9% availability.",
            stat: "99.9%",
            icon: <Shield className="w-5 h-5" />,
        },
        {
            title: "Developer Support",
            description: "Dedicated support and SLAs for enterprise plans.",
            stat: "24/7",
            icon: <Users className="w-5 h-5" />,
        },
    ];

    // Use cases
    const useCases = [
        {
            title: "FinTech & Risk Platforms",
            description: "Embed climate risk scores into loan origination, insurance underwriting, and portfolio monitoring.",
            icon: <Database className="w-6 h-6" />,
        },
        {
            title: "Supply Chain Software",
            description: "Add deforestation alerts, emissions factors, and compliance status to traceability tools.",
            icon: <Globe className="w-6 h-6" />,
        },
        {
            title: "Carbon Accounting",
            description: "Automated GHG calculations using verified land and soil data for Scope 1,2,3.",
            icon: <Activity className="w-6 h-6" />,
        },
        {
            title: "Government & Policy",
            description: "Integrate environmental baselines into national reporting and NDC dashboards.",
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
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(18,62,86,0.12);
        }
      `}</style>

            <Navbar />

            {/* Hero Section */}
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
                                Climate Data APIs
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                                Plug‑and‑Play <br />
                                <span className="gradient-text">Climate Intelligence</span>
                            </h1>
                            <p className="text-base sm:text-lg mb-8 leading-relaxed" style={{ color: `${colors.primaryDark}CC` }}>
                                RESTful and GraphQL APIs delivering verified environmental data – land use, soil carbon, climate risk, MRV status, and ESG metrics. Integrate African‑grounded intelligence into your products in minutes.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <button
                                    onClick={() => navigate("/request-demo")}
                                    className="group px-8 py-3 rounded-xl font-bold transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                                    style={{ background: `linear-gradient(135deg, ${colors.goldAccent}, #D4A82E)`, color: "#fff" }}
                                >
                                    Request API Access <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
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
                                    src={apiImage}
                                    alt="MAvHU Climate APIs"
                                    className="relative rounded-2xl shadow-2xl w-full h-auto object-cover border border-white/30"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=API+Illustration";
                                    }}
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Overview */}
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
                            What are <span className="gradient-text">Climate APIs?</span>
                        </h2>
                        <p className="text-lg max-w-3xl mx-auto" style={{ color: `${colors.primaryDark}AA` }}>
                            Programmatic access to MAvHU's verified environmental intelligence – designed for developers, data scientists, and enterprises building climate‑aware applications.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <motion.div variants={cardVariants} className="bg-white rounded-2xl p-7 border border-[#DCE7E8] hover-lift text-center">
                            <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: `${colors.secondaryBlue}12`, border: `1px solid ${colors.secondaryBlue}25` }}>
                                <Code className="w-7 h-7" style={{ color: colors.secondaryBlue }} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Developer‑First</h3>
                            <p className="text-sm leading-relaxed" style={{ color: `${colors.primaryDark}80` }}>
                                Clean REST endpoints, GraphQL support, interactive documentation, and SDKs for Python, Node, and Java.
                            </p>
                        </motion.div>

                        <motion.div variants={cardVariants} className="bg-white rounded-2xl p-7 border border-[#DCE7E8] hover-lift text-center">
                            <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: `${colors.goldAccent}12`, border: `1px solid ${colors.goldAccent}25` }}>
                                <Cloud className="w-7 h-7" style={{ color: colors.goldAccent }} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Scalable Infrastructure</h3>
                            <p className="text-sm leading-relaxed" style={{ color: `${colors.primaryDark}80` }}>
                                Serverless architecture that auto‑scales from thousands to millions of requests per day.
                            </p>
                        </motion.div>

                        <motion.div variants={cardVariants} className="bg-white rounded-2xl p-7 border border-[#DCE7E8] hover-lift text-center">
                            <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: `${colors.secondaryBlue}12`, border: `1px solid ${colors.secondaryBlue}25` }}>
                                <Shield className="w-7 h-7" style={{ color: colors.secondaryBlue }} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Enterprise Ready</h3>
                            <p className="text-sm leading-relaxed" style={{ color: `${colors.primaryDark}80` }}>
                                SOC2‑type controls, SSO, audit logs, and custom SLAs for regulated industries.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

   

            {/* Process Steps */}
            <motion.section
                className="py-20 relative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeInUp}
            >
                <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${colors.secondaryBlue}04, ${colors.goldAccent}04)` }} />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Get Started in <span className="gradient-text">4 Steps</span>
                        </h2>
                        <p className="text-lg" style={{ color: `${colors.primaryDark}AA` }}>
                            From signup to first API call – built for speed.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {processSteps.map((step, idx) => (
                            <motion.div key={idx} variants={scaleIn} className="relative bg-white rounded-2xl p-6 border border-[#DCE7E8] text-center">
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md" style={{ backgroundColor: colors.goldAccent }}>
                                    {step.step}
                                </div>
                                <div className="mt-6 mb-4 flex justify-center">
                                    <div className="p-2 rounded-full" style={{ backgroundColor: `${colors.secondaryBlue}10` }}>
                                        {step.icon}
                                    </div>
                                </div>
                                <h3 className="font-bold text-base mb-2">{step.title}</h3>
                                <p className="text-xs leading-relaxed" style={{ color: `${colors.primaryDark}80` }}>{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Benefits */}
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
                            Why Build on <span className="gradient-text">MAvHU APIs?</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((benefit, idx) => (
                            <motion.div key={idx} variants={cardVariants} className="bg-white rounded-2xl p-6 border border-[#DCE7E8] text-center hover-lift">
                                <div className="flex justify-center mb-4">
                                    <div className="p-3 rounded-xl" style={{ backgroundColor: `${colors.goldAccent}12` }}>
                                        <span style={{ color: colors.goldAccent }}>{benefit.icon}</span>
                                    </div>
                                </div>
                                <div className="text-3xl font-bold gradient-text mb-2">{benefit.stat}</div>
                                <h3 className="font-bold text-base mb-2">{benefit.title}</h3>
                                <p className="text-xs leading-relaxed" style={{ color: `${colors.primaryDark}70` }}>{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Use Cases */}
            <motion.section
                className="py-20 relative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeInUp}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl border border-[#DCE7E8] p-8 sm:p-12 shadow-lg">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold mb-4">
                                Who Uses <span className="gradient-text">Our APIs?</span>
                            </h2>
                        </div>
                        <div className="grid md:grid-cols-4 gap-8">
                            {useCases.map((uc, idx) => (
                                <div key={idx} className="text-center">
                                    <div className="flex justify-center mb-3">
                                        <div className="p-3 rounded-xl" style={{ backgroundColor: `${colors.secondaryBlue}12` }}>
                                            <span style={{ color: colors.secondaryBlue }}>{uc.icon}</span>
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-base mb-2">{uc.title}</h3>
                                    <p className="text-sm leading-relaxed" style={{ color: `${colors.primaryDark}80` }}>{uc.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Final CTA */}
            <motion.section
                className="py-24 relative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeInUp}
            >
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div
                        className="rounded-3xl p-10 sm:p-14 shadow-2xl"
                        style={{ background: `linear-gradient(135deg, ${colors.secondaryBlue}08, ${colors.goldAccent}08)`, border: `1px solid ${colors.softGrey}` }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Ready to integrate <br />
                            <span className="gradient-text">climate intelligence?</span>
                        </h2>
                        <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: `${colors.primaryDark}BB` }}>
                            Get API credentials, explore the docs, and start building climate‑aware applications today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => navigate("/request-demo")}
                                className="group px-8 py-3 rounded-xl font-bold transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                                style={{ background: `linear-gradient(135deg, ${colors.goldAccent}, #D4A82E)`, color: "#fff" }}
                            >
                                Request API Access <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                            </button>
                            <button
                                onClick={() => navigate("/contact")}
                                className="px-8 py-3 rounded-xl font-semibold border-2 transition-all hover:bg-white/50"
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

export default ApiPage;