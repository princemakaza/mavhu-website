import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, Eye, EyeOff, ArrowRight, Sun, Moon } from "lucide-react";
import { loginUser } from "../../../../services/auth_service";
import { toast } from "react-hot-toast";
import Logo from "../../../../assets/logo.png";

interface LoginScreenProps {
    isDarkMode?: boolean;
    setIsDarkMode?: (value: boolean) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({
    isDarkMode = false,
    setIsDarkMode,
}) => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [logoAnimation, setLogoAnimation] = useState(true);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // Colors from LandingPage
    const logoGreen = isDarkMode ? "#00FF00" : "#008000";
    const logoYellow = isDarkMode ? "#FFD700" : "#B8860B";
    const darkBg = "#0A0A0A";
    const lightBg = "#F5F5F5";
    const lightCardBg = "#FFFFFF";

    // Theme classes
    const themeClasses = {
        bg: isDarkMode ? darkBg : lightBg,
        text: isDarkMode ? "text-white" : "text-gray-900",
        textSecondary: isDarkMode ? "text-gray-300" : "text-gray-700",
        textMuted: isDarkMode ? "text-gray-400" : "text-gray-600",
        cardBg: isDarkMode ? `${darkBg}/30` : `${lightCardBg}/95`,
        border: isDarkMode ? "border-white/10" : "border-gray-300/70",
        borderHover: isDarkMode ? "border-white/20" : "border-gray-400",
        hoverBg: isDarkMode ? "hover:bg-white/10" : "hover:bg-gray-100",
    };

