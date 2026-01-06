import React from "react";
import { Menu, X, LogIn, Sun, Moon } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

// Import the logo from assets (adjust the path as needed)
import Loan from "../assets/logo.png";

type NavbarProps = {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
};

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, setIsDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const navigateToPage = (page: string) => {
    navigate(page);
    setIsMenuOpen(false); // Close mobile menu after navigation
  };

  // Check if a route is active
  const isActiveRoute = (route: string) => {
    return location.pathname === route;
  };

  // Colors extracted from the logo
  // Primary green from the "MAVHU" text - vibrant green
  const logoGreen = "#00FF00";
  // Dark background similar to the logo
  const darkBg = "#0A0A0A"; // Not pure black, better for dark mode
  const lightBg = "#F5F5F5"; // Light but not pure white
  
  // Theme-aware classes based on logo colors
  const themeClasses = {
    // Backgrounds
    navBg: isDarkMode 
      ? `bg-[${darkBg}]/95` 
      : `bg-[${lightBg}]/95`,
    
    // Text colors
    text: isDarkMode ? "text-white" : "text-gray-900",
    textSecondary: isDarkMode ? "text-gray-300" : "text-gray-700",
    brandText: isDarkMode ? "text-white" : "text-gray-900",
    
    // Borders
    border: isDarkMode 
      ? `border-[${logoGreen}]/20` 
      : "border-gray-300/50",
    
    // Cards/Containers
    cardBg: isDarkMode 
      ? `bg-[${darkBg}]/90` 
      : "bg-white/90",
    
    // Hover states
    hoverBg: isDarkMode 
      ? "hover:bg-white/10" 
      : "hover:bg-gray-100",
    
    // Active states
    activeText: `text-[${logoGreen}]`,
    activeBg: isDarkMode 
      ? `bg-[${logoGreen}]/10` 
      : `bg-[${logoGreen}]/10`,
    
    // Logo container background for better visibility
    logoContainerBg: isDarkMode 
      ? "bg-transparent" 
      : "bg-black/5",
  };

  // Navigation items with their routes
  const navItems = [
    { name: "Home", route: "/" },
    { name: "About", route: "/about" },
    { name: "Services", route: "/services" },
    // { name: "Products", route: "/pricing" },
    { name: "Contact", route: "/contact" },
  ];

  // Custom styles for the logo green
  const logoGreenStyle = {
    '--logo-green': logoGreen,
  } as React.CSSProperties;

  return (
    <nav
      className={`relative z-50 ${themeClasses.navBg} backdrop-blur-xl border-b ${themeClasses.border} fixed w-full top-0 transition-all duration-300`}
      style={logoGreenStyle}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div
              className="flex-shrink-0 flex items-center cursor-pointer"
              onClick={() => navigate("/")}
            >
              {/* Logo container with background for visibility */}
              <div className={`p-2 rounded-lg ${themeClasses.logoContainerBg} transition-all duration-300`}>
                <img
                  src={Loan}
                  alt="MAVHU AFRICA Logo"
                  className="h-10 w-auto" // Slightly smaller for better balance
                />
              </div>
              
              <span
                className={`ml-3 text-xl font-bold tracking-tight ${themeClasses.brandText}`}
              >
                MAVHU AFRICA
              </span>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-14">
              {navItems.map((item) => {
                const isActive = isActiveRoute(item.route);
                return (
                  <button
                    key={item.name}
                    onClick={() => navigateToPage(item.route)}
                    className={`${
                      isActive
                        ? `${themeClasses.activeText} ${themeClasses.activeBg}`
                        : `${themeClasses.textSecondary} hover:${themeClasses.text}`
                    } px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group`}
                  >
                    {item.name}
                    <div
                      className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 transition-all duration-300 ${
                        isActive ? "w-6" : "w-0 group-hover:w-6"
                      }`}
                      style={{ 
                        backgroundColor: isActive ? logoGreen : 'transparent',
                        background: isActive 
                          ? `linear-gradient(to right, ${logoGreen}, ${logoGreen}80)` 
                          : `linear-gradient(to right, ${logoGreen}, ${logoGreen}80)`
                      }}
                    ></div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl ${themeClasses.textSecondary} hover:${themeClasses.text} ${themeClasses.hoverBg} transition-all duration-300`}
              title={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* <button
              onClick={() => navigate("/userlogin")}
              className={`${themeClasses.textSecondary} hover:${themeClasses.text} px-4 py-2 text-sm font-medium transition-all duration-300 flex items-center hover:underline`}
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </button> */}

            {/* <button
              onClick={() => navigate("/usersignup")}
              className={`relative px-6 py-2.5 rounded-xl text-sm font-semibold transition-all transform hover:scale-105 overflow-hidden group`}
              style={{
                background: `linear-gradient(to right, ${logoGreen}, ${logoGreen}80)`,
                color: isDarkMode ? '#000000' : '#000000' // Black text on green
              }}
            >
              <span className="relative z-10 font-bold">Get Started</span>
              <div 
                className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(to right, ${logoGreen}CC, ${logoGreen}99)`
                }}
              ></div>
            </button> */}
          </div>

          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl ${themeClasses.textSecondary} hover:${themeClasses.text} transition-colors`}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`${themeClasses.textSecondary} hover:${themeClasses.text} transition-colors`}
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

      {/* Mobile menu */}
      {isMenuOpen && (
        <div
          className={`md:hidden ${themeClasses.cardBg} backdrop-blur-xl border-t ${themeClasses.border}`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => {
              const isActive = isActiveRoute(item.route);
              return (
                <button
                  key={item.name}
                  onClick={() => navigateToPage(item.route)}
                  className={`block w-full text-left px-3 py-2 rounded-lg transition-colors relative ${
                    isActive
                      ? `${themeClasses.activeText} ${themeClasses.activeBg}`
                      : `${themeClasses.textSecondary} hover:${themeClasses.text}`
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <div 
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 rounded-r"
                      style={{ backgroundColor: logoGreen }}
                    ></div>
                  )}
                </button>
              );
            })}
            <div
              className={`flex flex-col space-y-2 pt-4 border-t ${themeClasses.border} mt-4`}
            >
              <button
                onClick={() => navigate("/userlogin")}
                className={`${themeClasses.textSecondary} hover:${themeClasses.text} px-4 py-2 text-sm font-medium transition-all duration-300 flex items-center`}
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </button>
              <button
                onClick={() => navigate("/usersignup")}
                className="w-full font-medium py-2.5 rounded-xl text-sm font-semibold"
                style={{
                  background: `linear-gradient(to right, ${logoGreen}, ${logoGreen}80)`,
                  color: isDarkMode ? '#000000' : '#000000' // Black text on green
                }}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Add custom style tag for the logo green color */}
      <style>{`
        :root {
          --logo-green: ${logoGreen};
        }
      `}</style>
    </nav>
  );
};

export default Navbar;