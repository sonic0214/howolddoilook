import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Is this just another \"how old do I look\" tool?",
    answer: "Not at all. While our age guesser provides an accurate estimation, our core mission is positive interpretation. We turn cold data into a warm, uplifting message about your current state, celebrating your unique vibe instead of just labeling you with a number."
  },
  {
    question: "Is my privacy protected?",
    answer: "Absolutely, and we take it very seriously. As we state clearly, we never save your photos. The entire analysis is done in real-time, and your image is discarded immediately after. Your privacy is paramount."
  },
  {
    question: "Is the analysis result scientific?",
    answer: "Our tool is designed for entertainment and positive affirmation. It uses real AI technology to detect facial attributes, but the creative \"Vibe Tags\" are meant to inspire joy, not serve as a clinical diagnosis. Think of it as a digital mood ring for your face!"
  }
];

function FAQAccordionItem({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onToggle}
        className="w-full py-6 flex justify-between items-center text-left hover:text-terracotta transition-colors"
        aria-expanded={isOpen}
      >
        <h3 className="font-bold text-xl pr-8">{item.question}</h3>
        <ChevronDown
          className={`w-6 h-6 flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-gray-600 pb-6 leading-relaxed">{item.answer}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif-display text-4xl md:text-5xl font-bold">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="max-w-3xl mx-auto">
          {faqData.map((item, index) => (
            <FAQAccordionItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
