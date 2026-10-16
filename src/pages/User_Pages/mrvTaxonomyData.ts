// MAvHU MRV Taxonomy v1.0 (12 October 2026), the source for TaxonomyPage.

export type Status = "Live" | "Designed" | "Planned";

export interface TaxonomyElement {
    code: string;
    name: string;
    description: string;
    layer: string;
    status: Status;
}

export interface Domain {
    num: number;
    title: string;
    blurb: string;
    elements: TaxonomyElement[];
}

export const taxonomyVersion = { version: "1.0", updated: "12 October 2026" };

export const standards = ["Verra VCS", "Gold Standard", "ICVCM CCP", "Article 6", "ETF / BTR", "EUDR"];

export const domains: Domain[] = [
    {
        "num": 1,
        "title": "Data Capture",
        "blurb": "Everything that brings a field, a plot or a record into the evidence chain.",
        "elements": [
            {
                "code": "1.1.1",
                "name": "GPS polygons",
                "description": "Plot boundary captured as a geolocated polygon.",
                "layer": "Sky / Earth",
                "status": "Live"
            },
            {
                "code": "1.1.2",
                "name": "Forest boundaries",
                "description": "Stand and forest boundaries for carbon and land-use projects.",
                "layer": "Sky",
                "status": "Live"
            },
            {
                "code": "1.1.3",
                "name": "Plot registration",
                "description": "Plot registered once and referenced thereafter.",
                "layer": "AI",
                "status": "Live"
            },
            {
                "code": "1.2.1",
                "name": "Farmer consent records",
                "description": "Consent captured from field teams, partners and existing registries.",
                "layer": "Earth",
                "status": "Live"
            },
            {
                "code": "1.2.2",
                "name": "Data source provenance",
                "description": "Every record traceable to its origin.",
                "layer": "AI",
                "status": "Live"
            },
            {
                "code": "1.2.3",
                "name": "Chain of custody",
                "description": "Unbroken custody from capture to disclosure.",
                "layer": "AI",
                "status": "Live"
            },
            {
                "code": "1.3.1",
                "name": "Manual entry",
                "description": "Field-team manual entry.",
                "layer": "Earth",
                "status": "Live"
            },
            {
                "code": "1.3.2",
                "name": "Bulk upload",
                "description": "Bulk upload of existing records.",
                "layer": "API",
                "status": "Live"
            },
            {
                "code": "1.3.3",
                "name": "API ingestion",
                "description": "Programmatic ingestion from partner systems.",
                "layer": "API",
                "status": "Live"
            },
            {
                "code": "1.3.4",
                "name": "Registry data import",
                "description": "Import from existing registries.",
                "layer": "API",
                "status": "Live"
            }
        ]
    },
    {
        "num": 2,
        "title": "Earth Observation",
        "blurb": "The Sky layer: satellite and reanalysis evidence.",
        "elements": [
            {
                "code": "2.1.1",
                "name": "Optical imagery",
                "description": "Satellite optical imagery for land-cover assessment.",
                "layer": "Sky",
                "status": "Live"
            },
            {
                "code": "2.1.2",
                "name": "Radar",
                "description": "Radar imagery for cloud-penetrating observation.",
                "layer": "Sky",
                "status": "Designed"
            },
            {
                "code": "2.1.3",
                "name": "Reanalysis datasets",
                "description": "Reanalysis data already in operational use.",
                "layer": "Sky",
                "status": "Live"
            },
            {
                "code": "2.2",
                "name": "Drone validation layer",
                "description": "Drone imagery validating satellite evidence.",
                "layer": "Sky",
                "status": "Designed"
            },
            {
                "code": "2.3.1",
                "name": "Deforestation detection",
                "description": "Clearing flagged against the regulatory cut-off.",
                "layer": "Sky",
                "status": "Live"
            },
            {
                "code": "2.3.2",
                "name": "Degradation detection",
                "description": "Degradation flagged before it becomes a credit event.",
                "layer": "Sky",
                "status": "Live"
            },
            {
                "code": "2.3.3",
                "name": "Overlap detection",
                "description": "Overlapping claims on the same land flagged.",
                "layer": "Sky",
                "status": "Live"
            },
            {
                "code": "2.3.4",
                "name": "Regulatory cut-off check",
                "description": "Land-cover change checked against 31 December 2020.",
                "layer": "Sky",
                "status": "Live"
            }
        ]
    },
    {
        "num": 3,
        "title": "Ground-truthing",
        "blurb": "The Earth layer: field verification where satellite evidence is uncertain.",
        "elements": [
            {
                "code": "3.1",
                "name": "Targeted field verification",
                "description": "Field checks where satellite evidence is uncertain or risk is high.",
                "layer": "Earth",
                "status": "Live"
            },
            {
                "code": "3.2",
                "name": "Sampling design",
                "description": "Sample-based checks of registers and programme areas.",
                "layer": "Earth",
                "status": "Live"
            },
            {
                "code": "3.3",
                "name": "Bayesian optimisation",
                "description": "Bayesian optimisation directing where to ground-truth.",
                "layer": "Earth",
                "status": "Designed"
            },
            {
                "code": "3.4",
                "name": "Field team data capture",
                "description": "Structured capture by field teams.",
                "layer": "Earth",
                "status": "Live"
            }
        ]
    },
    {
        "num": 4,
        "title": "Quantification",
        "blurb": "Turning evidence into measured indicators.",
        "elements": [
            {
                "code": "4.1",
                "name": "Carbon & GHG indicators",
                "description": "Carbon and GHG quantified under recognised standards.",
                "layer": "AI",
                "status": "Live"
            },
            {
                "code": "4.2",
                "name": "Land-health indicators",
                "description": "Land-health indicators.",
                "layer": "AI",
                "status": "Live"
            },
            {
                "code": "4.3",
                "name": "Soil indicators",
                "description": "Soil indicators from the estate pilot.",
                "layer": "AI",
                "status": "Live"
            },
            {
                "code": "4.4",
                "name": "Crop indicators",
                "description": "Crop indicators from the estate pilot.",
                "layer": "AI",
                "status": "Live"
            },
            {
                "code": "4.5",
                "name": "Baselines",
                "description": "Baseline evidence for project design.",
                "layer": "AI",
                "status": "Designed"
            },
            {
                "code": "4.6",
                "name": "Additionality",
                "description": "Additionality evidence for project design.",
                "layer": "AI",
                "status": "Designed"
            },
            {
                "code": "4.7",
                "name": "Permanence & reversal",
                "description": "Permanence and reversal monitoring.",
                "layer": "AI",
                "status": "Designed"
            },
            {
                "code": "4.8",
                "name": "Leakage",
                "description": "Leakage checks.",
                "layer": "AI",
                "status": "Designed"
            }
        ]
    },
    {
        "num": 5,
        "title": "Verification & Assurance",
        "blurb": "The rail under every step of the evidence chain.",
        "elements": [
            {
                "code": "5.1",
                "name": "Uncertainty quantification",
                "description": "Uncertainty quantified at every stage and combined per output.",
                "layer": "AI",
                "status": "Designed"
            },
            {
                "code": "5.2",
                "name": "Conservative deduction",
                "description": "Conservative deduction where uncertainty cannot be quantified.",
                "layer": "AI",
                "status": "Designed"
            },
            {
                "code": "5.3",
                "name": "QA/QC & cross-checks",
                "description": "Cross-checks against other data sources.",
                "layer": "AI",
                "status": "Designed"
            },
            {
                "code": "5.4",
                "name": "Human review & approval",
                "description": "Statistical flags route to human reviewers; nothing auto-published.",
                "layer": "AI",
                "status": "Live"
            },
            {
                "code": "5.5",
                "name": "Failure & backup protocol",
                "description": "Backup data plan when monitoring fails.",
                "layer": "AI",
                "status": "Designed"
            },
            {
                "code": "5.6",
                "name": "VVB verification",
                "description": "Independent VVBs accredited to ISO 14065 verify.",
                "layer": "External (VVB)",
                "status": "Planned"
            },
            {
                "code": "5.7",
                "name": "Algorithm verification",
                "description": "The calculation algorithm verified, not only its outputs.",
                "layer": "AI",
                "status": "Planned"
            }
        ]
    },
    {
        "num": 6,
        "title": "Evidence & Audit",
        "blurb": "The persistent, exportable evidence base.",
        "elements": [
            {
                "code": "6.1",
                "name": "Tamper-evident audit trail",
                "description": "Locked, tamper-proof audit trail with full export.",
                "layer": "AI",
                "status": "Live"
            },
            {
                "code": "6.2",
                "name": "Evidence export",
                "description": "Audit-ready evidence exported for due diligence.",
                "layer": "API",
                "status": "Live"
            },
            {
                "code": "6.3",
                "name": "Data ownership",
                "description": "Full ownership and export-ready data at any time.",
                "layer": "All layers",
                "status": "Live"
            },
            {
                "code": "6.4",
                "name": "Retention & archiving",
                "description": "Persistent trail replacing data rebuilt each cycle.",
                "layer": "AI",
                "status": "Live"
            }
        ]
    },
    {
        "num": 7,
        "title": "Reporting & Disclosure",
        "blurb": "Where the evidence goes.",
        "elements": [
            {
                "code": "7.1",
                "name": "EUDR due diligence",
                "description": "Plot-level GPS, deforestation-free, legality, due diligence statement.",
                "layer": "API",
                "status": "Live"
            },
            {
                "code": "7.2",
                "name": "CBAM",
                "description": "Carbon border adjustment evidence.",
                "layer": "API",
                "status": "Designed"
            },
            {
                "code": "7.3",
                "name": "Scope 3 & ESG",
                "description": "Scope 3 and ESG evidence on verified plot data.",
                "layer": "API",
                "status": "Live"
            },
            {
                "code": "7.4",
                "name": "BTR & GHG inventory",
                "description": "Mitigation and land-sector inputs to a Biennial Transparency Report.",
                "layer": "API",
                "status": "Designed"
            },
            {
                "code": "7.5",
                "name": "NDC tracking",
                "description": "Indicators used to track progress against an NDC.",
                "layer": "API",
                "status": "Designed"
            },
            {
                "code": "7.6",
                "name": "Article 6 reporting",
                "description": "Authorisation, first transfer, corresponding adjustments.",
                "layer": "API",
                "status": "Designed"
            },
            {
                "code": "7.7",
                "name": "Credit issuance evidence",
                "description": "Evidence supporting credit issuance.",
                "layer": "API",
                "status": "Designed"
            }
        ]
    },
    {
        "num": 8,
        "title": "Governance & Integrity",
        "blurb": "How the platform itself is governed.",
        "elements": [
            {
                "code": "8.1",
                "name": "Tool approval & re-approval",
                "description": "Documented approval before deployment and re-approval triggers.",
                "layer": "All layers",
                "status": "Designed"
            },
            {
                "code": "8.2",
                "name": "Incident handling",
                "description": "Defined incident detection, remedy and disclosure.",
                "layer": "All layers",
                "status": "Designed"
            },
            {
                "code": "8.3",
                "name": "Conflict of interest",
                "description": "Policy separating tool provision from verification.",
                "layer": "All layers",
                "status": "Designed"
            },
            {
                "code": "8.4",
                "name": "Cybersecurity & data integrity",
                "description": "Designed to ISO/IEC 27001 controls (certification in progress); tamper-evident logging.",
                "layer": "All layers",
                "status": "Designed"
            },
            {
                "code": "8.5",
                "name": "KYC/AML at registration",
                "description": "Know-your-counterparty checks at registration.",
                "layer": "All layers",
                "status": "Designed"
            }
        ]
    },
    {
        "num": 9,
        "title": "Interoperability & Registry",
        "blurb": "How MAvHU data moves into other systems.",
        "elements": [
            {
                "code": "9.1",
                "name": "API delivery",
                "description": "Delivery into client systems by API.",
                "layer": "API",
                "status": "Live"
            },
            {
                "code": "9.2",
                "name": "Common data model",
                "description": "Common data model, identifiers and metadata.",
                "layer": "API",
                "status": "Designed"
            },
            {
                "code": "9.3",
                "name": "Unique unit identifiers",
                "description": "Every unit carries a unique identifier.",
                "layer": "API",
                "status": "Designed"
            },
            {
                "code": "9.4",
                "name": "National registry integration",
                "description": "Structured to feed national carbon registries.",
                "layer": "API",
                "status": "Designed"
            },
            {
                "code": "9.5",
                "name": "Article 6 registry",
                "description": "Support for Article 6.2 and 6.4 registry requirements.",
                "layer": "API",
                "status": "Designed"
            }
        ]
    }
];


