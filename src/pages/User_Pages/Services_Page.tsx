import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom"; // ✅ ADD THIS LINE

import {
  Database,
  Smartphone,
  BarChart3,

  Shield,
  CheckCircle,

  ArrowRight,

  Layers,
  CloudRain,
  Navigation,
  Activity,

  ChevronRight,
  Globe,
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

// Services data (matching the landing page)
const servicesData = [
  {
    title: "Verification-as-a-Service (VaaS)",
    description:
      "MRV workflows, field verification, and carbon market compliance solutions that support project developers, registries, and climate finance stakeholders.",
    useCases: ["carbon credits", "verification", "reporting", "audit trails"],
    icon: <CheckCircle className="w-7 h-7" />,
    color: colors.secondaryBlue,
    hoverDetail:
      "End-to-end verification infrastructure covering baseline assessment, monitoring protocol design, field data collection, algorithmic cross-validation, and audit-trail generation. Designed to meet Verra VCS, Gold Standard, and UNFCCC MRV requirements.",
    route: "/services/vaas",
  },
  {
    title: "Data & Dashboard Solutions",
    description:
      "Enterprise-grade ESG dashboards, environmental data feeds, and automated reporting tools for operational and sustainability teams.",
    useCases: ["ESG reporting", "supply-chain monitoring", "risk intelligence"],
    icon: <BarChart3 className="w-7 h-7" />,
    color: colors.goldAccent,
    hoverDetail:
      "Configurable SaaS dashboards delivering real-time environmental KPIs, automated alert systems, and one-click report generation. Integrates with existing BI stacks via API and supports multi-jurisdiction ESG disclosure formats.",
    route: "/services/dashboard",
  },
  {
    title: "Climate APIs",
    description:
      "Plug-and-play climate and environmental intelligence APIs for integration into enterprise systems, finance platforms, and digital products.",
    useCases: ["risk scoring", "emissions data", "geospatial layers", "compliance systems"],
    icon: <Database className="w-7 h-7" />,
    color: "#2E7D6B",
    hoverDetail:
      "RESTful and GraphQL API endpoints covering land-use change, soil carbon, climate risk, MRV status, and ESG metrics. Comprehensive developer documentation, sandbox environment, and enterprise SLAs available.",
    route: "/services/api",
  },
  {
    title: "Farm-Level Compliance & Training",
    description:
      "Field-level data capture, grower compliance workflows, and training support for smallholder farmer programs and off-taker ecosystems.",
    useCases: ["traceability", "grower onboarding", "field compliance", "regenerative adoption"],
    icon: <Smartphone className="w-7 h-7" />,
    color: colors.secondaryBlue,
    hoverDetail:
      "Mobile-first farmer data capture tools supporting offline field use, GPS-referenced plot mapping, and compliance checklists. Combined with structured training curricula covering climate-smart practices and digital literacy.",
    route: "/services/farm",
  },
];

// Approach steps (MAVHU Model)


const distributionChannels = [
  { name: "Government", icon: <Shield className="w-5 h-5" />, color: "#1F5C73" },
  { name: "Financial Institutions", icon: <BarChart3 className="w-5 h-5" />, color: "#B89A2F" },
  { name: "Enterprises", icon: <Database className="w-5 h-5" />, color: "#2E7D6B" },
  { name: "Farmers", icon: <Smartphone className="w-5 h-5" />, color: "#7A5C2E" },
  { name: "Carbon Developers", icon: <Globe className="w-5 h-5" />, color: "#123E56" },
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const breathingFloat = {
  animate: {
    y: [0, -12, 0],
    scale: [1, 1.04, 1],
    transition: { duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "loop" as const },
  },
};

const ServicesPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
      {/* Animated Background */}
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


      {/* Services Section (using servicesData from landing page) */}
      <motion.section
        className="py-20 relative"
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
              Click any service to explore detailed information
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {servicesData.map((service, idx) => (
              <motion.div
                key={service.title}
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
                      <h3 className="font-bold text-xl mb-1" style={{ color: colors.primaryDark }}>{service.title}</h3>
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

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,100..900;1,100..900&display=swap');
        * { font-family: 'Inter', system-ui, sans-serif; }
        button { transition: all 0.3s ease; }
      `}</style>
    </div>
  );
};

export default ServicesPage;