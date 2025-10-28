export default function CTA() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-brand-dark text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-serif-display text-4xl md:text-5xl font-bold">
          Ready to Discover Your Glow?
        </h2>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
          Completely free, no sign-up required. Your next little surprise is just a click
          away.
        </p>
        <div className="mt-10">
          <button
            onClick={scrollToTop}
            className="bg-terracotta text-white px-10 py-4 text-xl font-bold hover:bg-amber-700 transition-colors shadow-lg rounded-md"
          >
            Try the Age Guesser Now
          </button>
        </div>
      </div>
    </section>
  );
}
