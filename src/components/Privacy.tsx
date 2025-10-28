export default function Privacy() {
  return (
    <section id="privacy" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <i className="fas fa-lock text-8xl text-brand-dark opacity-10"></i>
          </div>
          <div>
            <h2 className="font-serif-display text-4xl font-bold text-brand-dark">
              Privacy Isn't an Afterthought.
              <br />
              It's Our Foundation.
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Your trust is everything. We designed Lumin AI with a simple, powerful
              privacy promise: your face is yours, period.
            </p>
            <ul className="mt-6 space-y-4">
              <li className="flex items-start">
                <i className="fas fa-check-circle text-terracotta text-xl mt-1 mr-3"></i>
                <span className="text-gray-700">
                  <strong>We never save your photos.</strong> Analysis happens in-memory
                  and the image is deleted the instant the process is complete.
                </span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-terracotta text-xl mt-1 mr-3"></i>
                <span className="text-gray-700">
                  <strong>No databases. No tracking. No exceptions.</strong> Your image is
                  not used for training AI, analytics, or any other purpose.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
