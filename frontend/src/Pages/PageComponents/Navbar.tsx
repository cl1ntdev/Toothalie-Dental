import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      // Removed max-w-5xl and mx-auto, and increased padding slightly for ultra-wide screens
      className="fixed top-6 left-0 right-0 z-50 px-4 md:px-8 font-poppins w-full"
      aria-label="Main navigation"
    >
      {/* Main Glass Container */}
      <div className="flex items-center justify-between h-14 px-5 md:px-8 rounded-full bg-white/60 backdrop-blur-md border border-slate-100/50 shadow-sm w-full">
        
        {/* Left Side: Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <img
            src={logo}
            alt="Toothalie Logo"
            className="w-7 h-7 rounded-full object-cover"
          />
          <span className="font-ceramon font-medium text-lg tracking-tight text-slate-900 hidden sm:block">
            Toothalie
          </span>
        </Link>
      
        {/* Right Side: Nav Links & Mobile Menu */}
        <div className="flex items-center gap-6">
          
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
            >
              About
            </Link>
            <Link
              to="/contacts"
              className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
            >
              Contacts
            </Link>
          </div>
      
          {/* Mobile Menu Toggle Button */}
          <button
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            className="md:hidden p-1.5 -mr-1.5 text-slate-500 hover:text-slate-900 transition-colors"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 left-4 right-4 md:hidden bg-white/80 backdrop-blur-xl border border-white/50 shadow-xl rounded-2xl p-4 flex flex-col gap-2 overflow-hidden"
          >
            <Link
              to="/"
              onClick={toggleMobileMenu}
              className="px-4 py-3 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-white/50 rounded-xl transition-all"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={toggleMobileMenu}
              className="px-4 py-3 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-white/50 rounded-xl transition-all"
            >
              About
            </Link>
            <Link
              to="/contacts"
              onClick={toggleMobileMenu}
              className="px-4 py-3 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-white/50 rounded-xl transition-all"
            >
              Contacts
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
