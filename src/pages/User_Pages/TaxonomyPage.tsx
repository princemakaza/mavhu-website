import React from "react";
import { motion, Variants } from "framer-motion";
import {
    ArrowRight,
    Download,
    Boxes,
    Scale,
    Compass,
    Check,
    Minus,
    Info,
    History,
    FileText,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import Footer from "../../components/Footer";
import Navbar from "../../components/navbar";
import { useNavigate } from "react-router-dom";
import { domains, standards, standardsMapping, taxonomyVersion, Status } from "./mrvTaxonomyData";

const PDF_URL = "/downloads/MAvHU-MRV-Taxonomy.pdf";

// ─── Color Palette (matching main site) ─────────────────────────────────────
const colors = {
    primaryDark: "#123E56",
    secondaryBlue: "#1F5C73",
    goldAccent: "#B89A2F",
    lightBackground: "#F4FAFA",
    softGrey: "#DCE7E8",
    white: "#FFFFFF",
};
const green = "#2E7D6B";

const statusStyles: Record<Status, { color: string; bg: string; description: string }> = {
    Live: { color: green, bg: `${green}15`, description: "In production." },
    Designed: { color: colors.secondaryBlue, bg: `${colors.secondaryBlue}15`, description: "Built to the requirements of the relevant standard, not yet live or certified." },
    Planned: { color: colors.goldAccent, bg: `${colors.goldAccent}18`, description: "On the roadmap." },
};

// ─── Animation Variants ─────────────────────────────────────────────────────
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};
const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const StatusBadge: React.FC<{ status: Status }> = ({ status }) => (
    <span
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
        style={{ backgroundColor: statusStyles[status].bg, color: statusStyles[status].color }}
    >
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: statusStyles[status].color }} />
        {status}
    </span>
);

const DownloadButton: React.FC = () => (
    <a
        href={PDF_URL}
        download
        className="group px-8 py-3 rounded-xl font-bold transition-all hover:scale-105 shadow-lg inline-flex items-center justify-center gap-2 whitespace-nowrap"
        style={{ background: `linear-gradient(135deg, ${colors.goldAccent}, #D4A82E)`, color: "#fff" }}
    >
        <Download className="w-4 h-4 group-hover:translate-y-0.5 transition" /> Download PDF
    </a>
);

