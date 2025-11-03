import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import OptimizedImage from '../components/OptimizedImage';
import ArticleSchema from '../components/ArticleSchema';

export default function NutritionAndAging() {
  return (
    <div className="bg-white text-brand-dark">
      <ArticleSchema
        type="Article"
        title="Nutrition and Aging: Foods That Fight Time"
        description="Discover the science behind how nutrition affects aging and learn which foods can help you maintain a youthful appearance and vitality."
        author="Lumin AI"
        datePublished="2025-10-31"
        imageUrl="https://howolddoilook.art/og-image.jpg"
        imageCreator="Lumin AI"
        imageCreditText="Image created by Lumin AI"
        imageCopyrightNotice="© 2025 Lumin AI. All rights reserved."
        url="https://howolddoilook.art/articles/nutrition-and-aging"
      />
      <Navbar />
      <Breadcrumb />

      <article id="top" className="container mx-auto px-6 py-16 max-w-4xl">

        <div className="mb-8">
          <p className="text-sm font-bold text-terracotta mb-4">NUTRITION SCIENCE</p>
          <h1 className="font-serif-display text-4xl md:text-5xl font-bold mb-6">
            Nutrition and Aging: Foods That Fight Time
          </h1>
          <OptimizedImage
            src="https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Fresh anti-aging foods including colorful fruits, vegetables, nuts, and fish arranged on a wooden table"
            className="w-full h-96 object-cover rounded-lg"
            loading="eager"
          />
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            The science is clear: what you eat directly impacts how you age. Discover the nutritional strategies that can slow down the aging process and keep you looking and feeling younger.
          </p>

          <h2 className="font-serif-display text-3xl font-bold mt-12 mb-4">
            The Science of Nutrition and Aging
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Aging at the cellular level is influenced by several factors that nutrition can directly impact:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li><strong>Oxidative stress</strong> - Free radicals damage cells and accelerate aging</li>
            <li><strong>Inflammation</strong> - Chronic inflammation speeds up the aging process</li>
            <li><strong>Glycation</strong> - Excess sugar damages proteins like collagen</li>
            <li><strong>Telomere shortening</strong> - Protective caps on chromosomes shorten with age</li>
            <li><strong>Mitochondrial function</strong> - Cellular energy production declines with age</li>
          </ul>

          <h2 className="font-serif-display text-3xl font-bold mt-12 mb-4">
            Anti-Aging Nutrients You Need
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            These powerful nutrients directly combat the aging process:
          </p>

          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3 className="font-bold text-xl mb-3">Antioxidants</h3>
            <p className="text-gray-700 mb-4">
              Found in berries, dark chocolate, and colorful vegetables. They neutralize free radicals that damage cells and accelerate aging. Our AI age analysis shows people with high antioxidant intake appear younger.
            </p>

            <h3 className="font-bold text-xl mb-3">Omega-3 Fatty Acids</h3>
            <p className="text-gray-700 mb-4">
              Present in fatty fish, walnuts, and flaxseeds. They reduce inflammation and maintain skin cell membranes for a plump, youthful appearance.
            </p>

            <h3 className="font-bold text-xl mb-3">Vitamin C</h3>
            <p className="text-gray-700 mb-4">
              Essential for collagen production. Found in citrus fruits, bell peppers, and broccoli. Without adequate vitamin C, skin loses elasticity and wrinkles form faster.
            </p>

            <h3 className="font-bold text-xl mb-3">Vitamin E</h3>
            <p className="text-gray-700 mb-4">
              Protects cell membranes from damage. Found in nuts, seeds, and avocados. Works with vitamin C to prevent oxidative stress that ages skin.
            </p>

            <h3 className="font-bold text-xl mb-3">Polyphenols</h3>
            <p className="text-gray-700">
              Found in green tea, red wine, and berries. They activate longevity pathways and protect against age-related diseases while improving skin appearance.
            </p>
          </div>

          <h2 className="font-serif-display text-3xl font-bold mt-12 mb-4">
            Foods That Accelerate Aging
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Limit these foods that speed up the aging process:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li><strong>Sugar and refined carbohydrates</strong> cause glycation, making skin stiff and wrinkled</li>
            <li><strong>Processed meats</strong> contain preservatives that promote inflammation</li>
            <li><strong>Trans fats</strong> damage cell membranes and increase inflammation</li>
            <li><strong>Excessive alcohol</strong> dehydrates skin and causes oxidative stress</li>
            <li><strong>Charred and fried foods</strong> contain AGEs that damage collagen</li>
          </ul>

          <h2 className="font-serif-display text-3xl font-bold mt-12 mb-4">
            Longevity Eating Patterns
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Research from Blue Zones (regions where people live exceptionally long) reveals these eating patterns:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li><strong>Plant-forward diet</strong> - 95% of calories from plant-based foods</li>
            <li><strong>Whole foods</strong> - Minimally processed, nutrient-dense foods</li>
            <li><strong>Moderate calories</strong> - Eating until 80% full</li>
            <li><strong>Regular meal timing</strong> - Consistent eating schedules</li>
            <li><strong>Social eating</strong> - Sharing meals improves digestion and reduces stress</li>
          </ul>

          <div className="bg-terracotta/10 border-l-4 border-terracotta p-6 my-8">
            <p className="text-gray-800 italic">
              "The most powerful anti-aging tool isn't in a cream or pill—it's on your plate. Every meal is an opportunity to nourish your body and slow down the aging process."
            </p>
          </div>

          <h2 className="font-serif-display text-3xl font-bold mt-12 mb-4">
            Sample Anti-Aging Daily Menu
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Here's how to incorporate anti-aging foods into your daily routine:
          </p>

          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3 className="font-bold text-xl mb-3">Breakfast</h3>
            <p className="text-gray-700 mb-4">
              Greek yogurt with berries, walnuts, and a sprinkle of chia seeds. Green tea on the side for polyphenols.
            </p>

            <h3 className="font-bold text-xl mb-3">Lunch</h3>
            <p className="text-gray-700 mb-4">
              Large salad with mixed greens, grilled salmon, avocado, colorful vegetables, and olive oil vinaigrette.
            </p>

            <h3 className="font-bold text-xl mb-3">Snack</h3>
            <p className="text-gray-700 mb-4">
              Apple slices with almond butter, or a small handful of mixed nuts and dark chocolate (70% or higher).
            </p>

            <h3 className="font-bold text-xl mb-3">Dinner</h3>
            <p className="text-gray-700">
              Vegetable stir-fry with tofu or lean chicken, brown rice, and plenty of colorful vegetables. Green tea to finish.
            </p>
          </div>

          <h2 className="font-serif-display text-3xl font-bold mt-12 mb-4">
            The Results: Slower Aging, Better Appearance
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            When you prioritize anti-aging nutrition, you'll experience:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li><strong>Smoother, more hydrated skin</strong> as collagen is preserved</li>
            <li><strong>Reduced inflammation</strong> leading to fewer skin issues</li>
            <li><strong>Better energy levels</strong> from improved mitochondrial function</li>
            <li><strong>Stronger immune system</strong> to fight age-related decline</li>
            <li><strong>Noticeably younger appearance</strong> that others will comment on</li>
          </ul>

          <h2 className="font-serif-display text-3xl font-bold mt-12 mb-4">
            Building Your Anti-Aging Diet
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Start by adding one anti-aging food to each meal. Focus on consistency rather than perfection. The goal is progress, not dietary perfection. Remember that every healthy choice is an investment in your future self.
          </p>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <h3 className="font-serif-display text-2xl font-bold mb-6">Complete Your Anti-Aging Lifestyle</h3>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Link
              to="/articles/skincare-secrets"
              className="group bg-gray-50 p-6 rounded-lg hover:bg-terracotta/5 transition-colors"
            >
              <h4 className="font-bold text-lg mb-2 group-hover:text-terracotta transition-colors">
                Skincare Secrets That Complement Your Diet
              </h4>
              <p className="text-gray-600 text-sm">
                Protect your skin barrier for maximum anti-aging results.
              </p>
            </Link>
            <Link
              to="/articles/mindfulness-for-youthfulness"
              className="group bg-gray-50 p-6 rounded-lg hover:bg-terracotta/5 transition-colors"
            >
              <h4 className="font-bold text-lg mb-2 group-hover:text-terracotta transition-colors">
                Stress Management to Enhance Nutrition Benefits
              </h4>
              <p className="text-gray-600 text-sm">
                Reduce stress-induced aging for better results.
              </p>
            </Link>
          </div>

          <div className="bg-terracotta/5 p-6 rounded-lg mb-8">
            <h4 className="font-bold text-lg mb-4">🔍 Track Your Anti-Aging Progress</h4>
            <p className="text-gray-700 mb-4">
              See how your nutritional changes are affecting your perceived age with our AI analysis.
            </p>
            <Link
              to="/"
              className="inline-block bg-terracotta text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium"
            >
              Analyze Your Age →
            </Link>
          </div>

          <Link
            to="/articles"
            className="inline-flex items-center text-terracotta hover:text-amber-700 font-bold mr-4"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Back to Articles
            </Link>
            <Link
              to="/"
              className="inline-flex items-center text-terracotta hover:text-amber-700 font-bold"
            >
              <i className="fas fa-home mr-2"></i>
              Home
            </Link>
        </div>
      </article>

      <Footer />
    </div>
  );
}