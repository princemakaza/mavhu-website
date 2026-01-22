import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, Filler, ScatterController } from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Sidebar from "../../../../components/Sidebar";
import {
    TrendingUp,
    TrendingDown,
    Thermometer,
    CheckCircle,
    AlertCircle,
    Calendar,
    Download,
    RefreshCw,
    ChevronLeft,
    Database,
    Moon,
    Sun,
    Building,
    ArrowRight,
    Map,
    Wind,
    Zap,
    Factory,

    Scale,
    Target as TargetIcon,
    Award,
    AlertOctagon,
    PieChart,
    LineChart as LineChartIcon,
    MapPin,
    Maximize2,
    Minimize2,
} from "lucide-react";
import {
    getGhgEmissionData,
    getGhgSummary,
    getScopeBreakdown,
    getScope1Sources,
    getScope2Sources,
    getScope3Categories,
    getCarbonEmissionAccounting,
    getEmissionMetrics,
    getReductionTargets,
    getCurrentPerformance,
    getFutureTargets,
    getIntensityAnalysis,
    getComplianceRecommendations,
    getReportingRequirements,
    getAllGhgGraphData,
    getConfidenceAssessment,
    getSummary,
    getGhgMetadata,
    getEmissionFactors,
    getAllYearlyData,
    getKeyMetricsSummary,
    getComplianceFrameworks,
    getDataCoverage,
    isCarbonDataAvailable,
    getGhgCompany,
    getCurrentYear,
    getBaselineYear,
    getPreviousYear,
    getAvailableGhgYears,
    type GhgEmissionResponse,
    type GhgEmissionParams,
    type DetailedSource,
} from "../../../../../src/services/ghg_emission_service";
import { getCompanies, type Company } from "../../../../../src/services/companies_service";

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Filler,
    ScatterController
);

// Fix Leaflet icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Skeleton Loading Components
const SkeletonCard = ({ className = "" }: { className?: string }) => (
    <div className={`animate-pulse ${className}`}>
        <div className="h-full rounded-2xl bg-gray-700/30 dark:bg-gray-800/30"></div>
    </div>
);

const SkeletonText = ({ width = "full", height = "h-4" }: { width?: string, height?: string }) => (
    <div className={`${height} ${width} rounded bg-gray-600/30 dark:bg-gray-700/30 animate-pulse`}></div>
);

const SkeletonChart = () => (
    <div className="animate-pulse h-64 w-full rounded-lg bg-gray-700/30 dark:bg-gray-800/30"></div>
);

