import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Database,
  Smartphone,
  BarChart3,
  Cloud,
  Users,
  Shield,
  CheckCircle,
  Zap,
  MapPin,
  ArrowRight,
  Target,
  BookOpen,
  Layers,
  CloudRain,
  Navigation,
  Activity,
  Satellite,
  HardDrive,
  ChevronRight,
} from "lucide-react";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";
import skyImage from "../../assets/sky.png";
import earthImage from "../../assets/earth.png";
import aiImage from "../../assets/automa.png";

// Color palette (same as AboutPage)
const colors = {
  primaryDark: "#123E56",
  secondaryBlue: "#1F5C73",
  goldAccent: "#B89A2F",
  lightBackground: "#F4FAFA",
  softGrey: "#DCE7E8",
  white: "#FFFFFF",
};

// Animation variants (same as AboutPage)
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Breathing animation for approach images
const breathingFloat = {
  animate: {
    y: [0, -12, 0],
    scale: [1, 1.04, 1],
    transition: {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop" as const,
    },
  },
};

const ServicesPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [expandedService, setExpandedService] = useState<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const toggleService = (index: number) => {
    setExpandedService(expandedService === index ? null : index);
  };

  // Service data (same content, but now full width cards)
  const services = [
    {
      id: "esg-dashboard",
      title: "ESG & Climate Intelligence Dashboard",
      icon: <BarChart3 className="w-8 h-8" />,
      shortDescription:
        "Comprehensive platform for monitoring climate indicators, tracking verified outcomes, and supporting ESG disclosures with accurate, audit-ready data.",
      fullDescription:
        "The MAVHU ESG & Climate Intelligence Dashboard integrates satellite data, drone imagery, ground verification, and automated MRV systems to deliver trusted climate and sustainability data. Built for financial institutions, corporates, governments, and climate project developers who require accurate data for decision-making and reporting.",
      features: [
        "Real-time climate monitoring and alerts",
        "ESG reporting compliance automation",
        "Portfolio tracking and analytics",
        "Automated MRV (Measurement, Reporting, Verification)",
        "Audit-ready data verification trails",
        "Multi-stakeholder customizable dashboards",
      ],
      useCases: [
        "Financial institutions for climate risk assessment",
        "Corporate ESG teams for sustainability reporting",
        "Government agencies for climate policy monitoring",
        "Project developers for impact verification and carbon credits",
      ],
      dataSources: [
        "Satellite imagery (historical & real-time)",
        "Drone data collection",
        "Ground truth verification teams",
        "IoT sensor networks",
        "Government climate databases",
      ],
    },
    {
      id: "farmer-app",
      title: "Farmer App & Field Intelligence",
      icon: <Smartphone className="w-8 h-8" />,
      shortDescription:
        "Mobile application for farmers to capture farm-level data, receive climate insights, and ensure compliance with agricultural and climate programs.",
      fullDescription:
        "The MAVHU Farmer App is designed for farmers, cooperatives, and field teams participating in climate, sustainability, or agricultural programmes. It combines on-the-ground data collection with drone and satellite monitoring, delivering localized climate insights that improve resilience and decision-making.",
      features: [
        "Offline-first data collection (works without internet)",
        "GPS field mapping and boundary delineation",
        "Climate-smart farming recommendations",
        "Program compliance tracking and reporting",
        "Yield prediction models using AI",
        "Multi-language support for African languages",
      ],
      capabilities: [
        "Crop health monitoring via satellite NDVI",
        "Soil moisture and nutrient tracking",
        "Weather alerts and climate predictions",
        "Pest and disease early warning",
        "Input usage optimization",
        "Carbon sequestration tracking",
      ],
      targetUsers: [
        "Smallholder farmers for data-driven decisions",
        "Agricultural cooperatives for collective monitoring",
        "Field extension officers for program implementation",
        "NGOs for impact assessment",
        "Insurance companies for risk assessment",
      ],
    },
    {
      id: "climate-apis",
      title: "Climate Data APIs Suite",
      icon: <Database className="w-8 h-8" />,
      shortDescription:
        "Enterprise-grade APIs providing verified, locally grounded climate intelligence for integration into organizational systems and applications.",
      fullDescription:
        "MAVHU provides secure, enterprise-grade climate data APIs that enable organisations to integrate verified, locally grounded climate intelligence directly into their systems.",
      apiCategories: [
        {
          name: "Earth Surface Intelligence",
          icon: <MapPin className="w-5 h-5" />,
          description: "Land use, land cover change, and vegetation dynamics",
        },
        {
          name: "Climate & Atmospheric Intelligence",
          icon: <Cloud className="w-5 h-5" />,
          description: "Localized climate risk, resilience indicators, and microclimate conditions",
        },
        {
          name: "Verification & Compliance",
          icon: <Shield className="w-5 h-5" />,
          description: "MRV outputs, audit trails, and ESG reporting metrics",
        },
      ],
    },
    {
      id: "training",
      title: "Training & Capacity Building",
      icon: <Users className="w-8 h-8" />,
      shortDescription:
        "Comprehensive training programs to build capacity in climate data management, ESG reporting, and sustainable agricultural practices.",
      fullDescription:
        "MAVHU's training services support farmers, agricultural organisations, institutions, and implementation partners involved in climate and sustainability initiatives.",
      trainingModules: [
        "Climate Data Literacy & Digital Skills",
        "ESG Reporting Fundamentals & Standards",
        "MRV System Implementation & Management",
        "Farm-Level Data Collection Best Practices",
        "Climate Risk Assessment & Adaptation",
        "Sustainable Agriculture Practices & Certification",
      ],
      deliveryMethods: [
        "In-person field training sessions",
        "Digital learning platforms with certifications",
        "Train-the-trainer programs for scalability",
        "Customized organizational training packages",
        "Workshops and webinars on emerging topics",
        "Field demonstrations and practical exercises",
      ],
      targetAudience: [
        "Farmers and agricultural cooperatives",
        "Government extension officers & agencies",
        "NGO implementation partners",
        "Corporate sustainability & ESG teams",
        "Financial institution analysts",
        "Climate project developers",
      ],
    },
  ];

  // Approach steps (for the MAVHU Model section)
  const approachSteps = [
    {
      id: "sky",
      label: "Process",
      title: "MAvHU Sky",
      description: "Geospatial, satellite & drone data collection",
      details: [
        "Multi-spectral satellite imagery for comprehensive land monitoring",
        "Drone-based high-resolution mapping for precision agriculture",
        "Weather satellite data for climate pattern analysis",
        "Aerial sensor networks for real-time atmospheric monitoring",
      ],
      image: skyImage,
      color: colors.secondaryBlue,
      bgColor: "#EAF4F8",
      borderColor: "#1F5C73",
    },
    {
      id: "earth",
      label: "Validation",
      title: "MAvHU Earth",
      description: "Soil, ground truth & compliance",
      details: [
        "Field verification teams across Africa for ground-truthing",
        "Soil sampling and analysis for carbon measurement",
        "Vegetation ground truthing for accurate biomass estimation",
        "Local knowledge integration and community-led data collection",
      ],
      image: earthImage,
      color: colors.goldAccent,
      bgColor: "#F9F4E6",
      borderColor: "#B89A2F",
    },
    {
      id: "ai",
      label: "Automation",
      title: "MAvHU Ai",
      description: "Automated MRV, ESG & APIs",
      details: [
        "Machine learning algorithms for pattern recognition and prediction",
        "Automated data validation pipelines for quality assurance",
        "Predictive analytics for climate trends and risk assessment",
        "Natural language processing for automated report generation",
      ],
      image: aiImage,
      color: "#2E7D6B",
      bgColor: "#EAF6F2",
      borderColor: "#2E7D6B",
    },
    {
      id: "distribution",
      label: "Distribution",
      title: "Stakeholders",
      description: "Delivering intelligence to key stakeholders",
      image: null,
      color: colors.primaryDark,
      bgColor: "#F4FAFA",
      borderColor: "#123E56",
      isDistribution: true,
    },
  ];

  const distributionChannels = [
    { name: "Government", icon: <Shield className="w-5 h-5" />, color: "#1F5C73" },
    { name: "Financial Institutions", icon: <BarChart3 className="w-5 h-5" />, color: "#B89A2F" },
    { name: "Enterprises", icon: <Database className="w-5 h-5" />, color: "#2E7D6B" },
    { name: "Farmers", icon: <Smartphone className="w-5 h-5" />, color: "#7A5C2E" },
    { name: "Carbon Developers", icon: <Cloud className="w-5 h-5" />, color: "#123E56" },
  ];

  return (
    <div
      className="min-h-screen overflow-hidden font-['Inter',system-ui,sans-serif] bg-[#F4FAFA] text-[#123E56]"
      style={
        {
          "--primary-dark": colors.primaryDark,
          "--secondary-blue": colors.secondaryBlue,
          "--gold-accent": colors.goldAccent,
          "--light-bg": colors.lightBackground,
          "--soft-grey": colors.softGrey,
          "--white": colors.white,
        } as React.CSSProperties
      }
    >
      {/* Animated Background (same as AboutPage) */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F4FAFA] via-white to-[#DCE7E8]/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(31,92,115,0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(184,154,47,0.04),transparent_50%)]" />
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            background: `radial-gradient(circle, ${colors.secondaryBlue}15, transparent 70%)`,
          }}
        />
      </div>

      {/* Navbar (light mode only) */}
      <Navbar />

      {/* Hero Section */}
      <motion.section
        className="relative pt-32 pb-16"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-6xl lg:text-7xl font-bold leading-tight mb-8 text-[#123E56]">
              Our{" "}
              <span style={{ color: colors.goldAccent }}>Integrated</span>
              <br />
              <span style={{ color: colors.secondaryBlue }}>Climate Solutions</span>
            </h1>
            <p className="text-xl text-[#123E56]/80 leading-relaxed max-w-3xl mx-auto">
              Combining Earth observation, ground verification, and AI analytics to deliver trusted climate intelligence across Africa's skies, earth, and communities.
            </p>
          </div>
        </div>
      </motion.section>

      {/* MAVHU Model Architecture (2x2 grid with arrows) */}
      <motion.section
        className="py-20 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-[#123E56]">
              The{" "}
              <span style={{ color: colors.goldAccent }}>MAvHU</span>{" "}
              <span style={{ color: colors.secondaryBlue }}>Model Architecture</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto text-[#123E56]/60">
              A four-stage integrated pipeline — from sky to stakeholder — powered by intelligent automation.
            </p>
          </div>

          {/* 2x2 Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_80px_1fr] gap-0 items-center">
            {/* Row 1 - Sky */}
            <div className="bg-white rounded-3xl p-8 border border-[#DCE7E8] hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white"
                  style={{ background: approachSteps[0].color }}
                >
                  01
                </div>
                <div
                  className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest"
                  style={{ background: `${approachSteps[0].color}12`, color: approachSteps[0].color }}
                >
                  Process
                </div>
              </div>
              <div className="flex justify-center mb-6">
                <motion.img
                  {...breathingFloat}
                  src={approachSteps[0].image}
                  alt="MAvHU Sky"
                  className="w-28 h-28 object-contain"
                  style={{ filter: `drop-shadow(0 8px 24px ${approachSteps[0].color}40)` }}
                />
              </div>
              <h3 className="text-xl font-bold text-center mb-1" style={{ color: approachSteps[0].color }}>
                {approachSteps[0].title}
              </h3>
              <p className="text-xs uppercase font-semibold tracking-widest text-center mb-4 text-[#123E56]/60">
                {approachSteps[0].description}
              </p>
              <ul className="space-y-2">
                {approachSteps[0].details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-[#123E56]/70">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: approachSteps[0].color }} />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right arrow (row 1) */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="flex items-center">
                <svg width="80" height="24" viewBox="0 0 80 24" fill="none">
                  <path d="M0 12 L64 12" stroke={colors.secondaryBlue} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6 4" />
                  <path d="M60 6 L72 12 L60 18" stroke={colors.secondaryBlue} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>
            </div>

            {/* Row 1 - Earth */}
            <div className="bg-white rounded-3xl p-8 border border-[#DCE7E8] hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white"
                  style={{ background: approachSteps[1].color }}
                >
                  02
                </div>
                <div
                  className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest"
                  style={{ background: `${approachSteps[1].color}12`, color: approachSteps[1].color }}
                >
                  Validation
                </div>
              </div>
              <div className="flex justify-center mb-6">
                <motion.img
                  {...breathingFloat}
                  src={approachSteps[1].image}
                  alt="MAvHU Earth"
                  className="w-28 h-28 object-contain"
                  style={{ filter: `drop-shadow(0 8px 24px ${approachSteps[1].color}40)` }}
                />
              </div>
              <h3 className="text-xl font-bold text-center mb-1" style={{ color: approachSteps[1].color }}>
                {approachSteps[1].title}
              </h3>
              <p className="text-xs uppercase font-semibold tracking-widest text-center mb-4 text-[#123E56]/60">
                {approachSteps[1].description}
              </p>
              <ul className="space-y-2">
                {approachSteps[1].details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-[#123E56]/70">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: approachSteps[1].color }} />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            {/* Down arrows between rows */}
            <div className="hidden lg:flex justify-center items-center py-4">
              <svg width="24" height="60" viewBox="0 0 24 60" fill="none">
                <path d="M12 0 L12 44" stroke={colors.goldAccent} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6 4" />
                <path d="M6 40 L12 52 L18 40" stroke={colors.goldAccent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>

            <div className="hidden lg:flex justify-center items-center py-4">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <path d="M8 8 L48 48" stroke={`${colors.primaryDark}30`} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6 4" />
                <path d="M36 48 L52 48 L52 36" stroke={`${colors.primaryDark}30`} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>

            <div className="hidden lg:flex justify-center items-center py-4">
              <svg width="24" height="60" viewBox="0 0 24 60" fill="none">
                <path d="M12 0 L12 44" stroke="#2E7D6B" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6 4" />
                <path d="M6 40 L12 52 L18 40" stroke="#2E7D6B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>

            {/* Row 2 - AI */}
            <div className="bg-white rounded-3xl p-8 border border-[#DCE7E8] hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white"
                  style={{ background: approachSteps[2].color }}
                >
                  03
                </div>
                <div
                  className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest"
                  style={{ background: `${approachSteps[2].color}12`, color: approachSteps[2].color }}
                >
                  Automation
                </div>
              </div>
              <div className="flex justify-center mb-6">
                <motion.img
                  {...breathingFloat}
                  src={approachSteps[2].image}
                  alt="MAvHU AI"
                  className="w-28 h-28 object-contain"
                  style={{ filter: `drop-shadow(0 8px 24px ${approachSteps[2].color}40)` }}
                />
              </div>
              <h3 className="text-xl font-bold text-center mb-1" style={{ color: approachSteps[2].color }}>
                {approachSteps[2].title}
              </h3>
              <p className="text-xs uppercase font-semibold tracking-widest text-center mb-4 text-[#123E56]/60">
                {approachSteps[2].description}
              </p>
              <ul className="space-y-2">
                {approachSteps[2].details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-[#123E56]/70">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: approachSteps[2].color }} />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right arrow (row 2) */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="flex items-center">
                <svg width="80" height="24" viewBox="0 0 80 24" fill="none">
                  <path d="M0 12 L64 12" stroke="#2E7D6B" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6 4" />
                  <path d="M60 6 L72 12 L60 18" stroke="#2E7D6B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>
            </div>

            {/* Distribution card */}
            <div className="bg-white rounded-3xl p-8 border border-[#DCE7E8] hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white"
                  style={{ background: colors.primaryDark }}
                >
                  04
                </div>
                <div
                  className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest"
                  style={{ background: `${colors.primaryDark}10`, color: colors.primaryDark }}
                >
                  Distribution
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-5">
                {distributionChannels.map((ch, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -8, 0], scale: [1, 1.04, 1] }}
                    transition={{ duration: 3.5 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                    className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl"
                    style={{ background: `${ch.color}10` }}
                  >
                    <div style={{ color: ch.color }}>{ch.icon}</div>
                    <span className="text-xs font-medium text-center leading-tight" style={{ color: ch.color }}>
                      {ch.name}
                    </span>
                  </motion.div>
                ))}
              </div>
              <h3 className="text-xl font-bold text-center mb-1" style={{ color: colors.primaryDark }}>
                Stakeholders
              </h3>
              <p className="text-xs uppercase font-semibold tracking-widest text-center text-[#123E56]/60">
                Delivering intelligence to key stakeholders
              </p>
            </div>
          </div>

          {/* Mobile arrows (simple separators) */}
          <div className="lg:hidden flex justify-center py-4">
            <svg width="24" height="40" viewBox="0 0 24 40" fill="none">
              <path d="M12 0 L12 24" stroke={colors.secondaryBlue} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6 4" />
              <path d="M6 20 L12 32 L18 20" stroke={colors.secondaryBlue} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
          <div className="lg:hidden flex justify-center py-4">
            <svg width="24" height="40" viewBox="0 0 24 40" fill="none">
              <path d="M12 0 L12 24" stroke={colors.goldAccent} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6 4" />
              <path d="M6 20 L12 32 L18 20" stroke={colors.goldAccent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
          <div className="lg:hidden flex justify-center py-4">
            <svg width="24" height="40" viewBox="0 0 24 40" fill="none">
              <path d="M12 0 L12 24" stroke="#2E7D6B" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6 4" />
              <path d="M6 20 L12 32 L18 20" stroke="#2E7D6B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
        </div>
      </motion.section>

      {/* Services Section (full width cards) */}
      <motion.section
        className="py-16 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4 text-[#123E56]">
              <span style={{ color: colors.secondaryBlue }}>Our</span>{" "}
              <span style={{ color: colors.goldAccent }}>Services</span>
            </h2>
            <p className="text-base text-[#123E56]/60">
              Click on any service card to explore detailed information
            </p>
          </div>

          <div className="space-y-5">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className="rounded-2xl overflow-hidden bg-white border border-[#DCE7E8] shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Header (always visible) */}
                <div
                  className="p-6 cursor-pointer hover:bg-[#F4FAFA] transition-colors duration-200"
                  onClick={() => toggleService(index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className="p-3 rounded-xl flex-shrink-0"
                        style={{ background: `${colors.secondaryBlue}10`, color: colors.secondaryBlue }}
                      >
                        {service.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-1 text-[#123E56]">{service.title}</h3>
                        <p className="text-sm leading-relaxed text-[#123E56]/65">{service.shortDescription}</p>
                      </div>
                    </div>
                    <div
                      className="flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: `${colors.secondaryBlue}10` }}
                    >
                      <ChevronRight
                        className={`w-5 h-5 transition-transform duration-300 ${expandedService === index ? "rotate-90" : ""}`}
                        style={{ color: colors.secondaryBlue }}
                      />
                    </div>
                  </div>
                </div>

                {/* Expanded content */}
                <AnimatePresence>
                  {expandedService === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="border-t p-6 bg-[#FAFCFC]" style={{ borderColor: colors.softGrey }}>
                        <div className="grid md:grid-cols-2 gap-8">
                          <div>
                            <p className="text-sm leading-relaxed mb-6 text-[#123E56]/70">
                              {service.fullDescription}
                            </p>

                            {service.features && (
                              <div className="mb-6">
                                <h5 className="text-base font-semibold mb-3 flex items-center gap-2 text-[#123E56]">
                                  <CheckCircle className="w-4 h-4" style={{ color: colors.secondaryBlue }} />
                                  Key Features
                                </h5>
                                <div className="space-y-1.5">
                                  {service.features.map((f, i) => (
                                    <div key={i} className="flex items-start gap-2 text-sm text-[#123E56]/65">
                                      <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: colors.secondaryBlue }} />
                                      {f}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {service.trainingModules && (
                              <div>
                                <h5 className="text-base font-semibold mb-3 flex items-center gap-2 text-[#123E56]">
                                  <BookOpen className="w-4 h-4" style={{ color: colors.secondaryBlue }} />
                                  Training Modules
                                </h5>
                                <div className="space-y-1.5">
                                  {service.trainingModules.map((m, i) => (
                                    <div key={i} className="flex items-start gap-2 text-sm text-[#123E56]/65">
                                      <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: colors.goldAccent }} />
                                      {m}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          <div>
                            {service.useCases && (
                              <div className="mb-6">
                                <h5 className="text-base font-semibold mb-3 flex items-center gap-2 text-[#123E56]">
                                  <Target className="w-4 h-4" style={{ color: colors.secondaryBlue }} />
                                  Use Cases
                                </h5>
                                <div className="space-y-1.5">
                                  {service.useCases.map((u, i) => (
                                    <div key={i} className="flex items-start gap-2 text-sm text-[#123E56]/65">
                                      <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: colors.goldAccent }} />
                                      {u}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {service.capabilities && (
                              <div className="mb-6">
                                <h5 className="text-base font-semibold mb-3 flex items-center gap-2 text-[#123E56]">
                                  <Zap className="w-4 h-4" style={{ color: colors.secondaryBlue }} />
                                  Capabilities
                                </h5>
                                <div className="grid grid-cols-2 gap-2">
                                  {service.capabilities.map((c, i) => (
                                    <div
                                      key={i}
                                      className="p-2.5 rounded-lg text-center text-xs"
                                      style={{ background: colors.lightBackground, color: `${colors.primaryDark}70` }}
                                    >
                                      {c}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {service.dataSources && (
                              <div className="mb-6">
                                <h5 className="text-base font-semibold mb-3 flex items-center gap-2 text-[#123E56]">
                                  <Database className="w-4 h-4" style={{ color: colors.secondaryBlue }} />
                                  Data Sources
                                </h5>
                                <div className="flex flex-wrap gap-2">
                                  {service.dataSources.map((s, i) => (
                                    <span
                                      key={i}
                                      className="px-3 py-1 rounded-full text-xs font-medium"
                                      style={{ background: `${colors.secondaryBlue}10`, color: colors.secondaryBlue }}
                                    >
                                      {s}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {service.deliveryMethods && (
                              <div>
                                <h5 className="text-base font-semibold mb-3 flex items-center gap-2 text-[#123E56]">
                                  <ArrowRight className="w-4 h-4" style={{ color: colors.secondaryBlue }} />
                                  Delivery Methods
                                </h5>
                                <div className="space-y-1.5">
                                  {service.deliveryMethods.map((m, i) => (
                                    <div key={i} className="flex items-start gap-2 text-sm text-[#123E56]/65">
                                      <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: colors.goldAccent }} />
                                      {m}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {service.apiCategories && (
                              <div>
                                <h5 className="text-base font-semibold mb-4 flex items-center gap-2 text-[#123E56]">
                                  <Database className="w-4 h-4" style={{ color: colors.secondaryBlue }} />
                                  API Categories
                                </h5>
                                <div className="space-y-3">
                                  {service.apiCategories.map((cat, i) => (
                                    <div key={i} className="rounded-xl p-4" style={{ background: colors.lightBackground }}>
                                      <div className="flex items-center gap-2 mb-1">
                                        <div style={{ color: colors.secondaryBlue }}>{cat.icon}</div>
                                        <span className="font-semibold text-sm text-[#123E56]">{cat.name}</span>
                                      </div>
                                      <p className="text-xs text-[#123E56]/60">{cat.description}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Integrated Ecosystem Section */}
      <motion.section
        className="py-20 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-[#123E56]">
              <span style={{ color: colors.secondaryBlue }}>Integrated</span>{" "}
              <span style={{ color: colors.goldAccent }}>Climate Intelligence</span> Ecosystem
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <CloudRain className="w-7 h-7" />, title: "Atmospheric Data", description: "Real-time weather, climate patterns, and atmospheric conditions", color: colors.secondaryBlue },
              { icon: <Layers className="w-7 h-7" />, title: "Earth Surface Intelligence", description: "Land use, vegetation, soil health, and surface temperature", color: colors.goldAccent },
              { icon: <Navigation className="w-7 h-7" />, title: "Automated Data Collection", description: "Satellite, drone, and IoT networks for continuous monitoring", color: "#2E7D6B" },
              { icon: <Activity className="w-7 h-7" />, title: "Historical Analysis", description: "Decades of historical climate data for trend analysis and prediction", color: colors.primaryDark },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 text-center border border-[#DCE7E8] hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: `${item.color}10` }}
                >
                  <div style={{ color: item.color }}>{item.icon}</div>
                </div>
                <h3 className="font-bold mb-2 text-[#123E56]">{item.title}</h3>
                <p className="text-sm text-[#123E56]/60">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-24 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold mb-6 text-[#123E56]">
            Transform Climate Action
            <br />
            <span style={{ color: colors.secondaryBlue }}>With Integrated</span>{" "}
            <span style={{ color: colors.goldAccent }}>Intelligence</span>
          </h2>
          <p className="text-xl mb-10 leading-relaxed text-[#123E56]/70">
            Join governments, financial institutions, and organizations across Africa who trust MAVHU for comprehensive climate intelligence.
          </p>
          <button
            onClick={() => (window.location.href = "/request-demo")}
            className="inline-flex items-center gap-3 py-4 px-10 rounded-2xl text-lg font-bold text-white transition-all hover:scale-105 shadow-xl"
            style={{
              background: `linear-gradient(135deg, ${colors.goldAccent}, #D4A82E)`,
              boxShadow: `0 16px 40px ${colors.goldAccent}35`,
            }}
          >
            Request Full Demo
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </motion.section>

      <Footer />

      {/* Global styles for Inter font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,100..900;1,100..900&display=swap');
        * { font-family: 'Inter', system-ui, sans-serif; }
        button { transition: all 0.3s ease; }
      `}</style>
    </div>
  );
};

export default ServicesPage;