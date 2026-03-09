import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const starburst1Ref = useRef<HTMLDivElement>(null);
  const starburst2Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 70%',
          scrub: 0.4,
        }
      });

      // Heading
      scrollTl.fromTo(headingRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3 },
        0
      );

      // Starbursts
      scrollTl.fromTo([starburst1Ref.current, starburst2Ref.current],
        { scale: 0.6, rotate: -10, opacity: 0 },
        { scale: 1, rotate: 0, opacity: 1, duration: 0.25, stagger: 0.1 },
        0.1
      );

      // Content paragraphs
      if (contentRef.current) {
        const paragraphs = contentRef.current.querySelectorAll('p, h3');
        scrollTl.fromTo(paragraphs,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.1, stagger: 0.05 },
          0.15
        );
      }

      // Avatar
      scrollTl.fromTo(avatarRef.current,
        { x: '10vw', scale: 0.92, opacity: 0 },
        { x: 0, scale: 1, opacity: 1, duration: 0.3 },
        0.1
      );

      // Avatar parallax
      gsap.to(avatarRef.current, {
        y: '-2vh',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full py-20 lg:py-32 bg-[#C8F0F7] z-20"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left: Text content */}
          <div className="flex-1 max-w-2xl">
            <div className="relative inline-block mb-8">
              <h2
                ref={headingRef}
                className="font-['Fredoka_One'] text-3xl sm:text-4xl lg:text-5xl text-[#101010]"
              >
                About The Artist
              </h2>

              {/* Starbursts */}
              <div
                ref={starburst1Ref}
                className="absolute -top-4 -right-8 text-[#F26B3A]"
              >
                <Sparkles className="w-6 h-6" />
              </div>
              <div
                ref={starburst2Ref}
                className="absolute -bottom-2 -left-6 text-[#F7E859]"
              >
                <Sparkles className="w-5 h-5" />
              </div>
            </div>

            <div ref={contentRef} className="space-y-6">
              <p className="text-base sm:text-lg text-[#2A2A2A] leading-relaxed">
                <strong>Aly Bouchnak</strong> creates <strong>modern digital pop</strong> for millennial families.
                Based in "The Bloom's House" world, his music offers a "Balanced Stimulation" alternative
                to traditional nursery rhymes—upbeat enough for dance parties (120–125 BPM) but cognitively
                respectful for toddlers.
              </p>

              <h3 className="font-['Fredoka_One'] text-xl sm:text-2xl text-[#101010] pt-4">
                The "Favorite Musical Uncle"
              </h3>

              <p className="text-base sm:text-lg text-[#2A2A2A] leading-relaxed">
                Aly's mission is to be the <strong>Parenting Partner</strong> for families. Hits like{' '}
                <em>The Yummy Spoon</em> and <em>Boom Teka Boom</em> are designed as "utility songs"
                to help parents manage daily routines like eating, waking up, and cleaning up.
                <br /></p>

              <button className="btn-primary mt-6">
                Meet the world
              </button>
            </div>
          </div>

          {/* Right: Avatar image */}
          <div
            ref={avatarRef}
            className="flex-1 flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#F7E859] rounded-full blur-3xl opacity-30 scale-110" />
              <img
                src="/images/Aly-bouchnak-profile.webp"
                alt="Aly Bouchnak"
                className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-contain rounded-full bg-gradient-to-br from-[#C8F0F7] to-[#F7E859]/30"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section >
  );
};

export default About;