// One flag per entry in `standards`: true where the element supports evidence for that framework's requirements.
export const standardsMapping: [string, boolean[]][] = [
    ["GPS polygons", [true, true, true, true, true, true]],
    ["Farmer consent records", [true, true, true, false, false, true]],
    ["Chain of custody", [true, true, true, true, true, true]],
    ["Optical imagery", [true, true, true, true, true, true]],
    ["Radar", [true, true, true, false, false, true]],
    ["Reanalysis datasets", [true, true, true, false, true, false]],
    ["Drone validation layer", [true, true, true, false, false, false]],
    ["Deforestation detection", [true, true, true, false, true, true]],
    ["Degradation detection", [true, true, true, true, true, false]],
    ["Overlap detection", [true, true, true, true, false, false]],
    ["Regulatory cut-off check", [false, false, false, false, false, true]],
    ["Targeted field verification", [true, true, true, true, true, true]],
    ["Bayesian optimisation", [false, false, false, false, false, false]],
    ["Carbon & GHG indicators", [true, true, true, true, true, false]],
    ["Land-health indicators", [true, true, false, false, true, false]],
    ["Baselines", [true, true, true, true, false, false]],
    ["Additionality", [true, true, true, true, false, false]],
    ["Permanence & reversal", [true, true, true, true, false, false]],
    ["Leakage", [true, true, true, true, false, false]],
    ["Uncertainty quantification", [true, true, true, true, true, false]],
    ["Conservative deduction", [true, true, true, true, false, false]],
    ["QA/QC & cross-checks", [true, true, true, true, true, false]],
    ["Human review & approval", [true, true, true, false, false, false]],
    ["Failure & backup protocol", [false, true, false, false, false, false]],
    ["VVB verification", [true, true, true, true, false, false]],
    ["Algorithm verification", [false, true, false, false, false, false]],
    ["Tamper-evident audit trail", [true, true, true, true, true, true]],
    ["Data ownership", [false, false, false, false, false, false]],
    ["EUDR due diligence", [false, false, false, false, false, true]],
    ["CBAM", [false, false, false, false, false, false]],
    ["Scope 3 & ESG", [false, false, false, false, false, false]],
    ["BTR & GHG inventory", [false, false, false, false, true, false]],
    ["NDC tracking", [false, false, false, false, true, false]],
    ["Article 6 reporting", [false, false, false, true, false, false]],
    ["Credit issuance evidence", [true, true, true, true, false, false]],
    ["Tool approval & re-approval", [false, false, true, false, false, false]],
    ["Incident handling", [false, false, true, false, false, false]],
    ["Conflict of interest", [false, false, true, false, false, false]],
    ["Cybersecurity & data integrity", [false, false, true, false, false, false]],
    ["KYC/AML at registration", [false, false, true, false, false, false]],
    ["API delivery", [false, false, false, false, false, false]],
    ["Common data model", [false, false, true, false, false, false]],
    ["Unique unit identifiers", [false, false, false, true, false, false]],
    ["National registry integration", [false, false, false, true, false, false]],
    ["Article 6 registry", [false, false, false, true, false, false]],
];
