'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Is this just another AI writing tool?',
    answer: 'No. GetMyBrief is not for blogs or tweets. It\'s specifically designed for short-form video scripts with a proven 5-shot structure that drives engagement and conversions.',
  },
  {
    question: 'What if I don\'t like what the AI generates?',
    answer: 'Every script is a starting point. You can regenerate with different hooks, adjust the tone, or use the structure with your own words. The system adapts to your style.',
  },
  {
    question: 'Do I need to install anything?',
    answer: 'It\'s a Chrome extension. One click to install, works on any browser tab. No account required during the beta.',
  },
  {
    question: 'How is my data used?',
    answer: 'Your scripts are processed by DeepSeek AI and are not stored on our servers. We only save your email if you join the waitlist.',
  },
  {
    question: 'When does GetMyBrief launch?',
    answer: 'We\'re in active beta. Join the waitlist for early access and help us shape the product.',
  },
  {
    question: 'Is it free?',
    answer: 'The beta is free. We\'ll announce pricing before launch. Waitlist members will receive a special founders\' offer.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-surface-0">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-500/10 text-primary-400 text-sm font-medium mb-4">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-text-secondary">
            Everything you need to know
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="faq-item border border-border-subtle rounded-xl overflow-hidden bg-surface-1"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-surface-2 transition-colors"
              >
                <span className="font-medium text-white pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`
                    w-5 h-5 text-text-muted flex-shrink-0
                    transition-transform duration-200
                    ${openIndex === index ? 'rotate-180' : ''}
                  `}
                />
              </button>

              <div
                className={`
                  overflow-hidden transition-all duration-300 ease-in-out
                  ${openIndex === index ? 'max-h-96' : 'max-h-0'}
                `}
              >
                <div className="px-5 pb-5 text-text-secondary leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-text-secondary">
            Have another question?{' '}
            <a
              href="mailto:hello@getmybrief.com"
              className="text-primary-400 hover:text-primary-300 transition-colors"
            >
              Contact us
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
