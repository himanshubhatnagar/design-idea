import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion";
import { 
  Search, Globe2, Clock, Heart, Zap, Award, 
  ChevronRight, Database, Briefcase, 
  ShieldCheck, Wrench, BadgeCheck, LucideIcon 
} from "lucide-react";

// --- 1. Define the Types for easy customization ---
interface Metric {
  label: string;
  val: string;
  sub: string;
  icon: LucideIcon;
  type: "number" | "text";
  suffix?: string;
}

interface CustomCard {
  title: string;
  content: string;
  icon: LucideIcon;
}

interface Capability {
  id: string;
  title: string;
  icon: LucideIcon;
  headings: {
    portfolio?: string;
    sectors?: string;
    support?: string;
    tools?: string;
    certs?: string;
    achievement?: string;
  };
  services?: string[];
  sectors?: string[];
  supports?: string[];
  metrics: Metric[];
  efficiency: { savings: string; gains: string };
  award: string;
  tools?: { name: string; logo: string }[];
  certifications?: string[];
  customCards?: CustomCard[]; // This allows you to add extra cards easily
}

// --- Reusable Counter ---
const RollingNumber = ({ value, suffix = "" }: { value: string; suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 });
  const [current, setCurrent] = useState("0");

  useEffect(() => { if (isInView) motionValue.set(numericValue); }, [isInView, numericValue, motionValue]);
  useEffect(() => { return springValue.on("change", (v) => setCurrent(Math.floor(v).toLocaleString())); }, [springValue]);

  return <span ref={ref}>{current}{suffix}</span>;
};

// --- 2. Data Structure (Add or remove fields as needed) ---
const capabilityData: Capability[] = [
  {
    id: "research",
    title: "Research & Benchmarking",
    icon: Search,
    headings: {
      portfolio: "Service Portfolio",
      sectors: "Sectors",
      support: "Supports",
      tools: "Tools Supported",
      certs: "Certifications",
      achievement: "Achievement"
    },
    supports: ["Market Analysis", "Competitor Intelligence", "Financial Benchmarking"],
    sectors: ["Financial Services", "Technology", "Healthcare"],
    metrics: [
      { label: "Global Support", val: "US & UK", sub: "UK(60) | US(50)", icon: Globe2, type: "text" },
      { label: "Total Delivery", val: "590", sub: "Hours Delivered", suffix: "+", icon: Clock, type: "number" },
      { label: "Quality NPS", val: "97", sub: "Satisfaction Score", suffix: "%", icon: Heart, type: "number" },
    ],
    efficiency: { savings: "20000", gains: "19%" },
    award: "Excellence in Digitalization and Lean Initiatives",
    tools: [{ name: "Bloomberg", logo: "https://logo.clearbit.com/bloomberg.com" }],
    certifications: ["ISO 9001", "PMP Certified Team"],
    customCards: [] 
  },
  {
    id: "account-mgmt",
    title: "Account Management",
    icon: Briefcase,
    headings: {
      portfolio: "Account Scope",
      achievement: "Process Milestone"
    },
    // No Sectors, Tools, or Certs here - the UI will auto-hide them
    services: ["CRM Management", "Pipeline Tracking"],
    metrics: [
      { label: "Active Accounts", val: "120", sub: "Managed", suffix: "+", icon: Database, type: "number" },
      { label: "Data Integrity", val: "99", sub: "Accuracy", suffix: "%", icon: ShieldCheck, type: "number" },
      { label: "Efficiency", val: "450", sub: "Saved", suffix: "+", icon: Zap, type: "number" },
    ],
    efficiency: { savings: "12500", gains: "24%" },
    award: "Best-in-class Process Optimization",
    customCards: [
      { title: "Engagement Model", content: "Dedicated resource model with 24-hour turnaround.", icon: Clock }
    ]
  }
];

