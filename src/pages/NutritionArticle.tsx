import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import OptimizedImage from '../components/OptimizedImage';
import ArticleSchema from '../components/ArticleSchema';

export default function NutritionArticle() {
  return (
    <div className="bg-white text-brand-dark">
      <ArticleSchema
        type="Article"
        title="Anti-Aging Foods That Make You Look Younger"
        description="Discover the powerful foods that fight aging from within and help maintain a youthful appearance through proper nutrition."
        author="Lumin AI"
        datePublished="2025-11-01"
        imageUrl="https://howolddoilook.art/og-image.jpg"
        imageCreator="Lumin AI"
        imageCreditText="Image created by Lumin AI"
        imageCopyrightNotice="© 2025 Lumin AI. All rights reserved."
        url="https://howolddoilook.art/nutrition-article"
      />
      <Navbar />
      <Breadcrumb />

      <article id="top" className="container mx-auto px-6 py-16 max-w-4xl">

        <div className="mb-8">
          <p className="text-sm font-bold text-terracotta mb-4">NUTRITION</p>
          <h1 className="font-serif-display text-4xl md:text-5xl font-bold mb-6">
            Anti-Aging Foods That Make You Look Younger
          </h1>
          <OptimizedImage
            src="https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Fresh colorful anti-aging foods including berries, nuts, and vegetables"
            className="w-full h-96 object-cover rounded-lg"
            loading="eager"
          />
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            The secret to maintaining a youthful appearance isn't just skincare—it's also about what you eat. These powerful anti-aging foods can help you look younger than your actual age.
          </p>

          <h2 className="font-serif-display text-3xl font-bold mt-12 mb-4">
            How Food Affects Your Appearance
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            What you eat directly impacts how you look. Anti-aging foods work by:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li>Fighting free radicals that damage skin cells</li>
            <li>Boosting collagen production for skin elasticity</li>
            <li>Reducing inflammation that causes premature aging</li>
            <li>Providing essential nutrients for skin regeneration</li>
            <li>Hydrating skin from within for a plump, youthful appearance</li>
          </ul>

          <h2 className="font-serif-display text-3xl font-bold mt-12 mb-4">
            Top Anti-Aging Foods
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Incorporate these powerful anti-aging foods into your diet for a more youthful appearance:
          </p>

          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3 className="font-bold text-xl mb-3">1. Berries</h3>
            <p className="text-gray-700 mb-4">
              Blueberries, strawberries, and raspberries are packed with antioxidants that protect skin from free radical damage, preventing premature aging and maintaining skin's youthful glow.
            </p>

            <h3 className="font-bold text-xl mb-3">2. Fatty Fish</h3>
            <p className="text-gray-700 mb-4">
              Salmon, mackerel, and sardines provide omega-3 fatty acids that reduce inflammation and keep skin hydrated, reducing the appearance of fine lines and wrinkles.
            </p>

            <h3 className="font-bold text-xl mb-3">3. Nuts and Seeds</h3>
            <p className="text-gray-700 mb-4">
              Almonds, walnuts, and flaxseeds contain vitamin E and healthy fats that protect skin from UV damage and maintain skin elasticity for a younger appearance.
            </p>

            <h3 className="font-bold text-xl mb-3">4. Leafy Greens</h3>
            <p className="text-gray-700 mb-4">
              Spinach, kale, and other leafy greens are rich in vitamins A, C, and E, which promote skin cell turnover and collagen production for youthful-looking skin.
            </p>

            <h3 className="font-bold text-xl mb-3">5. Avocados</h3>
            <p className="text-gray-700">
              Rich in healthy fats and vitamin E, avocados hydrate skin from within and protect against oxidative stress that accelerates aging.
            </p>
          </div>

          <h2 className="font-serif-display text-3xl font-bold mt-12 mb-4">
            Foods That Accelerate Aging
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Avoid these foods that can make you look older than your actual age:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li><strong>Sugar and refined carbs</strong> cause glycation, damaging collagen and elastin</li>
            <li><strong>Processed foods</strong> contain preservatives that promote inflammation</li>
            <li><strong>Excessive alcohol</strong> dehydrates skin and causes oxidative stress</li>
            <li><strong>Charred meats</strong> contain AGEs that accelerate aging</li>
            <li><strong>Trans fats</strong> promote inflammation and damage skin cells</li>
          </ul>

          <div className="bg-terracotta/10 border-l-4 border-terracotta p-6 my-8">
            <p className="text-gray-800 italic">
              "You are what you eat. The right foods can literally turn back the clock on your appearance, while the wrong ones can add years to how you look and feel."
            </p>
          </div>

          <h2 className="font-serif-display text-3xl font-bold mt-12 mb-4">
            Building Your Anti-Aging Diet
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Start by incorporating one or two anti-aging foods into each meal. Focus on variety and consistency rather than perfection. The key is making these nutrient-dense foods a regular part of your diet.
          </p>

          <h2 className="font-serif-display text-3xl font-bold mt-12 mb-4">
            The Results: Younger-Looking Skin
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            When you prioritize anti-aging foods, you'll notice:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li><strong>Smoother skin texture</strong> as collagen production increases</li>
            <li><strong>Reduced wrinkles</strong> as hydration improves from within</li>
            <li><strong>Brighter complexion</strong> as inflammation decreases</li>
            <li><strong>Better skin elasticity</strong> as nutrients support skin health</li>
            <li><strong>Overall youthful appearance</strong> that others will notice</li>
          </ul>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <h3 className="font-serif-display text-2xl font-bold mb-6">More Ways to Look Younger</h3>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Link
              to="/skincare-article"
              className="group bg-gray-50 p-6 rounded-lg hover:bg-terracotta/5 transition-colors"
            >
              <h4 className="font-bold text-lg mb-2 group-hover:text-terracotta transition-colors">
                The Anti-Aging Skincare Secret
              </h4>
              <p className="text-gray-600 text-sm">
                Discover the skincare routine that helps you look younger than your age.
              </p>
            </Link>
            <Link
              to="/mindfulness-article"
              className="group bg-gray-50 p-6 rounded-lg hover:bg-terracotta/5 transition-colors"
            >
              <h4 className="font-bold text-lg mb-2 group-hover:text-terracotta transition-colors">
                Stress Reduction for Younger Appearance
              </h4>
              <p className="text-gray-600 text-sm">
                How managing stress can prevent premature aging and maintain youthfulness.
              </p>
            </Link>
          </div>

          <div className="bg-terracotta/5 p-6 rounded-lg mb-8">
            <h4 className="font-bold text-lg mb-4">🔍 Check Your Age Appearance</h4>
            <p className="text-gray-700 mb-4">
              Curious if your anti-aging efforts are working? Our AI analysis reveals your perceived age and personalized insights.
            </p>
            <Link
              to="/"
              className="inline-block bg-terracotta text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium"
            >
              Try Age Analysis →
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