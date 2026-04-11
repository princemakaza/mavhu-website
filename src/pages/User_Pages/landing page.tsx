import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Globe,
  Shield,
  Users,
  ArrowRight,
  CheckCircle,
  Map,
  Droplet,
  Cloud,
  BarChart3,
  Smartphone,
  Cpu,
  BookOpen,
  Eye,
  Database,
  TrendingUp,
  Leaf,
  Wind,
  Thermometer,
  X,
  ChevronRight,
  Layers,
  Zap,
  TreePine,
  DollarSign,
  Target,
  Activity,
  ChevronDown,
} from "lucide-react";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import Logo from "../../assets/logo.png";
import BackgroundImage1 from "../../assets/bg-land.png";
import BackgroundImage2 from "../../assets/bg-climate.png";
import BackgroundImage3 from "../../assets/bg-api.png";
import skyImage from "../../assets/sky.png";
import earthImage from "../../assets/earth.png";
import aiImage from "../../assets/automa.png";

// ─── Color Palette ──────────────────────────────────────────────────────────
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
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, type: "spring", stiffness: 120 } },
};
const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.25 } },
};

// ─── Data Definitions ────────────────────────────────────────────────────────

const pillarsData = [
  {
    title: "Measured",
    description: "Precise data collection from multiple high-tech sources",
    icon: <BarChart3 className="w-8 h-8" />,
    color: colors.secondaryBlue,
    detail: {
      heading: "Measured: Precision at Every Scale",
      body: "MΛVHU deploys a multi-source data collection architecture combining satellite remote sensing, drone-based aerial surveys, IoT field sensors, and structured community data. Every measurement goes through calibration protocols aligned with international climate standards including ISO 14064 and GHG Protocol. Our data pipeline ensures spatial and temporal consistency across millions of hectares, giving clients granular resolution where it matters.",
      points: [
        "Sub-meter resolution drone mapping for field-level precision",
        "Multi-spectral satellite imagery processed at 10m–30m resolution",
        "Real-time atmospheric & soil sensor networks",
        "Temporal baselines enabling year-on-year trend tracking",
      ],
    },
  },
  {
    title: "Verified",
    description: "Rigorous validation to ensure data integrity",
    icon: <CheckCircle className="w-8 h-8" />,
    color: colors.secondaryBlue,
    detail: {
      heading: "Verified: Trust You Can Audit",
      body: "Data without verification is just noise. MΛVHU applies a three-layer verification framework: automated algorithmic checks, cross-source triangulation, and ground-truth field validation. Every dataset carries a full audit trail — timestamp, source, operator, and validation outcome — enabling compliance with UNFCCC reporting, carbon registry standards, and institutional ESG requirements.",
      points: [
        "Algorithmic anomaly detection and cross-dataset reconciliation",
        "Ground-truth field teams operating across 15+ African countries",
        "Full digital audit trails with immutable timestamping",
        "Third-party verification readiness for carbon and ESG markets",
      ],
    },
  },
  {
    title: "Sovereign",
    description: "Locally governed and contextually relevant data",
    icon: <Shield className="w-8 h-8" />,
    color: colors.goldAccent,
    detail: {
      heading: "Sovereign: Africa-Owned Intelligence",
      body: "Data sovereignty means African institutions own, govern, and benefit from their own environmental data. MΛVHU's infrastructure is built so that national governments, regional bodies, and local organisations retain control over their data assets. We reject the model of extractive data collection that funnels African environmental intelligence to foreign platforms — our architecture ensures data stays where it creates value.",
      points: [
        "In-country data hosting options aligned with national data policies",
        "Governance frameworks co-designed with African institutional partners",
        "Open interoperability standards to avoid platform lock-in",
        "Community and government data stewardship models",
      ],
    },
  },
  {
    title: "Local",
    description: "Grounded in African realities to support impactful climate solutions",
    icon: <Map className="w-8 h-8" />,
    color: colors.secondaryBlue,
    detail: {
      heading: "Local: Rooted in African Realities",
      body: "Generic global models fail African contexts. MΛVHU's algorithms and baselines are trained on African datasets — African soils, vegetation types, land-use histories, rainfall patterns, and agro-ecological zones. Our field networks include locally embedded validators and community liaisons who ensure every data point reflects on-the-ground conditions, not theoretical approximations.",
      points: [
        "African-specific soil carbon and biomass estimation models",
        "Agro-ecological zone mapping tailored to Sub-Saharan & East African contexts",
        "Multilingual field data collection tools",
        "Local partner ecosystem spanning farmers, NGOs, and government agencies",
      ],
    },
  },
];

const approachSteps = [
  {
    id: "sky",
    number: "01",
    label: "Data Collection",
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
    borderColor: colors.secondaryBlue,
    route: "/sky",
  },
  {
    id: "earth",
    number: "02",
    label: "Ground Validation",
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
    borderColor: colors.goldAccent,
    route: "/earth",
  },
  {
    id: "ai",
    number: "03",
    label: "Automation & AI",
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
    route: "/ai",
  },
];

