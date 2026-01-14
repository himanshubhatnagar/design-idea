import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { Bot, ShieldCheck, Zap, Code2, ChevronUp, ChevronDown, Cpu, Search, BrainCircuit } from "lucide-react";

// --- Fixed RollingNumber Component (Supports Decimals) ---
interface RollingNumberProps {
  value: string;
  suffix?: string;
}

const RollingNumber = ({ value, suffix = "" }: RollingNumberProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Use parseFloat to handle decimals like 2.1
  const numericValue = parseFloat(value) || 0;
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 80 });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (isInView) motionValue.set(numericValue);
  }, [isInView, numericValue, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      // If the original input had a decimal, format the output to match
      if (value.includes(".")) {
        const decimalPlaces = value.split(".")[1].length;
        setDisplayValue(latest.toFixed(decimalPlaces));
      } else {
        setDisplayValue(Math.floor(latest).toLocaleString());
      }
    });
    return () => unsubscribe();
  }, [springValue, value]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
};

// --- Main AI Journey Section ---
export const AIJourneySection = () => {
  // Sample Data - Add as many as you like
  const highlights = [
    { icon: Bot, text: "Deployed custom LLM for internal strategy", status: "Active" },
    { icon: Code2, text: "Automated code generation for Tax scripts", status: "Scaling" },
    { icon: ShieldCheck, text: "Implemented AI Safety & Privacy Guardrails", status: "Secure" },
    { icon: Zap, text: "40% efficiency boost in document analysis", status: "Optimized" },
    { icon: Search, text: "Neural search integrated into legacy DBs", status: "Beta" },
    { icon: BrainCircuit, text: "Real-time sentiment mapping for HR", status: "Live" },
    { icon: Cpu, text: "Edge computing nodes deployed globally", status: "Active" },
  ];

  // Slider State
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;
  const maxIndex = Math.max(0, highlights.length - itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const visibleHighlights = highlights.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <section className="py-24 bg-[#02040a] text-white relative overflow-hidden font-sans">
      
      {/* AI Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 blur-[150px] rounded-full" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              AI <span className="text-white/40">Journey.</span>
            </h2>
            <div className="h-1.5 w-20 bg-blue-600 rounded-full" />
          </div>
          <p className="text-gray-400 font-mono text-sm tracking-widest uppercase">
            Operational Excellence 2024
          </p>
        </div>

        {/* Main Grid: Using items-start to prevent vertical stretching */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: NEURAL CORE STATS */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {[
              { label: "Enterprise Adoption", val: "68.2%", color: "border-[#1e49e2]" },
              { label: "Processing Efficiency", val: "29.4%", color: "border-[#1e49e2]" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                whileHover={{ x: 10 }}
                className={`p-8 bg-white/[0.03] border-l-4 ${stat.color} backdrop-blur-md rounded-r-2xl`}
              >
                <p className="text-gray-500 font-mono text-[10px] uppercase tracking-widest mb-2">{stat.label}</p>
                <h3 className="text-5xl font-black font-mono">
                  <RollingNumber value={stat.val.replace('%','')} suffix="%" />
                </h3>
              </motion.div>
            ))}
          </div>

          {/* CENTER: THE FLOATING KNOWLEDGE CUBES (Fixed Height) */}
          <div className="lg:col-span-5 relative h-[600px] flex items-center justify-center bg-white/[0.02] border border-white/5 rounded-[3rem]">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
            
            <div className="flex justify-around items-center w-full px-4 relative h-full">
              {[
                { val: "15+", label: "Neural Models" },
                { val: "250+", label: "Active Nodes" },
                { val: "12", label: "Core Vectors" }
              ].map((cube, i) => (
                <div key={i} className="flex flex-col items-center group">
                  <motion.div
                    animate={{ 
                      y: [0, -30, 0],
                      rotateY: [0, 15, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
                    className="w-24 h-24 relative preserve-3d cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-white/10 border border-white/30 backdrop-blur-2xl rounded-2xl flex items-center justify-center shadow-2xl overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#1e49e2] to-transparent animate-scan" />
                      <span className="text-xl font-black tracking-tighter relative z-10">{cube.val}</span>
                    </div>
                  </motion.div>
                  
                  <div className="h-32 w-[1px] bg-gradient-to-b from-[#1e49e2] to-transparent my-4 relative">
                     <motion.div 
                        animate={{ top: ["0%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_8px_white]" 
                     />
                  </div>
                  
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white text-center w-20">
                    {cube.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: SYSTEM LOG HIGHLIGHTS (With Vertical Slider) */}
          <div className="lg:col-span-4 bg-black/40 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-xl relative h-[600px] flex flex-col">
            <div className="flex items-center justify-between mb-8 flex-shrink-0">
              <h4 className="text-sm font-bold uppercase tracking-widest italic">Key Highlights</h4>
              
              {/* Slider Controls */}
              <div className="flex gap-2">
                <button 
                  onClick={prevSlide}
                  className="p-1.5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <ChevronUp size={16} />
                </button>
                <button 
                  onClick={nextSlide}
                  className="p-1.5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>

            {/* Sliding Content Area */}
            <div className="flex-1 relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {visibleHighlights.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="p-4 bg-white/5 border border-white/5 rounded-xl group hover:border-cyan-500/30 transition-all cursor-default"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <item.icon size={14} className="text-gray-500 group-hover:text-cyan-500" />
                        <span className="text-[8px] font-mono bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded uppercase tracking-tighter">
                          {item.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400 leading-relaxed group-hover:text-white transition-colors font-medium">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination Indicators (Bullets) */}
            <div className="mt-6 flex justify-center gap-1.5 flex-shrink-0">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-1 transition-all duration-300 rounded-full ${currentIndex === i ? 'w-6 bg-cyan-500' : 'w-2 bg-white/20'}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AIJourneySection;
