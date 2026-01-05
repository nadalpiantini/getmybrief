'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: '¿Esto es solo otra herramienta de IA para escribir?',
    answer: 'No. GetMyBrief no es para blogs ni tweets. Está diseñado específicamente para guiones de video corto con una estructura probada de 5 tomas que impulsa engagement y conversiones.',
  },
  {
    question: '¿Y si no me gusta lo que genera la IA?',
    answer: 'Cada guión es un punto de partida. Puedes regenerar con diferentes hooks, ajustar el tono, o usar la estructura con tus propias palabras. El sistema se adapta a tu estilo.',
  },
  {
    question: '¿Tengo que instalar algo?',
    answer: 'Es una extensión de Chrome. Un clic para instalar, funciona en cualquier pestaña del navegador. No necesitas crear cuenta durante la beta.',
  },
  {
    question: '¿Cómo se usan mis datos?',
    answer: 'Tus guiones son procesados por DeepSeek AI y no se almacenan en nuestros servidores. Solo guardamos tu email si te unes a la lista de espera.',
  },
  {
    question: '¿Cuándo lanza GetMyBrief?',
    answer: 'Estamos en beta activa. Únete a la lista de espera para acceso temprano y ayudarnos a moldear el producto.',
  },
  {
    question: '¿Es gratis?',
    answer: 'La beta es gratuita. Anunciaremos precios antes del lanzamiento. Los miembros de la lista de espera recibirán una oferta especial de fundadores.',
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
            Preguntas frecuentes
          </h2>
          <p className="text-lg text-text-secondary">
            Todo lo que necesitas saber
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
            ¿Tienes otra pregunta?{' '}
            <a
              href="mailto:hello@getmybrief.com"
              className="text-primary-400 hover:text-primary-300 transition-colors"
            >
              Escríbenos
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
