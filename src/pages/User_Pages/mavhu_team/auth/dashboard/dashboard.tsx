import React, { useState, useEffect } from "react";
import Sidebar from "../../../../../components/Sidebar";
import {
    TrendingUp,
    Users,
    Leaf,
    Droplet,
    Zap,
    Shield,
    Globe,
    Building,
    Recycle,
    Heart,
    BarChart,
    Activity,
    Award,
    Target,
    CheckCircle,
    XCircle,
    AlertCircle,
    Database,
    ArrowRight,
} from "lucide-react";

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeCompany, setActiveCompany] = useState<string | null>(null);
    const [isDarkMode, setIsDarkMode] = useState(false); // Light mode by default

    // Colors for both modes - matching LandingPage
    const logoGreen = isDarkMode ? "#00FF00" : "#008000"; // Brighter green for dark, forest green for light
    const logoYellow = isDarkMode ? "#FFD700" : "#B8860B"; // Gold for dark, dark goldenrod for light
    const darkBg = "#0A0A0A"; // Not pure black
    const lightBg = "#F5F5F5"; // Light but not pure white
    const lightCardBg = "#FFFFFF"; // Pure white for cards in light mode

    // Theme classes matching LandingPage
    const themeClasses = {
        bg: isDarkMode ? darkBg : lightBg,
        text: isDarkMode ? "text-white" : "text-gray-900",
        textSecondary: isDarkMode ? "text-gray-300" : "text-gray-700",
        textMuted: isDarkMode ? "text-gray-400" : "text-gray-600",
        cardBg: isDarkMode ? `${darkBg}/30` : `${lightCardBg}/95`,
        cardBgAlt: isDarkMode ? `${darkBg}/40` : `${lightCardBg}/90`,
        border: isDarkMode ? "border-white/10" : "border-gray-300/70",
        borderHover: isDarkMode ? "border-white/20" : "border-gray-400",
        hoverBg: isDarkMode ? "hover:bg-white/10" : "hover:bg-gray-100",
    };

    // Hardcoded company data
    const companies = [
        {
            "name": "CBZ Holdings Limited",
            "registrationNumber": "CBZ-200001",
            "email": "info@cbz.co.zw",
            "phone": "+263242700000",
            "address": "CBZ House, 5th Street, Harare, Zimbabwe",
            "website": "https://www.cbz.co.zw",
            "country": "Zimbabwe",
            "industry": "Banking & Financial Services",
            "description": "A leading financial services group in Zimbabwe offering banking, insurance, and investment services.",
            "esgScores": {
                "overall": 82,
                "environmental": 78,
                "social": 85,
                "governance": 83
            },
            "apiUsage": {
                "totalCalls": 12500,
                "activeApis": 9,
                "lastUpdated": "2024-01-15"
            }
        },
        {
            "name": "Tongaat Hulett Zimbabwe Limited",
            "registrationNumber": "THZ-190055",
            "email": "info@tongaat.co.zw",
            "phone": "+263242700111",
            "address": "Tongaat Hulett House, Cleveland Road, Harare, Zimbabwe",
            "website": "https://www.tongaat.co.zw",
            "country": "Zimbabwe",
            "industry": "Agriculture & Sugar Production",
            "description": "A leading sugar producer in Zimbabwe with extensive sugar cane plantations and milling operations.",
            "esgScores": {
                "overall": 75,
                "environmental": 82,
                "social": 71,
                "governance": 72
            },
            "apiUsage": {
                "totalCalls": 9800,
                "activeApis": 11,
                "lastUpdated": "2024-01-14"
            }
        }
    ];

    // Overall dashboard stats
    const dashboardStats = [
        {
            title: "Total Companies",
            value: companies.length.toString(),
            change: "+2 this month",
            icon: Building,
            trending: true
        },
        {
            title: "Avg ESG Score",
            value: Math.round(companies.reduce((acc, company) => acc + company.esgScores.overall, 0) / companies.length).toString(),
            change: "+2.5% from last month",
            icon: TrendingUp,
            trending: true
        },
        {
            title: "Total API Calls",
            value: companies.reduce((acc, company) => acc + company.apiUsage.totalCalls, 0).toLocaleString(),
            change: "+15% this month",
            icon: Activity,
            trending: true
        },
        {
            title: "Active APIs",
            value: "13",
            change: "All systems operational",
            icon: CheckCircle,
            trending: false
        }
    ];

    // ESG metrics breakdown
    const esgMetrics = [
        {
            category: "Environmental",
            score: Math.round(companies.reduce((acc, company) => acc + company.esgScores.environmental, 0) / companies.length),
            icon: Leaf,
            description: "Carbon emissions, energy use, water management"
        },
        {
            category: "Social",
            score: Math.round(companies.reduce((acc, company) => acc + company.esgScores.social, 0) / companies.length),
            icon: Users,
            description: "Employee welfare, community impact, diversity"
        },
        {
            category: "Governance",
            score: Math.round(companies.reduce((acc, company) => acc + company.esgScores.governance, 0) / companies.length),
            icon: Shield,
            description: "Board diversity, ethics, transparency"
        }
    ];

    // API usage by category
    const apiCategories = [
        { name: "Soil Health", usage: 1240, icon: Leaf },
        { name: "Water Risk", usage: 980, icon: Droplet },
        { name: "Energy", usage: 1560, icon: Zap },
        { name: "Compliance", usage: 890, icon: Shield },
        { name: "Biodiversity", usage: 670, icon: Globe },
        { name: "Waste", usage: 430, icon: Recycle },
        { name: "Safety", usage: 1120, icon: Heart }
    ];

    // All available APIs
    const allApis = [
        { name: "Soil Health API", icon: Leaf },
        { name: "Crop Yield API", icon: TrendingUp },
        { name: "GHG Emissions API", icon: Database },
        { name: "Biodiversity API", icon: Globe },
        { name: "Water Risk API", icon: Droplet },
        { name: "Compliance API", icon: Shield },
        { name: "Energy API", icon: Zap },
        { name: "Waste API", icon: Recycle },
        { name: "Workforce API", icon: Users },
        { name: "Health & Safety API", icon: Heart },
        { name: "Governance API", icon: Building },
        { name: "Community API", icon: Users },
        { name: "ESG Score API", icon: BarChart }
    ];

    const getScoreColor = (score: number) => {
        if (score >= 80) return { text: isDarkMode ? "text-green-400" : "text-green-600", bg: isDarkMode ? "bg-green-400/20" : "bg-green-100" };
        if (score >= 60) return { text: isDarkMode ? "text-amber-400" : "text-amber-600", bg: isDarkMode ? "bg-amber-400/20" : "bg-amber-100" };
        return { text: isDarkMode ? "text-red-400" : "text-red-600", bg: isDarkMode ? "bg-red-400/20" : "bg-red-100" };
    };

    const getScoreIcon = (score: number) => {
        if (score >= 80) return <CheckCircle className={`w-5 h-5 ${isDarkMode ? "text-green-400" : "text-green-500"}`} />;
        if (score >= 60) return <AlertCircle className={`w-5 h-5 ${isDarkMode ? "text-amber-400" : "text-amber-500"}`} />;
        return <XCircle className={`w-5 h-5 ${isDarkMode ? "text-red-400" : "text-red-500"}`} />;
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Handle dark mode toggle from Sidebar
    const handleDarkModeToggle = () => {
        setIsDarkMode(!isDarkMode);
        if (!isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    useEffect(() => {
        // Initialize dark mode class
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    return (
        <div
            className={`flex min-h-screen transition-colors duration-300 ${themeClasses.bg} ${themeClasses.text}`}
            style={{
                '--logo-green': logoGreen,
                '--logo-yellow': logoYellow,
            } as React.CSSProperties}
        >
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                isDarkMode={isDarkMode}
                onDarkModeToggle={handleDarkModeToggle}
            />

            {/* Main Content */}
            <main className={`flex-1 lg:ml-0 transition-all duration-300 ${themeClasses.bg}`}>
                {/* Header */}
                <header className={`sticky top-0 z-30 border-b ${themeClasses.border} px-6 py-4 backdrop-blur-sm`}
                    style={{
                        background: isDarkMode
                            ? `${darkBg}/95`
                            : `${lightBg}/95`
                    }}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold" style={{ color: logoGreen }}>
                                ESG Dashboard
                            </h1>
                            <p className={`text-sm ${themeClasses.textSecondary}`}>
                                Monitoring Environmental, Social & Governance metrics across all companies
                            </p>
                        </div>
                        <button
                            onClick={toggleSidebar}
                            className={`lg:hidden p-2 rounded-lg transition-colors ${isDarkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"}`}
                        >
                            <div className="w-6 h-6 flex items-center justify-center">
                                <div className={`w-4 h-0.5 ${isDarkMode ? "bg-gray-300" : "bg-gray-600"} mb-1`}></div>
                                <div className={`w-4 h-0.5 ${isDarkMode ? "bg-gray-300" : "bg-gray-600"} mb-1`}></div>
                                <div className={`w-4 h-0.5 ${isDarkMode ? "bg-gray-300" : "bg-gray-600"}`}></div>
                            </div>
                        </button>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="p-6">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {dashboardStats.map((stat, index) => {
                            const IconComponent = stat.icon;
                            const color = index === 1 ? logoGreen : index === 3 ? logoYellow : logoGreen;

                            return (
                                <div
                                    key={index}
                                    className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 transition-all duration-300 hover:${themeClasses.borderHover} shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div
                                            className="p-3 rounded-xl"
                                            style={{
                                                background: `linear-gradient(to right, ${color}${isDarkMode ? '30' : '10'}, ${color}${isDarkMode ? '20' : '05'})`,
                                                border: `1px solid ${color}${isDarkMode ? '40' : '20'}`
                                            }}
                                        >
                                            <IconComponent className="w-6 h-6" style={{ color }} />
                                        </div>
                                        <span className={`text-sm font-medium ${stat.trending ? 'text-green-600 dark:text-green-400' : themeClasses.textMuted
                                            }`}>
                                            {stat.change}
                                        </span>
                                    </div>
                                    <h3 className="text-3xl font-bold mb-2" style={{ color }}>
                                        {stat.value}
                                    </h3>
                                    <p className={`text-sm ${themeClasses.textSecondary}`}>
                                        {stat.title}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        {/* ESG Scores Overview */}
                        <div className={`lg:col-span-2 ${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"
                            }`}>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold" style={{ color: logoGreen }}>
                                    ESG Scores Overview
                                </h2>
                                <div className="flex items-center space-x-2">
                                    <Award className="w-5 h-5" style={{ color: logoYellow }} />
                                    <span className={`text-sm ${themeClasses.textSecondary}`}>
                                        Industry Average: 78.5
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                {esgMetrics.map((metric, index) => {
                                    const scoreColor = getScoreColor(metric.score);
                                    return (
                                        <div
                                            key={index}
                                            className={`${themeClasses.cardBgAlt} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-5 transition-all duration-300 hover:${themeClasses.borderHover}`}
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <div
                                                    className="p-2 rounded-lg"
                                                    style={{
                                                        background: `linear-gradient(to right, ${logoGreen}${isDarkMode ? '30' : '10'}, ${logoGreen}${isDarkMode ? '20' : '05'})`,
                                                        border: `1px solid ${logoGreen}${isDarkMode ? '40' : '20'}`
                                                    }}
                                                >
                                                    <metric.icon className="w-5 h-5" style={{ color: logoGreen }} />
                                                </div>
                                                <div className={`px-3 py-1 rounded-full ${scoreColor.bg} ${scoreColor.text}`}>
                                                    <span className="text-sm font-semibold">{metric.score}/100</span>
                                                </div>
                                            </div>
                                            <h3 className="text-lg font-semibold mb-2">
                                                {metric.category}
                                            </h3>
                                            <p className={`text-sm ${themeClasses.textSecondary}`}>
                                                {metric.description}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Companies List */}
                            <div>
                                <h3 className="text-lg font-semibold mb-4" style={{ color: logoGreen }}>
                                    Registered Companies
                                </h3>
                                <div className="space-y-4">
                                    {companies.map((company, index) => {
                                        const scoreColor = getScoreColor(company.esgScores.overall);
                                        const isActive = activeCompany === company.registrationNumber;

                                        return (
                                            <div
                                                key={index}
                                                className={`flex items-center justify-between p-4 rounded-xl border transition-colors duration-300 cursor-pointer ${isActive
                                                        ? 'border-blue-500'
                                                        : themeClasses.border
                                                    } ${isActive ? (isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50') : themeClasses.hoverBg}`}
                                                onClick={() => setActiveCompany(company.registrationNumber)}
                                            >
                                                <div className="flex items-center space-x-4">
                                                    <div
                                                        className="p-3 rounded-lg"
                                                        style={{
                                                            background: `linear-gradient(to right, ${index % 2 === 0 ? logoGreen : logoYellow
                                                                }${isDarkMode ? '30' : '10'}, ${index % 2 === 0 ? logoGreen : logoYellow
                                                                }${isDarkMode ? '20' : '05'})`,
                                                            border: `1px solid ${index % 2 === 0 ? logoGreen : logoYellow
                                                                }${isDarkMode ? '40' : '20'}`
                                                        }}
                                                    >
                                                        <Building className="w-6 h-6" style={{ color: index % 2 === 0 ? logoGreen : logoYellow }} />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium">
                                                            {company.name}
                                                        </h4>
                                                        <p className={`text-sm ${themeClasses.textSecondary}`}>
                                                            {company.industry}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-4">
                                                    <div className="text-right">
                                                        <div className="text-2xl font-bold" style={{ color: scoreColor.text }}>
                                                            {company.esgScores.overall}
                                                        </div>
                                                        <div className={`text-sm ${themeClasses.textSecondary}`}>
                                                            ESG Score
                                                        </div>
                                                    </div>
                                                    {getScoreIcon(company.esgScores.overall)}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* API Usage & Company Details */}
                        <div className="space-y-6">
                            {/* API Usage */}
                            <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"
                                }`}>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-semibold" style={{ color: logoGreen }}>
                                        API Usage
                                    </h2>
                                    <Target className="w-5 h-5" style={{ color: logoGreen }} />
                                </div>
                                <div className="space-y-4">
                                    {apiCategories.map((api, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div
                                                    className="p-2 rounded-lg"
                                                    style={{
                                                        background: `linear-gradient(to right, ${logoGreen}${isDarkMode ? '30' : '10'}, ${logoGreen}${isDarkMode ? '20' : '05'})`,
                                                        border: `1px solid ${logoGreen}${isDarkMode ? '40' : '20'}`
                                                    }}
                                                >
                                                    <api.icon className="w-4 h-4" style={{ color: logoGreen }} />
                                                </div>
                                                <span className="text-sm font-medium">
                                                    {api.name}
                                                </span>
                                            </div>
                                            <span className={`text-sm ${themeClasses.textSecondary}`}>
                                                {api.usage.toLocaleString()} calls
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div className={`mt-6 pt-6 border-t ${themeClasses.border}`}>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className={themeClasses.textSecondary}>Total This Month</span>
                                        <span className="font-semibold">
                                            {apiCategories.reduce((acc, api) => acc + api.usage, 0).toLocaleString()} calls
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Available APIs */}
                            <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"
                                }`}>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-semibold" style={{ color: logoGreen }}>
                                        Available APIs
                                    </h2>
                                    <Database className="w-5 h-5" style={{ color: logoGreen }} />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {allApis.map((api, index) => (
                                        <div
                                            key={index}
                                            className={`flex items-center space-x-2 p-3 rounded-lg border ${themeClasses.border} transition-colors duration-300 ${themeClasses.hoverBg}`}
                                        >
                                            <div
                                                className="p-1.5 rounded-md"
                                                style={{
                                                    background: `linear-gradient(to right, ${logoGreen}${isDarkMode ? '30' : '10'}, ${logoGreen}${isDarkMode ? '20' : '05'})`,
                                                    border: `1px solid ${logoGreen}${isDarkMode ? '40' : '20'}`
                                                }}
                                            >
                                                <api.icon className="w-3.5 h-3.5" style={{ color: logoGreen }} />
                                            </div>
                                            <span className="text-xs font-medium truncate">{api.name}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6">
                                    <button
                                        className="w-full py-2.5 rounded-lg font-medium transition-all hover:opacity-90 flex items-center justify-center space-x-2"
                                        style={{
                                            background: `linear-gradient(to right, ${logoGreen}, ${isDarkMode ? '#00CC00' : '#006400'})`,
                                            color: '#FFFFFF',
                                        }}
                                    >
                                        <span>View All APIs</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Company Details */}
                            {activeCompany && (
                                <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"
                                    }`}>
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-lg font-semibold" style={{ color: logoGreen }}>
                                            Company Details
                                        </h2>
                                        <button
                                            onClick={() => setActiveCompany(null)}
                                            className={`p-1 rounded ${themeClasses.hoverBg}`}
                                        >
                                            <XCircle className="w-5 h-5" style={{ color: logoGreen }} />
                                        </button>
                                    </div>

                                    {(() => {
                                        const company = companies.find(c => c.registrationNumber === activeCompany);
                                        if (!company) return null;

                                        return (
                                            <>
                                                <div className="mb-6">
                                                    <h3 className="text-xl font-bold mb-2">
                                                        {company.name}
                                                    </h3>
                                                    <p className={`text-sm ${themeClasses.textSecondary} mb-4`}>
                                                        {company.description}
                                                    </p>

                                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                                        <div>
                                                            <p className={`text-xs ${themeClasses.textMuted} mb-1`}>Industry</p>
                                                            <p className="text-sm font-medium">
                                                                {company.industry}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className={`text-xs ${themeClasses.textMuted} mb-1`}>Country</p>
                                                            <p className="text-sm font-medium">
                                                                {company.country}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* ESG Scores Breakdown */}
                                                <div className="mb-6">
                                                    <h4 className="text-sm font-semibold mb-3">
                                                        ESG Scores Breakdown
                                                    </h4>
                                                    <div className="space-y-3">
                                                        {Object.entries(company.esgScores).map(([key, value]) => (
                                                            <div key={key} className="flex items-center justify-between">
                                                                <span className={`text-sm ${themeClasses.textSecondary} capitalize`}>
                                                                    {key}
                                                                </span>
                                                                <div className="flex items-center space-x-2">
                                                                    <div className={`w-24 h-2 rounded-full overflow-hidden ${isDarkMode ? "bg-gray-700" : "bg-gray-200"
                                                                        }`}>
                                                                        <div
                                                                            className="h-full"
                                                                            style={{
                                                                                background: `linear-gradient(to right, ${logoGreen}, ${isDarkMode ? '#00CC00' : '#006400'})`,
                                                                                width: `${value}%`
                                                                            }}
                                                                        />
                                                                    </div>
                                                                    <span className="text-sm font-medium w-8">
                                                                        {value}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* API Usage Stats */}
                                                <div>
                                                    <h4 className="text-sm font-semibold mb-3">
                                                        API Usage
                                                    </h4>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className={`rounded-lg p-3 ${isDarkMode ? "bg-gray-800" : "bg-gray-50"
                                                            }`}>
                                                            <p className={`text-xs ${themeClasses.textMuted} mb-1`}>
                                                                Total API Calls
                                                            </p>
                                                            <p className="text-lg font-bold" style={{ color: logoGreen }}>
                                                                {company.apiUsage.totalCalls.toLocaleString()}
                                                            </p>
                                                        </div>
                                                        <div className={`rounded-lg p-3 ${isDarkMode ? "bg-gray-800" : "bg-gray-50"
                                                            }`}>
                                                            <p className={`text-xs ${themeClasses.textMuted} mb-1`}>
                                                                Active APIs
                                                            </p>
                                                            <p className="text-lg font-bold" style={{ color: logoGreen }}>
                                                                {company.apiUsage.activeApis}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        );
                                    })()}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"
                        }`}>
                        <h2 className="text-lg font-semibold mb-6" style={{ color: logoGreen }}>
                            Recent Activity
                        </h2>
                        <div className="space-y-4">
                            {[
                                { company: "CBZ Holdings", action: "Updated ESG scores", time: "2 hours ago", type: "update" },
                                { company: "Tongaat Hulett", action: "Added new compliance data", time: "5 hours ago", type: "add" },
                                { company: "System", action: "Scheduled data sync completed", time: "1 day ago", type: "system" },
                                { company: "CBZ Holdings", action: "Generated quarterly report", time: "2 days ago", type: "report" },
                            ].map((activity, index) => (
                                <div key={index} className={`flex items-center justify-between p-3 rounded-lg transition-colors ${themeClasses.hoverBg}`}>
                                    <div className="flex items-center space-x-3">
                                        <div
                                            className="p-2 rounded-lg"
                                            style={{
                                                background: activity.type === 'update' ? `linear-gradient(to right, ${logoGreen}${isDarkMode ? '30' : '10'}, ${logoGreen}${isDarkMode ? '20' : '05'})` :
                                                    activity.type === 'add' ? `linear-gradient(to right, ${logoYellow}${isDarkMode ? '30' : '10'}, ${logoYellow}${isDarkMode ? '20' : '05'})` :
                                                        isDarkMode ? "bg-gray-700" : "bg-gray-100",
                                                border: `1px solid ${activity.type === 'update' ? `${logoGreen}${isDarkMode ? '40' : '20'}` :
                                                        activity.type === 'add' ? `${logoYellow}${isDarkMode ? '40' : '20'}` :
                                                            isDarkMode ? "transparent" : "transparent"
                                                    }`
                                            }}
                                        >
                                            {activity.type === 'update' && <TrendingUp className="w-4 h-4" style={{ color: activity.type === 'update' ? logoGreen : undefined }} />}
                                            {activity.type === 'add' && <CheckCircle className="w-4 h-4" style={{ color: activity.type === 'add' ? logoYellow : undefined }} />}
                                            {activity.type === 'system' && <Activity className="w-4 h-4" style={{ color: isDarkMode ? "#9CA3AF" : "#6B7280" }} />}
                                            {activity.type === 'report' && <BarChart className="w-4 h-4" style={{ color: logoGreen }} />}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">
                                                {activity.company} - {activity.action}
                                            </p>
                                            <p className={`text-xs ${themeClasses.textSecondary}`}>
                                                {activity.time}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;