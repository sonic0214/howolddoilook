import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Privacy from '../components/Privacy';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import HowItWorks from '../components/HowItWorks';
import CaseStudies from '../components/CaseStudies';
import Articles from '../components/Articles';
import RelatedContent from '../components/RelatedContent';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="bg-white text-brand-dark">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <Privacy />
      <Testimonials />
      <CaseStudies />
      <Articles />
      <RelatedContent />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
