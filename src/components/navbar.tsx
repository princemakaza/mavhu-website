import React from "react";
import { Menu, X, } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Import the logo from assets
import LogoImage from "../assets/logo.png";

// Color palette (light mode only)
const colors = {
  primaryDark: "#123E56",
  secondaryBlue: "#1F5C73",
  goldAccent: "#B89A2F",
  lightBackground: "#F4FAFA",
  softGrey: "#DCE7E8",
  white: "#FFFFFF",
};

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToPage = (page: string) => {
    navigate(page);
    setIsMenuOpen(false);
  };

  const isActiveRoute = (route: string) => {
    return location.pathname === route;
  };

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
    hover: { scale: 1.05, color: colors.goldAccent, transition: { duration: 0.2 } },
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

  const navItems = [
    { name: "Home", route: "/" },
    { name: "About", route: "/about" },
    { name: "Services", route: "/services" },
    { name: "Contact", route: "/contact" },
  ];

  // Render logo with upside-down 'A' in "AFRICA"
  const renderLogoText = () => (
    <span className="text-xl font-bold tracking-tight" style={{ color: colors.primaryDark }}>
      MΛVHU{" "}
      <span style={{ color: colors.goldAccent }}>
        AFRICA
      </span>
    </span>
  );

  return (
    <motion.nav
      className="fixed w-full top-0 z-50 backdrop-blur-xl border-b"
      style={{
        backgroundColor: `${colors.white}CC`, // semi-transparent white
        borderBottomColor: colors.softGrey,
      }}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
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
              {navItems.map((item, index) => {
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
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Desktop Right Section (no theme toggle) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Optional Login button – kept but commented as per original */}
            {/* <button
              onClick={() => navigate("/userlogin")}
              className="flex items-center text-sm font-medium text-[#123E56]/70 hover:text-[#1F5C73] transition-colors"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </button> */}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#123E56] focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with AnimatePresence */}
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
              {navItems.map((item, idx) => {
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;