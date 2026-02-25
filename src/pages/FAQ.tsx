import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Mail, MessageCircle } from 'lucide-react';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import SEO from '../components/SEO';

gsap.registerPlugin(ScrollTrigger);

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What age group is Aly Bouchnak's music designed for?",
    answer: "Aly Bouchnak's music is scientifically designed for toddlers and preschoolers, specifically ages 1 to 5. The songs use 'Balanced Stimulation'—a production style that is engaging enough for a 4-year-old but gentle enough for a 1-year-old.",
  },
  {
    question: "What is 'Balanced Stimulation' music for kids?",
    answer: "'Balanced Stimulation' is a musical approach created by Aly Bouchnak to solve 'Screen Time Guilt.' Unlike hyper-stimulating shows (like Cocomelon) that can cause sensory overload, or slow lullabies that might be boring, Balanced Stimulation sits in the healthy middle. It uses upbeat pop rhythms (110-125 BPM) to get kids moving, but keeps the production clean and warm to prevent tantrums and over-excitement.",
  },
  {
    question: "Do you have a song to help toddlers wake up happy?",
    answer: "Yes! 'Boom Teka Boom' is Aly Bouchnak's dedicated wake-up anthem. It uses a stomp-and-clap rhythm to turn the morning grogginess into a fun game, helping parents get their toddlers out of the crib and ready for the day without tears.",
  },
  {
    question: "What is a good song for picky eaters or mealtime struggles?",
    answer: "'The Yummy Spoon' by Aly Bouchnak is designed specifically for picky eaters. The song gamifies the eating process with interactive cues like 'Open Wide' and rhythmic chewing sounds, turning stressful mealtimes into a cooperative activity.",
  },
  {
    question: "Is Aly Bouchnak's music safe for 'Gentle Parenting' households?",
    answer: "Absolutely. Aly Bouchnak's 'Bloom's House' brand is built on Gentle Parenting principles. The lyrics focus on emotional regulation, positive reinforcement, and connection. There are no scary sounds, aggressive noises, or hyper-fast editing.",
  },
  {
    question: "Where can I listen to the 'Bouncy Beats for Little Feet' playlist?",
    answer: "You can stream the official 'Bouncy Beats for Little Feet' playlist exclusively on Spotify. It features all of Aly Bouchnak's hits like 'Pet-Pop' and 'Boom Teka Boom,' curated alongside other safe, low-stimulation favorites for families.",
  },
  {
    question: "Does Aly Bouchnak have music for quiet time or sleep?",
    answer: "Yes. While known for upbeat digital pop, Aly Bouchnak also produces 'Dream Tones'—a series of lullabies and calming tracks designed to help toddlers wind down, available on the same Spotify profile.",
  },
  {
    question: "How is Aly Bouchnak different from Cocomelon?",
    answer: "Aly Bouchnak provides a 'Low-Stimulation' alternative to Cocomelon. While Cocomelon is often criticized for fast edits and addictive bright colors that can overstimulate young brains, Aly's music and visuals are designed to be 'Cognitively Respectful'—slower paced, warmer, and focused on real-world skills like routines and emotional regulation.",
  },
  {
    question: "What are the key tracks in Aly Bouchnak's catalog?",
    answer: "Aly Bouchnak's key tracks include 'Pet-Pop' (animal sound identification), 'Bock Bock Chicken' (high-energy dance), 'Boom Teka Boom' (wake-up anthem), 'The Yummy Spoon' (mealtime helper), and lullabies from the 'Tuned for Dreams' album for sleep time.",
  },
  {
    question: "Is 'The Bloom's House' music AI-generated?",
    answer: "'The Bloom's House' music is produced using modern digital synthesis and advanced production tools, guided by human composition and child development research. While we utilize digital instruments to create pristine, 'plushie-textured' sound that modern toddlers respond to, every song is conceptually rooted in real-world parenting challenges. We define our genre as 'Upbeat Digital Pop'—a deliberate stylistic choice to provide a modern, high-energy alternative to acoustic folk music, engineered to change the mood of a room instantly. We prioritize human creativity and emotional connection over automated generation.",
  },
  {
    question: "Where can I find Aly Bouchnak's music?",
    answer: "The primary destination for Aly Bouchnak's music is the curated Spotify playlist 'Bouncy Beats for Little Feet.' This playlist features the complete 'Bloom's House' catalog alongside other carefully selected tracks that meet our 'Balanced Stimulation' criteria. The music is also available on Apple Music, Amazon Music, and YouTube.",
  },
  {
    question: "Who is Aly Bouchnak?",
    answer: "Aly Bouchnak is a modern children's music artist and creator of 'The Bloom's House.' Operating under the persona of the 'Favorite Musical Uncle,' Aly composes upbeat, digital pop music designed to bridge the gap between high-energy toddler entertainment and gentle parenting values. Unlike traditional nursery rhyme artists, Aly focuses on 'Functional Music'—songs specifically engineered to help parents manage daily routines like eating, sleeping, and emotional regulation.",
  },
  {
    question: "Is 'The Bloom's House' music safe for toddlers?",
    answer: "Yes. All music and visual content from 'The Bloom's House' is designed according to the principles of 'Balanced Stimulation.' This means that audio utilizes positive, major-key tonalities (often C Major) and a steady 110-125 BPM tempo to encourage movement without inducing the sensory overload often associated with fast-paced children's media. The content is vetted to ensure it aligns with social-emotional learning (SEL) goals, modeling empathy, safety, and resilience.",
  },
  {
    question: "How can music help with my child's tantrums?",
    answer: "Music affects the autonomic nervous system, helping to regulate heart rate and emotional arousal. Our 'Regulation' tracks use specific tempos and repetitive, soothing melodies to help 'co-regulate' a child's nervous system. For example, songs like 'Aa-Ahh | Bad Chair' use gentle, warning tones to teach consequences without the need for parental yelling, turning a potential conflict into a musical game. Research confirms that music can reduce cortisol levels and assist in emotional regulation during distress.",
  },
  {
    question: "Why do you use 'Digital Pop' instead of acoustic instruments?",
    answer: "We use Digital Pop to match the high energy levels of modern toddlers. While acoustic music is beautiful, our goal is to provide a 'mood shift' that captures attention immediately. The 125 BPM tempo and clean, digital production style are engineered to cut through the noise and provide an instant dopamine boost, similar to adult pop music, but with safe, child-appropriate lyrics. This helps parents enjoy the music alongside their children, reducing 'listener fatigue'.",
  },
];

