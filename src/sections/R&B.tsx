import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion";
import { 
  Search, Globe2, Clock, Heart, Zap, Award, 
  ChevronRight, Database, Briefcase, 
  ShieldCheck, Wrench, BadgeCheck, LucideIcon, 
  TrendingUp, AlertTriangle, Lightbulb, Settings, Terminal
} from "lucide-react";

// --- Types ---
interface Metric {
  label: string;
  val: string;
  sub?: string;
  type: "number" | "text";
  suffix?: string;
}

interface Capability {
  id: string;
  title: string;
  icon: LucideIcon;
  services?: string[];
  sectors?: string[];
  metrics: Metric[];
  efficiency: { savings: string; gains: string };
  award: string;
  awardCount?: number;
}

interface ParentTab {
  id: string;
  label: string;
  icon: LucideIcon;
  categories: Capability[];
}

// --- Expanded Data Structure (5 Parent Categories) ---
const tabData: ParentTab[] = [
  {
    id: "insights",
    label: "Insights",
    icon: TrendingUp,
    categories: [
      {
        id: "research",
        title: "Research & Benchmarking",
        icon: Search,
        services: ["Secondary Research", "Primary Research", "Competitive Intelligence", "ESG Analysis"],
        sectors: ["Financial Services", "Technology", "Healthcare", "Consumer & Retail"],
        metrics: [
          { label: "Hours delivered", val: "450", suffix: "k+", type: "number" },
          { label: "NPS", val: "98", suffix: "%", type: "number" },
          { label: "Support for", val: "US and UK", sub: "Global Delivery", type: "text" },
        ],
        efficiency: { savings: "55", gains: "12" },
        awardCount: 2,
        award: "CII awards for excellence in digitalization and lean initiatives",
      }
    ]
  },
  {
    id: "risk",
    label: "Risk",
    icon: AlertTriangle,
    categories: [
      {
        id: "quality-risk",
        title: "Quality & Risk",
        icon: ShieldCheck,
        services: ["Audit Support", "Risk Assessment", "Compliance Review"],
        metrics: [
          { label: "Compliance", val: "100", suffix: "%", type: "number" },
          { label: "Risk Mitigation", val: "85", suffix: "%", type: "number" },
        ],
        efficiency: { savings: "15", gains: "20" },
        award: "Best Risk Management Framework 2024",
      }
    ]
  },
  {
    id: "strategy",
    label: "Strategy",
    icon: Lightbulb,
    categories: [
      {
        id: "market-entry",
        title: "Market Strategy",
        icon: Globe2,
        services: ["Market Sizing", "GTM Strategy", "M&A Pipeline"],
        metrics: [
          { label: "Markets Analyzed", val: "45", suffix: "+", type: "number" },
          { label: "Success Rate", val: "92", suffix: "%", type: "number" },
        ],
        efficiency: { savings: "30", gains: "15" },
        award: "Top Strategic Advisor Award",
      }
    ]
  },
  {
    id: "operations",
    label: "Operations",
    icon: Settings,
    categories: [
      {
        id: "bus-ops",
        title: "Business Operations",
        icon: Briefcase,
        services: ["CRM Management", "Pipeline Tracking", "Resource Allocation"],
        metrics: [
          { label: "Efficiency", val: "450", suffix: "+", type: "number" },
          { label: "Accuracy", val: "99", suffix: "%", type: "number" },
        ],
        efficiency: { savings: "12", gains: "24" },
        award: "Operational Excellence Milestone",
      }
    ]
  },
  {
    id: "technology",
    label: "Technology",
    icon: Terminal,
    categories: [
      {
        id: "digital-trans",
        title: "Digital Transformation",
        icon: Zap,
        services: ["Automation", "Cloud Strategy", "AI Implementation"],
        metrics: [
          { label: "Bots Deployed", val: "120", suffix: "+", type: "number" },
          { label: "Uptime", val: "99.9", suffix: "%", type: "number" },
        ],
        efficiency: { savings: "100", gains: "45" },
        award: "Innovation Leader in AI & Robotics",
      }
    ]
  }
];

// --- Counter Component ---
const RollingNumber = ({ value, suffix = "" }: { value: string; suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 });
  const [current, setCurrent] = useState("0");

  useEffect(() => { if (isInView) motionValue.set(numericValue); }, [isInView, numericValue]);
  useEffect(() => springValue.on("change", (v) => setCurrent(Math.floor(v).toLocaleString())), [springValue]);

  return <span ref={ref}>{current}{suffix}</span>;
};

