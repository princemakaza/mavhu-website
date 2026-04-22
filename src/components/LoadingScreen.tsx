// components/LoadingScreen.tsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen: React.FC = () => {
  const [loadingStep, setLoadingStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Colors matching your brand palette
  const colors = {
    primaryDark: "#123E56",
    secondaryBlue: "#1F5C73",
    goldAccent: "#B89A2F",
    lightBackground: "#F4FAFA",
  };

  const letters = ["M", "Λ", "V", "H", "U"];
  const tagline = "MEASURED • VERIFIED • SOVEREIGN";

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingStep((prev) => (prev + 1) % 6);
    }, 400);

    return () => clearInterval(interval);
  }, []);

  // Letter animation variants
  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.8,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    }),
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.1, 1],
      opacity: [0.6, 1, 0.6],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const barVariants = {
    initial: { width: "0%" },
    animate: {
      width: "100%",
      transition: {
        duration: 2.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop" as const,
      },
    },
  };

  const africaVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.6,
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const taglineVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.8,
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ backgroundColor: colors.lightBackground }}
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#F4FAFA] via-white to-[#DCE7E8]/20" />
          
          {/* Animated background circles */}
          <motion.div
            className="absolute w-96 h-96 rounded-full blur-3xl"
            style={{ 
              background: `radial-gradient(circle, ${colors.secondaryBlue}15, transparent 70%)`,
              top: "30%",
              left: "20%",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          <motion.div
            className="absolute w-80 h-80 rounded-full blur-3xl"
            style={{ 
              background: `radial-gradient(circle, ${colors.goldAccent}15, transparent 70%)`,
              bottom: "20%",
              right: "15%",
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center justify-center max-w-2xl px-6">
            {/* Logo: M Λ V H U */}
            <div className="flex items-center justify-center mb-4">
              {letters.map((letter, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-7xl md:text-8xl font-bold tracking-wide"
                  style={{
                    color: index === 2 ? colors.goldAccent : colors.primaryDark,
                    fontFamily: "'IBM Plex Serif', Georgia, serif",
                    textShadow: "0 2px 10px rgba(18, 62, 86, 0.1)",
                  }}
                >
                  {letter}
                  {index < letters.length - 1 && (
                    <span className="mx-1 md:mx-2" style={{ color: colors.secondaryBlue, opacity: 0.3 }}>•</span>
                  )}
                </motion.span>
              ))}
            </div>

            {/* AFRICA text */}
            <motion.div
              variants={africaVariants}
              initial="hidden"
              animate="visible"
              className="mb-6"
            >
              <span
                className="text-4xl md:text-5xl font-bold tracking-[0.3em]"
                style={{
                  color: colors.secondaryBlue,
                  fontFamily: "'IBM Plex Sans', sans-serif",
                }}
              >
                AFRICA
              </span>
            </motion.div>

            {/* Decorative line */}
            <motion.div
              className="w-32 h-px mb-6"
              style={{ 
                background: `linear-gradient(90deg, transparent, ${colors.goldAccent}, transparent)`,
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
            />

            {/* Tagline */}
            <motion.p
              variants={taglineVariants}
              initial="hidden"
              animate="visible"
              className="text-sm md:text-base tracking-[0.2em] font-medium mb-8 text-center"
              style={{ color: `${colors.primaryDark}99` }}
            >
              {tagline}
            </motion.p>

            {/* Loading indicator */}
            <div className="flex flex-col items-center gap-4">
              {/* Animated dots */}
              <div className="flex items-center gap-2">
                {[0, 1, 2].map((dot) => (
                  <motion.div
                    key={dot}
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: colors.secondaryBlue }}
                    animate={{
                      scale: loadingStep === dot ? 1.2 : 1,
                      opacity: loadingStep === dot ? 1 : 0.4,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>

              {/* Progress bar */}
              <div className="w-64 h-0.5 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ 
                    background: `linear-gradient(90deg, ${colors.secondaryBlue}, ${colors.goldAccent})`,
                  }}
                  variants={barVariants}
                  initial="initial"
                  animate="animate"
                />
              </div>

              {/* Loading text */}
              <motion.p
                className="text-xs tracking-widest uppercase font-medium mt-2"
                style={{ color: `${colors.primaryDark}60` }}
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Loading Intelligence
              </motion.p>
            </div>
          </div>

          {/* Bottom corner elements */}
          <div className="absolute bottom-6 left-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 1 }}
              className="text-xs"
              style={{ color: colors.primaryDark }}
            >
              <span className="opacity-50">MΛVHU</span>
            </motion.div>
          </div>

          <div className="absolute bottom-6 right-6">
            <motion.div
              variants={pulseVariants}
              animate="pulse"
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: colors.goldAccent }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;