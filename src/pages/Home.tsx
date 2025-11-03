import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Privacy from '../components/Privacy';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import HowItWorks from '../components/HowItWorks';
import CaseStudies from '../components/CaseStudies';
import FAQ from '../components/FAQ';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="bg-white text-brand-dark">
      <Helmet>
        <title>How Old Do I Look? - AI Age Analysis | Lumin AI</title>
        <meta name="description" content="Discover your perceived age with our advanced AI analysis. Upload your photo and get personalized insights for maintaining a youthful appearance with skincare, nutrition, and wellness tips." />
        <meta name="keywords" content="AI age analysis, age detection, how old do I look, skincare, anti-aging, facial analysis, age perception, youthful appearance" />
        <link rel="canonical" href="https://howolddoilook.art/" />

        {/* Open Graph */}
        <meta property="og:title" content="How Old Do I Look? - AI Age Analysis | Lumin AI" />
        <meta property="og:description" content="Discover your perceived age with our advanced AI analysis. Get personalized insights for maintaining youthful appearance." />
        <meta property="og:image" content="https://howolddoilook.art/og-image.jpg" />
        <meta property="og:url" content="https://howolddoilook.art/" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="How Old Do I Look? - AI Age Analysis" />
        <meta name="twitter:description" content="Discover your perceived age with our advanced AI analysis" />
        <meta name="twitter:image" content="https://howolddoilook.art/og-image.jpg" />
      </Helmet>

      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <Privacy />
      <Testimonials />
      <CaseStudies />
        <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
