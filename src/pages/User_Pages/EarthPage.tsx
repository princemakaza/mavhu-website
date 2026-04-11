import React from "react";
import { motion } from "framer-motion";
import {
    Users,
    Microscope,
    Map,
    Leaf,
    CheckCircle,
    Globe,
    Zap,
    ArrowRight,
} from "lucide-react";
import Footer from "../../components/Footer";
import Navbar from "../../components/navbar";
import { useNavigate } from "react-router-dom";
import earthImage from "../../assets/earth-image.png";

const colors = {
    primaryDark: "#123E56",
    secondaryBlue: "#1F5C73",
    goldAccent: "#B89A2F",
    lightBackground: "#F4FAFA",
    softGrey: "#DCE7E8",
    white: "#FFFFFF",
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
const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};
const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, type: "spring", stiffness: 120 } },
};

const EarthPage: React.FC = () => {
    const navigate = useNavigate();



    const processSteps = [
        {
            step: "01",
            title: "Site Selection",
            description: "High‑risk areas prioritised using satellite anomaly detection and stakeholder input.",
            icon: <Globe className="w-6 h-6" />,
        },
        {
            step: "02",
            title: "Field Campaign",
            description: "Trained teams collect soil, vegetation, and land‑use data using mobile tools.",
            icon: <Users className="w-6 h-6" />,
        },
        {
            step: "03",
            title: "Lab Analysis",
            description: "Samples analysed in ISO‑accredited labs for carbon, nutrients, and contaminants.",
            icon: <Microscope className="w-6 h-6" />,
        },
        {
            step: "04",
            title: "Data Integration",
            description: "Ground data merged with satellite layers to calibrate models and produce reports.",
            icon: <Zap className="w-6 h-6" />,
        },
    ];

    const capabilities = [
        {
            title: "Field Verification Teams",
            description: "Local experts across continent conducting on‑the‑ground validation of satellite data.",
            icon: <Users className="w-8 h-8" />,
            color: colors.secondaryBlue,
        },
        {
            title: "Soil Sampling & Analysis",
            description: "Structured soil carbon measurement using ISO/Verra protocols, with full chain‑of‑custody.",
            icon: <Microscope className="w-8 h-8" />,
            color: colors.goldAccent,
        },
        {
            title: "Vegetation Ground Truthing",
            description: "Biomass, species composition, and land‑use verification for carbon and biodiversity projects.",
            icon: <Leaf className="w-8 h-8" />,
            color: "#2E7D6B",
        },
        {
            title: "Community & Local Knowledge",
            description: "Integration of farmer and indigenous knowledge into formal data collection and compliance.",
            icon: <Map className="w-8 h-8" />,
            color: colors.secondaryBlue,
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

            {/* Hero – compact */}
            <section className="relative pt-20 pb-12 sm:pt-24 sm:pb-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#F4FAFA] via-white to-[#DCE7E8]/20" />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <span
                            className="inline-block text-xs tracking-[0.2em] uppercase font-semibold mb-3 px-3 py-1 rounded-full"
                            style={{ backgroundColor: `${colors.goldAccent}12`, border: `1px solid ${colors.goldAccent}30`, color: colors.goldAccent }}
                        >
                            MAvHU Earth
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                            Ground Truth & <br />
                            <span className="gradient-text">Field Compliance</span>
                        </h1>
                        <p className="text-base sm:text-lg max-w-2xl mx-auto mb-6 leading-relaxed" style={{ color: `${colors.primaryDark}CC` }}>
                            Soil sampling, vegetation surveys, and community‑led validation that turns satellite data into certified ground truth.
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
                                onClick={() => document.getElementById("process")?.scrollIntoView({ behavior: "smooth" })}
                                className="px-6 py-2.5 rounded-xl font-semibold border-2 transition-all hover:bg-white/50"
                                style={{ borderColor: colors.softGrey, color: colors.primaryDark }}
                            >
                                See How It Works
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
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#1F5C73]/20 to-[#B89A2F]/20 rounded-2xl blur-xl" />
                            <img
                                src={earthImage}
                                alt="MAvHU Earth field validation"
                                className="relative rounded-xl shadow-xl w-full h-auto object-cover border border-white/30"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>


            {/* What is MAvHU Earth? – image left, text right, reduced padding */}
            <motion.section
                className="py-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeInUp}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        <motion.div variants={fadeInLeft} className="order-2 md:order-1">
                            <h2 className="text-3xl font-bold mb-3">
                                What is <span className="gradient-text">MAvHU Earth?</span>
                            </h2>
                            <p className="text-base leading-relaxed mb-4" style={{ color: `${colors.primaryDark}CC` }}>
                                The essential ground‑layer of our intelligence platform – providing field‑verified data that anchors satellite observations in African realities.
                            </p>
                            <h3 className="text-xl font-bold mb-2" style={{ color: colors.goldAccent }}>
                                From Pixels to People
                            </h3>
                            <p className="text-base leading-relaxed mb-4" style={{ color: `${colors.primaryDark}CC` }}>
                                Satellites see the broad picture, but only ground teams can confirm what is actually happening. MAvHU Earth deploys trained field verifiers, soil scientists, and community liaisons to collect primary data – ensuring every remote sensing insight is backed by physical evidence.
                            </p>
                            <ul className="space-y-2">
                                {[
                                    "Soil carbon samples analysed in ISO‑accredited labs",
                                    "Community feedback integrated into compliance workflows",
                                    "Data used for Verra VCS, Gold Standard, and UNFCCC",
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm" style={{ color: `${colors.primaryDark}BB` }}>
                                        <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: colors.goldAccent }} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div variants={fadeInRight} className="order-1 md:order-2 relative">
                            <div className="relative bg-white rounded-xl p-5 border border-[#DCE7E8] shadow-md">
                                <div className="flex items-center gap-2 mb-3">
                                    <Microscope className="w-5 h-5" style={{ color: colors.goldAccent }} />
                                    <h4 className="font-bold text-base">Key Measurements</h4>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    {[
                                        "Soil organic carbon",
                                        "Bulk density",
                                        "Above‑ground biomass",
                                        "Land use / land cover",
                                        "Tree species inventory",
                                        "Community consent",
                                    ].map((out, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-xs">
                                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.goldAccent }} />
                                            <span>{out}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Process – Vertical Timeline, tighter spacing */}
            <motion.section
                id="process"
                className="py-12 relative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeInUp}
            >
                <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${colors.secondaryBlue}04, ${colors.goldAccent}04)` }} />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold mb-2">
                            How <span className="gradient-text">It Works</span>
                        </h2>
                        <p className="text-base" style={{ color: `${colors.primaryDark}AA` }}>
                            From field to lab to platform – rigorous ground validation.
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
                                    <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gradient-to-b from-[#B89A2F] to-[#1F5C73] opacity-30" />
                                )}
                                <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md"
                                    style={{ backgroundColor: colors.goldAccent }}>
                                    {step.step}
                                </div>
                                <div className="flex-1 bg-white rounded-xl p-5 border border-[#DCE7E8] hover-lift">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="p-1.5 rounded-full" style={{ backgroundColor: `${colors.secondaryBlue}10` }}>
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

            {/* Capabilities – 2x2 cards, reduced padding */}
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
                            The people, protocols, and tools behind MAvHU Earth.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {capabilities.map((cap, idx) => (
                            <motion.div
                                key={idx}
                                variants={cardVariants}
                                className="bg-white rounded-xl p-6 border border-[#DCE7E8] hover-lift group"
                            >
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform"
                                    style={{ backgroundColor: `${cap.color}12`, border: `1px solid ${cap.color}20` }}
                                >
                                    <span style={{ color: cap.color }}>{cap.icon}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-2" style={{ color: colors.primaryDark }}>
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

            {/* Standards – compact */}
            <motion.section
                className="py-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeInUp}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl border border-[#DCE7E8] p-6 shadow-md">
                        <div className="text-center mb-5">
                            <h3 className="text-xl font-bold mb-2">
                                Aligned with <span className="gradient-text">Global Standards</span>
                            </h3>
                            <p className="text-sm" style={{ color: `${colors.primaryDark}AA` }}>
                                Our field protocols meet leading carbon and sustainability frameworks.
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-2">
                            {[
                                "Verra VCS (VM0042, VM0017)",
                                "Gold Standard",
                                "IPCC Guidelines",
                                "ISO 14064-2",
                                "FAO SEPAL",
                                "World Bank TFI",
                            ].map((std, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 rounded-full text-xs font-medium border"
                                    style={{ backgroundColor: `${colors.goldAccent}08`, borderColor: colors.softGrey, color: colors.primaryDark }}
                                >
                                    {std}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* CTA – tighter */}
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
                        style={{ background: `linear-gradient(135deg, ${colors.secondaryBlue}08, ${colors.goldAccent}08)`, border: `1px solid ${colors.softGrey}` }}
                    >
                        <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                            Need trusted <br />
                            <span className="gradient-text">ground data?</span>
                        </h2>
                        <p className="text-base mb-6 max-w-xl mx-auto" style={{ color: `${colors.primaryDark}BB` }}>
                            Let our field teams validate your project area and deliver audit‑ready reports.
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

export default EarthPage;