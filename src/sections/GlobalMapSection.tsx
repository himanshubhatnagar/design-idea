import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface CountryData {
  name: string;
  displayLabel: string;
  coordinates: [number, number];
  offset: { x: number; y: number }; // Added for positioning
  color: string;
  stats: { label: string; value: string }[];
}

const highlightedCountries: CountryData[] = [
  {
    name: "United States of America",
    displayLabel: "US(HC:1,211)",
    coordinates: [-100, 38],
    offset: { x: -70, y: -115 }, // Standard center-top
    color: "#3b82f6",
    stats: [
      { label: "Insights", value: "420" },
      { label: "Risk Mgmt", value: "310" },
      { label: "Compliance", value: "98%" },
      { label: "AI Nodes", value: "14" },
      { label: "Efficiency", value: "+22%" },
      { label: "Uptime", value: "99.9%" },
      { label: "Security", value: "Tier 1" },
    ],
  },
  {
    name: "United Kingdom",
    displayLabel: "UK(HC:842)",
    coordinates: [-2, 53],
    offset: { x: -150, y: -130 }, // Pushed further Left and Up
    color: "#a855f7",
    stats: [
      { label: "Insights", value: "280" },
      { label: "Risk Mgmt", value: "190" },
      { label: "Compliance", value: "96%" },
      { label: "AI Nodes", value: "8" },
      { label: "Efficiency", value: "+18%" },
      { label: "Uptime", value: "99.8%" },
      { label: "Security", value: "Tier 1" },
    ],
  },
  {
    name: "Switzerland",
    displayLabel: "CH(HC:612)",
    coordinates: [8.2, 46.8],
    offset: { x: 10, y: -40 }, // Pushed Right and slightly Down
    color: "#10b981",
    stats: [
      { label: "Insights", value: "150" },
      { label: "Risk Mgmt", value: "420" },
      { label: "Compliance", value: "100%" },
      { label: "AI Nodes", value: "12" },
      { label: "Efficiency", value: "+30%" },
      { label: "Uptime", value: "99.9%" },
      { label: "Security", value: "Tier 1" },
    ],
  },
];

export const GlobalMapSection = () => {
  return (
    <section className="py-24 bg-[#030303] text-white min-h-screen">
      <div className="container mx-auto px-6">
        <div className="relative bg-white/[0.02] rounded-[2.5rem] border border-white/5 overflow-hidden h-[600px] w-full">
          <ComposableMap
            projectionConfig={{ scale: 180, center: [0, 40] }} // Zoomed in slightly on Northern Hemisphere
            width={800}
            height={500}
            style={{ width: "100%", height: "100%" }}
          >
            <ZoomableGroup zoom={1} minZoom={1} maxZoom={1} disablePanning>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const country = highlightedCountries.find(
                      (c) => c.name === geo.properties.name
                    );
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={country ? country.color : "#1a1a1a"}
                        stroke="#000"
                        strokeWidth={0.5}
                        style={{ default: { outline: "none" } }}
                      />
                    );
                  })
                }
              </Geographies>

              {highlightedCountries.map((country) => (
                <Marker key={country.name} coordinates={country.coordinates}>
                  {/* Point on the map */}
                  <circle r={2.5} fill={country.color} stroke="#fff" strokeWidth={1} />
                  
                  {/* Tooltip positioned using custom offset */}
                  <g transform={`translate(${country.offset.x}, ${country.offset.y})`}>
                    <rect
                      width="130"
                      height="95"
                      rx="6"
                      fill="white"
                      filter="drop-shadow(0px 5px 10px rgba(0,0,0,0.3))"
                    />
                    <text x="65" y="18" textAnchor="middle" fill="black" fontSize="8" fontWeight="900">
                      {country.displayLabel}
                    </text>
                    <line x1="10" y1="24" x2="120" y2="24" stroke="#eee" strokeWidth="1" />

                    {/* Stats Layout */}
                    <g transform="translate(10, 38)">
                      {country.stats.slice(0, 4).map((stat, i) => (
                        <g key={i} transform={`translate(0, ${i * 12})`}>
                          <text fill="#999" fontSize="6.5">{stat.label}</text>
                          <text x="50" textAnchor="end" fill="#000" fontSize="6.5" fontWeight="700">{stat.value}</text>
                        </g>
                      ))}
                    </g>
                    <g transform="translate(70, 38)">
                      {country.stats.slice(4).map((stat, i) => (
                        <g key={i} transform={`translate(0, ${i * 12})`}>
                          <text fill="#999" fontSize="6.5">{stat.label}</text>
                          <text x="50" textAnchor="end" fill="#000" fontSize="6.5" fontWeight="700">{stat.value}</text>
                        </g>
                      ))}
                    </g>
                  </g>
                </Marker>
              ))}
            </ZoomableGroup>
          </ComposableMap>
        </div>
      </div>
    </section>
  );
};

export default GlobalMapSection;