const GhgEmissionScreen = () => {
    const { companyId: paramCompanyId } = useParams<{ companyId: string }>();
    const location = useLocation();
    const navigate = useNavigate();

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [ghgData, setGhgData] = useState<GhgEmissionResponse | null>(null);
    const [companies, setCompanies] = useState<Company[]>([]);
    const [selectedCompanyId, setSelectedCompanyId] = useState<string>(paramCompanyId || "");
    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const [availableYears, setAvailableYears] = useState<number[]>([]);
    const [showCompanySelector, setShowCompanySelector] = useState(!paramCompanyId);
    const [activeTab, setActiveTab] = useState("overview");
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [mapZoom, setMapZoom] = useState(10);
    const [mapCenter, setMapCenter] = useState<[number, number]>([0, 0]);
    const [showFullMap, setShowFullMap] = useState(false);
    const [expandedScope, setExpandedScope] = useState<number | null>(null);
    const [showDetailedFactors, setShowDetailedFactors] = useState(false);

    // Color scheme matching Sidebar - Same as CropYieldScreen
    const logoGreen = isDarkMode ? "#00FF00" : "#008000";
    const logoYellow = isDarkMode ? "#FFD700" : "#B8860B";
    const accentBlue = isDarkMode ? "#3B82F6" : "#1D4ED8";
    const accentPurple = isDarkMode ? "#8B5CF6" : "#7C3AED";

    // Theme colors matching Sidebar
    const darkBg = "#111827";
    const lightBg = "#FFFFFF";
    const lightCardBg = "#F9FAFB";

    // Enhanced theme classes with better visibility
    const themeClasses = {
        bg: isDarkMode ? "bg-gray-900" : "bg-white",
        text: isDarkMode ? "text-gray-100" : "text-gray-900",
        textSecondary: isDarkMode ? "text-gray-300" : "text-gray-700",
        textMuted: isDarkMode ? "text-gray-400" : "text-gray-600",
        navBg: isDarkMode ? "bg-gray-900/98" : "bg-white/98",
        cardBg: isDarkMode ? "bg-gray-800/70" : "bg-white/95",
        cardBgAlt: isDarkMode ? "bg-gray-800/90" : "bg-white/98",
        border: isDarkMode ? "border-gray-700" : "border-gray-200",
        borderHover: isDarkMode ? "border-gray-600" : "border-gray-300",
        hoverBg: isDarkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-100",
        modalBg: isDarkMode ? "bg-gray-900" : "bg-white",
        chartGrid: isDarkMode ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.1)",
        chartText: isDarkMode ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.8)",
    };

    // Enhanced chart colors for better visibility - Same as CropYieldScreen
    const chartColors = {
        primary: logoGreen,
        secondary: logoYellow,
        tertiary: accentBlue,
        quaternary: accentPurple,
        success: isDarkMode ? "#00FF00" : "#008000",
        warning: isDarkMode ? "#FFD700" : "#B8860B",
        danger: isDarkMode ? "#FF6B6B" : "#DC2626",
        background: isDarkMode ? [
            'rgba(0, 255, 0, 0.3)',
            'rgba(255, 215, 0, 0.3)',
            'rgba(59, 130, 246, 0.3)',
            'rgba(139, 92, 246, 0.3)',
            'rgba(236, 72, 153, 0.3)',
            'rgba(14, 165, 233, 0.3)',
        ] : [
            'rgba(0, 128, 0, 0.2)',
            'rgba(184, 134, 11, 0.2)',
            'rgba(59, 130, 246, 0.2)',
            'rgba(139, 92, 246, 0.2)',
            'rgba(236, 72, 153, 0.2)',
            'rgba(14, 165, 233, 0.2)',
        ],
        border: isDarkMode ? [
            logoGreen,
            logoYellow,
            accentBlue,
            accentPurple,
            '#EC4899',
            '#0EA5E9',
        ] : [
            '#008000',
            '#B8860B',
            '#1D4ED8',
            '#7C3AED',
            '#DB2777',
            '#0284C7',
        ],
    };

    // Scope colors using the same palette - Updated to match CropYieldScreen color scheme
    const scope1Color = chartColors.border[2]; // Blue for Scope 1 (accentBlue)
    const scope2Color = chartColors.border[1]; // Yellow for Scope 2 (logoYellow)
    const scope3Color = chartColors.border[3]; // Purple for Scope 3 (accentPurple)

    // Apply dark mode class to document
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    // Toggle dark mode
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    // Fetch companies for dropdown
    const fetchCompanies = async () => {
        try {
            const response = await getCompanies(1, 100);
            setCompanies(response.items);
            if (!selectedCompanyId && response.items.length > 0) {
                setSelectedCompanyId(response.items[0]._id);
            }
        } catch (err: any) {
            console.error("Failed to fetch companies:", err);
        }
    };

    // Fetch GHG emissions data
    const fetchGhgData = async () => {
        if (!selectedCompanyId) return;

        try {
            setLoading(true);
            setError(null);
            const params: GhgEmissionParams = {
                companyId: selectedCompanyId,
            };

            // Only add year if selected (not null)
            if (selectedYear !== null) {
                params.year = selectedYear;
            }

            const data = await getGhgEmissionData(params);
            setGhgData(data);

            // Extract available years from response
            const years = getAvailableGhgYears(data);
            const sortedYears = [...years].sort((a, b) => b - a);
            setAvailableYears(sortedYears);

            // Set map center if coordinates exist
            if (data.data.company.area_of_interest_metadata?.coordinates?.length > 0) {
                const coords = data.data.company.area_of_interest_metadata.coordinates;
                if (coords.length === 1) {
                    setMapCenter([coords[0].lat, coords[0].lon]);
                } else {
                    // Calculate center of polygon
                    const avgLat = coords.reduce((sum: number, c: any) => sum + c.lat, 0) / coords.length;
                    const avgLon = coords.reduce((sum: number, c: any) => sum + c.lon, 0) / coords.length;
                    setMapCenter([avgLat, avgLon]);
                }
            }
        } catch (err: any) {
            setError(err.message || "Failed to fetch GHG emissions data");
            console.error("Error fetching GHG emissions data:", err);
        } finally {
            setLoading(false);
            setIsRefreshing(false);
        }
    };

    // Handle refresh
    const handleRefresh = () => {
        setIsRefreshing(true);
        fetchGhgData();
    };

    // Handle company change
    const handleCompanyChange = (companyId: string) => {
        setSelectedCompanyId(companyId);
        setShowCompanySelector(false);
        navigate(`/esg-dashboard/ghg-emissions/${companyId}`);
    };

    // Handle year change
    const handleYearChange = (year: number | null) => {
        setSelectedYear(year);
    };

    // Initialize
    useEffect(() => {
        if (location.state?.companyId) {
            setSelectedCompanyId(location.state.companyId);
            setShowCompanySelector(false);
        }
        fetchCompanies();
    }, [location.state]);

    useEffect(() => {
        if (selectedCompanyId) {
            fetchGhgData();
        }
    }, [selectedCompanyId, selectedYear]);

    // Toggle sidebar
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Navigate back
    const navigateBack = () => {
        navigate("/company-management");
    };

    // Get selected company name
    const selectedCompany = companies.find(c => c._id === selectedCompanyId);

    // Get summary data
    const ghgSummary = ghgData ? getGhgSummary(ghgData) : null;
    const scopeBreakdown = ghgData ? getScopeBreakdown(ghgData) : null;
    const scope1Sources = ghgData ? getScope1Sources(ghgData) : [];
    const scope2Sources = ghgData ? getScope2Sources(ghgData) : [];
    const scope3Categories = ghgData ? getScope3Categories(ghgData) : [];
    const carbonAccounting = ghgData ? getCarbonEmissionAccounting(ghgData) : null;
    const emissionMetrics = ghgData ? getEmissionMetrics(ghgData) : null;
    const reductionTargets = ghgData ? getReductionTargets(ghgData) : null;
    const currentPerformance = ghgData ? getCurrentPerformance(ghgData) : null;
    const futureTargets = ghgData ? getFutureTargets(ghgData) : [];
    const intensityAnalysis = ghgData ? getIntensityAnalysis(ghgData) : null;
    const complianceRecommendations = ghgData ? getComplianceRecommendations(ghgData) : [];
    const reportingRequirements = ghgData ? getReportingRequirements(ghgData) : null;
    const confidenceAssessment = ghgData ? getConfidenceAssessment(ghgData) : null;
    const summary = ghgData ? getSummary(ghgData) : null;
    const metadata = ghgData ? getGhgMetadata(ghgData) : null;
    const emissionFactors = ghgData ? getEmissionFactors(ghgData) : [];
    const yearlyData = ghgData ? getAllYearlyData(ghgData) : [];
    const keyMetricsSummary = ghgData ? getKeyMetricsSummary(ghgData) : [];
    const complianceFrameworks = ghgData ? getComplianceFrameworks(ghgData) : [];
    const dataCoverage = ghgData ? getDataCoverage(ghgData) : null;
    const isCarbonDataAvail = ghgData ? isCarbonDataAvailable(ghgData) : false;
    const companyInfo = ghgData ? getGhgCompany(ghgData) : null;
    const currentYear = ghgData ? getCurrentYear(ghgData) : null;
    const baselineYear = ghgData ? getBaselineYear(ghgData) : null;
    const previousYear = ghgData ? getPreviousYear(ghgData) : null;

    // Get graphs
    const graphs = ghgData ? getAllGhgGraphData(ghgData) : null;

    // Get coordinates for map
    const coordinates = ghgData?.data.company.area_of_interest_metadata?.coordinates || [];
    const areaName = ghgData?.data.company.area_of_interest_metadata?.name || "Production Area";
    const areaCovered = ghgData?.data.company.area_of_interest_metadata?.area_covered || "N/A";

    // Format number with commas
    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('en-US').format(num);
    };

    // Format percentage
    const formatPercentage = (num: number) => {
        return `${num.toFixed(1)}%`;
    };

    // Get trend icon
    const getTrendIcon = (trend: string) => {
        if (trend.toLowerCase().includes('declining') || trend.toLowerCase().includes('decrease') || trend.toLowerCase().includes('down')) {
            return <TrendingDown className="w-4 h-4" style={{ color: logoGreen }} />;
        } else if (trend.toLowerCase().includes('improving') || trend.toLowerCase().includes('increase') || trend.toLowerCase().includes('up')) {
            return <TrendingUp className="w-4 h-4" style={{ color: logoGreen }} />;
        } else {
            return <TrendingUp className="w-4 h-4 text-gray-500" />;
        }
    };

    // Get confidence color
    const getConfidenceColor = (score: number) => {
        if (score >= 80) return `text-[${logoGreen}]`;
        if (score >= 60) return "text-yellow-500";
        return "text-red-500";
    };

    // Get confidence background
    const getConfidenceBg = (score: number) => {
        if (score >= 80) return `bg-[${logoGreen}]/20`;
        if (score >= 60) return "bg-yellow-500/20";
        return "bg-red-500/20";
    };

    // Get risk level color
    const getRiskColor = (level: string) => {
        switch (level.toLowerCase()) {
            case 'low':
                return logoGreen;
            case 'medium':
                return logoYellow;
            case 'high':
                return '#FF6B6B';
            case 'critical':
                return '#DC2626';
            default:
                return logoGreen;
        }
    };

    // Get intensity performance color
    const getIntensityColor = (performance: string) => {
        if (performance.toLowerCase().includes('better')) return logoGreen;
        if (performance.toLowerCase().includes('worse')) return '#FF6B6B';
        return logoYellow;
    };

    // Get scope color
    const getScopeColor = (scope: string) => {
        switch (scope.toLowerCase()) {
            case 'scope1':
                return scope1Color;
            case 'scope2':
                return scope2Color;
            case 'scope3':
                return scope3Color;
            default:
                return logoGreen;
        }
    };

    // Map Component - Fixed version
    const MapDisplay = () => {
        if (coordinates.length === 0) {
            return (
                <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                        <Map className="w-12 h-12 mx-auto mb-4 opacity-30" style={{ color: logoGreen }} />
                        <p className={themeClasses.textMuted}>No location data available</p>
                    </div>
                </div>
            );
        }

        // Create a custom div icon for better compatibility
        const customIcon = L.divIcon({
            html: `<div style="background-color: ${logoGreen}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"></div>`,
            className: 'custom-icon',
            iconSize: [20, 20],
            iconAnchor: [10, 10],
        });

        return (
            <MapContainer
                center={mapCenter}
                zoom={mapZoom}
                style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
                className="leaflet-container"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url={isDarkMode
                        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    }
                />

                {coordinates.length === 1 ? (
                    <Marker position={[coordinates[0].lat, coordinates[0].lon]} icon={customIcon}>
                        <Popup>
                            <div className="p-2">
                                <h3 className="font-bold" style={{ color: logoGreen }}>{areaName}</h3>
                                <p className="text-sm">Lat: {coordinates[0].lat.toFixed(4)}</p>
                                <p className="text-sm">Lon: {coordinates[0].lon.toFixed(4)}</p>
                                <p className="text-sm">Area: {areaCovered}</p>
                            </div>
                        </Popup>
                    </Marker>
                ) : (
                    <Polygon
                        pathOptions={{
                            fillColor: logoGreen,
                            color: logoGreen,
                            fillOpacity: 0.3,
                            weight: 2
                        }}
                        positions={coordinates.map((coord: any) => [coord.lat, coord.lon])}
                    >
                        <Popup>
                            <div className="p-2">
                                <h3 className="font-bold" style={{ color: logoGreen }}>{areaName}</h3>
                                <p className="text-sm">Area: {areaCovered}</p>
                                <p className="text-sm">Coordinates: {coordinates.length} points</p>
                            </div>
                        </Popup>
                    </Polygon>
                )}
            </MapContainer>
        );
    };

    // Skeleton Loading Screen
    if (loading) {
        return (
            <div className={`flex min-h-screen ${themeClasses.bg} ${themeClasses.text}`}>
                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />
                <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-0' : 'lg:ml-0'} ${themeClasses.bg}`}>
                    {/* Header Skeleton */}
                    <header className={`sticky top-0 z-30 border-b ${themeClasses.border} px-6 py-4 backdrop-blur-sm ${themeClasses.navBg}`}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-gray-600/30 dark:bg-gray-700/30 animate-pulse"></div>
                                <div className="space-y-2">
                                    <SkeletonText width="w-48" height="h-6" />
                                    <SkeletonText width="w-64" height="h-4" />
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-32 h-10 rounded-lg bg-gray-600/30 dark:bg-gray-700/30 animate-pulse"></div>
                                <div className="w-10 h-10 rounded-lg bg-gray-600/30 dark:bg-gray-700/30 animate-pulse"></div>
                                <div className="w-24 h-10 rounded-lg bg-gray-600/30 dark:bg-gray-700/30 animate-pulse"></div>
                                <div className="w-10 h-10 rounded-lg bg-gray-600/30 dark:bg-gray-700/30 animate-pulse"></div>
                            </div>
                        </div>
                        {/* Tabs Skeleton */}
                        <div className="flex space-x-1 mt-4">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                <div key={i} className="w-20 h-8 rounded-lg bg-gray-600/30 dark:bg-gray-700/30 animate-pulse"></div>
                            ))}
                        </div>
                    </header>

                    {/* Content Skeleton */}
                    <div className="p-6">
                        {/* Key Metrics Skeleton */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {[1, 2, 3, 4].map((i) => (
                                <SkeletonCard key={i} className="h-40" />
                            ))}
                        </div>

                        {/* Map and Scope Composition Skeleton */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                            <SkeletonCard className="h-80" />
                            <div className="lg:col-span-2">
                                <SkeletonCard className="h-80" />
                            </div>
                        </div>

                        {/* Intensity & Confidence Skeleton */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            <SkeletonCard className="h-96" />
                            <SkeletonCard className="h-96" />
                        </div>

                        {/* Targets Skeleton */}
                        <SkeletonCard className="h-48 mb-8" />

                        {/* Recommendations Skeleton */}
                        <SkeletonCard className="h-64" />
                    </div>
                </main>
            </div>
        );
    }

    // Render company selector if needed
    if (showCompanySelector && !paramCompanyId) {
        return (
            <div className={`flex min-h-screen ${themeClasses.bg} ${themeClasses.text}`}>
                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />
                <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-0' : 'lg:ml-0'} ${themeClasses.bg}`}>
                    {/* Header */}
                    <header className={`sticky top-0 z-30 border-b ${themeClasses.border} px-6 py-4 backdrop-blur-sm ${themeClasses.navBg}`}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={navigateBack}
                                    className={`p-2 rounded-lg ${themeClasses.hoverBg} transition-colors`}
                                    style={{ color: logoGreen }}
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <div>
                                    <h1 className="text-2xl font-bold" style={{ color: logoGreen }}>
                                        Select Company
                                    </h1>
                                    <p className={`text-sm ${themeClasses.textSecondary}`}>
                                        Choose a company to view GHG emissions data
                                    </p>
                                </div>
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

                    {/* Company Selection */}
                    <div className="p-6">
                        <div className="max-w-4xl mx-auto">
                            <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-8 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                <div className="flex items-center gap-3 mb-6">
                                    <Building className="w-8 h-8" style={{ color: logoGreen }} />
                                    <h2 className="text-xl font-bold">Available Companies</h2>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    {companies.map((company: Company) => (
                                        <button
                                            key={company._id}
                                            onClick={() => handleCompanyChange(company._id)}
                                            className={`flex items-center gap-4 p-4 rounded-xl border ${themeClasses.border} transition-all duration-300 hover:border-[${logoGreen}] ${themeClasses.hoverBg} text-left group`}
                                        >
                                            <div
                                                className="p-3 rounded-lg"
                                                style={{
                                                    background: `linear-gradient(to right, ${logoGreen}30, ${logoGreen}20)`,
                                                    border: `1px solid ${logoGreen}40`
                                                }}
                                            >
                                                <Factory className="w-6 h-6" style={{ color: logoGreen }} />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold mb-1">{company.name}</h3>
                                                <p className={`text-sm ${themeClasses.textMuted}`}>
                                                    {company.industry} • {company.country}
                                                </p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <div className={`text-xs px-2 py-1 rounded-full ${company.esg_data_status === 'complete' ? `bg-[${logoGreen}]/20 text-[${logoGreen}]` : company.esg_data_status === 'partial' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-red-500/20 text-red-500'}`}>
                                                        {company.esg_data_status?.replace('_', ' ') || 'Not Collected'}
                                                    </div>
                                                </div>
                                            </div>
                                            <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: logoGreen }} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className={`flex min-h-screen transition-colors duration-300 ${themeClasses.bg} ${themeClasses.text}`}>
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            {/* Main Content */}
            <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-0' : 'lg:ml-0'}`}>
                {/* Header */}
                <header className={`sticky top-0 z-30 border-b ${themeClasses.border} px-6 py-4 backdrop-blur-sm ${themeClasses.navBg}`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={navigateBack}
                                className={`p-2 rounded-lg ${themeClasses.hoverBg} transition-colors`}
                                style={{ color: logoGreen }}
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold" style={{ color: logoGreen }}>
                                    GHG Emissions Dashboard
                                </h1>
                                <p className={`text-sm ${themeClasses.textSecondary}`}>
                                    {selectedCompany?.name || "Company Data"} • {selectedYear === null ? "All Years" : selectedYear}
                                    {metadata?.company_id && (
                                        <span className="ml-2 px-2 py-1 text-xs rounded bg-gray-500/20">
                                            ID: {metadata.company_id}
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Year Selector */}
                            {availableYears.length > 0 && (
                                <div className="relative">
                                    <select
                                        value={selectedYear === null ? "" : selectedYear}
                                        onChange={(e) => handleYearChange(e.target.value ? Number(e.target.value) : null)}
                                        className={`pl-4 pr-10 py-2 rounded-lg border ${themeClasses.border} ${themeClasses.cardBg} focus:outline-none focus:ring-2 focus:ring-offset-1 ${isDarkMode ? `focus:ring-[${logoGreen}]` : `focus:ring-[${logoGreen}]`} appearance-none`}
                                        style={{
                                            background: isDarkMode ? `linear-gradient(to right, ${logoGreen}10, ${logoGreen}05)` : undefined
                                        }}
                                    >
                                        <option value="">All Years</option>
                                        {availableYears.map((year: number) => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: logoGreen }} />
                                </div>
                            )}

                            {/* Refresh Button */}
                            <button
                                onClick={handleRefresh}
                                disabled={isRefreshing}
                                className={`p-2 rounded-lg ${themeClasses.hoverBg} transition-colors ${isRefreshing ? 'animate-spin' : ''}`}
                                style={{ color: logoGreen }}
                            >
                                <RefreshCw className="w-5 h-5" />
                            </button>

                            {/* Export Button */}
                            <button
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${themeClasses.border} ${themeClasses.hoverBg} transition-colors`}
                                style={{ color: logoGreen }}
                            >
                                <Download className="w-4 h-4" />
                                <span className="text-sm font-medium">Export</span>
                            </button>

                            {/* Dark Mode Toggle */}
                            <button
                                onClick={toggleDarkMode}
                                className={`p-2 rounded-lg ${themeClasses.hoverBg} transition-colors`}
                                style={{ color: logoGreen }}
                            >
                                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>

                            {/* Sidebar Toggle */}
                            <button
                                onClick={toggleSidebar}
                                className={`lg:hidden p-2 rounded-lg transition-colors ${isDarkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"}`}
                                style={{ color: logoGreen }}
                            >
                                <div className="w-6 h-6 flex items-center justify-center">
                                    <div className={`w-4 h-0.5 ${isDarkMode ? "bg-gray-300" : "bg-gray-600"} mb-1`}></div>
                                    <div className={`w-4 h-0.5 ${isDarkMode ? "bg-gray-300" : "bg-gray-600"} mb-1`}></div>
                                    <div className={`w-4 h-0.5 ${isDarkMode ? "bg-gray-300" : "bg-gray-600"}`}></div>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex space-x-1 mt-4 overflow-x-auto">
                        {["overview", "scope1", "scope2", "scope3", "targets", "methodology", "compliance", "analytics", "location"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab
                                    ? `text-white`
                                    : `${themeClasses.hoverBg} opacity-70 hover:opacity-100`
                                    }`}
                                style={{
                                    background: activeTab === tab
                                        ? `linear-gradient(to right, ${logoGreen}, ${isDarkMode ? "#00CC00" : "#006400"})`
                                        : undefined,
                                }}
                            >
                                {tab === "scope1" ? "Scope 1" :
                                    tab === "scope2" ? "Scope 2" :
                                        tab === "scope3" ? "Scope 3" :
                                            tab.charAt(0).toUpperCase() + tab.slice(1).replace('_', ' ')}
                            </button>
                        ))}
                    </div>
                </header>

                {/* Error Message */}
                {error && (
                    <div className={`m-6 p-4 rounded-xl border ${isDarkMode ? "bg-red-900/20 border-red-700" : "bg-red-50 border-red-200"}`}>
                        <div className="flex items-center">
                            <AlertCircle className="w-5 h-5 mr-2 text-red-500" />
                            <p className="text-red-600 dark:text-red-400">{error}</p>
                        </div>
                    </div>
                )}

                {/* Content */}
                <div className="p-6">
                    {/* Overview Tab */}
                    {activeTab === "overview" && ghgData && ghgSummary && scopeBreakdown && (
                        <>
                            {/* Key Metrics Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                {/* Total Emissions */}
                                <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 transition-all duration-300 hover:border-[${logoGreen}] shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <div
                                            className="p-3 rounded-xl"
                                            style={{
                                                background: `linear-gradient(to right, ${logoGreen}30, ${logoGreen}20)`,
                                                border: `1px solid ${logoGreen}40`
                                            }}
                                        >
                                            <Thermometer className="w-6 h-6" style={{ color: logoGreen }} />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-sm ${getConfidenceColor(confidenceAssessment?.overall_score || 0)}`}>
                                                {confidenceAssessment?.overall_score ? formatPercentage(confidenceAssessment.overall_score) : 'N/A'}
                                            </span>
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-bold mb-2">
                                        {formatNumber(ghgSummary.totalEmissions)}
                                        <span className="text-lg ml-1">tCO₂e</span>
                                    </h3>
                                    <p className={`${themeClasses.textSecondary} mb-2`}>Total GHG Emissions</p>
                                    <div className="flex items-center justify-between">
                                        <span className={`text-sm ${ghgSummary.reductionFromBaseline > 0 ? `text-[${logoGreen}]` : 'text-red-500'}`}>
                                            {ghgSummary.reductionFromBaseline > 0 ? '↓' : '↑'} {Math.abs(ghgSummary.reductionFromBaseline)}% from baseline
                                        </span>
                                        <span className={`text-xs px-2 py-1 rounded-full ${getConfidenceBg(confidenceAssessment?.overall_score || 0)}`}>
                                            {currentYear || 'Current'}
                                        </span>
                                    </div>
                                </div>

                                {/* Scope 1 Emissions */}
                                <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 transition-all duration-300 hover:border-[${scope1Color}] shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <div
                                            className="p-3 rounded-xl"
                                            style={{
                                                background: `linear-gradient(to right, ${scope1Color}30, ${scope1Color}20)`,
                                                border: `1px solid ${scope1Color}40`
                                            }}
                                        >
                                            <Factory className="w-6 h-6" style={{ color: scope1Color }} />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {getTrendIcon(scopeBreakdown.scope1.trend)}
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-bold mb-2">
                                        {formatNumber(ghgSummary.scope1)}
                                        <span className="text-lg ml-1">tCO₂e</span>
                                    </h3>
                                    <p className={`${themeClasses.textSecondary} mb-2`}>Scope 1: Direct Emissions</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">
                                            {scopeBreakdown.scope1.percentage_of_total.toFixed(1)}% of total
                                        </span>
                                        <span className={`text-xs px-2 py-1 rounded-full`} style={{
                                            backgroundColor: `${scope1Color}20`,
                                            color: scope1Color
                                        }}>
                                            Direct
                                        </span>
                                    </div>
                                </div>

                                {/* Scope 2 Emissions */}
                                <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 transition-all duration-300 hover:border-[${scope2Color}] shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <div
                                            className="p-3 rounded-xl"
                                            style={{
                                                background: `linear-gradient(to right, ${scope2Color}30, ${scope2Color}20)`,
                                                border: `1px solid ${scope2Color}40`
                                            }}
                                        >
                                            <Zap className="w-6 h-6" style={{ color: scope2Color }} />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {getTrendIcon(scopeBreakdown.scope2.trend)}
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-bold mb-2">
                                        {formatNumber(ghgSummary.scope2)}
                                        <span className="text-lg ml-1">tCO₂e</span>
                                    </h3>
                                    <p className={`${themeClasses.textSecondary} mb-2`}>Scope 2: Indirect Energy</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">
                                            {scopeBreakdown.scope2.percentage_of_total.toFixed(1)}% of total
                                        </span>
                                        <span className={`text-xs px-2 py-1 rounded-full`} style={{
                                            backgroundColor: `${scope2Color}20`,
                                            color: scope2Color
                                        }}>
                                            Energy
                                        </span>
                                    </div>
                                </div>

                                {/* Scope 3 Emissions */}
                                <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 transition-all duration-300 hover:border-[${scope3Color}] shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <div
                                            className="p-3 rounded-xl"
                                            style={{
                                                background: `linear-gradient(to right, ${scope3Color}30, ${scope3Color}20)`,
                                                border: `1px solid ${scope3Color}40`
                                            }}
                                        >
                                            <Wind className="w-6 h-6" style={{ color: scope3Color }} />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {getTrendIcon(scopeBreakdown.scope3.trend)}
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-bold mb-2">
                                        {formatNumber(ghgSummary.scope3)}
                                        <span className="text-lg ml-1">tCO₂e</span>
                                    </h3>
                                    <p className={`${themeClasses.textSecondary} mb-2`}>Scope 3: Value Chain</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">
                                            {scopeBreakdown.scope3.percentage_of_total.toFixed(1)}% of total
                                        </span>
                                        <span className={`text-xs px-2 py-1 rounded-full`} style={{
                                            backgroundColor: `${scope3Color}20`,
                                            color: scope3Color
                                        }}>
                                            Value Chain
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Map and Scope Composition - Same layout as CropYieldScreen */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                                {/* Map Card - Same as CropYieldScreen */}
                                <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="p-2 rounded-lg"
                                                style={{
                                                    background: `linear-gradient(to right, ${logoGreen}30, ${logoGreen}20)`,
                                                    border: `1px solid ${logoGreen}40`
                                                }}
                                            >
                                                <MapPin className="w-5 h-5" style={{ color: logoGreen }} />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold">Production Area</h3>
                                                <p className={`text-sm ${themeClasses.textMuted}`}>{areaName}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setActiveTab("location")}
                                            className="p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
                                            style={{ color: logoGreen }}
                                        >
                                            <Maximize2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="h-64 rounded-lg overflow-hidden border border-gray-700">
                                        <MapDisplay />
                                    </div>
                                    <div className="mt-4 grid grid-cols-2 gap-4">
                                        <div>
                                            <p className={`text-xs ${themeClasses.textMuted}`}>Area Covered</p>
                                            <p className="font-medium">{areaCovered}</p>
                                        </div>
                                        <div>
                                            <p className={`text-xs ${themeClasses.textMuted}`}>Coordinates</p>
                                            <p className="font-medium">{coordinates.length} points</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Scope Composition Chart */}
                                <div className="lg:col-span-2">
                                    <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                        <div className="flex items-center justify-between mb-6">
                                            <div>
                                                <h3 className="text-lg font-semibold">GHG Emissions by Scope</h3>
                                                <p className={`text-sm ${themeClasses.textMuted}`}>Breakdown of emissions by scope</p>
                                            </div>
                                            <PieChart className="w-5 h-5" style={{ color: logoGreen }} />
                                        </div>
                                        <div className="h-64">
                                            {graphs && graphs.scope_composition ? (
                                                <Doughnut
                                                    data={{
                                                        labels: graphs.scope_composition.labels,
                                                        datasets: graphs.scope_composition.datasets.map((dataset, index) => ({
                                                            ...dataset,
                                                            backgroundColor: chartColors.background.slice(0, 3), // Use same colors as CropYieldScreen
                                                            borderColor: chartColors.border.slice(0, 3), // Use same colors as CropYieldScreen
                                                            borderWidth: 2,
                                                        }))
                                                    }}
                                                    options={{
                                                        responsive: true,
                                                        maintainAspectRatio: false,
                                                        plugins: {
                                                            legend: {
                                                                position: 'top' as const,
                                                                labels: {
                                                                    color: themeClasses.chartText,
                                                                    padding: 20,
                                                                    font: {
                                                                        size: 12
                                                                    }
                                                                }
                                                            },
                                                        },
                                                    }}
                                                />
                                            ) : (
                                                <div className="h-full flex items-center justify-center">
                                                    <p className={themeClasses.textMuted}>No scope composition data available</p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="mt-4 grid grid-cols-3 gap-2">
                                            <div className="text-center">
                                                <div className="text-sm font-medium" style={{ color: scope1Color }}>
                                                    {ghgSummary.scope1.toLocaleString()}
                                                </div>
                                                <div className="text-xs text-gray-500">Scope 1</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-sm font-medium" style={{ color: scope2Color }}>
                                                    {ghgSummary.scope2.toLocaleString()}
                                                </div>
                                                <div className="text-xs text-gray-500">Scope 2</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-sm font-medium" style={{ color: scope3Color }}>
                                                    {ghgSummary.scope3.toLocaleString()}
                                                </div>
                                                <div className="text-xs text-gray-500">Scope 3</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Emissions Trend Chart - Full width */}
                            <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 mb-8 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-lg font-semibold">Emissions Trends</h3>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>Historical emissions trends by scope</p>
                                    </div>
                                    <LineChartIcon className="w-5 h-5" style={{ color: logoGreen }} />
                                </div>
                                <div className="h-64">
                                    {graphs && graphs.total_emissions_trend ? (
                                        <Line
                                            data={{
                                                labels: graphs.total_emissions_trend.labels,
                                                datasets: graphs.total_emissions_trend.datasets.map((dataset, index) => ({
                                                    ...dataset,
                                                    borderColor: chartColors.border[index % chartColors.border.length],
                                                    backgroundColor: chartColors.background[index % chartColors.background.length],
                                                    tension: 0.4,
                                                    fill: index === 0, // Only fill the main dataset
                                                }))
                                            }}
                                            options={{
                                                responsive: true,
                                                maintainAspectRatio: false,
                                                plugins: {
                                                    legend: {
                                                        position: 'top' as const,
                                                        labels: {
                                                            color: themeClasses.chartText,
                                                        }
                                                    },
                                                },
                                                scales: {
                                                    x: {
                                                        grid: {
                                                            color: themeClasses.chartGrid,
                                                        },
                                                        ticks: {
                                                            color: themeClasses.chartText,
                                                        }
                                                    },
                                                    y: {
                                                        grid: {
                                                            color: themeClasses.chartGrid,
                                                        },
                                                        ticks: {
                                                            color: themeClasses.chartText,
                                                        },
                                                        title: {
                                                            display: true,
                                                            text: 'tCO₂e',
                                                            color: themeClasses.chartText,
                                                        }
                                                    }
                                                }
                                            }}
                                        />
                                    ) : (
                                        <div className="h-full flex items-center justify-center">
                                            <p className={themeClasses.textMuted}>No emissions trend data available</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Intensity Analysis & Confidence Assessment */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                                {/* Intensity Analysis */}
                                <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h3 className="text-lg font-semibold">Carbon Intensity Analysis</h3>
                                            <p className={`text-sm ${themeClasses.textMuted}`}>Performance compared to industry benchmarks</p>
                                        </div>
                                        <Scale className="w-5 h-5" style={{ color: logoGreen }} />
                                    </div>
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <div className="text-3xl font-bold" style={{ color: getIntensityColor(intensityAnalysis?.performance || '') }}>
                                                {intensityAnalysis?.carbon_intensity ? intensityAnalysis.carbon_intensity.toFixed(2) : 'N/A'}
                                            </div>
                                            <p className={`text-sm ${themeClasses.textMuted}`}>tCO₂e / ha</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-lg font-semibold" style={{ color: getIntensityColor(intensityAnalysis?.performance || '') }}>
                                                {intensityAnalysis?.performance || 'N/A'}
                                            </div>
                                            <p className="text-sm text-gray-500">Industry: {intensityAnalysis?.benchmark || 'N/A'} tCO₂e/ha</p>
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <div className="flex justify-between text-sm mb-1">
                                            <span>Your Intensity</span>
                                            <span>{intensityAnalysis?.carbon_intensity?.toFixed(2) || '0.00'}</span>
                                        </div>
                                        <div className="w-full h-4 bg-gray-700/30 rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full"
                                                style={{
                                                    width: `${Math.min((intensityAnalysis?.carbon_intensity || 0) / (intensityAnalysis?.benchmark || 100) * 100, 100)}%`,
                                                    background: `linear-gradient(to right, ${getIntensityColor(intensityAnalysis?.performance || '')}, ${getIntensityColor(intensityAnalysis?.performance || '')}80)`,
                                                }}
                                            ></div>
                                        </div>
                                        <div className="flex justify-between text-sm mt-1">
                                            <span>0</span>
                                            <span>Industry: {intensityAnalysis?.benchmark || 'N/A'}</span>
                                            <span>{(intensityAnalysis?.benchmark || 0) * 2}</span>
                                        </div>
                                    </div>
                                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/20' : 'bg-gray-100'}`}>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>
                                            Trend: <span style={{ color: intensityAnalysis?.trend === 'improving' ? logoGreen : '#FF6B6B' }}>
                                                {intensityAnalysis?.trend || 'stable'}
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                {/* Confidence Assessment */}
                                <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h3 className="text-lg font-semibold">Confidence Assessment</h3>
                                            <p className={`text-sm ${themeClasses.textMuted}`}>Data quality and reliability assessment</p>
                                        </div>
                                        <div className={`text-xl font-bold ${getConfidenceColor(confidenceAssessment?.overall_score || 0)}`}>
                                            {confidenceAssessment?.overall_score ? confidenceAssessment.overall_score.toFixed(0) : 'N/A'}
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        {confidenceAssessment && [
                                            { key: 'data_completeness', label: 'Data Completeness' },
                                            { key: 'methodological_rigor', label: 'Methodological Rigor' },
                                            { key: 'verification_status', label: 'Verification Status' },
                                            { key: 'temporal_coverage', label: 'Temporal Coverage' }
                                        ].map(({ key, label }) => (
                                            <div key={key} className="flex items-center justify-between">
                                                <span className={`text-sm ${themeClasses.textSecondary}`}>
                                                    {label}
                                                </span>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-32 h-2 rounded-full bg-gray-700/30">
                                                        <div
                                                            className="h-full rounded-full"
                                                            style={{
                                                                width: `${confidenceAssessment[key as keyof typeof confidenceAssessment] || 0}%`,
                                                                background: `linear-gradient(to right, ${logoGreen}, ${logoYellow})`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-sm font-medium w-10">
                                                        {typeof confidenceAssessment[key as keyof typeof confidenceAssessment] === 'number'
                                                            ? `${(confidenceAssessment[key as keyof typeof confidenceAssessment] as number).toFixed(0)}%`
                                                            : 'N/A'}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-6 p-4 rounded-lg bg-gray-700/20">
                                        <p className={`text-sm ${themeClasses.textMuted}`}>
                                            {confidenceAssessment?.interpretation || 'No interpretation available'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Reduction Targets */}
                            {reductionTargets && currentPerformance && (
                                <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 mb-8 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h3 className="text-lg font-semibold">Reduction Targets</h3>
                                            <p className={`text-sm ${themeClasses.textMuted}`}>Performance against emission reduction targets</p>
                                        </div>
                                        <TargetIcon className="w-5 h-5" style={{ color: logoGreen }} />
                                    </div>

                                    {/* Current Performance */}
                                    <div className="mb-8">
                                        <h4 className="font-semibold mb-4">Current Performance</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                                            <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                                <div className="text-xl font-bold mb-2">
                                                    {currentPerformance.baseline_year}
                                                </div>
                                                <p className={`text-sm ${themeClasses.textMuted}`}>Baseline Year</p>
                                            </div>
                                            <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                                <div className="text-xl font-bold mb-2" style={{ color: currentPerformance.reduction_achieved > 0 ? logoGreen : '#FF6B6B' }}>
                                                    {currentPerformance.reduction_achieved > 0 ? '↓' : '↑'} {Math.abs(currentPerformance.reduction_achieved).toFixed(1)}%
                                                </div>
                                                <p className={`text-sm ${themeClasses.textMuted}`}>Reduction Achieved</p>
                                            </div>
                                            <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                                <div className="text-xl font-bold mb-2">
                                                    {currentPerformance.annual_reduction_rate.toFixed(1)}%
                                                </div>
                                                <p className={`text-sm ${themeClasses.textMuted}`}>Annual Reduction Rate</p>
                                            </div>
                                            <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                                <div className={`text-xl font-bold mb-2 ${reductionTargets.alignment.paris_agreement.toLowerCase().includes('aligned') ? `text-[${logoGreen}]` : 'text-red-500'}`}>
                                                    {reductionTargets.alignment.paris_agreement.split(' ')[0]}
                                                </div>
                                                <p className={`text-sm ${themeClasses.textMuted}`}>Paris Agreement</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Future Targets */}
                                    {futureTargets.length > 0 && (
                                        <div>
                                            <h4 className="font-semibold mb-4">Future Targets</h4>
                                            <div className="space-y-4">
                                                {futureTargets.slice(0, 3).map((target, index) => (
                                                    <div key={index} className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                                        <div className="flex items-center justify-between mb-3">
                                                            <div className="flex items-center gap-3">
                                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${index === 0 ? `bg-[${logoGreen}]/20 text-[${logoGreen}]` : 'bg-gray-700/20 text-gray-400'}`}>
                                                                    {target.target_year}
                                                                </div>
                                                                <div>
                                                                    <h5 className="font-medium">Target for {target.target_year}</h5>
                                                                    <p className="text-sm text-gray-500">{target.years_to_target} years remaining</p>
                                                                </div>
                                                            </div>
                                                            <div className="text-right">
                                                                <div className="text-lg font-bold">{target.target_value.toLocaleString()} tCO₂e</div>
                                                                <div className={`text-sm ${target.current_progress >= 0 ? `text-[${logoGreen}]` : 'text-red-500'}`}>
                                                                    {target.current_progress >= 0 ? '+' : ''}{target.current_progress.toFixed(1)}% progress
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center justify-between text-sm">
                                                            <span>Required annual reduction: {target.required_annual_reduction.toLocaleString()} tCO₂e</span>
                                                            <span className={`px-2 py-1 rounded-full text-xs ${target.alignment.paris_agreement.toLowerCase().includes('aligned') ? `bg-[${logoGreen}]/20 text-[${logoGreen}]` : 'bg-red-500/20 text-red-500'}`}>
                                                                {target.alignment.paris_agreement}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Summary */}
                            {summary && (
                                <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h3 className="text-lg font-semibold">Executive Summary</h3>
                                            <p className={`text-sm ${themeClasses.textMuted}`}>Key insights and next steps</p>
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${summary.outlook.toLowerCase().includes('positive') ? `bg-[${logoGreen}]/20 text-[${logoGreen}]` : summary.outlook.toLowerCase().includes('neutral') ? 'bg-yellow-500/20 text-yellow-500' : 'bg-red-500/20 text-red-500'}`}>
                                            {summary.outlook}
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="font-semibold mb-2">Overall Assessment</h4>
                                            <p className={`${themeClasses.textMuted}`}>{summary.overall_assessment}</p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                                    <Award className="w-4 h-4" style={{ color: logoGreen }} />
                                                    Key Achievements
                                                </h4>
                                                <ul className="space-y-1">
                                                    {summary.key_achievements.slice(0, 3).map((achievement, index) => (
                                                        <li key={index} className="flex items-start gap-2">
                                                            <CheckCircle className="w-3 h-3 mt-1 flex-shrink-0" style={{ color: logoGreen }} />
                                                            <span className={`text-sm ${themeClasses.textMuted}`}>{achievement}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div>
                                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                                    <AlertOctagon className="w-4 h-4" style={{ color: '#FF6B6B' }} />
                                                    Critical Areas
                                                </h4>
                                                <ul className="space-y-1">
                                                    {summary.critical_areas.slice(0, 3).map((area, index) => (
                                                        <li key={index} className="flex items-start gap-2">
                                                            <AlertCircle className="w-3 h-3 mt-1 flex-shrink-0 text-red-500" />
                                                            <span className={`text-sm ${themeClasses.textMuted}`}>{area}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        {summary.next_steps && summary.next_steps.length > 0 && (
                                            <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                                <h4 className="font-semibold mb-2">Next Steps</h4>
                                                <ul className="space-y-2">
                                                    {summary.next_steps.map((step, index) => (
                                                        <li key={index} className="flex items-start gap-2">
                                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${index === 0 ? `bg-[${logoGreen}]/20 text-[${logoGreen}]` : 'bg-gray-700/20 text-gray-400'}`}>
                                                                {index + 1}
                                                            </div>
                                                            <span className={`text-sm ${themeClasses.textMuted}`}>{step}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {/* Scope 1 Tab */}
                    {activeTab === "scope1" && scopeBreakdown && scope1Sources.length > 0 && (
                        <div className="space-y-8">
                            {/* Scope 1 Overview */}
                            <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-lg font-semibold">Scope 1: Direct Emissions</h3>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>{scopeBreakdown.scope1.definition}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="text-2xl font-bold" style={{ color: scope1Color }}>
                                            {formatNumber(scopeBreakdown.scope1.current_year)}
                                        </div>
                                        <span className="text-sm">tCO₂e</span>
                                    </div>
                                </div>

                                {/* Key Metrics */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                    <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                        <div className="text-lg font-bold mb-2" style={{ color: scope1Color }}>
                                            {scopeBreakdown.scope1.percentage_of_total.toFixed(1)}%
                                        </div>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>of Total Emissions</p>
                                    </div>
                                    <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                        <div className="flex items-center gap-2">
                                            {getTrendIcon(scopeBreakdown.scope1.trend)}
                                            <span className="text-lg font-bold">{scopeBreakdown.scope1.trend}</span>
                                        </div>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>Trend</p>
                                    </div>
                                    <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                        <div className="text-lg font-bold mb-2">{scope1Sources.length}</div>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>Emission Sources</p>
                                    </div>
                                </div>

                                {/* Examples */}
                                <div className="mb-6">
                                    <h4 className="font-semibold mb-3">Examples</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {scopeBreakdown.scope1.examples.map((example, index) => (
                                            <span key={index} className="px-3 py-1 rounded-full text-sm" style={{
                                                backgroundColor: `${scope1Color}20`,
                                                color: scope1Color
                                            }}>
                                                {example}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Detailed Sources */}
                                <div>
                                    <h4 className="font-semibold mb-4">Detailed Sources</h4>
                                    <div className="space-y-4">
                                        {scope1Sources.map((source: DetailedSource, index) => (
                                            <div key={index} className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                                <div className="flex items-center justify-between mb-3">
                                                    <h5 className="font-medium">{source.source}</h5>
                                                    <div className="text-lg font-bold" style={{ color: scope1Color }}>
                                                        {formatNumber(source.total_tco2e)} tCO₂e
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                                                    <div>
                                                        <p className={`text-xs ${themeClasses.textMuted}`}>Parameter</p>
                                                        <p className="text-sm font-medium">{source.parameter}</p>
                                                    </div>
                                                    <div>
                                                        <p className={`text-xs ${themeClasses.textMuted}`}>Annual per ha</p>
                                                        <p className="text-sm font-medium">{source.annual_per_ha} {source.unit}</p>
                                                    </div>
                                                    <div>
                                                        <p className={`text-xs ${themeClasses.textMuted}`}>Emission Factor</p>
                                                        <p className="text-sm font-medium">{source.emission_factor}</p>
                                                    </div>
                                                    <div>
                                                        <p className={`text-xs ${themeClasses.textMuted}`}>Per ha/year</p>
                                                        <p className="text-sm font-medium">{source.tco2e_per_ha_per_year.toFixed(6)} tCO₂e</p>
                                                    </div>
                                                </div>
                                                <div className={`text-xs ${themeClasses.textMuted} italic`}>
                                                    {source.methodological_justification}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Scope 2 Tab */}
                    {activeTab === "scope2" && scopeBreakdown && scope2Sources.length > 0 && (
                        <div className="space-y-8">
                            {/* Scope 2 Overview */}
                            <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-lg font-semibold">Scope 2: Indirect Energy Emissions</h3>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>{scopeBreakdown.scope2.definition}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="text-2xl font-bold" style={{ color: scope2Color }}>
                                            {formatNumber(scopeBreakdown.scope2.current_year)}
                                        </div>
                                        <span className="text-sm">tCO₂e</span>
                                    </div>
                                </div>

                                {/* Key Metrics */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                    <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                        <div className="text-lg font-bold mb-2" style={{ color: scope2Color }}>
                                            {scopeBreakdown.scope2.percentage_of_total.toFixed(1)}%
                                        </div>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>of Total Emissions</p>
                                    </div>
                                    <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                        <div className="flex items-center gap-2">
                                            {getTrendIcon(scopeBreakdown.scope2.trend)}
                                            <span className="text-lg font-bold">{scopeBreakdown.scope2.trend}</span>
                                        </div>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>Trend</p>
                                    </div>
                                    <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                        <div className="text-lg font-bold mb-2">{scope2Sources.length}</div>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>Energy Sources</p>
                                    </div>
                                </div>

                                {/* Examples */}
                                <div className="mb-6">
                                    <h4 className="font-semibold mb-3">Examples</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {scopeBreakdown.scope2.examples.map((example, index) => (
                                            <span key={index} className="px-3 py-1 rounded-full text-sm" style={{
                                                backgroundColor: `${scope2Color}20`,
                                                color: scope2Color
                                            }}>
                                                {example}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Detailed Sources */}
                                <div>
                                    <h4 className="font-semibold mb-4">Detailed Sources</h4>
                                    <div className="space-y-4">
                                        {scope2Sources.map((source: DetailedSource, index) => (
                                            <div key={index} className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                                <div className="flex items-center justify-between mb-3">
                                                    <h5 className="font-medium">{source.source}</h5>
                                                    <div className="text-lg font-bold" style={{ color: scope2Color }}>
                                                        {formatNumber(source.total_tco2e)} tCO₂e
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                                                    <div>
                                                        <p className={`text-xs ${themeClasses.textMuted}`}>Parameter</p>
                                                        <p className="text-sm font-medium">{source.parameter}</p>
                                                    </div>
                                                    <div>
                                                        <p className={`text-xs ${themeClasses.textMuted}`}>Annual Activity</p>
                                                        <p className="text-sm font-medium">{source.annual_activity_per_ha} {source.unit}</p>
                                                    </div>
                                                    <div>
                                                        <p className={`text-xs ${themeClasses.textMuted}`}>Emission Factor</p>
                                                        <p className="text-sm font-medium">{source.ef_number} kg CO₂e/{source.unit.split('/')[0]}</p>
                                                    </div>
                                                    <div>
                                                        <p className={`text-xs ${themeClasses.textMuted}`}>Per ha/year</p>
                                                        <p className="text-sm font-medium">{source.tco2e_per_ha_per_year.toFixed(3)} tCO₂e</p>
                                                    </div>
                                                </div>
                                                <div className={`text-xs ${themeClasses.textMuted} italic`}>
                                                    {source.methodological_justification}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Scope 3 Tab */}
                    {activeTab === "scope3" && scopeBreakdown && scope3Categories.length > 0 && (
                        <div className="space-y-8">
                            {/* Scope 3 Overview */}
                            <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-lg font-semibold">Scope 3: Value Chain Emissions</h3>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>{scopeBreakdown.scope3.definition}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="text-2xl font-bold" style={{ color: scope3Color }}>
                                            {formatNumber(scopeBreakdown.scope3.current_year)}
                                        </div>
                                        <span className="text-sm">tCO₂e</span>
                                    </div>
                                </div>

                                {/* Key Metrics */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                    <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                        <div className="text-lg font-bold mb-2" style={{ color: scope3Color }}>
                                            {scopeBreakdown.scope3.percentage_of_total.toFixed(1)}%
                                        </div>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>of Total Emissions</p>
                                    </div>
                                    <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                        <div className="flex items-center gap-2">
                                            {getTrendIcon(scopeBreakdown.scope3.trend)}
                                            <span className="text-lg font-bold">{scopeBreakdown.scope3.trend}</span>
                                        </div>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>Trend</p>
                                    </div>
                                    <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                        <div className="text-lg font-bold mb-2">{scope3Categories.length}</div>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>Categories</p>
                                    </div>
                                </div>

                                {/* Examples */}
                                <div className="mb-6">
                                    <h4 className="font-semibold mb-3">Examples</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {scopeBreakdown.scope3.examples.map((example, index) => (
                                            <span key={index} className="px-3 py-1 rounded-full text-sm" style={{
                                                backgroundColor: `${scope3Color}20`,
                                                color: scope3Color
                                            }}>
                                                {example}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Detailed Categories */}
                                <div>
                                    <h4 className="font-semibold mb-4">Detailed Categories</h4>
                                    <div className="space-y-4">
                                        {scope3Categories.map((category: DetailedSource, index) => (
                                            <div key={index} className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                                <div className="flex items-center justify-between mb-3">
                                                    <div>
                                                        <h5 className="font-medium">{category.source}</h5>
                                                        <p className="text-sm text-gray-500">{category.parameter}</p>
                                                    </div>
                                                    <div className="text-lg font-bold" style={{ color: scope3Color }}>
                                                        {formatNumber(category.total_tco2e)} tCO₂e
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                                                    <div>
                                                        <p className={`text-xs ${themeClasses.textMuted}`}>Annual Activity</p>
                                                        <p className="text-sm font-medium">{category.annual_activity_per_ha} {category.unit}</p>
                                                    </div>
                                                    <div>
                                                        <p className={`text-xs ${themeClasses.textMuted}`}>Emission Factor</p>
                                                        <p className="text-sm font-medium">{category.ef_number} kg CO₂e/{category.unit.split('/')[0]}</p>
                                                    </div>
                                                    <div>
                                                        <p className={`text-xs ${themeClasses.textMuted}`}>Per ha/year</p>
                                                        <p className="text-sm font-medium">{category.tco2e_per_ha_per_year.toFixed(3)} tCO₂e</p>
                                                    </div>
                                                </div>
                                                <div className={`text-xs ${themeClasses.textMuted} italic`}>
                                                    {category.methodological_justification}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Targets Tab */}
                    {activeTab === "targets" && reductionTargets && (
                        <div className="space-y-8">
                            {/* Targets Overview */}
                            <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-lg font-semibold">Emission Reduction Targets</h3>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>Science-based targets and alignment</p>
                                    </div>
                                    <TargetIcon className="w-5 h-5" style={{ color: logoGreen }} />
                                </div>

                                {/* Current Performance */}
                                {currentPerformance && (
                                    <div className="mb-8">
                                        <h4 className="font-semibold mb-4">Current Performance</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                                            <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                                <div className="text-2xl font-bold mb-2">{currentPerformance.baseline_year}</div>
                                                <p className={`text-sm ${themeClasses.textMuted}`}>Baseline Year</p>
                                            </div>
                                            <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                                <div className="text-2xl font-bold mb-2" style={{ color: currentPerformance.reduction_achieved > 0 ? logoGreen : '#FF6B6B' }}>
                                                    {currentPerformance.reduction_achieved > 0 ? '↓' : '↑'} {Math.abs(currentPerformance.reduction_achieved).toFixed(1)}%
                                                </div>
                                                <p className={`text-sm ${themeClasses.textMuted}`}>Reduction Achieved</p>
                                            </div>
                                            <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                                <div className="text-2xl font-bold mb-2">{formatNumber(currentPerformance.current_emissions)}</div>
                                                <p className={`text-sm ${themeClasses.textMuted}`}>Current Emissions (tCO₂e)</p>
                                            </div>
                                            <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                                <div className="text-2xl font-bold mb-2">{currentPerformance.annual_reduction_rate.toFixed(1)}%</div>
                                                <p className={`text-sm ${themeClasses.textMuted}`}>Annual Reduction Rate</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Future Targets */}
                                {futureTargets.length > 0 && (
                                    <div>
                                        <h4 className="font-semibold mb-4">Future Targets</h4>
                                        <div className="space-y-6">
                                            {futureTargets.map((target, index) => (
                                                <div key={index} className={`p-6 rounded-xl border ${themeClasses.border}`}>
                                                    <div className="flex items-center justify-between mb-4">
                                                        <div className="flex items-center gap-4">
                                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${target.years_to_target <= 0 ? `bg-[${logoGreen}]/20 text-[${logoGreen}]` : 'bg-gray-700/20 text-gray-400'}`}>
                                                                {target.target_year}
                                                            </div>
                                                            <div>
                                                                <h5 className="text-lg font-semibold">Target for {target.target_year}</h5>
                                                                <p className="text-sm text-gray-500">
                                                                    {target.years_to_target > 0 ? `${target.years_to_target} years remaining` : 'Target year passed'}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-2xl font-bold">{target.target_value.toLocaleString()} tCO₂e</div>
                                                            <div className={`text-sm ${target.current_progress >= 0 ? `text-[${logoGreen}]` : 'text-red-500'}`}>
                                                                {target.current_progress >= 0 ? '+' : ''}{target.current_progress.toFixed(1)}% progress
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Progress Bar */}
                                                    <div className="mt-4">
                                                        <div className="flex justify-between text-sm mb-1">
                                                            <span>Progress</span>
                                                            <span>{Math.max(0, Math.min(100, target.current_progress))}%</span>
                                                        </div>
                                                        <div className="w-full h-3 bg-gray-700/30 rounded-full overflow-hidden">
                                                            <div
                                                                className="h-full rounded-full"
                                                                style={{
                                                                    width: `${Math.max(0, Math.min(100, target.current_progress))}%`,
                                                                    background: `linear-gradient(to right, ${logoGreen}, ${logoGreen}80)`,
                                                                }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Location Tab - Same as CropYieldScreen */}
                    {activeTab === "location" && (
                        <div className="space-y-8">
                            {/* Map Card */}
                            <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-lg font-semibold">Production Area</h3>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>{areaName} • {areaCovered}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setMapZoom(mapZoom + 1)}
                                            className="p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
                                            style={{ color: logoGreen }}
                                        >
                                            <Maximize2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => setMapZoom(mapZoom - 1)}
                                            className="p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
                                            style={{ color: logoGreen }}
                                        >
                                            <Minimize2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => setShowFullMap(!showFullMap)}
                                            className="p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
                                            style={{ color: logoGreen }}
                                        >
                                            {showFullMap ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                <div className={`${showFullMap ? 'h-[600px]' : 'h-96'} rounded-lg overflow-hidden border ${themeClasses.border}`}>
                                    <MapDisplay />
                                </div>

                                {/* Coordinates Table */}
                                {coordinates.length > 0 && (
                                    <div className="mt-6">
                                        <h4 className="font-semibold mb-4">Coordinates</h4>
                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className={`border-b ${themeClasses.border}`}>
                                                        <th className="py-2 px-3 text-left font-medium">#</th>
                                                        <th className="py-2 px-3 text-left font-medium">Latitude</th>
                                                        <th className="py-2 px-3 text-left font-medium">Longitude</th>
                                                        <th className="py-2 px-3 text-left font-medium">ID</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {coordinates.slice(0, 10).map((coord: any, index: number) => (
                                                        <tr key={index} className={`border-b ${themeClasses.border}`}>
                                                            <td className="py-2 px-3">{index + 1}</td>
                                                            <td className="py-2 px-3">{coord.lat.toFixed(6)}</td>
                                                            <td className="py-2 px-3">{coord.lon.toFixed(6)}</td>
                                                            <td className="py-2 px-3">{coord._id || 'N/A'}</td>
                                                        </tr>
                                                    ))}
                                                    {coordinates.length > 10 && (
                                                        <tr>
                                                            <td colSpan={4} className="py-2 px-3 text-center text-sm text-gray-500">
                                                                ... and {coordinates.length - 10} more coordinates
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}

                                {/* Location Details */}
                                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                        <p className={`text-xs ${themeClasses.textMuted}`}>Total Points</p>
                                        <p className="text-lg font-semibold">{coordinates.length}</p>
                                    </div>
                                    <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                        <p className={`text-xs ${themeClasses.textMuted}`}>Area Name</p>
                                        <p className="text-lg font-semibold">{areaName}</p>
                                    </div>
                                    <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                        <p className={`text-xs ${themeClasses.textMuted}`}>Area Covered</p>
                                        <p className="text-lg font-semibold">{areaCovered}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Metadata Footer */}
                    {metadata && (
                        <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 mt-8 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-sm font-semibold" style={{ color: logoGreen }}>
                                    Data Source Information
                                </h4>
                                <Database className="w-4 h-4" style={{ color: logoGreen }} />
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                    <p className={`text-xs ${themeClasses.textMuted}`}>API Version</p>
                                    <p className="text-sm font-medium">{metadata.api_version}</p>
                                </div>
                                <div>
                                    <p className={`text-xs ${themeClasses.textMuted}`}>Generated</p>
                                    <p className="text-sm font-medium">{new Date(metadata.generated_at).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className={`text-xs ${themeClasses.textMuted}`}>Data Sources</p>
                                    <p className="text-sm font-medium">{metadata.data_sources.length}</p>
                                </div>
                                <div>
                                    <p className={`text-xs ${themeClasses.textMuted}`}>Calculation Methods</p>
                                    <p className="text-sm font-medium">{metadata.calculation_methods.length}</p>
                                </div>
                            </div>
                            {companyInfo && (
                                <div className="mt-4 pt-4 border-t border-gray-700">
                                    <p className={`text-xs ${themeClasses.textMuted}`}>Company</p>
                                    <p className="text-sm font-medium">{companyInfo.name} • {companyInfo.industry} • {companyInfo.country}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default GhgEmissionScreen;