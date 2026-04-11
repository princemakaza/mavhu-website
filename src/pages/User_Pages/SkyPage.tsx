import React from "react";
import { motion } from "framer-motion";
import {
    Satellite,
    Scan,
    CloudRain,
    Wifi,
    BarChart3,
    Globe,
    Zap,
    Shield,
    ArrowRight,
    CheckCircle,
} from "lucide-react";
import Footer from "../../components/Footer";
import Navbar from "../../components/navbar";
import { useNavigate } from "react-router-dom";
import skyHeroImage from "../../assets/sky-image.png";

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
const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};
const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, type: "spring", stiffness: 120 } },
};

const SkyPage: React.FC = () => {
    const navigate = useNavigate();

    const capabilities = [
        {
            title: "Multi‑Spectral Satellite Imagery",
            description: "High‑resolution optical and radar imagery for land cover, vegetation health, and change detection – updated every 3–5 days.",
            icon: <Satellite className="w-6 h-6" />,
            color: colors.secondaryBlue,
        },
        {
            title: "Drone‑Based Mapping",
            description: "On‑demand sub‑metric resolution surveys for precision agriculture, forestry, and site‑specific monitoring.",
            icon: <Scan className="w-6 h-6" />,
            color: colors.goldAccent,
        },
        {
            title: "Weather & Climate Data",
            description: "Historical and real‑time meteorological data from satellite and ground stations – rainfall, temperature, evapotranspiration.",
            icon: <CloudRain className="w-6 h-6" />,
            color: "#2E7D6B",
        },
        {
            title: "IoT & Aerial Sensor Networks",
            description: "Live atmospheric, soil moisture, and air quality data from custom sensor grids and airborne platforms.",
            icon: <Wifi className="w-6 h-6" />,
            color: colors.secondaryBlue,
        },
    ];

    const processSteps = [
        {
            step: "01",
            title: "Data Acquisition",
            description: "Scheduled satellite passes, drone flights, and sensor feeds collect raw environmental data.",
            icon: <Globe className="w-6 h-6" />,
        },
        {
            step: "02",
            title: "Radiometric Calibration",
            description: "Raw signals are corrected for atmospheric interference, sensor noise, and geometric distortions.",
            icon: <BarChart3 className="w-6 h-6" />,
        },
        {
            step: "03",
            title: "Processing & Fusion",
            description: "Multi‑source data is harmonised, mosaicked, and merged into analysis‑ready formats.",
            icon: <Zap className="w-6 h-6" />,
        },
        {
            step: "04",
            title: "Intelligent Delivery",
            description: "Processed layers are pushed to MAvHU’s platform, APIs, and dashboards for immediate use.",
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
                            style={{ backgroundColor: `${colors.goldAccent}12`, border: `1px solid ${colors.goldAccent}30`, color: colors.goldAccent }}
                        >
                            MAvHU Sky
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                            Geospatial & <br />
                            <span className="gradient-text">Satellite Intelligence</span>
                        </h1>
                        <p className="text-base sm:text-lg max-w-2xl mx-auto mb-6 leading-relaxed" style={{ color: `${colors.primaryDark}CC` }}>
                            MAvHU Sky captures the full picture of Africa’s land and climate from above – fusing satellite, drone, and aerial sensor data into actionable intelligence.
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
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#1F5C73]/20 to-[#B89A2F]/20 rounded-2xl blur-xl" />
                            <img
                                src={skyHeroImage}
                                alt="MAvHU Sky satellite and drone imagery"
                                className="relative rounded-xl shadow-xl w-full h-auto object-cover border border-white/30"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* What is MAvHU Sky? – two-column overview */}
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
                                What is <span className="gradient-text">MAvHU Sky?</span>
                            </h2>
                            <p className="text-base leading-relaxed mb-4" style={{ color: `${colors.primaryDark}CC` }}>
                                A unified data collection layer that aggregates, processes, and delivers high‑resolution environmental intelligence from Africa’s skies – enabling better decisions on the ground.
                            </p>
                            <h3 className="text-xl font-bold mb-2" style={{ color: colors.secondaryBlue }}>
                                From Space to Field
                            </h3>
                            <p className="text-base leading-relaxed mb-4" style={{ color: `${colors.primaryDark}CC` }}>
                                MAvHU Sky combines the widest possible view (satellites) with the sharpest detail (drones) and continuous live feeds (sensor networks). This multi‑layer approach ensures no critical environmental change goes unnoticed.
                            </p>
                            <ul className="space-y-2">
                                {[
                                    "Satellite revisits every 2–5 days for dynamic monitoring",
                                    "Drone flights on demand for sub‑decimeter precision",
                                    "Weather data integration for climate trend analysis",
                                    "All data harmonised into a single geospatial reference system",
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm" style={{ color: `${colors.primaryDark}BB` }}>
                                        <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: colors.secondaryBlue }} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div variants={fadeInRight} className="relative">
                            <div className="relative bg-white rounded-xl p-5 border border-[#DCE7E8] shadow-md">
                                <div className="flex items-center gap-2 mb-3">
                                    <Satellite className="w-5 h-5" style={{ color: colors.goldAccent }} />
                                    <h4 className="font-bold text-base">Key Outputs</h4>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    {[
                                        "Land cover maps",
                                        "Vegetation indices (NDVI)",
                                        "Soil moisture grids",
                                        "Surface temperature",
                                        "Deforestation alerts",
                                        "Biomass estimates",
                                    ].map((out, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-xs">
                                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.secondaryBlue }} />
                                            <span>{out}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Capabilities – 4 cards (unchanged but compact) */}
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
                            MAvHU Sky’s multi‑source intelligence engine.
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

            {/* Process – Vertical Timeline (like EarthPage) */}
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
                            From raw signal to analysis‑ready intelligence.
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

            {/* Data Sources – tag cloud (compact) */}
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
                            Integrated <span className="gradient-text">Data Sources</span>
                        </h3>
                        <div className="flex flex-wrap justify-center gap-2">
                            {[
                                "Sentinel-1 / Sentinel-2",
                                "Landsat 8 & 9",
                                "MODIS",
                                "Planet Labs",
                                "Commercial Drones (DJI)",
                                "Weather Stations",
                                "IoT Sensor Grids",
                                "Aerial LiDAR",
                            ].map((src, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 rounded-full text-xs font-medium border"
                                    style={{ backgroundColor: `${colors.secondaryBlue}08`, borderColor: colors.softGrey, color: colors.primaryDark }}
                                >
                                    {src}
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
                        style={{ background: `linear-gradient(135deg, ${colors.secondaryBlue}08, ${colors.goldAccent}08)`, border: `1px solid ${colors.softGrey}` }}
                    >
                        <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                            Ready to see from <br />
                            <span className="gradient-text">above?</span>
                        </h2>
                        <p className="text-base mb-6 max-w-xl mx-auto" style={{ color: `${colors.primaryDark}BB` }}>
                            Integrate MAvHU Sky’s geospatial intelligence into your projects, dashboards, or APIs.
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

export default SkyPage;