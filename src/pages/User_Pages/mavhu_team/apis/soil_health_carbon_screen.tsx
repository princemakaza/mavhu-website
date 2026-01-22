import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, Filler } from 'chart.js';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Sidebar from "../../../../components/Sidebar";
import {
    TrendingUp,
    TrendingDown,
    Leaf,
    Thermometer,
    Shield,
    CheckCircle,
    AlertCircle,
    MapPin,
    Calendar,
    Download,
    RefreshCw,
    ChevronLeft,
    Activity,
    Database,
    Cpu,
    Target,
    LineChart,
    Moon,
    Sun,
    Building,
    ArrowRight,
    Map,
    Wind,
    Maximize2,
    Minimize2,
    Factory,
    Trees,

    Award,
    AlertTriangle,
    Users,
    Shield as ShieldIcon,
    FileText,
    Globe,
} from "lucide-react";
import {
    getSoilHealthCarbonData,
    getSoilHealthSummary,
    getEnvironmentalMetricsSummary,
    getRegenerativeAgricultureOutcomes,
    getRecommendations,
    getAllGraphData,
    getConfidenceScoreBreakdown,
    getDataQualityAssessment,
    getMetadata,
    getAvailableSoilHealthYears,
    getCarbonDataYears,
    getESGDataYears,
    getSoilOrganicCarbonDetails,
    getCarbonPermanenceDetails,
    getSoilHealthTrends,
    getCarbonStockAnalysisDetails,
    getVegetationHealthDetails,
    getAllESGMetricsSummary,
    getCarbonEmissionDetails,
    getCarbonCreditPredictions,
    getSoilDegradationMonitoring,
    getCarbonCreditReadiness,
    getCompanyDetails,
    getReportingPeriodDetails,
    getDashboardIndicators,
    getEmissionFactorsByCategory,
    getYearlyDataComparison,
    getMetricsTrendAnalysis,

    type SoilHealthCarbonResponse,
    type SoilHealthCarbonParams,
} from "../../../../../src/services/soil_health_service";
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
    Filler
);

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
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

