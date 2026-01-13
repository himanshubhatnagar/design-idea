import { motion } from "framer-motion";
import { TrendingUp, Users, Target, Award } from "lucide-react";

const elevatedCards = [
  {
    icon: TrendingUp,
    title: "Revenue Growth",
    description: "Driving scalable financial impact.",
    gradient: "from-blue-500/20 to-indigo-500/20",
    size: "col-span-2 sm:col-span-2", // Top wide card
  },
  {
    icon: Users,
    title: "Team Efficiency",
    description: "Streamlining workflows.",
    gradient: "from-indigo-500/20 to-cyan-500/20",
    size: "col-span-2 sm:col-span-1", // Small square
  },
  {
    icon: Target,
    title: "Precision Targeting",
    description: "AI-driven accuracy.",
    gradient: "from-cyan-500/20 to-blue-500/20",
    size: "col-span-2 sm:col-span-1", // Small square
  },
  {
    icon: Award,
    title: "Customer Success",
    description: "Partnerships that last.",
    gradient: "from-blue-500/20 to-cyan-500/20",
    size: "col-span-2 sm:col-span-2", // Bottom wide card
  },
];

export const ElevatedCardsSection = () => {
  return (
    <section className="py-24 bg-[#050505] overflow-hidden">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* LEFT SIDE – Sticky Heading */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 text-left self-start lg:sticky lg:top-24"
          >
            <span className="text-blue-500 font-mono text-sm tracking-widest uppercase mb-4 block">
              Core Pillars
            </span>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white tracking-tight">
              Who we <span className="text-white/40">are.</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
              We leverage neural intelligence to transform standard business metrics into 
              exponential growth trajectories.
            </p>
          </motion.div>

          {/* RIGHT SIDE – Modern Bento Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            {elevatedCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className={`group relative ${card.size} p-8 rounded-3xl border border-white/10 
                           bg-white/[0.03] backdrop-blur-xl overflow-hidden
                           hover:border-white/20 transition-all duration-500 flex flex-col justify-between min-h-[180px]`}
              >
                {/* Animated Background Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 
                                group-hover:opacity-100 transition-opacity duration-700 blur-2xl`} />

                {/* Content */}
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 
                                flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <card.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {card.description}
                  </p>
                </div>

                {/* Subtle Numbering */}
                <span className="absolute bottom-4 right-6 text-white/5 font-mono text-4xl group-hover:text-white/10 transition-colors">
                  0{index + 1}
                </span>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ElevatedCardsSection;