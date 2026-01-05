import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import WaitlistForm from '@/components/WaitlistForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-dark">
      <Header />
      {/* Add padding-top to account for fixed header */}
      <div className="pt-16">
        <Hero />
        <section id="features">
          <Features />
        </section>
        <WaitlistForm />
        <Footer />
      </div>
    </main>
  );
}
