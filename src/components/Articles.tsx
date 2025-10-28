import { Link } from 'react-router-dom';
import OptimizedImage from './OptimizedImage';

export default function Articles() {
  return (
    <section id="inspiration" className="container mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h2 className="font-serif-display text-4xl md:text-5xl font-bold">
          The Art of Radiance
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Curated advice to nurture your glow from the inside out.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="group overflow-hidden bg-white rounded-lg border border-gray-200">
          <OptimizedImage
            src="https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Minimalist skincare products arranged on a tray for healthy skin barrier routine"
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="p-6">
            <p className="text-sm font-bold text-terracotta">SKINCARE</p>
            <h3 className="font-bold text-xl mt-2 mb-2">
              The Minimalist's Guide to a Healthy Skin Barrier
            </h3>
            <p className="text-gray-600 text-sm">
              Discover why less is more when it comes to protecting your skin's natural
              defenses.
            </p>
            <Link
              to="/skincare-article#top"
              className="inline-block mt-4 font-bold text-brand-dark hover:text-terracotta"
            >
              Read More &rarr;
            </Link>
          </div>
        </div>
        <div className="group overflow-hidden bg-white rounded-lg border border-gray-200">
          <OptimizedImage
            src="https://images.pexels.com/photos/3771045/pexels-photo-3771045.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Person meditating peacefully in morning light for mindfulness and radiance practice"
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="p-6">
            <p className="text-sm font-bold text-terracotta">MINDFULNESS</p>
            <h3 className="font-bold text-xl mt-2 mb-2">
              How 5 Minutes of Morning Stillness Can Change Your Day
            </h3>
            <p className="text-gray-600 text-sm">
              True radiance starts from within. Learn a simple practice to reduce stress and
              boost clarity.
            </p>
            <Link
              to="/mindfulness-article#top"
              className="inline-block mt-4 font-bold text-brand-dark hover:text-terracotta"
            >
              Read More &rarr;
            </Link>
          </div>
        </div>
        <div className="group overflow-hidden bg-white rounded-lg border border-gray-200">
          <OptimizedImage
            src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Healthy salad bowl with fresh antioxidant-rich vegetables for glowing skin nutrition"
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="p-6">
            <p className="text-sm font-bold text-terracotta">NUTRITION</p>
            <h3 className="font-bold text-xl mt-2 mb-2">
              Eating for Your Glow: Top 5 Antioxidant-Rich Foods
            </h3>
            <p className="text-gray-600 text-sm">
              Feed your skin from the inside. We break down the science behind beauty-boosting
              foods.
            </p>
            <Link
              to="/nutrition-article#top"
              className="inline-block mt-4 font-bold text-brand-dark hover:text-terracotta"
            >
              Read More &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
