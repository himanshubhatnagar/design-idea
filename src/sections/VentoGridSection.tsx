import { motion } from "framer-motion";
import { 
  Workflow, 
  Palette, 
  MessageSquare, 
  BarChart2, 
  Shield, 
  Sparkles,
  Boxes,
  Compass
} from "lucide-react";

const gridItems = [
  {
    icon: Workflow,
    title: "Automated Workflows",
    description: "Streamline complex processes with AI-driven automation",
    size: "large",
    gradient: "from-dark-card-light to-dark-bg",
  },
  {
    icon: Palette,
    title: "Custom Themes",
    description: "Personalize your dashboard experience",
    size: "small",
    gradient: "from-dark-card-light to-dark-bg",
  },
  {
    icon: MessageSquare,
    title: "Smart Chat",
    description: "AI-powered conversations",
    size: "small",
    gradient: "from-dark-card-light to-dark-bg",
  },
  {
    icon: BarChart2,
    title: "Analytics Dashboard",
    description: "Real-time insights and metrics at your fingertips",
    size: "medium",
    gradient: "from-dark-card-light to-dark-bg",
  },
  {
    icon: Shield,
    title: "Security First",
    description: "Enterprise-grade protection",
    size: "small",
    gradient: "from-dark-card-light to-dark-bg",
  },
  {
    icon: Sparkles,
    title: "AI Magic",
    description: "Transform data instantly",
    size: "small",
    gradient: "from-dark-card-light to-dark-bg",
  },
  {
    icon: Boxes,
    title: "Modular Architecture",
    description: "Build with flexible, reusable components",
    size: "medium",
    gradient: "from-dark-card-light to-dark-bg",
  },
  {
    icon: Compass,
    title: "Smart Navigation",
    description: "Intuitive UX design patterns",
    size: "small",
    gradient: "from-dark-card-light to-dark-bg",
  },
];

export const VentoGridSection = () => {
  return (
    <section className="py-24 bg-dark-card/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-text-primary">
            Vento Grid
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Explore our comprehensive suite of AI-powered features
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {gridItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`group relative bg-gradient-to-br ${item.gradient} rounded-xl border border-dark-border overflow-hidden hover:border-glow-blue/50 transition-all duration-300 hover:shadow-glow ${
                item.size === "large" 
                  ? "md:col-span-2 md:row-span-2" 
                  : item.size === "medium"
                  ? "md:col-span-2"
                  : ""
              }`}
            >
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-glow-blue/5 to-glow-indigo/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <div className="relative h-full p-6 flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-dark-card border border-dark-border flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-glow-blue/50 transition-all duration-300">
                  <item.icon className="w-6 h-6 text-glow-blue" />
                </div>

                <div className="mt-auto">
                  <h3 className="font-display text-lg font-semibold mb-2 text-text-primary">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary text-sm">
                    {item.description}
                  </p>
                </div>

                {/* Bottom glow line on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-glow-blue to-glow-indigo opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VentoGridSection;