export const ResearchSection = () => {
  const [activeId, setActiveId] = useState(capabilityData[0].id);
  const activeData = capabilityData.find(d => d.id === activeId) || capabilityData[0];

  return (
    <section className="py-20 bg-[#020202] text-white min-h-screen">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-8 bg-[#0a0a0a] border border-white/5 rounded-[3rem] overflow-hidden">
          
          {/* SIDEBAR */}
          <div className="lg:w-80 bg-white/[0.02] border-r border-white/5 p-8">
            <h3 className="text-xl font-black italic text-blue-500 mb-10">KPMG BU</h3>
            <nav className="flex flex-col gap-2">
              {capabilityData.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveId(item.id)}
                  className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all text-left ${
                    activeId === item.id ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-white/5"
                  }`}
                >
                  <item.icon size={18} />
                  <span className="text-xs font-bold uppercase tracking-wider">{item.title}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* MAIN CONTENT */}
          <div className="flex-1 p-8 lg:p-12">
            <AnimatePresence mode="wait">
              <motion.div key={activeId} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                
                {/* Row 1: Services & Sectors */}
                {(activeData.services || activeData.sectors) && (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 mb-12">
                    {activeData.services && (
                      <div>
                        <h4 className="text-xs font-black text-blue-500 uppercase tracking-[0.4em] mb-6">{activeData.headings.portfolio || "Services"}</h4>
                        <div className="grid grid-cols-2 gap-4">
                          {activeData.services.map((s, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                              <ChevronRight size={14} className="text-blue-600" /> {s}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {activeData.sectors && (
                      <div className="bg-white/[0.03] p-6 rounded-3xl border border-white/5">
                        <p className="text-[10px] text-gray-500 font-bold uppercase mb-4 tracking-widest">{activeData.headings.sectors || "Sectors"}</p>
                        <div className="flex flex-wrap gap-2">
                          {activeData.sectors.map((s) => (
                            <span key={s} className="px-3 py-1 bg-black/40 border border-white/10 rounded text-[10px] text-gray-400">{s}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {activeData.sectors && (
                      <div className="bg-white/[0.03] p-6 rounded-3xl border border-white/5">
                        <p className="text-[10px] text-gray-500 font-bold uppercase mb-4 tracking-widest">{activeData.headings.support || "Sectors"}</p>
                        <div className="flex flex-wrap gap-2">
                          {activeData.supports.map((s) => (
                            <span key={s} className="px-3 py-1 bg-black/40 border border-white/10 rounded text-[10px] text-gray-400">{s}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Row 2: Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {activeData.metrics.map((m, i) => (
                    <div key={i} className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
                      <m.icon className="text-blue-500 mb-6" size={24} />
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{m.label}</p>
                      <div className="text-3xl font-black">
                        {m.type === "number" ? <RollingNumber value={m.val} suffix={m.suffix} /> : m.val}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Row 3: Tools, Certs, & Extra Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {activeData.tools && (
                    <div className="bg-[#0f1115] border border-white/5 p-6 rounded-3xl">
                      <div className="flex items-center gap-2 mb-4 text-blue-400">
                        <Wrench size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{activeData.headings.tools || "Tools"}</span>
                      </div>
                      <div className="flex flex-wrap gap-6 items-center">
                        {activeData.tools.map((tool, i) => (
                          <img key={i} src={tool.logo} alt={tool.name} className="h-6 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
                        ))}
                      </div>
                    </div>
                  )}
                  {activeData.certifications && (
                    <div className="bg-[#0f1115] border border-white/5 p-6 rounded-3xl">
                      <div className="flex items-center gap-2 mb-4 text-emerald-400">
                        <BadgeCheck size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{activeData.headings.certs || "Certifications"}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {activeData.certifications.map((cert, i) => (
                          <span key={i} className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-full text-[10px] font-bold">{cert}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Clean fix for the customCards map error */}
                  {activeData.customCards?.map((card, i) => (
                    <div key={i} className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl">
                      <div className="flex items-center gap-2 mb-4 text-blue-400">
                        <card.icon size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{card.title}</span>
                      </div>
                      <p className="text-sm text-gray-400">{card.content}</p>
                    </div>
                  ))}
                </div>

                {/* Row 4: Efficiency & Award */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                  <div className="lg:col-span-2 bg-gradient-to-br from-blue-600/10 to-transparent p-8 rounded-[2rem] border border-blue-500/10">
                    <Zap className="text-blue-400 mb-6" size={24} />
                    <div className="flex justify-between">
                      <div>
                        <div className="text-3xl font-black"><RollingNumber value={activeData.efficiency.savings} /></div>
                        <p className="text-[10px] text-blue-400 font-bold uppercase mt-1">Hrs Saved</p>
                      </div>
                      <div>
                        <div className="text-3xl font-black"><RollingNumber value={activeData.efficiency.gains} suffix="%" /></div>
                        <p className="text-[10px] text-blue-400 font-bold uppercase mt-1">Gain</p>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-3 bg-white/[0.02] p-8 rounded-[2rem] border border-white/5 relative overflow-hidden group">
                    <Award className="absolute -right-8 -bottom-8 text-white/[0.02] group-hover:text-blue-500/10 transition-all" size={180} />
                    <span className="text-xs font-black text-blue-500 uppercase tracking-widest block mb-4 italic">{activeData.headings.achievement || "Achievement"}</span>
                    <p className="text-sm text-gray-300 leading-relaxed font-medium">{activeData.award}</p>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
