import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute left-0 w-full h-full object-cover z-0 translate-y-[-50px]"
      >
        <source src="/public/threads-1768144359004.webm" type="video/mp4" />
      </video>

      {/* Optional dark overlay */}
      

      {/* Foreground Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col justify-center items-center">
          <h1 className="font-display text-8xl md:text-8xl lg:text-8xl font-bold leading-tight mb-6 text-white drop-shadow-xl">
            Capability Hub
          </h1>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
