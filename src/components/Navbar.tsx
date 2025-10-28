import { Link } from 'react-router-dom';

export default function Navbar() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 bg-white/80 backdrop-blur-md z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold font-serif-display">
          Lumin AI
        </Link>
        <div className="hidden md:flex space-x-8 items-center">
          <button
            onClick={() => scrollToSection('features')}
            className="hover:text-terracotta transition-colors"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection('inspiration')}
            className="hover:text-terracotta transition-colors"
          >
            Inspiration
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="hover:text-terracotta transition-colors"
          >
            FAQ
          </button>
        </div>
        <button
          onClick={() => scrollToSection('start')}
          className="bg-brand-dark text-white px-6 py-2 font-bold hover:bg-gray-700 transition-colors"
        >
          Try Now
        </button>
      </div>
    </nav>
  );
}
