'use client';

import { useState } from 'react';
import { ArrowRight, Loader2, Check, Zap } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function FinalCTA() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email, source: 'final-cta' }]);

      if (error) {
        if (error.code === '23505') {
          setErrorMessage('This email is already on the list');
        } else {
          setErrorMessage('Something went wrong. Try again.');
        }
        setStatus('error');
        return;
      }

      setStatus('success');
      setEmail('');
    } catch {
      setErrorMessage('Connection error. Try again.');
      setStatus('error');
    }
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-0 via-primary-900/20 to-surface-0" />

      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-3xl" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 mb-6 glow">
            <Zap className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Ready to stop staring at{' '}
            <span className="gradient-text-purple">the blank screen</span>?
          </h2>

          <p className="text-lg sm:text-xl text-text-secondary max-w-xl mx-auto">
            Join +100 creators on the waitlist for early access.
          </p>
        </div>

        {/* Form */}
        <div className="max-w-md mx-auto">
          {status === 'success' ? (
            <div className="bg-success/10 border border-success/30 rounded-2xl p-6 text-center animate-scale-in">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-success/20 mb-4">
                <Check className="w-6 h-6 text-success" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                You're on the list!
              </h3>
              <p className="text-text-secondary">
                We'll let you know when we launch. Check your email.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="you@email.com"
                  className={`
                    flex-1 px-4 py-3.5 rounded-xl
                    bg-surface-1 border
                    text-white placeholder:text-text-muted
                    focus:outline-none focus:ring-2 focus:ring-primary-500/50
                    transition-all duration-200
                    ${status === 'error' ? 'border-error' : 'border-border-subtle focus:border-primary-500'}
                  `}
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="
                    inline-flex items-center justify-center gap-2
                    px-6 py-3.5 rounded-xl
                    bg-gradient-to-r from-primary-500 to-primary-600
                    hover:from-primary-600 hover:to-primary-700
                    text-white font-semibold
                    transition-all duration-200
                    disabled:opacity-50 disabled:cursor-not-allowed
                    shadow-lg hover:shadow-glow
                    sm:min-w-[160px]
                  "
                >
                  {status === 'loading' ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Join
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>

              {status === 'error' && (
                <p className="text-sm text-error text-center">
                  {errorMessage}
                </p>
              )}
            </form>
          )}

          {/* Trust Badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-text-muted">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-success" />
              No spam
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-success" />
              Launch updates only
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
              Founders' offer
            </span>
          </div>
        </div>

        {/* Urgency */}
        <div className="mt-10 text-center">
          <span className="inline-block px-4 py-2 bg-accent/10 border border-accent/30 rounded-full text-sm text-accent">
            Limited beta - Spots are limited
          </span>
        </div>
      </div>
    </section>
  );
}