const TaxonomyPage: React.FC = () => {
    const navigate = useNavigate();
    const [statusFilter, setStatusFilter] = React.useState<Status | "All">("All");

    const elementCount = domains.reduce((n, d) => n + d.elements.length, 0);
    const statusCounts = domains
        .flatMap((d) => d.elements)
        .reduce<Record<Status, number>>((acc, el) => ({ ...acc, [el.status]: acc[el.status] + 1 }), { Live: 0, Designed: 0, Planned: 0 });

    const uses = [
        {
            title: "Product architecture",
            description: "A shared vocabulary for what MAvHU does.",
            icon: <Boxes className="w-6 h-6" />,
            color: colors.secondaryBlue,
        },
        {
            title: "Standards crosswalk",
            description: "The evidence that MAvHU's methods map to Verra VCS, Gold Standard, the ICVCM Core Carbon Principles, Article 6 of the Paris Agreement, the Enhanced Transparency Framework and EUDR.",
            icon: <Scale className="w-6 h-6" />,
            color: colors.goldAccent,
        },
        {
            title: "Engagement index",
            description: "The structure a stakeholder walks through in a demonstration.",
            icon: <Compass className="w-6 h-6" />,
            color: green,
        },
    ];

    const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });


    return (
        <div
            className="min-h-screen overflow-x-hidden"
            style={{ backgroundColor: colors.lightBackground, color: colors.primaryDark }}
        >
            <Helmet>
                <title>MAvHU MRV Taxonomy – MAvHU Africa</title>
                <meta
                    name="description"
                    content="The MAvHU MRV Taxonomy: the classification framework behind MAvHU's MRV infrastructure, mapped to Verra VCS, Gold Standard, ICVCM Core Carbon Principles, Article 6, the Enhanced Transparency Framework and EUDR."
                />
                <link rel="canonical" href="https://mavhuafrica.com/taxonomy" />
                <meta property="og:title" content="MAvHU MRV Taxonomy" />
                <meta property="og:description" content="Every element of the MRV evidence chain, from the capture of a plot boundary to the disclosure of a verified outcome, mapped to the standards it serves." />
                <meta property="og:url" content="https://mavhuafrica.com/taxonomy" />
            </Helmet>

            {/* Global fonts (same as main) */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Serif:wght@400;600;700&display=swap');
        * { font-family: 'IBM Plex Sans', 'Inter', system-ui, sans-serif; }
        h1, h2, h3, .serif { font-family: 'IBM Plex Serif', Georgia, serif; }
        .gradient-text {
          background: linear-gradient(135deg, ${colors.goldAccent}, #D4A82E);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .domain-section { scroll-margin-top: 140px; }
      `}</style>

            <Navbar />

            {/* ─── Hero ─────────────────────────────────────────────────────────── */}
            <section
                className="relative pt-32 pb-20 sm:pt-36 sm:pb-24 overflow-hidden text-white"
                style={{ background: `linear-gradient(135deg, ${colors.primaryDark}, ${colors.secondaryBlue})` }}
            >
                <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ backgroundColor: colors.goldAccent }} />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-3xl">
                        <p className="text-xs font-semibold tracking-widest uppercase mb-5 text-white/70">
                            Framework · Version {taxonomyVersion.version} · Updated {taxonomyVersion.updated}
                        </p>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            MAvHU <span className="gradient-text">MRV Taxonomy</span>
                        </h1>
                        <p className="text-base sm:text-lg leading-relaxed text-white/85 mb-10">
                            The classification framework behind MAvHU's MRV infrastructure: every element of the evidence
                            chain, from the capture of a plot boundary to the disclosure of a verified outcome, mapped to
                            the standards it serves.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <DownloadButton />
                            <button
                                onClick={() => scrollTo("domains")}
                                className="px-8 py-3 rounded-xl font-semibold border-2 border-white/30 transition-all hover:bg-white/10 inline-flex items-center justify-center gap-2"
                            >
                                Explore the Domains <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>

                    {/* Key figures */}
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-14"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                    >
                        {[
                            { value: domains.length, label: "Domains" },
                            { value: elementCount, label: "Elements" },
                            { value: standards.length, label: "Frameworks mapped" },
                            { value: 4, label: "Layers: Sky, Earth, AI, API" },
                        ].map((fig) => (
                            <motion.div key={fig.label} variants={cardVariants} className="rounded-xl p-5 bg-white/10 border border-white/15">
                                <div className="serif text-3xl sm:text-4xl font-bold" style={{ color: "#D4A82E" }}>{fig.value}</div>
                                <div className="text-xs sm:text-sm text-white/70 mt-1">{fig.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ─── Why the taxonomy exists ──────────────────────────────────────── */}
            <motion.section
                className="py-20 relative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeInUp}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            One structure, <span className="gradient-text">three uses</span>
                        </h2>
                        <p className="text-lg max-w-3xl mx-auto" style={{ color: `${colors.primaryDark}AA` }}>
                            Adding a framework is a new column in the mapping, not a rebuild of the platform.
                        </p>
                    </div>
                    <motion.div
                        className="grid md:grid-cols-3 gap-6"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-40px" }}
                    >
                        {uses.map((use) => (
                            <motion.div key={use.title} variants={cardVariants} className="bg-white rounded-2xl p-7 border border-[#DCE7E8]">
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                                    style={{ backgroundColor: `${use.color}12`, border: `1px solid ${use.color}25`, color: use.color }}
                                >
                                    {use.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{use.title}</h3>
                                <p className="text-sm leading-relaxed" style={{ color: `${colors.primaryDark}80` }}>{use.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>

                    <div
                        className="mt-8 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between"
                        style={{ backgroundColor: `${colors.secondaryBlue}0D`, borderLeft: `4px solid ${colors.secondaryBlue}` }}
                    >
                        <p className="text-sm leading-relaxed">
                            This taxonomy is the reference for MAvHU's <strong>MRV Infrastructure</strong>: where the
                            profile makes a claim, the taxonomy identifies the element behind it.
                        </p>
                        <button
                            onClick={() => navigate("/services/mrv-infrastructure")}
                            className="inline-flex items-center gap-2 font-semibold text-sm whitespace-nowrap hover:gap-3 transition-all"
                            style={{ color: colors.secondaryBlue }}
                        >
                            View MRV Infrastructure <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </motion.section>

            {/* ─── The nine domains ─────────────────────────────────────────────── */}
            <section id="domains" className="pb-20 relative domain-section">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            The <span className="gradient-text">nine domains</span>
                        </h2>
                        <p className="text-lg max-w-3xl mx-auto" style={{ color: `${colors.primaryDark}AA` }}>
                            Nine domains cover the full evidence chain. Each element carries a code, a description, the
                            MAvHU layer it belongs to (Sky, Earth, AI or API) and a status.
                        </p>
                    </div>

                    {/* Status legend */}
                    <div className="grid sm:grid-cols-3 gap-3 mb-8">
                        {(Object.keys(statusStyles) as Status[]).map((s) => (
                            <div key={s} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-[#DCE7E8]">
                                <StatusBadge status={s} />
                                <span className="text-xs leading-relaxed" style={{ color: `${colors.primaryDark}99` }}>
                                    {statusStyles[s].description}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Sticky domain nav + status filter */}
                    <div
                        className="sticky top-16 z-30 -mx-4 px-4 sm:mx-0 sm:px-4 py-3 mb-8 backdrop-blur-xl sm:rounded-2xl border-y sm:border"
                        style={{ backgroundColor: `${colors.white}E6`, borderColor: colors.softGrey }}
                    >
                        <div className="flex flex-col lg:flex-row lg:items-center gap-3 justify-between">
                            <nav className="flex gap-2 overflow-x-auto" aria-label="Jump to a domain">
                                {domains.map((d) => (
                                    <button
                                        key={d.num}
                                        onClick={() => scrollTo(`d${d.num}`)}
                                        title={d.title}
                                        className="flex-shrink-0 w-10 h-10 rounded-lg font-bold text-sm border transition-all hover:scale-105"
                                        style={{ borderColor: colors.softGrey, color: colors.secondaryBlue, backgroundColor: colors.white }}
                                    >
                                        {d.num}
                                    </button>
                                ))}
                            </nav>
                            <div className="flex gap-2 overflow-x-auto" role="group" aria-label="Filter by status">
                                {(["All", "Live", "Designed", "Planned"] as const).map((f) => {
                                    const active = statusFilter === f;
                                    const count = f === "All" ? elementCount : statusCounts[f];
                                    return (
                                        <button
                                            key={f}
                                            onClick={() => setStatusFilter(f)}
                                            aria-pressed={active}
                                            className="flex-shrink-0 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all"
                                            style={{
                                                backgroundColor: active ? colors.primaryDark : "transparent",
                                                color: active ? colors.white : `${colors.primaryDark}AA`,
                                            }}
                                        >
                                            {f} <span className="opacity-60 font-normal">({count})</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {domains.map((domain) => {
                            const visible = domain.elements.filter((el) => statusFilter === "All" || el.status === statusFilter);
                            return (
                                <motion.div
                                    key={domain.num}
                                    id={`d${domain.num}`}
                                    className="domain-section bg-white rounded-2xl border border-[#DCE7E8] overflow-hidden"
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "-40px" }}
                                    variants={cardVariants}
                                >
                                    <div className="flex items-start gap-5 p-6 sm:p-8 border-b border-[#DCE7E8]" style={{ backgroundColor: `${colors.lightBackground}` }}>
                                        <span className="serif text-4xl sm:text-5xl font-bold gradient-text leading-none">{domain.num}</span>
                                        <div className="flex-1">
                                            <h3 className="text-xl sm:text-2xl font-bold mb-1">{domain.title}</h3>
                                            <p className="text-sm" style={{ color: `${colors.primaryDark}99` }}>{domain.blurb}</p>
                                        </div>
                                        <span className="hidden sm:inline text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: `${colors.secondaryBlue}12`, color: colors.secondaryBlue }}>
                                            {domain.elements.length} elements
                                        </span>
                                    </div>

                                    {/* Column headings (desktop) */}
                                    <div
                                        className="hidden md:grid grid-cols-[72px_1.1fr_2fr_130px_110px] gap-4 px-8 py-3 text-xs font-bold uppercase tracking-wider border-b"
                                        style={{ color: `${colors.primaryDark}80`, borderColor: colors.softGrey }}
                                    >
                                        <span>Code</span><span>Element</span><span>Description</span><span>Layer</span><span>Status</span>
                                    </div>

                                    {visible.length === 0 ? (
                                        <p className="px-8 py-6 text-sm italic" style={{ color: `${colors.primaryDark}80` }}>
                                            No {statusFilter.toLowerCase()} elements in this domain.
                                        </p>
                                    ) : (
                                        <div className="divide-y divide-[#DCE7E8]">
                                            {visible.map((el) => (
                                                <div
                                                    key={el.code}
                                                    className="grid grid-cols-[auto_1fr] md:grid-cols-[72px_1.1fr_2fr_130px_110px] gap-x-4 gap-y-1.5 px-6 sm:px-8 py-4 hover:bg-[#F4FAFA] transition-colors"
                                                >
                                                    <span className="text-sm font-mono tabular-nums" style={{ color: `${colors.primaryDark}80` }}>{el.code}</span>
                                                    <span className="font-semibold text-sm">{el.name}</span>
                                                    <span className="col-span-2 md:col-span-1 text-sm leading-relaxed" style={{ color: `${colors.primaryDark}AA` }}>{el.description}</span>
                                                    <span className="col-span-2 md:col-span-1 flex md:block items-center gap-2 flex-wrap">
                                                        <span className="text-xs font-medium px-2 py-1 rounded-md" style={{ backgroundColor: `${colors.softGrey}80` }}>{el.layer}</span>
                                                        <span className="md:hidden"><StatusBadge status={el.status} /></span>
                                                    </span>
                                                    <span className="hidden md:block"><StatusBadge status={el.status} /></span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ─── Standards mapping ────────────────────────────────────────────── */}
            <motion.section
                id="standards"
                className="py-20 relative bg-white"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeInUp}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Standards <span className="gradient-text">mapping</span>
                        </h2>
                        <p className="text-lg max-w-3xl mx-auto" style={{ color: `${colors.primaryDark}AA` }}>
                            Where each element supports evidence for a framework's requirements. A dash means the element
                            is not mapped to a requirement under that framework, not that MAvHU does not provide it.
                        </p>
                    </div>

                    <div
                        className="flex items-start gap-3 rounded-xl p-4 mb-8 max-w-3xl mx-auto"
                        style={{ backgroundColor: `${colors.goldAccent}10`, border: `1px solid ${colors.goldAccent}30` }}
                    >
                        <Info className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.goldAccent }} />
                        <p className="text-sm leading-relaxed">
                            <strong>Not an endorsement.</strong> The mapping shows where an element supports a framework's
                            requirements. It is not endorsement, approval or accreditation by any standards body.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-[#DCE7E8] overflow-hidden">
                        <div className="overflow-auto max-h-[70vh]">
                            <table className="w-full text-sm border-collapse min-w-[720px]">
                                <thead>
                                    <tr>
                                        <th
                                            className="sticky top-0 left-0 z-20 text-left px-5 py-4 font-bold text-white"
                                            style={{ backgroundColor: colors.primaryDark }}
                                        >
                                            Element
                                        </th>
                                        {standards.map((s) => (
                                            <th
                                                key={s}
                                                className="sticky top-0 z-10 px-3 py-4 font-bold text-white text-center whitespace-nowrap"
                                                style={{ backgroundColor: colors.primaryDark }}
                                            >
                                                {s}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {standardsMapping.map(([name, flags], idx) => {
                                        const rowBg = idx % 2 === 0 ? colors.white : colors.lightBackground;
                                        return (
                                            <tr key={name} style={{ backgroundColor: rowBg }}>
                                                <td
                                                    className="sticky left-0 z-[5] px-5 py-3 font-semibold whitespace-nowrap border-r border-[#DCE7E8]"
                                                    style={{ backgroundColor: rowBg }}
                                                >
                                                    {name}
                                                </td>
                                                {flags.map((supported, i) => (
                                                    <td key={standards[i]} className="px-3 py-3 text-center">
                                                        {supported ? (
                                                            <span
                                                                className="inline-flex w-7 h-7 rounded-full items-center justify-center"
                                                                style={{ backgroundColor: `${green}18` }}
                                                                role="img"
                                                                aria-label="Supports a requirement"
                                                            >
                                                                <Check className="w-4 h-4" style={{ color: green }} strokeWidth={3} />
                                                            </span>
                                                        ) : (
                                                            <Minus className="w-4 h-4 mx-auto" style={{ color: `${colors.primaryDark}40` }} role="img" aria-label="Not mapped" />
                                                        )}
                                                    </td>
                                                ))}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* ─── Version history + download ───────────────────────────────────── */}
            <motion.section
                className="py-20 relative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeInUp}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-6">
                    <div className="bg-white rounded-2xl border border-[#DCE7E8] p-7">
                        <div className="flex items-center gap-3 mb-5">
                            <History className="w-5 h-5" style={{ color: colors.goldAccent }} />
                            <h3 className="text-xl font-bold">Version history</h3>
                        </div>
                        <div className="flex gap-4">
                            <span className="serif text-2xl font-bold gradient-text">1.0</span>
                            <div>
                                <p className="text-sm font-semibold">{taxonomyVersion.updated}</p>
                                <p className="text-sm leading-relaxed" style={{ color: `${colors.primaryDark}99` }}>
                                    Initial publication: nine domains, status per element, standards mapping.
                                </p>
                            </div>
                        </div>
                        <p className="text-xs leading-relaxed mt-6" style={{ color: `${colors.primaryDark}80` }}>
                            A living document: elements are added as the platform extends, and the standards mapping is
                            updated as frameworks change.
                        </p>
                    </div>

                    <div
                        className="lg:col-span-2 rounded-2xl p-8 sm:p-10 text-white flex flex-col sm:flex-row sm:items-center gap-8 justify-between shadow-lg"
                        style={{ background: `linear-gradient(135deg, ${colors.primaryDark}, ${colors.secondaryBlue})` }}
                    >
                        <div className="flex items-start gap-5">
                            <div className="hidden sm:flex w-16 h-16 rounded-2xl items-center justify-center flex-shrink-0 bg-white/10 border border-white/15">
                                <FileText className="w-8 h-8" style={{ color: "#D4A82E" }} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Download the taxonomy</h3>
                                <p className="text-white/80 leading-relaxed">
                                    The full framework as a PDF, for circulation and offline reference.
                                </p>
                                <p className="text-xs mt-3 text-white/60">
                                    Version {taxonomyVersion.version} · PDF · Measured. Verified. Sovereign.
                                </p>
                            </div>
                        </div>
                        <DownloadButton />
                    </div>
                </div>
            </motion.section>

            <Footer />
        </div>
    );
};

export default TaxonomyPage;
