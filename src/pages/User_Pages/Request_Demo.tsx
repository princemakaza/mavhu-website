import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Calendar,
    Clock,
    User,
    Mail,
    Phone,
    Building,
    MessageCircle,
    Send,
    CheckCircle,
    Globe,
    BarChart3,
    Users,
    Smartphone,
    Cloud,
    MapPin,
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";

// Colour palette (consistent with the rest of the app)
const colors = {
    primaryDark: "#123E56",
    secondaryBlue: "#1F5C73",
    goldAccent: "#B89A2F",
    lightBackground: "#F4FAFA",
    softGrey: "#DCE7E8",
    white: "#FFFFFF",
};

// Animation variants (same as landing/contact)
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

const RequestDemo = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        organization: "",
        preferredDate: null as Date | null,
        preferredTime: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [dateError, setDateError] = useState("");
    const [timeError, setTimeError] = useState("");

    // Mouse tracking for background effect
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Generate time slots from 08:00 to 17:00 (hourly)
    const timeSlots = [];
    for (let hour = 8; hour <= 17; hour++) {
        const timeString = `${hour.toString().padStart(2, "0")}:00`;
        timeSlots.push(timeString);
    }

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear time error when a valid time is selected
        if (name === "preferredTime" && value) {
            setTimeError("");
        }
    };

    const handleDateChange = (date: Date | null) => {
        setFormData((prev) => ({ ...prev, preferredDate: date }));
        if (date) {
            const day = date.getDay();
            if (day === 0 || day === 6) {
                setDateError("Weekend dates are not available. Please select a weekday.");
            } else {
                setDateError("");
            }
        } else {
            setDateError("");
        }
    };

    // Custom filter for react-datepicker to disable weekends
    const isWeekday = (date: Date) => {
        const day = date.getDay();
        return day !== 0 && day !== 6;
    };

    const validateForm = () => {
        let isValid = true;
        if (!formData.preferredDate) {
            setDateError("Please select a preferred date.");
            isValid = false;
        } else {
            const day = formData.preferredDate.getDay();
            if (day === 0 || day === 6) {
                setDateError("Weekend dates are not available. Please select a weekday.");
                isValid = false;
            }
        }

        if (!formData.preferredTime) {
            setTimeError("Please select a preferred time.");
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            // Reset form (optional)
            setFormData({
                name: "",
                email: "",
                phone: "",
                organization: "",
                preferredDate: null,
                preferredTime: "",
                message: "",
            });
        }, 2000);
    };

    // Success screen
    if (isSubmitted) {
        return (
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
                        Demo Request Received!
                    </h2>
                    <p className="text-[#123E56]/80 mb-6">
                        Thank you for requesting a demo. Our team will contact you within 2 business hours
                        to confirm your preferred date and time.
                    </p>
                    <p className="text-[#123E56]/60 text-sm mb-8">
                        For urgent inquiries, please call +263 78 969 3725
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
                        <span className="relative z-10">Request Another Demo</span>
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{
                                background: `linear-gradient(to right, ${colors.goldAccent}CC, #C49F2A)`,
                            }}
                        ></div>
                    </button>
                </motion.div>
            </div>
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
                            Request a
                            <span style={{ color: colors.goldAccent }}> Demo</span>
                        </h1>
                        <p className="text-xl text-[#123E56]/80 leading-relaxed max-w-4xl mx-auto">
                            See how MΛVHU's climate intelligence platform can empower your organisation.
                            Schedule a personalised demo with our experts.
                        </p>
                    </div>
                </div>
            </motion.section>

            {/* Main Form Section */}
            <motion.section
                className="py-16 relative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Left Column - Demo Request Form */}
                        <div className="lg:col-span-2">
                            <div className="text-center mb-12 lg:text-left">
                                <h2 className="text-4xl font-bold text-[#123E56] mb-6">
                                    Schedule Your
                                    <span style={{ color: colors.goldAccent }}> Demo</span>
                                </h2>
                                <p className="text-lg text-[#123E56]/60">
                                    Fill out the form and we'll confirm a time that works for you.
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
                                                Organization *
                                            </label>
                                            <div className="relative">
                                                <Building className="absolute left-3 top-3 w-5 h-5 text-[#123E56]/50" />
                                                <input
                                                    type="text"
                                                    name="organization"
                                                    value={formData.organization}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full pl-12 pr-4 py-3 bg-white/50 border border-[#DCE7E8] text-[#123E56] rounded-xl focus:outline-none focus:border-[#1F5C73]/50 transition-all duration-300 backdrop-blur-sm"
                                                    placeholder="Your company or organization"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        {/* Date Picker */}
                                        <div>
                                            <label className="block text-sm font-medium text-[#123E56] mb-2">
                                                Preferred Date *
                                            </label>
                                            <div className="relative">
                                                <Calendar className="absolute left-3 top-3 w-5 h-5 text-[#123E56]/50 z-10" />
                                                <DatePicker
                                                    selected={formData.preferredDate}
                                                    onChange={handleDateChange}
                                                    filterDate={isWeekday}
                                                    minDate={new Date()}
                                                    dateFormat="dd/MM/yyyy"
                                                    placeholderText="Select a weekday"
                                                    className="w-full pl-12 pr-4 py-3 bg-white/50 border border-[#DCE7E8] text-[#123E56] rounded-xl focus:outline-none focus:border-[#1F5C73]/50 transition-all duration-300 backdrop-blur-sm"
                                                    wrapperClassName="w-full"
                                                    calendarClassName="!border-[#DCE7E8] !rounded-xl !shadow-lg"
                                                    showPopperArrow={false}
                                                />
                                            </div>
                                            {dateError && (
                                                <p className="text-red-500 text-sm mt-1">{dateError}</p>
                                            )}
                                        </div>

                                        {/* Time Select */}
                                        <div>
                                            <label className="block text-sm font-medium text-[#123E56] mb-2">
                                                Preferred Time (CAT) *
                                            </label>
                                            <div className="relative">
                                                <Clock className="absolute left-3 top-3 w-5 h-5 text-[#123E56]/50" />
                                                <select
                                                    name="preferredTime"
                                                    value={formData.preferredTime}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full pl-12 pr-4 py-3 bg-white/50 border border-[#DCE7E8] text-[#123E56] rounded-xl focus:outline-none focus:border-[#1F5C73]/50 transition-all duration-300 backdrop-blur-sm appearance-none"
                                                >
                                                    <option value="">Select a time</option>
                                                    {timeSlots.map((time) => (
                                                        <option key={time} value={time}>
                                                            {time}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            {timeError && (
                                                <p className="text-red-500 text-sm mt-1">{timeError}</p>
                                            )}
                                            <p className="text-xs text-[#123E56]/50 mt-1">
                                                All times are in Central Africa Time (CAT, GMT+2)
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-[#123E56] mb-2">
                                            Additional Information
                                        </label>
                                        <div className="relative">
                                            <MessageCircle className="absolute left-3 top-3 w-5 h-5 text-[#123E56]/50" />
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                rows={4}
                                                className="w-full pl-12 pr-4 py-3 bg-white/50 border border-[#DCE7E8] text-[#123E56] rounded-xl focus:outline-none focus:border-[#1F5C73]/50 transition-all duration-300 backdrop-blur-sm resize-none"
                                                placeholder="Tell us about your specific interests or any questions you have..."
                                            />
                                        </div>
                                    </div>

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
                                                    Submitting...
                                                </>
                                            ) : (
                                                <>
                                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                                        Request Demo
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

                        {/* Right Column - What to Expect & Contact Info */}
                        <div className="space-y-8">
                            <motion.div
                                variants={cardVariants}
                                className="bg-white backdrop-blur-xl rounded-2xl p-8 border border-[#DCE7E8] shadow-lg shadow-gray-200/50"
                            >
                                <h3 className="text-2xl font-bold text-[#123E56] mb-6">What to Expect</h3>
                                <ul className="space-y-4">
                                    {[
                                        "Personalised walkthrough of our platform",
                                        "Climate data tailored to your sector",
                                        "Q&A with our climate intelligence specialists",
                                        "Follow-up resources and next steps",
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <CheckCircle
                                                className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0"
                                                style={{ color: colors.secondaryBlue }}
                                            />
                                            <span className="text-[#123E56]/80">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            <motion.div
                                variants={cardVariants}
                                className="bg-white backdrop-blur-xl rounded-2xl p-8 border border-[#DCE7E8] shadow-lg shadow-gray-200/50"
                            >
                                <h3 className="text-2xl font-bold text-[#123E56] mb-6">Need Help?</h3>
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
                                                href="mailto:demo@mavhu.com"
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
                                            <p className="text-[#123E56]/60 text-sm">Headquarters</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                variants={cardVariants}
                                className="bg-white backdrop-blur-xl rounded-2xl p-8 border border-[#DCE7E8] shadow-lg shadow-gray-200/50"
                                style={{
                                    background: `linear-gradient(to bottom right, ${colors.secondaryBlue}05, ${colors.goldAccent}05)`,
                                }}
                            >
                                <h3 className="text-2xl font-bold text-[#123E56] mb-4">Who We Serve</h3>
                                <div className="space-y-3">
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
                        Ready to See
                        <br />
                        <span style={{ color: colors.goldAccent }}>MΛVHU in Action?</span>
                    </h2>
                    <p className="text-xl text-[#123E56]/80 mb-12 leading-relaxed">
                        Join leading organisations across Africa that trust MΛVHU for verified,
                        locally grounded climate intelligence.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <a
                            href="/contact"
                            className="border-2 border-[#DCE7E8] hover:border-[#1F5C73]/40 text-[#123E56] hover:bg-[#1F5C73]/5 px-12 py-5 rounded-2xl text-lg font-semibold transition-all backdrop-blur-sm shadow-lg shadow-gray-200/50"
                        >
                            Contact Sales
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

        /* react-datepicker overrides to match brand */
        .react-datepicker {
          font-family: 'Inter', sans-serif !important;
          border-color: ${colors.softGrey} !important;
          border-radius: 0.75rem !important;
          box-shadow: 0 10px 25px rgba(0,0,0,0.05) !important;
        }
        .react-datepicker__header {
          background-color: ${colors.lightBackground} !important;
          border-bottom-color: ${colors.softGrey} !important;
        }
        .react-datepicker__day--selected {
          background-color: ${colors.secondaryBlue} !important;
        }
        .react-datepicker__day--keyboard-selected {
          background-color: ${colors.secondaryBlue}20 !important;
          color: ${colors.primaryDark} !important;
        }
        .react-datepicker__day:hover {
          background-color: ${colors.secondaryBlue}10 !important;
        }
        .react-datepicker__day--disabled {
          color: ${colors.softGrey} !important;
        }
      `}</style>
        </div>
    );
};

export default RequestDemo;