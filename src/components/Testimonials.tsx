import { useEffect, useRef } from 'react';
import { Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  username: string;
  avatar: string;
  content: string;
  vibeTag: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    username: "@sarah_j",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=b6e3f4",
    content: "I was expecting a simple age guess, but 'Radiant Optimist' genuinely made me smile. It's such a refreshing, positive take on this kind of tech!",
    vibeTag: "Radiant Optimist"
  },
  {
    name: "David Chen",
    username: "@dev_dave",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David&backgroundColor=c0aede",
    content: "The interface is gorgeous, and the results feel so much more personal than other sites. It felt less like a judgment and more like a compliment.",
    vibeTag: "Creative Spark"
  },
  {
    name: "Maria Garcia",
    username: "@maria_p",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria&backgroundColor=ffd5dc",
    content: "Honestly, the best part is the shareable card. It looks so professional. I actually posted it to my story, and my friends loved it!",
    vibeTag: "Confident Aura"
  },
  {
    name: "Alex Thompson",
    username: "@alex_tech",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=ffdfbf",
    content: "Privacy-focused and fun! Love that my photos aren't stored. The AI analysis is surprisingly accurate and the vibes are always on point.",
    vibeTag: "Tech Enthusiast"
  },
  {
    name: "Emma Wilson",
    username: "@emma_w",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma&backgroundColor=d4f1f4",
    content: "Got 'Timeless Charm' and honestly? Best compliment I've received all week. This tool is pure joy!",
    vibeTag: "Timeless Charm"
  },
  {
    name: "James Miller",
    username: "@james_fit",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James&backgroundColor=a8e6cf",
    content: "Used it before my wedding to see if stress was showing. Got 'Youthful Energy' - exactly the confidence boost I needed!",
    vibeTag: "Youthful Energy"
  },
  {
    name: "Lisa Anderson",
    username: "@lisa_art",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa&backgroundColor=ffc8dd",
    content: "As a photographer, I appreciate the attention to detail in the UI. The results are fun and shareable - perfect for social media!",
    vibeTag: "Artistic Soul"
  },
  {
    name: "Michael Brown",
    username: "@mike_b",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael&backgroundColor=cdb4db",
    content: "Tried this with my team during lunch break. We all got different vibes and it sparked the best conversation. Highly recommend!",
    vibeTag: "Social Butterfly"
  }
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex-shrink-0 w-[350px] bg-white p-6 rounded-xl shadow-md border border-gray-100 mx-4">
      <Quote className="text-terracotta opacity-50 mb-4" size={32} />
      <p className="text-gray-700 leading-relaxed mb-6 min-h-[100px]">
        {testimonial.content}
      </p>
      <div className="flex items-center gap-4">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full border-2 border-terracotta/20"
        />
        <div className="flex-1">
          <p className="font-bold text-gray-900">{testimonial.name}</p>
          <p className="text-sm text-gray-500">{testimonial.username}</p>
        </div>
        <div className="text-xs bg-terracotta/10 text-terracotta px-3 py-1 rounded-full font-medium">
          {testimonial.vibeTag}
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame

    const scroll = () => {
      scrollPosition += scrollSpeed;

      // Reset scroll position when reaching halfway (since we duplicated the content)
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }

      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(scroll);
    };

    // Start scrolling
    animationId = requestAnimationFrame(scroll);

    // Pause on hover
    const handleMouseEnter = () => cancelAnimationFrame(animationId);
    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(scroll);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <div className="text-center">
          <h2 className="font-serif-display text-4xl md:text-5xl font-bold mb-4">
            Hear It From Our Users
          </h2>
          <p className="text-gray-600 text-lg">
            Join thousands who discovered their unique vibe
          </p>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-hidden py-4"
        style={{ scrollBehavior: 'auto' }}
      >
        {/* Duplicate testimonials for seamless loop */}
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} />
        ))}
      </div>
    </section>
  );
}
