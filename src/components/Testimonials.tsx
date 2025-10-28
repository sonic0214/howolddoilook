export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif-display text-4xl md:text-5xl font-bold">
            Hear It From Our Users
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 border border-gray-200 rounded-lg">
            <i className="fas fa-quote-left text-2xl text-terracotta opacity-50"></i>
            <p className="mt-4 text-gray-700">
              "I was expecting a simple age guess, but 'Radiant Optimist' genuinely made me
              smile. It's such a refreshing, positive take on this kind of tech."
            </p>
            <footer className="mt-6 font-bold text-brand-dark">— Sarah J.</footer>
          </div>
          <div className="bg-white p-8 border border-gray-200 rounded-lg">
            <i className="fas fa-quote-left text-2xl text-terracotta opacity-50"></i>
            <p className="mt-4 text-gray-700">
              "The interface is gorgeous, and the results feel so much more personal than
              other 'how old do I look' sites. It felt less like a judgment and more like a
              compliment."
            </p>
            <footer className="mt-6 font-bold text-brand-dark">— @dev_dave</footer>
          </div>
          <div className="bg-white p-8 border border-gray-200 rounded-lg">
            <i className="fas fa-quote-left text-2xl text-terracotta opacity-50"></i>
            <p className="mt-4 text-gray-700">
              "Honestly, the best part is the shareable card. It looks so professional. I
              actually posted it to my story, and my friends loved it!"
            </p>
            <footer className="mt-6 font-bold text-brand-dark">— Maria P.</footer>
          </div>
        </div>
      </div>
    </section>
  );
}
