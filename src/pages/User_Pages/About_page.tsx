import React from "react";
import {
  Globe,
  Shield,
  ArrowRight,
  CheckCircle,
  Map,
  BarChart3,
  Cpu,
  Target,
  Eye,
  Database,
  TrendingUp,
  Satellite,
  HardDrive,
  MapPin,
  Phone,
  Mail,
  Smartphone,
  Cloud,
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";

// Import model images (same as ServicesPage)
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
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Breathing animation for images
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

const AboutPage = () => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e: { clientX: any; clientY: any }) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Values (Measured, Verified, Sovereign, Local)
  const values = [
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Measured",
      description: "Precise data collection from multiple high-tech sources",
      color: colors.secondaryBlue,
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Verified",
      description: "Rigorous validation to ensure data integrity",
      color: colors.secondaryBlue,
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Sovereign",
      description: "Locally governed and contextually relevant data",
      color: colors.goldAccent,
    },
    {
      icon: <Map className="w-8 h-8" />,
      title: "Local",
      description: "Grounded in African realities for impactful solutions",
      color: colors.secondaryBlue,
    },
  ];

  // Approach data (original three cards)
  const approach = [
    {
      title: "MAVHU Sky",
      description:
        "Satellite, drone, and geospatial intelligence for continuous land-use, vegetation, and climate monitoring across estates and supply chains.",
      icon: <Satellite className="w-8 h-8" />,
      bgColor: "#EAF4F8",
      borderColor: "#2F6F8F",
      textColor: colors.secondaryBlue,
    },
    {
      title: "MAVHU Earth",
      description:
        "Field-based verification and soil intelligence workflows that ground-truth remote sensing data and ensure locally accurate baselines.",
      icon: <Map className="w-8 h-8" />,
      bgColor: "#F9F4E6",
      borderColor: "#B58E2D",
      textColor: colors.goldAccent,
    },
    {
      title: "MAVHU AI",
      description:
        "Machine learning and automated MRV pipelines that transform raw environmental data into auditable climate reports, risk signals, and decision-ready insights.",
      icon: <HardDrive className="w-8 h-8" />,
      bgColor: "#EAF6F2",
      borderColor: "#2E7D6B",
      textColor: "#2E7D6B",
    },
  ];

  // MAVHU Model steps (4 steps, no arrows)
  const modelSteps = [
    {
      id: "sky",
      number: "01",
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
    },
    {
      id: "earth",
      number: "02",
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
    },
    {
      id: "ai",
      number: "03",
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
    },
    {
      id: "distribution",
      number: "04",
      label: "Distribution",
      title: "Stakeholders",
      description: "Delivering intelligence to key stakeholders",
      details: [
        "Government agencies for climate policy",
        "Financial institutions for risk assessment",
        "Enterprises for ESG reporting",
        "Farmers for field-level insights",
        "Carbon developers for verified credits",
      ],
      image: null,
      color: colors.primaryDark,
      bgColor: "#F4FAFA",
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
      className={`min-h-screen bg-[${colors.lightBackground}] text-[${colors.primaryDark}] overflow-hidden transition-colors duration-300 font-['Inter',system-ui,sans-serif]`}
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
      <div className="fixed inset-0 bg-gradient-to-br from-[#F4FAFA] via-white to-[#DCE7E8]/20 transition-all duration-300">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(31,92,115,0.08),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(184,154,47,0.06),transparent_50%)]"></div>
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            background: `radial-gradient(circle, ${colors.secondaryBlue}15, transparent 70%)`,
          }}
        ></div>
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
              About
              <span style={{ color: colors.goldAccent }}> MAVHU</span>
            </h1>
            <p className="text-xl text-[#123E56]/80 leading-relaxed max-w-4xl mx-auto">
              MAVHU is Africa's climate data infrastructure company, building verified, sovereign,
              and locally grounded environmental intelligence systems for agriculture, carbon markets,
              and supply chains.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Mission & Vision Section */}
      <motion.section
        className="py-16 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              variants={cardVariants}
              className="bg-white backdrop-blur-xl rounded-3xl p-8 border border-[#DCE7E8] hover:border-[#1F5C73]/40 transition-all duration-300 shadow-xl shadow-gray-200/50"
            >
              <div className="flex items-center mb-6">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center mr-6"
                  style={{
                    backgroundColor: `${colors.secondaryBlue}10`,
                    border: `1px solid ${colors.secondaryBlue}20`,
                  }}
                >
                  <Target className="w-8 h-8" style={{ color: colors.secondaryBlue }} />
                </div>
                <h2 className="text-3xl font-bold text-[#123E56]">Our Mission</h2>
              </div>
              <p className="text-[#123E56]/80 leading-relaxed mb-6 text-lg">
                To make climate action across Africa measurable, verifiable, and sovereign
                through infrastructure-grade data systems rooted in local ecosystems,
                institutions, and commodity value chains.
              </p>
            </motion.div>

            <motion.div
              variants={cardVariants}
              className="bg-white backdrop-blur-xl rounded-3xl p-8 border border-[#DCE7E8] hover:border-[#1F5C73]/40 transition-all duration-300 shadow-xl shadow-gray-200/50"
            >
              <div className="flex items-center mb-6">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center mr-6"
                  style={{
                    backgroundColor: `${colors.goldAccent}10`,
                    border: `1px solid ${colors.goldAccent}20`,
                  }}
                >
                  <Globe className="w-8 h-8" style={{ color: colors.goldAccent }} />
                </div>
                <h2 className="text-3xl font-bold text-[#123E56]">Our Vision</h2>
              </div>
              <p className="text-[#123E56]/80 leading-relaxed mb-6 text-lg">
                To become Africa's trusted climate data partner, enabling transparent,
                data-driven climate action across the continent.
              </p>
              <p className="text-[#123E56]/60 leading-relaxed">
                We envision a future where every climate initiative in Africa is backed by
                verified, localized data that builds trust, attracts investment, and ensures
                sustainable impact for generations to come.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* The Challenge Section */}
      <motion.section
        className="py-16 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, ${colors.secondaryBlue}05, ${colors.goldAccent}05)`,
          }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-[#123E56] mb-6">
              The
              <span style={{ color: colors.goldAccent }}> Challenge</span>
            </h2>
          </div>

          <div className="bg-white backdrop-blur-xl rounded-3xl p-8 border border-[#DCE7E8] shadow-xl shadow-gray-200/50">
            <div className="flex items-start mb-8">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mr-6 flex-shrink-0"
                style={{
                  backgroundColor: `${colors.secondaryBlue}10`,
                  border: `1px solid ${colors.secondaryBlue}20`,
                }}
              >
                <Eye className="w-6 h-6" style={{ color: colors.secondaryBlue }} />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-[#123E56] mb-4">The Problem</h3>
                <p className="text-[#123E56]/80 leading-relaxed text-lg">
                  Across Africa, climate action is often constrained by fragmented, unverifiable,
                  and externally sourced datasets that do not adequately reflect local land realities.
                  This weakens climate finance integrity, slows adaptation planning, and limits
                  enterprise decision-making.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {[
                {
                  title: "Data Fragmentation",
                  description: "Disconnected data sources with no standardized collection methods",
                  icon: <Database className="w-6 h-6" />,
                },
                {
                  title: "Verification Gaps",
                  description: "Limited ground-truth validation leads to questionable data quality",
                  icon: <CheckCircle className="w-6 h-6" />,
                },
                {
                  title: "Investment Barriers",
                  description: "Unverified data creates uncertainty for climate finance",
                  icon: <TrendingUp className="w-6 h-6" />,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-xl rounded-xl p-6 border border-[#DCE7E8] transition-all duration-300 hover:border-[#1F5C73]/40"
                >
                  <div className="flex items-center mb-4">
                    <div
                      className="p-2 rounded-lg mr-3"
                      style={{
                        backgroundColor: `${colors.secondaryBlue}10`,
                        border: `1px solid ${colors.secondaryBlue}20`,
                      }}
                    >
                      <div style={{ color: colors.secondaryBlue }}>{item.icon}</div>
                    </div>
                    <h4 className="text-lg font-semibold text-[#123E56]">{item.title}</h4>
                  </div>
                  <p className="text-[#123E56]/60 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>



      {/* MAVHU Model Section (numbered steps, no arrows) */}
      <motion.section
        className="py-24 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-[#123E56] mb-4">
              The <span style={{ color: colors.goldAccent }}>MAVHU</span> Model
            </h2>
            <p className="text-xl text-[#123E56]/80 max-w-3xl mx-auto">
              A four‑stage integrated pipeline — from sky to stakeholder — powered by intelligent automation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {modelSteps.map((step) => (
              <motion.div
                key={step.id}
                variants={cardVariants}
                className="rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl bg-white border border-[#DCE7E8]"
              >
                <div
                  className="p-6"
                  style={{ background: step.bgColor }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-white"
                      style={{ background: step.color }}
                    >
                      {step.number}
                    </div>
                    <div
                      className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest"
                      style={{ background: `${step.color}15`, color: step.color }}
                    >
                      {step.label}
                    </div>
                  </div>

                  {step.image ? (
                    <div className="flex justify-center my-4">
                      <motion.img
                        {...breathingFloat}
                        src={step.image}
                        alt={step.title}
                        className="w-32 h-32 object-contain"
                        style={{ filter: `drop-shadow(0 8px 24px ${step.color}40)` }}
                      />
                    </div>
                  ) : (
                    // Distribution step: show stakeholder icons
                    <div className="grid grid-cols-3 gap-3 my-4">
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
                  )}

                  <h3 className="text-xl font-bold mt-2 mb-1" style={{ color: step.color }}>
                    {step.title}
                  </h3>
                  <p className="text-xs uppercase font-semibold tracking-widest mb-4 text-[#123E56]/60">
                    {step.description}
                  </p>
                  <ul className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-[#123E56]/70">
                        <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: step.color }} />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Our Values Section */}
      <motion.section
        className="py-24 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, transparent, ${colors.secondaryBlue}05)`,
          }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-[#123E56] mb-6">
              Our
              <span style={{ color: colors.goldAccent }}> Values</span>
            </h2>
            <p className="text-xl text-[#123E56]/80 max-w-3xl mx-auto">
              The principles that define how we work and what we stand for
            </p>
          </div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-white backdrop-blur-xl rounded-2xl p-8 border border-[#DCE7E8] hover:border-[#1F5C73]/40 transition-all duration-300 text-center shadow-lg shadow-gray-200/50"
              >
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6"
                  style={{
                    backgroundColor: `${value.color}10`,
                    border: `1px solid ${value.color}20`,
                  }}
                >
                  <div style={{ color: value.color }}>{value.icon}</div>
                </div>
                <h3 className="text-2xl font-bold text-[#123E56] mb-4">{value.title}</h3>
                <p className="text-[#123E56]/70 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Information */}
      <motion.section
        className="py-16 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-[#123E56] mb-6">
              Get In
              <span style={{ color: colors.goldAccent }}> Touch</span>
            </h2>
            <p className="text-xl text-[#123E56]/80 max-w-3xl mx-auto">
              Ready to transform your climate initiatives with verified data? We're here to help.
            </p>
          </div>

          <motion.div
            className="grid md:grid-cols-2 gap-8 mb-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: <MapPin className="w-8 h-8" />,
                title: "Visit Us",
                detail: " Harare, Zimbabwe",
                color: colors.secondaryBlue,
              },
              {
                icon: <Mail className="w-8 h-8" />,
                title: "Email Us",
                detail: "info@mavhu.com",
                color: colors.goldAccent,
              },
            ].map((contact, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-white backdrop-blur-xl rounded-2xl p-8 border border-[#DCE7E8] hover:border-[#1F5C73]/40 transition-all duration-300 text-center shadow-lg shadow-gray-200/50"
              >
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6"
                  style={{
                    backgroundColor: `${contact.color}10`,
                    border: `1px solid ${contact.color}20`,
                  }}
                >
                  <div style={{ color: contact.color }}>{contact.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-[#123E56] mb-3">{contact.title}</h3>
                <p className="text-[#123E56]/70 text-lg">{contact.detail}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-32 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, ${colors.secondaryBlue}08, ${colors.goldAccent}08)`,
          }}
        ></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-6xl font-bold text-[#123E56] mb-8">
            Ready to Transform
            <br />
            <span style={{ color: colors.goldAccent }}>African Climate Action?</span>
          </h2>
          <p className="text-2xl text-[#123E56]/80 mb-12 leading-relaxed">
            Join governments, financial institutions, and organizations across Africa
            who trust MAVHU for accurate, verified climate intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => (window.location.href = "/request-demo")}
              className="relative py-5 rounded-2xl text-lg font-bold transition-all transform hover:scale-105 shadow-xl overflow-hidden group"
              style={{
                background: `linear-gradient(to right, ${colors.goldAccent}, #D4A82E)`,
                color: "#FFFFFF",
                boxShadow: `0 20px 40px ${colors.goldAccent}30`,
              }}
            >
              <span className="relative z-10 flex items-center justify-center px-12">
                Request a Demo
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(to right, ${colors.goldAccent}CC, #C49F2A)`,
                }}
              ></div>
            </button>
            <button
              onClick={() => (window.location.href = "/partner")}
              className="border-2 border-[#DCE7E8] hover:border-[#1F5C73]/40 text-[#123E56] hover:bg-[#1F5C73]/5 px-12 py-5 rounded-2xl text-lg font-semibold transition-all backdrop-blur-sm shadow-lg shadow-gray-200/50"
            >
              Partner With Us
            </button>
          </div>
        </div>
      </motion.section>

      <Footer />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,100..900;1,100..900&display=swap');
        * {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }
        button:hover {
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default AboutPage;