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
        title="Anti-Aging Foods That Make You Look Younger Than Your Age"
        description="Discover the top anti-aging foods that fight cellular aging and help maintain a youthful appearance through proper nutrition."
        author="Lumin AI"
        datePublished="2025-10-28"
        imageUrl="https://howolddoilook.art/og-image.jpg"
        imageCreator="Lumin AI"
        imageCreditText="Image created by Lumin AI"
        imageCopyrightNotice="© 2025 Lumin AI. All rights reserved."
        url="https://howolddoilook.art/articles/anti-aging-foods"
      />
      <Navbar />
      <Breadcrumb />

      <article id="top" className="container mx-auto px-6 py-16 max-w-4xl">
        <Link to="/" className="text-terracotta hover:underline mb-8 inline-block">
          &larr; Back to Home
        </Link>

        <div className="mb-8">
          <p className="text-sm font-bold text-terracotta mb-4">ANTI-AGING NUTRITION</p>
          <h1 className="font-serif-display text-4xl md:text-5xl font-bold mb-6">
            Foods That Make You Look Younger Than Your Age
          </h1>
          <OptimizedImage
            src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Anti-aging foods rich in antioxidants that help maintain youthful appearance and prevent cellular aging"
            className="w-full h-96 object-cover rounded-lg"
            loading="eager"
          />
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            The secret to looking younger than your actual age starts on your plate. These anti-aging foods
            work at the cellular level to prevent premature aging and maintain youthful skin.
          </p>

          <h2 className="font-serif-display text-3xl font-bold mt-12 mb-4">
            How Nutrition Affects Your Age Appearance
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Free radicals from UV exposure, pollution, and stress damage your skin cells and accelerate
            aging. The right foods provide antioxidants that neutralize these harmful molecules,
            protecting collagen and maintaining the youthful elasticity that keeps you looking younger
            than your actual age.
          </p>

          <h2 className="font-serif-display text-3xl font-bold mt-12 mb-4">
            Top 5 Anti-Aging Foods for Youthful Skin
          </h2>

          <div className="space-y-8 my-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-2xl mb-3 flex items-center">
                <span className="text-terracotta mr-3">1.</span>
                Wild Blueberries
              </h3>
              <p className="text-gray-700 mb-3">
                Nature's anti-aging superstars. Wild blueberries contain 2x more antioxidants than regular varieties,
                specifically anthocyanins that protect collagen from breaking down. This maintains skin elasticity
                and prevents the formation of wrinkles, keeping you looking younger.
              </p>
              <p className="text-sm text-gray-600 italic">
                💡 Tip: Eat 1/2 cup daily. Frozen wild blueberries retain 90% of their antioxidants.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-2xl mb-3 flex items-center">
                <span className="text-terracotta mr-3">2.</span>
                Wild Salmon
              </h3>
              <p className="text-gray-700 mb-3">
                The ultimate anti-aging protein. Wild salmon provides astaxanthin (one of nature's most powerful antioxidants)
                which protects skin cells from UV damage and inflammation. The omega-3s maintain skin's lipid barrier,
                preventing dehydration and wrinkles that make you look older.
              </p>
              <p className="text-sm text-gray-600 italic">
                💡 Tip: Eat 3 servings per week. Wild caught has 3x more astaxanthin than farmed.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-2xl mb-3 flex items-center">
                <span className="text-terracotta mr-3">3.</span>
                Avocados
              </h3>
              <p className="text-gray-700 mb-3">
                Nature's botox alternative. Avocados are rich in vitamin E and biotin, which protect skin
                from oxidative damage and support collagen production. The healthy fats maintain skin's
                moisture barrier, preventing fine lines and keeping skin plump and youthful.
              </p>
              <p className="text-sm text-gray-600 italic">
                💡 Tip: Eat 1/2 avocado daily. Choose ripe ones that yield to gentle pressure.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-2xl mb-3 flex items-center">
                <span className="text-terracotta mr-3">4.</span>
                Matcha Green Tea
              </h3>
              <p className="text-gray-700 mb-3">
                Contains 10x more antioxidants than regular green tea. Matcha's EGCG compounds inhibit
                collagen breakdown and protect against UV-induced aging. Regular consumption improves
                skin elasticity and reduces the appearance of age spots.
              </p>
              <p className="text-sm text-gray-600 italic">
                💡 Tip: Drink 1 cup daily. Look for ceremonial grade matcha for maximum benefits.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-2xl mb-3 flex items-center">
                <span className="text-terracotta mr-3">5.</span>
                Pomegranates
              </h3>
              <p className="text-gray-700 mb-3">
                Anti-aging powerhouses loaded with punicalagins, potent antioxidants that prevent
                collagen degradation and promote skin regeneration. They also boost UV protection
                and improve skin texture, making you appear younger than your age.
              </p>
              <p className="text-sm text-gray-600 italic">
                💡 Tip: Eat 1/2 cup seeds daily or drink 100% pomegranate juice.
              </p>
            </div>
          </div>

          <div className="bg-terracotta/10 border-l-4 border-terracotta p-6 my-8">
            <p className="text-gray-800 italic">
              "The foods you eat today determine how young you look tomorrow. Anti-aging nutrition
              isn't about restriction—it's about nourishing your cells with what they need to stay
              youthful and vibrant."
            </p>
          </div>

          <h2 className="font-serif-display text-3xl font-bold mt-12 mb-4">
            Creating Your Anti-Aging Meal Plan
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Eat at least 3 of these anti-aging foods daily. The key is consistency—cellular turnover
            takes 4-6 weeks, so you'll notice visible improvements in skin texture and radiance
            within two months of regular consumption.
          </p>

          <h2 className="font-serif-display text-3xl font-bold mt-12 mb-4">
            Foods That Accelerate Aging (Avoid These)
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li><strong>Sugar and refined carbs</strong> cause glycation, which breaks down collagen and creates wrinkles</li>
            <li><strong>Processed meats</strong> contain preservatives that cause inflammation and cellular damage</li>
            <li><strong>Excessive alcohol</strong> dehydrates skin and creates free radical damage</li>
            <li><strong>Fried foods</strong> promote inflammation throughout the body, including skin</li>
            <li><strong>Artificial sweeteners</strong> can disrupt gut health, affecting skin's microbiome</li>
          </ul>

          <p className="text-gray-700 leading-relaxed mb-6">
            Remember: The goal is to look younger than your actual age, not just to feel better.
            These anti-aging foods work at the cellular level to maintain the youthful characteristics
            that people associate with being younger.
          </p>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <h3 className="font-serif-display text-2xl font-bold mb-6">Continue Your Anti-Aging Journey</h3>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Link
              to="/skincare-article"
              className="group bg-gray-50 p-6 rounded-lg hover:bg-terracotta/5 transition-colors"
            >
              <h4 className="font-bold text-lg mb-2 group-hover:text-terracotta transition-colors">
                The Anti-Aging Skincare Secret
              </h4>
              <p className="text-gray-600 text-sm">
                Discover the minimalist skincare routine that keeps you looking younger.
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
                How managing stress prevents premature aging and maintains youthfulness.
              </p>
            </Link>
          </div>

          <div className="bg-terracotta/5 p-6 rounded-lg mb-8">
            <h4 className="font-bold text-lg mb-4">🔍 Check Your Current Age Appearance</h4>
            <p className="text-gray-700 mb-4">
              Want to know if you look younger or older than your actual age? Our AI analysis
              provides personalized insights to help you track your anti-aging progress.
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
