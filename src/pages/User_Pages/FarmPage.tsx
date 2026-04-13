import React from "react";
import { motion } from "framer-motion";
import {
  Smartphone,
  Zap,
  Shield,
  ArrowRight,
  CheckCircle,
  Cloud,
  Users,
  BookOpen,
  Leaf,
  Map,
  TrendingUp,
  BarChart3,
  Globe,
  Award,
  RefreshCw,
  ClipboardCheck,
  GraduationCap,
} from "lucide-react";
import Footer from "../../components/Footer";
import Navbar from "../../components/navbar";
import { useNavigate } from "react-router-dom";
import farmImage from "../../assets/train.png";

// ─── Color Palette ──────────────────────────────────────────────────────────
const colors = {
  primaryDark: "#123E56",
  secondaryBlue: "#1F5C73",
  goldAccent: "#B89A2F",
  lightBackground: "#F4FAFA",
  softGrey: "#DCE7E8",
  white: "#FFFFFF",
};

// ─── Animation Variants ─────────────────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};
const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, type: "spring", stiffness: 120 } },
};

const FarmPage: React.FC = () => {
  const navigate = useNavigate();

  // ─── Feature data ─────────────────────────────────────────────────────────
  const features = [
    {
      title: "Plot‑Level Data Capture",
      description: "Mobile-first tools for farmers to record GPS-referenced plots, crop types, inputs, and practices – even offline.",
      icon: <Map className="w-6 h-6" />,
      color: colors.secondaryBlue,
    },
    {
      title: "Compliance Workflows",
      description: "Custom checklists and validation rules for sustainability certifications, carbon programmes, and supply chain standards.",
      icon: <ClipboardCheck className="w-6 h-6" />,
      color: colors.goldAccent,
    },
    {
      title: "Regenerative Agriculture Adoption",
      description: "Track adoption of climate-smart practices: cover cropping, agroforestry, reduced tillage, and nutrient management.",
      icon: <Leaf className="w-6 h-6" />,
      color: "#2E7D6B",
    },
    {
      title: "Offline & Low‑Bandwidth Support",
      description: "Designed for rural African contexts – data syncs when connectivity returns, with SMS fallback options.",
      icon: <Cloud className="w-6 h-6" />,
      color: colors.secondaryBlue,
    },
    {
      title: "Grower Onboarding & Training",
      description: "Digital enrolment, multilingual training modules, and progress tracking for thousands of smallholders.",
      icon: <Users className="w-6 h-6" />,
      color: colors.secondaryBlue,
    },
    {
      title: "MRV for Carbon & Ecosystem Services",
      description: "Capture activity data and evidence for carbon credit issuance, payment for ecosystem services, and results‑based finance.",
      icon: <TrendingUp className="w-6 h-6" />,
      color: colors.goldAccent,
    },
  ];

  // ─── Benefits with stats ──────────────────────────────────────────────────
  const benefits = [
    {
      title: "Farmer Reach",
      description: "Scalable onboarding and training for thousands of growers.",
      stat: "10,000+",
      icon: <Users className="w-5 h-5" />,
    },
    {
      title: "Compliance Rate",
      description: "Increase in adherence to sustainability protocols.",
      stat: "94%",
      icon: <CheckCircle className="w-5 h-5" />,
    },
    {
      title: "Training Completion",
      description: "Higher engagement with interactive, localised content.",
      stat: "87%",
      icon: <GraduationCap className="w-5 h-5" />,
    },
    {
      title: "Time Savings",
      description: "Reduction in field data collection and validation time.",
      stat: "60%",
      icon: <Zap className="w-5 h-5" />,
    },
  ];

  // ─── Target audience / use cases ─────────────────────────────────────────
  const useCases = [
    {
      title: "Commodity Companies",
      description: "Ensure supply chain traceability and farmer compliance for coffee, cocoa, cotton, and cereals.",
      icon: <Globe className="w-6 h-6" />,
    },
    {
      title: "Carbon Project Developers",
      description: "Collect farmer activity data for soil carbon, agroforestry, and regenerative credits.",
      icon: <Leaf className="w-6 h-6" />,
    },
    {
      title: "NGOs & Development Programs",
      description: "Monitor adoption of climate-smart agriculture and report to donors.",
      icon: <Shield className="w-6 h-6" />,
    },
    {
      title: "Cooperatives & Off‑takers",
      description: "Digitally onboard members, track production, and reward sustainable practices.",
      icon: <Users className="w-6 h-6" />,
    },
  ];

  const themeClasses = {
    bg: colors.lightBackground,
    text: `text-[${colors.primaryDark}]`,
    textSecondary: `text-[${colors.primaryDark}]/80`,
    textMuted: `text-[${colors.primaryDark}]/60`,
    navBg: `${colors.white}/95`,
    cardBg: colors.white,
    border: `border-[${colors.softGrey}]`,
  };

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ backgroundColor: colors.lightBackground, color: colors.primaryDark }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Serif:wght@400;600;700&display=swap');
        * { font-family: 'IBM Plex Sans', 'Inter', system-ui, sans-serif; }
        h1, h2, h3 { font-family: 'IBM Plex Serif', Georgia, serif; }
        .gradient-text {
          background: linear-gradient(135deg, ${colors.goldAccent}, #D4A82E);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hover-lift {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .hover-lift:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(18,62,86,0.12);
        }
      `}</style>

      <Navbar />

      {/* ─── Hero Section with train.png ──────────────────────────────────── */}
      <section className="relative pt-28 pb-20 sm:pt-32 sm:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F4FAFA] via-white to-[#DCE7E8]/30" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInLeft}
              className="text-center lg:text-left"
            >
              <div
                className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider mb-6"
                style={{ backgroundColor: `${colors.goldAccent}12`, border: `1px solid ${colors.goldAccent}30`, color: colors.goldAccent }}
              >
                Farm‑Level Compliance & Training
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Empower Smallholders <br />
                <span className="gradient-text">From Field to Finance</span>
              </h1>
              <p className="text-base sm:text-lg mb-8 leading-relaxed" style={{ color: `${colors.primaryDark}CC` }}>
                Mobile‑first data capture, compliance workflows, and training tools for smallholder farmers. 
                Digitally onboard growers, monitor sustainable practices, and unlock climate finance – even in low‑connectivity environments.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => navigate("/request-demo")}
                  className="group px-8 py-3 rounded-xl font-bold transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                  style={{ background: `linear-gradient(135deg, ${colors.goldAccent}, #D4A82E)`, color: "#fff" }}
                >
                  Request Demo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </button>
                <button
                  onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
                  className="px-8 py-3 rounded-xl font-semibold border-2 transition-all hover:bg-white/50"
                  style={{ borderColor: colors.softGrey, color: colors.primaryDark }}
                >
                  Explore Features
                </button>
              </div>
            </motion.div>

            {/* Right image */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInRight}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-md lg:max-w-lg">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#1F5C73]/20 to-[#B89A2F]/20 rounded-2xl blur-2xl" />
                <img
                  src={farmImage}
                  alt="MAvHU Farm-Level Compliance & Training"
                  className="relative rounded-2xl shadow-2xl w-full h-auto object-cover border border-white/30"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Farmer+Training";
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Overview ──────────────────────────────────────────────────────── */}
      <motion.section
        className="py-20 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              What is <span className="gradient-text">Farm‑Level Compliance?</span>
            </h2>
            <p className="text-lg max-w-3xl mx-auto" style={{ color: `${colors.primaryDark}AA` }}>
              A complete digital ecosystem for smallholder programmes – from enrolment and training to field data collection and compliance verification, all integrated with supply chain and carbon finance systems.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              variants={cardVariants}
              className="bg-white rounded-2xl p-7 border border-[#DCE7E8] hover-lift text-center"
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: `${colors.secondaryBlue}12`, border: `1px solid ${colors.secondaryBlue}25` }}>
                <Smartphone className="w-7 h-7" style={{ color: colors.secondaryBlue }} />
              </div>
              <h3 className="text-xl font-bold mb-3">Offline‑First Mobile App</h3>
              <p className="text-sm leading-relaxed" style={{ color: `${colors.primaryDark}80` }}>
                Works without internet – syncs automatically when signal returns. Multilingual UI and voice‑assisted data entry.
              </p>
            </motion.div>

            <motion.div
              variants={cardVariants}
              className="bg-white rounded-2xl p-7 border border-[#DCE7E8] hover-lift text-center"
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: `${colors.goldAccent}12`, border: `1px solid ${colors.goldAccent}25` }}>
                <ClipboardCheck className="w-7 h-7" style={{ color: colors.goldAccent }} />
              </div>
              <h3 className="text-xl font-bold mb-3">Automated Compliance</h3>
              <p className="text-sm leading-relaxed" style={{ color: `${colors.primaryDark}80` }}>
                Rule‑based checks align with certification schemes (Rainforest Alliance, Fairtrade, 4C, etc.) and carbon standards.
              </p>
            </motion.div>

            <motion.div
              variants={cardVariants}
              className="bg-white rounded-2xl p-7 border border-[#DCE7E8] hover-lift text-center"
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: `${colors.secondaryBlue}12`, border: `1px solid ${colors.secondaryBlue}25` }}>
                <BookOpen className="w-7 h-7" style={{ color: colors.secondaryBlue }} />
              </div>
              <h3 className="text-xl font-bold mb-3">Structured Training</h3>
              <p className="text-sm leading-relaxed" style={{ color: `${colors.primaryDark}80` }}>
                Video, audio, and quiz modules covering climate‑smart agriculture, record‑keeping, and certification requirements.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ─── Features Grid ─────────────────────────────────────────────────── */}
      <motion.section
        id="features"
        className="py-20 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Core <span className="gradient-text">Capabilities</span>
            </h2>
            <p className="text-lg" style={{ color: `${colors.primaryDark}AA` }}>
              Everything you need to run successful smallholder programmes at scale.
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="bg-white rounded-2xl p-6 border border-[#DCE7E8] hover-lift"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-2.5 rounded-xl" style={{ backgroundColor: `${feature.color}12`, border: `1px solid ${feature.color}20` }}>
                    <span style={{ color: feature.color }}>{feature.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold" style={{ color: colors.primaryDark }}>{feature.title}</h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: `${colors.primaryDark}80` }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ─── How It Works (Process Steps) ──────────────────────────────────── */}


 

      {/* ─── Use Cases / Who It's For ──────────────────────────────────────── */}
      <motion.section
        className="py-20 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-[#DCE7E8] p-8 sm:p-12 shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">
                Who Uses <span className="gradient-text">Farm‑Level Tools?</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              {useCases.map((uc, idx) => (
                <div key={idx} className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="p-3 rounded-xl" style={{ backgroundColor: `${colors.secondaryBlue}12` }}>
                      <span style={{ color: colors.secondaryBlue }}>{uc.icon}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-base mb-2">{uc.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: `${colors.primaryDark}80` }}>
                    {uc.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ─── Final CTA ──────────────────────────────────────────────────────── */}
      <motion.section
        className="py-24 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={fadeInUp}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="rounded-3xl p-10 sm:p-14 shadow-2xl"
            style={{ background: `linear-gradient(135deg, ${colors.secondaryBlue}08, ${colors.goldAccent}08)`, border: `1px solid ${colors.softGrey}` }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to digitise your <br />
              <span className="gradient-text">smallholder programme?</span>
            </h2>
            <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: `${colors.primaryDark}BB` }}>
              Empower farmers, verify compliance, and unlock climate finance – all from one platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/request-demo")}
                className="group px-8 py-3 rounded-xl font-bold transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                style={{ background: `linear-gradient(135deg, ${colors.goldAccent}, #D4A82E)`, color: "#fff" }}
              >
                Request Demo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="px-8 py-3 rounded-xl font-semibold border-2 transition-all hover:bg-white/50"
                style={{ borderColor: colors.softGrey, color: colors.primaryDark }}
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      <Footer isDarkMode={false} themeClasses={themeClasses} />
    </div>
  );
};

export default FarmPage;