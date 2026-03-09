import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, CheckCircle, Mail, User, MessageSquare } from 'lucide-react';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import SEO from '../components/SEO';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formWrapRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'General Question',
    message: '',
    subscribe: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);

    const payload = new URLSearchParams();
    payload.append('form-name', 'contact');
    payload.append('name', formData.name);
    payload.append('email', formData.email);
    payload.append('inquiryType', formData.inquiryType);
    payload.append('message', formData.message);
    payload.append('subscribe', formData.subscribe.toString());

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: payload.toString()
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

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
      gsap.fromTo(formWrapRef.current,
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
        schemaData={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Aly Bouchnak",
          "description": "Contact form for Aly Bouchnak, Children's Music Artist.",
          "url": "https://alybouchnak.com/contact",
          "mainEntity": {
            "@type": "Organization",
            "name": "The Bloom's House",
            "email": "hello@alybouchnak.com",
            "contactPoint": {
              "@type": "ContactPoint",
              "email": "hello@alybouchnak.com",
              "contactType": "Customer Support",
              "url": "https://alybouchnak.com/contact"
            }
          }
        }}
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
              <div ref={formWrapRef} className="bg-white rounded-3xl shadow-2xl overflow-hidden p-8 sm:p-12">
                {!isSubmitted ? (
                  <form name="contact" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit} className="space-y-6">
                    <input type="hidden" name="form-name" value="contact" />
                    <p className="hidden">
                      <label>Don’t fill this out if you're human: <input name="bot-field" /></label>
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-semibold text-[#101010] flex items-center gap-2">
                          <User className="w-4 h-4 text-[#F26B3A]" /> Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-[#F26B3A] focus:outline-none transition-colors text-[#101010]"
                          placeholder="Jane Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-semibold text-[#101010] flex items-center gap-2">
                          <Mail className="w-4 h-4 text-[#F26B3A]" /> Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-[#F26B3A] focus:outline-none transition-colors text-[#101010]"
                          placeholder="jane@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="inquiryType" className="text-sm font-semibold text-[#101010]">
                        Type of Inquiry
                      </label>
                      <select
                        id="inquiryType"
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-[#F26B3A] focus:outline-none transition-colors text-[#101010] appearance-none cursor-pointer"
                      >
                        <option value="General Question">General Question</option>
                        <option value="Collab / Music Inquiry">Collab / Music Inquiry</option>
                        <option value="Press / Media">Press / Media</option>
                        <option value="Feedback / Fan Mail">Feedback / Fan Mail</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-semibold text-[#101010] flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-[#F26B3A]" /> Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-[#F26B3A] focus:outline-none transition-colors text-[#101010] resize-none"
                        placeholder="Hello Aly! I'm reaching out because..."
                      />
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-[#F7E859]/20 rounded-xl border border-[#F7E859]">
                      <div className="flex items-center h-6">
                        <input
                          type="checkbox"
                          id="subscribe"
                          name="subscribe"
                          checked={formData.subscribe}
                          onChange={handleChange}
                          className="w-5 h-5 text-[#F26B3A] rounded border-gray-300 focus:ring-[#F26B3A] cursor-pointer"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="subscribe" className="text-sm font-semibold text-[#101010] cursor-pointer">
                          Join the Family Newsletter
                        </label>
                        <span className="text-xs text-[#2A2A2A]">
                          Receive updates on new music, projects, and exclusive coloring pages.
                        </span>
                      </div>
                    </div>

                    {submitError && (
                      <p className="text-red-500 font-semibold text-sm">Failed to send message. Please try again later.</p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary flex items-center justify-center gap-2 py-4 shadow-lg hover:shadow-xl transition-all disabled:opacity-70"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center text-[#101010]">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h2 className="font-['Fredoka_One'] text-3xl mb-4">Message Received!</h2>
                    <p className="text-lg text-[#2A2A2A] max-w-md mx-auto">
                      Thank you for reaching out to The Bloom's House. We will get back to you as soon as possible.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="mt-8 px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-semibold transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                )}
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
