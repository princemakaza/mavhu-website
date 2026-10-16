import { CheckCircle, Sprout, BarChart3, Database, GraduationCap } from "lucide-react";

// Single source for the service list shown in the navbar dropdown, footer,
// homepage "Our Services" section and the Services page.
// The navbar dropdown shows the first two useCases under each title.
const colors = {
  primaryDark: "#123E56",
  secondaryBlue: "#1F5C73",
  goldAccent: "#B89A2F",
};

export const servicesData = [
  {
    title: "MRV Infrastructure",
    description:
      "Independent, plot-level verification for commodity supply chains, carbon projects and climate programmes: one verified evidence chain from the field to disclosure.",
    useCases: ["carbon MRV", "verification", "EUDR due diligence", "Article 6 & BTR"],
    icon: <CheckCircle className="w-7 h-7" />,
    color: colors.secondaryBlue,
    hoverDetail:
      "Sovereign digital MRV built on Earth observation and local ground-truthing. Capture, verify from space, ground-truth, quantify, review and approve, then evidence and audit, with methods designed to the requirements of Verra VCS, Gold Standard and the ICVCM Core Carbon Principles.",
    route: "/services/mrv-infrastructure",
  },
  {
    title: "Agriculture Intelligence",
    description:
      "Field-verified intelligence for agricultural enterprises, supply chains and their financiers, from commercial estates to smallholder plots.",
    useCases: ["land-use monitoring", "supply-chain traceability", "Scope 3 & ESG", "carbon markets"],
    icon: <Sprout className="w-7 h-7" />,
    color: "#2E7D6B",
    hoverDetail:
      "From satellite to ground truth, MAvHU turns farm data into compliance, carbon market participation, credit and investment, delivered as screens, APIs and automated workflows across 13 production ESG APIs.",
    route: "/services/agriculture-intelligence",
  },
  {
    title: "Financial Intelligence",
    description:
      "Climate data infrastructure for banks, insurers, central banks and development finance institutions: from fragmented spreadsheets to a single, auditable source of ESG.",
    useCases: ["ESG reporting", "climate risk", "PCAF emissions", "IFRS S1/S2"],
    icon: <BarChart3 className="w-7 h-7" />,
    color: colors.goldAccent,
    hoverDetail:
      "ESG data collection, GHG accounting, PCAF financed and insurance emissions, NGFS scenario analysis through to Climate Value at Risk, and framework-mapped disclosure on a tamper-proof audit trail, hosted on AWS Cape Town.",
    route: "/services/financial-intelligence",
  },
  {
    title: "Climate APIs",
    description:
      "Plug-and-play climate and environmental intelligence APIs for integration into enterprise systems, finance platforms, and digital products.",
    useCases: ["risk scoring", "emissions data", "geospatial layers", "compliance systems"],
    icon: <Database className="w-7 h-7" />,
    color: "#2E7D6B",
    hoverDetail:
      "API endpoints covering land-use change, soil carbon, climate risk, MRV status, and ESG metrics, delivering verified data into core banking, ERP and data warehouse systems without manual re-entry.",
    route: "/services/api",
  },
  {
    title: "Training & Capacity Building",
    description:
      "Training programmes and field support that build climate data, MRV and compliance capacity for farmers, partners and institutions.",
    useCases: ["grower onboarding", "capacity building", "field compliance", "climate-smart practices"],
    icon: <GraduationCap className="w-7 h-7" />,
    color: colors.secondaryBlue,
    hoverDetail:
      "Structured training curricula covering climate-smart practices, MRV data collection and digital literacy, combined with mobile-first field tools for grower onboarding and farm-level compliance.",
    route: "/services/farm",
  },
];
