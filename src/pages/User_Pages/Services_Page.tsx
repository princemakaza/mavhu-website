import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
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
  ArrowDown,
  ArrowDownRight,
} from "lucide-react";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";
import skyImage from "../../assets/sky.png";
import earthImage from "../../assets/earth.png";
import aiImage from "../../assets/automa.png";

// Color palette
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
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
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

// Breathing / floating animation for images
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

const breathingFloatDelayed = {
  animate: {
    y: [0, -10, 0],
    scale: [1, 1.03, 1],
    transition: {
      duration: 4.5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop" as const,
      delay: 0.8,
    },
  },
};

const breathingFloatDelayed2 = {
  animate: {
    y: [0, -14, 0],
    scale: [1, 1.05, 1],
    transition: {
      duration: 3.8,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop" as const,
      delay: 1.6,
    },
  },
};

// SVG Arrow component for the flow
const FlowArrow = ({
  direction = "right",
  color = colors.secondaryBlue,
  delay = 0,
}: {
  direction?: "right" | "down" | "down-right";
  color?: string;
  delay?: number;
}) => {
  if (direction === "right") {
    return (
      <div className="flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay, ease: "easeOut" }}
          style={{ originX: 0 }}
          className="flex items-center"
        >
          <svg width="80" height="24" viewBox="0 0 80 24" fill="none">
            <motion.path
              d="M0 12 L64 12"
              stroke={color}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="6 4"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: delay + 0.2 }}
            />
            <motion.path
              d="M60 6 L72 12 L60 18"
              stroke={color}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: delay + 0.9 }}
            />
            {/* Animated dot */}
            <motion.circle
              cx="0"
              cy="12"
              r="3"
              fill={color}
              animate={{ cx: [0, 72, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "linear",
                delay: delay + 1,
              }}
            />
          </svg>
        </motion.div>
      </div>
    );
  }

  if (direction === "down") {
    return (
      <div className="flex flex-col items-center justify-center py-2">
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay, ease: "easeOut" }}
          style={{ originY: 0 }}
        >
          <svg width="24" height="80" viewBox="0 0 24 80" fill="none">
            <motion.path
              d="M12 0 L12 64"
              stroke={color}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="6 4"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: delay + 0.2 }}
            />
            <motion.path
              d="M6 60 L12 72 L18 60"
              stroke={color}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: delay + 0.9 }}
            />
            <motion.circle
              cx="12"
              cy="0"
              r="3"
              fill={color}
              animate={{ cy: [0, 72, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "linear",
                delay: delay + 1,
              }}
            />
          </svg>
        </motion.div>
      </div>
    );
  }

  // down-right diagonal
  return (
    <div className="flex items-center justify-center py-2">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
      >
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <motion.path
            d="M8 8 L48 48"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="6 4"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: delay + 0.2 }}
          />
          <motion.path
            d="M36 48 L52 48 L52 36"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: delay + 0.9 }}
          />
        </svg>
      </motion.div>
    </div>
  );
};

