import OptimizedImage from './OptimizedImage';

export default function CaseStudies() {
  return (
    <section id="case-studies" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif-display text-4xl md:text-5xl font-bold">
            Real Age Analysis Results
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            See how others compare their perceived age to their actual age.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-left bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden">
            <OptimizedImage
              src="https://images.pexels.com/photos/3772510/pexels-photo-3772510.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Portrait of a young man receiving AI age analysis with adventurous spirit vibe tag"
              className="h-80 w-full object-cover"
              loading="lazy"
            />
            <div className="p-6">
              <div className="uppercase tracking-wide text-sm text-terracotta font-semibold">
                Age Analysis
              </div>
              <p className="block mt-1 text-base leading-tight font-medium text-black">
                Estimated Age: 24
              </p>
              <p className="mt-2 text-gray-500 text-3xl font-serif-display">
                "Adventurous Spirit"
              </p>
            </div>
          </div>
          <div className="text-left bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden">
            <OptimizedImage
              src="https://images.pexels.com/photos/762080/pexels-photo-762080.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Portrait of a professional woman with poised leader AI age analysis result"
              className="h-80 w-full object-cover"
              loading="lazy"
            />
            <div className="p-6">
              <div className="uppercase tracking-wide text-sm text-terracotta font-semibold">
                Age Analysis
              </div>
              <p className="block mt-1 text-base leading-tight font-medium text-black">
                Estimated Age: 35
              </p>
              <p className="mt-2 text-gray-500 text-3xl font-serif-display">
                "Poised Leader"
              </p>
            </div>
          </div>
          <div className="text-left bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden">
            <OptimizedImage
              src="https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Portrait of a smiling woman in yellow sweater with radiant optimist AI age analysis"
              className="h-80 w-full object-cover"
              loading="lazy"
            />
            <div className="p-6">
              <div className="uppercase tracking-wide text-sm text-terracotta font-semibold">
                Age Analysis
              </div>
              <p className="block mt-1 text-base leading-tight font-medium text-black">
                Estimated Age: 29
              </p>
              <p className="mt-2 text-gray-500 text-3xl font-serif-display">
                "Radiant Optimist"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
