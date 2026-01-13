import { motion, Variants } from "framer-motion";

interface OrgCategory {
  id: string;
  title: string;
  count: number;
  children: {
    id: string;
    name: string;
    count: number;
  }[];
}

const orgData: OrgCategory[] = [
  {
    id: "insights",
    title: "Insights & Risk Management",
    count: 577,
    children: [
      { id: "rb", name: "Research & Benchmarking", count: 307 },
      { id: "qrm", name: "Quality & Risk Management", count: 93 },
      { id: "boi", name: "Business Operations & Insights", count: 149 },
      { id: "ogc", name: "Office of General Counsel", count: 32 },
    ],
  },
  {
    id: "sales",
    title: "Sales Enablement",
    count: 267,
    children: [
      { id: "creative", name: "Creative", count: 161 },
      { id: "pursuits", name: "Pursuits", count: 71 },
      { id: "ams", name: "Account Management Support", count: 35 },
    ],
  },
  {
    id: "debs",
    title: "Digital Experience & Business Services",
    count: 412,
    children: [
      { id: "digital", name: "Digital Experience & Marketing", count: 186 },
      { id: "pbs", name: "People & Business Services", count: 226 },
    ],
  },
  {
    id: "mft",
    title: "MFT",
    count: 621,
    children: [
      { id: "kpmg", name: "KPMG Member Firm Technology Services", count: 621 },
    ],
  },
  {
    id: "transformation",
    title: "Transformation",
    count: 1,
    children: [],
  },
  {
    id: "bucoo",
    title: "BU COO",
    count: 0,
    children: [],
  },
  {
    id: "hr",
    title: "HR Head",
    count: 0,
    children: [],
  },
];

// Container for the whole grid to coordinate the delay
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

// Animation for each node (Child and Grandchild)
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 120, 
      damping: 12 
    } 
  }
};

export default function OrgChartSection() {
  return (
    <section className="py-24 bg-[#030303] text-white overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            CH Organization <span className="text-white/40">Structure</span>
          </h2>
          <div className="h-1.5 w-24 bg-blue-600 mx-auto rounded-full" />
        </motion.div>

        {/* Level 1: BU Head */}
        <div className="flex flex-col items-center mb-16 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className="z-10 bg-gradient-to-b from-blue-500 to-blue-700 p-[1px] rounded-2xl shadow-[0_0_40px_rgba(37,99,235,0.4)]"
          >
            <div className="bg-[#0a0a0a] px-12 py-6 rounded-2xl text-center">
              <p className="text-3xl font-bold tracking-tight text-white">Amit Chopra</p>
              <p className="text-blue-400 font-mono text-sm uppercase tracking-[0.3em] mt-2 font-semibold">BU Head</p>
            </div>
          </motion.div>
          <div className="h-20 w-px bg-gradient-to-b from-blue-500 via-blue-500/50 to-transparent" />
        </div>

        {/* Level 2 & 3: Categories & Teams */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-8 items-start"
        >
          {orgData.map((cat) => (
            <div key={cat.id} className="flex flex-col items-center group">
              
              {/* CHILD NODE (Category) */}
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                className="relative w-full bg-white/[0.04] border border-white/10 rounded-2xl p-5 text-center transition-colors duration-300"
              >
                {/* INCREASED FONT SIZE (Title) */}
                <p className="font-extrabold text-base md:text-lg leading-tight text-white group-hover:text-blue-400 transition-colors">
                  {cat.title}
                </p>
                {cat.count > 0 && (
                  <div className="mt-3 text-xs font-mono bg-blue-500/20 text-blue-300 py-1.5 px-3 rounded-lg inline-block font-bold">
                    {cat.count} Headcount
                  </div>
                )}
              </motion.div>

              {/* Connector Path */}
              {cat.children.length > 0 && (
                <div className="w-px h-10 bg-gradient-to-b from-white/20 to-white/5" />
              )}

              {/* GRANDCHILD NODES (Team Members) */}
              <div className="flex flex-col gap-4 w-full">
                {cat.children.map((child) => (
                  <motion.div
                    key={child.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                    className="relative bg-white/[0.02] border border-white/5 rounded-xl p-4 transition-all group/child shadow-lg"
                  >
                    {/* INCREASED FONT SIZE (Name) */}
                    <p className="text-[13px] md:text-[14px] leading-relaxed font-semibold text-gray-200 group-hover/child:text-white">
                      {child.name}
                    </p>
                    {child.count > 0 && (
                      <div className="flex items-center gap-2 mt-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        <p className="text-[11px] text-gray-500 font-mono font-medium">{child.count} Members</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}