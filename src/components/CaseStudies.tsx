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
          <div className="text-left bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-orange-100 hover:border-orange-200 transition-colors">
            <OptimizedImage
              src="https://images.pexels.com/photos/3772510/pexels-photo-3772510.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Portrait of a young man receiving AI age analysis with adventurous spirit vibe tag"
              className="h-80 w-full object-cover"
              loading="lazy"
            />
            <div className="p-6">
              <div className="inline-block uppercase tracking-wide text-sm font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-2">
                AGE ANALYSIS
              </div>
              <div className="mb-3">
                <div className="text-sm text-gray-600 font-medium">Estimated Age</div>
                <div className="text-2xl font-bold text-gray-900">24 years</div>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-3 rounded-lg border border-orange-200">
                <div className="text-sm font-semibold text-orange-600 mb-1">Appearance Type</div>
                <div className="text-xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  Adventurous Spirit
                </div>
              </div>
            </div>
          </div>
          <div className="text-left bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-orange-100 hover:border-orange-200 transition-colors">
            <OptimizedImage
              src="https://images.pexels.com/photos/762080/pexels-photo-762080.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Portrait of a professional woman with poised leader AI age analysis result"
              className="h-80 w-full object-cover"
              loading="lazy"
            />
            <div className="p-6">
              <div className="inline-block uppercase tracking-wide text-sm font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-2">
                AGE ANALYSIS
              </div>
              <div className="mb-3">
                <div className="text-sm text-gray-600 font-medium">Estimated Age</div>
                <div className="text-2xl font-bold text-gray-900">35 years</div>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-3 rounded-lg border border-orange-200">
                <div className="text-sm font-semibold text-orange-600 mb-1">Appearance Type</div>
                <div className="text-xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  Poised Leader
                </div>
              </div>
            </div>
          </div>
          <div className="text-left bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-orange-100 hover:border-orange-200 transition-colors">
            <OptimizedImage
              src="https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Portrait of a smiling woman in yellow sweater with radiant optimist AI age analysis"
              className="h-80 w-full object-cover"
              loading="lazy"
            />
            <div className="p-6">
              <div className="inline-block uppercase tracking-wide text-sm font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-2">
                AGE ANALYSIS
              </div>
              <div className="mb-3">
                <div className="text-sm text-gray-600 font-medium">Estimated Age</div>
                <div className="text-2xl font-bold text-gray-900">29 years</div>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-3 rounded-lg border border-orange-200">
                <div className="text-sm font-semibold text-orange-600 mb-1">Appearance Type</div>
                <div className="text-xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  Radiant Optimist
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
