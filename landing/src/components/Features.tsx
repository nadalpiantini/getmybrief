'use client';

import {
  FileText,
  Mic,
  Clock,
  Sparkles,
  Target,
  MessageSquare
} from 'lucide-react';

const features = [
  {
    icon: <FileText className="w-6 h-6" />,
    title: 'Complete Scripts',
    description: '5-shot structure with exact timings, visuals, text, and audio. Ready to film.',
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Powerful Hooks',
    description: 'Curiosity, challenge, identification. Hooks that stop the scroll in the first 2 seconds.',
  },
  {
    icon: <Mic className="w-6 h-6" />,
    title: 'Exact Voice-Over',
    description: 'Each shot includes the exact text to say. No improvising, no hesitation.',
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: 'Emotional CTAs',
    description: 'Calls to action that connect: "Save this. You\'ll need to re-read it when you doubt."',
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'Proven System',
    description: 'Battle-tested methodology: visual symbols, unfiltered attitude, content with substance.',
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'From Your Browser',
    description: 'Chrome extension. One click, type your idea, get the complete script.',
  },
];

export default function Features() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface/30">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Everything you need to create content
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            It&apos;s not inspiration, it&apos;s a system. GetMyBrief automates the methodology
            that works for high-impact reels.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-surface rounded-2xl border border-white/5 card-hover"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
