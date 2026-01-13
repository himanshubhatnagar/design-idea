import { motion } from "framer-motion";
import { Database, Cloud, Lock, Cpu } from "lucide-react";

const horizontalCards = [
  {
    icon: Database,
    title: "Data Management",
    description: "Seamlessly organize, store, and access your data with our intelligent data management system.",
    features: ["Auto-scaling storage", "Real-time sync", "Version control"],
  },
  {
    icon: Cloud,
    title: "Cloud Integration",
    description: "Connect with all major cloud providers and manage your infrastructure from one dashboard.",
    features: ["Multi-cloud support", "One-click deploy", "Auto backup"],
  },
  {
    icon: Lock,
    title: "Security Suite",
    description: "Enterprise-grade security with end-to-end encryption and compliance certifications.",
    features: ["SOC 2 compliant", "GDPR ready", "Zero-trust architecture"],
  },
  {
    icon: Cpu,
    title: "AI Processing",
    description: "Leverage powerful GPU clusters for training and inference at unprecedented speeds.",
    features: ["GPU acceleration", "Edge computing", "Low latency"],
  },
];

export const HorizontalCardsSection = () => {
  return (
    <section className="py-24 bg-dark-bg">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-text-primary">
            Enterprise Solutions
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Robust infrastructure designed for scale
          </p>
        </motion.div>

        <div className="space-y-4">
          {horizontalCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-dark-card rounded-xl p-6 border border-dark-border hover:border-glow-blue/30 transition-all duration-300 hover:shadow-glow"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                {/* Icon */}
                <div className="w-14 h-14 rounded-lg bg-glow-indigo/10 flex items-center justify-center shrink-0 group-hover:bg-glow-indigo/20 transition-colors">
                  <card.icon className="w-7 h-7 text-glow-indigo" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-display text-lg font-semibold mb-2 text-text-primary">
                    {card.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {card.features.map((feature, featureIndex) => (
                    <span
                      key={featureIndex}
                      className="px-3 py-1 bg-dark-card-light text-text-secondary text-xs rounded-full font-medium border border-dark-border"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HorizontalCardsSection;