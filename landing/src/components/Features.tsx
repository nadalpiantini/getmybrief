'use client';

import {
  Zap,
  AlertCircle,
  Lightbulb,
  Trophy,
  MessageSquareHeart,
  ArrowRight,
} from 'lucide-react';

const shots = [
  {
    number: 1,
    name: 'HOOK',
    icon: Zap,
    color: 'from-primary-500 to-primary-600',
    bgColor: 'bg-primary-500/10',
    textColor: 'text-primary-400',
    description: 'Stop the scroll in 2 seconds',
    example: '"90% of people get this wrong..."',
    timing: '0-2s',
  },
  {
    number: 2,
    name: 'PROBLEM',
    icon: AlertCircle,
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-500/10',
    textColor: 'text-red-400',
    description: 'Connect with viewer pain',
    example: 'The real problem your audience faces',
    timing: '2-8s',
  },
  {
    number: 3,
    name: 'SOLUTION',
    icon: Lightbulb,
    color: 'from-amber-500 to-amber-600',
    bgColor: 'bg-amber-500/10',
    textColor: 'text-amber-400',
    description: 'Your unique method or insight',
    example: 'The framework that changed everything',
    timing: '8-18s',
  },
  {
    number: 4,
    name: 'PROOF',
    icon: Trophy,
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-500/10',
    textColor: 'text-emerald-400',
    description: 'Credibility and results',
    example: '"This got me +300% engagement"',
    timing: '18-25s',
  },
  {
    number: 5,
    name: 'CTA',
    icon: MessageSquareHeart,
    color: 'from-pink-500 to-pink-600',
    bgColor: 'bg-pink-500/10',
    textColor: 'text-pink-400',
    description: 'Emotional action that converts',
    example: '"Save this. You\'ll need it."',
    timing: '25-30s',
  },
];

const additionalFeatures = [
  {
    title: 'Swappable Hooks',
    description: '3 hook variants per script. Curiosity, challenge, identification.',
  },
  {
    title: 'Suggested Visuals',
    description: 'Each shot includes what to show on screen. No more improvising.',
  },
  {
    title: 'Exact Voice-Over',
    description: 'The precise text to say. Not a word too many.',
  },
  {
    title: 'Goal-Based CTAs',
    description: 'Educate, inspire, entertain, or sell. CTA tailored to your goal.',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-500/10 text-primary-400 text-sm font-medium mb-4">
            The System
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            The <span className="gradient-text-purple">5-Shot</span> Structure
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            It's not inspiration, it's a <strong className="text-white">proven system</strong>.
            Every script follows the structure that works for high-impact reels.
          </p>
        </div>

        {/* 5-Shot Timeline */}
        <div className="relative mb-20">
          {/* Desktop Timeline Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-amber-500 to-pink-500 transform -translate-y-1/2 rounded-full opacity-30" />

          {/* Shots Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
            {shots.map((shot, index) => {
              const Icon = shot.icon;
              return (
                <div
                  key={index}
                  className="relative"
                >
                  {/* Card */}
                  <div className="bg-surface-1 border border-border-subtle rounded-2xl p-5 h-full card-hover relative z-10">
                    {/* Shot Number Badge */}
                    <div className={`
                      absolute -top-3 left-1/2 transform -translate-x-1/2
                      w-8 h-8 rounded-full bg-gradient-to-br ${shot.color}
                      flex items-center justify-center
                      text-white text-sm font-bold
                      shadow-lg
                    `}>
                      {shot.number}
                    </div>

                    {/* Icon */}
                    <div className={`
                      w-12 h-12 rounded-xl ${shot.bgColor}
                      flex items-center justify-center
                      mt-4 mb-3 mx-auto
                    `}>
                      <Icon className={`w-6 h-6 ${shot.textColor}`} />
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <h3 className={`text-sm font-bold ${shot.textColor} mb-1`}>
                        {shot.name}
                      </h3>
                      <p className="text-xs text-text-muted mb-3">
                        {shot.timing}
                      </p>
                      <p className="text-sm text-text-secondary mb-3">
                        {shot.description}
                      </p>
                      <p className="text-xs text-text-muted italic">
                        {shot.example}
                      </p>
                    </div>
                  </div>

                  {/* Mobile Connector */}
                  {index < shots.length - 1 && (
                    <div className="lg:hidden flex justify-center py-2">
                      <ArrowRight className="w-5 h-5 text-primary-500/50 rotate-90 sm:rotate-0" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Result Badge */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-surface-1 border border-border-subtle rounded-full">
            <span className="text-3xl font-bold gradient-text">~30s</span>
            <span className="text-text-secondary">structured reel</span>
          </div>
        </div>

        {/* Additional Features */}
        <div className="bg-surface-1 border border-border-subtle rounded-2xl p-8">
          <h3 className="text-xl font-semibold text-white text-center mb-8">
            Every script includes
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-2 h-2 rounded-full bg-primary-500 mx-auto mb-3" />
                <h4 className="font-medium text-white mb-1">
                  {feature.title}
                </h4>
                <p className="text-sm text-text-muted">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
