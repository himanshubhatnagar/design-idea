import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "About Us", href: "#home" },
  { name: "Services", href: "#features" },
  { name: "Impact", href: "#journey" },
  { name: "AI Journey", href: "#team" },
  { name: "Support", href: "#map" },
  { name: "Capabilities", href: "#contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for the floating look
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-6 pointer-events-none">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`
          pointer-events-auto
          flex items-center justify-between
          w-full max-w-6xl h-16 px-6 md:px-8
          transition-all duration-500 ease-in-out
          /* GLASSMORPHISM BASE */
          bg-black/40 backdrop-blur-md
          /* SOFT ROUNDED CORNERS */
          rounded-[2rem]
          /* SUBTLE WHITE BORDER */
          border border-white/10
          /* DYNAMIC SHADOW */
          ${scrolled ? "shadow-[0_8px_32px_rgba(0,0,0,0.5)] border-white/20" : "shadow-none"}
        `}
      >
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 transition-transform hover:scale-105">
          <img className="max-w-[70px] brightness-0 invert" src="/public/kpmg-white-logo.png" alt="kpmg-logo" />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm font-medium group"
            >
              {link.name}
              {/* Animated underline indicator */}
              <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-1/2 group-hover:left-1/4" />
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-white hover:bg-white/10 rounded-full transition-colors"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="absolute top-20 left-0 right-0 p-4 mx-4 bg-black/80 backdrop-blur-2xl rounded-3xl border border-white/10 md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium px-4 py-3 rounded-2xl"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

export default Navbar;