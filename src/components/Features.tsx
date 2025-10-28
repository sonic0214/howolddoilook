export default function Features() {
  return (
    <section id="features" className="container mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h2 className="font-serif-display text-4xl md:text-5xl font-bold">
          More Than Just an Age Guesser
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Start with a photo. Leave with a mood boost.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-12 text-center">
        <div>
          <i className="fas fa-magic-wand-sparkles text-4xl text-terracotta"></i>
          <h3 className="font-bold text-xl mt-4 mb-2">Playful Vibe Tags</h3>
          <p className="text-gray-600">
            Ditch "25 years old" for "Collagen Millionaire." We swap sterile numbers for
            positive labels that boost your day.
          </p>
        </div>
        <div>
          <i className="fas fa-bolt-lightning text-4xl text-terracotta"></i>
          <h3 className="font-bold text-xl mt-4 mb-2">Instant Age Analysis</h3>
          <p className="text-gray-600">
            Upload and see. No waiting. A seamless experience to capture your current
            state, anytime.
          </p>
        </div>
        <div>
          <i className="fas fa-share-alt text-4xl text-terracotta"></i>
          <h3 className="font-bold text-xl mt-4 mb-2">Stunning Shareable Cards</h3>
          <p className="text-gray-600">
            Every result is a statement. We generate beautifully designed Vibe Cards,
            ready to light up your social feed.
          </p>
        </div>
      </div>
    </section>
  );
}
