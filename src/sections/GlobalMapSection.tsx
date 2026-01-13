import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Updated with modern neon colors
const highlightedCountries = [
  { name: "United States of America", code: "USA", color: "#3b82f6", region: "Americas" },
  { name: "United Kingdom", code: "GBR", color: "#a855f7", region: "Europe" },
  { name: "Switzerland", code: "CHE", color: "#10b981", region: "Europe" },
];

export const GlobalMapSection = () => {
  const [tooltip, setTooltip] = useState<{ name: string; color: string } | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMouseMove = (e: React.MouseEvent, geo: any) => {
    const country = highlightedCountries.find((c) => c.name === geo.properties.name);
    if (country) {
      setTooltip({ name: country.name, color: country.color });
      setPosition({ x: e.clientX, y: e.clientY });
    } else {
      setTooltip(null);
    }
  };

  return (
    <section id="map" className="py-24 bg-[#030303] text-white">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-16"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="h-[1px] w-12 bg-blue-500" />
            <span className="text-blue-500 font-mono text-xs tracking-widest uppercase">Coverage</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Global <span className="text-white/40">Support.</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Strategically positioned to deliver AI-driven insights across major global financial hubs.
          </p>
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-white/[0.02] rounded-[2.5rem] border border-white/5 overflow-hidden backdrop-blur-sm shadow-2xl"
        >
          <div className="w-full h-[500px] md:h-[650px] cursor-crosshair">
            <ComposableMap
              projectionConfig={{ scale: 160, center: [0, 10] }}
              style={{ width: "100%", height: "100%" }}
            >
              <ZoomableGroup zoom={1} minZoom={1} maxZoom={1} disablePanning>
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const isHighlighted = highlightedCountries.find(
                        (c) => c.name === geo.properties.name
                      );
                      
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onMouseMove={(e) => handleMouseMove(e, geo)}
                          onMouseLeave={() => setTooltip(null)}
                          style={{
                            default: {
                              fill: isHighlighted ? isHighlighted.color : "#1a1a1a",
                              stroke: "#000",
                              strokeWidth: 0.5,
                              outline: "none",
                              transition: "all 300ms",
                            },
                            hover: {
                              fill: isHighlighted ? isHighlighted.color : "#2a2a2a",
                              stroke: isHighlighted ? "#fff" : "#444",
                              strokeWidth: 1,
                              outline: "none",
                              cursor: isHighlighted ? "pointer" : "default"
                            },
                            pressed: { outline: "none" }
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>
          </div>

          {/* Floating Glass Legend */}
          <div className="absolute bottom-8 left-8 right-8 md:left-auto md:w-80 p-6 bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 text-center md:text-left">Supported Regions</h4>
            <div className="space-y-3">
              {highlightedCountries.map((country, index) => (
                <div key={index} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.2)]" 
                      style={{ backgroundColor: country.color, boxShadow: `0 0 12px ${country.color}66` }}
                    />
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{country.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-gray-600 uppercase tracking-tighter">{country.region}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Enhanced Tooltip */}
        <AnimatePresence>
          {tooltip && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed z-50 px-4 py-2 bg-white text-black text-xs font-bold rounded-full shadow-2xl pointer-events-none flex items-center gap-2"
              style={{
                left: position.x + 20,
                top: position.y - 20,
              }}
            >
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tooltip.color }} />
              {tooltip.name}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GlobalMapSection;