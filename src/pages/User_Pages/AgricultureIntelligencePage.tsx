import React from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
    ArrowRight,
    Satellite,
    Sprout,
    Cpu,
    Plug,
    FileCheck,
    Leaf,
    Landmark,
    TrendingUp,
    ChevronDown,
    Tractor,
    Users,
    Handshake,
    Warehouse,
    CheckCircle,
    MapPin,
    ShieldCheck,
    Globe,
    UserCheck,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import Footer from "../../components/Footer";
import Navbar from "../../components/navbar";
import { useNavigate } from "react-router-dom";
import heroImage from "../../assets/earth-image.png";

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

const AgricultureIntelligencePage: React.FC = () => {
    const navigate = useNavigate();
    const [openApi, setOpenApi] = React.useState<string | null>(null);

    // ─── One integrated architecture ──────────────────────────────────────────
    const architecture = [
        {
            name: "Sky",
            description: "Satellite Earth observation, with UAV data for validation.",
            icon: <Satellite className="w-6 h-6" />,
            color: colors.secondaryBlue,
        },
        {
            name: "Earth",
            description: "Ground truthing and Bayesian models.",
            icon: <Sprout className="w-6 h-6" />,
            color: green,
        },
        {
            name: "AI",
            description: "Automated MRV, predictive systems and automated workflows.",
            icon: <Cpu className="w-6 h-6" />,
            color: colors.goldAccent,
        },
        {
            name: "API",
            description: "Verified data delivered into your systems.",
            icon: <Plug className="w-6 h-6" />,
            color: colors.primaryDark,
        },
    ];

    // ─── Four routes to market ────────────────────────────────────────────────
    const routes = [
        {
            title: "Compliance",
            description: "EUDR per-shipment due diligence evidence, Scope 3 and supply chain emissions, and ESG reporting.",
            icon: <FileCheck className="w-6 h-6" />,
            color: colors.secondaryBlue,
        },
        {
            title: "Carbon markets",
            description: "Project-grade MRV to design, verify and monitor credits.",
            icon: <Leaf className="w-6 h-6" />,
            color: green,
        },
        {
            title: "Credit",
            description: "Field-level evidence lenders can underwrite, including climate-smart and sustainability-linked finance.",
            icon: <Landmark className="w-6 h-6" />,
            color: colors.goldAccent,
        },
        {
            title: "Investment",
            description: "Auditable ESG and impact data for investor reporting.",
            icon: <TrendingUp className="w-6 h-6" />,
            color: colors.primaryDark,
        },
    ];

    // ─── 13 production APIs, grouped E / S / G ────────────────────────────────
    const apiGroups = [
        {
            key: "E",
            label: "Environmental",
            color: green,
            apis: [
                { name: "Soil health and carbon quality", detail: "Soil organic carbon, nutrient status and soil health indicators per field, validated against soil sampling." },
                { name: "Crop yield forecast and risk", detail: "In-season yield estimates and production risk per block or plot, from satellite vegetation indices, weather and field observations." },
                { name: "Water stress index", detail: "Crop water stress and irrigation need, from evapotranspiration, rainfall and soil moisture signals." },
                { name: "GHG emissions", detail: "Farm and supply chain emissions across Scope 1, 2 and 3, under the GHG Protocol." },
                { name: "Biodiversity and land use integrity", detail: "Land-cover change, deforestation checks against the EUDR cut-off of 31 December 2020, and habitat indicators." },
                { name: "Energy consumption and renewables", detail: "Energy use on the farm and in processing, and the share drawn from renewable sources." },
                { name: "Waste management", detail: "Crop residue, packaging and processing waste, and how each stream is handled." },
            ],
        },
        {
            key: "S",
            label: "Social",
            color: colors.secondaryBlue,
            apis: [
                { name: "Workforce and diversity", detail: "Workforce composition, gender and youth participation, and employment terms across permanent and seasonal labour." },
                { name: "Health and safety", detail: "Incident records, safety training and agrochemical handling practices." },
                { name: "Community engagement", detail: "Grievance mechanisms, community programmes and smallholder participation in the supply chain." },
                { name: "Farm-level compliance training", detail: "Training records for growers and field teams on climate-smart practices and certification requirements." },
            ],
        },
        {
            key: "G",
            label: "Governance",
            color: colors.goldAccent,
            apis: [
                { name: "Governance and board metrics", detail: "Board composition, policies, anti-corruption and supply chain due diligence controls." },
            ],
        },
        {
            key: "ESG",
            label: "Composite",
            color: colors.primaryDark,
            apis: [
                { name: "Overall ESG score", detail: "One composite score across the environmental, social and governance APIs, traceable to its underlying data." },
            ],
        },
    ];

    // ─── Farms we work with ───────────────────────────────────────────────────
    const farmTypes = [
        {
            title: "Commercial farms and estates",
            icon: <Tractor className="w-6 h-6" />,
            color: colors.secondaryBlue,
            points: [
                "Estate-wide monitoring of every block, from soil to yield",
                "Scope 3 and ESG evidence that buyers and auditors accept",
                "Water, energy and input efficiency tracked per field",
                "Verified data to support climate-smart and sustainability-linked finance",
            ],
        },
        {
            title: "Smallholder farmers",
            icon: <Users className="w-6 h-6" />,
            color: green,
            points: [
                "Plot boundaries captured as GPS polygons, registered once",
                "Consent records and farm-level compliance training",
                "EUDR evidence that keeps smallholder produce in export supply chains",
                "A verified farm record that supports access to credit and insurance",
            ],
        },
        {
            title: "Out-grower and contract-farming programmes",
            icon: <Handshake className="w-6 h-6" />,
            color: colors.goldAccent,
            points: [
                "Grower onboarding with field-verified plot data",
                "Programme-wide traceability from farm to shipment",
                "Sample-based audits of grower registers for coverage and duplicates",
                "Evidence of regenerative and climate-smart practice adoption",
            ],
        },
        {
            title: "Cooperatives and aggregators",
            icon: <Warehouse className="w-6 h-6" />,
            color: colors.primaryDark,
            points: [
                "Member plots aggregated into one auditable dataset",
                "Due diligence evidence prepared for buyers and exporters",
                "Protection against the same plot being claimed twice",
                "Carbon project participation built on project-grade MRV",
            ],
        },
    ];

    const audiences = [
        "Agricultural estates and agribusinesses",
        "Commodity exporters",
        "Contract-farming programmes",
        "Carbon project developers",
        "Banks, insurers and investors",
    ];

    const reasons = [
        {
            title: "Ground-truth verification",
            description: "Satellite evidence checked in the field where it is uncertain or the risk is high.",
            icon: <MapPin className="w-6 h-6" />,
        },
        {
            title: "Automated MRV",
            description: "Documented, explainable methods, with every output routed to a human decision and audit-trailed.",
            icon: <UserCheck className="w-6 h-6" />,
        },
        {
            title: "ESG APIs",
            description: "Thirteen production APIs delivering one verified ESG dataset into your systems.",
            icon: <Plug className="w-6 h-6" />,
        },
        {
            title: "Hosted in Africa",
            description: "Data hosted on AWS Cape Town, with methods built around African environmental conditions and regulation.",
            icon: <Globe className="w-6 h-6" />,
        },
    ];


    const requestBriefing = () => navigate("/request-demo");

    return (
        <div
            className="min-h-screen overflow-x-hidden"
            style={{ backgroundColor: colors.lightBackground, color: colors.primaryDark }}
        >
            <Helmet>
                <title>Agriculture Intelligence – Field-Verified Data for Agriculture | MAvHU</title>
                <meta
                    name="description"
                    content="Field-verified intelligence for agricultural enterprises, supply chains and their financiers. From satellite to ground truth, MAvHU turns farm data into compliance, carbon market participation, credit and investment."
                />
                <link rel="canonical" href="https://mavhuafrica.com/services/agriculture-intelligence" />
                <meta property="og:title" content="MAvHU Agriculture Intelligence" />
                <meta property="og:description" content="Field-verified intelligence for agricultural enterprises, supply chains and their financiers. Measured. Verified. Sovereign." />
                <meta property="og:url" content="https://mavhuafrica.com/services/agriculture-intelligence" />
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
                                Agriculture Intelligence
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                                MAvHU <br />
                                <span className="gradient-text">Agriculture Intelligence</span>
                            </h1>
                            <p className="text-base sm:text-lg mb-4 leading-relaxed" style={{ color: `${colors.primaryDark}CC` }}>
                                Field-verified intelligence for agricultural enterprises, supply chains and their financiers.
                                From satellite to ground truth, MAvHU turns farm data into compliance, carbon market
                                participation, credit and investment, delivered as screens, APIs and automated workflows.
                            </p>
                            <p className="text-sm font-semibold tracking-widest uppercase mb-8" style={{ color: colors.secondaryBlue }}>
                                Measured. Verified. Sovereign.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <button
                                    onClick={requestBriefing}
                                    className="group px-8 py-3 rounded-xl font-bold transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                                    style={{ background: `linear-gradient(135deg, ${colors.goldAccent}, #D4A82E)`, color: "#fff" }}
                                >
                                    Request an Agri Intelligence briefing <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                                </button>
                                <button
                                    onClick={() => document.getElementById("routes")?.scrollIntoView({ behavior: "smooth" })}
                                    className="px-8 py-3 rounded-xl font-semibold border-2 transition-all hover:bg-white/50"
                                    style={{ borderColor: colors.softGrey, color: colors.primaryDark }}
                                >
                                    What Verified Data Unlocks
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
                                    src={heroImage}
                                    alt="MAvHU field team ground-truthing soil and vegetation on a farm"
                                    className="relative rounded-2xl shadow-2xl w-full h-auto object-cover border border-white/30"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ─── One integrated architecture ──────────────────────────────────── */}
            <motion.section
                className="py-20 relative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeInUp}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: colors.goldAccent }}>How it works</p>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            One integrated <span className="gradient-text">architecture</span>
                        </h2>
                    </div>

                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-40px" }}
                    >
                        {architecture.map((layer, idx) => (
                            <motion.div
                                key={layer.name}
                                variants={cardVariants}
                                className="relative bg-white rounded-2xl p-7 border border-[#DCE7E8] hover-lift text-center"
                            >
                                {idx < architecture.length - 1 && (
                                    <ArrowRight
                                        className="hidden lg:block absolute -right-5 top-1/2 -translate-y-1/2 w-4 h-4 z-10"
                                        style={{ color: colors.goldAccent }}
                                    />
                                )}
                                <div
                                    className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5"
                                    style={{ backgroundColor: `${layer.color}12`, border: `1px solid ${layer.color}25`, color: layer.color }}
                                >
                                    {layer.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{layer.name}</h3>
                                <p className="text-sm leading-relaxed" style={{ color: `${colors.primaryDark}80` }}>
                                    {layer.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* ─── What verified data unlocks ───────────────────────────────────── */}
            <motion.section
                id="routes"
                className="py-20 relative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeInUp}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: colors.goldAccent }}>Four routes to market</p>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            What verified data <span className="gradient-text">unlocks</span>
                        </h2>
                    </div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-40px" }}
                    >
                        {routes.map((route, idx) => (
                            <motion.div
                                key={route.title}
                                variants={cardVariants}
                                className="bg-white rounded-2xl p-7 border border-[#DCE7E8] hover-lift flex gap-5"
                                style={{ borderTop: `4px solid ${route.color}` }}
                            >
                                <div
                                    className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                                    style={{ backgroundColor: `${route.color}12`, border: `1px solid ${route.color}25`, color: route.color }}
                                >
                                    {route.icon}
                                </div>
                                <div>
                                    <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: `${colors.primaryDark}60` }}>
                                        Route {idx + 1}
                                    </p>
                                    <h3 className="text-xl font-bold mb-2">{route.title}</h3>
                                    <p className="text-sm leading-relaxed" style={{ color: `${colors.primaryDark}80` }}>
                                        {route.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* ─── 13 production APIs ───────────────────────────────────────────── */}
            <motion.section
                className="py-20 relative bg-white"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeInUp}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: colors.goldAccent }}>13 production APIs</p>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            One verified <span className="gradient-text">ESG dataset</span>
                        </h2>
                        <p className="text-lg max-w-3xl mx-auto" style={{ color: `${colors.primaryDark}AA` }}>
                            Select any API to see what it measures.
                        </p>
                    </div>

                    <div className="space-y-10">
                        {apiGroups.map((group) => (
                            <div key={group.key}>
                                <div className="flex items-center gap-3 mb-4">
                                    <span
                                        className="min-w-[2.5rem] h-10 px-2 rounded-xl flex items-center justify-center font-bold text-white text-sm"
                                        style={{ backgroundColor: group.color }}
                                    >
                                        {group.key}
                                    </span>
                                    <h3 className="text-xl font-bold">{group.label}</h3>
                                    <span className="text-sm font-semibold" style={{ color: `${colors.primaryDark}60` }}>({group.apis.length})</span>
                                    <div className="flex-1 h-px" style={{ backgroundColor: colors.softGrey }} />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-start">
                                    {group.apis.map((api) => {
                                        const id = `${group.key}-${api.name}`;
                                        const isOpen = openApi === id;
                                        return (
                                            <div
                                                key={id}
                                                className="rounded-2xl border transition-all"
                                                style={{
                                                    backgroundColor: isOpen ? `${group.color}08` : colors.lightBackground,
                                                    borderColor: isOpen ? `${group.color}60` : colors.softGrey,
                                                }}
                                            >
                                                <button
                                                    onClick={() => setOpenApi(isOpen ? null : id)}
                                                    aria-expanded={isOpen}
                                                    className="w-full flex items-center justify-between gap-3 p-4 text-left"
                                                >
                                                    <span className="flex items-center gap-2.5">
                                                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: group.color }} />
                                                        <span className="font-semibold text-sm">{api.name}</span>
                                                    </span>
                                                    <ChevronDown
                                                        className={`w-4 h-4 flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                                                        style={{ color: group.color }}
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
                                                            <p className="px-4 pb-4 text-sm leading-relaxed" style={{ color: `${colors.primaryDark}99` }}>
                                                                {api.detail}
                                                            </p>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* ─── Farms we work with ───────────────────────────────────────────── */}
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
                            From commercial estates <span className="gradient-text">to smallholder plots</span>
                        </h2>
                        <p className="text-lg max-w-3xl mx-auto" style={{ color: `${colors.primaryDark}AA` }}>
                            The same verified evidence chain works at every scale of farming, so buyers, lenders and
                            regulators see one consistent standard of proof.
                        </p>
                    </div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-40px" }}
                    >
                        {farmTypes.map((farm) => (
                            <motion.div
                                key={farm.title}
                                variants={cardVariants}
                                className="bg-white rounded-2xl p-7 border border-[#DCE7E8] hover-lift"
                            >
                                <div className="flex items-center gap-4 mb-5">
                                    <div
                                        className="p-2.5 rounded-xl"
                                        style={{ backgroundColor: `${farm.color}12`, border: `1px solid ${farm.color}20`, color: farm.color }}
                                    >
                                        {farm.icon}
                                    </div>
                                    <h3 className="text-xl font-bold">{farm.title}</h3>
                                </div>
                                <ul className="space-y-2.5">
                                    {farm.points.map((point) => (
                                        <li key={point} className="flex items-start gap-2.5 text-sm" style={{ color: `${colors.primaryDark}AA` }}>
                                            <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: farm.color }} />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* ─── Who it serves ────────────────────────────────────────────────── */}
            <motion.section
                className="py-20 relative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeInUp}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl border border-[#DCE7E8] p-8 sm:p-12 shadow-lg text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Who it <span className="gradient-text">serves</span>
                        </h2>
                        <p className="text-lg max-w-3xl mx-auto mb-8" style={{ color: `${colors.primaryDark}AA` }}>
                            Agricultural estates and agribusinesses, commodity exporters, contract-farming programmes,
                            carbon project developers, and the banks, insurers and investors financing them.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                            {audiences.map((a, idx) => (
                                <span
                                    key={a}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                                    style={{
                                        backgroundColor: idx === audiences.length - 1 ? `${colors.goldAccent}12` : `${colors.secondaryBlue}10`,
                                        color: idx === audiences.length - 1 ? colors.goldAccent : colors.secondaryBlue,
                                    }}
                                >
                                    <ShieldCheck className="w-4 h-4" /> {a}
                                </span>
                            ))}
                        </div>
                    </div>
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
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Why <span className="gradient-text">MAvHU</span>
                        </h2>
                        <p className="text-lg max-w-3xl mx-auto" style={{ color: `${colors.primaryDark}AA` }}>
                            The only end-to-end platform in Africa combining ground-truth verification, automated MRV and
                            ESG APIs. Data hosted in Africa (AWS Cape Town).
                        </p>
                    </div>

                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-40px" }}
                    >
                        {reasons.map((reason) => (
                            <motion.div
                                key={reason.title}
                                variants={cardVariants}
                                className="bg-white rounded-2xl p-6 border border-[#DCE7E8] text-center hover-lift"
                            >
                                <div className="flex justify-center mb-4">
                                    <div className="p-3 rounded-xl" style={{ backgroundColor: `${colors.goldAccent}12`, color: colors.goldAccent }}>
                                        {reason.icon}
                                    </div>
                                </div>
                                <h3 className="font-bold text-base mb-2">{reason.title}</h3>
                                <p className="text-sm leading-relaxed" style={{ color: `${colors.primaryDark}80` }}>
                                    {reason.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* ─── Closing CTA ──────────────────────────────────────────────────── */}
            <motion.section
                className="py-20 relative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeInUp}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div
                        className="rounded-2xl p-8 sm:p-14 shadow-lg text-white text-center"
                        style={{ background: `linear-gradient(135deg, ${colors.primaryDark}, ${colors.secondaryBlue})` }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold mb-8 max-w-3xl mx-auto leading-tight">
                            Regulation changes markets overnight. <span className="gradient-text">Field-level data keeps you in them.</span>
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={requestBriefing}
                                className="group px-8 py-3 rounded-xl font-bold transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                                style={{ background: `linear-gradient(135deg, ${colors.goldAccent}, #D4A82E)`, color: "#fff" }}
                            >
                                Request an Agri Intelligence briefing <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
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
                </div>
            </motion.section>

            <Footer />
        </div>
    );
};

export default AgricultureIntelligencePage;
