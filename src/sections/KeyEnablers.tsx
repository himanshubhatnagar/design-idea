import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ShieldCheck, Users, AlertTriangle, GraduationCap, Settings2, Clock, Zap, Target } from "lucide-react";

// --- Reusable Counter Component ---
const AnimatedNumber = ({ value, suffix = "" }: { value: string; suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10);
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(numericValue);
    }
  }, [isInView, numericValue, motionValue]);

  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest).toLocaleString());
    });
  }, [springValue]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
};

export const EnablersSection = () => {
  return (
    <section className="py-24 bg-[#030303] text-white overflow-hidden">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              Key <span className="text-white/40">Enablers.</span>
            </h2>
            <div className="h-1.5 w-20 bg-blue-600 rounded-full" />
          </div>
          <p className="text-gray-400 font-mono text-sm tracking-widest uppercase">
            Operational Excellence 2024
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* 1. QUALITY - Animated Circular Progress */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-4 bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center relative"
          >
            <div className="relative mb-4">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                <motion.circle 
                  cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" 
                  strokeDasharray={376.8}
                  initial={{ strokeDashoffset: 376.8 }}
                  whileInView={{ strokeDashoffset: 376.8 * (1 - 0.98) }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="text-[#1e49e2]" 
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold">
                <AnimatedNumber value="98" suffix="%" />
              </div>
            </div>
            <h4 className="text-xl font-bold">Quality</h4>
            <p className="text-[#1e49e2] font-mono text-xs uppercase tracking-tighter mt-1">NPS Score Excellence</p>
          </motion.div>

          {/* 2. PEOPLE - Animated Metrics List */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-8 bg-[#0a0a0a] border border-white/10 rounded-3xl p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <Users className="text-purple-500" size={20} />
              <h4 className="text-lg font-bold">People: GPS Score Highlights</h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Engagement", val: "96", color: "text-purple-400" },
                { label: "Trust", val: "82", color: "text-blue-400" },
                { label: "Growth", val: "87", color: "text-emerald-400" },
                { label: "Culture Index", val: "92", color: "text-amber-400" }
              ].map((stat, i) => (
                <div key={i} className="border-l border-white/10 pl-4">
                  <p className="text-4xl font-bold mb-1">
                    <AnimatedNumber value={stat.val} />
                  </p>
                  <p className={`text-[10px] uppercase font-bold tracking-widest ${stat.color}`}>{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 3. RISK - ribbon */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-12 group bg-gradient-to-r from-red-500/10 via-transparent to-transparent border border-white/10 rounded-2xl p-6 flex items-center justify-between"
          >
             <div className="flex items-center gap-4 text-left">
                <div className="bg-red-500/20 p-3 rounded-full">
                  <AlertTriangle className="text-red-500" />
                </div>
                <div>
                  <h4 className="font-bold text-lg tracking-tight">Risk & Compliance</h4>
                  <p className="text-gray-400 text-sm italic font-bold">Strong compliance with firms and risk guidelines</p>
                </div>
             </div>
             <div className="hidden md:block text-red-500/10 font-black text-4xl select-none uppercase">Secure</div>
          </motion.div>

          {/* 4. L&D - Animated Hours */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-5 bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 relative group"
          >
            <Clock className="absolute top-6 right-6 text-emerald-500/20 group-hover:rotate-12 transition-transform" size={40} />
            <p className="text-gray-500 text-xs font-mono mb-2 uppercase">Learning & Development</p>
            <h4 className="text-5xl font-black mb-2 italic">
              <AnimatedNumber value="90" /> <span className="text-xl not-italic font-light">HOURS</span>
            </h4>
            <p className="text-emerald-400 text-sm font-medium">Per employee annually</p>
          </motion.div>

          {/* 5. OPERATIONAL EXCELLENCE - Mini Bento */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-7 bg-white/[0.03] border border-white/10 rounded-3xl p-8 overflow-hidden relative"
          >
            <div className="flex justify-between items-start mb-8 text-left">
               <div>
                 <h4 className="text-2xl font-bold">
                   <AnimatedNumber value="340" />K <span className="text-sm font-light text-gray-400">Hours</span>
                 </h4>
                 <p className="text-amber-500 font-mono text-xs uppercase">Operational Efficiency</p>
               </div>
               <Settings2 className="text-amber-500 animate-[spin_8s_linear_infinite]" />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Automation", val: "45%" },
                { label: "Process", val: "30%" },
                { label: "Gen AI", val: "29%" }
              ].map((stat, i) => (
                <div key={i} className="bg-black/40 p-4 rounded-2xl border border-white/5">
                  <p className="text-xl font-bold leading-none">
                    <AnimatedNumber value={stat.val.replace('%','')} suffix="%" />
                  </p>
                  <p className="text-[9px] text-gray-500 uppercase mt-1 font-bold">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Footer Note */}
        <div className="mt-8 flex items-center justify-end gap-2 text-gray-500 font-mono text-xs uppercase tracking-[0.2em]">
          <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
          Note: all numbers as of fy24
        </div>
      </div>
    </section>
  );
};

export default EnablersSection;