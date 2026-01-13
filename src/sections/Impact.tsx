import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const impactCards = [
  {
    intro: "Operational Growth",
    title: "Global Footprint",
    description: "Expanded service delivery across 14 new geographic corridors.",
  },
  {
    intro: "Digital Transformation",
    title: "AI Integration",
    description: "Successfully deployed Gen-AI wrappers for automated tax filing.",
  },
  {
    intro: "Client Success",
    title: "98% Retention",
    description: "Maintained industry-leading client satisfaction scores through FY24.",
  },
  {
    intro: "Process Innovation",
    title: "Lean Strategy",
    description: "Redesigning 45+ core workflows for maximum efficiency.",
  },
  // ... Add the remaining 8 cards here
];

export const ImpactSection = () => {
  // We double the array to create a seamless infinite loop
  const duplicatedCards = [...impactCards, ...impactCards];

  return (
    <section className="py-24 bg-[#020202] overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <div className="flex items-center gap-4">
          <div className="h-px w-12 bg-blue-600" />
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            The <span className="text-blue-600">Impact</span>
          </h2>
        </div>
      </div>

      {/* The Slider Container */}
      <div className="relative flex">
        <motion.div
          className="flex gap-6 px-4"
          animate={{
            x: ["0%", "-50%"], // Moves from start to halfway (since it's duplicated)
          }}
          transition={{
            ease: "linear",
            duration: 40, // Adjust speed here (higher = slower)
            repeat: Infinity,
          }}
        >
          {duplicatedCards.map((card, idx) => (
            <div
              key={idx}
              className="w-[350px] md:w-[400px] flex-shrink-0 group"
            >
              <div className="h-full bg-white/[0.03] border border-white/10 rounded-[2rem] p-8 backdrop-blur-sm hover:bg-white/[0.07] hover:border-blue-500/50 transition-all duration-500 flex flex-col justify-between">
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

        {/* Gradient Overlays for smooth fade out at edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#020202] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#020202] to-transparent z-10" />
      </div>
    </section>
  );
};

export default ImpactSection;