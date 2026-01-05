'use client';

import { useEffect, useState } from 'react';

const stats = [
  {
    value: 500,
    suffix: '+',
    label: 'guiones generados',
    description: 'en beta',
  },
  {
    value: 30,
    suffix: 's',
    label: 'tiempo promedio',
    description: 'por guión',
  },
  {
    value: 5,
    suffix: '',
    label: 'tomas estructuradas',
    description: 'en cada guión',
  },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export function SocialProof() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-900/20 via-primary-800/10 to-primary-900/20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Creado para creadores que van en serio
          </h2>
          <p className="text-text-secondary">
            Sistema probado por creadores reales
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-surface-1/50 backdrop-blur-sm border border-border-subtle rounded-2xl"
            >
              <div className="text-4xl sm:text-5xl font-bold gradient-text mb-2">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-lg font-medium text-white mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-text-muted">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* Future Testimonials Placeholder */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface-2 border border-border-subtle rounded-full">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 border-2 border-surface-2"
                />
              ))}
            </div>
            <span className="text-sm text-text-secondary">
              +100 creadores en la lista de espera
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
