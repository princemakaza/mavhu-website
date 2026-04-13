import React from "react";
import { motion } from "framer-motion";
import {
    BarChart3,
    Eye,
    Shield,
    ArrowRight,
    CheckCircle,
    LayoutDashboard,
    TrendingUp,
    Users,
    Zap,
    FileCheck,
    Cloud,
    Bell,
    Download,
    Lock,
    Activity,
    Database,
    Globe,
} from "lucide-react";
import Footer from "../../components/Footer";
import Navbar from "../../components/navbar";
import { useNavigate } from "react-router-dom";
import dashboardImage from "../../assets/dashboard.png"; // ensure this image exists

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

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();

    // ─── Feature data ─────────────────────────────────────────────────────────
    const features = [
        {
            title: "Real‑time ESG Metrics",
            description: "Live dashboards showing carbon emissions, water usage, land-use change, and other sustainability KPIs.",
            icon: <Activity className="w-6 h-6" />,
            color: colors.secondaryBlue,
        },
        {
            title: "Automated Reporting",
            description: "Generate audit‑ready reports aligned with GRI, SASB, TCFD, and CSRD in one click.",
            icon: <FileCheck className="w-6 h-6" />,
            color: colors.goldAccent,
        },
        {
            title: "Supply Chain Intelligence",
            description: "Map and monitor environmental risk across tier‑1 to tier‑n suppliers with geospatial layers.",
            icon: <Globe className="w-6 h-6" />,
            color: "#2E7D6B",
        },
        {
            title: "Custom Alerts & Triggers",
            description: "Set thresholds for deforestation, emissions exceedances, or compliance deadlines – get instant notifications.",
            icon: <Bell className="w-6 h-6" />,
            color: colors.secondaryBlue,
        },
        {
            title: "Multi‑jurisdiction Support",
            description: "Handle data from multiple African countries with localised methodologies and regulatory mappings.",
            icon: <Database className="w-6 h-6" />,
            color: colors.secondaryBlue,
        },
        {
            title: "API & BI Integration",
            description: "Embed dashboards into your existing BI tools (Power BI, Tableau) or consume raw data via REST API.",
            icon: <Cloud className="w-6 h-6" />,
            color: colors.goldAccent,
        },
    ];



    // ─── Benefits with stats ──────────────────────────────────────────────────
    const benefits = [
        {
            title: "Faster Disclosure",
            description: "Reduce ESG reporting preparation time by up to 70%.",
            stat: "-70%",
            icon: <Zap className="w-5 h-5" />,
        },
        {
            title: "Data Confidence",
            description: "Audit trails and independent verification increase stakeholder trust.",
            stat: "100%",
            icon: <Shield className="w-5 h-5" />,
        },
        {
            title: "Risk Reduction",
            description: "Early detection of supply chain or regulatory risks.",
            stat: "40%",
            icon: <TrendingUp className="w-5 h-5" />,
        },
        {
            title: "Cost Efficiency",
            description: "Replace fragmented manual reporting with automated SaaS.",
            stat: "3x",
            icon: <BarChart3 className="w-5 h-5" />,
        },
    ];

    // ─── Target audience / use cases ─────────────────────────────────────────
    const useCases = [
        {
            title: "Corporate ESG Teams",
            description: "Track emissions, water, and land footprint across operations and supply chain.",
            icon: <Users className="w-6 h-6" />,
        },
        {
            title: "Financial Institutions",
            description: "Monitor portfolio‑level climate risk and financed emissions.",
            icon: <TrendingUp className="w-6 h-6" />,
        },
        {
            title: "Government Agencies",
            description: "NDC tracking, national GHG inventories, and environmental compliance.",
            icon: <Globe className="w-6 h-6" />,
        },
        {
            title: "Project Developers",
            description: "MRV dashboards for carbon projects and green bonds.",
            icon: <Activity className="w-6 h-6" />,
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

            {/* ─── Hero Section with dashboard.png ───────────────────────────────── */}
            <section className="relative pt-28 pb-20 sm:pt-32 sm:pb-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#F4FAFA] via-white to-[#DCE7E8]/30" />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left content */}
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
                                Data & Dashboard Solutions
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                                Enterprise ESG & <br />
                                <span className="gradient-text">Climate Intelligence</span>
                            </h1>
                            <p className="text-base sm:text-lg mb-8 leading-relaxed" style={{ color: `${colors.primaryDark}CC` }}>
                                One unified platform to monitor, report, and act on environmental data.
                                Real‑time dashboards, automated reporting, and seamless API integration –
                                built for African operations and global standards.
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
                                    onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
                                    className="px-8 py-3 rounded-xl font-semibold border-2 transition-all hover:bg-white/50"
                                    style={{ borderColor: colors.softGrey, color: colors.primaryDark }}
                                >
                                    Explore Features
                                </button>
                            </div>
                        </motion.div>

                        {/* Right image */}
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
                                    alt="MAvHU ESG Dashboard"
                                    className="relative rounded-2xl shadow-2xl w-full h-auto object-cover border border-white/30"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ─── What is Dashboard Solutions? (Overview) ────────────────────────── */}
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
                            What are <span className="gradient-text">Data & Dashboard Solutions?</span>
                        </h2>
                        <p className="text-lg max-w-3xl mx-auto" style={{ color: `${colors.primaryDark}AA` }}>
                            A modular SaaS platform that turns raw environmental data into actionable intelligence –
                            from boardroom dashboards to supply chain analytics and regulatory disclosures.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <motion.div
                            variants={cardVariants}
                            className="bg-white rounded-2xl p-7 border border-[#DCE7E8] hover-lift text-center"
                        >
                            <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5"
                                style={{ backgroundColor: `${colors.secondaryBlue}12`, border: `1px solid ${colors.secondaryBlue}25` }}>
                                <LayoutDashboard className="w-7 h-7" style={{ color: colors.secondaryBlue }} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Unified Data View</h3>
                            <p className="text-sm leading-relaxed" style={{ color: `${colors.primaryDark}80` }}>
                                Aggregate climate, land, emissions, and ESG data from dozens of sources into a single source of truth.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={cardVariants}
                            className="bg-white rounded-2xl p-7 border border-[#DCE7E8] hover-lift text-center"
                        >
                            <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5"
                                style={{ backgroundColor: `${colors.goldAccent}12`, border: `1px solid ${colors.goldAccent}25` }}>
                                <FileCheck className="w-7 h-7" style={{ color: colors.goldAccent }} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Automated Compliance</h3>
                            <p className="text-sm leading-relaxed" style={{ color: `${colors.primaryDark}80` }}>
                                Pre‑built templates for GRI, SASB, TCFD, CDP, and emerging African disclosure rules.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={cardVariants}
                            className="bg-white rounded-2xl p-7 border border-[#DCE7E8] hover-lift text-center"
                        >
                            <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5"
                                style={{ backgroundColor: `${colors.secondaryBlue}12`, border: `1px solid ${colors.secondaryBlue}25` }}>
                                <Cloud className="w-7 h-7" style={{ color: colors.secondaryBlue }} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">API‑First Architecture</h3>
                            <p className="text-sm leading-relaxed" style={{ color: `${colors.primaryDark}80` }}>
                                Seamlessly integrate with ERP, CRM, or custom apps – or use our white‑labelled dashboards.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* ─── Key Features Grid ────────────────────────────────────────────── */}
            <motion.section
                id="features"
                className="py-20 relative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeInUp}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Core <span className="gradient-text">Capabilities</span>
                        </h2>
                        <p className="text-lg" style={{ color: `${colors.primaryDark}AA` }}>
                            Everything you need to manage, report, and act on environmental performance.
                        </p>
                    </div>

                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-40px" }}
                    >
                        {features.map((feature, idx) => (
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
                </div>
            </motion.section>


            {/* ─── Benefits with Stats ──────────────────────────────────────────── */}
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
                            Why Choose <span className="gradient-text">Our Dashboards?</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((benefit, idx) => (
                            <motion.div
                                key={idx}
                                variants={cardVariants}
                                className="bg-white rounded-2xl p-6 border border-[#DCE7E8] text-center hover-lift"
                            >
                                <div className="flex justify-center mb-4">
                                    <div className="p-3 rounded-xl" style={{ backgroundColor: `${colors.goldAccent}12` }}>
                                        <span style={{ color: colors.goldAccent }}>{benefit.icon}</span>
                                    </div>
                                </div>
                                <div className="text-3xl font-bold gradient-text mb-2">{benefit.stat}</div>
                                <h3 className="font-bold text-base mb-2">{benefit.title}</h3>
                                <p className="text-xs leading-relaxed" style={{ color: `${colors.primaryDark}70` }}>
                                    {benefit.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* ─── Use Cases / Who It's For ──────────────────────────────────────── */}
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
                                Who Benefits from <span className="gradient-text">Dashboard Solutions?</span>
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
                                    <p className="text-sm leading-relaxed" style={{ color: `${colors.primaryDark}80` }}>
                                        {uc.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.section>


            <Footer isDarkMode={false} themeClasses={themeClasses} />
        </div>
    );
};

export default DashboardPage;