const clientsData = [
  {
    title: "Governments & Public Agencies",
    description: "Enabling accurate climate reporting and policy-making",
    icon: <Globe className="w-6 h-6" />,
    detail: {
      heading: "Governments & Public Agencies",
      serves: "Ministries of Environment, National Meteorological Agencies, Environmental Regulatory Bodies, Development Finance Institutions",
      achieves: [
        "Accurate National Greenhouse Gas inventories aligned with UNFCCC reporting requirements",
        "Land-use and deforestation monitoring for national REDD+ compliance",
        "Climate risk assessments for national adaptation plans (NAPs)",
        "Data infrastructure to support sovereign climate commitments and NDC tracking",
      ],
    },
  },
  {
    title: "Financial Institutions",
    description: "Providing verified data for climate finance and investment decisions",
    icon: <TrendingUp className="w-6 h-6" />,
    detail: {
      heading: "Financial Institutions",
      serves: "Development Banks, Impact Investors, Commercial Lenders, Carbon Market Participants, Insurance Providers",
      achieves: [
        "Verified environmental baselines required to unlock carbon credits and blended finance",
        "Portfolio-level climate risk scoring across land and supply chain assets",
        "ESG-linked lending support with auditable environmental performance metrics",
        "Real-time MRV dashboards for climate finance monitoring and reporting",
      ],
    },
  },
  {
    title: "Agricultural Organisations",
    description: "Enhancing resilience and sustainable land management",
    icon: <Leaf className="w-6 h-6" />,
    detail: {
      heading: "Agricultural Organisations",
      serves: "Commodity Traders, Agri-processors, Cooperatives, Off-takers, Certification Bodies",
      achieves: [
        "Traceability and supply chain transparency from farm to export",
        "Smallholder compliance workflows for sustainability certifications",
        "Soil health and carbon stock monitoring for regenerative agriculture programs",
        "Climate-smart advisory data to build farmer resilience",
      ],
    },
  },
  {
    title: "Corporate Clients & ESG Teams",
    description: "Supporting transparency and sustainability goals",
    icon: <Users className="w-6 h-6" />,
    detail: {
      heading: "Corporate Clients & ESG Teams",
      serves: "Multinationals with African Operations, Listed Companies, Sustainability Officers, Supply Chain Teams",
      achieves: [
        "Scope 1, 2, and 3 emissions data for sustainability disclosures",
        "Supply chain environmental due diligence and risk intelligence",
        "ESG dashboard integration for board-level reporting",
        "Compliance readiness for CSRD, ISSB, and other emerging disclosure frameworks",
      ],
    },
  },
];

const servicesData = [
  {
    title: "Verification-as-a-Service (VaaS)",
    description: "MRV workflows, field verification, and carbon market compliance solutions that support project developers, registries, and climate finance stakeholders.",
    useCases: ["carbon credits", "verification", "reporting", "audit trails"],
    icon: <CheckCircle className="w-7 h-7" />,
    color: colors.secondaryBlue,
    hoverDetail: "End-to-end verification infrastructure covering baseline assessment, monitoring protocol design, field data collection, algorithmic cross-validation, and audit-trail generation. Designed to meet Verra VCS, Gold Standard, and UNFCCC MRV requirements.",
    route: "/services/vaas",
  },
  {
    title: "Data & Dashboard Solutions",
    description: "Enterprise-grade ESG dashboards, environmental data feeds, and automated reporting tools for operational and sustainability teams.",
    useCases: ["ESG reporting", "supply-chain monitoring", "risk intelligence"],
    icon: <BarChart3 className="w-7 h-7" />,
    color: colors.goldAccent,
    hoverDetail: "Configurable SaaS dashboards delivering real-time environmental KPIs, automated alert systems, and one-click report generation. Integrates with existing BI stacks via API and supports multi-jurisdiction ESG disclosure formats.",
    route: "/services/dashboard",
  },
  {
    title: "Climate APIs",
    description: "Plug-and-play climate and environmental intelligence APIs for integration into enterprise systems, finance platforms, and digital products.",
    useCases: ["risk scoring", "emissions data", "geospatial layers", "compliance systems"],
    icon: <Database className="w-7 h-7" />,
    color: "#2E7D6B",
    hoverDetail: "RESTful and GraphQL API endpoints covering land-use change, soil carbon, climate risk, MRV status, and ESG metrics. Comprehensive developer documentation, sandbox environment, and enterprise SLAs available.",
    route: "/services/api",
  },
  {
    title: "Farm-Level Compliance & Training",
    description: "Field-level data capture, grower compliance workflows, and training support for smallholder farmer programs and off-taker ecosystems.",
    useCases: ["traceability", "grower onboarding", "field compliance", "regenerative adoption"],
    icon: <Smartphone className="w-7 h-7" />,
    color: colors.secondaryBlue,
    hoverDetail: "Mobile-first farmer data capture tools supporting offline field use, GPS-referenced plot mapping, and compliance checklists. Combined with structured training curricula covering climate-smart practices and digital literacy.",
    route: "/services/farm",
  },
];

const impactTabs = [
  {
    id: "land",
    label: "Resilient Land Systems",
    icon: <TreePine className="w-5 h-5" />,
    heading: "Resilient Land Systems",
    body: "Enabling healthier soils, improved land-use visibility, and climate-smart decision-making across agriculture, mining, and industrial landscapes.",
    stats: [{ value: "50M+", label: "Hectares Monitored" }, { value: "98%", label: "Data Accuracy" }],
    points: [
      "Real-time land-cover change detection across Sub-Saharan Africa",
      "Soil carbon stock assessments supporting regenerative land management",
      "Deforestation early-warning systems for conservation agencies",
      "Land degradation mapping for restoration program targeting",
    ],
    color: colors.secondaryBlue,
  },
  {
    id: "finance",
    label: "Climate Finance Readiness",
    icon: <DollarSign className="w-5 h-5" />,
    heading: "Climate Finance Readiness",
    body: "Providing the verified baselines and automated MRV workflows required to unlock carbon markets, blended finance, and ESG-linked capital.",
    stats: [{ value: "200+", label: "Projects Supported" }, { value: "$2B+", label: "Finance Enabled" }],
    points: [
      "Verified carbon baselines meeting Verra VCS and Gold Standard requirements",
      "Automated MRV reducing project development costs by up to 60%",
      "ESG-linked finance data packages for DFIs and impact investors",
      "Real-time monitoring dashboards for climate bond compliance",
    ],
    color: colors.goldAccent,
  },
  {
    id: "farmers",
    label: "Smallholder Empowerment",
    icon: <Leaf className="w-5 h-5" />,
    heading: "Smallholder Empowerment",
    body: "Strengthening grower ecosystems with plot-level intelligence, compliance workflows, and actionable environmental insights that support resilience and productivity.",
    stats: [{ value: "5000+", label: "Farmers Enrolled" }, { value: "15+", label: "Countries" }],
    points: [
      "Plot-level soil health and productivity intelligence delivered via mobile app",
      "Compliance onboarding workflows for certification and market access",
      "Climate-smart agricultural advisory based on localized data",
      "Income diversification through carbon and ecosystem service programs",
    ],
    color: "#2E7D6B",
  },
  {
    id: "esg",
    label: "Trusted ESG & Reporting",
    icon: <Activity className="w-5 h-5" />,
    heading: "Trusted ESG & Reporting",
    body: "Delivering auditable environmental data and dashboards that improve disclosure quality, risk transparency, and sustainability governance.",
    stats: [{ value: "100+", label: "Organisations" }, { value: "CSRD", label: "Aligned" }],
    points: [
      "Structured data outputs aligned with GRI, ISSB, SASB, and TCFD frameworks",
      "Automated report generation reducing ESG disclosure preparation time",
      "Independent data provenance for third-party audit confidence",
      "Board-ready dashboards with scenario analysis and peer benchmarking",
    ],
    color: colors.secondaryBlue,
  },
];

