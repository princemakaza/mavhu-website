import React from "react";
import { Star, Shield, Clock, Mail, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Import the logo from assets
import Loan from "../assets/logo.png";

interface FooterProps {
  isDarkMode: boolean;
  themeClasses: {
    cardBg: string;
    border: string;
    text: string;
    textSecondary: string;
    textMuted: string;
    glowEffect: string;
  };
}

const Footer: React.FC<FooterProps> = ({ isDarkMode, themeClasses }) => {
  const navigate = useNavigate();

  // Colors extracted from the logo
  const logoGreen = "#00FF00"; // Green from "MAVHU" text
  const logoYellow = "#FFD700"; // Yellow/gold color for accent


  return (
    <footer
      className={`${themeClasses.cardBg} backdrop-blur-xl border-t ${themeClasses.border} py-16`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="col-span-1">
            <div className="flex items-start mb-6">
              {/* Logo with background for visibility */}
              <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-transparent' : 'bg-black/5'}`}>
                <img
                  src={Loan}
                  alt="MAVHU AFRICA Logo"
                  className="h-16 w-auto"
                />
              </div>
              <span
                className={`ml-3 text-2xl font-bold tracking-tight ${isDarkMode
                    ? "text-white"
                    : "text-gray-900"
                  }`}
              >
                MAVHU AFRICA
              </span>
            </div>
            <p
              className={`${themeClasses.textSecondary} mb-6 max-w-md leading-relaxed`}
            >
              Revolutionizing financial services through innovative technology, measured, verified, and sovereign solutions.
            </p>
            <div className="flex flex-col space-y-3">
              {[
                { icon: <Star className="w-5 h-5" />, label: "4.9 Customer Rating" },
                {
                  icon: <Shield className="w-5 h-5" />,
                  label: "Bank-Level Security",
                },
                {
                  icon: <Clock className="w-5 h-5" />,
                  label: "24/7 Support",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3"
                >
                  <div style={{ color: logoGreen }}>{item.icon}</div>
                  <span className={`${themeClasses.textSecondary} text-sm`}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`text-lg font-semibold ${themeClasses.text} mb-6`}>
              Quick Links
            </h3>
            <ul className="space-y-4">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Services", path: "/services" },

              ].map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => navigate(link.path)}
                    className={`${themeClasses.textSecondary} hover:text-[${logoGreen}] transition-colors duration-300 flex items-center`}
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className={`text-lg font-semibold ${themeClasses.text} mb-6`}>
              Services
            </h3>
            <ul className="space-y-4">
              {[
                { name: "ESG Dashboard", path: "/services" },
                { name: "Farmer Field App", path: "/services" },
                { name: "Climate Data APIs", path: "/services" },
                { name: "Climate Risk", path: "/services" },

              ].map((service, index) => (
                <li key={index}>
                  <button
                    onClick={() => navigate(service.path)}
                    className={`${themeClasses.textSecondary} hover:text-[${logoGreen}] transition-colors duration-300 flex items-center`}
                  >
                    {service.name}
                    <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {/* Contact & Get Started */}
          <div>
            <h3 className={`text-lg font-semibold ${themeClasses.text} mb-6`}>
              Contact 
            </h3>
            <ul className="space-y-4">
              {/* Request Demo Button */}
              <li className="pt-2">
                <button
                  onClick={() => navigate("/request-demo")}
                  className="w-full py-3 rounded-xl font-semibold text-sm transition-all transform hover:scale-[1.02] shadow-lg overflow-hidden group"
                  style={{
                    background: `linear-gradient(to right, ${logoYellow}, #FFC107)`,
                    color: '#000000'
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Request a Demo
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </span>
                  <div
                    className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(to right, ${logoYellow}CC, #FFC107CC)`
                    }}
                  ></div>
                </button>
              </li>
              {/* Contact Information */}
              <li className="pt-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <Mail className={`w-4 h-4 ${themeClasses.textMuted}`} />
                    <span className={`${themeClasses.textMuted} text-sm`}>
                      info@mavhu.com
                    </span>
                  </div>

                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div
          className={`border-t ${themeClasses.border} mt-12 pt-8 flex flex-col md:flex-row justify-between items-center`}
        >
          <div className="flex items-center space-x-6 mb-4 md:mb-0">
            <span className={`${themeClasses.text} font-bold text-sm tracking-wide`}>
              MEASURED • VERIFIED • SOVEREIGN
            </span>
          </div>

          <p className={`${themeClasses.textMuted} text-sm text-center`}>
            © {new Date().getFullYear()} MAVHU AFRICA. All rights reserved.
          </p>

          <div className="flex space-x-4 mt-4 md:mt-0">
            <button
              onClick={() => navigate("/privacy")}
              className={`${themeClasses.textMuted} hover:text-[${logoGreen}] text-xs transition-colors`}
            >
              Privacy Policy
            </button>
            <span className={themeClasses.textMuted}>|</span>
            <button
              onClick={() => navigate("/terms")}
              className={`${themeClasses.textMuted} hover:text-[${logoGreen}] text-xs transition-colors`}
            >
              Terms of Service
            </button>
          </div>
        </div>

        {/* Tagline */}
        <div className="mt-8 pt-6 border-t ${themeClasses.border} text-center">
          <p className={`${themeClasses.textSecondary} text-sm italic`}>
            Transforming Africa's financial landscape with innovative, transparent, and accessible solutions
          </p>
        </div>
      </div>

      {/* Add custom style tag for the logo colors */}
      <style>{`
        button:hover.text-\\[\\#00FF00\\] {
          color: #00FF00 !important;
        }
        button:hover.text-\\[\\#FFD700\\] {
          color: #FFD700 !important;
        }
      `}</style>
    </footer>
  );
};

export default Footer;