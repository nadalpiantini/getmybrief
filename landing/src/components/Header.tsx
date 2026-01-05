'use client';

import { useState } from 'react';
import { Sparkles, Menu, X } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-lg border-b border-white/5">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <span className="font-bold text-white text-lg">GetMyBrief</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-400 hover:text-white transition-colors text-sm">
              Features
            </a>
            <a href="#waitlist" className="text-gray-400 hover:text-white transition-colors text-sm">
              Waitlist
            </a>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#waitlist"
              className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
            >
              Log in
            </a>
            <a
              href="#waitlist"
              className="px-4 py-2 text-sm bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-all"
            >
              Get Started
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/5">
            <div className="flex flex-col gap-4">
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Features
              </a>
              <a
                href="#waitlist"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Waitlist
              </a>
              <div className="flex flex-col gap-2 pt-4 border-t border-white/5">
                <a
                  href="#waitlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 text-center text-gray-300 hover:text-white transition-colors"
                >
                  Log in
                </a>
                <a
                  href="#waitlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 text-center bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-all"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
