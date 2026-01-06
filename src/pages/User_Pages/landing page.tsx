import React from "react";
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
const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 8000); // Change slide every 8 seconds
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
  // Colors adjusted for both modes - darker in light mode
  const logoGreen = isDarkMode ? "#00FF00" : "#008000"; // Brighter green for dark, forest green for light
  const logoYellow = isDarkMode ? "#FFD700" : "#B8860B"; // Gold for dark, dark goldenrod for light
  const darkBg = "#0A0A0A"; // Not pure black
  const lightBg = "#F5F5F5"; // Light but not pure white
  const lightCardBg = "#FFFFFF"; // Pure white for cards in light mode
  // Updated theme-aware classes with MAVHU color scheme
  const themeClasses = {
    bg: isDarkMode ? darkBg : lightBg,
    text: isDarkMode ? "text-white" : "text-gray-900",
    textSecondary: isDarkMode ? "text-gray-300" : "text-gray-700",
    textMuted: isDarkMode ? "text-gray-400" : "text-gray-600",
    navBg: isDarkMode ? `${darkBg}/95` : `${lightBg}/95`,
    cardBg: isDarkMode ? `${darkBg}/30` : `${lightCardBg}/95`,
    cardBgAlt: isDarkMode ? `${darkBg}/40` : `${lightCardBg}/90`,
    border: isDarkMode ? "border-white/10" : "border-gray-300/70",
    borderHover: isDarkMode ? "border-white/20" : "border-gray-400",
    backgroundGradient: isDarkMode
      ? `bg-gradient-to-br from-gray-900 via-${darkBg.replace('#', '')} to-black`
      : `bg-gradient-to-br from-gray-50 via-${lightBg.replace('#', '')} to-gray-100`,
    hoverBg: isDarkMode ? "hover:bg-white/10" : "hover:bg-gray-100",
  };

  return (
    <div
      className={`min-h-screen ${themeClasses.bg} ${themeClasses.text} overflow-hidden transition-colors duration-300`}
      style={{
        '--logo-green': logoGreen,
        '--logo-yellow': logoYellow,
      } as React.CSSProperties}
    >

      {/* Animated Background */}

      <div
        className={`fixed inset-0 ${themeClasses.backgroundGradient} transition-all duration-300`}
      >
        <div
          className={`absolute inset-0 ${
            isDarkMode
              ? "bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,0,0.1),transparent_50%)]"
              : "bg-[radial-gradient(circle_at_50%_50%,rgba(0,128,0,0.05),transparent_50%)]"
          }`}
        ></div>
        <div
          className={`absolute inset-0 ${
            isDarkMode
              ? "bg-[radial-gradient(circle_at_80%_20%,rgba(255,215,0,0.1),transparent_50%)]"
              : "bg-[radial-gradient(circle_at_80%_20%,rgba(184,134,11,0.05),transparent_50%)]"
          }`}
        ></div>
        <div
          className={`absolute w-96 h-96 rounded-full blur-3xl transition-all duration-1000 ease-out`}
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            background: isDarkMode
              ? `radial-gradient(circle, ${logoGreen}20, transparent 70%)`
              : `radial-gradient(circle, ${logoGreen}10, transparent 70%)`,
          }}
        ></div>
      </div>

      {/* Navigation */}
      <Navbar
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      {/* Hero Section */}
      <section id="hero" className="relative h-screen mt-0 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          {/* Slide 1 Background */}
          <div
            className={`w-full h-full transition-opacity duration-1000 ${
              currentSlide === 0 ? "opacity-100" : "opacity-0"
            } absolute inset-0`}
          >
            <div
              className={`w-full h-full bg-gradient-to-r ${
                isDarkMode
                  ? "from-gray-900/80 via-gray-800/60 to-gray-900/80"
                  : "from-gray-50/80 via-white/60 to-gray-50/80"
              }`}
            >
              <img
                src={BackgroundImage1}
                alt="Climate Data Background"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className={`absolute inset-0 ${
                isDarkMode
                  ? "bg-gradient-to-r from-black/70 via-black/50 to-black/70"
                  : "bg-gradient-to-r from-white/70 via-white/50 to-white/70"
              }`}
            ></div>
          </div>

          {/* Slide 2 Background */}
          <div
            className={`w-full h-full transition-opacity duration-1000 ${
              currentSlide === 1 ? "opacity-100" : "opacity-0"
            } absolute inset-0`}
          >
            <div
              className={`w-full h-full bg-gradient-to-r ${
                isDarkMode
                  ? "from-gray-900/80 via-gray-800/60 to-gray-900/80"
                  : "from-gray-50/80 via-white/60 to-gray-50/80"
              }`}
            >
              <img
                src={BackgroundImage2}
                alt="Data Verification Background"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className={`absolute inset-0 ${
                isDarkMode
                  ? "bg-gradient-to-r from-black/70 via-black/50 to-black/70"
                  : "bg-gradient-to-r from-white/70 via-white/50 to-white/70"
              }`}
            ></div>
          </div>

          {/* Slide 3 Background */}
          <div
            className={`w-full h-full transition-opacity duration-1000 ${
              currentSlide === 2 ? "opacity-100" : "opacity-0"
            } absolute inset-0`}
          >
            <div
              className={`w-full h-full bg-gradient-to-r ${
                isDarkMode
                  ? "from-gray-900/80 via-gray-800/60 to-gray-900/80"
                  : "from-gray-50/80 via-white/60 to-gray-50/80"
              }`}
            >
              <img
                src={BackgroundImage3}
                alt="API Integration Background"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className={`absolute inset-0 ${
                isDarkMode
                  ? "bg-gradient-to-r from-black/70 via-black/50 to-black/70"
                  : "bg-gradient-to-r from-white/70 via-white/50 to-white/70"
              }`}
            ></div>
          </div>
        </div>

        {/* Slides Container */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            {/* Slide 1 */}
            <div
              className={`text-center transition-all duration-1000 ${
                currentSlide === 0
                  ? "opacity-100 transform translate-x-0"
                  : "opacity-0 transform translate-x-full absolute inset-0 flex items-center justify-center"
              }`}
            >
              <div className="max-w-6xl">
                <div
                  className={`inline-flex items-center px-4 py-2 rounded-full border backdrop-blur-sm mb-8`}
                  style={{
                    background: isDarkMode
                      ? `linear-gradient(to right, ${logoGreen}20, ${logoYellow}20)`
                      : `linear-gradient(to right, ${logoGreen}10, ${logoYellow}10)`,
                    borderColor: isDarkMode ? `${logoGreen}30` : `${logoGreen}20`,
                  }}
                >
                  <img
                    src={Logo}
                    alt="MAVHU AFRICA Logo"
                    className="w-6 h-6 mr-2"
                  />
                  <span
                    className="text-sm font-semibold tracking-wide uppercase"
                    style={{ color: logoGreen }}
                  >
                    MAVHU: Measured, Verified, Sovereign
                  </span>
                </div>

                <h1 className="text-6xl lg:text-7xl font-bold leading-tight mb-8">
                  <span className={themeClasses.text}>Empowering African</span>
                  <br />
                  <span style={{ color: logoGreen }} className="animate-pulse">
                    Climate Action
                  </span>
                </h1>

                <p
                  className={`text-xl ${themeClasses.textSecondary} mb-10 leading-relaxed max-w-3xl mx-auto`}
                >
                  With precise, trustworthy, and locally grounded data.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <button
                    onClick={() => navigate("/request-demo")}
                    className="relative py-4 rounded-2xl text-lg font-bold transition-all transform hover:scale-105 shadow-xl overflow-hidden group"
                    style={{
                      background: `linear-gradient(to right, ${logoYellow}, ${isDarkMode ? '#FFC107' : '#DAA520'})`,
                      color: isDarkMode ? '#000000' : '#000000',
                      boxShadow: isDarkMode 
                        ? `0 20px 40px ${logoYellow}30` 
                        : `0 20px 40px ${logoYellow}20`
                    }}
                  >
                    <span className="relative z-10 flex items-center justify-center px-10">
                      Request a Demo
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(to right, ${logoYellow}CC, ${isDarkMode ? '#FFC107CC' : '#DAA520CC'})`
                      }}
                    ></div>
                  </button>

                  <button
                    onClick={() => navigate("/partner")}
                    className={`border-2 ${
                      isDarkMode
                        ? "border-white/20 hover:border-white/40 text-white hover:bg-white/10"
                        : "border-gray-300 hover:border-gray-500 text-gray-900 hover:bg-gray-100/50"
                    } px-10 py-4 rounded-2xl text-lg font-semibold transition-all backdrop-blur-sm`}
                  >
                    Partner With Us
                  </button>
                </div>
              </div>
            </div>

            {/* Slide 2 */}
            <div
              className={`text-center transition-all duration-1000 ${
                currentSlide === 1
                  ? "opacity-100 transform translate-x-0"
                  : "opacity-0 transform translate-x-full absolute inset-0 flex items-center justify-center"
              }`}
            >
              <div className="max-w-6xl">
                <div
                  className={`inline-flex items-center px-4 py-2 rounded-full border backdrop-blur-sm mb-8`}
                  style={{
                    background: isDarkMode
                      ? `linear-gradient(to right, ${logoGreen}20, ${logoYellow}20)`
                      : `linear-gradient(to right, ${logoGreen}10, ${logoYellow}10)`,
                    borderColor: isDarkMode ? `${logoGreen}30` : `${logoGreen}20`,
                  }}
                >
                  <Map className="w-5 h-5 mr-2" style={{ color: logoGreen }} />
                  <span
                    className="text-sm font-semibold tracking-wide uppercase"
                    style={{ color: logoGreen }}
                  >
                    Geospatial Intelligence
                  </span>
                </div>

                <h1 className="text-6xl lg:text-7xl font-bold leading-tight mb-8">
                  <span className={themeClasses.text}>Transforming Climate</span>
                  <br />
                  <span style={{ color: logoGreen }} className="animate-pulse">
                    Data into Action
                  </span>
                </h1>

                <p
                  className={`text-xl ${themeClasses.textSecondary} mb-10 leading-relaxed max-w-3xl mx-auto`}
                >
                  Integrating satellite observations, drone imagery, and ground verification for accurate, actionable intelligence.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <button
                    onClick={() => scrollToSection("what-we-do")}
                    className="relative py-4 rounded-2xl text-lg font-bold transition-all transform hover:scale-105 shadow-xl overflow-hidden group"
                    style={{
                      background: `linear-gradient(to right, ${logoGreen}, ${isDarkMode ? '#00CC00' : '#006400'})`,
                      color: isDarkMode ? '#000000' : '#FFFFFF',
                      boxShadow: isDarkMode 
                        ? `0 20px 40px ${logoGreen}30` 
                        : `0 20px 40px ${logoGreen}20`
                    }}
                  >
                    <span className="relative z-10 flex items-center justify-center px-10">
                      Explore Our Solutions
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(to right, ${logoGreen}CC, ${isDarkMode ? '#00CC00CC' : '#006400CC'})`
                      }}
                    ></div>
                  </button>

                  <button
                    onClick={() => scrollToSection("who-we-serve")}
                    className={`border-2 ${
                      isDarkMode
                        ? "border-white/20 hover:border-white/40 text-white hover:bg-white/10"
                        : "border-gray-300 hover:border-gray-500 text-gray-900 hover:bg-gray-100/50"
                    } px-10 py-4 rounded-2xl text-lg font-semibold transition-all backdrop-blur-sm`}
                  >
                    Our Clients
                  </button>
                </div>
              </div>
            </div>

            {/* Slide 3 */}
            <div
              className={`text-center transition-all duration-1000 ${
                currentSlide === 2
                  ? "opacity-100 transform translate-x-0"
                  : "opacity-0 transform translate-x-full absolute inset-0 flex items-center justify-center"
              }`}
            >
              <div className="max-w-6xl">
                <div
                  className={`inline-flex items-center px-4 py-2 rounded-full border backdrop-blur-sm mb-8`}
                  style={{
                    background: isDarkMode
                      ? `linear-gradient(to right, ${logoGreen}20, ${logoYellow}20)`
                      : `linear-gradient(to right, ${logoGreen}10, ${logoYellow}10)`,
                    borderColor: isDarkMode ? `${logoGreen}30` : `${logoGreen}20`,
                  }}
                >
                  <Shield className="w-5 h-5 mr-2" style={{ color: logoGreen }} />
                  <span
                    className="text-sm font-semibold tracking-wide uppercase"
                    style={{ color: logoGreen }}
                  >
                    Trusted & Verified
                  </span>
                </div>

                <h1 className="text-6xl lg:text-7xl font-bold leading-tight mb-8">
                  <span className={themeClasses.text}>Locally Grounded</span>
                  <br />
                  <span style={{ color: logoGreen }} className="animate-pulse">
                    African Solutions
                  </span>
                </h1>

                <p
                  className={`text-xl ${themeClasses.textSecondary} mb-10 leading-relaxed max-w-3xl mx-auto`}
                >
                  Every dataset is rooted in African realities, ensuring impactful climate solutions for the continent.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <button
                    onClick={() => scrollToSection("products")}
                    className="relative py-4 rounded-2xl text-lg font-bold transition-all transform hover:scale-105 shadow-xl overflow-hidden group"
                    style={{
                      background: `linear-gradient(to right, ${logoYellow}, ${isDarkMode ? '#FFC107' : '#DAA520'})`,
                      color: isDarkMode ? '#000000' : '#000000',
                      boxShadow: isDarkMode 
                        ? `0 20px 40px ${logoYellow}30` 
                        : `0 20px 40px ${logoYellow}20`
                    }}
                  >
                    <span className="relative z-10 flex items-center justify-center px-10">
                      View Products
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(to right, ${logoYellow}CC, ${isDarkMode ? '#FFC107CC' : '#DAA520CC'})`
                      }}
                    ></div>
                  </button>

                  <button
                    onClick={() => navigate("/contact")}
                    className={`border-2 ${
                      isDarkMode
                        ? "border-white/20 hover:border-white/40 text-white hover:bg-white/10"
                        : "border-gray-300 hover:border-gray-500 text-gray-900 hover:bg-gray-100/50"
                    } px-10 py-4 rounded-2xl text-lg font-semibold transition-all backdrop-blur-sm`}
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
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === slide
                  ? "w-8"
                  : isDarkMode
                  ? "bg-white/30 hover:bg-white/50"
                  : "bg-gray-400/50 hover:bg-gray-600/70"
              }`}
              style={{
                backgroundColor: currentSlide === slide ? logoGreen : undefined,
                background: currentSlide === slide ? `linear-gradient(to right, ${logoGreen}, ${logoYellow})` : undefined,
              }}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + 3) % 3)}
          className={`absolute left-8 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full ${
            isDarkMode
              ? "bg-black/30 hover:bg-black/50 text-white"
              : "bg-white/70 hover:bg-white text-gray-900"
          } backdrop-blur-sm border ${
            isDarkMode ? "border-white/10" : "border-gray-300"
          } hover:${
            themeClasses.borderHover
          } transition-all duration-300 flex items-center justify-center z-20 group`}
        >
          <ArrowRight className="w-5 h-5 rotate-180 group-hover:scale-110 transition-transform" />
        </button>

        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % 3)}
          className={`absolute right-8 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full ${
            isDarkMode
              ? "bg-black/30 hover:bg-black/50 text-white"
              : "bg-white/70 hover:bg-white text-gray-900"
          } backdrop-blur-sm border ${
            isDarkMode ? "border-white/10" : "border-gray-300"
          } hover:${
            themeClasses.borderHover
          } transition-all duration-300 flex items-center justify-center z-20 group`}
        >
          <ArrowRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>
      </section>

      {/* What We Do Section */}
      <section id="what-we-do" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className={`text-5xl font-bold ${themeClasses.text} mb-6`}>
              What We
              <span style={{ color: logoGreen }}> Do</span>
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className={`text-xl ${themeClasses.textSecondary} mb-8 leading-relaxed`}>
                MAVHU transforms climate data into trusted, verified, and locally rooted intelligence.
                We integrate geospatial data, drone imagery, and satellite observations to ensure every
                dataset is accurate and actionable.
              </p>
            </div>
          </div>

          {/* Why MAVHU - 4 Columns */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {[
              {
                title: "Measured",
                description: "Precise data collection from multiple high-tech sources",
                icon: <BarChart3 className="w-8 h-8" />,
                color: logoGreen,
              },
              {
                title: "Verified",
                description: "Rigorous validation to ensure data integrity",
                icon: <CheckCircle className="w-8 h-8" />,
                color: logoGreen,
              },
              {
                title: "Sovereign",
                description: "Locally governed and contextually relevant data",
                icon: <Shield className="w-8 h-8" />,
                color: logoYellow,
              },
              {
                title: "Local",
                description: "Grounded in African realities to support impactful climate solutions",
                icon: <Map className="w-8 h-8" />,
                color: logoGreen,
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl p-8 border ${themeClasses.border} hover:${
                  themeClasses.borderHover
                } transition-all duration-300 hover:transform hover:scale-105 shadow-lg ${
                  isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"
                }`}
              >
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6"
                  style={{ 
                    backgroundColor: `${item.color}${isDarkMode ? '20' : '10'}`,
                    border: `1px solid ${item.color}${isDarkMode ? '30' : '20'}`
                  }}
                >
                  <div style={{ color: item.color }}>{item.icon}</div>
                </div>
                <h3 className={`text-2xl font-bold ${themeClasses.text} mb-4 text-center`}>
                  {item.title}
                </h3>
                <p className={`${themeClasses.textSecondary} text-center leading-relaxed`}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Who We Serve */}
          <div className="text-center mb-16">
            <h3 className={`text-4xl font-bold ${themeClasses.text} mb-12`}>
              Who We
              <span style={{ color: logoGreen }}> Serve</span>
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <div
                  key={index}
                  className={`${themeClasses.cardBgAlt} backdrop-blur-xl rounded-xl p-6 border ${
                    themeClasses.border
                  } transition-all duration-300 hover:${
                    themeClasses.borderHover
                  } shadow-md ${
                    isDarkMode ? "shadow-black/10" : "shadow-gray-200/30"
                  }`}
                >
                  <div className="flex items-center mb-4">
                    <div 
                      className="p-2 rounded-lg mr-3" 
                      style={{ 
                        backgroundColor: `${logoGreen}${isDarkMode ? '20' : '10'}`,
                        border: `1px solid ${logoGreen}${isDarkMode ? '30' : '20'}`
                      }}
                    >
                      <div style={{ color: logoGreen }}>{client.icon}</div>
                    </div>
                    <h4 className={`text-lg font-semibold ${themeClasses.text}`}>
                      {client.title}
                    </h4>
                  </div>
                  <p className={`${themeClasses.textMuted} text-sm`}>
                    {client.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 relative">
        <div
          className="absolute inset-0"
          style={{
            background: isDarkMode
              ? `linear-gradient(to bottom, transparent, ${logoGreen}05)`
              : `linear-gradient(to bottom, transparent, ${logoGreen}02)`,
          }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className={`text-5xl font-bold ${themeClasses.text} mb-6`}>
              About
              <span style={{ color: logoGreen }}> Us</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className={`text-3xl font-bold ${themeClasses.text} mb-6`}>
                Who We Are
              </h3>
              <p className={`${themeClasses.textSecondary} mb-6 leading-relaxed`}>
                MAVHU is a pioneering climate data company dedicated to empowering African
                climate action through accurate, verified, and localized data.
              </p>

              <h4 className={`text-2xl font-semibold ${themeClasses.text} mb-4`}>
                Our Mission
              </h4>
              <p className={`${themeClasses.textSecondary} mb-8 leading-relaxed`}>
                To make climate action in Africa measurable, verifiable, and sovereign,
                ensuring that every piece of data is rooted in local contexts and truly impactful.
              </p>

              <h4 className={`text-2xl font-semibold ${themeClasses.text} mb-4`}>
                The Challenge
              </h4>
              <p className={`${themeClasses.textSecondary} leading-relaxed`}>
                Across the continent, climate initiatives are often hampered by data that
                isn't sufficiently verified or locally grounded, limiting the effectiveness
                of climate finance and adaptation.
              </p>
            </div>

            <div>
              <h3 className={`text-3xl font-bold ${themeClasses.text} mb-6`}>
                Our Approach
              </h3>

              <div className="space-y-6">
                {[
                  {
                    title: "MAVHU Sky",
                    description: "Harnessing drones, satellites, and geospatial technology for comprehensive data collection",
                    icon: <Cloud className="w-6 h-6" />,
                    color: logoGreen,
                  },
                  {
                    title: "MAVHU Earth",
                    description: "Ground-truthing through field verification, ensuring data is accurate and locally relevant",
                    icon: <Map className="w-6 h-6" />,
                    color: logoGreen,
                  },
                  {
                    title: "MAVHU AI",
                    description: "Utilizing machine learning and automated MRV to process and report data efficiently",
                    icon: <Cpu className="w-6 h-6" />,
                    color: logoYellow,
                  },
                ].map((approach, index) => (
                  <div
                    key={index}
                    className={`${themeClasses.cardBg} backdrop-blur-xl rounded-xl p-6 border ${
                      themeClasses.border
                    } transition-all duration-300 hover:${
                      themeClasses.borderHover
                    } shadow-md ${
                      isDarkMode ? "shadow-black/10" : "shadow-gray-200/30"
                    }`}
                  >
                    <div className="flex items-start">
                      <div
                        className="p-3 rounded-lg mr-4 flex-shrink-0"
                        style={{ 
                          backgroundColor: `${approach.color}${isDarkMode ? '20' : '10'}`,
                          border: `1px solid ${approach.color}${isDarkMode ? '30' : '20'}`
                        }}
                      >
                        <div style={{ color: approach.color }}>{approach.icon}</div>
                      </div>
                      <div>
                        <h4 className={`text-xl font-semibold ${themeClasses.text} mb-2`}>
                          {approach.title}
                        </h4>
                        <p className={`${themeClasses.textMuted}`}>
                          {approach.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products & Services Section */}
      <section id="products" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className={`text-5xl font-bold ${themeClasses.text} mb-6`}>
              Products &
              <span style={{ color: logoGreen }}> Services</span>
            </h2>
          </div>

          {/* Main Products */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              {
                title: "ESG & Climate Intelligence Dashboard",
                description: "Built for financial institutions, corporates, governments, and climate project developers who require trusted climate and sustainability data for decision-making and reporting.",
                features: [
                  "Monitor climate indicators",
                  "Track verified outcomes",
                  "Support ESG disclosures",
                  "Audit-ready reports"
                ],
                icon: <BarChart3 className="w-8 h-8" />,
                color: logoGreen,
                cta: "Learn More",
              },
              {
                title: "Farmer App",
                description: "Designed for farmers, cooperatives, and field teams participating in climate, sustainability, or agricultural programmes.",
                features: [
                  "Capture farm-level data",
                  "Support compliance",
                  "Localized climate insights",
                  "Secure data integration"
                ],
                icon: <Smartphone className="w-8 h-8" />,
                color: logoGreen,
                cta: "Learn More",
              },
              {
                title: "Climate Data APIs",
                description: "Secure, enterprise-grade climate data APIs that enable organisations to integrate verified, locally grounded climate intelligence directly into their systems.",
                features: [
                  "Enterprise-grade security",
                  "Real-time data access",
                  "Multiple API endpoints",
                  "Comprehensive documentation"
                ],
                icon: <Database className="w-8 h-8" />,
                color: logoYellow,
                cta: "Request Demo",
              },
            ].map((product, index) => (
              <div
                key={index}
                className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl overflow-hidden border ${
                  themeClasses.border
                } transition-all duration-300 hover:transform hover:scale-105 shadow-xl ${
                  isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"
                }`}
              >
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div
                      className="p-3 rounded-xl mr-4"
                      style={{ 
                        backgroundColor: `${product.color}${isDarkMode ? '20' : '10'}`,
                        border: `1px solid ${product.color}${isDarkMode ? '30' : '20'}`
                      }}
                    >
                      <div style={{ color: product.color }}>{product.icon}</div>
                    </div>
                    <h3 className={`text-2xl font-bold ${themeClasses.text}`}>
                      {product.title}
                    </h3>
                  </div>

                  <p className={`${themeClasses.textSecondary} mb-6 leading-relaxed`}>
                    {product.description}
                  </p>

                  <ul className="space-y-2 mb-8">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" style={{ color: logoGreen }} />
                        <span className={`${themeClasses.textMuted} text-sm`}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => navigate(product.cta === "Request Demo" ? "/request-demo" : "/products")}
                    className="w-full py-3 rounded-xl font-semibold transition-all hover:opacity-90 shadow-md"
                    style={{
                      background: `linear-gradient(to right, ${product.color}, ${
                        product.color === logoGreen 
                          ? (isDarkMode ? '#00CC00' : '#006400')
                          : (isDarkMode ? '#FFC107' : '#DAA520')
                      })`,
                      color: product.color === logoYellow && !isDarkMode ? '#000000' : '#000000',
                      boxShadow: isDarkMode 
                        ? `0 10px 20px ${product.color}30` 
                        : `0 10px 20px ${product.color}20`
                    }}
                  >
                    {product.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Climate Data APIs */}
          <div className="mb-20">
            <h3 className={`text-4xl font-bold ${themeClasses.text} mb-12 text-center`}>
              Climate Data
              <span style={{ color: logoGreen }}> APIs</span>
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div
                  key={index}
                  className={`${themeClasses.cardBgAlt} backdrop-blur-xl rounded-xl p-6 border ${
                    themeClasses.border
                  } transition-all duration-300 hover:${
                    themeClasses.borderHover
                  } shadow-md ${
                    isDarkMode ? "shadow-black/10" : "shadow-gray-200/30"
                  }`}
                >
                  <div className="flex items-start mb-4">
                    <div 
                      className="p-2 rounded-lg mr-3" 
                      style={{ 
                        backgroundColor: `${logoGreen}${isDarkMode ? '20' : '10'}`,
                        border: `1px solid ${logoGreen}${isDarkMode ? '30' : '20'}`
                      }}
                    >
                      <div style={{ color: logoGreen }}>{api.icon}</div>
                    </div>
                    <h4 className={`text-lg font-semibold ${themeClasses.text}`}>
                      {api.title}
                    </h4>
                  </div>
                  <p className={`${themeClasses.textMuted} text-sm mb-4`}>
                    {api.description}
                  </p>
                  <button
                    onClick={() => navigate("/request-demo")}
                    className="text-sm font-medium hover:underline"
                    style={{ color: logoYellow }}
                  >
                    Request Demo →
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Training & Capacity Building */}
          <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl p-8 border ${
            themeClasses.border
          } shadow-xl ${
            isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"
          }`}>
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 pr-8">
                <div className="flex items-center mb-4">
                  <div 
                    className="p-3 rounded-xl mr-4" 
                    style={{ 
                      backgroundColor: `${logoYellow}${isDarkMode ? '20' : '10'}`,
                      border: `1px solid ${logoYellow}${isDarkMode ? '30' : '20'}`
                    }}
                  >
                    <BookOpen className="w-8 h-8" style={{ color: logoYellow }} />
                  </div>
                  <h3 className={`text-3xl font-bold ${themeClasses.text}`}>
                    Training & Capacity Building
                  </h3>
                </div>
                <p className={`${themeClasses.textSecondary} mb-6 leading-relaxed`}>
                  MAVHU's training services support farmers, agricultural organisations,
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
                      <CheckCircle className="w-4 h-4 mr-2" style={{ color: logoGreen }} />
                      <span className={`${themeClasses.textMuted}`}>{item}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate("/training")}
                  className="inline-flex items-center font-semibold hover:underline"
                  style={{ color: logoGreen }}
                >
                  Learn About Our Training Programs
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
              <div className="md:w-1/3 mt-8 md:mt-0">
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2" style={{ color: logoGreen }}>100+</div>
                  <div className={`${themeClasses.textSecondary} font-semibold`}>Organizations Trained</div>
                  <div className="mt-4 text-5xl font-bold mb-2" style={{ color: logoGreen }}>5000+</div>
                  <div className={`${themeClasses.textSecondary} font-semibold`}>Individuals Empowered</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-24 relative">
        <div
          className="absolute inset-0"
          style={{
            background: isDarkMode
              ? `linear-gradient(to right, ${logoGreen}10, ${logoYellow}10)`
              : `linear-gradient(to right, ${logoGreen}05, ${logoYellow}05)`,
          }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className={`text-5xl font-bold ${themeClasses.text} mb-6`}>
              Our
              <span style={{ color: logoGreen }}> Impact</span>
            </h2>
            <p className={`text-xl ${themeClasses.textMuted}`}>
              Numbers that demonstrate our commitment to African climate action
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 text-center">
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
              <div key={index} className="group">
                <div
                  className={`${
                    isDarkMode ? "bg-black/20" : "bg-white/90"
                  } backdrop-blur-xl rounded-2xl p-8 border ${
                    themeClasses.border
                  } hover:${
                    themeClasses.borderHover
                  } transition-all duration-300 hover:transform hover:scale-105 shadow-lg ${
                    isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"
                  }`}
                >
                  <div className="flex justify-center mb-4" style={{ color: logoGreen }}>
                    {stat.icon}
                  </div>
                  <div className="text-5xl font-bold mb-2" style={{ color: logoGreen }}>
                    {stat.number}
                  </div>
                  <div className={`${themeClasses.textMuted} font-medium`}>
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div
          className="absolute inset-0"
          style={{
            background: isDarkMode
              ? `linear-gradient(to right, ${logoGreen}20, ${logoYellow}20)`
              : `linear-gradient(to right, ${logoGreen}10, ${logoYellow}10)`,
          }}
        ></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className={`text-6xl font-bold ${themeClasses.text} mb-8`}>
            Ready to Transform
            <br />
            <span style={{ color: logoGreen }}>African Climate Action?</span>
          </h2>
          <p className={`text-2xl ${themeClasses.textSecondary} mb-12 leading-relaxed`}>
            Join governments, financial institutions, and organizations across Africa
            who trust MAVHU for accurate, verified climate intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => navigate("/request-demo")}
              className="relative py-5 rounded-2xl text-lg font-bold transition-all transform hover:scale-105 shadow-xl overflow-hidden group"
              style={{
                background: `linear-gradient(to right, ${logoYellow}, ${isDarkMode ? '#FFC107' : '#DAA520'})`,
                color: isDarkMode ? '#000000' : '#000000',
                boxShadow: isDarkMode 
                  ? `0 20px 40px ${logoYellow}30` 
                  : `0 20px 40px ${logoYellow}20`
              }}
            >
              <span className="relative z-10 flex items-center justify-center px-12">
                Request a Demo
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(to right, ${logoYellow}CC, ${isDarkMode ? '#FFC107CC' : '#DAA520CC'})`
                }}
              ></div>
            </button>
            <button
              onClick={() => navigate("/partner")}
              className={`border-2 ${
                isDarkMode
                  ? "border-white/30 hover:border-white/50 text-white hover:bg-white/10"
                  : "border-gray-300 hover:border-gray-500 text-gray-900 hover:bg-gray-100/50"
              } px-12 py-5 rounded-2xl text-lg font-semibold transition-all backdrop-blur-sm shadow-lg ${
                isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"
              }`}
            >
              Partner With Us
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer isDarkMode={isDarkMode} themeClasses={themeClasses} />

      {/* Add custom style tag for dynamic colors */}
      <style>{`
        :root {
          --logo-green: ${logoGreen};
          --logo-yellow: ${logoYellow};
        }
        
        button:hover {
          transition: all 0.3s ease;
        }
        
        .bg-logo-green {
          background-color: ${logoGreen};
        }
        
        .bg-logo-yellow {
          background-color: ${logoYellow};
        }
        
        .text-logo-green {
          color: ${logoGreen};
        }
        
        .text-logo-yellow {
          color: ${logoYellow};
        }
      `}</style>
    </div>
  );
};

export default LandingPage;