import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import SEO from '../components/SEO';

gsap.registerPlugin(ScrollTrigger);

const PrivacyPolicy = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

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

            // Content animation
            gsap.fromTo(contentRef.current,
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
                title="Privacy Policy | Aly Bouchnak - The Bloom's House"
                description="Learn about how we protect your family's privacy at The Bloom's House. Our Kids-First data commitment and COPPA/GDPR compliance."
                keywords="privacy policy, kids privacy, COPPA, GDPR, children's music privacy"
                canonical="https://alybouchnak.com/privacy-policy"
                ogImage="https://alybouchnak.com/images/Aly-bouchnak-profile.webp"
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
                            Privacy Policy
                        </h1>
                        <p className="text-lg sm:text-xl text-[#2A2A2A] max-w-2xl mx-auto">
                            Last Updated: October 2025
                        </p>
                    </div>
                </div>

                {/* Content Section */}
                <section className="py-16 lg:py-24">
                    <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
                        <div ref={contentRef} className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-[2rem] p-8 sm:p-12 lg:p-16 shadow-xl border border-white/40">
                            <div className="prose prose-lg prose-slate max-w-none">
                                <p className="lead font-medium text-[#2A2A2A] text-xl mb-8">
                                    Welcome to <strong>The Bloom's House</strong>, the home of Aly Bouchnak’s music. We are committed to providing "Guilt-Free" entertainment, which starts with protecting your family's privacy.
                                </p>

                                <div className="space-y-12">
                                    <section>
                                        <h2 className="font-['Fredoka_One'] text-2xl text-[#101010] mb-4 flex items-center gap-3">
                                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F26B3A] text-white text-base">1</span>
                                            Our "Kids-First" Data Commitment
                                        </h2>
                                        <div className="pl-11">
                                            <p className="text-[#2A2A2A] leading-relaxed">
                                                Our website and content are designed for families and children under 13. We strictly adhere to the Children’s Online Privacy Protection Act (COPPA) and the European General Data Protection Regulation (GDPR). <strong>We do not knowingly collect, use, or disclose personal information from children under 13 without verifiable parental consent.</strong>
                                            </p>
                                        </div>
                                    </section>

                                    <section>
                                        <h2 className="font-['Fredoka_One'] text-2xl text-[#101010] mb-4 flex items-center gap-3">
                                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F26B3A] text-white text-base">2</span>
                                            Information We Collect
                                        </h2>
                                        <div className="pl-11">
                                            <ul className="space-y-4 text-[#2A2A2A]">
                                                <li className="flex gap-2">
                                                    <span className="text-[#F26B3A]">•</span>
                                                    <span><strong>Parental Information:</strong> If you sign up for our "Founder's Club" or newsletter, we collect the parent's email address only with explicit consent.</span>
                                                </li>
                                                <li className="flex gap-2">
                                                    <span className="text-[#F26B3A]">•</span>
                                                    <span><strong>Non-Personal Data:</strong> We may collect anonymous usage data (like which song lyrics are viewed most) to improve our "Balanced Stimulation" content. This data cannot identify you or your child.</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </section>

                                    <section>
                                        <h2 className="font-['Fredoka_One'] text-2xl text-[#101010] mb-4 flex items-center gap-3">
                                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F26B3A] text-white text-base">3</span>
                                            How We Use Information
                                        </h2>
                                        <div className="pl-11">
                                            <p className="text-[#2A2A2A] leading-relaxed mb-4">We use parent-provided information to:</p>
                                            <ul className="space-y-4 text-[#2A2A2A] ml-4">
                                                <li className="flex gap-2">
                                                    <span className="text-[#F26B3A]">•</span>
                                                    <span>Send updates about new "Utility Songs" (like "Boom Teka Boom" or "The Yummy Tummy Song").</span>
                                                </li>
                                                <li className="flex gap-2">
                                                    <span className="text-[#F26B3A]">•</span>
                                                    <span>Share links to our <strong>Bouncy Beats for Little Feet</strong> Spotify playlist.</span>
                                                </li>
                                                <li className="flex gap-2">
                                                    <span className="text-[#F26B3A]">•</span>
                                                    <span>Provide fan support through platforms like PayPal or Ko-fi (processed externally).</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </section>

                                    <section>
                                        <h2 className="font-['Fredoka_One'] text-2xl text-[#101010] mb-4 flex items-center gap-3">
                                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F26B3A] text-white text-base">4</span>
                                            Third-Party Platforms
                                        </h2>
                                        <div className="pl-11">
                                            <p className="text-[#2A2A2A] leading-relaxed">
                                                Our music is hosted on third-party platforms like Spotify, Apple Music, and YouTube. These platforms have their own privacy policies. Please note that on YouTube, our content is marked as "Made for Kids," which automatically disables personalized ads and comments to protect your child’s privacy.
                                            </p>
                                        </div>
                                    </section>

                                    <section className="bg-[#C8F0F7]/50 rounded-2xl p-8 border border-[#C8F0F7]">
                                        <h2 className="font-['Fredoka_One'] text-2xl text-[#101010] mb-4">
                                            Contact Us
                                        </h2>
                                        <p className="text-[#2A2A2A] leading-relaxed">
                                            If you have any questions about our privacy practices, please contact Aly Bouchnak at:{' '}
                                            <a href="mailto:hello@alybouchnak.com" className="text-[#F26B3A] font-bold hover:underline">
                                                hello@alybouchnak.com
                                            </a>.
                                        </p>
                                    </section> sectionRef
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

export default PrivacyPolicy;