export const ResearchSection = () => {
  const [activeParentId, setActiveParentId] = useState(tabData[0].id);
  const [activeChildId, setActiveChildId] = useState(tabData[0].categories[0].id);

  const activeParent = tabData.find(t => t.id === activeParentId) || tabData[0];
  const activeData = activeParent.categories.find(c => c.id === activeChildId) || activeParent.categories[0];

  const handleParentChange = (id: string) => {
    setActiveParentId(id);
    const newParent = tabData.find(t => t.id === id);
    if (newParent && newParent.categories.length > 0) {
      setActiveChildId(newParent.categories[0].id);
    }
  };

  return (
    <section className="py-20 bg-[#020202] text-white min-h-screen">
      <div className="container mx-auto px-6">
        
        {/* 1. TOP LEVEL TABS (All 5 Categories) */}
        <div className="flex justify-center mb-12 overflow-x-auto no-scrollbar">
          <div className="flex bg-white/5 p-1 rounded-full border border-white/10 whitespace-nowrap">
            {tabData.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleParentChange(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all text-xs font-bold ${
                  activeParentId === tab.id ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                <tab.icon size={14} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 bg-[#0a0a0a] border border-white/5 rounded-[3rem] overflow-hidden">
          
          {/* 2. SIDEBAR (Child Tabs for active parent) */}
          <div className="lg:w-80 bg-white/[0.02] border-r border-white/5 p-8">
            <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-6">Explore {activeParent.label}</p>
            <nav className="flex flex-col gap-2">
              {activeParent.categories.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveChildId(item.id)}
                  className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all text-left ${
                    activeChildId === item.id ? "bg-white/10 text-blue-400 border border-white/10" : "text-gray-500 hover:bg-white/5"
                  }`}
                >
                  <item.icon size={18} />
                  <span className="text-xs font-bold uppercase tracking-wider">{item.title}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* 3. MAIN CONTENT (Bento Grid) */}
          <div className="flex-1 p-8 lg:p-12">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeChildId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <h2 className="text-4xl font-bold">{activeData.title}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto">
                  
                  {/* Services & Sectors Column */}
                  <div className="md:row-span-3 bg-white/[0.03] p-8 rounded-[2rem] border border-white/5">
                    {activeData.services && (
                      <div className="mb-8">
                        <h4 className="text-sm font-bold underline decoration-blue-500 underline-offset-8 mb-6">Services Offered:</h4>
                        <ul className="space-y-3">
                          {activeData.services.map((s, i) => (
                            <li key={i} className="text-xs text-gray-400 flex items-start gap-2">
                              <span className="w-1 h-1 rounded-full bg-blue-500 mt-1.5" /> {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {activeData.sectors && (
                      <div>
                        <h4 className="text-sm font-bold underline decoration-blue-500 underline-offset-8 mb-6">Sectors:</h4>
                        <ul className="space-y-3">
                          {activeData.sectors.map((s, i) => (
                            <li key={i} className="text-xs text-gray-400 flex items-start gap-2">
                              <span className="w-1 h-1 rounded-full bg-blue-500 mt-1.5" /> {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Metrics Cards */}
                  <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeData.metrics.map((m, i) => (
                      <div key={i} className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl hover:bg-white/[0.04] transition-all">
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">{m.label}</p>
                        <div className="text-2xl font-black">
                          {m.type === "number" ? <RollingNumber value={m.val} suffix={m.suffix} /> : m.val}
                        </div>
                        {m.sub && <p className="text-[10px] text-blue-400 mt-2 font-medium">{m.sub}</p>}
                      </div>
                    ))}

                    {/* Efficiency Stats */}
                    <div className="bg-gradient-to-br from-blue-600/10 to-transparent p-6 rounded-3xl border border-blue-500/10 flex justify-between items-center">
                       <div>
                         <div className="text-2xl font-black">~<RollingNumber value={activeData.efficiency.savings} suffix="k" /></div>
                         <p className="text-[9px] text-gray-500 uppercase font-bold">hrs savings</p>
                       </div>
                       <div className="text-right">
                         <div className="text-2xl font-black"><RollingNumber value={activeData.efficiency.gains} suffix="%" /></div>
                         <p className="text-[9px] text-gray-500 uppercase font-bold">Efficiency gains</p>
                       </div>
                    </div>

                    {/* Achievement/Award */}
                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl flex gap-4 items-center overflow-hidden">
                      {activeData.awardCount && <div className="text-4xl font-black text-blue-500/30">{activeData.awardCount}</div>}
                      <p className="text-[10px] leading-relaxed text-gray-400 italic">{activeData.award}</p>
                    </div>
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
