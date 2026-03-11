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
  const [firstName, setFirstName] = useState('');
  const [parentType, setParentType] = useState('Parent');
  const [childName, setChildName] = useState('');
  const [childBirthMonth, setChildBirthMonth] = useState('');
  const [isSubmitError, setIsSubmitError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !firstName) return;

    setIsLoading(true);
    setIsSubmitError(false);

    try {
      const response = await fetch('/.netlify/functions/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          firstName,
          parentType,
          childName,
          childBirthMonth
        }),
      });

      if (!response.ok) throw new Error('Subscription failed');

      setIsSubmitted(true);
      setIsSubmitError(false);
    } catch (error) {
      console.error('Form submission error:', error);
      setIsSubmitError(true);
    } finally {
      setIsLoading(false);
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
              className="flex flex-col gap-4 max-w-lg mx-auto bg-white/40 p-6 md:p-8 rounded-3xl backdrop-blur-sm border-2 border-white/50 shadow-xl"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Your First Name"
                  required
                  className="w-full px-5 py-3.5 rounded-2xl border-2 border-white bg-white/80 text-[#101010] placeholder:text-[#2A2A2A]/50 font-medium focus:outline-none focus:border-[#F26B3A] transition-all"
                />
                <select
                  value={parentType}
                  onChange={(e) => setParentType(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-2xl border-2 border-white bg-white/80 text-[#101010] font-medium focus:outline-none focus:border-[#F26B3A] transition-all cursor-pointer"
                >
                  <option value="Parent">I'm a Parent</option>
                  <option value="Toddler Parent">Toddler Parent</option>
                  <option value="Preschool Parent">Preschool Parent</option>
                  <option value="Educator">Educator</option>
                  <option value="Grandparent">Grandparent</option>
                </select>
              </div>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                required
                className="w-full px-5 py-3.5 rounded-2xl border-2 border-white bg-white/80 text-[#101010] placeholder:text-[#2A2A2A]/50 font-medium focus:outline-none focus:border-[#F26B3A] transition-all"
              />

              <div className="pt-2 pb-1 text-left">
                <p className="text-xs font-semibold text-[#F26B3A] uppercase tracking-wider mb-2">Optional Magic Touch ✨</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    placeholder="Child's First Name"
                    className="w-full px-5 py-3 rounded-2xl border-2 border-white bg-white/60 text-[#101010] placeholder:text-[#2A2A2A]/50 text-sm font-medium focus:outline-none focus:border-[#F26B3A] transition-all"
                  />
                  <select
                    value={childBirthMonth}
                    onChange={(e) => setChildBirthMonth(e.target.value)}
                    className="w-full px-5 py-3 rounded-2xl border-2 border-white bg-white/60 text-[#101010] text-sm font-medium focus:outline-none focus:border-[#F26B3A] transition-all cursor-pointer"
                  >
                    <option value="">Birth Month</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
                </div>
                <p className="text-[10px] text-[#2A2A2A]/60 mt-2 leading-tight">We use this to send a special birthday song! (COPPA compliant: No full birthdates stored).</p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full mt-2 inline-flex items-center justify-center gap-2 py-4 text-lg"
              >
                {isLoading ? 'Joining...' : 'Subscribe'}
                {!isLoading && <Send className="w-5 h-5" />}
              </button>
            </form>
          ) : (
            <div className="flex items-center justify-center gap-3 text-[#101010] bg-white/50 rounded-full py-4 px-8 max-w-lg mx-auto border-2 border-green-400">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <span className="font-semibold text-green-800">Welcome to the Bloom's House! Check your email to confirm.</span>
            </div>
          )}

          {isSubmitError && (
            <p className="text-red-500 font-semibold mt-4 text-sm animate-pulse">There was an issue subscribing. Please try again later!</p>
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
