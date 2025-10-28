export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif-display text-4xl md:text-5xl font-bold">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <h3 className="font-bold text-xl mb-2">
              Is this just another "how old do I look" tool?
            </h3>
            <p className="text-gray-600">
              Not at all. While our age guesser provides an accurate estimation, our core
              mission is positive interpretation. We turn cold data into a warm, uplifting
              message about your current state, celebrating your unique vibe instead of just
              labeling you with a number.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-xl mb-2">Is my privacy protected?</h3>
            <p className="text-gray-600">
              Absolutely, and we take it very seriously. As we state clearly, we never save
              your photos. The entire analysis is done in real-time, and your image is
              discarded immediately after. Your privacy is paramount.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-xl mb-2">Is the analysis result scientific?</h3>
            <p className="text-gray-600">
              Our tool is designed for entertainment and positive affirmation. It uses real AI
              technology to detect facial attributes, but the creative "Vibe Tags" are meant to
              inspire joy, not serve as a clinical diagnosis. Think of it as a digital mood
              ring for your face!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
