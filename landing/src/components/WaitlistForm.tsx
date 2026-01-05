'use client';

import { useState } from 'react';
import { Mail, ArrowRight, Check, Loader2 } from 'lucide-react';
import { addToWaitlist } from '@/lib/supabase';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      await addToWaitlist(email.trim());
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'Error registering. Please try again.'
      );
    }
  };

  return (
    <section id="waitlist" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        {/* Section header */}
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Be one of the first to try it
        </h2>
        <p className="text-gray-400 mb-10">
          We&apos;re in active development. Join the waitlist and
          be among the first to get access when we launch.
        </p>

        {/* Form */}
        {status === 'success' ? (
          <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-2xl">
            <div className="flex items-center justify-center gap-3 text-green-400">
              <Check className="w-6 h-6" />
              <span className="text-lg font-medium">You&apos;re on the list!</span>
            </div>
            <p className="text-gray-400 mt-2 text-sm">
              We&apos;ll notify you when GetMyBrief is ready.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full pl-12 pr-4 py-4 bg-surface border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-8 py-4 bg-primary hover:bg-primary/90 disabled:opacity-50 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
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
          </form>
        )}

        {/* Error message */}
        {status === 'error' && (
          <p className="mt-4 text-red-400 text-sm">{errorMessage}</p>
        )}

        {/* Trust badge */}
        <p className="mt-6 text-xs text-gray-600">
          No spam. Only important updates about the launch.
        </p>
      </div>
    </section>
  );
}
