import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "My 3-year-old asks for Aly Bouchnak every morning! The songs are so catchy that even I find myself singing along. Finally, children's music that doesn't drive parents crazy!",
    author: "Sarah M.",
    role: "Mom of 2",
  },
  {
    id: 2,
    quote: "As a preschool teacher, I'm always looking for quality music that engages my students. Aly Bouchnak's songs are educational, fun, and get the kids moving. Highly recommended!",
    author: "Mr. Johnson",
    role: "Preschool Teacher",
  },
  {
    id: 3,
    quote: "We play Aly Bouchnak in the car every day. The songs are so much fun and actually teach good values. It's refreshing to find children's music that we all enjoy as a family.",
    author: "The Patel Family",
    role: "Parents of 3",
  },
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(headingRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Cards animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.testimonial-card');
        gsap.fromTo(cards,
          { y: 50, opacity: 0, rotate: -1 },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            duration: 0.5,
            stagger: 0.12,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            }
          }
        );

        // Quote marks animation
        const quotes = cardsRef.current.querySelectorAll('.quote-icon');
        gsap.fromTo(quotes,
          { scale: 0.6, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            stagger: 0.12,
            ease: 'back.out(1.6)',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 lg:py-32 bg-[#C8F0F7] z-[60]"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="font-['Fredoka_One'] text-3xl sm:text-4xl lg:text-5xl text-[#101010] text-center mb-16"
        >
          What Parents Are Saying
        </h2>

        {/* Cards grid */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="testimonial-card card relative flex flex-col"
            >
              {/* Quote icon */}
              <div className="quote-icon absolute -top-3 -left-3 w-10 h-10 bg-[#F26B3A] rounded-full flex items-center justify-center shadow-lg">
                <Quote className="w-5 h-5 text-white" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#F7E859] text-[#F7E859]" />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-[#2A2A2A] leading-relaxed flex-1 mb-6 italic">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="pt-4 border-t border-gray-100">
                <h4 className="font-['Fredoka_One'] text-lg text-[#101010]">
                  {testimonial.author}
                </h4>
                <p className="text-sm text-[#2A2A2A]/70">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Rating summary */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-white rounded-full shadow-md">
            <div className="flex items-center gap-2">
              <span className="font-['Fredoka_One'] text-2xl text-[#101010]">4.7</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < 5 ? 'fill-[#F7E859] text-[#F7E859]' : 'text-gray-300'}`} />
                ))}
              </div>
            </div>
            <span className="text-sm text-[#2A2A2A]/70">Based on 126 reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
