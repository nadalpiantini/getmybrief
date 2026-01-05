import Header from '@/components/Header';
import Hero from '@/components/Hero';
import { ProblemSection } from '@/components/ProblemSection';
import Features from '@/components/Features';
import { HowItWorks } from '@/components/HowItWorks';
import { SocialProof } from '@/components/SocialProof';
import { FAQ } from '@/components/FAQ';
import { FinalCTA } from '@/components/FinalCTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-surface-0">
      <Header />
      {/* Add padding-top to account for fixed header */}
      <div className="pt-16">
        {/* 1. Hero - Pain-focused headline with waitlist */}
        <Hero />

        {/* 2. Problem - Pain point agitation */}
        <ProblemSection />

        {/* 3. Features - 5-toma system as differentiator */}
        <Features />

        {/* 4. How It Works - 3 simple steps */}
        <HowItWorks />

        {/* 5. Social Proof - Stats and trust */}
        <SocialProof />

        {/* 6. FAQ - Common questions */}
        <FAQ />

        {/* 7. Final CTA - Strong closing waitlist */}
        <FinalCTA />

        {/* 8. Footer */}
        <Footer />
      </div>
    </main>
  );
}
