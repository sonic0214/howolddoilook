import { Link } from 'react-router-dom';

interface RelatedContentItem {
  title: string;
  description: string;
  url: string;
  category: string;
}

const relatedContent: RelatedContentItem[] = [
  {
    title: "The Science Behind AI Age Detection",
    description: "Learn how computer vision technology analyzes facial features to estimate age with remarkable accuracy.",
    url: "#how-it-works",
    category: "Technology"
  },
  {
    title: "Understanding Your Vibe Tag",
    description: "Discover the psychology behind our unique Vibe Tag system and what it reveals about your personality.",
    url: "#features",
    category: "Features"
  },
  {
    title: "Privacy and Security First",
    description: "Read about our commitment to protecting your privacy and ensuring your images are never stored.",
    url: "#privacy",
    category: "Privacy"
  },
  {
    title: "Real Results from Real Users",
    description: "See what people are saying about their AI age analysis experience and the insights they've gained.",
    url: "#testimonials",
    category: "Reviews"
  }
];

export default function RelatedContent() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif-display text-3xl md:text-4xl font-bold mb-4">
            Explore More
          </h2>
          <p className="text-lg text-gray-600">
            Discover related content to enhance your understanding of AI age analysis.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedContent.map((item, index) => (
            <Link
              key={index}
              to={item.url}
              className="group bg-white p-6 rounded-lg border border-gray-200 hover:border-terracotta hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center mb-3">
                <span className="text-xs font-bold text-terracotta uppercase tracking-wide">
                  {item.category}
                </span>
              </div>
              <h3 className="font-bold text-lg mb-2 group-hover:text-terracotta transition-colors line-clamp-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-3">
                {item.description}
              </p>
              <div className="mt-4 text-terracotta text-sm font-medium group-hover:text-amber-700">
                Learn more →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}