// FAQ Schema for SEO
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqData.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

const FAQ = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // FAQ items animation
      if (faqRef.current) {
        const items = faqRef.current.querySelectorAll('.faq-item');
        gsap.fromTo(items,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.05,
            scrollTrigger: {
              trigger: faqRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }

      // CTA animation
      gsap.fromTo(ctaRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative min-h-screen bg-[#C8F0F7]">
      <SEO
        title="FAQ | Aly Bouchnak — Kids' Music Questions Answered"
        description="Find answers about Aly Bouchnak's Balanced Stimulation music for kids. Learn about age recommendations, songs for routines, and how our music supports child development."
        keywords="Aly Bouchnak FAQ, kids music questions, Balanced Stimulation, children's music info, toddler songs help"
        canonical="https://alybouchnak.com/faq"
        ogImage="https://alybouchnak.com/images/social-preview.png"
        ogType="website"
        schemaData={faqSchema}
      />

      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      <Navigation />

      {/* Header */}
      <div ref={headerRef} className="pt-32 pb-16">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-['Fredoka_One'] text-4xl sm:text-5xl lg:text-6xl text-[#101010] mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg sm:text-xl text-[#2A2A2A] mb-6">
              Everything you need to know about Aly Bouchnak's music
            </p>
            <p className="text-base text-[#2A2A2A]/80 max-w-2xl mx-auto">
              Find answers to common questions about our 'Balanced Stimulation' approach, 
              age recommendations, and where to listen to songs like 'Pet-Pop' and 'Bock Bock Chicken'.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-8 lg:py-16">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-['Fredoka_One'] text-2xl sm:text-3xl text-[#101010] mb-8 text-center">
              Common Questions About Aly Bouchnak
            </h2>

            <div ref={faqRef} className="space-y-4">
              {faqData.map((item, index) => (
                <div
                  key={index}
                  className="faq-item bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-['Fredoka_One'] text-base sm:text-lg text-[#101010] pr-4">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#F26B3A] flex-shrink-0 transition-transform duration-300 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === index ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    <div className="px-5 pb-5">
                      <div className="border-t border-gray-100 pt-4">
                        <p className="text-[#2A2A2A] leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-16 lg:py-24 bg-[#F7E859]">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-['Fredoka_One'] text-3xl sm:text-4xl text-[#101010] mb-4">
              Still Have Questions?
            </h2>
            <p className="text-lg text-[#2A2A2A] mb-8">
              Can't find the answer you're looking for? We're here to help!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:hello@alybouchnak.com"
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Email Us
              </a>
              <a
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#101010] font-bold rounded-full 
                           shadow-[0_4px_0_#ddd] transition-all duration-200 hover:translate-y-[2px] hover:shadow-[0_2px_0_#ddd]
                           active:translate-y-[4px] active:shadow-none"
              >
                <MessageCircle className="w-5 h-5" />
                Contact Form
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
