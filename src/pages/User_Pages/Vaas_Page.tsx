import React from "react";
import { motion } from "framer-motion";
import {
    CheckCircle,
    Shield,
    Eye,
    FileCheck,
    BarChart3,
    Map,
    Users,
    ArrowRight,
    Zap,
    Layers,
    Cloud,
    Activity,
    TrendingUp,
    Lock,
    ClipboardCheck,
    Microscope,
} from "lucide-react";
import Footer from "../../components/Footer";
import Navbar from "../../components/navbar";
import { useNavigate } from "react-router-dom";
import vaasImage from "../../assets/vaas.png"; // ensure this image exists in your assets folder

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

const VaasPage: React.FC = () => {
    const navigate = useNavigate();

    // ─── Service Data ─────────────────────────────────────────────────────────
    const features = [
        {
            title: "End-to-End MRV Workflows",
            description:
                "From baseline establishment to periodic monitoring and final verification – our platform manages the entire MRV lifecycle.",
            icon: <Layers className="w-6 h-6" />,
            color: colors.secondaryBlue,
        },
        {
            title: "Field Verification Networks",
            description:
                "On-the-ground validation across 15+ African countries by trained local teams, ensuring ground-truth accuracy.",
            icon: <Users className="w-6 h-6" />,
            color: colors.secondaryBlue,
        },
        {
            title: "Audit‑Ready Data Trails",
            description:
                "Every data point is timestamped, source-tagged, and immutable – ready for carbon registries and third-party audits.",
            icon: <ClipboardCheck className="w-6 h-6" />,
            color: colors.goldAccent,
        },
        {
            title: "Automated Cross‑Validation",
            description:
                "Machine learning algorithms cross-check satellite, drone, and field data to flag inconsistencies and ensure integrity.",
            icon: <Zap className="w-6 h-6" />,
            color: "#2E7D6B",
        },
        {
            title: "Compliance Ready",
            description:
                "Aligned with Verra VCS, Gold Standard, UNFCCC MRV, and ISO 14064 standards – reducing your verification risk.",
            icon: <Shield className="w-6 h-6" />,
            color: colors.secondaryBlue,
        },
        {
            title: "Real‑time Dashboard",
            description:
                "Monitor verification progress, request field audits, and download verification reports from a single interface.",
            icon: <BarChart3 className="w-6 h-6" />,
            color: colors.goldAccent,
        },
    ];

    const processSteps = [
        {
            step: "01",
            title: "Project Onboarding",
            description:
                "We integrate your project boundaries, methodology, and monitoring plan into our MRV engine.",
            icon: <CheckCircle className="w-5 h-5" />,
        },
        {
            step: "02",
            title: "Remote & Field Data Capture",
            description:
                "Satellite imagery, drone surveys, and field teams collect high-resolution environmental data.",
            icon: <Cloud className="w-5 h-5" />,
        },
        {
            step: "03",
            title: "AI Cross‑Verification",
            description:
                "Our algorithms reconcile multi‑source data, flag anomalies, and prepare verification packages.",
            icon: <Microscope className="w-5 h-5" />,
        },
        {
            step: "04",
            title: "Audit Trail Generation",
            description:
                "An immutable, exportable verification report is created for registry submission or investor review.",
            icon: <FileCheck className="w-5 h-5" />,
        },
    ];

    const benefits = [
        {
            title: "Reduce Verification Costs",
            description: "Automated workflows cut field verification expenses by up to 40%.",
            stat: "-40%",
            icon: <TrendingUp className="w-5 h-5" />,
        },
        {
            title: "Faster Carbon Credit Issuance",
            description: "Accelerate registry approval with pre‑verified, auditable data packages.",
            stat: "3x",
            icon: <Zap className="w-5 h-5" />,
        },
        {
            title: "Enhanced Credibility",
            description: "Independent, transparent verification builds trust with buyers and financiers.",
            stat: "98%",
            icon: <Eye className="w-5 h-5" />,
        },
        {
            title: "Risk Mitigation",
            description: "Early detection of data gaps or non‑compliance before registry submission.",
            stat: "100%",
            icon: <Shield className="w-5 h-5" />,
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
        hoverBg: "hover:bg-[#F0F5F5]",
    };

    return (
        <div
            className="min-h-screen overflow-x-hidden"
            style={{ backgroundColor: colors.lightBackground, color: colors.primaryDark }}
        >
            {/* ── Global Font & Scrollbar (same as main) ───────────────────────── */}
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

            {/* Navbar */}
            <Navbar />

            {/* ─── Hero Section with vaas.png ───────────────────────────────────── */}
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
                            <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider mb-6"
                                style={{ backgroundColor: `${colors.goldAccent}12`, border: `1px solid ${colors.goldAccent}30`, color: colors.goldAccent }}>
                                Verification‑as‑a‑Service
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                                Trusted MRV for <br />
                                <span className="gradient-text">African Carbon Projects</span>
                            </h1>
                            <p className="text-base sm:text-lg mb-8 leading-relaxed" style={{ color: `${colors.primaryDark}CC` }}>
                                End‑to‑end verification infrastructure that combines remote sensing, field validation,
                                and AI‑powered cross‑checks – designed for carbon registries, project developers, and climate finance.
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
                                    src={vaasImage}
                                    alt="MAvHU Verification-as-a-Service"
                                    className="relative rounded-2xl shadow-2xl w-full h-auto object-cover border border-white/30"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ─── What is VaaS? (Overview) ──────────────────────────────────────── */}
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
                            What is <span className="gradient-text">Verification‑as‑a‑Service?</span>
                        </h2>
                        <p className="text-lg max-w-3xl mx-auto" style={{ color: `${colors.primaryDark}AA` }}>
                            A complete, outsourced MRV solution that delivers audit‑ready verification packages for carbon projects,
                            enabling faster credit issuance and lower transaction costs.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <motion.div
                            variants={cardVariants}
                            className="bg-white rounded-2xl p-7 border border-[#DCE7E8] hover-lift text-center"
                        >
                            <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5"
                                style={{ backgroundColor: `${colors.secondaryBlue}12`, border: `1px solid ${colors.secondaryBlue}25` }}>
                                <Shield className="w-7 h-7" style={{ color: colors.secondaryBlue }} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Independent & Trusted</h3>
                            <p className="text-sm leading-relaxed" style={{ color: `${colors.primaryDark}80` }}>
                                Third‑party verification that meets the highest standards of carbon registries and climate finance institutions.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={cardVariants}
                            className="bg-white rounded-2xl p-7 border border-[#DCE7E8] hover-lift text-center"
                        >
                            <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5"
                                style={{ backgroundColor: `${colors.goldAccent}12`, border: `1px solid ${colors.goldAccent}25` }}>
                                <Zap className="w-7 h-7" style={{ color: colors.goldAccent }} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Automated & Scalable</h3>
                            <p className="text-sm leading-relaxed" style={{ color: `${colors.primaryDark}80` }}>
                                From a single pilot to thousands of hectares – our MRV engine scales without losing data integrity.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={cardVariants}
                            className="bg-white rounded-2xl p-7 border border-[#DCE7E8] hover-lift text-center"
                        >
                            <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5"
                                style={{ backgroundColor: `${colors.secondaryBlue}12`, border: `1px solid ${colors.secondaryBlue}25` }}>
                                <Lock className="w-7 h-7" style={{ color: colors.secondaryBlue }} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Audit‑Ready Outputs</h3>
                            <p className="text-sm leading-relaxed" style={{ color: `${colors.primaryDark}80` }}>
                                Every verification report includes full data provenance, methodology alignment, and quality assurance stamps.
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
                            Everything you need for reliable, verifiable climate action.
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
                            Why Choose <span className="gradient-text">VaaS?</span>
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
                                Who Benefits from <span className="gradient-text">VaaS?</span>
                            </h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div>
                                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.secondaryBlue }}></span>
                                    Carbon Project Developers
                                </h3>
                                <p className="text-sm leading-relaxed" style={{ color: `${colors.primaryDark}80` }}>
                                    Reduce verification delays, cut costs, and increase credit issuance speed.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.goldAccent }}></span>
                                    Registries & Standards
                                </h3>
                                <p className="text-sm leading-relaxed" style={{ color: `${colors.primaryDark}80` }}>
                                    Receive pre‑structured, audit‑ready data packages aligned with your methodology.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#2E7D6B" }}></span>
                                    Climate Finance Providers
                                </h3>
                                <p className="text-sm leading-relaxed" style={{ color: `${colors.primaryDark}80` }}>
                                    Gain confidence in project baselines and ongoing performance through independent MRV.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Footer */}
            <Footer isDarkMode={false} themeClasses={themeClasses} />
        </div>
    );
};

export default VaasPage;