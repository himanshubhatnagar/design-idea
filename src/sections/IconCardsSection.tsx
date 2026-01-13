import { motion, Variants } from "framer-motion";
import { Brain, Rocket, Shield, Zap, BarChart3, ChevronRight } from "lucide-react";

const iconCards = [
  {
    icon: Brain,
    title: "Insights & Risks",
    bg: "/public/1.jpeg",
    color: "from-[#1e49e2]",
    description: [
      "Research & Benchmarking",
      "Quality & Risk Management",
      "Business Operation & Insights",
      "Office of General Council",
    ],
  },
  {
    icon: Rocket,
    title: "Sales Enablement",
    bg: "/public/1.jpeg",
    color: "from-[#7213e9]",
    description: ["Creative Services", "Pursuits", "Account Management Support"],
  },
  {
    icon: Shield,
    title: "Digital Experience",
    bg: "/public/1.jpeg",
    color: "from-[#00b8f4]",
    description: ["Marketing Services", "People & Business", "Experience Design"],
  },
  {
    icon: Zap,
    title: "Technology Services",
    bg: "/public/1.jpeg",
    color: "from-[#aa0c82]",
    description: [
      "Application Engineering",
      "Infra Services",
      "Information Security",
      "Artificial Intelligence",
    ],
  },
  {
    icon: BarChart3,
    title: "Transformation",
    bg: "/public/1.jpeg",
    color: "from-[#014b07]",
    description: [
      "Strategic Programs",
      "Operation Excellence",
      "Process Re-engineering",
      "Digital Transformation",
    ],
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 12 }
  },
};

export const IconCardsSection = () => {
  return (
    <section className="py-24 bg-[#030303] text-white">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Our <span className="text-white/40">Capabilities.</span>
          </h2>
          <div className="h-1 w-20 bg-blue-600 rounded-full" />
        </motion.div>

        {/* Dynamic Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {iconCards.map((card, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="group relative flex flex-col bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden hover:bg-white/[0.04] transition-all duration-500"
            >
              {/* Card Image Header */}
              <div className="h-32 relative overflow-hidden">
                <img 
                  src={card.bg} 
                  alt={card.title} 
                  /* CHANGED: Removed default grayscale/opacity, applied them to group-hover instead */
                  className="w-full h-full object-cover opacity-100 grayscale-0 group-hover:grayscale group-hover:opacity-30 group-hover:scale-110 transition-all duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent`} />
                
                {/* Icon Float */}
                <div className="absolute bottom-0 left-6 p-3 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl">
                   <card.icon className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 pt-8 flex-grow">
                <h3 className="text-lg font-bold mb-6 text-white group-hover:text-[#1e49e2] transition-colors duration-300">
                  {card.title}
                </h3>
                
                <ul className="space-y-4">
                  {card.description.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 group/item">
                      <ChevronRight className="w-4 h-4 mt-0.5 text-blue-500/50 group-hover/item:text-blue-500 transition-colors" />
                      <span className="text-sm text-gray-400 group-hover/item:text-gray-200 transition-colors leading-snug">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Decorative Bar */}
              <div className={`h-1 w-0 group-hover:w-full bg-gradient-to-r ${card.color} to-transparent transition-all duration-700`} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default IconCardsSection;