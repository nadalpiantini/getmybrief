'use client';

import { PenLine, Sparkles, Video } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: PenLine,
    title: 'Write your idea',
    description: 'Open the Chrome extension. Write a topic, thought, or raw idea.',
    visual: 'extension-input',
  },
  {
    number: '02',
    icon: Sparkles,
    title: 'AI generates structure',
    description: 'DeepSeek AI creates a complete 5-shot script with hooks, visuals, and CTAs.',
    visual: 'ai-generating',
  },
  {
    number: '03',
    icon: Video,
    title: 'Film and post',
    description: 'Copy to your notes app. Film. Post. Grow.',
    visual: 'phone-filming',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-500/10 text-primary-400 text-sm font-medium mb-4">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            From idea to script in{' '}
            <span className="gradient-text">3 steps</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            No blocks, no excuses. Proven system.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 step-connector transform -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Step Number Badge */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 lg:top-0 lg:-translate-y-1/2">
                    <span className="inline-block px-3 py-1 bg-primary-500 text-white text-sm font-bold rounded-full">
                      {step.number}
                    </span>
                  </div>

                  {/* Card */}
                  <div className="w-full bg-surface-1 border border-border-subtle rounded-2xl p-6 pt-10 mt-4 card-hover">
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-600/10 border border-primary-500/20 mb-4">
                      <Icon className="w-8 h-8 text-primary-400" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Mobile Connector */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden w-0.5 h-8 bg-gradient-to-b from-primary-500 to-primary-600/50 my-2" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Time Badge */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-surface-1 border border-border-subtle rounded-full glow-sm">
            <span className="text-3xl font-bold gradient-text">~30s</span>
            <span className="text-text-secondary">total time</span>
          </div>
        </div>
      </div>
    </section>
  );
}