const SoilHealthCarbonEmissionScreen = () => {
    const { companyId: paramCompanyId } = useParams<{ companyId: string }>();
    const location = useLocation();
    const navigate = useNavigate();

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [soilHealthData, setSoilHealthData] = useState<SoilHealthCarbonResponse | null>(null);
    const [companies, setCompanies] = useState<Company[]>([]);
    const [selectedCompanyId, setSelectedCompanyId] = useState<string>(paramCompanyId || "");
    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const [availableYears, setAvailableYears] = useState<number[]>([]);
    const [carbonYears, setCarbonYears] = useState<number[]>([]);
    const [esgYears, setEsgYears] = useState<number[]>([]);
    const [showCompanySelector, setShowCompanySelector] = useState(!paramCompanyId);
    const [activeTab, setActiveTab] = useState("overview");
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [mapZoom, setMapZoom] = useState(10);
    const [mapCenter, setMapCenter] = useState<[number, number]>([0, 0]);
    const [showFullMap, setShowFullMap] = useState(false);
    const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

    // Color scheme
    const logoGreen = isDarkMode ? "#00FF00" : "#008000";
    const logoYellow = isDarkMode ? "#FFD700" : "#B8860B";
    const accentBlue = isDarkMode ? "#3B82F6" : "#1D4ED8";
    const accentPurple = isDarkMode ? "#8B5CF6" : "#7C3AED";
    const accentRed = isDarkMode ? "#EF4444" : "#DC2626";
    const accentTeal = isDarkMode ? "#14B8A6" : "#0D9488";

    // Theme classes
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

    // Chart colors
    const chartColors = {
        primary: logoGreen,
        secondary: logoYellow,
        tertiary: accentBlue,
        quaternary: accentPurple,
        success: logoGreen,
        warning: logoYellow,
        danger: accentRed,
        info: accentTeal,
        background: isDarkMode ? [
            'rgba(0, 255, 0, 0.3)',
            'rgba(255, 215, 0, 0.3)',
            'rgba(59, 130, 246, 0.3)',
            'rgba(139, 92, 246, 0.3)',
            'rgba(239, 68, 68, 0.3)',
            'rgba(20, 184, 166, 0.3)',
        ] : [
            'rgba(0, 128, 0, 0.2)',
            'rgba(184, 134, 11, 0.2)',
            'rgba(59, 130, 246, 0.2)',
            'rgba(139, 92, 246, 0.2)',
            'rgba(239, 68, 68, 0.2)',
            'rgba(20, 184, 166, 0.2)',
        ],
        border: isDarkMode ? [
            logoGreen,
            logoYellow,
            accentBlue,
            accentPurple,
            accentRed,
            accentTeal,
        ] : [
            '#008000',
            '#B8860B',
            '#1D4ED8',
            '#7C3AED',
            '#DC2626',
            '#0D9488',
        ],
    };

    // Apply dark mode
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    // Fetch companies
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

    // Fetch soil health data
    const fetchSoilHealthData = async () => {
        if (!selectedCompanyId) return;

        try {
            setLoading(true);
            setError(null);
            const params: SoilHealthCarbonParams = {
                companyId: selectedCompanyId,
            };

            if (selectedYear !== null) {
                params.year = selectedYear;
            }

            const data = await getSoilHealthCarbonData(params);
            setSoilHealthData(data);

            // Extract years
            const years = getAvailableSoilHealthYears(data);
            const carbonDataYears = getCarbonDataYears(data);
            const esgDataYears = getESGDataYears(data);

            const sortedYears = [...years].sort((a, b) => b - a);
            const sortedCarbonYears = [...carbonDataYears].sort((a, b) => b - a);
            const sortedEsgYears = [...esgDataYears].sort((a, b) => b - a);

            setAvailableYears(sortedYears);
            setCarbonYears(sortedCarbonYears);
            setEsgYears(sortedEsgYears);

            // Set map center
            if (data.data.company.area_of_interest_metadata?.coordinates?.length > 0) {
                const coords = data.data.company.area_of_interest_metadata.coordinates;
                if (coords.length === 1) {
                    setMapCenter([coords[0].lat, coords[0].lon]);
                } else {
                    const avgLat = coords.reduce((sum, c) => sum + c.lat, 0) / coords.length;
                    const avgLon = coords.reduce((sum, c) => sum + c.lon, 0) / coords.length;
                    setMapCenter([avgLat, avgLon]);
                }
            }
        } catch (err: any) {
            setError(err.message || "Failed to fetch soil health data");
            console.error("Error fetching soil health data:", err);
        } finally {
            setLoading(false);
            setIsRefreshing(false);
        }
    };

    const handleRefresh = () => {
        setIsRefreshing(true);
        fetchSoilHealthData();
    };

    const handleCompanyChange = (companyId: string) => {
        setSelectedCompanyId(companyId);
        setShowCompanySelector(false);
        navigate(`/portal/esg-dashboard/soil-health-carbon/${companyId}`);
    };

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
            fetchSoilHealthData();
        }
    }, [selectedCompanyId, selectedYear]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const navigateBack = () => {
        navigate("/company-management");
    };

    // Get selected company
    const selectedCompany = companies.find(c => c._id === selectedCompanyId);

    // Get data using helper functions
    const summaryData = soilHealthData ? getSoilHealthSummary(soilHealthData) : null;
    const soilOrganicCarbonDetails = soilHealthData ? getSoilOrganicCarbonDetails(soilHealthData) : null;
    const carbonPermanenceDetails = soilHealthData ? getCarbonPermanenceDetails(soilHealthData) : null;
    const soilHealthTrends = soilHealthData ? getSoilHealthTrends(soilHealthData) : null;
    const carbonStockAnalysisDetails = soilHealthData ? getCarbonStockAnalysisDetails(soilHealthData) : null;
    const vegetationHealthDetails = soilHealthData ? getVegetationHealthDetails(soilHealthData) : null;
    const environmentalMetrics = soilHealthData ? getEnvironmentalMetricsSummary(soilHealthData) : null;
    const allEsgMetrics = soilHealthData ? getAllESGMetricsSummary(soilHealthData) : null;
    const carbonEmissionDetails = soilHealthData ? getCarbonEmissionDetails(soilHealthData) : null;
    const regenerativeOutcomes = soilHealthData ? getRegenerativeAgricultureOutcomes(soilHealthData) : null;
    const carbonCreditPredictions = soilHealthData ? getCarbonCreditPredictions(soilHealthData) : null;
    const soilDegradationMonitoring = soilHealthData ? getSoilDegradationMonitoring(soilHealthData) : null;
    const recommendations = soilHealthData ? getRecommendations(soilHealthData) : null;
    const dataQuality = soilHealthData ? getDataQualityAssessment(soilHealthData) : null;
    const carbonCreditReadiness = soilHealthData ? getCarbonCreditReadiness(soilHealthData) : null;
    const confidenceScore = soilHealthData ? getConfidenceScoreBreakdown(soilHealthData) : null;
    const metadata = soilHealthData ? getMetadata(soilHealthData) : null;
    const companyDetails = soilHealthData ? getCompanyDetails(soilHealthData) : null;
    const reportingPeriodDetails = soilHealthData ? getReportingPeriodDetails(soilHealthData) : null;
    const dashboardIndicators = soilHealthData ? getDashboardIndicators(soilHealthData) : null;
    const emissionFactors = soilHealthData ? getEmissionFactorsByCategory(soilHealthData) : null;
    const yearlyComparison = soilHealthData ? getYearlyDataComparison(soilHealthData) : null;
    const metricsTrendAnalysis = soilHealthData ? getMetricsTrendAnalysis(soilHealthData) : null;
    const graphs = soilHealthData ? getAllGraphData(soilHealthData) : null;

    // Get coordinates for map
    const coordinates = soilHealthData?.data.company.area_of_interest_metadata?.coordinates || [];
    const areaName = soilHealthData?.data.company.area_of_interest_metadata?.name || "Project Area";
    const areaCovered = soilHealthData?.data.company.area_of_interest_metadata?.area_covered || "N/A";

    // Custom icon
    const customIcon = new L.Icon({
        iconUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${logoGreen}"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null
    });

    // Format helpers
    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('en-US').format(num);
    };

    const formatPercentage = (num: number) => {
        return `${num.toFixed(1)}%`;
    };

    const formatCurrency = (num: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(num);
    };

    // Get trend icon
    const getTrendIcon = (trend: string) => {
        if (trend.toLowerCase().includes('improving') || trend.toLowerCase().includes('increase') || trend.toLowerCase().includes('positive')) {
            return <TrendingUp className="w-4 h-4" style={{ color: logoGreen }} />;
        } else if (trend.toLowerCase().includes('declining') || trend.toLowerCase().includes('decrease') || trend.toLowerCase().includes('negative')) {
            return <TrendingDown className="w-4 h-4" style={{ color: accentRed }} />;
        } else {
            return <TrendingUp className="w-4 h-4" style={{ color: logoYellow }} />;
        }
    };

    // Get confidence color
    const getConfidenceColor = (score: number) => {
        if (score >= 80) return logoGreen;
        if (score >= 60) return logoYellow;
        return accentRed;
    };

    // Map Component
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
                        positions={coordinates.map(coord => [coord.lat, coord.lon])}
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
                    isDarkMode={isDarkMode}
                    onDarkModeToggle={toggleDarkMode}
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

                        {/* Map and Charts Row Skeleton */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                            <SkeletonCard className="h-80" />
                            <div className="lg:col-span-2">
                                <SkeletonCard className="h-80" />
                            </div>
                        </div>

                        {/* Confidence Score & Data Quality Skeleton */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            <SkeletonCard className="h-96" />
                            <SkeletonCard className="h-96" />
                        </div>

                        {/* Regenerative Agriculture Skeleton */}
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
                    isDarkMode={isDarkMode}
                    onDarkModeToggle={toggleDarkMode}
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
                                        Choose a company to view soil health and carbon data
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
                                    {companies.map((company) => (
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
                                                <Building className="w-6 h-6" style={{ color: logoGreen }} />
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
                isDarkMode={isDarkMode}
                onDarkModeToggle={toggleDarkMode}
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
                                    Soil Health & Carbon Dashboard
                                </h1>
                                <p className={`text-sm ${themeClasses.textSecondary}`}>
                                    {selectedCompany?.name || "Company Data"} • {selectedYear === null ? "All Years" : selectedYear}
                                    {metadata && (
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
                                        {availableYears.map((year) => (
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
                        {[
                            "overview",
                            "carbon",
                            "emissions",
                            "vegetation",
                            "esg",
                            "credits",
                            "location",
                            "reports",
                            "analytics"
                        ].map((tab) => (
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
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
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
                    {activeTab === "overview" && soilHealthData && (
                        <>
                            {/* Key Metrics Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                {/* Soil Organic Carbon Quantification */}
                                <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 transition-all duration-300 hover:border-[${logoGreen}] shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <div
                                            className="p-3 rounded-xl"
                                            style={{
                                                background: `linear-gradient(to right, ${logoGreen}30, ${logoGreen}20)`,
                                                border: `1px solid ${logoGreen}40`
                                            }}
                                        >
                                            <Leaf className="w-6 h-6" style={{ color: logoGreen }} />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {getTrendIcon(soilHealthData.data.soil_organic_carbon_quantification.trend)}
                                            <span className="text-sm" style={{ color: getConfidenceColor(soilHealthData.data.confidence_score.overall) }}>
                                                {formatPercentage(soilHealthData.data.confidence_score.overall)}
                                            </span>
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-bold mb-2">
                                        {soilHealthData.data.soil_organic_carbon_quantification.current_value.toFixed(2)}
                                        <span className="text-lg ml-1">{soilHealthData.data.soil_organic_carbon_quantification.unit}</span>
                                    </h3>
                                    <p className={`${themeClasses.textSecondary} mb-2`}>Soil Organic Carbon</p>
                                    <div className="flex items-center justify-between">
                                        <span className={`text-sm ${soilHealthData.data.soil_organic_carbon_quantification.trend.includes('improving') ? `text-[${logoGreen}]` : 'text-red-500'}`}>
                                            {soilHealthData.data.soil_organic_carbon_quantification.trend}
                                        </span>
                                        <span className="text-xs px-2 py-1 rounded-full" style={{
                                            background: getConfidenceColor(soilHealthData.data.confidence_score.overall) + '20',
                                            color: getConfidenceColor(soilHealthData.data.confidence_score.overall)
                                        }}>
                                            {soilHealthData.data.confidence_score.interpretation}
                                        </span>
                                    </div>
                                </div>

                                {/* Carbon Stock Analysis */}
                                <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 transition-all duration-300 hover:border-[${logoYellow}] shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <div
                                            className="p-3 rounded-xl"
                                            style={{
                                                background: `linear-gradient(to right, ${logoYellow}30, ${logoYellow}20)`,
                                                border: `1px solid ${logoYellow}40`
                                            }}
                                        >
                                            <Thermometer className="w-6 h-6" style={{ color: logoYellow }} />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {getTrendIcon(soilHealthData.data.carbon_stock_analysis.trend)}
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-bold mb-2">
                                        {formatNumber(soilHealthData.data.carbon_stock_analysis.total_carbon_stock)}
                                        <span className="text-lg ml-1">{soilHealthData.data.carbon_stock_analysis.unit}</span>
                                    </h3>
                                    <p className={`${themeClasses.textSecondary} mb-2`}>Total Carbon Stock</p>
                                    <div className="flex items-center justify-between">
                                        <span className={`text-sm ${soilHealthData.data.carbon_stock_analysis.trend.includes('improving') ? `text-[${logoGreen}]` : 'text-red-500'}`}>
                                            {soilHealthData.data.carbon_stock_analysis.trend}
                                        </span>
                                        <span className="text-sm" style={{ color: logoYellow }}>
                                            {soilHealthData.data.carbon_stock_analysis.sequestration_rate.toFixed(2)} {soilHealthData.data.carbon_stock_analysis.sequestration_unit}
                                        </span>
                                    </div>
                                </div>

                                {/* Carbon Permanence Assessment */}
                                <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 transition-all duration-300 hover:border-[${accentBlue}] shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <div
                                            className="p-3 rounded-xl"
                                            style={{
                                                background: `linear-gradient(to right, ${accentBlue}30, ${accentBlue}20)`,
                                                border: `1px solid ${accentBlue}40`
                                            }}
                                        >
                                            <Shield className="w-6 h-6" style={{ color: accentBlue }} />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm" style={{
                                                color: soilHealthData.data.carbon_permanence_assessment.permanence_rating === "high" ? logoGreen :
                                                    soilHealthData.data.carbon_permanence_assessment.permanence_rating === "medium" ? logoYellow : accentRed
                                            }}>
                                                {soilHealthData.data.carbon_permanence_assessment.permanence_rating}
                                            </span>
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-bold mb-2" style={{
                                        color: soilHealthData.data.carbon_permanence_assessment.permanence_score ?
                                            soilHealthData.data.carbon_permanence_assessment.permanence_score >= 70 ? logoGreen :
                                                soilHealthData.data.carbon_permanence_assessment.permanence_score >= 50 ? logoYellow : accentRed
                                            : themeClasses.text
                                    }}>
                                        {soilHealthData.data.carbon_permanence_assessment.permanence_score || "N/A"}
                                        <span className="text-lg ml-1">/100</span>
                                    </h3>
                                    <p className={`${themeClasses.textSecondary} mb-2`}>Carbon Permanence Score</p>
                                    <div className="flex items-center justify-between">
                                        <span className={`text-sm ${soilHealthData.data.carbon_permanence_assessment.risk_level === "low" ? `text-[${logoGreen}]` :
                                            soilHealthData.data.carbon_permanence_assessment.risk_level === "medium" ? 'text-yellow-500' : 'text-red-500'}`}>
                                            {soilHealthData.data.carbon_permanence_assessment.risk_level} risk
                                        </span>
                                        <span className="text-xs px-2 py-1 rounded-full" style={{
                                            background: soilHealthData.data.carbon_permanence_assessment.risk_level === "low" ? `${logoGreen}20` :
                                                soilHealthData.data.carbon_permanence_assessment.risk_level === "medium" ? `${logoYellow}20` : `${accentRed}20`,
                                            color: soilHealthData.data.carbon_permanence_assessment.risk_level === "low" ? logoGreen :
                                                soilHealthData.data.carbon_permanence_assessment.risk_level === "medium" ? logoYellow : accentRed
                                        }}>
                                            {soilHealthData.data.carbon_permanence_assessment.trend}
                                        </span>
                                    </div>
                                </div>

                                {/* Vegetation Health */}
                                <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 transition-all duration-300 hover:border-[${accentPurple}] shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <div
                                            className="p-3 rounded-xl"
                                            style={{
                                                background: `linear-gradient(to right, ${accentPurple}30, ${accentPurple}20)`,
                                                border: `1px solid ${accentPurple}40`
                                            }}
                                        >
                                            <Wind className="w-6 h-6" style={{ color: accentPurple }} />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {getTrendIcon(soilHealthData.data.vegetation_health.ndvi_trend)}
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-bold mb-2">
                                        {soilHealthData.data.vegetation_health.average_ndvi.toFixed(3)}
                                    </h3>
                                    <p className={`${themeClasses.textSecondary} mb-2`}>Average NDVI</p>
                                    <div className="flex items-center justify-between">
                                        <span className={`text-sm ${soilHealthData.data.vegetation_health.ndvi_trend.includes('improving') ? `text-[${logoGreen}]` : 'text-red-500'}`}>
                                            {soilHealthData.data.vegetation_health.ndvi_trend}
                                        </span>
                                        <span className="text-sm">
                                            {soilHealthData.data.vegetation_health.classification}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Map and Charts Row */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                                {/* Map Card */}
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
                                                <h3 className="text-lg font-semibold">Project Location</h3>
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

                                {/* SOC Trend Chart */}
                                <div className="lg:col-span-2">
                                    <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                        <div className="flex items-center justify-between mb-6">
                                            <div>
                                                <h3 className="text-lg font-semibold">{graphs?.soc_trend?.title || "Soil Organic Carbon Trend"}</h3>
                                                <p className={`text-sm ${themeClasses.textMuted}`}>{graphs?.soc_trend?.description || "Historical SOC values over time"}</p>
                                            </div>
                                            <LineChart className="w-5 h-5" style={{ color: logoGreen }} />
                                        </div>
                                        <div className="h-64">
                                            {graphs && graphs.soc_trend && (
                                                <Line
                                                    data={{
                                                        labels: graphs.soc_trend.labels,
                                                        datasets: graphs.soc_trend.datasets.map((dataset, index) => ({
                                                            ...dataset,
                                                            borderColor: chartColors.border[index % chartColors.border.length],
                                                            backgroundColor: chartColors.background[index % chartColors.background.length],
                                                            tension: 0.4,
                                                            fill: true,
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
                                                                }
                                                            }
                                                        }
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Soil Health Trends & Carbon Permanence */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                                {/* Soil Health Trends */}
                                <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h3 className="text-lg font-semibold">Soil Health Trends</h3>
                                            <p className={`text-sm ${themeClasses.textMuted}`}>Multi-indicator trend analysis</p>
                                        </div>
                                        <Activity className="w-5 h-5" style={{ color: logoGreen }} />
                                    </div>
                                    <div className="space-y-4">
                                        {soilHealthTrends && soilHealthTrends.trends.map((trend, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-700/30">
                                                <div className="flex items-center gap-3">
                                                    {getTrendIcon(trend.value)}
                                                    <span className={`${themeClasses.textSecondary}`}>{trend.label}</span>
                                                </div>
                                                <span className={`text-sm font-medium ${trend.value.includes('improving') ? `text-[${logoGreen}]` :
                                                        trend.value.includes('declining') ? 'text-red-500' : 'text-yellow-500'
                                                    }`}>
                                                    {trend.value.charAt(0).toUpperCase() + trend.value.slice(1)}
                                                </span>
                                            </div>
                                        ))}
                                        <div className="mt-4 p-4 rounded-lg bg-gray-700/20">
                                            <p className={`text-sm ${themeClasses.textMuted}`}>
                                                <span className="font-medium">Overall Trend:</span> {soilHealthData.data.soil_health_trends.overall_trend}
                                            </p>
                                            <p className={`text-sm ${themeClasses.textMuted} mt-1`}>
                                                <span className="font-medium">Monitoring Period:</span> {soilHealthData.data.soil_health_trends.monitoring_period}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Carbon Permanence Factors */}
                                <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h3 className="text-lg font-semibold">Carbon Permanence Assessment</h3>
                                            <p className={`text-sm ${themeClasses.textMuted}`}>Factors affecting carbon storage stability</p>
                                        </div>
                                        <ShieldIcon className="w-5 h-5" style={{ color: accentBlue }} />
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-medium mb-2">Risk Factors</h4>
                                            <div className="space-y-2">
                                                {soilHealthData.data.carbon_permanence_assessment.factors.map((factor, index) => (
                                                    <div key={index} className="flex items-start gap-2">
                                                        <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: accentRed }} />
                                                        <span className={`text-sm ${themeClasses.textMuted}`}>{factor}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-2">Interpretation</h4>
                                            <p className={`text-sm ${themeClasses.textMuted}`}>
                                                {soilHealthData.data.carbon_permanence_assessment.interpretation}
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-3 rounded-lg border border-gray-700/30">
                                                <p className={`text-xs ${themeClasses.textMuted}`}>Monthly Variance</p>
                                                <p className="text-lg font-semibold">
                                                    {soilHealthData.data.carbon_permanence_assessment.variance?.toFixed(2) || "N/A"}
                                                </p>
                                            </div>
                                            <div className="p-3 rounded-lg border border-gray-700/30">
                                                <p className={`text-xs ${themeClasses.textMuted}`}>Trend</p>
                                                <p className={`text-lg font-semibold ${soilHealthData.data.carbon_permanence_assessment.trend.includes('improving') ? `text-[${logoGreen}]` :
                                                        soilHealthData.data.carbon_permanence_assessment.trend.includes('declining') ? 'text-red-500' : 'text-yellow-500'
                                                    }`}>
                                                    {soilHealthData.data.carbon_permanence_assessment.trend}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Confidence Score & Data Quality */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                                {/* Confidence Score Breakdown */}
                                <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h3 className="text-lg font-semibold">Confidence Score</h3>
                                            <p className={`text-sm ${themeClasses.textMuted}`}>Data reliability assessment</p>
                                        </div>
                                        <div className="text-lg font-bold" style={{ color: getConfidenceColor(confidenceScore?.overall || 0) }}>
                                            {confidenceScore?.overall ? formatPercentage(confidenceScore.overall) : 'N/A'}
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        {confidenceScore && confidenceScore.breakdown.map((item, index) => (
                                            <div key={index} className="flex items-center justify-between">
                                                <span className={`text-sm ${themeClasses.textSecondary}`}>
                                                    {item.label}
                                                </span>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-32 h-2 rounded-full bg-gray-700/30">
                                                        <div
                                                            className="h-full rounded-full"
                                                            style={{
                                                                width: `${item.value}%`,
                                                                background: `linear-gradient(to right, ${logoGreen}, ${logoYellow})`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-sm font-medium w-10">{item.value}%</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-6 p-4 rounded-lg bg-gray-700/20">
                                        <p className={`text-sm ${themeClasses.textMuted}`}>
                                            {confidenceScore?.interpretation || 'No interpretation available'}
                                        </p>
                                    </div>
                                </div>

                                {/* Data Quality Assessment */}
                                <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h3 className="text-lg font-semibold">Data Quality Assessment</h3>
                                            <p className={`text-sm ${themeClasses.textMuted}`}>Assessment of data completeness and reliability</p>
                                        </div>
                                        <Database className="w-5 h-5" style={{ color: logoGreen }} />
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className={`text-sm ${themeClasses.textSecondary}`}>Confidence Level</span>
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${dataQuality?.confidence_level === 'High' ? `bg-[${logoGreen}]/20 text-[${logoGreen}]` :
                                                    dataQuality?.confidence_level === 'Medium' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-red-500/20 text-red-500'
                                                }`}>
                                                {dataQuality?.confidence_level || 'N/A'}
                                            </span>
                                        </div>

                                        {dataQuality?.hasGaps && (
                                            <div>
                                                <h4 className="text-sm font-semibold mb-2">Gaps Identified</h4>
                                                <ul className="space-y-2">
                                                    {dataQuality?.gaps_identified?.map((gap, index) => (
                                                        <li key={index} className="flex items-start gap-2">
                                                            <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                                                            <span className={`text-sm ${themeClasses.textMuted}`}>{gap}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {dataQuality?.hasImprovementSuggestions && (
                                            <div>
                                                <h4 className="text-sm font-semibold mb-2">Improvement Suggestions</h4>
                                                <ul className="space-y-2">
                                                    {dataQuality?.improvement_suggestions?.map((suggestion, index) => (
                                                        <li key={index} className="flex items-start gap-2">
                                                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                            <span className={`text-sm ${themeClasses.textMuted}`}>{suggestion}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Regenerative Agriculture Outcomes */}
                            {regenerativeOutcomes && (
                                <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 mb-8 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h3 className="text-lg font-semibold">Regenerative Agriculture Outcomes</h3>
                                            <p className={`text-sm ${themeClasses.textMuted}`}>Soil health and carbon sequestration potential</p>
                                        </div>
                                        <Trees className="w-5 h-5" style={{ color: logoGreen }} />
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                        <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                            <div className="text-2xl font-bold mb-2" style={{ color: logoGreen }}>
                                                {regenerativeOutcomes.soilHealthScoreFormatted || "N/A"}
                                            </div>
                                            <p className={`text-sm ${themeClasses.textMuted}`}>Soil Health Score</p>
                                        </div>
                                        <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                            <div className="text-2xl font-bold mb-2" style={{ color: logoGreen }}>
                                                {regenerativeOutcomes.sequestrationPotentialFormatted || "0"}
                                            </div>
                                            <p className={`text-sm ${themeClasses.textMuted}`}>Carbon Sequestration Potential</p>
                                        </div>
                                        <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                            <div className="text-2xl font-bold mb-2" style={{ color: logoGreen }}>
                                                {regenerativeOutcomes.permanenceScoreFormatted || "N/A"}
                                            </div>
                                            <p className={`text-sm ${themeClasses.textMuted}`}>Permanence Score</p>
                                        </div>
                                        <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                            <div className="text-2xl font-bold mb-2" style={{ color: logoGreen }}>
                                                {regenerativeOutcomes.vegetationHealthScoreFormatted || "N/A"}
                                            </div>
                                            <p className={`text-sm ${themeClasses.textMuted}`}>Vegetation Health Score</p>
                                        </div>
                                    </div>

                                    <div className={`p-4 rounded-xl border ${themeClasses.border} bg-gradient-to-r ${isDarkMode ? `from-[${logoGreen}]/20 to-[${logoYellow}]/20` : `from-[${logoGreen}]/10 to-[${logoYellow}]/10`}`}>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="font-semibold mb-1">Verification Status</h4>
                                                <p className={`text-sm ${themeClasses.textMuted}`}>Data verification and reliability</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-bold" style={{ color: logoGreen }}>
                                                    {regenerativeOutcomes.verification_status}
                                                </div>
                                                <p className={`text-sm ${themeClasses.textMuted}`}>
                                                    {soilHealthData.data.carbon_emission_accounting.yearly_data_summary.some(y =>
                                                        y.data_quality.verification_status === "verified"
                                                    ) ? "Third-party verified data available" : "Unverified data"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Recommendations */}
                            {recommendations && recommendations.length > 0 && (
                                <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h3 className="text-lg font-semibold">Recommendations</h3>
                                            <p className={`text-sm ${themeClasses.textMuted}`}>Actions to improve soil health and carbon management</p>
                                        </div>
                                        <Target className="w-5 h-5" style={{ color: logoYellow }} />
                                    </div>

                                    <div className="space-y-4">
                                        {recommendations.map((rec, index) => (
                                            <div key={index} className={`p-4 rounded-xl border ${themeClasses.border} ${themeClasses.hoverBg}`}>
                                                <div className="flex items-start justify-between mb-2">
                                                    <h4 className="font-semibold">{rec.category}</h4>
                                                    <span className={`px-2 py-1 rounded-full text-xs ${rec.priorityColor === 'error' ? 'bg-red-500/20 text-red-500' :
                                                        rec.priorityColor === 'warning' ? 'bg-yellow-500/20 text-yellow-500' : `bg-[${logoGreen}]/20 text-[${logoGreen}]`}`}>
                                                        {rec.priority} priority
                                                    </span>
                                                </div>
                                                <ul className="space-y-1 mb-3">
                                                    {rec.actions.map((action, idx) => (
                                                        <li key={idx} className="flex items-start gap-2">
                                                            <ArrowRight className="w-3 h-3 mt-1 flex-shrink-0" style={{ color: logoGreen }} />
                                                            <span className={`text-sm ${themeClasses.textMuted}`}>{action}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <p className={`text-sm ${themeClasses.textSecondary}`}>
                                                    <span className="font-medium">Expected Impact:</span> {rec.expected_impact}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {/* Carbon Tab */}
                    {activeTab === "carbon" && soilHealthData && (
                        <div className="space-y-8">
                            {/* Carbon Stock Analysis */}
                            <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-lg font-semibold">Carbon Stock Analysis</h3>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>Detailed carbon storage and sequestration data</p>
                                    </div>
                                    <Leaf className="w-5 h-5" style={{ color: logoGreen }} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                    <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                        <div className="text-2xl font-bold mb-2" style={{ color: logoGreen }}>
                                            {formatNumber(carbonStockAnalysisDetails?.total_carbon_stock || 0)}
                                        </div>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>Total Carbon Stock (tCO₂/ha)</p>
                                    </div>
                                    <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                        <div className="text-2xl font-bold mb-2" style={{ color: accentBlue }}>
                                            {carbonStockAnalysisDetails?.sequestrationRateFormatted || "0"}
                                        </div>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>Sequestration Rate (tCO₂/ha/year)</p>
                                    </div>
                                    <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                        <div className="text-2xl font-bold mb-2" style={{ color: accentPurple }}>
                                            {carbonStockAnalysisDetails?.annualSequestrationTotalFormatted || "0"}
                                        </div>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>Annual Sequestration Total (tCO₂)</p>
                                    </div>
                                    <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                        <div className="text-2xl font-bold mb-2" style={{
                                            color: carbonStockAnalysisDetails?.net_balance && carbonStockAnalysisDetails.net_balance >= 0 ? logoGreen : accentRed
                                        }}>
                                            {carbonStockAnalysisDetails?.netBalanceFormatted || "0"}
                                        </div>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>Net Carbon Balance (tCO₂)</p>
                                    </div>
                                </div>

                                {/* Carbon Balance Chart */}
                                <div className="mb-6">
                                    <h4 className="font-semibold mb-4">Carbon Balance Analysis</h4>
                                    <div className="h-64">
                                        {graphs && graphs.carbon_balance && (
                                            <Bar
                                                data={{
                                                    labels: graphs.carbon_balance.labels,
                                                    datasets: graphs.carbon_balance.datasets.map((dataset, index) => ({
                                                        ...dataset,
                                                        backgroundColor: chartColors.background[index % chartColors.background.length],
                                                        borderColor: chartColors.border[index % chartColors.border.length],
                                                        borderWidth: 1,
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
                                                            }
                                                        }
                                                    }
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>

                                {/* Yearly Carbon Data Comparison */}
                                {yearlyComparison && yearlyComparison.length > 0 && (
                                    <div>
                                        <h4 className="font-semibold mb-4">Yearly Carbon Data Comparison</h4>
                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className={`border-b ${themeClasses.border}`}>
                                                        <th className="py-3 px-4 text-left font-semibold">Year</th>
                                                        <th className="py-3 px-4 text-left font-semibold">Sequestration (tCO₂)</th>
                                                        <th className="py-3 px-4 text-left font-semibold">Emissions (tCO₂e)</th>
                                                        <th className="py-3 px-4 text-left font-semibold">Net Balance (tCO₂)</th>
                                                        <th className="py-3 px-4 text-left font-semibold">SOC (tC/ha)</th>
                                                        <th className="py-3 px-4 text-left font-semibold">Verification</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {yearlyComparison.map((yearData, index) => (
                                                        <tr key={index} className={`border-b ${themeClasses.border} ${themeClasses.hoverBg}`}>
                                                            <td className="py-3 px-4 font-medium">{yearData.year}</td>
                                                            <td className="py-3 px-4" style={{ color: yearData.sequestration >= 0 ? logoGreen : accentRed }}>
                                                                {formatNumber(yearData.sequestration)}
                                                            </td>
                                                            <td className="py-3 px-4" style={{ color: accentRed }}>
                                                                {formatNumber(yearData.emissions)}
                                                            </td>
                                                            <td className="py-3 px-4 font-medium" style={{
                                                                color: yearData.netBalance >= 0 ? logoGreen : accentRed
                                                            }}>
                                                                {formatNumber(yearData.netBalance)}
                                                            </td>
                                                            <td className="py-3 px-4">{yearData.soc?.toFixed(2) || "N/A"}</td>
                                                            <td className="py-3 px-4">
                                                                <span className={`text-xs px-2 py-1 rounded-full ${yearData.verificationStatus === 'verified' ? `bg-[${logoGreen}]/20 text-[${logoGreen}]` :
                                                                        yearData.verificationStatus === 'audited' ? 'bg-blue-500/20 text-blue-500' :
                                                                            'bg-gray-500/20 text-gray-500'
                                                                    }`}>
                                                                    {yearData.verificationStatus || 'unverified'}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Emissions Tab */}
                    {activeTab === "emissions" && soilHealthData && (
                        <div className="space-y-8">
                            {/* Emissions Overview */}
                            <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-lg font-semibold">Greenhouse Gas Emissions</h3>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>Total emissions breakdown by scope</p>
                                    </div>
                                    <Factory className="w-5 h-5" style={{ color: accentRed }} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                                    <div className={`p-4 rounded-xl border ${themeClasses.border} bg-gradient-to-br ${isDarkMode ? 'from-gray-800/50 to-gray-900/50' : 'from-gray-50 to-gray-100'}`}>
                                        <div className="text-3xl font-bold mb-2" style={{ color: accentRed }}>
                                            {formatNumber(environmentalMetrics?.summary?.totalGHG || 0)}
                                        </div>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>Total GHG Emissions (tCO₂e)</p>
                                    </div>
                                    <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                        <div className="text-2xl font-bold mb-2" style={{ color: chartColors.border[0] }}>
                                            {formatNumber(environmentalMetrics?.summary?.scope1 || 0)}
                                        </div>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>Scope 1 Emissions (tCO₂e)</p>
                                    </div>
                                    <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                        <div className="text-2xl font-bold mb-2" style={{ color: chartColors.border[1] }}>
                                            {formatNumber(environmentalMetrics?.summary?.scope2 || 0)}
                                        </div>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>Scope 2 Emissions (tCO₂e)</p>
                                    </div>
                                    <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                        <div className="text-2xl font-bold mb-2" style={{ color: chartColors.border[2] }}>
                                            {formatNumber(environmentalMetrics?.summary?.scope3 || 0)}
                                        </div>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>Scope 3 Emissions (tCO₂e)</p>
                                    </div>
                                </div>

                                {/* Emissions Breakdown Chart */}
                                <div className="h-80 mb-6">
                                    {graphs && graphs.emissions_breakdown && (
                                        <Doughnut
                                            data={{
                                                labels: graphs.emissions_breakdown.labels,
                                                datasets: graphs.emissions_breakdown.datasets.map((dataset, index) => ({
                                                    ...dataset,
                                                    backgroundColor: chartColors.background.slice(0, 3),
                                                    borderColor: chartColors.border.slice(0, 3),
                                                    borderWidth: 2,
                                                }))
                                            }}
                                            options={{
                                                responsive: true,
                                                maintainAspectRatio: false,
                                                plugins: {
                                                    legend: {
                                                        position: 'right' as const,
                                                        labels: {
                                                            color: themeClasses.chartText,
                                                            padding: 20
                                                        }
                                                    },
                                                },
                                            }}
                                        />
                                    )}
                                </div>

                                {/* Emission Factors */}
                                {emissionFactors && emissionFactors.count > 0 && (
                                    <div>
                                        <h4 className="font-semibold mb-4">Emission Factors</h4>
                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className={`border-b ${themeClasses.border}`}>
                                                        <th className="py-3 px-4 text-left font-semibold">Source</th>
                                                        <th className="py-3 px-4 text-left font-semibold">Emission Factor</th>
                                                        <th className="py-3 px-4 text-left font-semibold">Unit</th>
                                                        <th className="py-3 px-4 text-left font-semibold">GWP</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {emissionFactors.all.slice(0, 5).map((factor, index) => (
                                                        <tr key={index} className={`border-b ${themeClasses.border} ${themeClasses.hoverBg}`}>
                                                            <td className="py-3 px-4">{factor.source}</td>
                                                            <td className="py-3 px-4">{factor.emission_factor_value}</td>
                                                            <td className="py-3 px-4">{factor.emission_factor_unit}</td>
                                                            <td className="py-3 px-4">{factor.gwp_value} ({factor.gwp_source})</td>
                                                        </tr>
                                                    ))}
                                                    {emissionFactors.count > 5 && (
                                                        <tr>
                                                            <td colSpan={4} className="py-3 px-4 text-center text-sm text-gray-500">
                                                                ... and {emissionFactors.count - 5} more emission factors
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Vegetation Tab */}
                    {activeTab === "vegetation" && soilHealthData && (
                        <div className="space-y-8">
                            {/* Vegetation Health Analysis */}
                            <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-lg font-semibold">Vegetation Health Analysis</h3>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>NDVI trends and vegetation indicators</p>
                                    </div>
                                    <Wind className="w-5 h-5" style={{ color: logoGreen }} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                    <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                        <div className="text-2xl font-bold mb-2" style={{ color: logoGreen }}>
                                            {vegetationHealthDetails?.averageNdviFormatted || "0"}
                                        </div>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>Average NDVI</p>
                                    </div>
                                    <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                        <div className="text-2xl font-bold mb-2" style={{
                                            color: vegetationHealthDetails?.ndviQuality === "Excellent" ? logoGreen :
                                                vegetationHealthDetails?.ndviQuality === "Good" ? logoYellow : accentRed
                                        }}>
                                            {vegetationHealthDetails?.ndviQuality || "Unknown"}
                                        </div>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>Health Classification</p>
                                    </div>
                                    <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                        <div className="text-2xl font-bold mb-2" style={{ color: accentPurple }}>
                                            {vegetationHealthDetails?.monthly_data_available ? "Available" : "Not Available"}
                                        </div>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>Monthly Data</p>
                                    </div>
                                </div>

                                {/* NDVI Trend Chart */}
                                <div className="h-80">
                                    {graphs && graphs.ndvi_trend && (
                                        <Line
                                            data={{
                                                labels: graphs.ndvi_trend.labels,
                                                datasets: graphs.ndvi_trend.datasets.map((dataset, index) => ({
                                                    ...dataset,
                                                    borderColor: chartColors.border[index % chartColors.border.length],
                                                    backgroundColor: chartColors.background[index % chartColors.background.length],
                                                    tension: 0.4,
                                                    fill: true,
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
                                                        min: 0,
                                                        max: 1,
                                                    }
                                                }
                                            }}
                                        />
                                    )}
                                </div>

                                {/* Interpretation */}
                                <div className="mt-6 p-4 rounded-lg bg-gray-700/20">
                                    <p className={`text-sm ${themeClasses.textMuted}`}>
                                        <span className="font-medium">Interpretation:</span> {vegetationHealthDetails?.interpretation || "No interpretation available"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ESG Metrics Tab */}
                    {activeTab === "esg" && soilHealthData && (
                        <div className="space-y-8">
                            {/* ESG Metrics Overview */}
                            <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-lg font-semibold">ESG Metrics Overview</h3>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>Environmental, Social, and Governance metrics</p>
                                    </div>
                                    <Globe className="w-5 h-5" style={{ color: logoGreen }} />
                                </div>

                                {/* ESG Metrics Summary */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                    <div className={`p-6 rounded-xl border ${themeClasses.border} bg-gradient-to-br ${isDarkMode ? 'from-green-900/20 to-green-800/10' : 'from-green-50 to-green-100'}`}>
                                        <div className="flex items-center gap-3 mb-4">
                                            <Leaf className="w-8 h-8" style={{ color: logoGreen }} />
                                            <div>
                                                <div className="text-3xl font-bold">{allEsgMetrics?.environmental.count || 0}</div>
                                                <p className={`text-sm ${themeClasses.textMuted}`}>Environmental Metrics</p>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-sm">Climate Change</span>
                                                <span className="text-sm font-medium">{environmentalMetrics?.metricsByCategory?.climate_change || 0}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm">Resource Use</span>
                                                <span className="text-sm font-medium">{environmentalMetrics?.metricsByCategory?.resource_use || 0}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm">Biodiversity</span>
                                                <span className="text-sm font-medium">{environmentalMetrics?.metricsByCategory?.biodiversity || 0}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`p-6 rounded-xl border ${themeClasses.border} bg-gradient-to-br ${isDarkMode ? 'from-blue-900/20 to-blue-800/10' : 'from-blue-50 to-blue-100'}`}>
                                        <div className="flex items-center gap-3 mb-4">
                                            <Users className="w-8 h-8" style={{ color: accentBlue }} />
                                            <div>
                                                <div className="text-3xl font-bold">{allEsgMetrics?.social.count || 0}</div>
                                                <p className={`text-sm ${themeClasses.textMuted}`}>Social Metrics</p>
                                            </div>
                                        </div>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>Human capital, diversity, welfare, training, and safety metrics</p>
                                    </div>

                                    <div className={`p-6 rounded-xl border ${themeClasses.border} bg-gradient-to-br ${isDarkMode ? 'from-purple-900/20 to-purple-800/10' : 'from-purple-50 to-purple-100'}`}>
                                        <div className="flex items-center gap-3 mb-4">
                                            <Shield className="w-8 h-8" style={{ color: accentPurple }} />
                                            <div>
                                                <div className="text-3xl font-bold">{allEsgMetrics?.governance.count || 0}</div>
                                                <p className={`text-sm ${themeClasses.textMuted}`}>Governance Metrics</p>
                                            </div>
                                        </div>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>Board structure, ethics, compliance, and stakeholder engagement</p>
                                    </div>
                                </div>

                                {/* Environmental Metrics Table */}
                                <div>
                                    <h4 className="font-semibold mb-4">Detailed Environmental Metrics</h4>
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className={`border-b ${themeClasses.border}`}>
                                                    <th className="py-3 px-4 text-left font-semibold">Metric</th>
                                                    <th className="py-3 px-4 text-left font-semibold">Current Value</th>
                                                    <th className="py-3 px-4 text-left font-semibold">Unit</th>
                                                    <th className="py-3 px-4 text-left font-semibold">Trend</th>
                                                    <th className="py-3 px-4 text-left font-semibold">Years Available</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {environmentalMetrics?.detailedMetrics.slice(0, 10).map((metric, index) => (
                                                    <tr key={index} className={`border-b ${themeClasses.border} ${themeClasses.hoverBg}`}>
                                                        <td className="py-3 px-4">
                                                            <div className="font-medium">{metric.name}</div>
                                                            <div className={`text-xs ${themeClasses.textMuted}`}>{metric.description}</div>
                                                        </td>
                                                        <td className="py-3 px-4 font-medium">{metric.currentValueFormatted}</td>
                                                        <td className="py-3 px-4">{metric.unit}</td>
                                                        <td className="py-3 px-4">
                                                            <div className="flex items-center gap-2">
                                                                {getTrendIcon(metric.trend)}
                                                                <span className={`text-sm ${metric.trendColor === 'success' ? `text-[${logoGreen}]` :
                                                                    metric.trendColor === 'error' ? 'text-red-500' : 'text-yellow-500'}`}>
                                                                    {metric.trend}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="py-3 px-4">
                                                            <div className="flex flex-wrap gap-1">
                                                                {metric.years_available.slice(-3).map(year => (
                                                                    <span key={year} className="text-xs px-2 py-1 rounded bg-gray-500/20">
                                                                        {year}
                                                                    </span>
                                                                ))}
                                                                {metric.years_available.length > 3 && (
                                                                    <span className="text-xs text-gray-500">+{metric.years_available.length - 3}</span>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {environmentalMetrics && environmentalMetrics.totalMetrics > 10 && (
                                                    <tr>
                                                        <td colSpan={5} className="py-3 px-4 text-center text-sm text-gray-500">
                                                            ... and {environmentalMetrics.totalMetrics - 10} more environmental metrics
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Metrics Trend Analysis */}
                                {metricsTrendAnalysis && (
                                    <div className="mt-6">
                                        <h4 className="font-semibold mb-4">Metrics Trend Analysis</h4>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                                <div className="text-2xl font-bold mb-2" style={{ color: logoGreen }}>
                                                    {metricsTrendAnalysis.improving}
                                                </div>
                                                <p className={`text-sm ${themeClasses.textMuted}`}>Improving</p>
                                            </div>
                                            <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                                <div className="text-2xl font-bold mb-2" style={{ color: accentRed }}>
                                                    {metricsTrendAnalysis.declining}
                                                </div>
                                                <p className={`text-sm ${themeClasses.textMuted}`}>Declining</p>
                                            </div>
                                            <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                                <div className="text-2xl font-bold mb-2" style={{ color: logoYellow }}>
                                                    {metricsTrendAnalysis.stable}
                                                </div>
                                                <p className={`text-sm ${themeClasses.textMuted}`}>Stable</p>
                                            </div>
                                            <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                                <div className="text-2xl font-bold mb-2">
                                                    {metricsTrendAnalysis.improvementRate.toFixed(1)}%
                                                </div>
                                                <p className={`text-sm ${themeClasses.textMuted}`}>Improvement Rate</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Carbon Credits Tab */}
                    {activeTab === "credits" && soilHealthData && carbonCreditPredictions && (
                        <div className="space-y-8">
                            {/* Carbon Credit Predictions */}
                            <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-lg font-semibold">Carbon Credit Predictions</h3>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>Future carbon credit potential and revenue</p>
                                    </div>
                                    <Award className="w-5 h-5" style={{ color: logoGreen }} />
                                </div>

                                {/* Eligibility Status */}
                                <div className={`p-6 rounded-xl border ${themeClasses.border} mb-6 ${carbonCreditPredictions.eligibilityStatus.statusColor === 'success' ? 'bg-green-900/20' :
                                        carbonCreditPredictions.eligibilityStatus.statusColor === 'error' ? 'bg-red-900/20' : 'bg-yellow-900/20'
                                    }`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h4 className="font-semibold">Eligibility Status</h4>
                                            <p className={`text-sm ${themeClasses.textMuted}`}>Carbon credit project eligibility assessment</p>
                                        </div>
                                        <div className={`text-lg font-bold ${carbonCreditPredictions.eligible ? `text-[${logoGreen}]` : 'text-red-500'
                                            }`}>
                                            {carbonCreditPredictions.eligible ? "Eligible" : "Not Eligible"}
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className={`text-sm ${themeClasses.textSecondary}`}>Requirements Met</span>
                                            <div className="flex items-center gap-2">
                                                <div className="w-32 h-2 rounded-full bg-gray-700/30">
                                                    <div
                                                        className="h-full rounded-full"
                                                        style={{
                                                            width: `${carbonCreditPredictions.eligibilityStatus.requirementsMetPercent}%`,
                                                            background: `linear-gradient(to right, ${logoGreen}, ${logoYellow})`,
                                                        }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm font-medium">{carbonCreditPredictions.eligibilityStatus.requirementsMetPercent}%</span>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex items-center gap-2">
                                                <CheckCircle className={`w-4 h-4 ${carbonCreditPredictions.eligibility_status.minimum_permanence ? 'text-green-500' : 'text-red-500'
                                                    }`} />
                                                <span className="text-sm">Minimum Permanence</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <CheckCircle className={`w-4 h-4 ${carbonCreditPredictions.eligibility_status.minimum_monitoring ? 'text-green-500' : 'text-red-500'
                                                    }`} />
                                                <span className="text-sm">Minimum Monitoring</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <CheckCircle className={`w-4 h-4 ${carbonCreditPredictions.eligibility_status.verification_status ? 'text-green-500' : 'text-red-500'
                                                    }`} />
                                                <span className="text-sm">Verification Status</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <CheckCircle className={`w-4 h-4 ${carbonCreditPredictions.eligibility_status.positive_sequestration ? 'text-green-500' : 'text-red-500'
                                                    }`} />
                                                <span className="text-sm">Positive Sequestration</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Credit Predictions Summary */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                    <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                        <div className="text-2xl font-bold mb-2" style={{ color: logoGreen }}>
                                            {formatNumber(carbonCreditPredictions.total_potential_credits)}
                                        </div>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>Total Potential Credits</p>
                                    </div>
                                    <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                        <div className="text-2xl font-bold mb-2" style={{ color: logoYellow }}>
                                            {carbonCreditPredictions.totalPotentialValueFormatted}
                                        </div>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>Total Potential Value</p>
                                    </div>
                                    <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                        <div className="text-2xl font-bold mb-2" style={{ color: accentBlue }}>
                                            {carbonCreditPredictions.baselineRateFormatted}
                                        </div>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>Baseline Rate (tCO₂/ha)</p>
                                    </div>
                                </div>

                                {/* Yearly Predictions */}
                                <div>
                                    <h4 className="font-semibold mb-4">Yearly Predictions (5 Years)</h4>
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className={`border-b ${themeClasses.border}`}>
                                                    <th className="py-3 px-4 text-left font-semibold">Year</th>
                                                    <th className="py-3 px-4 text-left font-semibold">Sequestration Rate</th>
                                                    <th className="py-3 px-4 text-left font-semibold">Total Sequestration</th>
                                                    <th className="py-3 px-4 text-left font-semibold">Carbon Credits</th>
                                                    <th className="py-3 px-4 text-left font-semibold">Credit Value</th>
                                                    <th className="py-3 px-4 text-left font-semibold">Confidence</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {carbonCreditPredictions.yearlyPredictions.map((prediction, index) => (
                                                    <tr key={index} className={`border-b ${themeClasses.border} ${themeClasses.hoverBg}`}>
                                                        <td className="py-3 px-4 font-medium">{prediction.year}</td>
                                                        <td className="py-3 px-4">{prediction.sequestrationRateFormatted} tCO₂/ha</td>
                                                        <td className="py-3 px-4">{prediction.totalSequestrationFormatted} tCO₂</td>
                                                        <td className="py-3 px-4" style={{ color: logoGreen }}>{prediction.carbonCreditsFormatted}</td>
                                                        <td className="py-3 px-4" style={{ color: logoYellow }}>{prediction.creditValueFormatted}</td>
                                                        <td className="py-3 px-4">
                                                            <span className={`text-xs px-2 py-1 rounded-full ${prediction.confidenceColor === 'success' ? `bg-[${logoGreen}]/20 text-[${logoGreen}]` :
                                                                    prediction.confidenceColor === 'warning' ? 'bg-yellow-500/20 text-yellow-500' :
                                                                        'bg-red-500/20 text-red-500'
                                                                }`}>
                                                                {prediction.confidence}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Credit Standards */}
                                {carbonCreditPredictions.credit_standards_applicable.length > 0 && (
                                    <div className="mt-6">
                                        <h4 className="font-semibold mb-4">Applicable Credit Standards</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {carbonCreditPredictions.credit_standards_applicable.map((standard, index) => (
                                                <span key={index} className="px-3 py-1 rounded-full text-sm bg-gray-700/30">
                                                    {standard}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Carbon Credit Readiness */}
                                {carbonCreditReadiness && (
                                    <div className="mt-6">
                                        <h4 className="font-semibold mb-4">Carbon Credit Readiness</h4>
                                        <div className="p-4 rounded-xl border border-gray-700/30">
                                            <div className="flex items-center justify-between mb-3">
                                                <div>
                                                    <span className={`text-lg font-bold ${carbonCreditReadiness.statusColor === 'success' ? `text-[${logoGreen}]` : 'text-yellow-500'
                                                        }`}>
                                                        {carbonCreditReadiness.status}
                                                    </span>
                                                    <p className={`text-sm ${themeClasses.textMuted}`}>Project readiness for carbon markets</p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-2xl font-bold" style={{ color: logoGreen }}>
                                                        {carbonCreditReadiness.requirementsMetPercent}%
                                                    </div>
                                                    <p className={`text-sm ${themeClasses.textMuted}`}>Requirements Met</p>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm">Time to Credits</span>
                                                    <span className="text-sm font-medium">{carbonCreditReadiness.time_to_credits}</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm">Estimated Annual Revenue</span>
                                                    <span className="text-sm font-medium" style={{ color: logoYellow }}>
                                                        {carbonCreditReadiness.estimated_annual_revenue}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Location Tab */}
                    {activeTab === "location" && soilHealthData && (
                        <div className="space-y-8">
                            {/* Map Card */}
                            <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-lg font-semibold">Project Location</h3>
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
                                                        <th className="py-3 px-4 text-left font-semibold">#</th>
                                                        <th className="py-3 px-4 text-left font-semibold">Latitude</th>
                                                        <th className="py-3 px-4 text-left font-semibold">Longitude</th>
                                                        <th className="py-3 px-4 text-left font-semibold">ID</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {coordinates.slice(0, 10).map((coord, index) => (
                                                        <tr key={index} className={`border-b ${themeClasses.border} ${themeClasses.hoverBg}`}>
                                                            <td className="py-3 px-4">{index + 1}</td>
                                                            <td className="py-3 px-4">{coord.lat.toFixed(6)}</td>
                                                            <td className="py-3 px-4">{coord.lon.toFixed(6)}</td>
                                                            <td className="py-3 px-4">{coord._id || 'N/A'}</td>
                                                        </tr>
                                                    ))}
                                                    {coordinates.length > 10 && (
                                                        <tr>
                                                            <td colSpan={4} className="py-3 px-4 text-center text-sm text-gray-500">
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
                                        <p className={`text-sm ${themeClasses.textMuted}`}>Total Points</p>
                                        <p className="text-lg font-semibold">{coordinates.length}</p>
                                    </div>
                                    <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>Area Name</p>
                                        <p className="text-lg font-semibold">{areaName}</p>
                                    </div>
                                    <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>Area Covered</p>
                                        <p className="text-lg font-semibold">{areaCovered}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Reports Tab */}
                    {activeTab === "reports" && soilHealthData && (
                        <div className="space-y-8">
                            {/* Data Sources & Methods */}
                            <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                <h3 className="text-lg font-semibold mb-6">Data Sources & Calculation Methods</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className={`p-6 rounded-xl border ${themeClasses.border}`}>
                                        <div className="flex items-center gap-3 mb-4">
                                            <Database className="w-8 h-8" style={{ color: logoGreen }} />
                                            <h4 className="font-semibold">Data Sources</h4>
                                        </div>
                                        <ul className="space-y-2">
                                            {metadata?.data_sources.map((source, index) => (
                                                <li key={index} className="flex items-center gap-2">
                                                    <CheckCircle className="w-4 h-4" style={{ color: logoGreen }} />
                                                    <span className={themeClasses.textSecondary}>{source}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className={`p-6 rounded-xl border ${themeClasses.border}`}>
                                        <div className="flex items-center gap-3 mb-4">
                                            <Cpu className="w-8 h-8" style={{ color: logoYellow }} />
                                            <h4 className="font-semibold">Calculation Methods</h4>
                                        </div>
                                        <ul className="space-y-2">
                                            {metadata?.calculation_methods.map((method, index) => (
                                                <li key={index} className="flex items-center gap-2">
                                                    <CheckCircle className="w-4 h-4" style={{ color: logoGreen }} />
                                                    <span className={themeClasses.textSecondary}>{method}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Framework Details */}
                                {carbonEmissionDetails?.framework && (
                                    <div className="mt-6">
                                        <h4 className="font-semibold mb-4">Methodological Framework</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                                <p className={`text-sm ${themeClasses.textMuted}`}>Sequestration Methodology</p>
                                                <p className="text-sm font-medium">{carbonEmissionDetails.framework.sequestration_methodology}</p>
                                            </div>
                                            <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                                <p className={`text-sm ${themeClasses.textMuted}`}>Emission Methodology</p>
                                                <p className="text-sm font-medium">{carbonEmissionDetails.framework.emission_methodology}</p>
                                            </div>
                                            <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                                <p className={`text-sm ${themeClasses.textMuted}`}>Calculation Approach</p>
                                                <p className="text-sm font-medium">{carbonEmissionDetails.framework.calculation_approach}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Global Warming Potentials */}
                                {carbonEmissionDetails?.globalWarmingPotentials && (
                                    <div className="mt-6">
                                        <h4 className="font-semibold mb-4">Global Warming Potentials (GWP)</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                                <p className={`text-sm ${themeClasses.textMuted}`}>N₂O GWP</p>
                                                <p className="text-lg font-semibold">{carbonEmissionDetails.globalWarmingPotentials.n2o_gwp}</p>
                                                <p className={`text-xs ${themeClasses.textMuted}`}>{carbonEmissionDetails.globalWarmingPotentials.source}</p>
                                            </div>
                                            <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                                <p className={`text-sm ${themeClasses.textMuted}`}>CH₄ GWP</p>
                                                <p className="text-lg font-semibold">{carbonEmissionDetails.globalWarmingPotentials.ch4_gwp}</p>
                                                <p className={`text-xs ${themeClasses.textMuted}`}>{carbonEmissionDetails.globalWarmingPotentials.source}</p>
                                            </div>
                                            <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                                <p className={`text-sm ${themeClasses.textMuted}`}>Conversion Factors</p>
                                                <div className="space-y-1 mt-2">
                                                    <p className="text-sm">N₂O-N to N₂O: {carbonEmissionDetails.conversionFactors.n2o_n_to_n2o?.toFixed(4)}</p>
                                                    <p className="text-sm">C to CO₂: {carbonEmissionDetails.conversionFactors.carbon_to_co2?.toFixed(4)}</p>
                                                    <p className="text-sm">Carbon Fraction: {carbonEmissionDetails.conversionFactors.carbon_fraction?.toFixed(3)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Analytics Tab */}
                    {activeTab === "analytics" && soilHealthData && (
                        <div className="space-y-8">
                            <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                <h3 className="text-lg font-semibold mb-6">Advanced Analytics</h3>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Correlation Analysis */}
                                    <div className={`p-6 rounded-xl border ${themeClasses.border}`}>
                                        <h4 className="font-semibold mb-4">Correlation Analysis</h4>
                                        <div className="h-64">
                                            {graphs && graphs.soc_trend && graphs.ndvi_trend && (
                                                <Line
                                                    data={{
                                                        labels: graphs.soc_trend.labels,
                                                        datasets: [
                                                            {
                                                                label: 'SOC Trend',
                                                                data: graphs.soc_trend.datasets[0].data,
                                                                borderColor: chartColors.primary,
                                                                backgroundColor: chartColors.background[0],
                                                                tension: 0.4,
                                                                fill: true,
                                                            },
                                                            {
                                                                label: 'NDVI Trend',
                                                                data: graphs.ndvi_trend.datasets[0].data.slice(-graphs.soc_trend.labels.length),
                                                                borderColor: chartColors.quaternary,
                                                                backgroundColor: chartColors.background[3],
                                                                tension: 0.4,
                                                                fill: true,
                                                            }
                                                        ]
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
                                                                }
                                                            }
                                                        }
                                                    }}
                                                />
                                            )}
                                        </div>
                                        <p className={`text-sm ${themeClasses.textMuted} mt-4`}>
                                            Correlation between Soil Organic Carbon and Vegetation Health
                                        </p>
                                    </div>

                                    {/* Monthly SOC Variation */}
                                    <div className={`p-6 rounded-xl border ${themeClasses.border}`}>
                                        <h4 className="font-semibold mb-4">Seasonal Patterns</h4>
                                        <div className="h-64">
                                            {graphs && graphs.monthly_soc && (
                                                <Line
                                                    data={{
                                                        labels: graphs.monthly_soc.labels,
                                                        datasets: graphs.monthly_soc.datasets.map((dataset, index) => ({
                                                            ...dataset,
                                                            borderColor: chartColors.border[index % chartColors.border.length],
                                                            backgroundColor: chartColors.background[index % chartColors.background.length],
                                                            tension: 0.4,
                                                            fill: true,
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
                                                                }
                                                            }
                                                        }
                                                    }}
                                                />
                                            )}
                                        </div>
                                        <p className={`text-sm ${themeClasses.textMuted} mt-4`}>
                                            Monthly variations in soil carbon and vegetation indices
                                        </p>
                                    </div>

                                    {/* Sequestration Rate Trend */}
                                    {graphs && graphs.sequestration_rate && (
                                        <div className={`p-6 rounded-xl border ${themeClasses.border} lg:col-span-2`}>
                                            <h4 className="font-semibold mb-4">Sequestration Rate Trend</h4>
                                            <div className="h-64">
                                                <Line
                                                    data={{
                                                        labels: graphs.sequestration_rate.labels,
                                                        datasets: graphs.sequestration_rate.datasets.map((dataset, index) => ({
                                                            ...dataset,
                                                            borderColor: chartColors.border[index % chartColors.border.length],
                                                            backgroundColor: chartColors.background[index % chartColors.background.length],
                                                            tension: 0.4,
                                                            fill: true,
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
                                                                }
                                                            }
                                                        }
                                                    }}
                                                />
                                            </div>
                                            <p className={`text-sm ${themeClasses.textMuted} mt-4`}>
                                                Historical sequestration rates and future projections
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Soil Degradation Monitoring */}
                                {soilDegradationMonitoring && (
                                    <div className="mt-6">
                                        <h4 className="font-semibold mb-4">Soil Degradation Monitoring</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                                <div className="text-2xl font-bold mb-2" style={{
                                                    color: soilDegradationMonitoring.degradationStatusColor === 'error' ? accentRed :
                                                        soilDegradationMonitoring.degradationStatusColor === 'warning' ? logoYellow : logoGreen
                                                }}>
                                                    {soilDegradationMonitoring.degradation_score}/100
                                                </div>
                                                <p className={`text-sm ${themeClasses.textMuted}`}>Degradation Score</p>
                                                <p className="text-xs mt-1">{soilDegradationMonitoring.degradation_status}</p>
                                            </div>
                                            <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                                <div className="text-2xl font-bold mb-2" style={{
                                                    color: soilDegradationMonitoring.regenerationStatusColor === 'error' ? accentRed :
                                                        soilDegradationMonitoring.regenerationStatusColor === 'warning' ? logoYellow : logoGreen
                                                }}>
                                                    {soilDegradationMonitoring.regeneration_potential}/100
                                                </div>
                                                <p className={`text-sm ${themeClasses.textMuted}`}>Regeneration Potential</p>
                                                <p className="text-xs mt-1">{soilDegradationMonitoring.regeneration_status}</p>
                                            </div>
                                            <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                                <div className="text-2xl font-bold mb-2">
                                                    {soilDegradationMonitoring.hasRiskFactors ? soilDegradationMonitoring.risk_factors.length : 0}
                                                </div>
                                                <p className={`text-sm ${themeClasses.textMuted}`}>Risk Factors</p>
                                                <p className="text-xs mt-1">
                                                    {soilDegradationMonitoring.hasImprovementOpportunities ?
                                                        `${soilDegradationMonitoring.improvement_opportunities.length} improvements suggested` : 'No improvements needed'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
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
                                <FileText className="w-4 h-4" style={{ color: logoGreen }} />
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                    <p className={`text-xs ${themeClasses.textMuted}`}>API Version</p>
                                    <p className="text-sm font-medium">{metadata.api_version}</p>
                                </div>
                                <div>
                                    <p className={`text-xs ${themeClasses.textMuted}`}>Generated</p>
                                    <p className="text-sm font-medium">{metadata.generatedAtFormatted}</p>
                                </div>
                                <div>
                                    <p className={`text-xs ${themeClasses.textMuted}`}>Data Sources</p>
                                    <p className="text-sm font-medium">{metadata.dataSourcesCount}</p>
                                </div>
                                <div>
                                    <p className={`text-xs ${themeClasses.textMuted}`}>Calculation Methods</p>
                                    <p className="text-sm font-medium">{metadata.calculationMethodsCount}</p>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-700/30">
                                <p className={`text-xs ${themeClasses.textMuted}`}>
                                    Endpoint: {metadata.endpoint} • Company ID: {metadata.company_id}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default SoilHealthCarbonEmissionScreen;