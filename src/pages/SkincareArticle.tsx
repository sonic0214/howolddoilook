import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function SkincareArticle() {
  return (
    <div className="bg-white text-brand-dark">
      <Navbar />

      <article className="container mx-auto px-6 py-16 max-w-4xl">
        <Link to="/" className="text-terracotta hover:underline mb-8 inline-block">
          &larr; Back to Home
        </Link>

        <div className="mb-8">
          <p className="text-sm font-bold text-terracotta mb-4">SKINCARE</p>
          <h1 className="font-serif-display text-4xl md:text-5xl font-bold mb-6">
            The Minimalist's Guide to a Healthy Skin Barrier
          </h1>
          <img
            src="https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Minimalist skincare products"
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Discover why less is more when it comes to protecting your skin's natural defenses.
          </p>

          <h2 className="font-serif-display text-3xl font-bold mt-12 mb-4">
            What is the Skin Barrier?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Your skin barrier is the outermost layer of your skin, acting as a protective shield
            against environmental aggressors, bacteria, and moisture loss. When functioning
            properly, it keeps your skin hydrated, healthy, and radiant.
          </p>

          <h2 className="font-serif-display text-3xl font-bold mt-12 mb-4">
            Signs of a Compromised Barrier
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li>Dryness and flakiness</li>
            <li>Redness and irritation</li>
            <li>Increased sensitivity to products</li>
            <li>Breakouts and inflammation</li>
            <li>Rough or uneven texture</li>
          </ul>

          <h2 className="font-serif-display text-3xl font-bold mt-12 mb-4">
            The Minimalist Approach
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Instead of layering multiple products, focus on these essentials:
          </p>

          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3 className="font-bold text-xl mb-3">1. Gentle Cleanser</h3>
            <p className="text-gray-700 mb-4">
              Choose a pH-balanced, fragrance-free cleanser that won't strip your skin's natural
              oils. Look for ingredients like glycerin or ceramides.
            </p>

            <h3 className="font-bold text-xl mb-3">2. Hydrating Serum</h3>
            <p className="text-gray-700 mb-4">
              Hyaluronic acid is your best friend for maintaining hydration without heaviness.
              Apply to damp skin for maximum absorption.
            </p>

            <h3 className="font-bold text-xl mb-3">3. Moisturizer with Ceramides</h3>
            <p className="text-gray-700 mb-4">
              Ceramides are lipids that naturally occur in your skin barrier. Replenishing them
              helps restore and maintain barrier function.
            </p>

            <h3 className="font-bold text-xl mb-3">4. Broad-Spectrum SPF</h3>
            <p className="text-gray-700">
              UV damage is one of the biggest threats to your skin barrier. Use SPF 30+ daily,
              even on cloudy days.
            </p>
          </div>

          <h2 className="font-serif-display text-3xl font-bold mt-12 mb-4">
            What to Avoid
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Over-exfoliation, harsh ingredients (alcohol, fragrance), and excessive product
            layering can disrupt your skin barrier. Give your skin time to repair itself—
            sometimes the best treatment is doing less.
          </p>

          <div className="bg-terracotta/10 border-l-4 border-terracotta p-6 my-8">
            <p className="text-gray-800 italic">
              "Healthy skin isn't about perfection—it's about protection. A strong barrier is
              the foundation of radiant skin."
            </p>
          </div>

          <h2 className="font-serif-display text-3xl font-bold mt-12 mb-4">
            Building Your Routine
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Start with the basics and introduce new products slowly, one at a time. This allows
            you to identify what works for your skin and what doesn't. Remember: consistency is
            more important than complexity.
          </p>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <Link
            to="/"
            className="inline-flex items-center text-terracotta hover:text-amber-700 font-bold"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back to Home
          </Link>
        </div>
      </article>

      <Footer />
    </div>
  );
}
