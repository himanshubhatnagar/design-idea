import { motion } from "framer-motion";
import { Users, Globe2, Heart, ArrowUpRight, MapPin } from "lucide-react";

const stats = [
  {
    icon: Users,
    label: "Our Scale",
    mainValue: "~2,500",
    subValue: "Headcount",
    extraDetail: "3.8M Hours Delivered",
    color: "from-blue-500/20 to-blue-600/5",
    accent: "bg-blue-500",
  },
  {
    icon: Globe2,
    label: "Dedicated Support for",
    mainValue: "US, UK & CH",
    subValue: "Switzerland Included",
    extraDetail: "Audit | Tax | Advisory",
    locations: ["Delhi", "Hyderabad", "Ranchi", "Pune", "Noida"],
    locationLabel: "5 Locations in India",
    color: "from-purple-500/20 to-purple-600/5",
    accent: "bg-purple-500",
  },
  {
    icon: Heart,
    label: "Our Diversity",
    mainValue: "49 : 53",
    subValue: "Female : Male",
    extraDetail: "Gender Equality Ratio",
    color: "from-emerald-500/20 to-emerald-600/5",
    accent: "bg-emerald-500",
  },
];

export const StatsSection = () => {
  return (
    <section className="py-24 bg-[#030303] text-white">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              BU in <span className="text-white/40">Numbers.</span>
            </h2>
            <div className="h-1.5 w-20 bg-blue-600 rounded-full" />
          </div>
          <p className="text-gray-400 font-mono text-sm tracking-widest uppercase">
            Operational Excellence 2024
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`relative group p-8 rounded-[2.5rem] bg-gradient-to-br ${item.color} border border-white/10 overflow-hidden min-h-[460px] flex flex-col`}
            >
              {/* Icon & Label */}
              <div className="flex items-start justify-between mb-8">
                <div className={`p-4 rounded-2xl ${item.accent}/10 border border-white/10`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
               
              </div>

              {/* Card Label & Main Numbers */}
              <div className="flex-grow">
                <p className="text-white font-mono text-xs uppercase tracking-[0.2em] mb-3">
                  {item.label}
                </p>
                <h3 className="text-5xl font-bold tracking-tighter text-[#1e49e2] mb-1">
                  {item.mainValue}
                </h3>
                {item.subValue && (
                  <p className="text-xl font-medium text-gray-300 mb-6">
                    {item.subValue}
                  </p>
                )}
                
                {/* Special Highlight for Locations (Card 2) */}
                {item.locations && (
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#1e49e2] uppercase tracking-wider">
                      <MapPin className="w-3 h-3" />
                      {item.locationLabel}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(item.locations) && item.locations.map((loc) => (
                        <span key={loc} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-medium text-gray-300">
                          {loc}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Detail Rows */}
              <div className="space-y-3 pt-6 border-t border-white/5 mt-auto">
                <p className="text-sm font-semibold text-white/90 uppercase tracking-wider leading-snug">
                  {item.extraDetail}
                </p>
              </div>

              {/* Subtle Background Glow */}
              <div className={`absolute -right-10 -bottom-10 w-40 h-40 rounded-full blur-[80px] opacity-20 ${item.accent}`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;