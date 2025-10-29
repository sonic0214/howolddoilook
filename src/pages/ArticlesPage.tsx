import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import OptimizedImage from '../components/OptimizedImage';

export default function ArticlesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const articles = [
    {
      id: 'skincare-secrets',
      title: 'The Minimalist\'s Guide to a Healthy Skin Barrier',
      category: 'SKINCARE ESSENTIALS',
      description: 'Discover why less is more when protecting your skin\'s natural defenses. Essential tips that our age detector shows actually work for young adults.',
      image: 'https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Minimalist skincare products arranged on a tray for healthy skin barrier routine',
      tags: ['Skin Barrier', 'Anti-Aging'],
      readTime: '5 min read'
    },
    {
      id: 'mindfulness-for-youthfulness',
      title: 'Mindfulness for Youthful Appearance',
      category: 'STRESS MANAGEMENT',
      description: 'True radiance starts from within. Learn how stress management impacts how old you look and simple practices to maintain youthful energy.',
      image: 'https://images.pexels.com/photos/3771045/pexels-photo-3771045.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Person meditating peacefully in morning light for mindfulness and radiance practice',
      tags: ['Stress Relief', 'Mindfulness'],
      readTime: '4 min read'
    },
    {
      id: 'nutrition-and-aging',
      title: 'Foods That Help You Look Younger',
      category: 'ANTI-AGING NUTRITION',
      description: 'Feed your skin from the inside. Science-backed nutrition tips that our face analysis shows can significantly impact your perceived age.',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Healthy salad bowl with fresh antioxidant-rich vegetables for glowing skin nutrition',
      tags: ['Antioxidants', 'Skin Nutrition'],
      readTime: '6 min read'
    }
  ];

  return (
    <>
      <Helmet>
        <title>The Art of Radiance - Skincare, Wellness & Anti-Aging Articles | Lumin AI</title>
        <meta name="description" content="Discover expert guides on skincare, mindfulness, nutrition, and AI age analysis. Learn how to maintain youthful appearance with our comprehensive wellness articles." />
        <meta name="keywords" content="skincare articles, anti-aging tips, mindfulness, nutrition, AI age analysis, youthful appearance, wellness guide" />
      </Helmet>

      <div className="bg-white text-brand-dark">
        <Navbar />

        <main className="container mx-auto px-6 py-16">
          {/* Hero Section */}
          <header className="text-center mb-16">
            <h1 className="font-serif-display text-5xl md:text-6xl font-bold leading-tight mb-6">
              The Art of <span className="text-terracotta">Radiance</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Curated advice to nurture your glow from the inside out. Discover how <strong>AI age analysis</strong>
              can help you understand and enhance your youthful appearance.
            </p>
          </header>

          {/* All Articles */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-center">All Skincare & Wellness Resources</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <article key={article.id} className="group overflow-hidden bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                  <OptimizedImage
                    src={article.image}
                    alt={article.alt}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="p-6">
                    <p className="text-sm font-bold text-terracotta mb-2">{article.category}</p>
                    <h3 className="font-bold text-lg mb-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {article.description.length > 120
                        ? article.description.substring(0, 120) + '...'
                        : article.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.map((tag, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{article.readTime}</span>
                      <a
                        href={`/${article.id}`}
                        className="inline-block font-bold text-terracotta hover:text-amber-700 text-sm"
                      >
                        Read More →
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <section className="mt-16 text-center bg-gradient-to-r from-terracotta to-amber-600 text-white p-12 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Ready to Discover Your Age?</h2>
            <p className="text-xl mb-8">
              Try our <strong>AI age detector</strong> and get personalized insights for maintaining youthful skin.
            </p>
            <a
              href="/#start"
              className="bg-white text-terracotta px-8 py-4 font-bold rounded-lg hover:bg-gray-100 transition-colors text-lg"
            >
              Analyze Your Age Now →
            </a>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}