    // Pause logo animation after 10 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setLogoAnimation(false);
        }, 10000);
        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await loginUser(formData);
            toast.success("Login successful!");
            navigate("/portal/dashboard");
        } catch (error: any) {
            toast.error(error.message || "Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const toggleTheme = () => {
        if (setIsDarkMode) {
            setIsDarkMode(!isDarkMode);
            toast.success(`Switched to ${!isDarkMode ? "dark" : "light"} mode`);
        }
    };

    return (
        <div
            className={`min-h-screen ${themeClasses.bg} ${themeClasses.text} transition-colors duration-500 flex items-center justify-center p-4`}
        >
            {/* Animated background with particles */}
            <div className="fixed inset-0 overflow-hidden">
                <div
                    className={`absolute inset-0 transition-all duration-500 ${isDarkMode
                        ? "bg-gradient-to-br from-gray-900 via-gray-900 to-black"
                        : "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200"
                        }`}
                />

                {/* Animated gradient orbs */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64">
                    <div
                        className={`absolute inset-0 rounded-full blur-3xl transition-all duration-1000 ${logoAnimation ? "animate-pulse" : ""
                            }`}
                        style={{
                            background: isDarkMode
                                ? `radial-gradient(circle, ${logoGreen}20, transparent 70%)`
                                : `radial-gradient(circle, ${logoGreen}10, transparent 70%)`,
                        }}
                    />
                </div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96">
                    <div
                        className={`absolute inset-0 rounded-full blur-3xl transition-all duration-1000 ${logoAnimation ? "animate-pulse delay-700" : ""
                            }`}
                        style={{
                            background: isDarkMode
                                ? `radial-gradient(circle, ${logoYellow}15, transparent 70%)`
                                : `radial-gradient(circle, ${logoYellow}05, transparent 70%)`,
                        }}
                    />
                </div>
            </div>

            {/* Theme toggle button - Modern design */}
            {setIsDarkMode && (
                <button
                    onClick={toggleTheme}
                    className={`fixed top-8 right-8 z-50 w-12 h-12 rounded-full backdrop-blur-lg border transition-all duration-500 flex items-center justify-center group shadow-lg ${isDarkMode
                        ? "bg-black/30 border-white/10 hover:border-white/30 hover:bg-black/50 text-yellow-300"
                        : "bg-white/80 border-gray-300/50 hover:border-gray-400 hover:bg-white text-yellow-600"
                        }`}
                    aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
                >
                    <div className="relative">
                        {isDarkMode ? (
                            <Sun className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
                        ) : (
                            <Moon className="w-5 h-5 group-hover:rotate-12 transition-transform duration-500" />
                        )}
                    </div>
                </button>
            )}

            {/* Login Container */}
            <div className="relative z-10 w-full max-w-md mx-auto">
                {/* Animated Logo Centerpiece */}
                <div className="relative mb-8">
                    <div className="flex justify-center">
                        <div className="relative group">
                            {/* Outer glow ring */}
                            <div
                                className={`absolute -inset-4 rounded-full blur-xl transition-all duration-1000 ${logoAnimation ? "animate-ping-slow" : ""
                                    }`}
                                style={{
                                    background: `radial-gradient(circle, ${logoGreen}40, transparent 70%)`,
                                }}
                            />

                            {/* Animated rings */}
                            <div
                                className={`absolute -inset-3 rounded-full border-2 transition-all duration-700 ${logoAnimation ? "animate-spin-slow" : ""
                                    }`}
                                style={{
                                    borderImage: `linear-gradient(45deg, ${logoGreen}, ${logoYellow}) 1`,
                                }}
                            />

                            {/* Logo container */}
                            <div
                                className={`relative w-24 h-24 rounded-2xl backdrop-blur-lg border transition-all duration-500 flex items-center justify-center mx-auto shadow-2xl ${isDarkMode
                                    ? "bg-black/40 border-white/10 hover:border-white/30"
                                    : "bg-white/60 border-gray-300/50 hover:border-gray-400"
                                    } ${logoAnimation ? "animate-float" : ""}`}
                                onMouseEnter={() => setLogoAnimation(true)}
                                onMouseLeave={() => setLogoAnimation(false)}
                            >
                                {/* Logo image with subtle pulse */}
                                <img
                                    src={Logo}
                                    alt="MAVHU Africa Logo"
                                    className={`w-16 h-16 transition-all duration-500 ${logoAnimation ? "animate-pulse-slow" : ""
                                        }`}
                                />

                                {/* Floating particles */}
                                {logoAnimation && (
                                    <>
                                        <div
                                            className="absolute top-2 left-2 w-2 h-2 rounded-full animate-float-fast"
                                            style={{ backgroundColor: logoGreen }}
                                        />
                                        <div
                                            className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full animate-float-fast delay-300"
                                            style={{ backgroundColor: logoYellow }}
                                        />
                                        <div
                                            className="absolute top-2 right-2 w-1 h-1 rounded-full animate-float-fast delay-500"
                                            style={{ backgroundColor: logoGreen }}
                                        />
                                        <div
                                            className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full animate-float-fast delay-700"
                                            style={{ backgroundColor: logoYellow }}
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Logo text with gradient */}
                    <div className="text-center mt-6">
                        <h1 className="text-4xl font-bold tracking-tight">
                            <span
                                className="bg-clip-text text-transparent bg-gradient-to-r"
                                style={{
                                    backgroundImage: `linear-gradient(to right, ${logoGreen}, ${logoYellow})`,
                                }}
                            >
                                MAVHU
                            </span>
                            <span className={`ml-2 ${themeClasses.text}`}>Africa</span>
                        </h1>
                        <p
                            className={`text-sm font-medium tracking-wider uppercase mt-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"
                                }`}
                        >
                            Measured • Verified • Sovereign
                        </p>
                    </div>
                </div>


                {/* Login Card */}
                <div
                    className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border transition-all duration-500 shadow-2xl overflow-hidden`}
                    style={{
                        borderColor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
                        boxShadow: isDarkMode
                            ? `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px ${logoGreen}10`
                            : `0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 30px ${logoGreen}05`,
                    }}
                >
                    {/* Card header gradient */}
                    <div
                        className="h-1 w-full"
                        style={{
                            background: `linear-gradient(to right, ${logoGreen}, ${logoYellow})`,
                        }}
                    />

                    <div className="p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
                            <p className={themeClasses.textSecondary}>
                                Sign in to access your climate intelligence dashboard
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Field */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <div className="absolute left-0 top-0 bottom-0 flex items-center pl-3">
                                        <Mail
                                            className={`w-5 h-5 transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-500"
                                                }`}
                                        />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full pl-11 pr-4 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${isDarkMode
                                            ? "bg-gray-900/50 border-gray-700 focus:border-green-500 focus:ring-green-500/20"
                                            : "bg-white/80 border-gray-300 focus:border-green-600 focus:ring-green-600/20"
                                            }`}
                                        placeholder="you@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-medium">Password</label>
                                    <Link
                                        to="/forgot-password"
                                        className="text-sm font-medium hover:underline transition-all duration-300"
                                        style={{ color: logoGreen }}
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative group">
                                    <div className="absolute left-0 top-0 bottom-0 flex items-center pl-3">
                                        <Lock
                                            className={`w-5 h-5 transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-500"
                                                }`}
                                        />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={`w-full pl-11 pr-12 py-3 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${isDarkMode
                                            ? "bg-gray-900/50 border-gray-700 focus:border-green-500 focus:ring-green-500/20"
                                            : "bg-white/80 border-gray-300 focus:border-green-600 focus:ring-green-600/20"
                                            }`}
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className={`absolute right-0 top-0 bottom-0 flex items-center pr-3 transition-colors duration-300 ${isDarkMode
                                            ? "text-gray-400 hover:text-gray-300"
                                            : "text-gray-500 hover:text-gray-700"
                                            }`}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Remember me checkbox */}
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className={`w-4 h-4 rounded transition-all duration-300 focus:ring-2 focus:ring-offset-2 ${isDarkMode
                                        ? "bg-gray-800 border-gray-600 checked:bg-green-500 focus:ring-green-500/20"
                                        : "bg-gray-100 border-gray-300 checked:bg-green-600 focus:ring-green-600/20"
                                        }`}
                                />
                                <label
                                    htmlFor="remember"
                                    className={`ml-2 text-sm ${themeClasses.textSecondary}`}
                                >
                                    Remember this device
                                </label>
                            </div>
                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-3.5 px-4 rounded-xl font-semibold text-white transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center shadow-lg overflow-hidden group ${isLoading ? "opacity-75 cursor-not-allowed" : ""
                                    }`}
                                style={{
                                    background: `linear-gradient(135deg, ${logoGreen}, ${logoYellow})`,
                                    boxShadow: `0 10px 30px -5px ${isDarkMode ? logoGreen + "40" : logoGreen + "30"}`,
                                }}
                            >
                                <span className="relative z-10 flex items-center">
                                    {isLoading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                            Signing in...
                                        </>
                                    ) : (
                                        <>
                                            Sign In
                                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                        </>
                                    )}
                                </span>
                                {/* Button hover effect */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{
                                        background: `linear-gradient(135deg, ${logoYellow}, ${logoGreen})`,
                                    }}
                                />
                            </button>
                        </form>
                        {/* Sign up link */}
                        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
                            <p className={themeClasses.textMuted}>
                                Don't have an account?{" "}
                                <Link
                                    to="/portal/register"
                                    className="font-semibold hover:underline transition-all duration-300"
                                    style={{ color: logoGreen }}
                                >
                                    Create account
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className={`text-sm ${themeClasses.textMuted}`}>
                        By signing in, you agree to our{" "}
                        <Link
                            to="/terms"
                            className="font-medium hover:underline transition-all duration-300"
                            style={{ color: logoGreen }}
                        >
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                            to="/privacy"
                            className="font-medium hover:underline transition-all duration-300"
                            style={{ color: logoGreen }}
                        >
                            Privacy Policy
                        </Link>
                    </p>
                </div>
            </div>

            {/* Custom CSS for animations */}
            <style>
                {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          
          @keyframes float-fast {
            0%, 100% {
              transform: translateY(0px) translateX(0px);
            }
            25% {
              transform: translateY(-5px) translateX(3px);
            }
            50% {
              transform: translateY(0px) translateX(6px);
            }
            75% {
              transform: translateY(5px) translateX(3px);
            }
          }
          
          @keyframes ping-slow {
            0% {
              transform: scale(0.8);
              opacity: 0.8;
            }
            70%, 100% {
              transform: scale(1.5);
              opacity: 0;
            }
          }
          
          @keyframes spin-slow {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          
          @keyframes pulse-slow {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
          }
          
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          
          .animate-float-fast {
            animation: float-fast 4s ease-in-out infinite;
          }
          
          .animate-ping-slow {
            animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
          }
          
          .animate-spin-slow {
            animation: spin-slow 20s linear infinite;
          }
          
          .animate-pulse-slow {
            animation: pulse-slow 2s ease-in-out infinite;
          }
        `}
            </style>
        </div>
    );
};

export default LoginScreen;