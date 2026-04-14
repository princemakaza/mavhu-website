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
import { motion } from "framer-motion";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";
import { Helmet } from "react-helmet-async";

// Color palette
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

// API base URL (change to your EC2 public IP / domain)
const API_BASE_URL = "http://44.223.50.135:3001/api";

const Contact = () => {
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
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const handleMouseMove = (e: { clientX: any; clientY: any }) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear any previous error when user starts typing again
    if (submitError) setSubmitError(null);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      // Success
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        organization: "",
        inquiryType: "",
        message: "",
      });
    } catch (error: any) {
      console.error("Submission error:", error);
      setSubmitError(error.message || "Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email Us",
      details: ["info@mavhu.com"],
      description: "Get detailed responses within 2 business hours",
      color: colors.secondaryBlue,
      available: "24/7 Response",
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Our Office",
      details: ["Harare, Zimbabwe"],
      description: "Schedule a meeting with our team for personalized solutions",
      color: colors.goldAccent,
      available: "Mon-Fri: 8AM-5PM",
    },
    {
      icon: <HeadphonesIcon className="w-8 h-8" />,
      title: "Technical Support",
      details: ["API Support", "Platform Assistance"],
      description: "Get help with our climate data platforms and APIs",
      color: colors.secondaryBlue,
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

  // Success screen
  if (isSubmitted) {
    return (
      <>
        <Helmet>
          <title>Mavhu – Contact Us | Partner with Africa’s Climate Data Leader</title>
          <meta name="description" content="Get in touch with Mavhu. Request a demo, ask about partnerships, or learn how our verified climate intelligence can support your ESG and MRV goals." />
          <meta property="og:title" content="Contact Mavhu – Start Your Climate Data Journey" />
          <meta property="og:description" content="Reach out to our team for demos, partnerships, or technical support. Let's build a resilient, data-driven future for Africa." />
          <meta property="og:url" content="https://mavhu.com/contact" />
          <meta name="twitter:card" content="summary_large_image" />
        </Helmet>
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ backgroundColor: colors.lightBackground }}
        >
          <div className="fixed inset-0 bg-gradient-to-br from-[#F4FAFA] via-white to-[#DCE7E8]/20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(31,92,115,0.08),transparent_50%)]"></div>
            <div
              className="absolute w-96 h-96 rounded-full blur-3xl transition-all duration-1000 ease-out"
              style={{
                left: mousePosition.x - 192,
                top: mousePosition.y - 192,
                background: `radial-gradient(circle, ${colors.secondaryBlue}15, transparent 70%)`,
              }}
            ></div>
          </div>

          <motion.div
            className="text-center max-w-md mx-auto px-6 relative z-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{
                backgroundColor: `${colors.secondaryBlue}10`,
                border: `2px solid ${colors.secondaryBlue}30`,
              }}
            >
              <CheckCircle className="w-10 h-10" style={{ color: colors.secondaryBlue }} />
            </div>
            <h2 className="text-3xl font-bold text-[#123E56] mb-4">
              Message Sent Successfully!
            </h2>
            <p className="text-[#123E56]/80 mb-6">
              Thank you for contacting MAVHU AFRICA. We'll get back to you within
              2 business hours during our working hours.
            </p>

            <button
              onClick={() => setIsSubmitted(false)}
              className="relative py-3 px-6 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg overflow-hidden group"
              style={{
                background: `linear-gradient(to right, ${colors.goldAccent}, #D4A82E)`,
                color: "#FFFFFF",
                boxShadow: `0 10px 30px ${colors.goldAccent}30`,
              }}
            >
              <span className="relative z-10">Send Another Message</span>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(to right, ${colors.goldAccent}CC, #C49F2A)`,
                }}
              ></div>
            </button>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <div
      className="min-h-screen overflow-hidden transition-colors duration-300 font-['Inter',system-ui,sans-serif]"
      style={{ backgroundColor: colors.lightBackground, color: colors.primaryDark }}
    >
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#F4FAFA] via-white to-[#DCE7E8]/20">
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

      <Navbar />

      {/* Hero Section */}
      <motion.section
        className="relative pt-32 pb-16"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-6xl lg:text-7xl font-bold leading-tight mb-8 text-[#123E56]">
              Contact
              <span style={{ color: colors.goldAccent }}> MΛVHU</span>
            </h1>
            <p className="text-xl text-[#123E56]/80 leading-relaxed max-w-4xl mx-auto">
              Let's work together to transform African climate action. Whether you're exploring
              partnerships, data solutions, or future platform access, we'd love to hear from you.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Contact Methods Grid */}
      <motion.section
        className="py-16 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#123E56] mb-6">
              How to Reach
              <span style={{ color: colors.goldAccent }}> Us</span>
            </h2>
            <p className="text-lg text-[#123E56]/60 max-w-2xl mx-auto">
              Choose the contact method that works best for your needs
            </p>
          </div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {contactMethods.slice(0, 3).map((method, index) => (
              <motion.div
                key={method.title}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-white backdrop-blur-xl rounded-2xl p-8 border border-[#DCE7E8] hover:border-[#1F5C73]/40 transition-all duration-300 text-center shadow-lg shadow-gray-200/50"
              >
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6"
                  style={{
                    backgroundColor: `${method.color}10`,
                    border: `1px solid ${method.color}20`,
                  }}
                >
                  <div style={{ color: method.color }}>{method.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-[#123E56] mb-3">{method.title}</h3>
                <div className="space-y-1 mb-4">
                  {method.details.map((detail, idx) => (
                    <p key={idx} className="text-[#123E56]/80 font-semibold">
                      {detail}
                    </p>
                  ))}
                </div>
                <p className="text-[#123E56]/60 text-sm mb-3">{method.description}</p>
                <p className="text-sm font-medium" style={{ color: colors.goldAccent }}>
                  {method.available}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content Section - Form + Sidebar */}
      <motion.section
        className="py-16 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column - Contact Form */}
            <div className="lg:col-span-2">
              <div className="text-center mb-12 lg:text-left">
                <h2 className="text-4xl font-bold text-[#123E56] mb-6">
                  Send Us A
                  <span style={{ color: colors.goldAccent }}> Message</span>
                </h2>
                <p className="text-lg text-[#123E56]/60">
                  Fill out the form below and we'll get back to you within 2 business hours
                </p>
              </div>

              <div className="bg-white backdrop-blur-xl rounded-2xl p-8 border border-[#DCE7E8] shadow-xl shadow-gray-200/50">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#123E56] mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-5 h-5 text-[#123E56]/50" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-12 pr-4 py-3 bg-white/50 border border-[#DCE7E8] text-[#123E56] rounded-xl focus:outline-none focus:border-[#1F5C73]/50 transition-all duration-300 backdrop-blur-sm"
                          placeholder="Your full name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#123E56] mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-5 h-5 text-[#123E56]/50" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-12 pr-4 py-3 bg-white/50 border border-[#DCE7E8] text-[#123E56] rounded-xl focus:outline-none focus:border-[#1F5C73]/50 transition-all duration-300 backdrop-blur-sm"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#123E56] mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 w-5 h-5 text-[#123E56]/50" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 bg-white/50 border border-[#DCE7E8] text-[#123E56] rounded-xl focus:outline-none focus:border-[#1F5C73]/50 transition-all duration-300 backdrop-blur-sm"
                          placeholder="+263 xx xxx xxxx"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#123E56] mb-2">
                        Organization
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-3 w-5 h-5 text-[#123E56]/50" />
                        <input
                          type="text"
                          name="organization"
                          value={formData.organization}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 bg-white/50 border border-[#DCE7E8] text-[#123E56] rounded-xl focus:outline-none focus:border-[#1F5C73]/50 transition-all duration-300 backdrop-blur-sm"
                          placeholder="Your company or organization"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#123E56] mb-2">
                      Inquiry Type *
                    </label>
                    <div className="relative">
                      <Database className="absolute left-3 top-3 w-5 h-5 text-[#123E56]/50" />
                      <select
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-white/50 border border-[#DCE7E8] text-[#123E56] rounded-xl focus:outline-none focus:border-[#1F5C73]/50 transition-all duration-300 backdrop-blur-sm appearance-none"
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
                    <label className="block text-sm font-medium text-[#123E56] mb-2">
                      Your Message *
                    </label>
                    <div className="relative">
                      <MessageCircle className="absolute left-3 top-3 w-5 h-5 text-[#123E56]/50" />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full pl-12 pr-4 py-3 bg-white/50 border border-[#DCE7E8] text-[#123E56] rounded-xl focus:outline-none focus:border-[#1F5C73]/50 transition-all duration-300 backdrop-blur-sm resize-none"
                        placeholder="Tell us about your climate data needs, partnership interests, or any questions you have..."
                      />
                    </div>
                  </div>

                  {submitError && (
                    <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
                      {submitError}
                    </div>
                  )}

                  <div className="text-center pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="relative py-4 px-12 rounded-2xl font-bold shadow-xl transition-all transform hover:scale-105 overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background: `linear-gradient(to right, ${colors.goldAccent}, #D4A82E)`,
                        color: "#FFFFFF",
                        boxShadow: `0 20px 40px ${colors.goldAccent}30`,
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block mr-2"></div>
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
                              background: `linear-gradient(to right, ${colors.goldAccent}CC, #C49F2A)`,
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
              <motion.div
                variants={cardVariants}
                className="bg-white backdrop-blur-xl rounded-2xl p-8 border border-[#DCE7E8] shadow-lg shadow-gray-200/50"
              >
                <h3 className="text-2xl font-bold text-[#123E56] mb-6">Quick Contact</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div
                      className="p-2 rounded-lg mr-4 flex-shrink-0"
                      style={{
                        backgroundColor: `${colors.secondaryBlue}10`,
                        border: `1px solid ${colors.secondaryBlue}20`,
                      }}
                    >
                      <Mail className="w-5 h-5" style={{ color: colors.secondaryBlue }} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#123E56] mb-1">Email</h4>
                      <a
                        href="mailto:info@mavhu.com"
                        className="text-[#123E56]/80 hover:underline"
                        style={{ color: colors.secondaryBlue }}
                      >
                        info@mavhu.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div
                      className="p-2 rounded-lg mr-4 flex-shrink-0"
                      style={{
                        backgroundColor: `${colors.goldAccent}10`,
                        border: `1px solid ${colors.goldAccent}20`,
                      }}
                    >
                      <MapPin className="w-5 h-5" style={{ color: colors.goldAccent }} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#123E56] mb-1">Location</h4>
                      <p className="text-[#123E56]/80">Harare, Zimbabwe</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Request Demo CTA */}
              <motion.div
                variants={cardVariants}
                className="bg-white backdrop-blur-xl rounded-2xl p-8 border border-[#DCE7E8] shadow-lg shadow-gray-200/50"
                style={{
                  background: `linear-gradient(to bottom right, ${colors.secondaryBlue}05, ${colors.goldAccent}05)`,
                }}
              >
                <h3 className="text-2xl font-bold text-[#123E56] mb-4">Ready for a Demo?</h3>
                <p className="text-[#123E56]/80 mb-6">
                  See our climate data platforms in action. Schedule a personalized demo.
                </p>
                <a
                  href="/request-demo"
                  className="block text-center py-3 px-6 rounded-xl font-bold transition-all transform hover:scale-105 shadow-md group"
                  style={{
                    background: `linear-gradient(to right, ${colors.goldAccent}, #D4A82E)`,
                    color: "#FFFFFF",
                    boxShadow: `0 10px 25px ${colors.goldAccent}20`,
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Request a Demo
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
              </motion.div>

              {/* Who We Serve */}
              <motion.div
                variants={cardVariants}
                className="bg-white backdrop-blur-xl rounded-2xl p-8 border border-[#DCE7E8] shadow-lg shadow-gray-200/50"
              >
                <h3 className="text-2xl font-bold text-[#123E56] mb-6">Who We Serve</h3>
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
                        style={{ backgroundColor: `${colors.secondaryBlue}10` }}
                      >
                        <div style={{ color: colors.secondaryBlue }}>{item.icon}</div>
                      </div>
                      <span className="text-[#123E56]/70 text-sm">{item.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
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
            background: `linear-gradient(to right, ${colors.secondaryBlue}08, ${colors.goldAccent}08)`,
          }}
        ></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-5xl font-bold text-[#123E56] mb-8">
            Transform Climate Action
            <br />
            <span style={{ color: colors.goldAccent }}>With Verified Data</span>
          </h2>
          <p className="text-xl text-[#123E56]/80 mb-12 leading-relaxed">
            Join organizations across Africa who trust MΛVHU for accurate, verified climate intelligence
            that drives meaningful impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="/request-demo"
              className="relative py-5 px-12 rounded-2xl text-lg font-bold transition-all transform hover:scale-105 shadow-xl overflow-hidden group"
              style={{
                background: `linear-gradient(to right, ${colors.goldAccent}, #D4A82E)`,
                color: "#FFFFFF",
                boxShadow: `0 20px 40px ${colors.goldAccent}30`,
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                Request a Demo
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(to right, ${colors.goldAccent}CC, #C49F2A)`,
                }}
              ></div>
            </a>
            <a
              href="/partner"
              className="border-2 border-[#DCE7E8] hover:border-[#1F5C73]/40 text-[#123E56] hover:bg-[#1F5C73]/5 px-12 py-5 rounded-2xl text-lg font-semibold transition-all backdrop-blur-sm shadow-lg shadow-gray-200/50"
            >
              Partner With Us
            </a>
          </div>
        </div>
      </motion.section>

      <Footer />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,100..900;1,100..900&display=swap');
        
        * {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }
        
        button:hover, a:hover {
          transition: all 0.3s ease;
        }
        
        select {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23123E56' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
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