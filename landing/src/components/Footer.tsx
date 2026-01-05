'use client';

import { Zap } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border-subtle bg-surface-0">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white">GetMyBrief</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-text-muted">
            <a href="#faq" className="hover:text-white transition-colors">
              FAQ
            </a>
            <a href="mailto:hello@getmybrief.com" className="hover:text-white transition-colors">
              Contacto
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-text-muted">
            © {currentYear} GetMyBrief
          </p>
        </div>
      </div>
    </footer>
  );
}
