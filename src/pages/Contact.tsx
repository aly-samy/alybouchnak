import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import SEO from '../components/SEO';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(headingRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
        }
      );

      // Form animation
      gsap.fromTo(formRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <SEO
        title="Contact | Aly Bouchnak — Children's Music"
        description="Get in touch with Aly Bouchnak for collaborations, inquiries, or questions about children's music. Send a message through our contact form."
        keywords="contact Aly Bouchnak, children's music collaboration, music inquiry, contact form"
        canonical="https://alybouchnak.com/contact"
        ogImage="https://alybouchnak.com/images/aly-bouchnak-contact.webp"
        ogType="website"
      />

      <div ref={sectionRef} className="relative min-h-screen bg-[#C8F0F7]">
        {/* Grain overlay */}
        <div className="grain-overlay" />
        
        <Navigation />

        {/* Header */}
        <div ref={headingRef} className="pt-32 pb-12 bg-[#F7E859]">
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
            <h1 className="font-['Fredoka_One'] text-4xl sm:text-5xl lg:text-6xl text-[#101010] mb-4">
              Get in Touch
            </h1>
            <p className="text-lg sm:text-xl text-[#2A2A2A] max-w-2xl mx-auto">
              Have a question, collaboration idea, or just want to say hello? I'd love to hear from you!
            </p>
          </div>
        </div>

        {/* Form Section */}
        <section className="py-16 lg:py-24">
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="max-w-4xl mx-auto">
              <div ref={formRef} className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* Form Container */}
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    src="https://docs.google.com/forms/d/e/1FAIpQLSdpR28ohA3_X9_bZZBapiwdircnpFpocOffDtSlcpCYUmt43w/viewform?embedded=true"
                    className="absolute top-0 left-0 w-full h-full border-0"
                    title="Contact Form"
                    loading="lazy"
                  >
                    Loading…
                  </iframe>
                </div>
              </div>

              {/* Additional Contact Info */}
              <div className="mt-12 text-center">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8">
                  <h2 className="font-['Fredoka_One'] text-2xl text-[#101010] mb-4">
                    Other Ways to Connect
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-[#101010]">Music Inquiries</h3>
                      <p className="text-sm text-[#2A2A2A]">
                        For collaborations, licensing, or performance opportunities
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-[#101010]">Press & Media</h3>
                      <p className="text-sm text-[#2A2A2A]">
                        For interviews, reviews, or media coverage
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-[#101010]">General Questions</h3>
                      <p className="text-sm text-[#2A2A2A]">
                        For any other questions or feedback
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Contact;
