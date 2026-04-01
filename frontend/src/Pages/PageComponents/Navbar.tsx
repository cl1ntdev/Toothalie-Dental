import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "../../assets/logo.png";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  
  const isManualScrolling = useRef(false);
  
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/#services" },
    { name: "Dentists", path: "/#dentists" },
    { name: "Reviews", path: "/#testimonials" },
    { name: "Contacts", path: "/contacts" },
  ];

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setIsHidden(true);
      setIsMobileMenuOpen(false);
    } else {
      setIsHidden(false);
    }
  });

  // 2. Precise Scroll Spy Logic
  useEffect(() => {
    const handleScroll = () => {
      // Skip spying if we are mid-animation from a click
      if (isManualScrolling.current) return;

      if (location.pathname === "/about") return setActiveSection("About Us");
      if (location.pathname === "/contacts") return setActiveSection("Contacts");

      if (window.scrollY < 100) return setActiveSection("Home");

      const scrollPosition = window.scrollY + 200; // Offset for navbar height

      for (const link of navLinks) {
        if (link.path.includes("#")) {
          const id = link.path.split("#")[1];
          const el = document.getElementById(id);
          
          if (el) {
            const top = el.offsetTop;
            const bottom = top + el.offsetHeight;

            if (scrollPosition >= top && scrollPosition < bottom) {
              setActiveSection(link.name);
              return;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const handleNavClick = (link) => {
    setIsMobileMenuOpen(false);
    setActiveSection(link.name);
    
    isManualScrolling.current = true;
    setTimeout(() => {
      isManualScrolling.current = false;
    }, 1000);

    if (link.path.includes("#")) {
      const [basePath, hash] = link.path.split("#");
      if (location.pathname === basePath || (location.pathname === "/" && basePath === "")) {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate(link.path);
        // Wait for page transition before scrolling
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) element.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    } else {
      navigate(link.path);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial="visible" // Removes the initial drop-down animation
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 },
      }}
      animate={isHidden ? "hidden" : "visible"}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-5 left-0 right-0 z-50 px-4 md:px-8 w-full"
    >
      <div className="flex items-center justify-between h-12 px-6 w-full max-w-7xl mx-auto bg-blue-50/40 backdrop-blur-xl border border-blue-100/50 rounded-full shadow-[0_8px_32px_rgba(15,23,42,0.05)]">
        
        {/* Branding */}
        <div 
          onClick={() => handleNavClick({ name: "Home", path: "/" })} 
          className="flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <img src={logo} alt="Logo" className="w-6 h-6 rounded-full shadow-sm" />
          <span className="font-bold text-base tracking-tighter text-blue-950 uppercase font-sans">
            Toothalie
          </span>
        </div>

        {/* Pill Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link)}
              className={`px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] transition-all rounded-full ${
                activeSection === link.name
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200" 
                  : "text-blue-400 hover:text-blue-700 hover:bg-blue-50/50"
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Action Area */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden xl:flex items-center gap-2">
            <span className="px-4 py-1.5 border border-blue-100 rounded-full text-[10px] font-bold text-blue-400 tracking-widest bg-white/40">
              +63 09453690017    
            </span>
          </div>

          <button 
            onClick={() => handleNavClick({ name: "", path: "/login" })}
            className="px-5 py-1.5 bg-blue-950 text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-blue-600 transition-all hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 hidden sm:block"
          >
            Book Now
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1.5 text-blue-900"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute top-16 left-4 right-4 bg-white/95 backdrop-blur-2xl border border-blue-100/50 rounded-3xl p-6 shadow-2xl lg:hidden flex flex-col gap-1"
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link)}
                className={`px-4 py-3 text-xs text-left font-bold uppercase tracking-widest rounded-xl transition-colors ${
                  activeSection === link.name ? "text-blue-600 bg-blue-50" : "text-blue-500"
                }`}
              >
                {link.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}