import React from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import Logo from "../../assets/logo.png";
import BackgroundImage1 from "../../assets/bg-land.png";
import BackgroundImage2 from "../../assets/bg-climate.png";
import BackgroundImage3 from "../../assets/bg-api.png";

// Fixed color palette based on the provided image
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

const statVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, type: "spring", stiffness: 100 },
  },
};

const apiVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const handleMouseMove = (e: { clientX: any; clientY: any }) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
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

      {/* Navigation */}
      <Navbar />

      {/* Hero Section - NO ANIMATIONS */}
      <section id="hero" className="relative h-screen mt-0 overflow-hidden">
        {/* Background Image Slides */}
        <div className="absolute inset-0">
          <div
            className={`w-full h-full transition-opacity duration-1000 ${currentSlide === 0 ? "opacity-100" : "opacity-0"
              } absolute inset-0`}
          >
            <div className="w-full h-full bg-gradient-to-r from-[#F4FAFA]/80 via-white/60 to-[#F4FAFA]/80">
              <img
                src={BackgroundImage1}
                alt="Climate Data Background"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/50 to-white/70"></div>
          </div>

          <div
            className={`w-full h-full transition-opacity duration-1000 ${currentSlide === 1 ? "opacity-100" : "opacity-0"
              } absolute inset-0`}
          >
            <div className="w-full h-full bg-gradient-to-r from-[#F4FAFA]/80 via-white/60 to-[#F4FAFA]/80">
              <img
                src={BackgroundImage2}
                alt="Data Verification Background"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/50 to-white/70"></div>
          </div>

          <div
            className={`w-full h-full transition-opacity duration-1000 ${currentSlide === 2 ? "opacity-100" : "opacity-0"
              } absolute inset-0`}
          >
            <div className="w-full h-full bg-gradient-to-r from-[#F4FAFA]/80 via-white/60 to-[#F4FAFA]/80">
              <img
                src={BackgroundImage3}
                alt="API Integration Background"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/50 to-white/70"></div>
          </div>
        </div>

        {/* Slides Container */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            {/* Slide 1 */}
            <div
              className={`text-center transition-all duration-1000 ${currentSlide === 0
                  ? "opacity-100 transform translate-x-0"
                  : "opacity-0 transform translate-x-full absolute inset-0 flex items-center justify-center"
                }`}
            >
              <div className="max-w-6xl">
                <div
                  className="inline-flex items-center px-4 py-2 rounded-full border backdrop-blur-sm mb-8"
                  style={{
                    background: `linear-gradient(to right, ${colors.secondaryBlue}10, ${colors.goldAccent}10)`,
                    borderColor: `${colors.secondaryBlue}30`,
                  }}
                >
                  <img
                    src={Logo}
                    alt="MΛVHU AFRICA Logo"
                    className="w-6 h-6 mr-2"
                  />
                  <span
                    className="text-sm font-semibold tracking-wide uppercase"
                    style={{ color: colors.secondaryBlue }}
                  >
                    MΛVHU: Measured, Verified, Sovereign
                  </span>
                </div>

                <h1 className="text-6xl lg:text-7xl font-bold leading-tight mb-8">
                  <span className="text-[#123E56]">Empowering African</span>
                  <br />
                  <span
                    style={{ color: colors.goldAccent }}
                    className="animate-pulse"
                  >
                    Climate Action
                  </span>
                </h1>

                <p className="text-xl text-[#123E56]/80 mb-10 leading-relaxed max-w-3xl mx-auto">
                  With precise, trustworthy, and locally grounded data.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <button
                    onClick={() => navigate("/request-demo")}
                    className="relative py-4 rounded-2xl text-lg font-bold transition-all transform hover:scale-105 shadow-xl overflow-hidden group"
                    style={{
                      background: `linear-gradient(to right, ${colors.goldAccent}, #D4A82E)`,
                      color: "#FFFFFF",
                      boxShadow: `0 20px 40px ${colors.goldAccent}30`,
                    }}
                  >
                    <span className="relative z-10 flex items-center justify-center px-10">
                      Request a Demo
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(to right, ${colors.goldAccent}CC, #C49F2A)`,
                      }}
                    ></div>
                  </button>

                  <button
                    onClick={() => navigate("/partner")}
                    className="border-2 border-[#DCE7E8] hover:border-[#1F5C73]/40 text-[#123E56] hover:bg-[#1F5C73]/5 px-10 py-4 rounded-2xl text-lg font-semibold transition-all backdrop-blur-sm"
                  >
                    Partner With Us
                  </button>
                </div>
              </div>
            </div>

            {/* Slide 2 */}
            <div
              className={`text-center transition-all duration-1000 ${currentSlide === 1
                  ? "opacity-100 transform translate-x-0"
                  : "opacity-0 transform translate-x-full absolute inset-0 flex items-center justify-center"
                }`}
            >
              <div className="max-w-6xl">
                <div
                  className="inline-flex items-center px-4 py-2 rounded-full border backdrop-blur-sm mb-8"
                  style={{
                    background: `linear-gradient(to right, ${colors.secondaryBlue}10, ${colors.goldAccent}10)`,
                    borderColor: `${colors.secondaryBlue}30`,
                  }}
                >
                  <Map className="w-5 h-5 mr-2" style={{ color: colors.secondaryBlue }} />
                  <span
                    className="text-sm font-semibold tracking-wide uppercase"
                    style={{ color: colors.secondaryBlue }}
                  >
                    Geospatial Intelligence
                  </span>
                </div>

                <h1 className="text-6xl lg:text-7xl font-bold leading-tight mb-8">
                  <span className="text-[#123E56]">Transforming Climate</span>
                  <br />
                  <span
                    style={{ color: colors.goldAccent }}
                    className="animate-pulse"
                  >
                    Data into Action
                  </span>
                </h1>

                <p className="text-xl text-[#123E56]/80 mb-10 leading-relaxed max-w-3xl mx-auto">
                  Integrating satellite observations, drone imagery, and ground verification for accurate, actionable intelligence.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <button
                    onClick={() => scrollToSection("what-we-do")}
                    className="relative py-4 rounded-2xl text-lg font-bold transition-all transform hover:scale-105 shadow-xl overflow-hidden group"
                    style={{
                      background: `linear-gradient(to right, ${colors.secondaryBlue}, #1A4E63)`,
                      color: "#FFFFFF",
                      boxShadow: `0 20px 40px ${colors.secondaryBlue}30`,
                    }}
                  >
                    <span className="relative z-10 flex items-center justify-center px-10">
                      Explore Our Solutions
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(to right, ${colors.secondaryBlue}CC, #154A5E)`,
                      }}
                    ></div>
                  </button>

                  <button
                    onClick={() => scrollToSection("who-we-serve")}
                    className="border-2 border-[#DCE7E8] hover:border-[#1F5C73]/40 text-[#123E56] hover:bg-[#1F5C73]/5 px-10 py-4 rounded-2xl text-lg font-semibold transition-all backdrop-blur-sm"
                  >
                    Our Clients
                  </button>
                </div>
              </div>
            </div>

            {/* Slide 3 */}
            <div
              className={`text-center transition-all duration-1000 ${currentSlide === 2
                  ? "opacity-100 transform translate-x-0"
                  : "opacity-0 transform translate-x-full absolute inset-0 flex items-center justify-center"
                }`}
            >
              <div className="max-w-6xl">
                <div
                  className="inline-flex items-center px-4 py-2 rounded-full border backdrop-blur-sm mb-8"
                  style={{
                    background: `linear-gradient(to right, ${colors.secondaryBlue}10, ${colors.goldAccent}10)`,
                    borderColor: `${colors.secondaryBlue}30`,
                  }}
                >
                  <Shield className="w-5 h-5 mr-2" style={{ color: colors.secondaryBlue }} />
                  <span
                    className="text-sm font-semibold tracking-wide uppercase"
                    style={{ color: colors.secondaryBlue }}
                  >
                    Trusted & Verified
                  </span>
                </div>

                <h1 className="text-6xl lg:text-7xl font-bold leading-tight mb-8">
                  <span className="text-[#123E56]">Locally Grounded</span>
                  <br />
                  <span
                    style={{ color: colors.goldAccent }}
                    className="animate-pulse"
                  >
                    African Solutions
                  </span>
                </h1>

                <p className="text-xl text-[#123E56]/80 mb-10 leading-relaxed max-w-3xl mx-auto">
                  Every dataset is rooted in African realities, ensuring impactful climate solutions for the continent.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <button
                    onClick={() => scrollToSection("products")}
                    className="relative py-4 rounded-2xl text-lg font-bold transition-all transform hover:scale-105 shadow-xl overflow-hidden group"
                    style={{
                      background: `linear-gradient(to right, ${colors.goldAccent}, #D4A82E)`,
                      color: "#FFFFFF",
                      boxShadow: `0 20px 40px ${colors.goldAccent}30`,
                    }}
                  >
                    <span className="relative z-10 flex items-center justify-center px-10">
                      View Products
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(to right, ${colors.goldAccent}CC, #C49F2A)`,
                      }}
                    ></div>
                  </button>

                  <button
                    onClick={() => navigate("/contact")}
                    className="border-2 border-[#DCE7E8] hover:border-[#1F5C73]/40 text-[#123E56] hover:bg-[#1F5C73]/5 px-10 py-4 rounded-2xl text-lg font-semibold transition-all backdrop-blur-sm"
                  >
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {[0, 1, 2].map((slide) => (
            <button
              key={slide}
              onClick={() => setCurrentSlide(slide)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === slide ? "w-8" : "bg-[#123E56]/30 hover:bg-[#123E56]/50"
                }`}
              style={{
                backgroundColor: currentSlide === slide ? colors.goldAccent : undefined,
                background:
                  currentSlide === slide
                    ? `linear-gradient(to right, ${colors.secondaryBlue}, ${colors.goldAccent})`
                    : undefined,
              }}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + 3) % 3)}
          className="absolute left-8 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/70 hover:bg-white text-[#123E56] backdrop-blur-sm border border-[#DCE7E8] hover:border-[#1F5C73]/40 transition-all duration-300 flex items-center justify-center z-20 group"
        >
          <ArrowRight className="w-5 h-5 rotate-180 group-hover:scale-110 transition-transform" />
        </button>

        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % 3)}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/70 hover:bg-white text-[#123E56] backdrop-blur-sm border border-[#DCE7E8] hover:border-[#1F5C73]/40 transition-all duration-300 flex items-center justify-center z-20 group"
        >
          <ArrowRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>
      </section>

      {/* What We Do Section - with Animations */}
      <motion.section
        id="what-we-do"
        className="py-24 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-20" variants={fadeInUp}>
            <h2 className="text-5xl font-bold text-[#123E56] mb-6">
              What We
              <span style={{ color: colors.goldAccent }}> Do</span>
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-[#123E56]/80 mb-8 leading-relaxed">
                MΛVHU transforms climate data into trusted, verified, and locally rooted intelligence.
                We integrate geospatial data, drone imagery, and satellite observations to ensure every
                dataset is accurate and actionable.
              </p>
            </div>
          </motion.div>

          {/* Why MΛVHU - 4 Columns */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {[
              {
                title: "Measured",
                description: "Precise data collection from multiple high-tech sources",
                icon: <BarChart3 className="w-8 h-8" />,
                color: colors.secondaryBlue,
              },
              {
                title: "Verified",
                description: "Rigorous validation to ensure data integrity",
                icon: <CheckCircle className="w-8 h-8" />,
                color: colors.secondaryBlue,
              },
              {
                title: "Sovereign",
                description: "Locally governed and contextually relevant data",
                icon: <Shield className="w-8 h-8" />,
                color: colors.goldAccent,
              },
              {
                title: "Local",
                description: "Grounded in African realities to support impactful climate solutions",
                icon: <Map className="w-8 h-8" />,
                color: colors.secondaryBlue,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-white backdrop-blur-xl rounded-2xl p-8 border border-[#DCE7E8] hover:border-[#1F5C73]/40 transition-all duration-300 shadow-lg shadow-gray-200/50"
              >
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6"
                  style={{
                    backgroundColor: `${item.color}10`,
                    border: `1px solid ${item.color}20`,
                  }}
                >
                  <div style={{ color: item.color }}>{item.icon}</div>
                </div>
                <h3 className="text-2xl font-bold text-[#123E56] mb-4 text-center">
                  {item.title}
                </h3>
                <p className="text-[#123E56]/70 text-center leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Who We Serve */}
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
          >
            <h3 className="text-4xl font-bold text-[#123E56] mb-12">
              Who We
              <span style={{ color: colors.goldAccent }}> Serve</span>
            </h3>
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  title: "Governments & Public Agencies",
                  description: "Enabling accurate climate reporting and policy-making",
                  icon: <Globe className="w-6 h-6" />,
                },
                {
                  title: "Financial Institutions",
                  description: "Providing verified data for climate finance and investment decisions",
                  icon: <TrendingUp className="w-6 h-6" />,
                },
                {
                  title: "Agricultural Organisations",
                  description: "Enhancing resilience and sustainable land management",
                  icon: <Leaf className="w-6 h-6" />,
                },
                {
                  title: "Corporate Clients & ESG Teams",
                  description: "Supporting transparency and sustainability goals",
                  icon: <Users className="w-6 h-6" />,
                },
              ].map((client, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-white backdrop-blur-xl rounded-xl p-6 border border-[#DCE7E8] transition-all duration-300 hover:border-[#1F5C73]/40 shadow-md shadow-gray-200/30"
                >
                  <div className="flex items-center mb-4">
                    <div
                      className="p-2 rounded-lg mr-3"
                      style={{
                        backgroundColor: `${colors.secondaryBlue}10`,
                        border: `1px solid ${colors.secondaryBlue}20`,
                      }}
                    >
                      <div style={{ color: colors.secondaryBlue }}>{client.icon}</div>
                    </div>
                    <h4 className="text-lg font-semibold text-[#123E56]">
                      {client.title}
                    </h4>
                  </div>
                  <p className="text-[#123E56]/60 text-sm">
                    {client.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* About Us Section - with Animations */}
      <motion.section
        id="about"
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
          <motion.div className="text-center mb-20" variants={fadeInUp}>
            <h2 className="text-5xl font-bold text-[#123E56] mb-6">
              About
              <span style={{ color: colors.goldAccent }}> Us</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeInUp}>
              <h3 className="text-3xl font-bold text-[#123E56] mb-6">
                Who We Are
              </h3>
              <p className="text-[#123E56]/80 mb-6 leading-relaxed">
                MΛVHU is a pioneering climate data company dedicated to empowering African
                climate action through accurate, verified, and localized data.
              </p>

              <h4 className="text-2xl font-semibold text-[#123E56] mb-4">
                Our Mission
              </h4>
              <p className="text-[#123E56]/80 mb-8 leading-relaxed">
                To make climate action in Africa measurable, verifiable, and sovereign,
                ensuring that every piece of data is rooted in local contexts and truly impactful.
              </p>

              <h4 className="text-2xl font-semibold text-[#123E56] mb-4">
                The Challenge
              </h4>
              <p className="text-[#123E56]/80 leading-relaxed">
                Across the continent, climate initiatives are often hampered by data that
                isn't sufficiently verified or locally grounded, limiting the effectiveness
                of climate finance and adaptation.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h3 className="text-3xl font-bold text-[#123E56] mb-6">
                Our Approach
              </h3>

              <motion.div
                className="space-y-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  {
                    title: "MΛVHU Sky",
                    description: "Harnessing drones, satellites, and geospatial technology for comprehensive data collection",
                    icon: <Cloud className="w-6 h-6" />,
                    color: colors.secondaryBlue,
                  },
                  {
                    title: "MΛVHU Earth",
                    description: "Ground-truthing through field verification, ensuring data is accurate and locally relevant",
                    icon: <Map className="w-6 h-6" />,
                    color: colors.secondaryBlue,
                  },
                  {
                    title: "MΛVHU AI",
                    description: "Utilizing machine learning and automated MRV to process and report data efficiently",
                    icon: <Cpu className="w-6 h-6" />,
                    color: colors.goldAccent,
                  },
                ].map((approach, index) => (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    whileHover={{ x: 8, transition: { duration: 0.2 } }}
                    className="bg-white backdrop-blur-xl rounded-xl p-6 border border-[#DCE7E8] transition-all duration-300 hover:border-[#1F5C73]/40 shadow-md shadow-gray-200/30"
                  >
                    <div className="flex items-start">
                      <div
                        className="p-3 rounded-lg mr-4 flex-shrink-0"
                        style={{
                          backgroundColor: `${approach.color}10`,
                          border: `1px solid ${approach.color}20`,
                        }}
                      >
                        <div style={{ color: approach.color }}>{approach.icon}</div>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-[#123E56] mb-2">
                          {approach.title}
                        </h4>
                        <p className="text-[#123E56]/60">
                          {approach.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Products & Services Section - with Animations */}
      <motion.section
        id="products"
        className="py-24 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-20" variants={fadeInUp}>
            <h2 className="text-5xl font-bold text-[#123E56] mb-6">
              Products &
              <span style={{ color: colors.goldAccent }}> Services</span>
            </h2>
          </motion.div>

          {/* Main Products */}
          <motion.div
            className="grid md:grid-cols-3 gap-8 mb-20"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {[
              {
                title: "ESG & Climate Intelligence Dashboard",
                description: "Built for financial institutions, corporates, governments, and climate project developers who require trusted climate and sustainability data for decision-making and reporting.",
                features: [
                  "Monitor climate indicators",
                  "Track verified outcomes",
                  "Support ESG disclosures",
                  "Audit-ready reports",
                ],
                icon: <BarChart3 className="w-8 h-8" />,
                color: colors.secondaryBlue,
                cta: "Learn More",
              },
              {
                title: "Farmer App",
                description: "Designed for farmers, cooperatives, and field teams participating in climate, sustainability, or agricultural programmes.",
                features: [
                  "Capture farm-level data",
                  "Support compliance",
                  "Localized climate insights",
                  "Secure data integration",
                ],
                icon: <Smartphone className="w-8 h-8" />,
                color: colors.secondaryBlue,
                cta: "Learn More",
              },
              {
                title: "Climate Data APIs",
                description: "Secure, enterprise-grade climate data APIs that enable organisations to integrate verified, locally grounded climate intelligence directly into their systems.",
                features: [
                  "Enterprise-grade security",
                  "Real-time data access",
                  "Multiple API endpoints",
                  "Comprehensive documentation",
                ],
                icon: <Database className="w-8 h-8" />,
                color: colors.goldAccent,
                cta: "Request Demo",
              },
            ].map((product, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-white backdrop-blur-xl rounded-2xl overflow-hidden border border-[#DCE7E8] transition-all duration-300 shadow-xl shadow-gray-200/50"
              >
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div
                      className="p-3 rounded-xl mr-4"
                      style={{
                        backgroundColor: `${product.color}10`,
                        border: `1px solid ${product.color}20`,
                      }}
                    >
                      <div style={{ color: product.color }}>{product.icon}</div>
                    </div>
                    <h3 className="text-2xl font-bold text-[#123E56]">
                      {product.title}
                    </h3>
                  </div>

                  <p className="text-[#123E56]/80 mb-6 leading-relaxed">
                    {product.description}
                  </p>

                  <ul className="space-y-2 mb-8">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" style={{ color: colors.secondaryBlue }} />
                        <span className="text-[#123E56]/60 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() =>
                      navigate(product.cta === "Request Demo" ? "/request-demo" : "/products")
                    }
                    className="w-full py-3 rounded-xl font-semibold transition-all hover:opacity-90 shadow-md"
                    style={{
                      background: `linear-gradient(to right, ${product.color}, ${product.color === colors.secondaryBlue ? "#1A4E63" : "#D4A82E"
                        })`,
                      color: "#FFFFFF",
                      boxShadow: `0 10px 20px ${product.color}20`,
                    }}
                  >
                    {product.cta}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Climate Data APIs */}
          <motion.div
            className="mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
          >
            <h3 className="text-4xl font-bold text-[#123E56] mb-12 text-center">
              Climate Data
              <span style={{ color: colors.goldAccent }}> APIs</span>
            </h3>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  title: "Land & Land-Use Intelligence API",
                  description: "Provides verified data on land use, land cover change, and vegetation dynamics.",
                  icon: <Map className="w-6 h-6" />,
                },
                {
                  title: "Soil & Carbon Intelligence API",
                  description: "Delivers soil indicators and carbon measurement insights for climate projects.",
                  icon: <Droplet className="w-6 h-6" />,
                },
                {
                  title: "Climate Risk & Resilience API",
                  description: "Offers localized climate risk and resilience indicators for planning.",
                  icon: <Wind className="w-6 h-6" />,
                },
                {
                  title: "MRV & Verification Status API",
                  description: "Enables access to verification status and audit trails.",
                  icon: <Eye className="w-6 h-6" />,
                },
                {
                  title: "ESG & Sustainability Metrics API",
                  description: "Provides standardized climate and environmental indicators.",
                  icon: <Thermometer className="w-6 h-6" />,
                },
              ].map((api, index) => (
                <motion.div
                  key={index}
                  variants={apiVariants}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-white backdrop-blur-xl rounded-xl p-6 border border-[#DCE7E8] transition-all duration-300 hover:border-[#1F5C73]/40 shadow-md shadow-gray-200/30"
                >
                  <div className="flex items-start mb-4">
                    <div
                      className="p-2 rounded-lg mr-3"
                      style={{
                        backgroundColor: `${colors.secondaryBlue}10`,
                        border: `1px solid ${colors.secondaryBlue}20`,
                      }}
                    >
                      <div style={{ color: colors.secondaryBlue }}>{api.icon}</div>
                    </div>
                    <h4 className="text-lg font-semibold text-[#123E56]">
                      {api.title}
                    </h4>
                  </div>
                  <p className="text-[#123E56]/60 text-sm mb-4">
                    {api.description}
                  </p>
                  <button
                    onClick={() => navigate("/request-demo")}
                    className="text-sm font-medium hover:underline"
                    style={{ color: colors.goldAccent }}
                  >
                    Request Demo →
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Training & Capacity Building */}
          <motion.div
            className="bg-white backdrop-blur-xl rounded-2xl p-8 border border-[#DCE7E8] shadow-xl shadow-gray-200/50"
            variants={fadeInUp}
            whileHover={{ boxShadow: "0 25px 40px -12px rgba(0,0,0,0.1)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 pr-8">
                <div className="flex items-center mb-4">
                  <div
                    className="p-3 rounded-xl mr-4"
                    style={{
                      backgroundColor: `${colors.goldAccent}10`,
                      border: `1px solid ${colors.goldAccent}20`,
                    }}
                  >
                    <BookOpen className="w-8 h-8" style={{ color: colors.goldAccent }} />
                  </div>
                  <h3 className="text-3xl font-bold text-[#123E56]">
                    Training & Capacity Building
                  </h3>
                </div>
                <p className="text-[#123E56]/80 mb-6 leading-relaxed">
                  MΛVHU's training services support farmers, agricultural organisations,
                  institutions, and implementation partners involved in climate and sustainability
                  initiatives.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    "Strengthen farm-level compliance",
                    "Improve data collection and reporting practices",
                    "Build understanding of climate standards",
                    "Enhance verification and MRV systems",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" style={{ color: colors.secondaryBlue }} />
                      <span className="text-[#123E56]/60">{item}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate("/training")}
                  className="inline-flex items-center font-semibold hover:underline"
                  style={{ color: colors.secondaryBlue }}
                >
                  Learn About Our Training Programs
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
              <div className="md:w-1/3 mt-8 md:mt-0">
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2" style={{ color: colors.goldAccent }}>
                    100+
                  </div>
                  <div className="text-[#123E56]/70 font-semibold">Organizations Trained</div>
                  <div className="mt-4 text-5xl font-bold mb-2" style={{ color: colors.goldAccent }}>
                    5000+
                  </div>
                  <div className="text-[#123E56]/70 font-semibold">Individuals Empowered</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section - with Animations */}
      <motion.section
        id="stats"
        className="py-24 relative"
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-5xl font-bold text-[#123E56] mb-6">
              Our
              <span style={{ color: colors.goldAccent }}> Impact</span>
            </h2>
            <p className="text-xl text-[#123E56]/60">
              Numbers that demonstrate our commitment to African climate action
            </p>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-4 gap-8 text-center"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                number: "200+",
                label: "Projects Monitored",
                icon: <Eye className="w-6 h-6" />,
              },
              {
                number: "50M+",
                label: "Hectares Covered",
                icon: <Map className="w-6 h-6" />,
              },
              {
                number: "98%",
                label: "Data Accuracy",
                icon: <CheckCircle className="w-6 h-6" />,
              },
              {
                number: "15+",
                label: "African Countries",
                icon: <Globe className="w-6 h-6" />,
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={statVariants}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group"
              >
                <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 border border-[#DCE7E8] hover:border-[#1F5C73]/40 transition-all duration-300 shadow-lg shadow-gray-200/50">
                  <div className="flex justify-center mb-4" style={{ color: colors.secondaryBlue }}>
                    {stat.icon}
                  </div>
                  <div className="text-5xl font-bold mb-2" style={{ color: colors.goldAccent }}>
                    {stat.number}
                  </div>
                  <div className="text-[#123E56]/60 font-medium">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section - with Animations */}
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
            background: `linear-gradient(to right, ${colors.secondaryBlue}10, ${colors.goldAccent}10)`,
          }}
        ></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h2
            className="text-6xl font-bold text-[#123E56] mb-8"
            variants={fadeInUp}
          >
            Ready to Transform
            <br />
            <span style={{ color: colors.goldAccent }}>African Climate Action?</span>
          </motion.h2>
          <motion.p
            className="text-2xl text-[#123E56]/80 mb-12 leading-relaxed"
            variants={fadeInUp}
          >
            Join governments, financial institutions, and organizations across Africa
            who trust MΛVHU for accurate, verified climate intelligence.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.button
              variants={cardVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              onClick={() => navigate("/request-demo")}
              className="relative py-5 rounded-2xl text-lg font-bold transition-all shadow-xl overflow-hidden group"
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
            </motion.button>
            <motion.button
              variants={cardVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              onClick={() => navigate("/partner")}
              className="border-2 border-[#DCE7E8] hover:border-[#1F5C73]/40 text-[#123E56] hover:bg-[#1F5C73]/5 px-12 py-5 rounded-2xl text-lg font-semibold transition-all backdrop-blur-sm shadow-lg shadow-gray-200/50"
            >
              Partner With Us
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <Footer isDarkMode={false} themeClasses={themeClasses} />

      {/* Global styles for Inter font and smooth animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,100..900;1,100..900&display=swap');
        
        * {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }
        
        button:hover {
          transition: all 0.3s ease;
        }
        
        .bg-logo-secondary {
          background-color: ${colors.secondaryBlue};
        }
        
        .bg-logo-gold {
          background-color: ${colors.goldAccent};
        }
        
        .text-logo-secondary {
          color: ${colors.secondaryBlue};
        }
        
        .text-logo-gold {
          color: ${colors.goldAccent};
        }
      `}</style>
    </div>
  );
};

export default LandingPage;