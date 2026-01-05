'use client';

import { Brain, Calendar, Smartphone, ArrowUpRight } from 'lucide-react';

const painPoints = [
  {
    icon: Brain,
    title: 'Creative Block',
    description: 'You open Instagram. You know you should post. But ideas just... don\'t come.',
    color: 'from-red-500/20 to-red-600/10',
    iconColor: 'text-red-400',
  },
  {
    icon: Calendar,
    title: 'Inconsistency',
    description: 'One week you post strong. The next, total silence. Your audience forgets you.',
    color: 'from-orange-500/20 to-orange-600/10',
    iconColor: 'text-orange-400',
  },
  {
    icon: Smartphone,
    title: 'Weak Hooks',
    description: 'They scroll past in 0.5 seconds. Your message never gets heard.',
    color: 'from-yellow-500/20 to-yellow-600/10',
    iconColor: 'text-yellow-400',
  },
  {
    icon: ArrowUpRight,
    title: 'Generic CTAs',
    description: '"Link in bio" doesn\'t work anymore. No one clicks. No one engages.',
    color: 'from-pink-500/20 to-pink-600/10',
    iconColor: 'text-pink-400',
  },
];

export function ProblemSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface-0">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Sound familiar?
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            If you create content, you've probably felt this
          </p>
        </div>

        {/* Pain Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {painPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className={`
                  relative overflow-hidden
                  bg-gradient-to-br ${point.color}
                  border border-border-subtle
                  rounded-2xl p-6
                  transition-all duration-300
                  hover:border-border-strong hover:scale-[1.02]
                  card-hover
                `}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className={`
                  inline-flex items-center justify-center
                  w-12 h-12 rounded-xl
                  bg-surface-2 border border-border-subtle
                  mb-4
                `}>
                  <Icon className={`w-6 h-6 ${point.iconColor}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-2">
                  {point.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {point.description}
                </p>

                {/* Decorative element */}
                <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/5 blur-2xl" />
              </div>
            );
          })}
        </div>

        {/* Transition */}
        <div className="mt-16 text-center">
          <p className="text-xl sm:text-2xl font-medium text-white">
            What if content had a{' '}
            <span className="gradient-text-purple">system</span>?
          </p>
          <div className="mt-6 flex justify-center">
            <svg
              className="w-6 h-6 text-primary-500 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
