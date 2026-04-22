// App.tsx
import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";

// Lazy load all page components
const Landingpage = lazy(() => import("./pages/User_Pages/landing page"));
const CustomerPage = lazy(() => import("./pages/User_Pages/Customer"));
const ServicesPage = lazy(() => import("./pages/User_Pages/Services_Page"));
const AboutPage = lazy(() => import("./pages/User_Pages/About_page"));
const PricingPage = lazy(() => import("./pages/User_Pages/Pricing_Page"));
const Contact = lazy(() => import("./pages/User_Pages/Contact_Page"));
const SignUpScreen = lazy(() => import("./pages/User_Pages/mavhu_team/auth/sign_up"));
const ConfirmOtpScreen = lazy(() => import("./pages/User_Pages/mavhu_team/auth/confirm_otp"));
const LoginScreen = lazy(() => import("./pages/User_Pages/mavhu_team/auth/login"));
const Dashboard = lazy(() => import("./pages/User_Pages/mavhu_team/auth/dashboard/dashboard"));
const CompanyManagementScreen = lazy(() => import("./pages/User_Pages/mavhu_team/auth/dashboard/companies_management"));
const SoilHealthCarbonEmissionScreen = lazy(() => import("./pages/User_Pages/mavhu_team/apis/soil_health_carbon_screen"));
const CropYieldScreen = lazy(() => import("./pages/User_Pages/mavhu_team/apis/crop_yield_screen"));
const GhgEmissionScreen = lazy(() => import("./pages/User_Pages/mavhu_team/apis/ghg_emission_screen"));
const RequestDemo = lazy(() => import("./pages/User_Pages/Request_Demo"));
const VaasPage = lazy(() => import("./pages/User_Pages/Vaas_Page"));
const DashboardPage = lazy(() => import("./pages/User_Pages/dashboard_page"));
const ApiPage = lazy(() => import("./pages/User_Pages/api_page"));
const FarmPage = lazy(() => import("./pages/User_Pages/FarmPage"));
const SkyPage = lazy(() => import("./pages/User_Pages/SkyPage"));
const EarthPage = lazy(() => import("./pages/User_Pages/EarthPage"));
const AiPage = lazy(() => import("./pages/User_Pages/AiPage"));

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Use "instant" instead of "smooth" for navigation
    });
  }, [pathname]);

  return null;
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Landingpage />} />
          <Route path="/sky" element={<SkyPage />} />
          <Route path="/earth" element={<EarthPage />} />
          <Route path="/ai" element={<AiPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/request-demo" element={<RequestDemo />} />
          <Route path="/services/vaas" element={<VaasPage />} />
          <Route path="/services/dashboard" element={<DashboardPage />} />
          <Route path="/services/api" element={<ApiPage />} />
          <Route path="/services/farm" element={<FarmPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/customer" element={<CustomerPage />} />
          <Route path="/portal/register" element={<SignUpScreen />} />
          <Route path="/portal/login" element={<LoginScreen />} />
          <Route path="/portal/confirm_otp" element={<ConfirmOtpScreen />} />
          <Route path="/portal/dashboard" element={<Dashboard />} />
          <Route path="/portal/companies" element={<CompanyManagementScreen />} />
          <Route path="/portal/esg-dashboard/soil-health-carbon" element={<SoilHealthCarbonEmissionScreen />} />
          <Route path="/portal/esg-dashboard/soil-health-carbon/:companyId" element={<SoilHealthCarbonEmissionScreen />} />
          <Route path="/portal/esg-dashboard/crop-yield" element={<CropYieldScreen />} />
          <Route path="/portal/esg-dashboard/crop-yield/:companyId" element={<CropYieldScreen />} />
          <Route path="/portal/esg-dashboard/ghg-emissions" element={<GhgEmissionScreen />} />
          <Route path="/portal/esg-dashboard/ghg-emissions/:companyId" element={<GhgEmissionScreen />} />
        </Routes>
      </Suspense>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;