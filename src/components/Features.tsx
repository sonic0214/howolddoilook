export default function Features() {
  return (
    <section id="features" className="container mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h2 className="font-serif-display text-4xl md:text-5xl font-bold">
          Discover Your True Age Appearance
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Find out if you look younger or older than your actual age.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-12 text-center">
        <div>
          <i className="fas fa-magic-wand-sparkles text-4xl text-terracotta"></i>
          <h3 className="font-bold text-xl mt-4 mb-2">Age Comparison Insight</h3>
          <p className="text-gray-600">
            Beyond the numbers, discover if your appearance matches your age and get
            personalized insights about maintaining your youthful look.
          </p>
        </div>
        <div>
          <i className="fas fa-bolt-lightning text-4xl text-terracotta"></i>
          <h3 className="font-bold text-xl mt-4 mb-2">Instant Age Detection</h3>
          <p className="text-gray-600">
            Advanced AI technology analyzes your facial features in seconds to determine
            your perceived age with remarkable accuracy.
          </p>
        </div>
        <div>
          <i className="fas fa-share-alt text-4xl text-terracotta"></i>
          <h3 className="font-bold text-xl mt-4 mb-2">Share Your Results</h3>
          <p className="text-gray-600">
            Beautifully designed age analysis cards perfect for sharing with friends
            and comparing who looks younger or older.
          </p>
        </div>
      </div>
    </section>
  );
}
