import React from "react";
import {
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  BarChart3,
  Database,
  Smartphone,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import LogoImage from "../assets/logo.png";

const colors = {
  primaryDark: "#123E56",
  secondaryBlue: "#1F5C73",
  goldAccent: "#B89A2F",
  lightBackground: "#F4FAFA",
  softGrey: "#DCE7E8",
  white: "#FFFFFF",
};

// Services data with individual routes
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
    useCases: [
      "risk scoring",
      "emissions data",
      "geospatial layers",
      "compliance systems",
    ],
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
    useCases: [
      "traceability",
      "grower onboarding",
      "field compliance",
      "regenerative adoption",
    ],
    icon: <Smartphone className="w-7 h-7" />,
    color: colors.secondaryBlue,
    hoverDetail:
      "Mobile-first farmer data capture tools supporting offline field use, GPS-referenced plot mapping, and compliance checklists. Combined with structured training curricula covering climate-smart practices and digital literacy.",
    route: "/services/farm",
  },
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] =
    React.useState(false);
  const [isMobileServicesExpanded, setIsMobileServicesExpanded] =
    React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsServicesDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigateToPage = (page: string) => {
    navigate(page);
    setIsMenuOpen(false);
    setIsServicesDropdownOpen(false);
    setIsMobileServicesExpanded(false);
  };

  const isActiveRoute = (route: string) => location.pathname === route;

  // Check if either the main services page or any service sub‑page is active
  const isAnyServiceActive = () =>
    location.pathname === "/services" ||
    servicesData.some((service) => location.pathname === service.route);

  // Animation variants
  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 20, delay: 0.1 },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.3 },
    }),
    hover: {
      scale: 1.05,
      color: colors.goldAccent,
      transition: { duration: 0.2 },
    },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: { duration: 0.15 },
    },
  };

  const simpleNavItems = [
    { name: "Home", route: "/" },
    { name: "About", route: "/about" },
    { name: "Contact", route: "/contact" },
  ];

  const renderLogoText = () => (
    <span
      className="text-xl font-bold tracking-tight"
      style={{ color: colors.primaryDark }}
    >
      MΛVHU <span style={{ color: colors.goldAccent }}>AFRICA</span>
    </span>
  );

  return (
    <motion.nav
      className="fixed w-full top-0 z-50 backdrop-blur-xl border-b"
      style={{
        backgroundColor: `${colors.white}CC`,
        borderBottomColor: colors.softGrey,
      }}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="flex-shrink-0">
              <img
                src={LogoImage}
                alt="MAVHU AFRICA Logo"
                className="h-10 w-auto"
              />
            </div>
            <motion.div
              className="ml-3"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {renderLogoText()}
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {simpleNavItems.map((item, index) => {
                const isActive = isActiveRoute(item.route);
                return (
                  <motion.button
                    key={item.name}
                    onClick={() => navigateToPage(item.route)}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    variants={menuItemVariants}
                    className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${isActive
                        ? `text-[${colors.goldAccent}]`
                        : `text-[${colors.primaryDark}]/80 hover:text-[${colors.secondaryBlue}]`
                      }`}
                  >
                    {item.name}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5"
                        style={{ backgroundColor: colors.goldAccent }}
                        layoutId="activeTab"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                  </motion.button>
                );
              })}

              {/* Services Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <motion.button
                  onClick={() =>
                    setIsServicesDropdownOpen(!isServicesDropdownOpen)
                  }
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center gap-1 ${isAnyServiceActive()
                      ? `text-[${colors.goldAccent}]`
                      : `text-[${colors.primaryDark}]/80 hover:text-[${colors.secondaryBlue}]`
                    }`}
                  whileHover={{ scale: 1.02 }}
                >
                  Services
                  {isServicesDropdownOpen ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                  {isAnyServiceActive() && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ backgroundColor: colors.goldAccent }}
                      layoutId="activeTab"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.button>

                <AnimatePresence>
                  {isServicesDropdownOpen && (
                    <motion.div
                      className="absolute left-0 mt-2 w-72 rounded-lg shadow-lg overflow-hidden z-50"
                      style={{
                        backgroundColor: colors.white,
                        border: `1px solid ${colors.softGrey}`,
                      }}
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <div className="py-2">
                        {/* All Services (Overview) link */}
                        <motion.button
                          onClick={() => navigateToPage("/services")}
                          className={`block w-full text-left px-4 py-3 text-sm transition-colors ${location.pathname === "/services"
                              ? `bg-[${colors.goldAccent}]/10 text-[${colors.goldAccent}]`
                              : `text-[${colors.primaryDark}]/80 hover:bg-[${colors.lightBackground}]`
                            }`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0 }}
                        >
                          <div className="font-medium">All Services</div>
                          <div
                            className="text-xs mt-1 opacity-70"
                            style={{ color: colors.primaryDark }}
                          >
                            overview of all solutions
                          </div>
                        </motion.button>

                        {/* Individual service items */}
                        {servicesData.map((service, idx) => {
                          const isActive = isActiveRoute(service.route);
                          return (
                            <motion.button
                              key={service.title}
                              onClick={() => navigateToPage(service.route)}
                              className={`block w-full text-left px-4 py-3 text-sm transition-colors ${isActive
                                  ? `bg-[${colors.goldAccent}]/10 text-[${colors.goldAccent}]`
                                  : `text-[${colors.primaryDark}]/80 hover:bg-[${colors.lightBackground}]`
                                }`}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: (idx + 1) * 0.03 }}
                            >
                              <div className="font-medium">{service.title}</div>
                              <div
                                className="text-xs mt-1 opacity-70"
                                style={{ color: colors.primaryDark }}
                              >
                                {service.useCases.slice(0, 2).join(" • ")}
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#123E56] focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              backgroundColor: `${colors.white}CC`,
              backdropFilter: "blur(12px)",
              borderTop: `1px solid ${colors.softGrey}`,
            }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {simpleNavItems.map((item, idx) => {
                const isActive = isActiveRoute(item.route);
                return (
                  <motion.button
                    key={item.name}
                    onClick={() => navigateToPage(item.route)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-base font-medium ${isActive
                        ? `text-[${colors.goldAccent}] bg-[${colors.goldAccent}]/10`
                        : `text-[${colors.primaryDark}]/80`
                      }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.name}
                  </motion.button>
                );
              })}

              {/* Mobile Services Expandable Section */}
              <div>
                <motion.button
                  onClick={() =>
                    setIsMobileServicesExpanded(!isMobileServicesExpanded)
                  }
                  className={`flex justify-between items-center w-full text-left px-3 py-2 rounded-lg text-base font-medium ${isAnyServiceActive()
                      ? `text-[${colors.goldAccent}] bg-[${colors.goldAccent}]/10`
                      : `text-[${colors.primaryDark}]/80`
                    }`}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Services</span>
                  {isMobileServicesExpanded ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </motion.button>
                <AnimatePresence>
                  {isMobileServicesExpanded && (
                    <motion.div
                      className="ml-4 mt-1 space-y-1 border-l-2 pl-3"
                      style={{ borderColor: colors.softGrey }}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* All Services (Overview) for mobile */}
                      <motion.button
                        onClick={() => navigateToPage("/services")}
                        className={`block w-full text-left px-3 py-2 rounded-md text-sm ${location.pathname === "/services"
                            ? `text-[${colors.goldAccent}] bg-[${colors.goldAccent}]/10`
                            : `text-[${colors.primaryDark}]/70`
                          }`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        All Services
                      </motion.button>

                      {servicesData.map((service, idx) => {
                        const isActive = isActiveRoute(service.route);
                        return (
                          <motion.button
                            key={service.title}
                            onClick={() => navigateToPage(service.route)}
                            className={`block w-full text-left px-3 py-2 rounded-md text-sm ${isActive
                                ? `text-[${colors.goldAccent}] bg-[${colors.goldAccent}]/10`
                                : `text-[${colors.primaryDark}]/70`
                              }`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: (idx + 1) * 0.03 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {service.title}
                          </motion.button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;