import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import OptimizedImage from '../components/OptimizedImage';
import ArticleSchema from '../components/ArticleSchema';

export default function SkincareArticle() {
  return (
    <div className="bg-white text-brand-dark">
      <ArticleSchema
        type="Article"
        title="The Minimalist's Guide to a Healthy Skin Barrier"
        description="Discover why less is more when it comes to protecting your skin's natural defenses with our comprehensive guide to minimalist skincare."
        author="Lumin AI"
        datePublished="2025-10-28"
        imageUrl="https://howolddoilook.art/og-image.jpg"
        url="https://howolddoilook.art/articles/skincare-secrets"
      />
      <Navbar />
      <Breadcrumb />

      <article id="top" className="container mx-auto px-6 py-16 max-w-4xl">

        <div className="mb-8">
          <p className="text-sm font-bold text-terracotta mb-4">SKINCARE</p>
          <h1 className="font-serif-display text-4xl md:text-5xl font-bold mb-6">
            The Minimalist's Guide to a Healthy Skin Barrier
          </h1>
          <OptimizedImage
            src="https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Minimalist skincare products arranged for healthy skin barrier routine"
            className="w-full h-96 object-cover rounded-lg"
            loading="eager"
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
          <h3 className="font-serif-display text-2xl font-bold mb-6">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Link
              to="/nutrition-article"
              className="group bg-gray-50 p-6 rounded-lg hover:bg-terracotta/5 transition-colors"
            >
              <h4 className="font-bold text-lg mb-2 group-hover:text-terracotta transition-colors">
                Eating for Your Glow: Top 5 Antioxidant-Rich Foods
              </h4>
              <p className="text-gray-600 text-sm">
                Feed your skin from the inside with beauty-boosting foods.
              </p>
            </Link>
            <Link
              to="/mindfulness-article"
              className="group bg-gray-50 p-6 rounded-lg hover:bg-terracotta/5 transition-colors"
            >
              <h4 className="font-bold text-lg mb-2 group-hover:text-terracotta transition-colors">
                How 5 Minutes of Morning Stillness Can Change Your Day
              </h4>
              <p className="text-gray-600 text-sm">
                True radiance starts from within with simple mindfulness practices.
              </p>
            </Link>
          </div>

          <div className="bg-terracotta/5 p-6 rounded-lg mb-8">
            <h4 className="font-bold text-lg mb-4">💡 Try AI Age Analysis</h4>
            <p className="text-gray-700 mb-4">
              Discover your estimated age and unique Vibe Tag with our AI-powered analysis tool.
              It's fun, free, and provides insights beyond just numbers!
            </p>
            <Link
              to="/"
              className="inline-block bg-terracotta text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium"
            >
              Try AI Age Analysis →
            </Link>
          </div>

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
