import React from "react";
import { Star, Shield, Clock, Mail, ExternalLink, MapPin, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Import the logo from assets
import LogoImage from "../assets/logo.png";

// Color palette (matching Navbar and brand guidelines)
const colors = {
  primaryDark: "#123E56",
  secondaryBlue: "#1F5C73",
  goldAccent: "#B89A2F",
  lightBackground: "#F4FAFA",
  softGrey: "#DCE7E8",
  white: "#FFFFFF",
};

const Footer: React.FC = () => {
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const linkHoverVariants = {
    hover: { x: 5, color: colors.goldAccent, transition: { duration: 0.2 } },
  };

  const buttonHoverVariants = {
    hover: { scale: 1.02, transition: { duration: 0.2 } },
  };

  // Render logo text with upside-down 'A' (∀) in "AFRICA"
  const renderLogoText = () => (
    <span className="text-2xl font-bold tracking-tight" style={{ color: colors.primaryDark }}>
      MΛVHU{" "}
      <span style={{ color: colors.goldAccent }}>
        AFRICA
      </span>
    </span>
  );

  return (
    <motion.footer
      className="backdrop-blur-xl border-t py-16"
      style={{
        backgroundColor: `${colors.white}CC`,
        borderTopColor: colors.softGrey,
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="col-span-1">
            <div className="flex items-start mb-6">
              <div className="flex-shrink-0">
                <img src={LogoImage} alt="MAVHU AFRICA Logo" className="h-16 w-auto" />
              </div>
              <div className="ml-3">
                {renderLogoText()}
              </div>
            </div>
            <p className="text-[#123E56]/80 mb-6 max-w-md leading-relaxed">
              Transforming climate data into trusted, verified, and locally rooted intelligence for African climate action.
            </p>
            <div className="flex flex-col space-y-3">
              {[
                { icon: <Star className="w-5 h-5" />, label: "Trusted Data Solutions" },
                { icon: <Shield className="w-5 h-5" />, label: "Verified & Sovereign" },
                { icon: <Clock className="w-5 h-5" />, label: "24/7 Expert Support" },
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div style={{ color: colors.secondaryBlue }}>{item.icon}</div>
                  <span className="text-[#123E56]/60 text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-[#123E56] mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Services", path: "/services" },
                { name: "Contact", path: "/contact" },
              ].map((link, index) => (
                <li key={index}>
                  <motion.button
                    onClick={() => navigate(link.path)}
                    className="text-[#123E56]/70 hover:text-[#B89A2F] transition-colors duration-300 flex items-center"
                    variants={linkHoverVariants}
                    whileHover="hover"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-[#123E56] mb-6">Services</h3>
            <ul className="space-y-4">
              {[
                { name: "ESG Dashboard", path: "/services" },
                { name: "Farmer Field App", path: "/services" },
                { name: "Climate Data APIs", path: "/services" },
                { name: "Climate Risk Intelligence", path: "/services" },
              ].map((service, index) => (
                <li key={index}>
                  <motion.button
                    onClick={() => navigate(service.path)}
                    className="text-[#123E56]/70 hover:text-[#B89A2F] transition-colors duration-300 flex items-center"
                    variants={linkHoverVariants}
                    whileHover="hover"
                  >
                    {service.name}
                    <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Get Started */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-[#123E56] mb-6">Contact</h3>
            <ul className="space-y-4">
              {/* Request Demo Button */}
              <li className="pt-2">
                <motion.button
                  onClick={() => navigate("/request-demo")}
                  className="w-full py-3 rounded-xl font-semibold text-sm transition-all shadow-lg overflow-hidden group"
                  style={{
                    background: `linear-gradient(to right, ${colors.goldAccent}, #D4A82E)`,
                    color: "#FFFFFF",
                  }}
                  variants={buttonHoverVariants}
                  whileHover="hover"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Request a Demo
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </span>
                </motion.button>
              </li>
              {/* Contact Information */}
              <li className="pt-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-[#123E56]/50" />
                    <span className="text-[#123E56]/60 text-sm">info@mavhu.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-[#123E56]/50" />
                    <span className="text-[#123E56]/60 text-sm">+27 (0) 12 345 6789</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-[#123E56]/50" />
                    <span className="text-[#123E56]/60 text-sm">Pretoria, South Africa</span>
                  </div>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
          style={{ borderTopColor: colors.softGrey }}
          variants={itemVariants}
        >
          <div className="flex items-center space-x-6 mb-4 md:mb-0">
            <span className="text-[#123E56] font-bold text-sm tracking-wide">
              MEASURED • VERIFIED • SOVEREIGN
            </span>
          </div>

          <p className="text-[#123E56]/50 text-sm text-center">
            © {new Date().getFullYear()} MAVHU AFRICA. All rights reserved.
          </p>

          <div className="flex space-x-4 mt-4 md:mt-0">
            <button
              onClick={() => navigate("/privacy")}
              className="text-[#123E56]/50 hover:text-[#B89A2F] text-xs transition-colors"
            >
              Privacy Policy
            </button>
            <span className="text-[#123E56]/30">|</span>
            <button
              onClick={() => navigate("/terms")}
              className="text-[#123E56]/50 hover:text-[#B89A2F] text-xs transition-colors"
            >
              Terms of Service
            </button>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.div
          className="mt-8 pt-6 border-t text-center"
          style={{ borderTopColor: colors.softGrey }}
          variants={itemVariants}
        >
          <p className="text-[#123E56]/60 text-sm italic">
            Empowering African climate action with precise, trustworthy, and locally grounded data.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;