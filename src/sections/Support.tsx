import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Support = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      gsap.fromTo(contentRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Widget animation
      gsap.fromTo(widgetRef.current,
        { y: 40, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: widgetRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="support"
      className="relative w-full py-20 lg:py-32 bg-[#C8F0F7] z-[70]"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-3xl mx-auto text-center">
          {/* Content */}
          <div ref={contentRef} className="mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F26B3A]/10 rounded-full mb-6">
              <Heart className="w-5 h-5 text-[#F26B3A]" />
              <span className="text-sm font-semibold text-[#F26B3A]">Support Independent Music</span>
            </div>

            <h2 className="font-['Fredoka_One'] text-3xl sm:text-4xl lg:text-5xl text-[#101010] mb-4">
              Join the Mission
            </h2>
            <p className="text-base sm:text-lg text-[#2A2A2A] max-w-2xl mx-auto">
              We are 100% independent. If our "guilt-free" music helps your family,
              consider becoming a <strong>Parenting Partner</strong>.
            </p>
          </div>

          {/* Ko-fi Widget */}
          <div
            ref={widgetRef}
            className="relative rounded-2xl overflow-hidden shadow-xl bg-white p-2"
          >
            <iframe
              id="kofiframe"
              src="https://ko-fi.com/alybouchnak/?hidefeed=true&widget=true&embed=true&preview=true"
              className="w-full border-0 rounded-xl"
              height="600"
              title="alybouchnak"
              loading="lazy"
            />
          </div>

          {/* Additional support text */}
          <p className="mt-8 text-sm text-[#2A2A2A]/70">
            Your support helps us create more "Balanced Stimulation" music for families everywhere.
            Every contribution makes a difference!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Support;