// Individual Step Card in the 2x2 grid
const StepCard = ({
  step,
  index,
  floatVariant,
}: {
  step: any;
  index: number;
  floatVariant: any;
}) => {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, boxShadow: "0 24px 48px rgba(18,62,86,0.12)" }}
      transition={{ duration: 0.25 }}
      className="relative rounded-3xl overflow-hidden"
      style={{
        background: step.bgColor,
        border: `1.5px solid ${step.borderColor}30`,
        boxShadow: "0 4px 24px rgba(18,62,86,0.06)",
      }}
    >
      {/* Top accent bar */}
      <div
        className="h-1 w-full"
        style={{ background: `linear-gradient(90deg, ${step.color}, ${step.color}60)` }}
      />

      <div className="p-7">
        {/* Step number badge */}
        <div className="flex items-start justify-between mb-5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white"
            style={{ background: step.color }}
          >
            {String(index + 1).padStart(2, "0")}
          </div>
          <div
            className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest"
            style={{
              background: `${step.color}12`,
              color: step.color,
            }}
          >
            {step.label}
          </div>
        </div>

        {/* Breathing image */}
        <div className="flex justify-center mb-6">
          <motion.div
            {...floatVariant}
            className="relative"
          >
            <div
              className="absolute inset-0 rounded-full blur-2xl opacity-20"
              style={{ background: step.color, transform: "scale(0.8) translateY(10px)" }}
            />
            <img
              src={step.image}
              alt={step.title}
              className="relative w-28 h-28 object-contain drop-shadow-lg"
              style={{ filter: `drop-shadow(0 8px 24px ${step.color}40)` }}
            />
          </motion.div>
        </div>

        {/* Content */}
        <div className="text-center mb-5">
          <h3
            className="text-xl font-bold mb-1"
            style={{ color: step.color, fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            {step.title}
          </h3>
          <p
            className="text-xs uppercase font-semibold tracking-widest"
            style={{ color: `${colors.primaryDark}60` }}
          >
            {step.description}
          </p>
        </div>

        {/* Details list */}
        <ul className="space-y-2">
          {step.details.map((detail: string, idx: number) => (
            <li key={idx} className="flex items-start gap-2 text-sm" style={{ color: `${colors.primaryDark}70` }}>
              <div
                className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                style={{ background: step.color }}
              />
              {detail}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
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

  // Service data
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

  // MAVHU Approach Steps - 4 steps in 2x2
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
      bgColor: "#F0F7FA",
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
      bgColor: "#FAF7EE",
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
      bgColor: "#EEF7F4",
      borderColor: "#2E7D6B",
    },
    {
      id: "distribution",
      label: "Distribution",
      title: "Stakeholders",
      description: "Delivering intelligence to key stakeholders",
      details: [
        "Government agencies & policy makers",
        "Financial institutions & ESG analysts",
        "Enterprises & corporate sustainability teams",
        "Farmers, cooperatives & carbon developers",
      ],
      image: null, // Distribution uses icons
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

  const floatVariants = [breathingFloat, breathingFloatDelayed, breathingFloatDelayed2, breathingFloat];

  return (
    <div
      className="min-h-screen overflow-hidden"
      style={{
        backgroundColor: colors.white,
        color: colors.primaryDark,
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      {/* Subtle background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #F4FAFA 0%, #FFFFFF 50%, #F8FAFB 100%)" }} />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full" style={{ background: "radial-gradient(circle, rgba(31,92,115,0.05) 0%, transparent 70%)" }} />
        <div className="absolute bottom-1/3 left-0 w-80 h-80 rounded-full" style={{ background: "radial-gradient(circle, rgba(184,154,47,0.04) 0%, transparent 70%)" }} />
        {/* Subtle moving gradient following mouse */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full pointer-events-none transition-all duration-[2000ms] ease-out"
          style={{
            left: mousePosition.x - 300,
            top: mousePosition.y - 300,
            background: "radial-gradient(circle, rgba(31,92,115,0.04) 0%, transparent 60%)",
          }}
        />
      </div>

      <Navbar />

      {/* Hero Section */}
      <motion.section
        className="relative pt-32 pb-12"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{
                background: `${colors.secondaryBlue}10`,
                border: `1px solid ${colors.secondaryBlue}20`,
              }}
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-medium tracking-wide" style={{ color: colors.secondaryBlue }}>
                Pan-African Climate Intelligence
              </span>
            </motion.div>

            <h1
              className="text-6xl lg:text-7xl font-bold leading-tight mb-6"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: colors.primaryDark }}
            >
              Our{" "}
              <span style={{ color: colors.goldAccent }}>Integrated</span>
              <br />
              <span style={{ color: colors.secondaryBlue }}>Climate Solutions</span>
            </h1>
            <p className="text-xl leading-relaxed max-w-3xl mx-auto" style={{ color: `${colors.primaryDark}70` }}>
              Combining Earth observation, ground verification, and AI analytics to deliver trusted climate intelligence across Africa's skies, earth, and communities.
            </p>
          </div>
        </div>
      </motion.section>

      {/* ── MAVHU Approach Section ──────────────────────────────────── */}
      <motion.section
        className="py-20 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2
              className="text-4xl lg:text-5xl font-bold mb-4"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: colors.primaryDark }}
            >
              The{" "}
              <span style={{ color: colors.goldAccent }}>MAvHU</span>{" "}
              <span style={{ color: colors.secondaryBlue }}>Model Architecture</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: `${colors.primaryDark}60` }}>
              A four-stage integrated pipeline — from sky to stakeholder — powered by intelligent automation.
            </p>
          </div>

          {/* 2×2 Grid with arrows */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-[1fr_80px_1fr] gap-0 items-center"
          >
            {/* ── Row 1 ── */}
            {/* Card 1: Sky */}
            <StepCard step={approachSteps[0]} index={0} floatVariant={breathingFloat} />

            {/* Right arrow (row 1) */}
            <div className="hidden lg:flex justify-center items-center">
              <FlowArrow direction="right" color={colors.secondaryBlue} delay={0.3} />
            </div>

            {/* Card 2: Earth */}
            <StepCard step={approachSteps[1]} index={1} floatVariant={breathingFloatDelayed} />

            {/* ── Between rows: down arrows on left and right columns ── */}
            {/* Left column down arrow (under card 1) */}
            <div className="hidden lg:flex justify-center items-center">
              <FlowArrow direction="down" color={colors.goldAccent} delay={0.6} />
            </div>

            {/* Center spacer with diagonal arrow */}
            <div className="hidden lg:flex justify-center items-center">
              <FlowArrow direction="down-right" color={`${colors.primaryDark}30`} delay={0.7} />
            </div>

            {/* Right column down arrow (under card 2) */}
            <div className="hidden lg:flex justify-center items-center">
              <FlowArrow direction="down" color="#2E7D6B" delay={0.6} />
            </div>

            {/* Mobile arrow between row 1 and row 2 */}
            <div className="lg:hidden flex justify-center py-2">
              <FlowArrow direction="down" color={colors.secondaryBlue} delay={0.3} />
            </div>

            {/* ── Row 2 ── */}
            {/* Card 3: AI */}
            <StepCard step={approachSteps[2]} index={2} floatVariant={breathingFloatDelayed2} />

            {/* Right arrow (row 2) */}
            <div className="hidden lg:flex justify-center items-center">
              <FlowArrow direction="right" color="#2E7D6B" delay={0.9} />
            </div>

            {/* Card 4: Distribution */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -6, boxShadow: "0 24px 48px rgba(18,62,86,0.12)" }}
              transition={{ duration: 0.25 }}
              className="relative rounded-3xl overflow-hidden"
              style={{
                background: approachSteps[3].bgColor,
                border: `1.5px solid ${approachSteps[3].borderColor}25`,
                boxShadow: "0 4px 24px rgba(18,62,86,0.06)",
              }}
            >
              <div
                className="h-1 w-full"
                style={{ background: `linear-gradient(90deg, ${colors.primaryDark}, ${colors.secondaryBlue})` }}
              />
              <div className="p-7">
                {/* Step badge */}
                <div className="flex items-start justify-between mb-5">
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

                {/* Channel icons in a breathing grid */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {distributionChannels.map((ch, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        y: [0, i % 2 === 0 ? -8 : -6, 0],
                        scale: [1, 1.04, 1],
                      }}
                      transition={{
                        duration: 3.5 + i * 0.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.3,
                      }}
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

                <div className="text-center">
                  <h3
                    className="text-xl font-bold mb-1"
                    style={{ color: colors.primaryDark, fontFamily: "'DM Serif Display', Georgia, serif" }}
                  >
                    Stakeholders
                  </h3>
                  <p className="text-xs uppercase font-semibold tracking-widest" style={{ color: `${colors.primaryDark}60` }}>
                    Delivering intelligence to key stakeholders
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Mobile: simple arrow between each card */}
          {/* (handled via lg:hidden arrows above) */}
        </div>
      </motion.section>

      {/* ── Services Section ──────────────────────────────────────── */}
      <motion.section
        className="py-16 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2
              className="text-4xl font-bold mb-4"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: colors.primaryDark }}
            >
              <span style={{ color: colors.secondaryBlue }}>Our</span>{" "}
              <span style={{ color: colors.goldAccent }}>Services</span>
            </h2>
            <p className="text-base" style={{ color: `${colors.primaryDark}60` }}>
              Click on any service card to explore detailed information
            </p>
          </div>

          <div className="space-y-5">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className="rounded-2xl overflow-hidden"
                style={{
                  background: colors.white,
                  border: `1px solid ${colors.softGrey}`,
                  boxShadow: "0 2px 16px rgba(18,62,86,0.05)",
                }}
              >
                {/* Header */}
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
                        <h3 className="text-xl font-bold mb-1" style={{ color: colors.primaryDark }}>
                          {service.title}
                        </h3>
                        <p className="text-sm leading-relaxed" style={{ color: `${colors.primaryDark}65` }}>
                          {service.shortDescription}
                        </p>
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

                {/* Expanded */}
                <AnimatePresence>
                  {expandedService === index && (
                    <motion.div
                      key="expanded"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div
                        className="border-t p-6"
                        style={{ borderColor: colors.softGrey, background: "#FAFCFC" }}
                      >
                        <div className="grid md:grid-cols-2 gap-8">
                          <div>
                            <p className="text-sm leading-relaxed mb-6" style={{ color: `${colors.primaryDark}70` }}>
                              {service.fullDescription}
                            </p>

                            {service.features && (
                              <div className="mb-6">
                                <h5 className="text-base font-semibold mb-3 flex items-center gap-2" style={{ color: colors.primaryDark }}>
                                  <CheckCircle className="w-4 h-4" style={{ color: colors.secondaryBlue }} />
                                  Key Features
                                </h5>
                                <div className="space-y-1.5">
                                  {service.features.map((f, i) => (
                                    <div key={i} className="flex items-start gap-2 text-sm" style={{ color: `${colors.primaryDark}65` }}>
                                      <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: colors.secondaryBlue }} />
                                      {f}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {service.trainingModules && (
                              <div>
                                <h5 className="text-base font-semibold mb-3 flex items-center gap-2" style={{ color: colors.primaryDark }}>
                                  <BookOpen className="w-4 h-4" style={{ color: colors.secondaryBlue }} />
                                  Training Modules
                                </h5>
                                <div className="space-y-1.5">
                                  {service.trainingModules.map((m, i) => (
                                    <div key={i} className="flex items-start gap-2 text-sm" style={{ color: `${colors.primaryDark}65` }}>
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
                                <h5 className="text-base font-semibold mb-3 flex items-center gap-2" style={{ color: colors.primaryDark }}>
                                  <Target className="w-4 h-4" style={{ color: colors.secondaryBlue }} />
                                  Use Cases
                                </h5>
                                <div className="space-y-1.5">
                                  {service.useCases.map((u, i) => (
                                    <div key={i} className="flex items-start gap-2 text-sm" style={{ color: `${colors.primaryDark}65` }}>
                                      <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: colors.goldAccent }} />
                                      {u}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {service.capabilities && (
                              <div className="mb-6">
                                <h5 className="text-base font-semibold mb-3 flex items-center gap-2" style={{ color: colors.primaryDark }}>
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
                                <h5 className="text-base font-semibold mb-3 flex items-center gap-2" style={{ color: colors.primaryDark }}>
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
                                <h5 className="text-base font-semibold mb-3 flex items-center gap-2" style={{ color: colors.primaryDark }}>
                                  <ArrowRight className="w-4 h-4" style={{ color: colors.secondaryBlue }} />
                                  Delivery Methods
                                </h5>
                                <div className="space-y-1.5">
                                  {service.deliveryMethods.map((m, i) => (
                                    <div key={i} className="flex items-start gap-2 text-sm" style={{ color: `${colors.primaryDark}65` }}>
                                      <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: colors.goldAccent }} />
                                      {m}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {service.apiCategories && (
                              <div>
                                <h5 className="text-base font-semibold mb-4 flex items-center gap-2" style={{ color: colors.primaryDark }}>
                                  <Database className="w-4 h-4" style={{ color: colors.secondaryBlue }} />
                                  API Categories
                                </h5>
                                <div className="space-y-3">
                                  {service.apiCategories.map((cat, i) => (
                                    <div
                                      key={i}
                                      className="rounded-xl p-4"
                                      style={{ background: colors.lightBackground }}
                                    >
                                      <div className="flex items-center gap-2 mb-1">
                                        <div style={{ color: colors.secondaryBlue }}>{cat.icon}</div>
                                        <span className="font-semibold text-sm" style={{ color: colors.primaryDark }}>{cat.name}</span>
                                      </div>
                                      <p className="text-xs" style={{ color: `${colors.primaryDark}60` }}>{cat.description}</p>
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

      {/* ── Integrated Ecosystem ─────────────────────────────────── */}
      <motion.section
        className="py-20 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-4xl font-bold mb-4"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: colors.primaryDark }}
            >
              <span style={{ color: colors.secondaryBlue }}>Integrated</span>{" "}
              <span style={{ color: colors.goldAccent }}>Climate Intelligence</span>
              {" "}Ecosystem
            </h2>
          </div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: <CloudRain className="w-7 h-7" />, title: "Atmospheric Data", description: "Real-time weather, climate patterns, and atmospheric conditions", color: colors.secondaryBlue },
              { icon: <Layers className="w-7 h-7" />, title: "Earth Surface Intelligence", description: "Land use, vegetation, soil health, and surface temperature", color: colors.goldAccent },
              { icon: <Navigation className="w-7 h-7" />, title: "Automated Data Collection", description: "Satellite, drone, and IoT networks for continuous monitoring", color: "#2E7D6B" },
              { icon: <Activity className="w-7 h-7" />, title: "Historical Analysis", description: "Decades of historical climate data for trend analysis and prediction", color: colors.primaryDark },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="rounded-2xl p-6 text-center"
                style={{
                  background: colors.white,
                  border: `1px solid ${colors.softGrey}`,
                  boxShadow: "0 2px 16px rgba(18,62,86,0.04)",
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: `${item.color}10` }}
                >
                  <div style={{ color: item.color }}>{item.icon}</div>
                </div>
                <h3 className="font-bold mb-2" style={{ color: colors.primaryDark }}>{item.title}</h3>
                <p className="text-sm" style={{ color: `${colors.primaryDark}60` }}>{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <motion.section
        className="py-24 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-5xl font-bold mb-6"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: colors.primaryDark }}
          >
            Transform Climate Action
            <br />
            <span style={{ color: colors.secondaryBlue }}>With Integrated</span>{" "}
            <span style={{ color: colors.goldAccent }}>Intelligence</span>
          </h2>
          <p className="text-xl mb-10 leading-relaxed" style={{ color: `${colors.primaryDark}70` }}>
            Join governments, financial institutions, and organizations across Africa who trust MAVHU for comprehensive climate intelligence.
          </p>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 py-4 px-10 rounded-2xl text-lg font-bold text-white"
            style={{
              background: `linear-gradient(135deg, ${colors.goldAccent}, #D4A82E)`,
              boxShadow: `0 16px 40px ${colors.goldAccent}35`,
            }}
          >
            Request Full Demo
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default ServicesPage;