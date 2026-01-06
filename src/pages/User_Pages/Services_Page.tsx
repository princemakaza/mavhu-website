import React from "react";
import {
  Database,
  Smartphone,
  BarChart3,
  Cloud,
  Users,
  Shield,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Zap,
  MapPin,
  ArrowRight,
  Target,
  BookOpen,
  Layers,
  CloudRain,
  Navigation,
  Activity,
} from "lucide-react";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";
import skyImage from "../../assets/sky.jpeg";
import earthImage from "../../assets/earth.jpeg";
import aiImage from "../../assets/automa.jpeg";
import esgImage from "../../assets/esg.jpeg";
import farmersApp from "../../assets/bg-land.png";
import apiClimate from "../../assets/api.jpg";

const ServicesPage = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const [expandedService, setExpandedService] = React.useState<number | null>(
    null
  );
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e: { clientX: any; clientY: any }) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const toggleService = (index: number) => {
    setExpandedService(expandedService === index ? null : index);
  };

  // MAVHU Color Theme
  const logoGreen = isDarkMode ? "#00FF00" : "#008000";
  const logoYellow = isDarkMode ? "#FFD700" : "#B8860B";
  const darkBg = "#0A0A0A";
  const lightBg = "#F5F5F5";
  const lightCardBg = "#FFFFFF";

  // Theme-aware classes with MAVHU color scheme
  const themeClasses = {
    bg: isDarkMode ? darkBg : lightBg,
    text: isDarkMode ? "text-white" : "text-gray-900",
    textSecondary: isDarkMode ? "text-gray-300" : "text-gray-700",
    textMuted: isDarkMode ? "text-gray-400" : "text-gray-600",
    cardBg: isDarkMode ? `${darkBg}/30` : `${lightCardBg}/95`,
    cardBgAlt: isDarkMode ? `${darkBg}/40` : `${lightCardBg}/90`,
    border: isDarkMode ? "border-white/10" : "border-gray-300/70",
    borderHover: isDarkMode ? "border-white/20" : "border-gray-400",
    backgroundGradient: isDarkMode
      ? `bg-gradient-to-br from-gray-900 via-${darkBg.replace('#', '')} to-black`
      : `bg-gradient-to-br from-gray-50 via-${lightBg.replace('#', '')} to-gray-100`,
    glowEffect: isDarkMode ? `shadow-[${logoGreen}]/25` : `shadow-[${logoGreen}]/15`,
    hoverBg: isDarkMode ? "hover:bg-white/10" : "hover:bg-gray-100",
  };

  const services = [
    {
      id: "esg-dashboard",
      title: "ESG & Climate Intelligence Dashboard",
      icon: <BarChart3 className="w-8 h-8" />,
      image: esgImage,
      shortDescription: "Comprehensive platform for monitoring climate indicators, tracking verified outcomes, and supporting ESG disclosures with accurate, audit-ready data.",
      fullDescription: "The MAVHU ESG & Climate Intelligence Dashboard integrates satellite data, drone imagery, ground verification, and automated MRV systems to deliver trusted climate and sustainability data. Built for financial institutions, corporates, governments, and climate project developers who require accurate data for decision-making and reporting.",
      color: "from-green-500 to-emerald-500",
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
      // ctaText: "Request Dashboard Demo",
    },
    {
      id: "farmer-app",
      title: "Farmer App & Field Intelligence",
      icon: <Smartphone className="w-8 h-8" />,
      image: farmersApp,
      shortDescription: "Mobile application for farmers to capture farm-level data, receive climate insights, and ensure compliance with agricultural and climate programs.",
      fullDescription: "The MAVHU Farmer App is designed for farmers, cooperatives, and field teams participating in climate, sustainability, or agricultural programmes. It combines on-the-ground data collection with drone and satellite monitoring, delivering localized climate insights that improve resilience and decision-making. Verified farm-level data feeds securely into broader climate and ESG systems.",
      color: "from-yellow-500 to-amber-500",
      features: [
        "Offline-first data collection (works without internet)",
        "GPS field mapping and boundary delineation",
        "Climate-smart farming recommendations",
        "Program compliance tracking and reporting",
        "Yield prediction models using AI",
        "Multi-language support for African languages",
        "Automated data sync with central systems",
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
      // ctaText: "Download App / Request Demo",
    },
    {
      id: "climate-apis",
      title: "Climate Data APIs Suite",
      icon: <Database className="w-8 h-8" />,
      image: apiClimate,
      shortDescription: "Enterprise-grade APIs providing verified, locally grounded climate intelligence for integration into organizational systems and applications.",
      fullDescription: "MAVHU provides secure, enterprise-grade climate data APIs that enable organisations to integrate verified, locally grounded climate intelligence directly into their systems. Our APIs combine Earth observation data, ground verification, and AI analytics to deliver actionable insights across multiple climate dimensions.",
      color: "from-blue-500 to-cyan-500",
      apiCategories: [
        {
          name: "Earth Surface Intelligence",
          icon: <MapPin className="w-5 h-5" />,
          apis: [
            {
              title: "Land & Land-Use Intelligence API",
              description: "Verified data on land use, land cover change, and vegetation dynamics to support monitoring, verification, and risk assessment.",
              features: ["Historical land use analysis", "Deforestation alerts", "Crop type classification", "Land degradation scoring"],
            },
            {
              title: "Soil & Carbon Intelligence API",
              description: "Soil indicators and carbon measurement insights derived from geospatial intelligence and ground-truth verification.",
              features: ["Soil health metrics", "Carbon stock estimation", "Erosion risk assessment", "Nutrient level monitoring"],
            },
          ],
        },
        {
          name: "Climate & Atmospheric Intelligence",
          icon: <Cloud className="w-5 h-5" />,
          apis: [
            {
              title: "Climate Risk & Resilience API",
              description: "Localized climate risk and resilience indicators to inform planning, underwriting, and adaptation strategies.",
              features: ["Extreme weather risk scores", "Drought/flood vulnerability", "Climate adaptation indices", "Long-term trend analysis"],
            },
            {
              title: "Weather & Microclimate API",
              description: "Hyper-local weather data and microclimate conditions for agricultural and infrastructure planning.",
              features: ["Precipitation forecasts", "Temperature extremes", "Humidity patterns", "Wind speed/direction data"],
            },
          ],
        },
        {
          name: "Verification & Compliance",
          icon: <Shield className="w-5 h-5" />,
          apis: [
            {
              title: "MRV & Verification Status API",
              description: "Access to verification status, audit trails, and MRV outputs for climate and sustainability programmes.",
              features: ["Automated verification workflows", "Audit trail generation", "Compliance status tracking", "Real-time validation updates"],
            },
            {
              title: "ESG & Sustainability Metrics API",
              description: "Standardized climate and environmental indicators designed to integrate directly into ESG reporting platforms.",
              features: ["SDG alignment metrics", "Carbon footprint calculations", "Biodiversity impact scores", "Water usage analytics"],
            },
          ],
        },
      ],
      // ctaText: "Request API Access",
    },
    {
      id: "training",
      title: "Training & Capacity Building",
      icon: <Users className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=400&fit=crop",
      shortDescription: "Comprehensive training programs to build capacity in climate data management, ESG reporting, and sustainable agricultural practices.",
      fullDescription: "MAVHU's training services support farmers, agricultural organisations, institutions, and implementation partners involved in climate and sustainability initiatives. We deliver locally grounded field engagement, structured learning modules, and digital tools aligned with our data systems to ensure long-term data quality and local capacity building.",
      color: "from-purple-500 to-pink-500",
      trainingModules: [
        "Climate Data Literacy & Digital Skills",
        "ESG Reporting Fundamentals & Standards",
        "MRV System Implementation & Management",
        "Farm-Level Data Collection Best Practices",
        "Climate Risk Assessment & Adaptation",
        "Sustainable Agriculture Practices & Certification",
        "Drone & Satellite Data Interpretation",
        "Carbon Credit Project Development",
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
        "Academic & research institutions",
      ],
      // ctaText: "Enroll Now / Request Training",
    },
  ];

  const mavhuApproach = [
    {
      title: "MAVHU Sky",
      description: "Harnessing drones, satellites, and geospatial technology for comprehensive aerial data collection",
      image: skyImage,
      features: [
        "Multi-spectral satellite imagery",
        "Drone-based high-resolution mapping",
        "Weather satellite data integration",
        "Aerial sensor networks",
        "Real-time atmospheric monitoring",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "MAVHU Earth",
      description: "Ground-truthing through field verification, ensuring data is accurate and locally relevant",
      image: earthImage,
      features: [
        "Field verification teams across Africa",
        "Soil sampling and analysis",
        "Vegetation ground truthing",
        "Local knowledge integration",
        "Community-led data collection",
      ],
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "MAVHU AI",
      description: "Utilizing machine learning and automated MRV to process and report data efficiently",
      image: aiImage,
      features: [
        "Machine learning algorithms for pattern recognition",
        "Automated data validation pipelines",
        "Predictive analytics for climate trends",
        "Natural language processing for reports",
        "Automated anomaly detection",
      ],
      color: "from-purple-500 to-pink-500",
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
      <section className="relative pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1
              className={`text-6xl lg:text-7xl font-bold leading-tight mb-8 ${themeClasses.text}`}
            >
              Our
              <span style={{ color: logoGreen }}> Integrated</span>
              <br />
              <span style={{ color: logoYellow }}>Climate Solutions</span>
            </h1>
            <p
              className={`text-xl ${themeClasses.textSecondary} mb-10 leading-relaxed max-w-4xl mx-auto`}
            >
              Combining Earth observation, ground verification, and AI analytics to deliver trusted climate intelligence across Africa's skies, earth, and communities.
            </p>
          </div>
        </div>
      </section>

      {/* MAVHU Approach Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-4xl font-bold ${themeClasses.text} mb-6`}>
              The
              <span style={{ color: logoGreen }}> MAVHU</span>
              <span style={{ color: logoYellow }}> Approach</span>
            </h2>
            <p className={`text-lg ${themeClasses.textMuted} max-w-3xl mx-auto`}>
              Our integrated methodology spans from the skies above to the earth below,
              powered by intelligent analytics for complete climate intelligence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {mavhuApproach.map((approach, index) => (
              <div
                key={index}
                className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl overflow-hidden border ${themeClasses.border} hover:${themeClasses.borderHover} transition-all duration-300 hover:transform hover:scale-105 group`}
              >
                {/* Image with gradient overlay */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={approach.image}
                    alt={approach.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Gradient overlay based on approach */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${approach.color} opacity-30`}></div>
                  {/* Dark overlay for text readability */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? 'from-black/80 via-black/40 to-transparent' : 'from-black/60 via-black/30 to-transparent'}`}></div>

                  {/* Title overlay on image */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className={`text-2xl font-bold text-white mb-2`}>
                      {approach.title}
                    </h3>
                    <p className={`text-white/80 text-sm`}>
                      {approach.description}
                    </p>
                  </div>
                </div>

                {/* Features list below */}
                <div className="p-6">
                  <h4 className={`text-lg font-semibold ${themeClasses.text} mb-4 flex items-center`}>
                    <div className="w-3 h-3 rounded-full mr-2"
                      style={{
                        backgroundColor: approach.title.includes('Sky') ? '#3b82f6' :
                          approach.title.includes('Earth') ? logoGreen :
                            '#a855f7'
                      }}></div>
                    Key Capabilities
                  </h4>
                  <ul className="space-y-2">
                    {approach.features.map((feature, idx) => (
                      <li key={idx} className={`flex items-start ${themeClasses.textMuted} text-sm`}>
                        <CheckCircle className="w-4 h-4 mr-3 mt-0.5 flex-shrink-0"
                          style={{
                            color: approach.title.includes('Sky') ? '#3b82f6' :
                              approach.title.includes('Earth') ? logoGreen :
                                '#a855f7'
                          }} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid - Single Column Layout */}
      <section className="py-10 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-4xl font-bold ${themeClasses.text} mb-6`}>
              <span style={{ color: logoGreen }}>Our</span>
              <span style={{ color: logoYellow }}> Services</span>
            </h2>
            <p className={`text-lg ${themeClasses.textMuted} max-w-3xl mx-auto`}>
              Click or hover on any service card to view detailed information
            </p>
          </div>

          <div className="space-y-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl overflow-hidden border ${themeClasses.border} hover:${themeClasses.borderHover} transition-all duration-500 group relative`}
                onMouseEnter={() => expandedService === null && setExpandedService(index)}
                onMouseLeave={() => expandedService === index && setExpandedService(null)}
                onClick={() => toggleService(index)}
              >
                {/* Service Header */}
                <div className="p-6 cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${service.color} backdrop-blur-sm flex-shrink-0`}>
                        <div className="text-white">{service.icon}</div>
                      </div>
                      <div>
                        <h3 className={`text-2xl font-bold ${themeClasses.text} mb-2`}>
                          {service.title}
                        </h3>
                        <p className={`${themeClasses.textMuted} mb-4`}>
                          {service.shortDescription}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm bg-black/50 text-white">
                            {service.id.includes('api') ? 'Enterprise APIs' :
                              service.id.includes('app') ? 'Mobile Platform' :
                                service.id.includes('dashboard') ? 'Web Platform' : 'Services'}
                          </span>
                          <span className="px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm"
                            style={{
                              background: `${logoGreen}${isDarkMode ? '30' : '20'}`,
                              color: logoGreen
                            }}>
                            Pan-African Coverage
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      {expandedService === index ? (
                        <ChevronUp className="w-6 h-6" style={{ color: logoGreen }} />
                      ) : (
                        <ChevronDown className="w-6 h-6" style={{ color: logoGreen }} />
                      )}
                    </div>
                  </div>
                </div>

                {/* Service Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? 'from-black/70 via-black/40 to-transparent' : 'from-black/60 via-black/30 to-transparent'}`}></div>
                </div>

                {/* Expanded Content */}
                {(expandedService === index) && (
                  <div className={`p-6 border-t ${themeClasses.border} ${isDarkMode ? "bg-white/5" : "bg-gray-100/30"}`}>
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Left Column */}
                      <div>
                        <h4 className={`text-xl font-bold ${themeClasses.text} mb-4`}>
                          Detailed Description
                        </h4>
                        <p className={`${themeClasses.textSecondary} leading-relaxed mb-6`}>
                          {service.fullDescription}
                        </p>

                        {/* Features */}
                        {service.features && (
                          <div className="mb-6">
                            <h5 className={`text-lg font-semibold ${themeClasses.text} mb-3 flex items-center`}>
                              <CheckCircle className="w-5 h-5 mr-2" style={{ color: logoGreen }} />
                              Key Features
                            </h5>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {service.features.map((feature, idx) => (
                                <div key={idx} className="flex items-start">
                                  <div className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0" style={{ backgroundColor: logoGreen }}></div>
                                  <span className={`${themeClasses.textMuted} text-sm`}>{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Training Modules */}
                        {service.trainingModules && (
                          <div className="mb-6">
                            <h5 className={`text-lg font-semibold ${themeClasses.text} mb-3 flex items-center`}>
                              <BookOpen className="w-5 h-5 mr-2" style={{ color: logoGreen }} />
                              Training Modules
                            </h5>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {service.trainingModules.slice(0, 6).map((module, idx) => (
                                <div key={idx} className="flex items-start">
                                  <div className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                                    style={{
                                      background: `linear-gradient(to bottom right, ${logoGreen}, ${logoYellow})`
                                    }}></div>
                                  <span className={`${themeClasses.textMuted} text-sm`}>{module}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Right Column */}
                      <div>
                        {/* Use Cases */}
                        {service.useCases && (
                          <div className="mb-8">
                            <h5 className={`text-lg font-semibold ${themeClasses.text} mb-3 flex items-center`}>
                              <Target className="w-5 h-5 mr-2" style={{ color: logoGreen }} />
                              Use Cases
                            </h5>
                            <div className="space-y-2">
                              {service.useCases.map((useCase, idx) => (
                                <div key={idx} className="flex items-start">
                                  <div className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0" style={{ backgroundColor: logoYellow }}></div>
                                  <span className={`${themeClasses.textMuted}`}>{useCase}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Capabilities */}
                        {service.capabilities && (
                          <div className="mb-8">
                            <h5 className={`text-lg font-semibold ${themeClasses.text} mb-3 flex items-center`}>
                              <Zap className="w-5 h-5 mr-2" style={{ color: logoGreen }} />
                              Capabilities
                            </h5>
                            <div className="grid grid-cols-2 gap-3">
                              {service.capabilities.map((capability, idx) => (
                                <div key={idx} className={`text-center p-3 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-gray-100/50'}`}>
                                  <div className={`text-sm ${themeClasses.textMuted}`}>{capability}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Target Users */}
                        {service.targetUsers && (
                          <div className="mb-8">
                            <h5 className={`text-lg font-semibold ${themeClasses.text} mb-3 flex items-center`}>
                              <Users className="w-5 h-5 mr-2" style={{ color: logoGreen }} />
                              Target Users
                            </h5>
                            <div className="space-y-2">
                              {service.targetUsers.map((user, idx) => (
                                <div key={idx} className="flex items-start">
                                  <div className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0" style={{ backgroundColor: logoGreen }}></div>
                                  <span className={`${themeClasses.textMuted} text-sm`}>{user}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Data Sources */}
                        {service.dataSources && (
                          <div className="mb-8">
                            <h5 className={`text-lg font-semibold ${themeClasses.text} mb-3 flex items-center`}>
                              <Database className="w-5 h-5 mr-2" style={{ color: logoGreen }} />
                              Data Sources
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              {service.dataSources.map((source, idx) => (
                                <span key={idx} className="px-3 py-1 rounded-full text-xs font-medium"
                                  style={{
                                    background: `${logoGreen}${isDarkMode ? '20' : '10'}`,
                                    color: logoGreen
                                  }}>
                                  {source}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Delivery Methods */}
                        {service.deliveryMethods && (
                          <div>
                            <h5 className={`text-lg font-semibold ${themeClasses.text} mb-3 flex items-center`}>
                              <ArrowRight className="w-5 h-5 mr-2" style={{ color: logoGreen }} />
                              Delivery Methods
                            </h5>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {service.deliveryMethods.map((method, idx) => (
                                <div key={idx} className="flex items-start">
                                  <div className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0" style={{ backgroundColor: logoYellow }}></div>
                                  <span className={`${themeClasses.textMuted} text-sm`}>{method}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* API Categories Section - Full Width */}
                    {service.apiCategories && (
                      <div className="mt-8 pt-8 border-t border-white/10">
                        <h5 className={`text-xl font-bold ${themeClasses.text} mb-6 flex items-center`}>
                          <Database className="w-6 h-6 mr-3" style={{ color: logoGreen }} />
                          API Categories
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {service.apiCategories.map((category, catIdx) => (
                            <div key={catIdx} className={`${isDarkMode ? 'bg-white/5' : 'bg-gray-100/50'} rounded-xl p-5`}>
                              <div className="flex items-center mb-3">
                                <div className="p-2 rounded-lg mr-3" style={{
                                  background: `${logoGreen}${isDarkMode ? '20' : '10'}`,
                                  color: logoGreen
                                }}>
                                  {category.icon}
                                </div>
                                <h6 className={`font-semibold ${themeClasses.text}`}>{category.name}</h6>
                              </div>
                              <div className="space-y-4">
                                {category.apis.map((api, apiIdx) => (
                                  <div key={apiIdx} className="text-sm">
                                    <div className="font-medium mb-2" style={{ color: logoYellow }}>{api.title}</div>
                                    <div className={`${themeClasses.textMuted} text-xs mb-3`}>{api.description}</div>
                                    <div className="flex flex-wrap gap-2">
                                      {api.features?.map((feature, fIdx) => (
                                        <span key={fIdx} className="px-3 py-1 rounded-full text-xs"
                                          style={{
                                            background: `${logoGreen}${isDarkMode ? '20' : '10'}`,
                                            color: logoGreen
                                          }}>
                                          {feature}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Service-specific CTA */}
                    <div className="mt-8 pt-6 border-t border-white/10">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`${themeClasses.textMuted} text-sm`}>
                            Ready to explore {service.title}?
                          </p>
                        </div>
                        <button
                          className={`px-6 py-2 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2`}
                          style={{
                            background: `linear-gradient(to right, ${logoGreen}, ${logoYellow})`,
                            color: isDarkMode ? '#000000' : '#000000',
                            boxShadow: isDarkMode
                              ? `0 5px 20px ${logoGreen}30`
                              : `0 5px 20px ${logoGreen}20`
                          }}
                        >
                          {service.ctaText}
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrated Ecosystem Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-4xl font-bold ${themeClasses.text} mb-6`}>
              <span style={{ color: logoGreen }}>Integrated</span>
              <span style={{ color: logoYellow }}> Climate Intelligence</span>
              <span className={themeClasses.text}> Ecosystem</span>
            </h2>
            <p className={`text-lg ${themeClasses.textMuted} max-w-3xl mx-auto`}>
              Our ecosystem combines multiple data layers and technologies to deliver comprehensive climate intelligence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl p-8 text-center border ${themeClasses.border}`}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{
                  background: `linear-gradient(to bottom right, ${logoGreen}30, ${logoYellow}30)`,
                  border: `2px solid ${logoGreen}${isDarkMode ? '40' : '30'}`
                }}>
                <CloudRain className="w-8 h-8" style={{ color: logoGreen }} />
              </div>
              <h3 className={`text-xl font-bold ${themeClasses.text} mb-3`}>Atmospheric Data</h3>
              <p className={themeClasses.textMuted}>Real-time weather, climate patterns, and atmospheric conditions</p>
            </div>

            <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl p-8 text-center border ${themeClasses.border}`}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{
                  background: `linear-gradient(to bottom right, ${logoGreen}30, ${logoYellow}30)`,
                  border: `2px solid ${logoGreen}${isDarkMode ? '40' : '30'}`
                }}>
                <Layers className="w-8 h-8" style={{ color: logoYellow }} />
              </div>
              <h3 className={`text-xl font-bold ${themeClasses.text} mb-3`}>Earth Surface Intelligence</h3>
              <p className={themeClasses.textMuted}>Land use, vegetation, soil health, and surface temperature</p>
            </div>

            <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl p-8 text-center border ${themeClasses.border}`}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{
                  background: `linear-gradient(to bottom right, ${logoGreen}30, ${logoYellow}30)`,
                  border: `2px solid ${logoGreen}${isDarkMode ? '40' : '30'}`
                }}>
                <Navigation className="w-8 h-8" style={{ color: logoGreen }} />
              </div>
              <h3 className={`text-xl font-bold ${themeClasses.text} mb-3`}>Automated Data Collection</h3>
              <p className={themeClasses.textMuted}>Satellite, drone, and IoT networks for continuous monitoring</p>
            </div>

            <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl p-8 text-center border ${themeClasses.border}`}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{
                  background: `linear-gradient(to bottom right, ${logoGreen}30, ${logoYellow}30)`,
                  border: `2px solid ${logoGreen}${isDarkMode ? '40' : '30'}`
                }}>
                <Activity className="w-8 h-8" style={{ color: logoYellow }} />
              </div>
              <h3 className={`text-xl font-bold ${themeClasses.text} mb-3`}>Historical Analysis</h3>
              <p className={themeClasses.textMuted}>Decades of historical climate data for trend analysis and prediction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main CTA Section */}
      <section className="py-24 relative">
        <div
          className="absolute inset-0"
          style={{
            background: isDarkMode
              ? `linear-gradient(45deg, ${logoGreen}20, ${logoYellow}20)`
              : `linear-gradient(45deg, ${logoGreen}10, ${logoYellow}10)`,
          }}
        ></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className={`text-5xl font-bold ${themeClasses.text} mb-8`}>
            Transform Climate Action
            <br />
            <span style={{ color: logoGreen }}>With Integrated</span>
            <span style={{ color: logoYellow }}> Intelligence</span>
          </h2>
          <p
            className={`text-xl ${themeClasses.textSecondary} mb-12 leading-relaxed`}
          >
            Join governments, financial institutions, and organizations across Africa
            who trust MAVHU for comprehensive climate intelligence that drives meaningful impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              className={`relative bg-gradient-to-r from-[${logoGreen}] to-[${logoYellow}] hover:from-[${logoGreen}]/90 hover:to-[${logoYellow}]/90 text-black px-10 py-4 rounded-2xl text-lg font-bold transition-all transform hover:scale-110 shadow-2xl ${themeClasses.glowEffect}`}
              style={{
                background: `linear-gradient(to right, ${logoGreen}, ${logoYellow})`,
                boxShadow: isDarkMode
                  ? `0 20px 40px ${logoGreen}40`
                  : `0 20px 40px ${logoGreen}20`
              }}
            >
              Request Full Demo
              <ArrowRight className="w-5 h-5 ml-2 inline-block" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer isDarkMode={isDarkMode} themeClasses={themeClasses} />

      {/* Add custom style tag for dynamic colors */}
      <style>{`
        @media (min-width: 1024px) {
          .group:hover .lg\\:group-hover\\:block {
            display: block;
          }
        }
        
        button:hover, a:hover {
          transition: all 0.3s ease;
        }
        
        .service-card {
          transition: all 0.3s ease;
        }
        
        .service-card:hover {
          transform: translateY(-4px);
        }
      `}</style>
    </div>
  );
};

export default ServicesPage;