// ─── Main Component ──────────────────────────────────────────────────────────
const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activePillar, setActivePillar] = useState<number | null>(null);
  const [activeClient, setActiveClient] = useState<number | null>(null);
  const [activeImpactTab, setActiveImpactTab] = useState(0);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [expandedApproach, setExpandedApproach] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => setCurrentSlide((p) => (p + 1) % 3), 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handle = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const themeClasses = {
    bg: colors.lightBackground,
    text: `text-[${colors.primaryDark}]`,
    textSecondary: `text-[${colors.primaryDark}]/80`,
    textMuted: `text-[${colors.primaryDark}]/60`,
    navBg: `${colors.white}/95`,
    cardBg: colors.white,
    cardBgAlt: colors.white,
    border: `border-[${colors.softGrey}]`,
    borderHover: `border-[${colors.secondaryBlue}]/50`,
    backgroundGradient: `bg-gradient-to-br from-[${colors.lightBackground}] via-white to-[${colors.softGrey}]/30`,
    hoverBg: "hover:bg-[#F0F5F5]",
    glowEffect: "shadow-[0_0_20px_rgba(31,92,115,0.1)]",
  };

  return (
    <div
      className="min-h-screen overflow-hidden transition-colors duration-300"
      style={{
        backgroundColor: colors.lightBackground,
        color: colors.primaryDark,
        fontFamily: "'IBM Plex Sans', 'Inter', system-ui, sans-serif",
      }}
    >
      {/* ── Google Font ─────────────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=IBM+Plex+Serif:wght@400;600;700&display=swap');
        * { font-family: 'IBM Plex Sans', 'Inter', system-ui, sans-serif; }
        h1,h2,h3 { font-family: 'IBM Plex Serif', Georgia, serif; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${colors.lightBackground}; }
        ::-webkit-scrollbar-thumb { background: ${colors.secondaryBlue}40; border-radius: 3px; }
        .hover-lift { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .hover-lift:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(18,62,86,0.12); }
        .gradient-text { background: linear-gradient(135deg, ${colors.goldAccent}, #D4A82E); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        @media (max-width: 768px) {
          .hero-text { font-size: 2.8rem !important; }
          .section-title { font-size: 2.2rem !important; }
        }
        @media (max-width: 480px) {
          .hero-text { font-size: 2rem !important; }
          .section-title { font-size: 1.8rem !important; }
        }
      `}</style>

      {/* ── Animated Background ─────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F4FAFA] via-white to-[#DCE7E8]/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(31,92,115,0.06),transparent_55%)]" />
        <div
          className="absolute w-80 h-80 rounded-full blur-3xl transition-all duration-1000 ease-out opacity-40"
          style={{
            left: mousePosition.x - 160,
            top: mousePosition.y - 160,
            background: `radial-gradient(circle, ${colors.secondaryBlue}20, transparent 70%)`,
          }}
        />
      </div>

      {/* ── Navbar ──────────────────────────────────────────────────────── */}
      <Navbar />

      {/* ════════════════════════════════════════════════════════════════════
          HERO SECTION
      ════════════════════════════════════════════════════════════════════ */}
      <section id="hero" className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          {[BackgroundImage1, BackgroundImage2, BackgroundImage3].map((img, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === i ? "opacity-100" : "opacity-0"}`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/75 via-white/55 to-white/75" />
            </div>
          ))}
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            {[
              {
                badge: "MΛVHU: Measured, Verified, Sovereign",
                badgeIcon: <img src={Logo} alt="" className="w-5 h-5 mr-2" />,
                title: "Empowering African",
                accent: "Climate Action",
                sub: "With precise, trustworthy, and locally grounded data.",
                cta1: { label: "Request a Demo", action: () => navigate("/request-demo") },
                cta2: { label: "Partner With Us", action: () => navigate("/contact") },
              },
              {
                badge: "Geospatial Intelligence",
                badgeIcon: <Map className="w-4 h-4 mr-2" style={{ color: colors.secondaryBlue }} />,
                title: "Transforming Climate",
                accent: "Data into Action",
                sub: "Integrating satellite observations, drone imagery, and ground verification for accurate, actionable intelligence.",
                cta1: { label: "Explore Solutions", action: () => scrollTo("what-we-do") },
                cta2: { label: "Our Clients", action: () => scrollTo("who-we-serve") },
              },
              {
                badge: "Trusted & Verified",
                badgeIcon: <Shield className="w-4 h-4 mr-2" style={{ color: colors.secondaryBlue }} />,
                title: "Locally Grounded",
                accent: "African Solutions",
                sub: "Every dataset is rooted in African realities, ensuring impactful climate solutions for the continent.",
                cta1: { label: "View Products", action: () => scrollTo("products") },
                cta2: { label: "Contact Us", action: () => navigate("/contact") },
              },
            ].map((slide, i) => (
              <div
                key={i}
                className={`text-center transition-all duration-1000 ${currentSlide === i ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full absolute inset-0 flex items-center justify-center"}`}
              >
                <div className="max-w-5xl mx-auto">
                  <div
                    className="inline-flex items-center px-4 py-2 rounded-full border backdrop-blur-sm mb-6"
                    style={{
                      background: `linear-gradient(to right, ${colors.secondaryBlue}10, ${colors.goldAccent}10)`,
                      borderColor: `${colors.secondaryBlue}30`,
                    }}
                  >
                    {slide.badgeIcon}
                    <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase" style={{ color: colors.secondaryBlue }}>
                      {slide.badge}
                    </span>
                  </div>

                  <h1
                    className="hero-text font-bold leading-tight mb-6"
                    style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)", color: colors.primaryDark }}
                  >
                    {slide.title}
                    <br />
                    <span className="gradient-text">{slide.accent}</span>
                  </h1>

                  <p className="text-base sm:text-xl mb-8 leading-relaxed max-w-2xl mx-auto" style={{ color: `${colors.primaryDark}CC` }}>
                    {slide.sub}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={slide.cta1.action}
                      className="group relative py-3 sm:py-4 px-8 sm:px-10 rounded-2xl text-base sm:text-lg font-bold transition-all hover:scale-105 shadow-xl overflow-hidden"
                      style={{ background: `linear-gradient(135deg, ${colors.goldAccent}, #D4A82E)`, color: "#fff" }}
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        {slide.cta1.label}
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </button>
                    <button
                      onClick={slide.cta2.action}
                      className="border-2 px-8 sm:px-10 py-3 sm:py-4 rounded-2xl text-base sm:text-lg font-semibold transition-all hover:bg-[#1F5C73]/5"
                      style={{ borderColor: colors.softGrey, color: colors.primaryDark }}
                    >
                      {slide.cta2.label}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${currentSlide === i ? "w-8" : "w-2.5 bg-[#123E56]/30"}`}
              style={{ backgroundColor: currentSlide === i ? colors.goldAccent : undefined }}
            />
          ))}
        </div>

        {/* Nav Arrows */}
        {[
          { dir: "left", action: () => setCurrentSlide((p) => (p - 1 + 3) % 3), cls: "left-4 sm:left-8 rotate-180" },
          { dir: "right", action: () => setCurrentSlide((p) => (p + 1) % 3), cls: "right-4 sm:right-8" },
        ].map((btn) => (
          <button
            key={btn.dir}
            onClick={btn.action}
            className={`absolute ${btn.cls} top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/70 hover:bg-white backdrop-blur-sm border border-[#DCE7E8] hover:border-[#1F5C73]/40 transition-all flex items-center justify-center z-20`}
            style={{ color: colors.primaryDark }}
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        ))}

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-6 right-8 hidden sm:flex flex-col items-center gap-1 opacity-50"
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <span className="text-xs tracking-widest uppercase" style={{ color: colors.primaryDark }}>Scroll</span>
          <ChevronDown className="w-4 h-4" style={{ color: colors.primaryDark }} />
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          WHAT WE DO — Company intro + Pillars
      ════════════════════════════════════════════════════════════════════ */}
      <motion.section
        id="what-we-do"
        className="py-20 sm:py-28 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ── Company intro ── */}
          <div className="text-center mb-16 sm:mb-20">
            <motion.span
              className="inline-block text-xs tracking-[0.2em] uppercase font-semibold mb-4 px-4 py-1.5 rounded-full"
              style={{ color: colors.goldAccent, backgroundColor: `${colors.goldAccent}12`, border: `1px solid ${colors.goldAccent}30` }}
              variants={fadeInUp}
            >
              Who We Are
            </motion.span>
      
            <motion.p
              className="text-base sm:text-lg max-w-3xl mx-auto leading-relaxed"
              style={{ color: `${colors.primaryDark}CC` }}
              variants={fadeInUp}
            >
              <strong>MAvHU is Africa's climate data infrastructure company</strong>, delivering trusted environmental intelligence, automated MRV, and actionable climate insights for land-, emissions-, and supply-chain intensive industries.
            </motion.p>
          </div>

          {/* ── Pillars with hover modals ── */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {pillarsData.map((pillar, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="hover-lift bg-white rounded-2xl p-7 border border-[#DCE7E8] cursor-pointer group relative"
                onClick={() => setActivePillar(idx)}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${pillar.color}12`, border: `1px solid ${pillar.color}25` }}
                >
                  <span style={{ color: pillar.color }}>{pillar.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-[#123E56] mb-3 text-center">{pillar.title}</h3>
                <p className="text-sm text-[#123E56]/65 text-center leading-relaxed">{pillar.description}</p>
                <div className="mt-4 flex justify-center">
                  <span className="text-xs font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: colors.goldAccent }}>
                    Learn more <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── Pillar Detail Modal ── */}
      <AnimatePresence>
        {activePillar !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setActivePillar(null)}>
            <motion.div className="absolute inset-0 bg-black/30 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.div
              className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 z-10"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                onClick={() => setActivePillar(null)}
              >
                <X className="w-4 h-4" style={{ color: colors.primaryDark }} />
              </button>
              <div className="flex items-center mb-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mr-4"
                  style={{ backgroundColor: `${pillarsData[activePillar].color}12`, border: `1px solid ${pillarsData[activePillar].color}25` }}
                >
                  <span style={{ color: pillarsData[activePillar].color }}>{pillarsData[activePillar].icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-[#123E56]">{pillarsData[activePillar].detail.heading}</h3>
              </div>
              <p className="text-sm text-[#123E56]/75 leading-relaxed mb-5">{pillarsData[activePillar].detail.body}</p>
              <ul className="space-y-2.5">
                {pillarsData[activePillar].detail.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[#123E56]/80">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: pillarsData[activePillar].color }} />
                    {pt}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════════════════
          THE CHALLENGE
      ════════════════════════════════════════════════════════════════════ */}
      <motion.section
        id="challenge"
        className="py-20 sm:py-28 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={fadeInUp}
      >
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${colors.secondaryBlue}06 0%, ${colors.goldAccent}06 100%)` }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14">
            <motion.span
              className="inline-block text-xs tracking-[0.2em] uppercase font-semibold mb-4 px-4 py-1.5 rounded-full"
              style={{ color: colors.secondaryBlue, backgroundColor: `${colors.secondaryBlue}10`, border: `1px solid ${colors.secondaryBlue}25` }}
              variants={fadeInUp}
            >
              Context
            </motion.span>
            <motion.h2
              className="section-title font-bold text-[#123E56] mb-6"
              style={{ fontSize: "clamp(1.9rem, 3.5vw, 3.2rem)" }}
              variants={fadeInUp}
            >
              The <span className="gradient-text">Challenge</span>
            </motion.h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div variants={fadeInLeft}>
              <p className="text-base sm:text-lg leading-relaxed mb-6" style={{ color: `${colors.primaryDark}CC` }}>
                Africa is at the epicenter of the global climate crisis — contributing less than 4% of global emissions yet facing disproportionate climate impacts. Despite this, the continent's climate action is chronically under-resourced, partly because of a critical and often invisible problem: <strong style={{ color: colors.primaryDark }}>data.</strong>
              </p>
              <p className="text-base leading-relaxed mb-6" style={{ color: `${colors.primaryDark}AA` }}>
                Across Africa, climate initiatives are hampered by environmental data that is unverified, externally generated, or disconnected from local realities. Without trusted data, climate finance cannot flow, carbon markets cannot function, and policy-makers cannot act with confidence.
              </p>
              <p className="text-base leading-relaxed" style={{ color: `${colors.primaryDark}AA` }}>
                The result is a vicious cycle: inadequate data undermines credibility, credibility gaps reduce finance, and reduced finance limits the capacity to build better data systems. MAvHU exists to break this cycle.
              </p>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { label: "Data Gaps", desc: "80%+ of African land lacks verified environmental baselines", icon: <Database className="w-5 h-5" />, color: colors.secondaryBlue },
                { label: "Finance Barrier", desc: "Lack of MRV infrastructure blocks billions in climate finance annually", icon: <DollarSign className="w-5 h-5" />, color: colors.goldAccent },
                { label: "Sovereignty Risk", desc: "Most African environmental data is held on foreign platforms", icon: <Shield className="w-5 h-5" />, color: "#2E7D6B" },
                { label: "Local Disconnect", desc: "Global models often fail to reflect African agro-ecological realities", icon: <Map className="w-5 h-5" />, color: colors.secondaryBlue },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={cardVariants}
                  className="hover-lift bg-white rounded-xl p-5 border border-[#DCE7E8]"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: `${item.color}12` }}>
                      <span style={{ color: item.color }}>{item.icon}</span>
                    </div>
                    <span className="font-semibold text-sm" style={{ color: colors.primaryDark }}>{item.label}</span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: `${colors.primaryDark}80` }}>{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ════════════════════════════════════════════════════════════════════
          OUR APPROACH
      ════════════════════════════════════════════════════════════════════ */}
      <motion.section
        id="approach"
        className="py-20 sm:py-28 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <motion.span
              className="inline-block text-xs tracking-[0.2em] uppercase font-semibold mb-4 px-4 py-1.5 rounded-full"
              style={{ color: colors.goldAccent, backgroundColor: `${colors.goldAccent}12`, border: `1px solid ${colors.goldAccent}30` }}
              variants={fadeInUp}
            >
              How We Work
            </motion.span>
            <motion.h2
              className="section-title font-bold text-[#123E56] mb-4"
              style={{ fontSize: "clamp(1.9rem, 3.5vw, 3.2rem)" }}
              variants={fadeInUp}
            >
              Our <span className="gradient-text">Approach</span>
            </motion.h2>
            <motion.p
              className="text-base sm:text-lg max-w-2xl mx-auto"
              style={{ color: `${colors.primaryDark}AA` }}
              variants={fadeInUp}
            >
              A three-layer infrastructure that captures, validates, and automates environmental intelligence at scale.
            </motion.p>
          </div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-7"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {approachSteps.map((step, idx) => (
              <motion.div
                key={step.id}
                variants={cardVariants}
                className="rounded-2xl overflow-hidden border cursor-pointer group transition-all duration-300"
                style={{
                  backgroundColor: step.bgColor,
                  borderColor: expandedApproach === idx ? step.borderColor : "#DCE7E8",
                  boxShadow: expandedApproach === idx ? `0 12px 40px ${step.color}25` : "0 4px 16px rgba(18,62,86,0.06)",
                }}
                onClick={() => setExpandedApproach(expandedApproach === idx ? null : idx)}
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${step.bgColor}CC, transparent)` }} />
                  <div
                    className="absolute top-4 left-4 w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-lg"
                    style={{ backgroundColor: step.color }}
                  >
                    {step.number}
                  </div>
                  <div className="absolute top-4 right-4">
                    <span
                      className="text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full text-white"
                      style={{ backgroundColor: `${step.color}CC`, backdropFilter: "blur(4px)" }}
                    >
                      {step.label}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2" style={{ color: colors.primaryDark }}>{step.title}</h3>
                  <p className="text-sm mb-4" style={{ color: `${colors.primaryDark}99` }}>{step.description}</p>

                  <AnimatePresence>
                    {expandedApproach === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="overflow-hidden"
                      >
                        <ul className="space-y-2 mb-5">
                          {step.details.map((d, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm" style={{ color: `${colors.primaryDark}BB` }}>
                              <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: step.color }} />
                              {d}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: `${step.borderColor}30` }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); navigate(step.route); }}
                      className="text-sm font-semibold flex items-center gap-1 hover:gap-2.5 transition-all"
                      style={{ color: step.color }}
                    >
                      Learn more <ChevronRight className="w-4 h-4" />
                    </button>
                    <button className="text-xs font-medium opacity-60" style={{ color: colors.primaryDark }}>
                      {expandedApproach === idx ? "Less ↑" : "Details ↓"}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ════════════════════════════════════════════════════════════════════
          WHO WE SERVE
      ════════════════════════════════════════════════════════════════════ */}
      <motion.section
        id="who-we-serve"
        className="py-20 sm:py-28 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={fadeInUp}
      >
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${colors.secondaryBlue}05 0%, ${colors.goldAccent}05 100%)` }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14">
            <motion.span
              className="inline-block text-xs tracking-[0.2em] uppercase font-semibold mb-4 px-4 py-1.5 rounded-full"
              style={{ color: colors.secondaryBlue, backgroundColor: `${colors.secondaryBlue}10`, border: `1px solid ${colors.secondaryBlue}25` }}
              variants={fadeInUp}
            >
              Clients & Partners
            </motion.span>
            <motion.h2
              className="section-title font-bold text-[#123E56] mb-4"
              style={{ fontSize: "clamp(1.9rem, 3.5vw, 3.2rem)" }}
              variants={fadeInUp}
            >
              Who We <span className="gradient-text">Serve</span>
            </motion.h2>
            <motion.p
              className="text-base sm:text-lg max-w-2xl mx-auto"
              style={{ color: `${colors.primaryDark}AA` }}
              variants={fadeInUp}
            >
              Click any client type to learn more about how MAvHU delivers value.
            </motion.p>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {clientsData.map((client, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="hover-lift bg-white rounded-2xl p-6 border border-[#DCE7E8] cursor-pointer group"
                onClick={() => setActiveClient(idx)}
              >
                <div
                  className="p-3 rounded-xl mb-4 inline-block group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${colors.secondaryBlue}10`, border: `1px solid ${colors.secondaryBlue}20` }}
                >
                  <span style={{ color: colors.secondaryBlue }}>{client.icon}</span>
                </div>
                <h4 className="font-bold text-base mb-2" style={{ color: colors.primaryDark }}>{client.title}</h4>
                <p className="text-xs leading-relaxed mb-4" style={{ color: `${colors.primaryDark}70` }}>{client.description}</p>
                <span className="text-xs font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: colors.goldAccent }}>
                  View details <ChevronRight className="w-3 h-3" />
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── Client Detail Modal ── */}
      <AnimatePresence>
        {activeClient !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setActiveClient(null)}>
            <motion.div className="absolute inset-0 bg-black/30 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.div
              className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 z-10 max-h-[90vh] overflow-y-auto"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                onClick={() => setActiveClient(null)}
              >
                <X className="w-4 h-4" style={{ color: colors.primaryDark }} />
              </button>
              <div className="flex items-center mb-5">
                <div className="p-3 rounded-xl mr-4" style={{ backgroundColor: `${colors.secondaryBlue}10` }}>
                  <span style={{ color: colors.secondaryBlue }}>{clientsData[activeClient].icon}</span>
                </div>
                <h3 className="text-xl font-bold text-[#123E56]">{clientsData[activeClient].detail.heading}</h3>
              </div>
              <div className="mb-4">
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: colors.goldAccent }}>Who This Serves</span>
                <p className="text-sm mt-1" style={{ color: `${colors.primaryDark}AA` }}>{clientsData[activeClient].detail.serves}</p>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: colors.goldAccent }}>What We Help Achieve</span>
                <ul className="mt-3 space-y-2.5">
                  {clientsData[activeClient].detail.achieves.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: `${colors.primaryDark}BB` }}>
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: colors.secondaryBlue }} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════════════════
          ABOUT — Mission & Vision
      ════════════════════════════════════════════════════════════════════ */}
      <motion.section
        id="about"
        className="py-20 sm:py-28 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <motion.span
              className="inline-block text-xs tracking-[0.2em] uppercase font-semibold mb-4 px-4 py-1.5 rounded-full"
              style={{ color: colors.goldAccent, backgroundColor: `${colors.goldAccent}12`, border: `1px solid ${colors.goldAccent}30` }}
              variants={fadeInUp}
            >
              About MAvHU
            </motion.span>
            <motion.h2
              className="section-title font-bold text-[#123E56] mb-4"
              style={{ fontSize: "clamp(1.9rem, 3.5vw, 3.2rem)" }}
              variants={fadeInUp}
            >
              About <span className="gradient-text">Us</span>
            </motion.h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-14">
            {/* Who We Are */}
            <motion.div
              variants={fadeInLeft}
              className="lg:col-span-1 bg-white rounded-2xl p-8 border border-[#DCE7E8] shadow-lg hover-lift"
            >
              <h3 className="text-xl font-bold mb-4" style={{ color: colors.primaryDark }}>Who We Are</h3>
              <p className="text-sm leading-relaxed" style={{ color: `${colors.primaryDark}BB` }}>
                MΛVHU is a pioneering climate data company dedicated to empowering African climate action through accurate, verified, and localized data. We are a team of environmental scientists, data engineers, geospatial analysts, and field practitioners united by a conviction: Africa's climate future must be built on Africa's own data.
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-2xl p-8 border shadow-lg hover-lift"
              style={{ borderColor: `${colors.secondaryBlue}30` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl" style={{ backgroundColor: `${colors.secondaryBlue}12` }}>
                  <Target className="w-5 h-5" style={{ color: colors.secondaryBlue }} />
                </div>
                <h3 className="text-xl font-bold" style={{ color: colors.primaryDark }}>Mission</h3>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: `${colors.primaryDark}BB` }}>
                To make climate action across Africa <strong>measurable, verifiable, and investable</strong> through sovereign, localized, and automated environmental data infrastructure.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              variants={fadeInRight}
              className="bg-white rounded-2xl p-8 border shadow-lg hover-lift"
              style={{ borderColor: `${colors.goldAccent}30` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl" style={{ backgroundColor: `${colors.goldAccent}12` }}>
                  <Eye className="w-5 h-5" style={{ color: colors.goldAccent }} />
                </div>
                <h3 className="text-xl font-bold" style={{ color: colors.primaryDark }}>Vision</h3>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: `${colors.primaryDark}BB` }}>
                To become <strong>Africa's leading climate intelligence infrastructure platform</strong>, enabling resilient industries, trusted climate finance, and data-driven sustainability outcomes at scale.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ════════════════════════════════════════════════════════════════════
          PRODUCTS & SERVICES
      ════════════════════════════════════════════════════════════════════ */}
      <motion.section
        id="products"
        className="py-20 sm:py-28 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={fadeInUp}
      >
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent, ${colors.secondaryBlue}04)` }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14">
            <motion.span
              className="inline-block text-xs tracking-[0.2em] uppercase font-semibold mb-4 px-4 py-1.5 rounded-full"
              style={{ color: colors.secondaryBlue, backgroundColor: `${colors.secondaryBlue}10`, border: `1px solid ${colors.secondaryBlue}25` }}
              variants={fadeInUp}
            >
              Products & Services
            </motion.span>
            <motion.h2
              className="section-title font-bold text-[#123E56] mb-4"
              style={{ fontSize: "clamp(1.9rem, 3.5vw, 3.2rem)" }}
              variants={fadeInUp}
            >
              Products & <span className="gradient-text">Services</span>
            </motion.h2>
          </div>

          {/* ── 3 main product cards ── */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {[
              {
                title: "ESG & Climate Intelligence Dashboard",
                description: "Built for financial institutions, corporates, governments, and climate project developers who require trusted climate and sustainability data for decision-making and reporting.",
                features: ["Monitor climate indicators", "Track verified outcomes", "Support ESG disclosures", "Audit-ready reports"],
                icon: <BarChart3 className="w-7 h-7" />,
                color: colors.secondaryBlue,
                cta: "Learn More",
                route: "/products",
              },
              {
                title: "Farmer App",
                description: "Designed for farmers, cooperatives, and field teams participating in climate, sustainability, or agricultural programmes.",
                features: ["Capture farm-level data", "Support compliance", "Localized climate insights", "Secure data integration"],
                icon: <Smartphone className="w-7 h-7" />,
                color: colors.secondaryBlue,
                cta: "Learn More",
                route: "/products",
              },
              {
                title: "Climate Data APIs",
                description: "Secure, enterprise-grade climate data APIs that enable organisations to integrate verified, locally grounded climate intelligence directly into their systems.",
                features: ["Enterprise-grade security", "Real-time data access", "Multiple API endpoints", "Comprehensive documentation"],
                icon: <Database className="w-7 h-7" />,
                color: colors.goldAccent,
                cta: "Request Demo",
                route: "/request-demo",
              },
            ].map((product, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="hover-lift bg-white rounded-2xl border border-[#DCE7E8] overflow-hidden flex flex-col"
              >
                <div className="p-7 flex-1">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2.5 rounded-xl" style={{ backgroundColor: `${product.color}12`, border: `1px solid ${product.color}20` }}>
                      <span style={{ color: product.color }}>{product.icon}</span>
                    </div>
                    <h3 className="font-bold text-base leading-tight" style={{ color: colors.primaryDark }}>{product.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: `${colors.primaryDark}BB` }}>{product.description}</p>
                  <ul className="space-y-2">
                    {product.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm" style={{ color: `${colors.primaryDark}80` }}>
                        <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: product.color }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-5 pt-0">
                  <button
                    onClick={() => navigate(product.route)}
                    className="w-full py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90 text-white"
                    style={{ background: `linear-gradient(135deg, ${product.color}, ${product.color === colors.goldAccent ? "#D4A82E" : "#1A4E63"})` }}
                  >
                    {product.cta}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Our Services ── */}
          <div className="mb-16">
            <motion.h3
              className="text-2xl sm:text-3xl font-bold text-[#123E56] mb-10 text-center"
              variants={fadeInUp}
            >
              Our <span className="gradient-text">Services</span>
            </motion.h3>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
            >
              {servicesData.map((service, idx) => (
                <motion.div
                  key={idx}
                  variants={cardVariants}
                  className="relative bg-white rounded-2xl border border-[#DCE7E8] overflow-hidden cursor-pointer group transition-all duration-300"
                  style={{ boxShadow: hoveredService === idx ? `0 16px 40px ${service.color}20` : "0 4px 16px rgba(18,62,86,0.05)" }}
                  onMouseEnter={() => setHoveredService(idx)}
                  onMouseLeave={() => setHoveredService(null)}
                  onClick={() => navigate(service.route)}
                >
                  <div className="p-7">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-2.5 rounded-xl flex-shrink-0 group-hover:scale-110 transition-transform" style={{ backgroundColor: `${service.color}12`, border: `1px solid ${service.color}20` }}>
                        <span style={{ color: service.color }}>{service.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-base mb-1" style={{ color: colors.primaryDark }}>{service.title}</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {service.useCases.map((uc, i) => (
                            <span key={i} className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: `${service.color}10`, color: service.color }}>
                              {uc}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: `${colors.primaryDark}BB` }}>{service.description}</p>

                    <AnimatePresence>
                      {hoveredService === idx && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden mt-4 pt-4"
                          style={{ borderTop: `1px solid ${service.color}20` }}
                        >
                          <p className="text-xs leading-relaxed" style={{ color: `${colors.primaryDark}99` }}>{service.hoverDetail}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div
                    className="px-7 py-3 flex items-center justify-between text-sm font-semibold"
                    style={{ backgroundColor: `${service.color}06`, borderTop: `1px solid ${service.color}15`, color: service.color }}
                  >
                    <span>Learn more</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── Training block ── */}
          <motion.div
            className="bg-white rounded-2xl border border-[#DCE7E8] p-8 shadow-lg"
            variants={fadeInUp}
            whileHover={{ boxShadow: "0 20px 50px rgba(18,62,86,0.1)" }}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl" style={{ backgroundColor: `${colors.goldAccent}12`, border: `1px solid ${colors.goldAccent}20` }}>
                    <BookOpen className="w-6 h-6" style={{ color: colors.goldAccent }} />
                  </div>
                  <h3 className="text-2xl font-bold" style={{ color: colors.primaryDark }}>Training & Capacity Building</h3>
                </div>
                <p className="text-sm leading-relaxed mb-5" style={{ color: `${colors.primaryDark}BB` }}>
                  MAvHU's training services support farmers, agricultural organisations, institutions, and implementation partners involved in climate and sustainability initiatives.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {["Strengthen farm-level compliance", "Improve data collection practices", "Build understanding of climate standards", "Enhance verification and MRV systems"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm" style={{ color: `${colors.primaryDark}80` }}>
                      <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: colors.secondaryBlue }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate("/training")}
                  className="mt-5 inline-flex items-center gap-2 font-semibold text-sm hover:gap-3 transition-all"
                  style={{ color: colors.secondaryBlue }}
                >
                  Learn About Our Training Programs <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-row md:flex-col gap-8 md:gap-6">
                {[{ n: "100+", l: "Organisations Trained" }, { n: "5000+", l: "Individuals Empowered" }].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold gradient-text">{s.n}</div>
                    <div className="text-xs mt-1 font-medium" style={{ color: `${colors.primaryDark}70` }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ════════════════════════════════════════════════════════════════════
          OUR IMPACT — Tabbed
      ════════════════════════════════════════════════════════════════════ */}
      <motion.section
        id="impact"
        className="py-20 sm:py-28 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={fadeInUp}
      >
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${colors.secondaryBlue}07 0%, ${colors.goldAccent}07 100%)` }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14">
            <motion.span
              className="inline-block text-xs tracking-[0.2em] uppercase font-semibold mb-4 px-4 py-1.5 rounded-full"
              style={{ color: colors.goldAccent, backgroundColor: `${colors.goldAccent}12`, border: `1px solid ${colors.goldAccent}30` }}
              variants={fadeInUp}
            >
              Impact Areas
            </motion.span>
            <motion.h2
              className="section-title font-bold text-[#123E56] mb-4"
              style={{ fontSize: "clamp(1.9rem, 3.5vw, 3.2rem)" }}
              variants={fadeInUp}
            >
              Our <span className="gradient-text">Impact</span>
            </motion.h2>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {impactTabs.map((tab, idx) => (
              <button
                key={tab.id}
                onClick={() => setActiveImpactTab(idx)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${activeImpactTab === idx ? "text-white shadow-md" : "bg-white border border-[#DCE7E8] hover:border-[#1F5C73]/30"}`}
                style={{
                  backgroundColor: activeImpactTab === idx ? tab.color : undefined,
                  color: activeImpactTab === idx ? "#fff" : colors.primaryDark,
                }}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImpactTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="bg-white rounded-2xl border border-[#DCE7E8] p-7 sm:p-10 shadow-lg"
            >
              <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: colors.primaryDark }}>
                    {impactTabs[activeImpactTab].heading}
                  </h3>
                  <p className="text-base sm:text-lg leading-relaxed mb-6" style={{ color: `${colors.primaryDark}BB` }}>
                    {impactTabs[activeImpactTab].body}
                  </p>
                  <ul className="space-y-3">
                    {impactTabs[activeImpactTab].points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm" style={{ color: `${colors.primaryDark}BB` }}>
                        <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: impactTabs[activeImpactTab].color }} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-row lg:flex-col gap-6">
                  {impactTabs[activeImpactTab].stats.map((s, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-xl p-5 text-center"
                      style={{ backgroundColor: `${impactTabs[activeImpactTab].color}10`, border: `1px solid ${impactTabs[activeImpactTab].color}20` }}
                    >
                      <div className="text-3xl sm:text-4xl font-bold mb-1" style={{ color: impactTabs[activeImpactTab].color }}>{s.value}</div>
                      <div className="text-xs font-medium" style={{ color: `${colors.primaryDark}80` }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Overall stats bar */}
          {/* <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-5 mt-10"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { number: "200+", label: "Projects Monitored", icon: <Eye className="w-5 h-5" /> },
              { number: "50M+", label: "Hectares Covered", icon: <Map className="w-5 h-5" /> },
              { number: "98%", label: "Data Accuracy", icon: <CheckCircle className="w-5 h-5" /> },
              { number: "15+", label: "African Countries", icon: <Globe className="w-5 h-5" /> },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                className="hover-lift bg-white rounded-2xl p-5 sm:p-7 border border-[#DCE7E8] text-center"
              >
                <div className="flex justify-center mb-3" style={{ color: colors.secondaryBlue }}>{stat.icon}</div>
                <div className="text-2xl sm:text-4xl font-bold mb-1 gradient-text">{stat.number}</div>
                <div className="text-xs font-medium" style={{ color: `${colors.primaryDark}70` }}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div> */}
        </div>
      </motion.section>

      {/* ════════════════════════════════════════════════════════════════════
          CTA
      ════════════════════════════════════════════════════════════════════ */}
      <motion.section
        className="py-24 sm:py-32 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={fadeInUp}
      >
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${colors.secondaryBlue}10 0%, ${colors.goldAccent}10 100%)` }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h2
            className="font-bold text-[#123E56] mb-6"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            variants={fadeInUp}
          >
            Ready to Transform
            <br />
            <span className="gradient-text">African Climate Action?</span>
          </motion.h2>
          <motion.p
            className="text-base sm:text-xl mb-10 leading-relaxed max-w-2xl mx-auto"
            style={{ color: `${colors.primaryDark}CC` }}
            variants={fadeInUp}
          >
            Join governments, financial institutions, and organizations across Africa who trust MAvHU for accurate, verified climate intelligence.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-5 justify-center"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.button
              variants={cardVariants}
              whileHover={{ scale: 1.04 }}
              onClick={() => navigate("/request-demo")}
              className="group py-4 rounded-2xl text-base sm:text-lg font-bold shadow-xl overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${colors.goldAccent}, #D4A82E)`, color: "#fff" }}
            >
              <span className="flex items-center justify-center px-10">
                Request a Demo
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
            <motion.button
              variants={cardVariants}
              whileHover={{ scale: 1.04 }}
              onClick={() => navigate("/contact")}
              className="border-2 px-10 py-4 rounded-2xl text-base sm:text-lg font-semibold transition-all hover:bg-[#1F5C73]/5"
              style={{ borderColor: colors.softGrey, color: colors.primaryDark }}
            >
              Partner With Us
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <Footer isDarkMode={false} themeClasses={themeClasses} />
    </div>
  );
};

export default LandingPage;