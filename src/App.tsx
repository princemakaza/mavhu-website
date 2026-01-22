// import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landingpage from "./pages/User_Pages/landing page";
import CustomerPage from "./pages/User_Pages/Customer";
import ServicesPage from "./pages/User_Pages/Services_Page";
import AboutPage from "./pages/User_Pages/About_page";
import PricingPage from "./pages/User_Pages/Pricing_Page";
import Contact from "./pages/User_Pages/Contact_Page";
import SignUpScreen from "./pages/User_Pages/mavhu_team/auth/sign_up";
import ConfirmOtpScreen from "./pages/User_Pages/mavhu_team/auth/confirm_otp";
import LoginScreen from "./pages/User_Pages/mavhu_team/auth/login";
import Dashboard from "./pages/User_Pages/mavhu_team/auth/dashboard/dashboard";
import CompanyManagementScreen from "./pages/User_Pages/mavhu_team/auth/dashboard/companies_management";
import SoilHealthCarbonEmissionScreen from "./pages/User_Pages/mavhu_team/apis/soil_health_carbon_screen";
import CropYieldScreen from "./pages/User_Pages/mavhu_team/apis/crop_yield_screen";
import GhgEmissionScreen from "./pages/User_Pages/mavhu_team/apis/ghg_emission_screen";
function App() {
  return (
    <Router>
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Landingpage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
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
    </Router>
  );
}

export default App;
