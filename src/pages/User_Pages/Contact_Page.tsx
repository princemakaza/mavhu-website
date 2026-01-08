import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  MessageCircle,
  User,
  Building,
  CheckCircle,
  HeadphonesIcon,
  Globe,
  Database,
  BarChart3,
  Smartphone,
  Cloud,
  Users,
  ArrowRight,
} from "lucide-react";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";

const Contact = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    inquiryType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  React.useEffect(() => {
    const handleMouseMove = (e: { clientX: any; clientY: any }) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Colors adjusted for both modes - darker in light mode
  const logoGreen = isDarkMode ? "#00FF00" : "#008000";
  const logoYellow = isDarkMode ? "#FFD700" : "#B8860B";
  const darkBg = "#0A0A0A";
  const lightBg = "#F5F5F5";
  const lightCardBg = "#FFFFFF";
  // Updated theme-aware classes with MAVHU color scheme
// Updated themeClasses object in Contact_Page.tsx
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
  input: isDarkMode
    ? "bg-black/20 border-white/10"
    : "bg-white/50 border-gray-200",
  inputFocus: isDarkMode
    ? `border-[${logoGreen}]/50 bg-black/30`
    : `border-[${logoGreen}]/50 bg-white/70`,
  // ADD THIS LINE
  glowEffect: isDarkMode 
    ? "shadow-[0_0_20px_rgba(0,255,0,0.3)]" 
    : "shadow-[0_0_20px_rgba(0,128,0,0.1)]",
};
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        organization: "",
        inquiryType: "",
        message: "",
      });
    }, 2000);
  };

  const contactMethods = [
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email Us",
      details: ["info@mavhu.com"],
      description: "Get detailed responses within 2 business hours",
      color: logoGreen,
      available: "24/7 Response",
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Call Us",
      details: ["+263 78 969 3725", "+263 71 506 3418"],
      description: "Speak directly with our climate data specialists",
      color: logoGreen,
      available: "Mon-Fri: 8AM-6PM, Sat: 9AM-2PM",
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Our Office",
      details: ["Harare, Zimbabwe", "Africa Headquarters"],
      description: "Schedule a meeting with our team for personalized solutions",
      color: logoYellow,
      available: "Mon-Fri: 8AM-5PM",
    },
    {
      icon: <HeadphonesIcon className="w-8 h-8" />,
      title: "Technical Support",
      details: ["API Support", "Platform Assistance"],
      description: "Get help with our climate data platforms and APIs",
      color: logoGreen,
      available: "Mon-Fri: 8AM-6PM",
    },
  ];

  const inquiryTypes = [
    "Climate Data APIs",
    "ESG & Climate Intelligence Dashboard",
    "Farmer App",
    "Training & Capacity Building",
    "Partnership Opportunities",
    "General Inquiry",
    "Technical Support",
    "Sales & Demo Request",
  ];

  if (isSubmitted) {
    return (
      <div
        className={`min-h-screen ${themeClasses.bg} ${themeClasses.text} flex items-center justify-center`}
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

        <div className="text-center max-w-md mx-auto px-6 relative z-10">
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ 
              backgroundColor: `${logoGreen}${isDarkMode ? '30' : '20'}`,
              border: `2px solid ${logoGreen}${isDarkMode ? '50' : '30'}`
            }}
          >
            <CheckCircle className="w-10 h-10" style={{ color: logoGreen }} />
          </div>
          <h2 className={`text-3xl font-bold ${themeClasses.text} mb-4`}>
            Message Sent Successfully!
          </h2>
          <p className={`${themeClasses.textSecondary} mb-6`}>
            Thank you for contacting MAVHU AFRICA. We'll get back to you within 
            2 business hours during our working hours.
          </p>
          <p className={`${themeClasses.textMuted} text-sm mb-8`}>
            For urgent inquiries, please call +263 78 969 3725
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="relative py-3 px-6 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg overflow-hidden group"
            style={{
              background: `linear-gradient(to right, ${logoYellow}, ${isDarkMode ? '#FFC107' : '#DAA520'})`,
              color: isDarkMode ? '#000000' : '#000000',
              boxShadow: isDarkMode 
                ? `0 10px 30px ${logoYellow}30` 
                : `0 10px 30px ${logoYellow}20`
            }}
          >
            <span className="relative z-10">Send Another Message</span>
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `linear-gradient(to right, ${logoYellow}CC, ${isDarkMode ? '#FFC107CC' : '#DAA520CC'})`
              }}
            ></div>
          </button>
        </div>
      </div>
    );
  }

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
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      {/* Hero Section */}
      <section className="relative pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1
              className={`text-6xl lg:text-7xl font-bold leading-tight mb-8 ${themeClasses.text}`}
            >
              Contact
              <span style={{ color: logoGreen }}> MAVHU</span>
            </h1>
            <p
              className={`text-xl ${themeClasses.textSecondary} mb-10 leading-relaxed max-w-4xl mx-auto`}
            >
              Let's work together to transform African climate action. Whether you're exploring 
              partnerships, data solutions, or future platform access, we'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods Grid */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold ${themeClasses.text} mb-6`}>
              How to Reach
              <span style={{ color: logoGreen }}> Us</span>
            </h2>
            <p
              className={`text-lg ${themeClasses.textMuted} max-w-2xl mx-auto`}
            >
              Choose the contact method that works best for your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl p-8 border ${themeClasses.border} hover:${themeClasses.borderHover} transition-all duration-300 hover:transform hover:scale-105 text-center shadow-lg ${
                  isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"
                }`}
              >
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6"
                  style={{ 
                    backgroundColor: `${method.color}${isDarkMode ? '30' : '20'}`,
                    border: `1px solid ${method.color}${isDarkMode ? '40' : '30'}`
                  }}
                >
                  <div style={{ color: method.color }}>{method.icon}</div>
                </div>
                <h3 className={`text-xl font-bold ${themeClasses.text} mb-3`}>
                  {method.title}
                </h3>
                <div className="space-y-1 mb-4">
                  {method.details.map((detail, idx) => (
                    <p
                      key={idx}
                      className={`${themeClasses.textSecondary} font-semibold`}
                    >
                      {detail}
                    </p>
                  ))}
                </div>
                <p className={`${themeClasses.textMuted} text-sm mb-3`}>
                  {method.description}
                </p>
                <p className="text-sm font-medium" style={{ color: logoYellow }}>
                  {method.available}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column - Contact Form */}
            <div className="lg:col-span-2">
              <div className="text-center mb-12 lg:text-left">
                <h2 className={`text-4xl font-bold ${themeClasses.text} mb-6`}>
                  Send Us A
                  <span style={{ color: logoGreen }}> Message</span>
                </h2>
                <p
                  className={`text-lg ${themeClasses.textMuted}`}
                >
                  Fill out the form below and we'll get back to you within 2 business hours
                </p>
              </div>

              <div
                className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl p-8 border ${themeClasses.border} shadow-xl ${
                  isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"
                }`}
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        className={`block text-sm font-medium ${themeClasses.text} mb-2`}
                      >
                        Full Name *
                      </label>
                      <div className="relative">
                        <User
                          className={`absolute left-3 top-3 w-5 h-5 ${themeClasses.textMuted}`}
                        />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className={`w-full pl-12 pr-4 py-3 ${themeClasses.input} ${themeClasses.text} rounded-xl border focus:outline-none transition-all duration-300 backdrop-blur-sm`}
                          style={{
                            borderColor: 'transparent',
                            border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = `${logoGreen}80`;
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
                          }}
                          placeholder="Your full name"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-medium ${themeClasses.text} mb-2`}
                      >
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail
                          className={`absolute left-3 top-3 w-5 h-5 ${themeClasses.textMuted}`}
                        />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className={`w-full pl-12 pr-4 py-3 ${themeClasses.input} ${themeClasses.text} rounded-xl border focus:outline-none transition-all duration-300 backdrop-blur-sm`}
                          style={{
                            borderColor: 'transparent',
                            border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = `${logoGreen}80`;
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
                          }}
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        className={`block text-sm font-medium ${themeClasses.text} mb-2`}
                      >
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone
                          className={`absolute left-3 top-3 w-5 h-5 ${themeClasses.textMuted}`}
                        />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full pl-12 pr-4 py-3 ${themeClasses.input} ${themeClasses.text} rounded-xl border focus:outline-none transition-all duration-300 backdrop-blur-sm`}
                          style={{
                            borderColor: 'transparent',
                            border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = `${logoGreen}80`;
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
                          }}
                          placeholder="+263 xx xxx xxxx"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-medium ${themeClasses.text} mb-2`}
                      >
                        Organization
                      </label>
                      <div className="relative">
                        <Building
                          className={`absolute left-3 top-3 w-5 h-5 ${themeClasses.textMuted}`}
                        />
                        <input
                          type="text"
                          name="organization"
                          value={formData.organization}
                          onChange={handleInputChange}
                          className={`w-full pl-12 pr-4 py-3 ${themeClasses.input} ${themeClasses.text} rounded-xl border focus:outline-none transition-all duration-300 backdrop-blur-sm`}
                          style={{
                            borderColor: 'transparent',
                            border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = `${logoGreen}80`;
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
                          }}
                          placeholder="Your company or organization"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium ${themeClasses.text} mb-2`}
                    >
                      Inquiry Type *
                    </label>
                    <div className="relative">
                      <Database
                        className={`absolute left-3 top-3 w-5 h-5 ${themeClasses.textMuted}`}
                      />
                      <select
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleInputChange}
                        required
                        className={`w-full pl-12 pr-4 py-3 ${themeClasses.input} ${themeClasses.text} rounded-xl border focus:outline-none transition-all duration-300 backdrop-blur-sm appearance-none`}
                        style={{
                          borderColor: 'transparent',
                          border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = `${logoGreen}80`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
                        }}
                      >
                        <option value="">Select inquiry type</option>
                        {inquiryTypes.map((type, index) => (
                          <option key={index} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      className={`block text-sm font-medium ${themeClasses.text} mb-2`}
                    >
                      Your Message *
                    </label>
                    <div className="relative">
                      <MessageCircle
                        className={`absolute left-3 top-3 w-5 h-5 ${themeClasses.textMuted}`}
                      />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className={`w-full pl-12 pr-4 py-3 ${themeClasses.input} ${themeClasses.text} rounded-xl border focus:outline-none transition-all duration-300 backdrop-blur-sm resize-none`}
                        style={{
                          borderColor: 'transparent',
                          border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = `${logoGreen}80`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
                        }}
                        placeholder="Tell us about your climate data needs, partnership interests, or any questions you have..."
                      />
                    </div>
                  </div>

                  <div className="text-center pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="relative py-4 px-12 rounded-2xl font-bold shadow-xl transition-all transform hover:scale-105 overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background: `linear-gradient(to right, ${logoYellow}, ${isDarkMode ? '#FFC107' : '#DAA520'})`,
                        color: isDarkMode ? '#000000' : '#000000',
                        boxShadow: isDarkMode 
                          ? `0 20px 40px ${logoYellow}30` 
                          : `0 20px 40px ${logoYellow}20`
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <span className="relative z-10 flex items-center justify-center gap-3">
                            Send Message
                            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                          </span>
                          <div 
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{
                              background: `linear-gradient(to right, ${logoYellow}CC, ${isDarkMode ? '#FFC107CC' : '#DAA520CC'})`
                            }}
                          ></div>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Column - Additional Info */}
            <div className="space-y-8">
              {/* Quick Contact */}
              <div
                className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl p-8 border ${themeClasses.border} shadow-lg ${
                  isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"
                }`}
              >
                <h3 className={`text-2xl font-bold ${themeClasses.text} mb-6`}>
                  Quick Contact
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div 
                      className="p-2 rounded-lg mr-4 flex-shrink-0"
                      style={{ 
                        backgroundColor: `${logoGreen}${isDarkMode ? '20' : '10'}`,
                        border: `1px solid ${logoGreen}${isDarkMode ? '30' : '20'}`
                      }}
                    >
                      <Mail className="w-5 h-5" style={{ color: logoGreen }} />
                    </div>
                    <div>
                      <h4 className={`font-semibold ${themeClasses.text} mb-1`}>
                        Email
                      </h4>
                      <a 
                        href="mailto:info@mavhu.com" 
                        className={`${themeClasses.textSecondary} hover:underline`}
                        style={{ color: logoGreen }}
                      >
                        info@mavhu.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div 
                      className="p-2 rounded-lg mr-4 flex-shrink-0"
                      style={{ 
                        backgroundColor: `${logoGreen}${isDarkMode ? '20' : '10'}`,
                        border: `1px solid ${logoGreen}${isDarkMode ? '30' : '20'}`
                      }}
                    >
                      <Phone className="w-5 h-5" style={{ color: logoGreen }} />
                    </div>
                    <div>
                      <h4 className={`font-semibold ${themeClasses.text} mb-1`}>
                        Phone
                      </h4>
                      <p className={`${themeClasses.textSecondary}`}>
                        +263 78 969 3725
                      </p>
                      <p className={`${themeClasses.textMuted} text-sm`}>
                        +263 71 506 3418
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div 
                      className="p-2 rounded-lg mr-4 flex-shrink-0"
                      style={{ 
                        backgroundColor: `${logoYellow}${isDarkMode ? '20' : '10'}`,
                        border: `1px solid ${logoYellow}${isDarkMode ? '30' : '20'}`
                      }}
                    >
                      <MapPin className="w-5 h-5" style={{ color: logoYellow }} />
                    </div>
                    <div>
                      <h4 className={`font-semibold ${themeClasses.text} mb-1`}>
                        Location
                      </h4>
                      <p className={`${themeClasses.textSecondary}`}>
                        Harare, Zimbabwe
                      </p>
                      <p className={`${themeClasses.textMuted} text-sm`}>
                        Africa Headquarters
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Request Demo CTA */}
              <div
                className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl p-8 border ${themeClasses.border} shadow-lg ${
                  isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"
                }`}
                style={{
                  background: isDarkMode
                    ? `linear-gradient(to bottom right, ${logoGreen}10, ${logoYellow}10)`
                    : `linear-gradient(to bottom right, ${logoGreen}05, ${logoYellow}05)`,
                }}
              >
                <h3 className={`text-2xl font-bold ${themeClasses.text} mb-4`}>
                  Ready for a Demo?
                </h3>
                <p className={`${themeClasses.textSecondary} mb-6`}>
                  See our climate data platforms in action. Schedule a personalized demo.
                </p>
                <a
                  href="/request-demo"
                  className="block text-center py-3 px-6 rounded-xl font-bold transition-all transform hover:scale-105 shadow-md group"
                  style={{
                    background: `linear-gradient(to right, ${logoYellow}, ${isDarkMode ? '#FFC107' : '#DAA520'})`,
                    color: isDarkMode ? '#000000' : '#000000',
                    boxShadow: isDarkMode 
                      ? `0 10px 25px ${logoYellow}30` 
                      : `0 10px 25px ${logoYellow}20`
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Request a Demo
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
              </div>

              {/* What We Serve */}
              <div
                className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl p-8 border ${themeClasses.border} shadow-lg ${
                  isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"
                }`}
              >
                <h3 className={`text-2xl font-bold ${themeClasses.text} mb-6`}>
                  Who We Serve
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: <Globe className="w-4 h-4" />, label: "Governments & Public Agencies" },
                    { icon: <BarChart3 className="w-4 h-4" />, label: "Financial Institutions" },
                    { icon: <Users className="w-4 h-4" />, label: "Corporate ESG Teams" },
                    { icon: <Smartphone className="w-4 h-4" />, label: "Agricultural Organizations" },
                    { icon: <Cloud className="w-4 h-4" />, label: "Climate Project Developers" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div 
                        className="p-1 rounded mr-3"
                        style={{ 
                          backgroundColor: `${logoGreen}${isDarkMode ? '20' : '10'}`,
                        }}
                      >
                        <div style={{ color: logoGreen }}>{item.icon}</div>
                      </div>
                      <span className={`${themeClasses.textSecondary} text-sm`}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
          <h2 className={`text-5xl font-bold ${themeClasses.text} mb-8`}>
            Transform Climate Action
            <br />
            <span style={{ color: logoGreen }}>With Verified Data</span>
          </h2>
          <p className={`text-xl ${themeClasses.textSecondary} mb-12 leading-relaxed`}>
            Join organizations across Africa who trust MAVHU for accurate, verified climate intelligence 
            that drives meaningful impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="/request-demo"
              className="relative py-5 px-12 rounded-2xl text-lg font-bold transition-all transform hover:scale-105 shadow-xl overflow-hidden group"
              style={{
                background: `linear-gradient(to right, ${logoYellow}, ${isDarkMode ? '#FFC107' : '#DAA520'})`,
                color: isDarkMode ? '#000000' : '#000000',
                boxShadow: isDarkMode 
                  ? `0 20px 40px ${logoYellow}30` 
                  : `0 20px 40px ${logoYellow}20`
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                Request a Demo
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(to right, ${logoYellow}CC, ${isDarkMode ? '#FFC107CC' : '#DAA520CC'})`
                }}
              ></div>
            </a>
            <a
              href="/partner"
              className={`border-2 ${
                isDarkMode
                  ? "border-white/30 hover:border-white/50 text-white hover:bg-white/10"
                  : "border-gray-300 hover:border-gray-500 text-gray-900 hover:bg-gray-100/50"
              } py-5 px-12 rounded-2xl text-lg font-semibold transition-all backdrop-blur-sm shadow-lg ${
                isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"
              }`}
            >
              Partner With Us
            </a>
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
        
        button:hover, a:hover {
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
        
        select {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='${encodeURIComponent(isDarkMode ? '#ffffff' : '#000000')}' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
          background-position: right 0.5rem center;
          background-repeat: no-repeat;
          background-size: 1.5em 1.5em;
          padding-right: 2.5rem;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      `}</style>
    </div>
  );
};

export default Contact;