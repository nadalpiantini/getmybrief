'use client';

import { Sparkles, Zap, Clock } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface rounded-full border border-primary/30 mb-8">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-gray-300">Chrome Extension powered by DeepSeek AI</span>
        </div>

        {/* Main headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6">
          <span className="text-white">Generate reel scripts</span>
          <br />
          <span className="gradient-text">in seconds, not hours</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
          The <strong className="text-white">proven system</strong> automated: powerful hooks,
          5-shot structure, emotional CTAs. All from your browser.
        </p>

        {/* CTA Button */}
        <a
          href="#waitlist"
          className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-all glow"
        >
          <Zap className="w-5 h-5" />
          Join the Waitlist
        </a>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mt-16">
          <Stat icon={<Clock className="w-5 h-5" />} value="30s" label="to generate a script" />
          <Stat icon={<Sparkles className="w-5 h-5" />} value="5" label="structured shots" />
          <Stat icon={<Zap className="w-5 h-5" />} value="100%" label="ready to film" />
        </div>
      </div>
    </section>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex items-center gap-3 px-6 py-3 bg-surface/50 rounded-xl border border-white/5">
      <div className="text-primary">{icon}</div>
      <div>
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="text-sm text-gray-500">{label}</div>
      </div>
    </div>
  );
}
