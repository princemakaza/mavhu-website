// import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landingpage from "./pages/User_Pages/landing page";
import CustomerPage from "./pages/User_Pages/Customer";
import ServicesPage from "./pages/User_Pages/Services_Page";
import AboutPage from "./pages/User_Pages/About_page";
import PricingPage from "./pages/User_Pages/Pricing_Page";
import Contact from "./pages/User_Pages/Contact_Page";
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
      </Routes>
    </Router>
  );
}

export default App;
