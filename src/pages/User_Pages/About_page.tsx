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
} from "lucide-react";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";

const AboutPage = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e: { clientX: any; clientY: any }) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Colors adjusted for both modes - darker in light mode
  const logoGreen = isDarkMode ? "#00FF00" : "#008000"; // Brighter green for dark, forest green for light
  const logoYellow = isDarkMode ? "#FFD700" : "#B8860B"; // Gold for dark, dark goldenrod for light
  const darkBg = "#0A0A0A"; // Not pure black
  const lightBg = "#F5F5F5"; // Light but not pure white
  const lightCardBg = "#FFFFFF"; // Pure white for cards in light mode

  // Updated theme-aware classes with MAVHU color scheme
  // In About_page.tsx, update themeClasses to include glowEffect:
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
    // ADD THIS LINE
    glowEffect: isDarkMode
      ? "shadow-[0_0_20px_rgba(0,255,0,0.3)]"
      : "shadow-[0_0_20px_rgba(0,128,0,0.1)]",
  };

  const values = [
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Measured",
      description: "Precise data collection from multiple high-tech sources",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Verified",
      description: "Rigorous validation to ensure data integrity",
      color: "from-green-600 to-emerald-600",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Sovereign",
      description: "Locally governed and contextually relevant data",
      color: "from-yellow-500 to-amber-500",
    },
    {
      icon: <Map className="w-8 h-8" />,
      title: "Local",
      description: "Grounded in African realities for impactful solutions",
      color: "from-green-700 to-emerald-700",
    },
  ];

  const approach = [
    {
      title: "MAVHU Sky",
      description: "Harnessing drones, satellites, and geospatial technology for comprehensive data collection",
      icon: <Satellite className="w-8 h-8" />,
      color: logoGreen,
    },
    {
      title: "MAVHU Earth",
      description: "Ground-truthing through field verification, ensuring data is accurate and locally relevant",
      icon: <Map className="w-8 h-8" />,
      color: logoGreen,
    },
    {
      title: "MAVHU AI",
      description: "Utilizing machine learning and automated MRV to process and report data efficiently",
      icon: <HardDrive className="w-8 h-8" />,
      color: logoYellow,
    },
  ];

  const teamMembers = [
    {
      name: "Dr. Tariro Makoni",
      role: "Chief Executive Officer",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
      bio: "15+ years in climate science, former Director at African Climate Research Institute, PhD in Environmental Science.",
    },
    {
      name: "Kwame Osei",
      role: "Chief Technology Officer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "AI/ML expert with experience at Google and NASA, specializing in geospatial data analysis and climate modeling.",
    },
    {
      name: "Amina Bello",
      role: "Head of Field Operations",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face",
      bio: "10+ years in agricultural development and field verification across 15 African countries.",
    },
    {
      name: "Dr. Samuel Ndlovu",
      role: "Chief Data Scientist",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      bio: "PhD in Data Science, former lead data analyst at World Bank Climate Group, specializing in climate data verification.",
    },
  ];

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
          className={`absolute inset-0 ${isDarkMode
              ? "bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,0,0.1),transparent_50%)]"
              : "bg-[radial-gradient(circle_at_50%_50%,rgba(0,128,0,0.05),transparent_50%)]"
            }`}
        ></div>
        <div
          className={`absolute inset-0 ${isDarkMode
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
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      {/* Hero Section */}
      <section className="relative pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1
              className={`text-6xl lg:text-7xl font-bold leading-tight mb-8 ${themeClasses.text}`}
            >
              About
              <span style={{ color: logoGreen }}> MAVHU</span>
            </h1>
            <p
              className={`text-xl ${themeClasses.textSecondary} mb-10 leading-relaxed max-w-4xl mx-auto`}
            >
              MAVHU is an Africa-focused climate data and verification company building
              the foundational data infrastructure required for credible climate action.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Mission */}
            <div
              className={`${themeClasses.cardBg} backdrop-blur-xl rounded-3xl p-8 border ${themeClasses.border} hover:${themeClasses.borderHover} transition-all duration-300 shadow-xl ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"
                }`}
            >
              <div className="flex items-center mb-6">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center mr-6"
                  style={{
                    backgroundColor: `${logoGreen}${isDarkMode ? '30' : '20'}`,
                    border: `1px solid ${logoGreen}${isDarkMode ? '40' : '30'}`
                  }}
                >
                  <Target className="w-8 h-8" style={{ color: logoGreen }} />
                </div>
                <h2 className={`text-3xl font-bold ${themeClasses.text}`}>
                  Our Mission
                </h2>
              </div>
              <p
                className={`${themeClasses.textSecondary} leading-relaxed mb-6 text-lg`}
              >
                To make African climate action measurable, verifiable, and investible.
              </p>
              <p className={`${themeClasses.textMuted} leading-relaxed`}>
                We're building the data infrastructure that transforms climate initiatives
                from fragmented efforts into credible, investible opportunities that drive
                real impact across the continent.
              </p>
            </div>

            {/* Vision */}
            <div
              className={`${themeClasses.cardBg} backdrop-blur-xl rounded-3xl p-8 border ${themeClasses.border} hover:${themeClasses.borderHover} transition-all duration-300 shadow-xl ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"
                }`}
            >
              <div className="flex items-center mb-6">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center mr-6"
                  style={{
                    backgroundColor: `${logoYellow}${isDarkMode ? '30' : '20'}`,
                    border: `1px solid ${logoYellow}${isDarkMode ? '40' : '30'}`
                  }}
                >
                  <Globe className="w-8 h-8" style={{ color: logoYellow }} />
                </div>
                <h2 className={`text-3xl font-bold ${themeClasses.text}`}>
                  Our Vision
                </h2>
              </div>
              <p
                className={`${themeClasses.textSecondary} leading-relaxed mb-6 text-lg`}
              >
                To become Africa's trusted climate data partner, enabling transparent,
                data-driven climate action across the continent.
              </p>
              <p className={`${themeClasses.textMuted} leading-relaxed`}>
                We envision a future where every climate initiative in Africa is backed by
                verified, localized data that builds trust, attracts investment, and ensures
                sustainable impact for generations to come.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-16 relative">
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
              The
              <span style={{ color: logoGreen }}> Challenge</span>
            </h2>
          </div>

          <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-3xl p-8 border ${themeClasses.border} shadow-xl ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"
            }`}>
            <div className="flex items-start mb-8">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mr-6 flex-shrink-0"
                style={{
                  backgroundColor: `${logoGreen}${isDarkMode ? '30' : '20'}`,
                  border: `1px solid ${logoGreen}${isDarkMode ? '40' : '30'}`
                }}
              >
                <Eye className="w-6 h-6" style={{ color: logoGreen }} />
              </div>
              <div>
                <h3 className={`text-3xl font-bold ${themeClasses.text} mb-4`}>
                  The Problem
                </h3>
                <p className={`${themeClasses.textSecondary} leading-relaxed text-lg`}>
                  Across Africa, climate initiatives are constrained by fragmented, inconsistent,
                  or unverifiable data — limiting confidence, decision-making, and long-term impact.
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
                  className={`${themeClasses.cardBgAlt} backdrop-blur-xl rounded-xl p-6 border ${themeClasses.border} transition-all duration-300`}
                >
                  <div className="flex items-center mb-4">
                    <div
                      className="p-2 rounded-lg mr-3"
                      style={{
                        backgroundColor: `${logoGreen}${isDarkMode ? '20' : '10'}`,
                        border: `1px solid ${logoGreen}${isDarkMode ? '30' : '20'}`
                      }}
                    >
                      <div style={{ color: logoGreen }}>{item.icon}</div>
                    </div>
                    <h4 className={`text-lg font-semibold ${themeClasses.text}`}>
                      {item.title}
                    </h4>
                  </div>
                  <p className={`${themeClasses.textMuted} text-sm`}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className={`text-5xl font-bold ${themeClasses.text} mb-6`}>
              Our
              <span style={{ color: logoGreen }}> Approach</span>
            </h2>
            <p className={`text-xl ${themeClasses.textSecondary} max-w-3xl mx-auto`}>
              We combine multiple technologies and methodologies to deliver climate data
              that is accurate, transparent, and usable.
            </p>
          </div>

          <div className="space-y-8">
            {approach.map((item, index) => (
              <div
                key={index}
                className={`${themeClasses.cardBg} backdrop-blur-xl rounded-3xl p-8 border ${themeClasses.border} hover:${themeClasses.borderHover} transition-all duration-300 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"
                  }`}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center">
                  <div
                    className="w-20 h-20 rounded-xl flex items-center justify-center mr-8 mb-6 md:mb-0"
                    style={{
                      backgroundColor: `${item.color}${isDarkMode ? '30' : '20'}`,
                      border: `1px solid ${item.color}${isDarkMode ? '40' : '30'}`
                    }}
                  >
                    <div style={{ color: item.color }}>{item.icon}</div>
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-3xl font-bold ${themeClasses.text} mb-4`}>
                      {item.title}
                    </h3>
                    <p className={`${themeClasses.textSecondary} leading-relaxed`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Our Methodology Grid */}
          <div className="mt-20">
            <h3 className={`text-4xl font-bold ${themeClasses.text} mb-12 text-center`}>
              Our Integrated
              <span style={{ color: logoGreen }}> Methodology</span>
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Geospatial Data",
                  description: "Satellite imagery and remote sensing for comprehensive coverage",
                  icon: <Satellite className="w-6 h-6" />,
                },
                {
                  title: "Automated MRV",
                  description: "Machine learning-powered measurement, reporting and verification",
                  icon: <Cpu className="w-6 h-6" />,
                },
                {
                  title: "Field Validation",
                  description: "On-ground verification ensuring data accuracy and relevance",
                  icon: <Map className="w-6 h-6" />,
                },
                {
                  title: "Global Standards",
                  description: "Alignment with international climate reporting frameworks",
                  icon: <BarChart3 className="w-6 h-6" />,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`${themeClasses.cardBgAlt} backdrop-blur-xl rounded-xl p-6 border ${themeClasses.border} transition-all duration-300 hover:${themeClasses.borderHover} shadow-md ${isDarkMode ? "shadow-black/10" : "shadow-gray-200/30"
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
                      <div style={{ color: logoGreen }}>{item.icon}</div>
                    </div>
                    <h4 className={`text-lg font-semibold ${themeClasses.text}`}>
                      {item.title}
                    </h4>
                  </div>
                  <p className={`${themeClasses.textMuted} text-sm`}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-24 relative">
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
              Our
              <span style={{ color: logoGreen }}> Values</span>
            </h2>
            <p className={`text-xl ${themeClasses.textSecondary} max-w-3xl mx-auto`}>
              The principles that define how we work and what we stand for
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl p-8 border ${themeClasses.border} hover:${themeClasses.borderHover} transition-all duration-300 hover:transform hover:scale-105 text-center shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"
                  }`}
              >
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6"
                  style={{
                    backgroundColor: `${index === 2 ? logoYellow : logoGreen}${isDarkMode ? '30' : '20'}`,
                    border: `1px solid ${index === 2 ? logoYellow : logoGreen}${isDarkMode ? '40' : '30'}`
                  }}
                >
                  <div style={{ color: index === 2 ? logoYellow : logoGreen }}>{value.icon}</div>
                </div>
                <h3 className={`text-2xl font-bold ${themeClasses.text} mb-4`}>
                  {value.title}
                </h3>
                <p className={`${themeClasses.textSecondary} leading-relaxed`}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className={`text-5xl font-bold ${themeClasses.text} mb-6`}>
              Meet Our
              <span style={{ color: logoGreen }}> Leadership</span>
            </h2>
            <p className={`text-xl ${themeClasses.textSecondary} max-w-3xl mx-auto`}>
              The experts driving MAVHU's mission to transform African climate data
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl overflow-hidden border ${themeClasses.border} hover:${themeClasses.borderHover} transition-all duration-300 hover:transform hover:scale-105 group shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"
                  }`}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to top, ${isDarkMode ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)'}, transparent 50%)`
                    }}
                  ></div>
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-bold ${themeClasses.text} mb-2`}>
                    {member.name}
                  </h3>
                  <p className="font-semibold mb-3" style={{ color: logoGreen }}>
                    {member.role}
                  </p>
                  <p className={`${themeClasses.textMuted} text-sm leading-relaxed`}>
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-5xl font-bold ${themeClasses.text} mb-6`}>
              Get In
              <span style={{ color: logoGreen }}> Touch</span>
            </h2>
            <p className={`text-xl ${themeClasses.textSecondary} max-w-3xl mx-auto`}>
              Ready to transform your climate initiatives with verified data? We're here to help.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: <MapPin className="w-8 h-8" />,
                title: "Visit Us",
                detail: "123 Innovation Drive, Harare, Zimbabwe",
                color: logoGreen,
              },
              {
                icon: <Phone className="w-8 h-8" />,
                title: "Call Us",
                detail: "+263 78 969 3725",
                color: logoGreen,
              },
              {
                icon: <Mail className="w-8 h-8" />,
                title: "Email Us",
                detail: "info@mavhu.com",
                color: logoYellow,
              },
            ].map((contact, index) => (
              <div
                key={index}
                className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl p-8 border ${themeClasses.border} hover:${themeClasses.borderHover} transition-all duration-300 text-center group hover:transform hover:scale-105 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"
                  }`}
              >
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6"
                  style={{
                    backgroundColor: `${contact.color}${isDarkMode ? '30' : '20'}`,
                    border: `1px solid ${contact.color}${isDarkMode ? '40' : '30'}`
                  }}
                >
                  <div style={{ color: contact.color }}>{contact.icon}</div>
                </div>
                <h3 className={`text-xl font-bold ${themeClasses.text} mb-3`}>
                  {contact.title}
                </h3>
                <p className={`${themeClasses.textSecondary} text-lg`}>
                  {contact.detail}
                </p>
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
              onClick={() => window.location.href = "/request-demo"}
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
              onClick={() => window.location.href = "/partner"}
              className={`border-2 ${isDarkMode
                  ? "border-white/30 hover:border-white/50 text-white hover:bg-white/10"
                  : "border-gray-300 hover:border-gray-500 text-gray-900 hover:bg-gray-100/50"
                } px-12 py-5 rounded-2xl text-lg font-semibold transition-all backdrop-blur-sm shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"
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

export default AboutPage;