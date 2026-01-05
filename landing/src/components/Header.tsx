'use client';

import { useState } from 'react';
import { Zap, Menu, X } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-0/80 backdrop-blur-lg border-b border-border-subtle">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-glow transition-shadow">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white text-lg">GetMyBrief</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-text-secondary hover:text-white transition-colors text-sm">
              El Sistema
            </a>
            <a href="#how-it-works" className="text-text-secondary hover:text-white transition-colors text-sm">
              Cómo Funciona
            </a>
            <a href="#faq" className="text-text-secondary hover:text-white transition-colors text-sm">
              FAQ
            </a>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#waitlist"
              className="px-5 py-2 text-sm bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium rounded-lg transition-all shadow-md hover:shadow-glow"
            >
              Acceso Beta
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-text-secondary hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border-subtle">
            <div className="flex flex-col gap-4">
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="text-text-secondary hover:text-white transition-colors"
              >
                El Sistema
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="text-text-secondary hover:text-white transition-colors"
              >
                Cómo Funciona
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="text-text-secondary hover:text-white transition-colors"
              >
                FAQ
              </a>
              <div className="pt-4 border-t border-border-subtle">
                <a
                  href="#waitlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 text-center bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium rounded-lg"
                >
                  Acceso Beta
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
