'use client';
import { useState, useEffect } from 'react';
import { FaCode } from 'react-icons/fa';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = ['home', 'projects'];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-zinc-950/90 backdrop-blur border-b border-zinc-800' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-xl">
          <FaCode />
          <span>M Naveed</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="text-zinc-400 hover:text-emerald-400 transition-colors text-sm capitalize tracking-wide"
            >
              {item}
            </a>
          ))}
          <a
            href="/login"
            className="text-xs border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 px-4 py-1.5 rounded-lg transition-all"
          >
            Admin
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-zinc-400 hover:text-emerald-400 transition-colors"
        >
          {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-zinc-950/95 backdrop-blur border-t border-zinc-800 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              onClick={() => setMenuOpen(false)}
              className="text-zinc-400 hover:text-emerald-400 transition-colors text-sm capitalize tracking-wide py-1"
            >
              {item}
            </a>
          ))}
          <a
            href="/login"
            onClick={() => setMenuOpen(false)}
            className="text-xs border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 px-4 py-2 rounded-lg transition-all text-center"
          >
            Admin
          </a>
        </div>
      )}
    </nav>
  );
}
