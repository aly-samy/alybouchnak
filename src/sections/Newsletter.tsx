import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Send, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Newsletter = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

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

      // Form animation
      gsap.fromTo(formRef.current,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      // In a real implementation, this would submit to ConvertKit
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 lg:py-32 bg-[#F7E859] z-[80]"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-2xl mx-auto text-center">
          {/* Content */}
          <div ref={contentRef} className="mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 rounded-full mb-6">
              <Mail className="w-5 h-5 text-[#F26B3A]" />
              <span className="text-sm font-semibold text-[#F26B3A]">Newsletter</span>
            </div>
            
            <h2 className="font-['Fredoka_One'] text-3xl sm:text-4xl lg:text-5xl text-[#101010] mb-4">
              Join Our Community of Music-Loving Families
            </h2>
            <p className="text-base sm:text-lg text-[#2A2A2A]">
              Get access to exclusive content, early releases, and parenting resources.
            </p>
          </div>

          {/* Form */}
          {!isSubmitted ? (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
            >
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  required
                  className="w-full px-6 py-4 rounded-full border-2 border-white bg-white/80 backdrop-blur-sm 
                           text-[#101010] placeholder:text-[#2A2A2A]/50 font-medium
                           focus:outline-none focus:border-[#F26B3A] focus:bg-white transition-all"
                />
              </div>
              <button
                type="submit"
                className="btn-primary inline-flex items-center justify-center gap-2 whitespace-nowrap"
              >
                Subscribe
                <Send className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="flex items-center justify-center gap-3 text-[#101010] bg-white/50 rounded-full py-4 px-8 max-w-lg mx-auto">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <span className="font-semibold">Success! Check your email to confirm.</span>
            </div>
          )}

          {/* Privacy note */}
          <p className="mt-6 text-sm text-[#2A2A2A]/70">
            We respect your privacy. Unsubscribe at any time.
          </p>

          {/* Benefits */}
          <div className="mt-12 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {[
              { icon: '🎵', text: 'Early Access' },
              { icon: '🎁', text: 'Exclusive Content' },
              { icon: '💡', text: 'Parenting Tips' },
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <span className="text-2xl mb-2 block">{benefit.icon}</span>
                <span className="text-xs sm:text-sm font-semibold text-[#101010]">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
