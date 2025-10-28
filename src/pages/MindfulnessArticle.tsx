import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MindfulnessArticle() {
  return (
    <div className="bg-white text-brand-dark">
      <Navbar />

      <article className="container mx-auto px-6 py-16 max-w-4xl">
        <Link to="/" className="text-terracotta hover:underline mb-8 inline-block">
          &larr; Back to Home
        </Link>

        <div className="mb-8">
          <p className="text-sm font-bold text-terracotta mb-4">MINDFULNESS</p>
          <h1 className="font-serif-display text-4xl md:text-5xl font-bold mb-6">
            How 5 Minutes of Morning Stillness Can Change Your Day
          </h1>
          <img
            src="https://images.pexels.com/photos/3771045/pexels-photo-3771045.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Person meditating in the morning"
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            True radiance starts from within. Learn a simple practice to reduce stress and boost clarity.
          </p>

          <h2 className="font-serif-display text-3xl font-bold mt-12 mb-4">
            The Mind-Skin Connection
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Chronic stress triggers cortisol production, which breaks down collagen, increases
            inflammation, and accelerates aging. When you're stressed, it shows on your face—
            literally. Morning mindfulness can break this cycle before your day even begins.
          </p>

          <h2 className="font-serif-display text-3xl font-bold mt-12 mb-4">
            The 5-Minute Morning Practice
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            You don't need an hour of meditation or a special cushion. Just 5 minutes of
            intentional stillness can reset your nervous system and set a positive tone for the day.
          </p>

          <div className="bg-gray-50 p-8 rounded-lg my-8">
            <h3 className="font-bold text-xl mb-6">Your Step-by-Step Guide</h3>

            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-lg mb-2 flex items-center">
                  <span className="bg-terracotta text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">1</span>
                  Find Your Space (30 seconds)
                </h4>
                <p className="text-gray-700 ml-11">
                  Sit somewhere comfortable where you won't be disturbed. It could be your bed,
                  a chair, or a cushion on the floor. Keep your phone in another room.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-2 flex items-center">
                  <span className="bg-terracotta text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">2</span>
                  Set Your Intention (30 seconds)
                </h4>
                <p className="text-gray-700 ml-11">
                  Close your eyes and take three deep breaths. Silently say to yourself: "I am
                  here. I am present. This moment is enough."
                </p>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-2 flex items-center">
                  <span className="bg-terracotta text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">3</span>
                  Focus on Your Breath (3 minutes)
                </h4>
                <p className="text-gray-700 ml-11">
                  Notice the sensation of breathing. Feel the air entering your nostrils, filling
                  your lungs, and leaving your body. When your mind wanders (it will), gently
                  guide it back to your breath without judgment.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-2 flex items-center">
                  <span className="bg-terracotta text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">4</span>
                  Body Scan (1 minute)
                </h4>
                <p className="text-gray-700 ml-11">
                  Briefly notice any tension in your body. Relax your jaw, soften your shoulders,
                  release your forehead. You're not fixing anything—just observing.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-2 flex items-center">
                  <span className="bg-terracotta text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">5</span>
                  Gratitude Moment (30 seconds)
                </h4>
                <p className="text-gray-700 ml-11">
                  Think of one thing you're grateful for today. It can be as simple as "my
                  comfortable bed" or "the ability to breathe easily." Let that feeling settle.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-2 flex items-center">
                  <span className="bg-terracotta text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">6</span>
                  Open Your Eyes
                </h4>
                <p className="text-gray-700 ml-11">
                  Gently open your eyes and take one more deep breath. Notice how you feel.
                  Carry this calm energy into your day.
                </p>
              </div>
            </div>
          </div>

          <h2 className="font-serif-display text-3xl font-bold mt-12 mb-4">
            The Science Behind It
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Research shows that just 5 minutes of mindfulness can:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 ml-4">
            <li>Lower cortisol levels by up to 20%</li>
            <li>Improve focus and decision-making throughout the day</li>
            <li>Reduce inflammatory markers in the body</li>
            <li>Enhance emotional regulation and resilience</li>
            <li>Improve sleep quality (when practiced consistently)</li>
          </ul>

          <div className="bg-terracotta/10 border-l-4 border-terracotta p-6 my-8">
            <p className="text-gray-800 italic">
              "You can't pour from an empty cup. Five minutes of stillness isn't selfish—
              it's essential. When you're calm, your glow shows."
            </p>
          </div>

          <h2 className="font-serif-display text-3xl font-bold mt-12 mb-4">
            Making It a Habit
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The key to lasting change is consistency, not perfection. Here's how to make this
            practice stick:
          </p>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <i className="fas fa-check text-terracotta mt-1 mr-3"></i>
                <span><strong>Same time, same place:</strong> Attach it to an existing habit, like right after brushing your teeth.</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-terracotta mt-1 mr-3"></i>
                <span><strong>Start small:</strong> Even 2 minutes is better than nothing. Build up gradually.</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-terracotta mt-1 mr-3"></i>
                <span><strong>Track your streak:</strong> Mark an X on a calendar for each day you practice.</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check text-terracotta mt-1 mr-3"></i>
                <span><strong>Be kind to yourself:</strong> If you miss a day, don't spiral. Just begin again tomorrow.</span>
              </li>
            </ul>
          </div>

          <h2 className="font-serif-display text-3xl font-bold mt-12 mb-4">
            Beyond the Morning
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Once this becomes natural, you can use mini mindfulness moments throughout your day—
            while waiting in line, before a stressful meeting, or when you feel overwhelmed.
            These micro-practices compound over time, creating a lasting sense of inner peace
            that radiates outward.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Remember: true beauty isn't about looking perfect. It's about feeling grounded,
            present, and at peace with who you are. And that starts with just 5 minutes of
            stillness.
          </p>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <Link
            to="/"
            className="inline-flex items-center text-terracotta hover:text-amber-700 font-bold"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back to Home
          </Link>
        </div>
      </article>

      <Footer />
    </div>
  );
}
