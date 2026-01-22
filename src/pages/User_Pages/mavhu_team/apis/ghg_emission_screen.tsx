import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, Filler, ScatterController } from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
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
    ChevronRight,
    FileText,
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
                    const avgLat = coords.reduce((sum, c) => sum + c.lat, 0) / coords.length;
                    const avgLon = coords.reduce((sum, c) => sum + c.lon, 0) / coords.length;
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

    // Custom icon for map markers
    const customIcon = new L.Icon({
        iconUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${logoGreen}"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null
    });

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

    // Map Component - Same as CropYieldScreen
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

                                {/* Breakdown Chart */}
                                {graphs && graphs.scope1_breakdown && (
                                    <div className="mb-6">
                                        <h4 className="font-semibold mb-4">Breakdown by Source Type</h4>
                                        <div className="h-64">
                                            <Bar
                                                data={{
                                                    labels: graphs.scope1_breakdown.labels,
                                                    datasets: graphs.scope1_breakdown.datasets.map((dataset, index) => ({
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
                                                            display: false
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
                                        </div>
                                    </div>
                                )}

                                {/* Detailed Sources */}
                                <div>
                                    <h4 className="font-semibold mb-4">Detailed Sources</h4>
                                    <div className="space-y-4">
                                        {scope1Sources.map((source, index) => (
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
                                        {scope2Sources.map((source, index) => (
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

                                {/* Categories Chart */}
                                {graphs && graphs.scope3_categories && (
                                    <div className="mb-6">
                                        <h4 className="font-semibold mb-4">Breakdown by Category</h4>
                                        <div className="h-64">
                                            <Bar
                                                data={{
                                                    labels: graphs.scope3_categories.labels,
                                                    datasets: graphs.scope3_categories.datasets.map((dataset, index) => ({
                                                        ...dataset,
                                                        backgroundColor: chartColors.background[index % chartColors.background.length],
                                                        borderColor: chartColors.border[index % chartColors.border.length],
                                                        borderWidth: 1,
                                                    }))
                                                }}
                                                options={{
                                                    indexAxis: 'y' as const,
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                    plugins: {
                                                        legend: {
                                                            display: false
                                                        },
                                                    },
                                                    scales: {
                                                        x: {
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
                                    </div>
                                )}

                                {/* Categories Breakdown */}
                                {scopeBreakdown.scope3.categories && (
                                    <div className="mb-6">
                                        <h4 className="font-semibold mb-4">Categories Breakdown</h4>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {Object.entries(scopeBreakdown.scope3.categories).map(([category, value]) => (
                                                <div key={category} className={`p-3 rounded-lg border ${themeClasses.border} text-center`}>
                                                    <p className="text-sm font-medium" style={{ color: scope3Color }}>
                                                        {value.toFixed(3)}
                                                    </p>
                                                    <p className={`text-xs ${themeClasses.textMuted}`}>
                                                        {category.replace('_', ' ').toUpperCase()}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Detailed Categories */}
                                <div>
                                    <h4 className="font-semibold mb-4">Detailed Categories</h4>
                                    <div className="space-y-4">
                                        {scope3Categories.map((category, index) => (
                                            <div key={index} className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                                <div className="flex items-center justify-between mb-3">
                                                    <div>
                                                        <h5 className="font-medium">{category.category}</h5>
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

                                {/* Alignment Summary */}
                                <div className="mb-8">
                                    <h4 className="font-semibold mb-4">Alignment Summary</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                        <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                            <div className={`text-lg font-bold mb-2 ${reductionTargets.alignment.paris_agreement.toLowerCase().includes('aligned') ? `text-[${logoGreen}]` : 'text-red-500'}`}>
                                                {reductionTargets.alignment.paris_agreement}
                                            </div>
                                            <p className={`text-sm ${themeClasses.textMuted}`}>Paris Agreement</p>
                                        </div>
                                        <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                            <div className="text-lg font-bold mb-2">{reductionTargets.alignment.national_contributions}</div>
                                            <p className={`text-sm ${themeClasses.textMuted}`}>National Contributions</p>
                                        </div>
                                        <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                            <div className="text-lg font-bold mb-2">{reductionTargets.alignment.corporate_commitments}</div>
                                            <p className={`text-sm ${themeClasses.textMuted}`}>Corporate Commitments</p>
                                        </div>
                                    </div>
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

                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                                        <div>
                                                            <p className={`text-xs ${themeClasses.textMuted}`}>Required Annual Reduction</p>
                                                            <p className="font-medium">{target.required_annual_reduction.toLocaleString()} tCO₂e</p>
                                                        </div>
                                                        <div>
                                                            <p className={`text-xs ${themeClasses.textMuted}`}>Paris Agreement</p>
                                                            <p className={`font-medium ${target.alignment.paris_agreement.toLowerCase().includes('aligned') ? `text-[${logoGreen}]` : 'text-red-500'}`}>
                                                                {target.alignment.paris_agreement}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className={`text-xs ${themeClasses.textMuted}`}>Science Based Targets</p>
                                                            <p className={`font-medium ${target.alignment.science_based_targets.toLowerCase().includes('eligible') ? `text-[${logoGreen}]` : 'text-yellow-500'}`}>
                                                                {target.alignment.science_based_targets}
                                                            </p>
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

                            {/* Reduction Progress Chart */}
                            {graphs && graphs.reduction_progress && (
                                <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h3 className="text-lg font-semibold">Reduction Progress</h3>
                                            <p className={`text-sm ${themeClasses.textMuted}`}>Progress against reduction targets</p>
                                        </div>
                                        <LineChartIcon className="w-5 h-5" style={{ color: logoGreen }} />
                                    </div>
                                    <div className="h-80">
                                        <Line
                                            data={{
                                                labels: graphs.reduction_progress.labels,
                                                datasets: graphs.reduction_progress.datasets.map((dataset, index) => ({
                                                    ...dataset,
                                                    borderColor: chartColors.border[index % chartColors.border.length],
                                                    backgroundColor: chartColors.background[index % chartColors.background.length],
                                                    tension: 0.4,
                                                    fill: index === 0,
                                                    borderDash: dataset.borderDash || undefined,
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
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Methodology Tab */}
                    {activeTab === "methodology" && carbonAccounting && (
                        <div className="space-y-8">
                            {/* Methodology Overview */}
                            <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-lg font-semibold">Carbon Accounting Methodology</h3>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>Calculation methods and frameworks</p>
                                    </div>
                                    <FileText className="w-5 h-5" style={{ color: logoGreen }} />
                                </div>

                                {/* Framework */}
                                <div className="mb-8">
                                    <h4 className="font-semibold mb-4">Framework</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                            <p className={`text-sm ${themeClasses.textMuted} mb-1`}>Sequestration Methodology</p>
                                            <p className="font-medium">{carbonAccounting.framework.sequestration_methodology}</p>
                                        </div>
                                        <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                            <p className={`text-sm ${themeClasses.textMuted} mb-1`}>Emission Methodology</p>
                                            <p className="font-medium">{carbonAccounting.framework.emission_methodology}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                            <p className={`text-sm ${themeClasses.textMuted} mb-1`}>Calculation Approach</p>
                                            <p className="font-medium">{carbonAccounting.framework.calculation_approach}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Detailed Methodology */}
                                <div className="mb-8">
                                    <h4 className="font-semibold mb-4">Detailed Methodology</h4>
                                    <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                        <p className={`${themeClasses.textMuted}`}>{carbonAccounting.methodology}</p>
                                    </div>
                                </div>

                                {/* Emission Factors */}
                                {emissionFactors.length > 0 && (
                                    <div className="mb-8">
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="font-semibold">Emission Factors</h4>
                                            <button
                                                onClick={() => setShowDetailedFactors(!showDetailedFactors)}
                                                className="text-sm flex items-center gap-1"
                                                style={{ color: logoGreen }}
                                            >
                                                {showDetailedFactors ? 'Show Less' : 'Show All'}
                                                <ChevronRight className={`w-4 h-4 transition-transform ${showDetailedFactors ? 'rotate-90' : ''}`} />
                                            </button>
                                        </div>
                                        <div className={`overflow-hidden transition-all duration-300 ${showDetailedFactors ? 'max-h-[2000px]' : 'max-h-96'}`}>
                                            <div className="overflow-x-auto">
                                                <table className="w-full">
                                                    <thead>
                                                        <tr className={`border-b ${themeClasses.border}`}>
                                                            <th className="py-3 px-4 text-left font-medium">Source</th>
                                                            <th className="py-3 px-4 text-left font-medium">Activity Data</th>
                                                            <th className="py-3 px-4 text-left font-medium">Emission Factor</th>
                                                            <th className="py-3 px-4 text-left font-medium">GWP</th>
                                                            <th className="py-3 px-4 text-left font-medium">Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {emissionFactors.slice(0, showDetailedFactors ? undefined : 5).map((factor, index) => (
                                                            <tr key={index} className={`border-b ${themeClasses.border}`}>
                                                                <td className="py-3 px-4">
                                                                    <div className="font-medium">{factor.source}</div>
                                                                    <div className="text-xs text-gray-500">{factor.emission_factor_code}</div>
                                                                </td>
                                                                <td className="py-3 px-4">{factor.activity_data}</td>
                                                                <td className="py-3 px-4">
                                                                    <div>{factor.emission_factor_value} {factor.emission_factor_unit}</div>
                                                                    <div className="text-xs text-gray-500">{factor.default_ef_start}</div>
                                                                </td>
                                                                <td className="py-3 px-4">
                                                                    <div>{factor.gwp_value}</div>
                                                                    <div className="text-xs text-gray-500">{factor.gwp_source}</div>
                                                                </td>
                                                                <td className="py-3 px-4">
                                                                    <span className={`px-2 py-1 rounded-full text-xs ${factor.is_active ? `bg-[${logoGreen}]/20 text-[${logoGreen}]` : 'bg-gray-500/20 text-gray-500'}`}>
                                                                        {factor.is_active ? 'Active' : 'Inactive'}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        {!showDetailedFactors && emissionFactors.length > 5 && (
                                            <div className="text-center mt-4">
                                                <span className="text-sm text-gray-500">
                                                    Showing 5 of {emissionFactors.length} emission factors
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Global Warming Potentials */}
                                {carbonAccounting.global_warming_potentials && (
                                    <div className="mb-8">
                                        <h4 className="font-semibold mb-4">Global Warming Potentials</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className={`p-4 rounded-xl border ${themeClasses.border} text-center`}>
                                                <div className="text-2xl font-bold mb-2">{carbonAccounting.global_warming_potentials.n2o_gwp}</div>
                                                <p className={`text-sm ${themeClasses.textMuted}`}>N₂O GWP</p>
                                            </div>
                                            <div className={`p-4 rounded-xl border ${themeClasses.border} text-center`}>
                                                <div className="text-2xl font-bold mb-2">{carbonAccounting.global_warming_potentials.ch4_gwp}</div>
                                                <p className={`text-sm ${themeClasses.textMuted}`}>CH₄ GWP</p>
                                            </div>
                                            <div className={`p-4 rounded-xl border ${themeClasses.border} text-center`}>
                                                <div className="text-sm font-medium mb-2">{carbonAccounting.global_warming_potentials.source}</div>
                                                <p className={`text-sm ${themeClasses.textMuted}`}>Source</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Conversion Factors */}
                                {carbonAccounting.conversion_factors && (
                                    <div>
                                        <h4 className="font-semibold mb-4">Conversion Factors</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className={`p-4 rounded-xl border ${themeClasses.border} text-center`}>
                                                <div className="text-xl font-bold mb-2">{carbonAccounting.conversion_factors.n2o_n_to_n2o.toFixed(4)}</div>
                                                <p className={`text-sm ${themeClasses.textMuted}`}>N₂O-N to N₂O</p>
                                            </div>
                                            <div className={`p-4 rounded-xl border ${themeClasses.border} text-center`}>
                                                <div className="text-xl font-bold mb-2">{carbonAccounting.conversion_factors.carbon_to_co2.toFixed(4)}</div>
                                                <p className={`text-sm ${themeClasses.textMuted}`}>Carbon to CO₂</p>
                                            </div>
                                            <div className={`p-4 rounded-xl border ${themeClasses.border} text-center`}>
                                                <div className="text-xl font-bold mb-2">{carbonAccounting.conversion_factors.carbon_fraction.toFixed(4)}</div>
                                                <p className={`text-sm ${themeClasses.textMuted}`}>Carbon Fraction</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Compliance Tab */}
                    {activeTab === "compliance" && (
                        <div className="space-y-8">
                            {/* Compliance Overview */}
                            <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-lg font-semibold">Compliance & Reporting</h3>
                                        <p className={`text-sm ${themeClasses.textMuted}`}>Regulatory requirements and frameworks</p>
                                    </div>
                                    <Scale className="w-5 h-5" style={{ color: logoGreen }} />
                                </div>

                                {/* Compliance Frameworks */}
                                {complianceFrameworks.length > 0 && (
                                    <div className="mb-8">
                                        <h4 className="font-semibold mb-4">Compliance Frameworks</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {complianceFrameworks.map((framework, index) => (
                                                <span key={index} className="px-3 py-2 rounded-lg text-sm" style={{
                                                    background: `linear-gradient(to right, ${logoGreen}20, ${logoGreen}10)`,
                                                    border: `1px solid ${logoGreen}30`,
                                                    color: logoGreen
                                                }}>
                                                    {framework}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Reporting Requirements */}
                                {reportingRequirements && (
                                    <div className="mb-8">
                                        <h4 className="font-semibold mb-4">Reporting Requirements</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <h5 className="font-medium mb-2">Mandatory Reporting</h5>
                                                <ul className="space-y-1">
                                                    {reportingRequirements.mandatory.map((item, index) => (
                                                        <li key={index} className="flex items-start gap-2">
                                                            <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#FF6B6B' }} />
                                                            <span className="text-sm">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div>
                                                <h5 className="font-medium mb-2">Voluntary Reporting</h5>
                                                <ul className="space-y-1">
                                                    {reportingRequirements.voluntary.map((item, index) => (
                                                        <li key={index} className="flex items-start gap-2">
                                                            <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: logoGreen }} />
                                                            <span className="text-sm">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Deadlines */}
                                {reportingRequirements && (
                                    <div className="mb-8">
                                        <h4 className="font-semibold mb-4">Reporting Deadlines</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                            <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                                <p className={`text-sm ${themeClasses.textMuted} mb-1`}>CDP</p>
                                                <p className="font-medium">{reportingRequirements.deadlines.cdp}</p>
                                            </div>
                                            <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                                <p className={`text-sm ${themeClasses.textMuted} mb-1`}>Annual Report</p>
                                                <p className="font-medium">{reportingRequirements.deadlines.annual_report}</p>
                                            </div>
                                            <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                                <p className={`text-sm ${themeClasses.textMuted} mb-1`}>Sustainability Report</p>
                                                <p className="font-medium">{reportingRequirements.deadlines.sustainability_report}</p>
                                            </div>
                                            <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                                <p className={`text-sm ${themeClasses.textMuted} mb-1`}>Regulatory Submissions</p>
                                                <p className="font-medium">{reportingRequirements.deadlines.regulatory_submissions}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Verification & Penalties */}
                                {reportingRequirements && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                            <h5 className="font-medium mb-2">Verification Status</h5>
                                            <div className="flex items-center gap-2">
                                                <div className={`w-3 h-3 rounded-full ${reportingRequirements.verification_required ? 'bg-yellow-500' : 'bg-gray-500'}`}></div>
                                                <span className="text-sm">
                                                    {reportingRequirements.verification_required ? 'Verification Required' : 'No Verification Required'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                            <h5 className="font-medium mb-2">Non-Compliance Penalties</h5>
                                            <p className="text-sm">{reportingRequirements.penalties_non_compliance}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Recommendations */}
                                {complianceRecommendations.length > 0 && (
                                    <div className="mt-8">
                                        <h4 className="font-semibold mb-4">Compliance Recommendations</h4>
                                        <div className="space-y-4">
                                            {complianceRecommendations.map((rec, index) => (
                                                <div key={index} className={`p-4 rounded-xl border ${themeClasses.border}`}>
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div>
                                                            <h5 className="font-medium">{rec.category}</h5>
                                                            <p className="text-sm text-gray-500">{rec.action}</p>
                                                        </div>
                                                        <span className={`px-2 py-1 rounded-full text-xs ${rec.priority === 'High' ? 'bg-red-500/20 text-red-500' : rec.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-gray-500/20 text-gray-500'}`}>
                                                            {rec.priority} Priority
                                                        </span>
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                        <div>
                                                            <p className={`text-xs ${themeClasses.textMuted}`}>Impact</p>
                                                            <p className="text-sm font-medium">{rec.impact}</p>
                                                        </div>
                                                        <div>
                                                            <p className={`text-xs ${themeClasses.textMuted}`}>Compliance Benefit</p>
                                                            <p className="text-sm font-medium">{rec.compliance_benefit}</p>
                                                        </div>
                                                        <div>
                                                            <p className={`text-xs ${themeClasses.textMuted}`}>Timeframe</p>
                                                            <p className="text-sm font-medium">{rec.timeframe}</p>
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

                    {/* Analytics Tab */}
                    {activeTab === "analytics" && graphs && (
                        <div className="space-y-8">
                            <div className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl border ${themeClasses.border} p-6 shadow-lg ${isDarkMode ? "shadow-black/20" : "shadow-gray-200/50"}`}>
                                <h3 className="text-lg font-semibold mb-6">Advanced Analytics</h3>

                                {/* Cumulative Emissions */}
                                {graphs.cumulative_emissions && (
                                    <div className="mb-8">
                                        <h4 className="font-semibold mb-4">Cumulative GHG Emissions</h4>
                                        <div className="h-80">
                                            <Line
                                                data={{
                                                    labels: graphs.cumulative_emissions.labels,
                                                    datasets: graphs.cumulative_emissions.datasets.map((dataset, index) => ({
                                                        ...dataset,
                                                        borderColor: chartColors.border[index % chartColors.border.length],
                                                        backgroundColor: chartColors.background[index % chartColors.background.length],
                                                        tension: 0.4,
                                                        fill: index === 0,
                                                        borderDash: dataset.borderDash || undefined,
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
                                        </div>
                                    </div>
                                )}

                                {/* Scope Trends */}
                                {graphs.scope_trends && (
                                    <div className="mb-8">
                                        <h4 className="font-semibold mb-4">Emissions Trends by Scope</h4>
                                        <div className="h-80">
                                            <Line
                                                data={{
                                                    labels: graphs.scope_trends.labels,
                                                    datasets: graphs.scope_trends.datasets.map((dataset, index) => ({
                                                        ...dataset,
                                                        borderColor: [scope1Color, scope2Color, scope3Color][index],
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
                                                            title: {
                                                                display: true,
                                                                text: 'tCO₂e',
                                                                color: themeClasses.chartText,
                                                            }
                                                        }
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Scope 1 Breakdown */}
                                {graphs.scope1_breakdown && (
                                    <div className="mb-8">
                                        <h4 className="font-semibold mb-4">Scope 1 Detailed Breakdown</h4>
                                        <div className="h-80">
                                            <Bar
                                                data={{
                                                    labels: graphs.scope1_breakdown.labels,
                                                    datasets: graphs.scope1_breakdown.datasets.map((dataset, index) => ({
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
                                                            display: false
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
                                        </div>
                                    </div>
                                )}

                                {/* Scope 3 Categories */}
                                {graphs.scope3_categories && (
                                    <div>
                                        <h4 className="font-semibold mb-4">Scope 3 Category Analysis</h4>
                                        <div className="h-80">
                                            <Bar
                                                data={{
                                                    labels: graphs.scope3_categories.labels,
                                                    datasets: graphs.scope3_categories.datasets.map((dataset, index) => ({
                                                        ...dataset,
                                                        backgroundColor: chartColors.background[index % chartColors.background.length],
                                                        borderColor: chartColors.border[index % chartColors.border.length],
                                                        borderWidth: 1,
                                                    }))
                                                }}
                                                options={{
                                                    indexAxis: 'y' as const,
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                    plugins: {
                                                        legend: {
                                                            display: false
                                                        },
                                                    },
                                                    scales: {
                                                        x: {
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