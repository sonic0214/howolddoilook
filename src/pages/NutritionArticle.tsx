import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';

export default function NutritionArticle() {
  return (
    <div className="bg-white text-brand-dark">
      <Navbar />
      <Breadcrumb />

      <article id="top" className="container mx-auto px-6 py-16 max-w-4xl">
        <Link to="/" className="text-terracotta hover:underline mb-8 inline-block">
          &larr; Back to Home
        </Link>

        <div className="mb-8">
          <p className="text-sm font-bold text-terracotta mb-4">NUTRITION</p>
          <h1 className="font-serif-display text-4xl md:text-5xl font-bold mb-6">
            Eating for Your Glow: Top 5 Antioxidant-Rich Foods
          </h1>
          <img
            src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Healthy salad bowl"
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Feed your skin from the inside. We break down the science behind beauty-boosting foods.
          </p>

          <h2 className="font-serif-display text-3xl font-bold mt-12 mb-4">
            Why Antioxidants Matter
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Antioxidants protect your cells from free radicals—unstable molecules that cause
            oxidative stress and accelerate aging. By incorporating antioxidant-rich foods into
            your diet, you're giving your skin the tools it needs to repair and regenerate.
          </p>

          <h2 className="font-serif-display text-3xl font-bold mt-12 mb-4">
            Top 5 Antioxidant Powerhouses
          </h2>

          <div className="space-y-8 my-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-2xl mb-3 flex items-center">
                <span className="text-terracotta mr-3">1.</span>
                Blueberries
              </h3>
              <p className="text-gray-700 mb-3">
                These tiny berries pack a powerful punch with anthocyanins, which give them their
                deep blue color. Studies show they can improve skin elasticity and reduce signs
                of aging.
              </p>
              <p className="text-sm text-gray-600 italic">
                💡 Tip: Add a handful to your morning smoothie or yogurt bowl.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-2xl mb-3 flex items-center">
                <span className="text-terracotta mr-3">2.</span>
                Dark Leafy Greens
              </h3>
              <p className="text-gray-700 mb-3">
                Spinach, kale, and Swiss chard are loaded with vitamins A, C, and E—all essential
                for collagen production and skin protection. They also contain lutein, which helps
                maintain skin hydration.
              </p>
              <p className="text-sm text-gray-600 italic">
                💡 Tip: Sauté with garlic and olive oil, or blend into a green juice.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-2xl mb-3 flex items-center">
                <span className="text-terracotta mr-3">3.</span>
                Wild-Caught Salmon
              </h3>
              <p className="text-gray-700 mb-3">
                Rich in omega-3 fatty acids and astaxanthin (a powerful antioxidant), salmon helps
                reduce inflammation and keep skin supple. The protein content also supports
                collagen synthesis.
              </p>
              <p className="text-sm text-gray-600 italic">
                💡 Tip: Aim for 2-3 servings per week. Grill with lemon and herbs.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-2xl mb-3 flex items-center">
                <span className="text-terracotta mr-3">4.</span>
                Green Tea
              </h3>
              <p className="text-gray-700 mb-3">
                EGCG (epigallocatechin gallate) in green tea is one of the most potent antioxidants
                available. It helps protect against UV damage and can improve skin texture when
                consumed regularly.
              </p>
              <p className="text-sm text-gray-600 italic">
                💡 Tip: Brew at 175°F for maximum antioxidant retention. Drink 2-3 cups daily.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-2xl mb-3 flex items-center">
                <span className="text-terracotta mr-3">5.</span>
                Dark Chocolate (70%+ Cacao)
              </h3>
              <p className="text-gray-700 mb-3">
                Yes, chocolate can be good for your skin! Dark chocolate contains flavonols that
                improve blood flow to the skin and protect against sun damage. The key is choosing
                high-quality dark chocolate with minimal added sugar.
              </p>
              <p className="text-sm text-gray-600 italic">
                💡 Tip: Enjoy 1-2 squares daily as a treat. Look for organic, fair-trade options.
              </p>
            </div>
          </div>

          <div className="bg-terracotta/10 border-l-4 border-terracotta p-6 my-8">
            <p className="text-gray-800 italic">
              "Beauty is not just skin deep—it starts on your plate. What you eat today becomes
              the building blocks of your skin tomorrow."
            </p>
          </div>

          <h2 className="font-serif-display text-3xl font-bold mt-12 mb-4">
            Building a Glow-Boosting Meal Plan
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Incorporate at least 3-4 of these foods into your daily diet. Variety is key—different
            antioxidants work synergistically to provide maximum benefit. Pair with adequate
            hydration (8 glasses of water daily) and you'll notice improvements in 4-6 weeks.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            Remember: supplements can help, but whole foods provide a complex array of nutrients
            that work together. Focus on eating a colorful, diverse diet for optimal results.
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
