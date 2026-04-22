import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import PageLoader from "./pages/User_Pages/Pageloader";

// ─── Lazy-loaded pages ────────────────────────────────────────────────────────
// Every page is code-split into its own chunk. The browser only downloads
// a page's JS + assets when the user first navigates to it.
// The PageLoader component renders between route changes while the chunk loads.

// ── Public / marketing pages
const Landingpage = lazy(() => import("./pages/User_Pages/landing page"));
const SkyPage = lazy(() => import("./pages/User_Pages/SkyPage"));
const EarthPage = lazy(() => import("./pages/User_Pages/EarthPage"));
const AiPage = lazy(() => import("./pages/User_Pages/AiPage"));
const ServicesPage = lazy(() => import("./pages/User_Pages/Services_Page"));
const AboutPage = lazy(() => import("./pages/User_Pages/About_page"));
const RequestDemo = lazy(() => import("./pages/User_Pages/Request_Demo"));
const VaasPage = lazy(() => import("./pages/User_Pages/Vaas_Page"));
const DashboardPage = lazy(() => import("./pages/User_Pages/dashboard_page"));
const ApiPage = lazy(() => import("./pages/User_Pages/api_page"));
const FarmPage = lazy(() => import("./pages/User_Pages/FarmPage"));
const Contact = lazy(() => import("./pages/User_Pages/Contact_Page"));
const PricingPage = lazy(() => import("./pages/User_Pages/Pricing_Page"));
const CustomerPage = lazy(() => import("./pages/User_Pages/Customer"));

// ── Portal / auth pages
const SignUpScreen = lazy(() => import("./pages/User_Pages/mavhu_team/auth/sign_up"));
const ConfirmOtpScreen = lazy(() => import("./pages/User_Pages/mavhu_team/auth/confirm_otp"));
const LoginScreen = lazy(() => import("./pages/User_Pages/mavhu_team/auth/login"));
const Dashboard = lazy(() => import("./pages/User_Pages/mavhu_team/auth/dashboard/dashboard"));
const CompanyManagementScreen = lazy(() => import("./pages/User_Pages/mavhu_team/auth/dashboard/companies_management"));

// ── ESG dashboard sub-pages
const SoilHealthCarbonEmissionScreen = lazy(
  () => import("./pages/User_Pages/mavhu_team/apis/soil_health_carbon_screen")
);
const CropYieldScreen = lazy(
  () => import("./pages/User_Pages/mavhu_team/apis/crop_yield_screen")
);
const GhgEmissionScreen = lazy(
  () => import("./pages/User_Pages/mavhu_team/apis/ghg_emission_screen")
);

// ─── Scroll-to-top on every route change ────────────────────────────────────
// Placed inside <Router> so it has access to useLocation.
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instant scroll — no smooth behaviour so the user lands at top immediately
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return null;
};

// ─── App ─────────────────────────────────────────────────────────────────────
function App() {
  return (
    <Router>
      {/* Scroll reset must live inside Router */}
      <ScrollToTop />

      {/*
        Suspense wraps ALL routes so that:
        1. On initial load → PageLoader shows until the landing page chunk is ready
        2. On navigation   → PageLoader shows while the new page chunk downloads
           (images, fonts, etc. are fetched by each page's own component)
      */}
      <Suspense fallback={<PageLoader />}>
        <Routes>

          {/* ── Public / marketing ── */}
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

          {/* ── Portal / auth ── */}
          <Route path="/portal/register" element={<SignUpScreen />} />
          <Route path="/portal/login" element={<LoginScreen />} />
          <Route path="/portal/confirm_otp" element={<ConfirmOtpScreen />} />
          <Route path="/portal/dashboard" element={<Dashboard />} />
          <Route path="/portal/companies" element={<CompanyManagementScreen />} />

          {/* ── ESG dashboard ── */}
          <Route
            path="/portal/esg-dashboard/soil-health-carbon"
            element={<SoilHealthCarbonEmissionScreen />}
          />
          <Route
            path="/portal/esg-dashboard/soil-health-carbon/:companyId"
            element={<SoilHealthCarbonEmissionScreen />}
          />
          <Route
            path="/portal/esg-dashboard/crop-yield"
            element={<CropYieldScreen />}
          />
          <Route
            path="/portal/esg-dashboard/crop-yield/:companyId"
            element={<CropYieldScreen />}
          />
          <Route
            path="/portal/esg-dashboard/ghg-emissions"
            element={<GhgEmissionScreen />}
          />
          <Route
            path="/portal/esg-dashboard/ghg-emissions/:companyId"
            element={<GhgEmissionScreen />}
          />

        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;