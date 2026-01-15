import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const impactCards = [
  { intro: "Operational Growth", title: "Global Footprint", description: "Expanded service delivery across 14 new geographic corridors." },
  { intro: "Digital Transformation", title: "AI Integration", description: "Successfully deployed Gen-AI wrappers for automated tax filing." },
  { intro: "Client Success", title: "98% Retention", description: "Maintained industry-leading client satisfaction scores through FY24." },
  { intro: "Process Innovation", title: "Lean Strategy", description: "Redesigning 45+ core workflows for maximum efficiency." },
  { intro: "Scale", title: "Rapid Expansion", description: "Onboarded 200+ specialized consultants in Q3." },
  { intro: "Security", title: "Zero Breaches", description: "Achieved ISO 27001 certification across all hubs." },
  { intro: "Operational Growth", title: "Global Footprint", description: "Expanded service delivery across 14 new geographic corridors." },
  { intro: "Digital Transformation", title: "AI Integration", description: "Successfully deployed Gen-AI wrappers for automated tax filing." },
  { intro: "Client Success", title: "98% Retention", description: "Maintained industry-leading client satisfaction scores through FY24." },
  { intro: "Process Innovation", title: "Lean Strategy", description: "Redesigning 45+ core workflows for maximum efficiency." },
  { intro: "Scale", title: "Rapid Expansion", description: "Onboarded 200+ specialized consultants in Q3." },
  { intro: "Security", title: "Zero Breaches", description: "Achieved ISO 27001 certification across all hubs." },
  // ... Add more as needed
];

export const ImpactSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(impactCards.length / itemsPerPage);
  const isSlider = impactCards.length > itemsPerPage;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section className="py-24 bg-[#020202] overflow-hidden">
      <div className="container mx-auto px-6 mb-12 flex justify-between items-end">
        <div className="flex items-center gap-4">
          <div className="h-px w-12 bg-blue-600" />
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            The <span className="text-blue-600">Impact</span>
          </h2>
        </div>

        {/* Arrow Controls: Only show if more than 4 items */}
        {isSlider && (
          <div className="flex gap-4">
            <button 
              onClick={handlePrev}
              className="p-3 rounded-full border border-white/10 text-white hover:bg-blue-600 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={handleNext}
              className="p-3 rounded-full border border-white/10 text-white hover:bg-blue-600 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      {/* The Slider Container */}
      <div className="relative container mx-auto px-6">
        <div className="overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: `-${currentIndex * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {impactCards.map((card, idx) => (
              <div
                key={idx}
                className={`flex-shrink-0 px-3 ${isSlider ? "w-full md:w-1/2 lg:w-1/4" : "w-1/4"}`}
              >
                <div className="h-full bg-white/[0.03] border border-white/10 rounded-[2rem] p-8 backdrop-blur-sm hover:bg-white/[0.07] hover:border-blue-500/50 transition-all duration-500 flex flex-col justify-between min-h-[250px]">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.2em]">
                        {card.intro}
                      </span>
                      <Quote className="text-white/10 group-hover:text-blue-500/20 transition-colors" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                      {card.title}
                    </h3>
                  </div>
                  <div className="pt-6 border-t border-white/5">
                    <p className="text-sm text-gray-400 leading-relaxed font-medium">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bullets: Only show if more than 4 items */}
        {isSlider && (
          <div className="flex justify-center gap-2 mt-12">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  currentIndex === i ? "w-8 bg-blue-600" : "w-2 bg-white/20"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ImpactSection;
