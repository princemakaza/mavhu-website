import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, Filler, ScatterController } from 'chart.js';
import { Line, Bar, Pie, Doughnut, Scatter } from 'react-chartjs-2';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LatLngExpression } from 'leaflet';
import Sidebar from "../../../../components/Sidebar";
import {
    TrendingUp,
    TrendingDown,
    Leaf,
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
    Droplets,
    Zap,
    Factory,
    Sprout,
    BarChart3,
    AlertTriangle,
} from "lucide-react";
import {
    getCropYieldForecastData,
    getYieldForecastSummary,
    getRiskAssessmentSummary,
    getEnvironmentalMetricsSummary,
    getCarbonEmissionData,
    getSatelliteIndicators,
    getAllGraphData,
    getConfidenceScoreBreakdown,
    getSeasonalAdvisory,
    getSummary,
    getMetadata,
    getCompanyInfo,
    getAvailableCropYieldYears,
    getSatelliteDataYears,
    getNDVIIndicators,
    getCalculationFactors,
    getMonthlyCarbonData,
    getRecommendations,
    getReportingPeriod,
    type CropYieldForecastResponse,
    type CropYieldForecastParams,
    type CarbonEmissionSummary,
    type ScatterPoint,
    type CategorySummary,
} from "../../../../../src/services/crop_yield_service";
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

// Create custom icon for Leaflet
const createLeafletIcon = () => {
    return L.icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
};

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

// Type for extended environmental metrics
interface ExtendedEnvironmentalMetrics {
    water_use_efficiency: {
        value: number;
        unit: string;
        benchmark: number;
        status: string;
    };
    energy_productivity: {
        value: number;
        unit: string;
        benchmark: number;
        status: string;
    };
    carbon_intensity: {
        value: number;
        unit: string;
        benchmark: number;
        status: string;
    };
    soil_health_index: {
        value: number;
        unit: string;
        benchmark: number;
        status: string;
    };
    efficiency_trend?: string;
    recycling_rate?: number;
    total_usage?: number;
    total_consumption?: number;
    total_emissions?: number;
    total_waste?: number;
    key_metrics?: Array<{
        name: string;
        current_value: number;
        unit: string;
    }>;
}

// Fixed: EnhancedCarbonEmissionSummary correctly extends without making totals optional
interface EnhancedCarbonEmissionSummary extends Omit<CarbonEmissionSummary, "net_carbon_balance"> {
    net_carbon_balance?: number;
    // Remove the optional totals property since it's required in parent
    // Keep only the additional properties we need
    period: {
        start_year: number;
        end_year: number;
        years_count: number;
    };
    averages: {
        annual_sequestration: number;
        annual_emissions: number;
        carbon_intensity: number;
        sequestration_rate: number;
    };
    trends: {
        sequestration_trend: number;
        emission_trend: number;
        sequestration_direction: string;
        emission_direction: string;
    };
    composition: {
        scope1_percentage: number;
        scope2_percentage: number;
        scope3_percentage: number;
        soc_sequestration_percentage: number;
    };
}

