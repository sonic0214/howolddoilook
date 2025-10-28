export default function HowItWorks() {
  return (
    <section id="how-it-works" className="container mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h2 className="font-serif-display text-4xl md:text-5xl font-bold">
          Guess My Age in 3 Simple Steps
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8 md:gap-16 relative">
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0 border-t-2 border-dashed border-gray-300 -translate-y-1/2"></div>
        <div className="relative z-10 text-center p-4 bg-white">
          <div className="bg-terracotta text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
            1
          </div>
          <h3 className="font-bold text-xl mb-2">Upload a Photo</h3>
          <p className="text-gray-600">Choose your favorite clear, frontal photo.</p>
        </div>
        <div className="relative z-10 text-center p-4 bg-white">
          <div className="bg-terracotta text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
            2
          </div>
          <h3 className="font-bold text-xl mb-2">Instant AI Analysis</h3>
          <p className="text-gray-600">Lumin AI interprets your glow in moments.</p>
        </div>
        <div className="relative z-10 text-center p-4 bg-white">
          <div className="bg-terracotta text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
            3
          </div>
          <h3 className="font-bold text-xl mb-2">Get Your Vibe Card</h3>
          <p className="text-gray-600">Save and share your unique mood of the day.</p>
        </div>
      </div>
    </section>
  );
}