const CropYieldScreen = () => {
    const { companyId: paramCompanyId } = useParams<{ companyId: string }>();
    const location = useLocation();
    const navigate = useNavigate();

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [cropYieldData, setCropYieldData] = useState<CropYieldForecastResponse | null>(null);
    const [companies, setCompanies] = useState<Company[]>([]);
    const [selectedCompanyId, setSelectedCompanyId] = useState<string>(paramCompanyId || "");
    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const [availableYears, setAvailableYears] = useState<number[]>([]);
    const [satelliteYears, setSatelliteYears] = useState<number[]>([]);
    const [showCompanySelector, setShowCompanySelector] = useState(!paramCompanyId);
    const [activeTab, setActiveTab] = useState("overview");
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [mapZoom, setMapZoom] = useState(10);
    const [mapCenter, setMapCenter] = useState<LatLngExpression>([0, 0]);
    const [showFullMap, setShowFullMap] = useState(false);

    // Color scheme matching Sidebar
    const logoGreen = isDarkMode ? "#00FF00" : "#008000";
    const logoYellow = isDarkMode ? "#FFD700" : "#B8860B";
    const accentBlue = isDarkMode ? "#3B82F6" : "#1D4ED8";
    const accentPurple = isDarkMode ? "#8B5CF6" : "#7C3AED";

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

    // Enhanced chart colors for better visibility
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

    // Fetch crop yield data
    const fetchCropYieldData = async () => {
        if (!selectedCompanyId) return;

        try {
            setLoading(true);
            setError(null);
            const params: CropYieldForecastParams = {
                companyId: selectedCompanyId,
            };

            // Only add year if selected (not null)
            if (selectedYear !== null) {
                params.year = selectedYear;
            }

            const data = await getCropYieldForecastData(params);
            setCropYieldData(data);

            // Extract available years from response
            const years = getAvailableCropYieldYears(data);
            const satelliteDataYears = getSatelliteDataYears(data);

            // Sort years in descending order (latest first)
            const sortedYears = [...years].sort((a, b) => b - a);
            const sortedSatelliteYears = [...satelliteDataYears].sort((a, b) => b - a);

            setAvailableYears(sortedYears);
            setSatelliteYears(sortedSatelliteYears);

            // Set map center if coordinates exist
            const coordinates = data.data.company.area_of_interest?.coordinates;
            if (coordinates && coordinates.length > 0) {
                if (coordinates.length === 1) {
                    setMapCenter([coordinates[0].lat, coordinates[0].lon]);
                } else {
                    // Calculate center of polygon
                    const avgLat = coordinates.reduce((sum, c) => sum + c.lat, 0) / coordinates.length;
                    const avgLon = coordinates.reduce((sum, c) => sum + c.lon, 0) / coordinates.length;
                    setMapCenter([avgLat, avgLon]);
                }
            }
        } catch (err: any) {
            setError(err.message || "Failed to fetch crop yield forecast data");
            console.error("Error fetching crop yield data:", err);
        } finally {
            setLoading(false);
            setIsRefreshing(false);
        }
    };

    // Handle refresh
    const handleRefresh = () => {
        setIsRefreshing(true);
        fetchCropYieldData();
    };

    // Handle company change
    const handleCompanyChange = (companyId: string) => {
        setSelectedCompanyId(companyId);
        setShowCompanySelector(false);
        navigate(`/portal/esg-dashboard/crop-yield/${companyId}`);
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
            fetchCropYieldData();
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
    const yieldForecast = cropYieldData ? getYieldForecastSummary(cropYieldData) : null;
    const riskAssessment = cropYieldData ? getRiskAssessmentSummary(cropYieldData) : null;
    const environmentalMetrics = cropYieldData ? getEnvironmentalMetricsSummary(cropYieldData) : null;
    const carbonData = cropYieldData ? getCarbonEmissionData(cropYieldData) : null;
    const satelliteIndicators = cropYieldData ? getSatelliteIndicators(cropYieldData) : null;
    const confidenceScore = cropYieldData ? getConfidenceScoreBreakdown(cropYieldData) : null;
    const seasonalAdvisory = cropYieldData ? getSeasonalAdvisory(cropYieldData) : null;
    const summary = cropYieldData ? getSummary(cropYieldData) : null;
    const metadata = cropYieldData ? getMetadata(cropYieldData) : null;
    const companyInfo = cropYieldData ? getCompanyInfo(cropYieldData) : null;
    const graphs = cropYieldData ? getAllGraphData(cropYieldData) : null;
    const ndviIndicators = cropYieldData ? getNDVIIndicators(cropYieldData) : null;
    const calculationFactors = cropYieldData ? getCalculationFactors(cropYieldData) : null;
    const monthlyCarbonData = cropYieldData ? getMonthlyCarbonData(cropYieldData) : null;
    const recommendations = cropYieldData ? getRecommendations(cropYieldData) : null;
    const reportingPeriod = cropYieldData ? getReportingPeriod(cropYieldData) : null;

    // Get coordinates for map
    const coordinates = cropYieldData?.data.company.area_of_interest?.coordinates || [];
    const areaName = cropYieldData?.data.company.area_of_interest?.name || "Crop Production Area";
    const areaCovered = cropYieldData?.data.company.area_of_interest?.area_covered || "N/A";

    // Fixed: Properly cast carbon data summary to enhanced type
    const enhancedCarbonData = carbonData?.summary ? {
        ...carbonData.summary,
        net_carbon_balance: carbonData.summary.totals?.net_carbon_balance,
    } as EnhancedCarbonEmissionSummary : null;

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
        if (trend.toLowerCase().includes('increase') || trend.toLowerCase().includes('positive') || trend.toLowerCase().includes('up')) {
            return <TrendingUp className="w-4 h-4" style={{ color: logoGreen }} />;
        } else if (trend.toLowerCase().includes('decrease') || trend.toLowerCase().includes('negative') || trend.toLowerCase().includes('down')) {
            return <TrendingDown className="w-4 h-4 text-red-500" />;
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

        const customIcon = createLeafletIcon();

        return (
            <MapContainer
                center={mapCenter}
                zoom={mapZoom}
                style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
                className="leaflet-container"
                key={`${(mapCenter as [number, number])[0]}-${(mapCenter as [number, number])[1]}-${mapZoom}`}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url={isDarkMode
                        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    }
                />

                {coordinates.length === 1 ? (
                    <Marker
                        position={[coordinates[0].lat, coordinates[0].lon] as LatLngExpression}
                        icon={customIcon}
                    >
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
                        positions={coordinates.map(coord => [coord.lat, coord.lon] as LatLngExpression)}
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

                        {/* Map and Charts Row Skeleton */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                            <SkeletonCard className="h-80" />
                            <div className="lg:col-span-2">
                                <SkeletonCard className="h-80" />
                            </div>
                        </div>

                        {/* Risk & Confidence Score Skeleton */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            <SkeletonCard className="h-96" />
                            <SkeletonCard className="h-96" />
                        </div>

                        {/* Seasonal Advisory Skeleton */}
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
                                        Choose a company to view crop yield forecast data
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

    // Helper function to transform chart data
    const transformChartData = (graphData: any) => {
        if (!graphData || !graphData.datasets || !graphData.labels) return { labels: [], datasets: [] };

        return {
            labels: graphData.labels || [],
            datasets: graphData.datasets.map((dataset: any) => {
                // Transform ScatterPoint[] to number[] for line charts
                let data = dataset.data;
                if (data && data.length > 0 && typeof data[0] === 'object' && 'x' in data[0] && 'y' in data[0]) {
                    // It's a ScatterPoint array, extract y values for line chart
                    data = (data as ScatterPoint[]).map(point => point.y);
                }

                return {
                    ...dataset,
                    data: data as number[],
                    borderColor: dataset.borderColor || chartColors.border[0],
                    backgroundColor: dataset.backgroundColor || chartColors.background[0],
                    tension: 0.4,
                    fill: true,
                };
            })
        };
    };

    // Helper function to transform bar chart data
    const transformBarChartData = (graphData: any) => {
        if (!graphData || !graphData.datasets || !graphData.labels) return { labels: [], datasets: [] };

        return {
            labels: graphData.labels || [],
            datasets: graphData.datasets.map((dataset: any, index: number) => {
                // Transform ScatterPoint[] to number[] for bar charts
                let data = dataset.data;
                if (data && data.length > 0 && typeof data[0] === 'object' && 'x' in data[0] && 'y' in data[0]) {
                    // It's a ScatterPoint array, extract y values for bar chart
                    data = (data as ScatterPoint[]).map(point => point.y);
                }

                return {
                    ...dataset,
                    data: data as number[],
                    backgroundColor: chartColors.background[index % chartColors.background.length],
                    borderColor: chartColors.border[index % chartColors.border.length],
                    borderWidth: 1,
                };
            })
        };
    };

    // Helper function to transform doughnut/pie chart data
    const transformPieChartData = (graphData: any) => {
        if (!graphData || !graphData.datasets || !graphData.labels) return { labels: [], datasets: [] };

        return {
            labels: graphData.labels || [],
            datasets: graphData.datasets.map((dataset: any, index: number) => {
                // For pie/doughnut charts, ensure data is number[]
                let data = dataset.data;
                if (data && data.length > 0 && typeof data[0] === 'object' && 'y' in data[0]) {
                    // Extract y values for pie chart
                    data = (data as ScatterPoint[]).map(point => point.y);
                }

                return {
                    ...dataset,
                    data: data as number[],
                    backgroundColor: chartColors.background.slice(0, data.length),
                    borderColor: chartColors.border.slice(0, data.length),
                    borderWidth: 1,
                };
            })
        };
    };

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
                                    Crop Yield Forecast Dashboard
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
                        {["overview", "yield", "risk", "environmental", "carbon", "location", "seasonal", "analytics"].map((tab) => (
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
                                {tab.charAt(0).toUpperCase() + tab.slice(1).replace('_', ' ')}
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
                    {activeTab === "overview" && cropYieldData && (
                        <>
                            {/* Key Metrics Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                {/* Yield Forecast */}
                                <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 transition-all duration-300 hover:border-[${logoGreen}] shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <div
                                            className="p-3 rounded-xl"
                                            style={{
                                                background: `linear-gradient(to right, ${logoGreen}30, ${logoGreen}20)`,
                                                border: `1px solid ${logoGreen}40`
                                            }}
                                        >
                                            <Sprout className="w-6 h-6" style={{ color: logoGreen }} />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-sm ${getConfidenceColor(yieldForecast?.confidenceScore || 0)}`}>
                                                {yieldForecast?.confidenceScore ? formatPercentage(yieldForecast.confidenceScore) : 'N/A'}
                                            </span>
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-bold mb-2">
                                        {yieldForecast?.forecastedYield ? formatNumber(yieldForecast.forecastedYield) : 'N/A'}
                                        <span className="text-lg ml-1">{yieldForecast?.unit || 'units/ha'}</span>
                                    </h3>
                                    <p className={`${themeClasses.textSecondary} mb-2`}>Forecasted Yield</p>
                                    <div className="flex items-center justify-between">
                                        <span className={`text-sm ${yieldForecast?.comparison?.status === 'above' ? `text-[${logoGreen}]` : yieldForecast?.comparison?.status === 'below' ? 'text-red-500' : 'text-gray-500'}`}>
                                            {yieldForecast?.comparison?.percentage_difference || 'N/A'} vs industry
                                        </span>
                                        <span className={`text-xs px-2 py-1 rounded-full ${getConfidenceBg(yieldForecast?.confidenceScore || 0)}`}>
                                            {yieldForecast?.season || 'Season'}
                                        </span>
                                    </div>
                                </div>

                                {/* Risk Assessment */}
                                <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 transition-all duration-300 hover:border-[${logoYellow}] shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <div
                                            className="p-3 rounded-xl"
                                            style={{
                                                background: `linear-gradient(to right, ${logoYellow}30, ${logoYellow}20)`,
                                                border: `1px solid ${logoYellow}40`
                                            }}
                                        >
                                            <AlertTriangle className="w-6 h-6" style={{ color: logoYellow }} />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {riskAssessment?.overallScore && riskAssessment.overallScore > 60 ? (
                                                <AlertCircle className="w-4 h-4 text-red-500" />
                                            ) : (
                                                <CheckCircle className="w-4 h-4" style={{ color: logoGreen }} />
                                            )}
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-bold mb-2">
                                        {riskAssessment?.overallScore ? riskAssessment.overallScore.toFixed(1) : 'N/A'}
                                        <span className="text-lg ml-1">/100</span>
                                    </h3>
                                    <p className={`${themeClasses.textSecondary} mb-2`}>Risk Score</p>
                                    <div className="flex items-center justify-between">
                                        <span className={`text-sm`} style={{ color: getRiskColor(riskAssessment?.riskLevel || 'low') }}>
                                            {riskAssessment?.riskLevel || 'N/A'} Risk
                                        </span>
                                        <span className="text-sm">
                                            {riskAssessment?.primaryRisks?.length || 0} primary risks
                                        </span>
                                    </div>
                                </div>

                                {/* Carbon Balance */}
                                <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 transition-all duration-300 hover:border-[${accentBlue}] shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <div
                                            className="p-3 rounded-xl"
                                            style={{
                                                background: `linear-gradient(to right, ${accentBlue}30, ${accentBlue}20)`,
                                                border: `1px solid ${accentBlue}40`
                                            }}
                                        >
                                            <Activity className="w-6 h-6" style={{ color: accentBlue }} />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {enhancedCarbonData?.net_carbon_balance && enhancedCarbonData.net_carbon_balance >= 0 ? (
                                                <TrendingUp className="w-4 h-4" style={{ color: logoGreen }} />
                                            ) : (
                                                <TrendingDown className="w-4 h-4 text-red-500" />
                                            )}
                                        </div>
                                    </div>
                                    <h3 className={`text-3xl font-bold mb-2 ${enhancedCarbonData?.net_carbon_balance && enhancedCarbonData.net_carbon_balance >= 0 ? `text-[${logoGreen}]` : 'text-red-500'}`}>
                                        {enhancedCarbonData?.net_carbon_balance ? formatNumber(enhancedCarbonData.net_carbon_balance) : 'N/A'}
                                        <span className="text-lg ml-1">tCO₂</span>
                                    </h3>
                                    <p className={`${themeClasses.textSecondary} mb-2`}>Net Carbon Balance</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">
                                            {enhancedCarbonData?.totals?.total_sequestration_tco2 ? `${formatNumber(enhancedCarbonData.totals.total_sequestration_tco2)} tCO₂ sequestered` : 'N/A'}
                                        </span>
                                    </div>
                                </div>

                                {/* NDVI Health */}
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
                                            {ndviIndicators?.average_ndvi && ndviIndicators.average_ndvi > 0.5 ? (
                                                <TrendingUp className="w-4 h-4" style={{ color: logoGreen }} />
                                            ) : (
                                                <TrendingDown className="w-4 h-4 text-yellow-500" />
                                            )}
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-bold mb-2">
                                        {ndviIndicators?.average_ndvi ? ndviIndicators.average_ndvi.toFixed(3) : 'N/A'}
                                    </h3>
                                    <p className={`${themeClasses.textSecondary} mb-2`}>Average NDVI</p>
                                    <div className="flex items-center justify-between">
                                        <span className={`text-sm ${ndviIndicators?.average_ndvi && ndviIndicators.average_ndvi > 0.5 ? `text-[${logoGreen}]` : 'text-yellow-500'}`}>
                                            {ndviIndicators?.growing_season_months?.length || 0} growing months
                                        </span>
                                        <span className="text-sm">
                                            Max: {ndviIndicators?.max_ndvi ? ndviIndicators.max_ndvi.toFixed(3) : 'N/A'}
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
                                                <h3 className="text-lg font-semibold">Crop Production Area</h3>
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

                                {/* NDVI Trend Chart */}
                                <div className="lg:col-span-2">
                                    <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                        <div className="flex items-center justify-between mb-6">
                                            <div>
                                                <h3 className="text-lg font-semibold">NDVI Trend</h3>
                                                <p className={`text-sm ${themeClasses.textMuted}`}>Vegetation health index throughout the year</p>
                                            </div>
                                            <LineChart className="w-5 h-5" style={{ color: logoGreen }} />
                                        </div>
                                        <div className="h-64">
                                            {graphs && graphs.ndvi_trend ? (
                                                <Line
                                                    data={transformChartData(graphs.ndvi_trend)}
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
                                                                    text: 'NDVI',
                                                                    color: themeClasses.chartText,
                                                                }
                                                            }
                                                        }
                                                    }}
                                                />
                                            ) : (
                                                <div className="h-full flex items-center justify-center">
                                                    <p className={themeClasses.textMuted}>No NDVI trend data available</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Confidence Score & Risk Distribution */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                                {/* Confidence Score Breakdown */}
                                <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h3 className="text-lg font-semibold">Confidence Score</h3>
                                            <p className={`text-sm ${themeClasses.textMuted}`}>Forecast reliability assessment</p>
                                        </div>
                                        <div className={`text-lg font-bold ${getConfidenceColor(confidenceScore?.overall || 0)}`}>
                                            {confidenceScore?.overall ? formatPercentage(confidenceScore.overall) : 'N/A'}
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        {confidenceScore && [
                                            { key: 'forecast_confidence', label: 'Forecast Confidence' },
                                            { key: 'risk_assessment_confidence', label: 'Risk Assessment' },
                                            { key: 'data_quality', label: 'Data Quality' },
                                            { key: 'methodology_rigor', label: 'Methodology Rigor' }
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
                                                                width: `${confidenceScore[key as keyof typeof confidenceScore] || 0}%`,
                                                                background: `linear-gradient(to right, ${logoGreen}, ${logoYellow})`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-sm font-medium w-10">
                                                        {typeof confidenceScore[key as keyof typeof confidenceScore] === 'number'
                                                            ? `${confidenceScore[key as keyof typeof confidenceScore]}%`
                                                            : 'N/A'}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-6 p-4 rounded-lg bg-gray-700/20">
                                        <p className={`text-sm ${themeClasses.textMuted}`}>
                                            {confidenceScore?.interpretation || 'No interpretation available'}
                                        </p>
                                        {confidenceScore?.improvement_areas && confidenceScore.improvement_areas.length > 0 && (
                                            <div className="mt-2">
                                                <p className="text-xs font-medium mb-1">Improvement Areas:</p>
                                                <div className="flex flex-wrap gap-1">
                                                    {confidenceScore.improvement_areas.map((area, index) => (
                                                        <span key={index} className="text-xs px-2 py-1 rounded bg-yellow-500/20 text-yellow-500">
                                                            {area}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Risk Distribution */}
                                <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h3 className="text-lg font-semibold">Risk Distribution</h3>
                                            <p className={`text-sm ${themeClasses.textMuted}`}>Breakdown of risk categories and levels</p>
                                        </div>
                                        <Shield className="w-5 h-5" style={{ color: logoGreen }} />
                                    </div>
                                    <div className="h-64">
                                        {graphs && graphs.risk_distribution ? (
                                            <Bar
                                                data={transformBarChartData(graphs.risk_distribution)}
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
                                                            beginAtZero: true,
                                                        }
                                                    }
                                                }}
                                            />
                                        ) : (
                                            <div className="h-full flex items-center justify-center">
                                                <p className={themeClasses.textMuted}>No risk distribution data available</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-4 grid grid-cols-2 gap-2">
                                        {riskAssessment?.primaryRisks?.slice(0, 4).map((risk, index) => (
                                            <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-gray-700/20">
                                                <span className="text-sm">{risk.category}</span>
                                                <span className={`text-xs px-2 py-1 rounded-full`} style={{
                                                    backgroundColor: `${getRiskColor(risk.level)}20`,
                                                    color: getRiskColor(risk.level)
                                                }}>
                                                    {risk.level}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Seasonal Advisory */}
                            {seasonalAdvisory && (
                                <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 mb-8 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h3 className="text-lg font-semibold">Seasonal Advisory</h3>
                                            <p className={`text-sm ${themeClasses.textMuted}`}>Current and upcoming season recommendations</p>
                                        </div>
                                        <Calendar className="w-5 h-5" style={{ color: logoGreen }} />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                                                <Sun className="w-4 h-4" style={{ color: logoYellow }} />
                                                Current Season: {seasonalAdvisory.current_season}
                                            </h4>
                                            <ul className="space-y-2">
                                                {seasonalAdvisory.recommended_actions.slice(0, 3).map((action, index) => (
                                                    <li key={index} className="flex items-start gap-2">
                                                        <ArrowRight className="w-3 h-3 mt-1 flex-shrink-0" style={{ color: logoGreen }} />
                                                        <span className={`text-sm ${themeClasses.textMuted}`}>{action}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                                                <Moon className="w-4 h-4" style={{ color: accentBlue }} />
                                                Next Season: {seasonalAdvisory.next_season}
                                            </h4>
                                            <ul className="space-y-2">
                                                {seasonalAdvisory.upcoming_risks.slice(0, 3).map((risk, index) => (
                                                    <li key={index} className="flex items-start gap-2">
                                                        <AlertCircle className="w-3 h-3 mt-1 flex-shrink-0 text-yellow-500" />
                                                        <span className={`text-sm ${themeClasses.textMuted}`}>{risk}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {seasonalAdvisory.planting_schedule && (
                                        <div className={`p-4 rounded-xl border ${themeClasses.border} bg-gradient-to-r ${isDarkMode ? `from-[${logoGreen}]/20 to-[${logoYellow}]/20` : `from-[${logoGreen}]/10 to-[${logoYellow}]/10`}`}>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                <div>
                                                    <p className={`text-xs ${themeClasses.textMuted}`}>Primary Crop</p>
                                                    <p className="font-medium">{seasonalAdvisory.planting_schedule.primary_crop}</p>
                                                </div>
                                                <div>
                                                    <p className={`text-xs ${themeClasses.textMuted}`}>Planting Window</p>
                                                    <p className="font-medium">{seasonalAdvisory.planting_schedule.planting_window}</p>
                                                </div>
                                                <div>
                                                    <p className={`text-xs ${themeClasses.textMuted}`}>Harvest Season</p>
                                                    <p className="font-medium">{seasonalAdvisory.harvest_window?.harvest_season || 'N/A'}</p>
                                                </div>
                                                <div>
                                                    <p className={`text-xs ${themeClasses.textMuted}`}>Rotation</p>
                                                    <p className="font-medium">{seasonalAdvisory.planting_schedule.rotation}</p>
                                                </div>
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
                                            <p className={`text-sm ${themeClasses.textMuted}`}>Key insights and recommendations</p>
                                        </div>
                                        <Target className="w-5 h-5" style={{ color: logoYellow }} />
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="font-semibold mb-2">Outlook</h4>
                                            <p className={`${themeClasses.textMuted}`}>{summary.outlook}</p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                                    <CheckCircle className="w-4 h-4" style={{ color: logoGreen }} />
                                                    Key Strengths
                                                </h4>
                                                <ul className="space-y-1">
                                                    {summary.key_strengths.slice(0, 3).map((strength, index) => (
                                                        <li key={index} className="flex items-start gap-2">
                                                            <ArrowRight className="w-3 h-3 mt-1 flex-shrink-0" style={{ color: logoGreen }} />
                                                            <span className={`text-sm ${themeClasses.textMuted}`}>{strength}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div>
                                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                                    <AlertCircle className="w-4 h-4 text-red-500" />
                                                    Key Concerns
                                                </h4>
                                                <ul className="space-y-1">
                                                    {summary.key_concerns.slice(0, 3).map((concern, index) => (
                                                        <li key={index} className="flex items-start gap-2">
                                                            <ArrowRight className="w-3 h-3 mt-1 flex-shrink-0 text-red-500" />
                                                            <span className={`text-sm ${themeClasses.textMuted}`}>{concern}</span>
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

                    {/* Yield Tab */}
                    {activeTab === "yield" && cropYieldData && yieldForecast && (
                        <div className="space-y-8">
                            {/* Yield Forecast Details */}
                            <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-lg font-semibold">Yield Forecast Details</h3>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>Detailed forecast analysis and factors</p>
                                    </div>
                                    <Sprout className="w-5 h-5" style={{ color: logoGreen }} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                                    <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                        <div className="text-2xl font-bold mb-2" style={{ color: logoGreen }}>
                                            {yieldForecast.forecastedYield ? formatNumber(yieldForecast.forecastedYield) : 'N/A'}
                                        </div>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>Forecasted Yield</p>
                                    </div>
                                    <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                        <div className="text-2xl font-bold mb-2" style={{ color: logoGreen }}>
                                            {formatPercentage(yieldForecast.confidenceScore)}
                                        </div>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>Confidence Score</p>
                                    </div>
                                    <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                        <div className="text-2xl font-bold mb-2" style={{ color: yieldForecast.comparison?.status === 'above' ? logoGreen : yieldForecast.comparison?.status === 'below' ? '#FF6B6B' : logoYellow }}>
                                            {yieldForecast.comparison?.percentage_difference || 'N/A'}
                                        </div>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>vs Industry Average</p>
                                    </div>
                                    <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                        <div className="text-2xl font-bold mb-2" style={{ color: logoGreen }}>
                                            {yieldForecast.season || 'N/A'}
                                        </div>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>Season</p>
                                    </div>
                                </div>

                                {/* Calculation Factors */}
                                {calculationFactors && (
                                    <div className="mb-6">
                                        <h4 className="font-semibold mb-4">Calculation Factors</h4>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                            {Object.entries(calculationFactors).map(([key, value]) => (
                                                <div key={key} className={`p-3 rounded-lg border ${themeClasses.border} text-center`}>
                                                    <p className={`text-xs ${themeClasses.textMuted} mb-1`}>
                                                        {key.replace('_', ' ').charAt(0).toUpperCase() + key.replace('_', ' ').slice(1)}
                                                    </p>
                                                    <p className="font-medium">{String(value)}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* NDVI Indicators */}
                                {ndviIndicators && (
                                    <div className="mb-6">
                                        <h4 className="font-semibold mb-4">NDVI Indicators</h4>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                            <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                                <div className="text-xl font-bold mb-2" style={{ color: logoGreen }}>
                                                    {ndviIndicators.average_ndvi.toFixed(3)}
                                                </div>
                                                <p className={`text-sm ${themeClasses.textMuted}`}>Average NDVI</p>
                                            </div>
                                            <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                                <div className="text-xl font-bold mb-2" style={{ color: logoGreen }}>
                                                    {ndviIndicators.max_ndvi.toFixed(3)}
                                                </div>
                                                <p className={`text-sm ${themeClasses.textMuted}`}>Max NDVI</p>
                                            </div>
                                            <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                                <div className="text-xl font-bold mb-2" style={{ color: logoGreen }}>
                                                    {ndviIndicators.min_ndvi.toFixed(3)}
                                                </div>
                                                <p className={`text-sm ${themeClasses.textMuted}`}>Min NDVI</p>
                                            </div>
                                            <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                                <div className="text-xl font-bold mb-2" style={{ color: logoGreen }}>
                                                    {ndviIndicators.ndvi_std_dev.toFixed(3)}
                                                </div>
                                                <p className={`text-sm ${themeClasses.textMuted}`}>Std Dev</p>
                                            </div>
                                        </div>

                                        {/* Growing Season Months */}
                                        {ndviIndicators.growing_season_months && ndviIndicators.growing_season_months.length > 0 && (
                                            <div>
                                                <h5 className="font-medium mb-3">Growing Season Performance</h5>
                                                <div className="overflow-x-auto">
                                                    <table className="w-full">
                                                        <thead>
                                                            <tr className={`border-b ${themeClasses.border}`}>
                                                                <th className="py-2 px-3 text-left font-medium">Month</th>
                                                                <th className="py-2 px-3 text-left font-medium">NDVI</th>
                                                                <th className="py-2 px-3 text-left font-medium">Biomass</th>
                                                                <th className="py-2 px-3 text-left font-medium">Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {ndviIndicators.growing_season_months.map((month, index) => (
                                                                <tr key={index} className={`border-b ${themeClasses.border}`}>
                                                                    <td className="py-2 px-3">{month.month}</td>
                                                                    <td className="py-2 px-3">{month.ndvi.toFixed(3)}</td>
                                                                    <td className="py-2 px-3">{month.biomass.toFixed(1)}</td>
                                                                    <td className="py-2 px-3">
                                                                        <span className={`px-2 py-1 rounded-full text-xs ${month.ndvi > 0.6 ? `bg-[${logoGreen}]/20 text-[${logoGreen}]` : month.ndvi > 0.4 ? 'bg-yellow-500/20 text-yellow-500' : 'bg-red-500/20 text-red-500'}`}>
                                                                            {month.ndvi > 0.6 ? 'Excellent' : month.ndvi > 0.4 ? 'Good' : 'Poor'}
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
                                )}
                            </div>

                            {/* NDVI Trend Chart */}
                            <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-lg font-semibold">NDVI Trend Analysis</h3>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>Vegetation health index as an indicator of crop health</p>
                                    </div>
                                    <BarChart3 className="w-5 h-5" style={{ color: logoGreen }} />
                                </div>
                                <div className="h-80">
                                    {graphs && graphs.ndvi_trend ? (
                                        <Line
                                            data={transformChartData(graphs.ndvi_trend)}
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
                                                            text: 'NDVI',
                                                            color: themeClasses.chartText,
                                                        }
                                                    }
                                                }
                                            }}
                                        />
                                    ) : (
                                        <div className="h-full flex items-center justify-center">
                                            <p className={themeClasses.textMuted}>No NDVI trend data available</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Risk Tab */}
                    {activeTab === "risk" && cropYieldData && riskAssessment && (
                        <div className="space-y-8">
                            {/* Risk Assessment Overview */}
                            <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-lg font-semibold">Risk Assessment</h3>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>Comprehensive risk analysis and mitigation</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-xl font-bold`} style={{ color: getRiskColor(riskAssessment.riskLevel) }}>
                                            {riskAssessment.overallScore.toFixed(1)}/100
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium`} style={{
                                            backgroundColor: `${getRiskColor(riskAssessment.riskLevel)}20`,
                                            color: getRiskColor(riskAssessment.riskLevel)
                                        }}>
                                            {riskAssessment.riskLevel} Risk
                                        </span>
                                    </div>
                                </div>

                                {/* Primary Risks */}
                                <div className="mb-6">
                                    <h4 className="font-semibold mb-4">Primary Risks</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {riskAssessment.primaryRisks.map((risk, index) => (
                                            <div key={index} className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                                <div className="flex items-center justify-between mb-3">
                                                    <span className="font-medium">{risk.category}</span>
                                                    <span className={`text-xs px-2 py-1 rounded-full`} style={{
                                                        backgroundColor: `${getRiskColor(risk.level)}20`,
                                                        color: getRiskColor(risk.level)
                                                    }}>
                                                        {risk.level}
                                                    </span>
                                                </div>
                                                <div className="w-full h-2 rounded-full bg-gray-700/30 mb-2">
                                                    <div
                                                        className="h-full rounded-full"
                                                        style={{
                                                            width: `${risk.score}%`,
                                                            background: `linear-gradient(to right, ${getRiskColor(risk.level)}, ${getRiskColor(risk.level)}80)`,
                                                        }}
                                                    ></div>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-sm">{risk.score.toFixed(1)}/100</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Detailed Risks */}
                                {riskAssessment.detailedRisks && riskAssessment.detailedRisks.length > 0 && (
                                    <div className="mb-6">
                                        <h4 className="font-semibold mb-4">Detailed Risk Analysis</h4>
                                        <div className="space-y-4">
                                            {riskAssessment.detailedRisks.slice(0, 3).map((risk, index) => (
                                                <div key={index} className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div>
                                                            <h5 className="font-medium mb-1">{risk.category}</h5>
                                                            <div className="flex items-center gap-2">
                                                                <span className={`text-xs px-2 py-1 rounded-full`} style={{
                                                                    backgroundColor: `${getRiskColor(risk.level)}20`,
                                                                    color: getRiskColor(risk.level)
                                                                }}>
                                                                    {risk.level}
                                                                </span>
                                                                <span className="text-xs text-gray-500">Probability: {risk.probability}</span>
                                                            </div>
                                                        </div>
                                                        <span className="text-lg font-bold">{risk.score.toFixed(1)}</span>
                                                    </div>

                                                    {risk.factors && risk.factors.length > 0 && (
                                                        <div className="mb-3">
                                                            <p className="text-sm font-medium mb-1">Factors:</p>
                                                            <div className="flex flex-wrap gap-1">
                                                                {risk.factors.slice(0, 3).map((factor, idx) => (
                                                                    <span key={idx} className="text-xs px-2 py-1 rounded bg-gray-700/20">
                                                                        {factor}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {risk.mitigation && risk.mitigation.length > 0 && (
                                                        <div>
                                                            <p className="text-sm font-medium mb-1">Mitigation:</p>
                                                            <ul className="space-y-1">
                                                                {risk.mitigation.slice(0, 2).map((mit, idx) => (
                                                                    <li key={idx} className="flex items-start gap-2">
                                                                        <CheckCircle className="w-3 h-3 mt-1 flex-shrink-0" style={{ color: logoGreen }} />
                                                                        <span className="text-sm text-gray-500">{mit}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Mitigation Priorities */}
                                {riskAssessment.mitigationPriorities && riskAssessment.mitigationPriorities.length > 0 && (
                                    <div>
                                        <h4 className="font-semibold mb-4">Mitigation Priorities</h4>
                                        <div className="space-y-3">
                                            {riskAssessment.mitigationPriorities.map((priority, index) => (
                                                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-700/20">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${index === 0 ? `bg-[${logoGreen}]/20 text-[${logoGreen}]` : 'bg-gray-700/20 text-gray-400'}`}>
                                                        {index + 1}
                                                    </div>
                                                    <span className="flex-1">{priority}</span>
                                                    <button className="text-sm px-3 py-1 rounded-lg border border-gray-600 hover:border-[${logoGreen}] transition-colors">
                                                        Action
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Risk Distribution Chart */}
                            <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-lg font-semibold">Risk Distribution</h3>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>Visual breakdown of risk categories</p>
                                    </div>
                                    <Shield className="w-5 h-5" style={{ color: logoGreen }} />
                                </div>
                                <div className="h-80">
                                    {graphs && graphs.risk_distribution ? (
                                        <Bar
                                            data={transformBarChartData(graphs.risk_distribution)}
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
                                                        beginAtZero: true,
                                                    }
                                                }
                                            }}
                                        />
                                    ) : (
                                        <div className="h-full flex items-center justify-center">
                                            <p className={themeClasses.textMuted}>No risk distribution data available</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Environmental Tab */}
                    {activeTab === "environmental" && cropYieldData && environmentalMetrics && (
                        <div className="space-y-8">
                            {/* Environmental Metrics Overview */}
                            <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-lg font-semibold">Environmental Metrics</h3>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>Comprehensive environmental performance indicators</p>
                                    </div>
                                    <Leaf className="w-5 h-5" style={{ color: logoGreen }} />
                                </div>

                                {/* KPIs */}
                                {environmentalMetrics.keyPerformanceIndicators && (
                                    <div className="mb-8">
                                        <h4 className="font-semibold mb-4">Key Performance Indicators</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                            {Object.entries(environmentalMetrics.keyPerformanceIndicators).map(([key, kpi]) => (
                                                <div key={key} className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-sm font-medium">
                                                            {key.replace('_', ' ').charAt(0).toUpperCase() + key.replace('_', ' ').slice(1)}
                                                        </span>
                                                        <span className={`text-xs px-2 py-1 rounded-full ${kpi.status === 'good' ? `bg-[${logoGreen}]/20 text-[${logoGreen}]` : kpi.status === 'fair' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-red-500/20 text-red-500'}`}>
                                                            {kpi.status}
                                                        </span>
                                                    </div>
                                                    <div className="text-2xl font-bold mb-1">{kpi.value.toFixed(2)}</div>
                                                    <div className="flex justify-between text-xs text-gray-500">
                                                        <span>{kpi.unit}</span>
                                                        <span>Benchmark: {kpi.benchmark}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Category Summaries */}
                                <div className="space-y-6">
                                    {['water', 'energy', 'emissions', 'waste'].map((category) => {
                                        const catData = environmentalMetrics[category as keyof typeof environmentalMetrics] as ExtendedEnvironmentalMetrics | CategorySummary | undefined;
                                        if (!catData) return null;

                                        const extendedData = catData as ExtendedEnvironmentalMetrics;

                                        return (
                                            <div key={category} className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                                <div className="flex items-center justify-between mb-3">
                                                    <h5 className="font-medium flex items-center gap-2">
                                                        {category === 'water' && <Droplets className="w-4 h-4" style={{ color: accentBlue }} />}
                                                        {category === 'energy' && <Zap className="w-4 h-4" style={{ color: logoYellow }} />}
                                                        {category === 'emissions' && <Factory className="w-4 h-4" style={{ color: '#FF6B6B' }} />}
                                                        {category === 'waste' && <AlertCircle className="w-4 h-4" style={{ color: accentPurple }} />}
                                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                                    </h5>
                                                    <div className="flex items-center gap-2">
                                                        <span className={`text-sm ${extendedData.efficiency_trend === 'improving' ? `text-[${logoGreen}]` : extendedData.efficiency_trend === 'declining' ? 'text-red-500' : 'text-gray-500'}`}>
                                                            {extendedData.efficiency_trend || 'N/A'}
                                                        </span>
                                                        {extendedData.recycling_rate !== undefined && (
                                                            <span className="text-sm">{extendedData.recycling_rate}% recycling</span>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                                                    {extendedData.total_usage !== undefined && (
                                                        <div>
                                                            <p className="text-xs text-gray-500">Total Usage</p>
                                                            <p className="font-medium">{formatNumber(extendedData.total_usage)}</p>
                                                        </div>
                                                    )}
                                                    {extendedData.total_consumption !== undefined && (
                                                        <div>
                                                            <p className="text-xs text-gray-500">Total Consumption</p>
                                                            <p className="font-medium">{formatNumber(extendedData.total_consumption)}</p>
                                                        </div>
                                                    )}
                                                    {extendedData.total_emissions !== undefined && (
                                                        <div>
                                                            <p className="text-xs text-gray-500">Total Emissions</p>
                                                            <p className="font-medium">{formatNumber(extendedData.total_emissions)} tCO₂e</p>
                                                        </div>
                                                    )}
                                                    {extendedData.total_waste !== undefined && (
                                                        <div>
                                                            <p className="text-xs text-gray-500">Total Waste</p>
                                                            <p className="font-medium">{formatNumber(extendedData.total_waste)}</p>
                                                        </div>
                                                    )}
                                                </div>

                                                {extendedData.key_metrics && extendedData.key_metrics.length > 0 && (
                                                    <div>
                                                        <p className="text-xs text-gray-500 mb-2">Key Metrics</p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {extendedData.key_metrics.slice(0, 3).map((metric, idx) => (
                                                                <div key={idx} className="text-xs px-3 py-1 rounded-full bg-gray-700/20">
                                                                    {metric.name}: {metric.current_value} {metric.unit}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Carbon Tab */}
                    {activeTab === "carbon" && cropYieldData && enhancedCarbonData && (
                        <div className="space-y-8">
                            {/* Carbon Emission Accounting */}
                            <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-lg font-semibold">Carbon Emission Accounting</h3>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>Comprehensive carbon balance and sequestration analysis</p>
                                    </div>
                                    <Activity className="w-5 h-5" style={{ color: logoGreen }} />
                                </div>

                                {/* Summary Metrics */}
                                {enhancedCarbonData.totals && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                        <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                            <div className="text-2xl font-bold mb-2" style={{ color: logoGreen }}>
                                                {formatNumber(enhancedCarbonData.totals.total_sequestration_tco2)}
                                            </div>
                                            <p className={`text-sm ${themeClasses.textMuted}`}>Total Sequestration (tCO₂)</p>
                                        </div>
                                        <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                            <div className="text-2xl font-bold mb-2" style={{ color: '#FF6B6B' }}>
                                                {formatNumber(enhancedCarbonData.totals.total_emissions_tco2e)}
                                            </div>
                                            <p className={`text-sm ${themeClasses.textMuted}`}>Total Emissions (tCO₂e)</p>
                                        </div>
                                        <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                            <div className={`text-2xl font-bold mb-2 ${enhancedCarbonData.totals.net_carbon_balance >= 0 ? `text-[${logoGreen}]` : 'text-red-500'}`}>
                                                {enhancedCarbonData.totals.net_carbon_balance >= 0 ? '+' : ''}{formatNumber(enhancedCarbonData.totals.net_carbon_balance)}
                                            </div>
                                            <p className={`text-sm ${themeClasses.textMuted}`}>Net Carbon Balance (tCO₂)</p>
                                        </div>
                                        <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                            <div className="text-2xl font-bold mb-2" style={{ color: logoGreen }}>
                                                {enhancedCarbonData.totals.average_area_ha.toFixed(2)}
                                            </div>
                                            <p className={`text-sm ${themeClasses.textMuted}`}>Average Area (ha)</p>
                                        </div>
                                    </div>
                                )}

                                {/* Emissions Breakdown */}
                                <div className="mb-6">
                                    <h4 className="font-semibold mb-4">Emissions Breakdown by Scope</h4>
                                    <div className="h-64">
                                        {graphs && graphs.emissions_breakdown ? (
                                            <Doughnut
                                                data={transformPieChartData(graphs.emissions_breakdown)}
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
                                                }}
                                            />
                                        ) : (
                                            <div className="h-full flex items-center justify-center">
                                                <p className={themeClasses.textMuted}>No emissions breakdown data available</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Monthly Carbon Data */}
                                {monthlyCarbonData && monthlyCarbonData.length > 0 && (
                                    <div>
                                        <h4 className="font-semibold mb-4">Monthly Carbon Data</h4>
                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className={`border-b ${themeClasses.border}`}>
                                                        <th className="py-2 px-3 text-left font-medium">Month</th>
                                                        <th className="py-2 px-3 text-left font-medium">NDVI Max</th>
                                                        <th className="py-2 px-3 text-left font-medium">SOC (tC/ha)</th>
                                                        <th className="py-2 px-3 text-left font-medium">Δ SOC (tCO₂)</th>
                                                        <th className="py-2 px-3 text-left font-medium">Biomass CO₂ (t)</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {monthlyCarbonData.slice(0, 6).map((month, index) => (
                                                        <tr key={index} className={`border-b ${themeClasses.border}`}>
                                                            <td className="py-2 px-3">{month.month}</td>
                                                            <td className="py-2 px-3">{month.ndvi_max.toFixed(3)}</td>
                                                            <td className="py-2 px-3">{month.soc_tc_per_ha.toFixed(2)}</td>
                                                            <td className={`py-2 px-3 ${month.delta_soc_co2_t >= 0 ? `text-[${logoGreen}]` : 'text-red-500'}`}>
                                                                {month.delta_soc_co2_t >= 0 ? '+' : ''}{month.delta_soc_co2_t.toFixed(2)}
                                                            </td>
                                                            <td className="py-2 px-3">{month.biomass_co2_total_t.toFixed(2)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* SOC and Biomass Trends */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                    <h4 className="font-semibold mb-4">SOC Trend</h4>
                                    <div className="h-64">
                                        {graphs && graphs.soc_trend ? (
                                            <Line
                                                data={transformChartData(graphs.soc_trend)}
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
                                                                text: 'SOC (tC/ha)',
                                                                color: themeClasses.chartText,
                                                            }
                                                        }
                                                    }
                                                }}
                                            />
                                        ) : (
                                            <div className="h-full flex items-center justify-center">
                                                <p className={themeClasses.textMuted}>No SOC trend data available</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                    <h4 className="font-semibold mb-4">Biomass Accumulation</h4>
                                    <div className="h-64">
                                        {graphs && graphs.biomass_accumulation ? (
                                            <Bar
                                                data={transformBarChartData(graphs.biomass_accumulation)}
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
                                                                text: 'Biomass (t/ha)',
                                                                color: themeClasses.chartText,
                                                            }
                                                        }
                                                    }
                                                }}
                                            />
                                        ) : (
                                            <div className="h-full flex items-center justify-center">
                                                <p className={themeClasses.textMuted}>No biomass accumulation data available</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Location Tab */}
                    {activeTab === "location" && cropYieldData && (
                        <div className="space-y-8">
                            {/* Map Card */}
                            <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-lg font-semibold">Crop Production Area</h3>
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
                                                    {coordinates.slice(0, 10).map((coord, index) => (
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

                    {/* Seasonal Tab */}
                    {activeTab === "seasonal" && cropYieldData && seasonalAdvisory && (
                        <div className="space-y-8">
                            {/* Seasonal Advisory Details */}
                            <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-lg font-semibold">Seasonal Advisory</h3>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>Comprehensive seasonal planning and recommendations</p>
                                    </div>
                                    <Calendar className="w-5 h-5" style={{ color: logoGreen }} />
                                </div>

                                {/* Current and Next Season */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div className={`p-6 rounded-xl border ${themeClasses.border}`}>
                                        <div className="flex items-center gap-3 mb-4">
                                            <Sun className="w-6 h-6" style={{ color: logoYellow }} />
                                            <h4 className="text-lg font-semibold">Current Season: {seasonalAdvisory.current_season}</h4>
                                        </div>

                                        <div className="mb-6">
                                            <h5 className="font-medium mb-3">Recommended Actions</h5>
                                            <ul className="space-y-2">
                                                {seasonalAdvisory.recommended_actions.map((action, index) => (
                                                    <li key={index} className="flex items-start gap-2 p-3 rounded-lg bg-gray-700/20">
                                                        <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: logoGreen }} />
                                                        <span>{action}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className={`p-6 rounded-xl border ${themeClasses.border}`}>
                                        <div className="flex items-center gap-3 mb-4">
                                            <Moon className="w-6 h-6" style={{ color: accentBlue }} />
                                            <h4 className="text-lg font-semibold">Next Season: {seasonalAdvisory.next_season}</h4>
                                        </div>

                                        <div className="mb-6">
                                            <h5 className="font-medium mb-3">Upcoming Risks</h5>
                                            <ul className="space-y-2">
                                                {seasonalAdvisory.upcoming_risks.map((risk, index) => (
                                                    <li key={index} className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10">
                                                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-500" />
                                                        <span>{risk}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Planting Schedule */}
                                {seasonalAdvisory.planting_schedule && (
                                    <div className="mb-8">
                                        <h4 className="text-lg font-semibold mb-4">Planting Schedule</h4>
                                        <div className={`p-6 rounded-xl border ${themeClasses.border} bg-gradient-to-r ${isDarkMode ? `from-[${logoGreen}]/20 to-[${logoYellow}]/20` : `from-[${logoGreen}]/10 to-[${logoYellow}]/10`}`}>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                                <div>
                                                    <p className={`text-sm ${themeClasses.textMuted} mb-1`}>Primary Crop</p>
                                                    <p className="text-lg font-semibold">{seasonalAdvisory.planting_schedule.primary_crop}</p>
                                                </div>
                                                <div>
                                                    <p className={`text-sm ${themeClasses.textMuted} mb-1`}>Planting Window</p>
                                                    <p className="text-lg font-semibold">{seasonalAdvisory.planting_schedule.planting_window}</p>
                                                    <p className="text-sm text-gray-500">Optimal: {seasonalAdvisory.planting_schedule.optimal_planting}</p>
                                                </div>
                                                <div>
                                                    <p className={`text-sm ${themeClasses.textMuted} mb-1`}>Duration</p>
                                                    <p className="text-lg font-semibold">{seasonalAdvisory.planting_schedule.duration}</p>
                                                </div>
                                                <div>
                                                    <p className={`text-sm ${themeClasses.textMuted} mb-1`}>Rotation</p>
                                                    <p className="text-lg font-semibold">{seasonalAdvisory.planting_schedule.rotation}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Harvest Window */}
                                {seasonalAdvisory.harvest_window && (
                                    <div>
                                        <h4 className="text-lg font-semibold mb-4">Harvest Window</h4>
                                        <div className={`p-6 rounded-xl border ${themeClasses.border}`}>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                                <div>
                                                    <p className={`text-sm ${themeClasses.textMuted} mb-1`}>Harvest Season</p>
                                                    <p className="text-lg font-semibold">{seasonalAdvisory.harvest_window.harvest_season}</p>
                                                </div>
                                                <div>
                                                    <p className={`text-sm ${themeClasses.textMuted} mb-1`}>Peak Harvest</p>
                                                    <p className="text-lg font-semibold">{seasonalAdvisory.harvest_window.peak_harvest}</p>
                                                </div>
                                                <div>
                                                    <p className={`text-sm ${themeClasses.textMuted} mb-1`}>Expected Yield Period</p>
                                                    <p className="text-lg font-semibold">{seasonalAdvisory.harvest_window.expected_yield_period}</p>
                                                </div>
                                                <div>
                                                    <p className={`text-sm ${themeClasses.textMuted} mb-1`}>Post-Harvest</p>
                                                    <p className="text-lg font-semibold">{seasonalAdvisory.harvest_window.post_harvest}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Analytics Tab */}
                    {activeTab === "analytics" && cropYieldData && graphs && (
                        <div className="space-y-8">
                            <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                <h3 className="text-lg font-semibold mb-6">Advanced Analytics</h3>

                                {/* Yield-Risk Correlation */}
                                <div className="mb-8">
                                    <h4 className="font-semibold mb-4">Yield-Risk Correlation Analysis</h4>
                                    <div className="h-80">
                                        {graphs.yield_risk_correlation ? (
                                            <Scatter
                                                data={{
                                                    datasets: graphs.yield_risk_correlation.datasets.map((dataset: any) => ({
                                                        label: dataset.label,
                                                        data: dataset.data as ScatterPoint[],
                                                        backgroundColor: chartColors.border[0],
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
                                                            type: 'linear' as const,
                                                            position: 'bottom' as const,
                                                            title: {
                                                                display: true,
                                                                text: 'Risk Score',
                                                                color: themeClasses.chartText,
                                                            },
                                                            grid: {
                                                                color: themeClasses.chartGrid,
                                                            },
                                                            ticks: {
                                                                color: themeClasses.chartText,
                                                            }
                                                        },
                                                        y: {
                                                            title: {
                                                                display: true,
                                                                text: 'Yield',
                                                                color: themeClasses.chartText,
                                                            },
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
                                        ) : (
                                            <div className="h-full flex items-center justify-center">
                                                <p className={themeClasses.textMuted}>No yield-risk correlation data available</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Forecast Confidence */}
                                <div className="mb-8">
                                    <h4 className="font-semibold mb-4">Forecast Confidence Analysis</h4>
                                    <div className="h-80">
                                        {graphs.forecast_confidence ? (
                                            <Pie
                                                data={transformPieChartData(graphs.forecast_confidence)}
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
                                                }}
                                            />
                                        ) : (
                                            <div className="h-full flex items-center justify-center">
                                                <p className={themeClasses.textMuted}>No forecast confidence data available</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* NDVI Trend */}
                                <div>
                                    <h4 className="font-semibold mb-4">NDVI Trend Analysis</h4>
                                    <div className="h-80">
                                        {graphs && graphs.ndvi_trend ? (
                                            <Line
                                                data={transformChartData(graphs.ndvi_trend)}
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
                                                            title: {
                                                                display: true,
                                                                text: 'NDVI Value',
                                                                color: themeClasses.chartText,
                                                            }
                                                        }
                                                    }
                                                }}
                                            />
                                        ) : (
                                            <div className="h-full flex items-center justify-center">
                                                <p className={themeClasses.textMuted}>No NDVI trend data available</p>
                                            </div>
                                        )}
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

export default CropYieldScreen;