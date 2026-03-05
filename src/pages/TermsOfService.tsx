import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import SEO from '../components/SEO';

gsap.registerPlugin(ScrollTrigger);

const TermsOfService = () => {
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
                title="Terms of Service | Aly Bouchnak - The Bloom's House"
                description="Review the terms of service for The Bloom's House. Guidelines for parents, intellectual property, and community standards."
                keywords="terms of service, parental responsibility, intellectual property, children's music terms"
                canonical="https://alybouchnak.com/terms-of-service"
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
                            Terms of Service
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
                                    By accessing alybouchnak.com and "The Bloom's House" content, you (the parent or legal guardian) agree to these terms. Our goal is to provide a safe, bouncy, and modern musical environment for your toddlers.
                                </p>

                                <div className="space-y-12">
                                    <section>
                                        <h2 className="font-['Fredoka_One'] text-2xl text-[#101010] mb-4 flex items-center gap-3">
                                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F26B3A] text-white text-base">1</span>
                                            Acceptance of Terms
                                        </h2>
                                        <div className="pl-11">
                                            <p className="text-[#2A2A2A] leading-relaxed">
                                                The use of this website and its services constitute acceptance of these Terms and Conditions. We reserve the right to change these terms at any time by posting changes on this page.
                                            </p>
                                        </div>
                                    </section>

                                    <section>
                                        <h2 className="font-['Fredoka_One'] text-2xl text-[#101010] mb-4 flex items-center gap-3">
                                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F26B3A] text-white text-base">2</span>
                                            Parental Responsibility
                                        </h2>
                                        <div className="pl-11">
                                            <p className="text-[#2A2A2A] leading-relaxed">
                                                While our music and visuals (including our 3D plushie characters) are designed to be cognitively respectful and provide "Balanced Stimulation," we encourage parents to engage with their children during "The Bloom's House" activities. You are responsible for supervising your child’s use of the internet.
                                            </p>
                                        </div>
                                    </section>

                                    <section>
                                        <h2 className="font-['Fredoka_One'] text-2xl text-[#101010] mb-4 flex items-center gap-3">
                                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F26B3A] text-white text-base">3</span>
                                            Intellectual Property
                                        </h2>
                                        <div className="pl-11">
                                            <p className="text-[#2A2A2A] leading-relaxed">
                                                All music, including "Pet-Pop" and "Bock Bock Bock Chicken," lyrics, and the 3D plushie visual brand are the exclusive property of Aly Bouchnak and The Bloom's House. You may use this content for personal, non-commercial family fun only!
                                            </p>
                                        </div>
                                    </section>

                                    <section>
                                        <h2 className="font-['Fredoka_One'] text-2xl text-[#101010] mb-4 flex items-center gap-3">
                                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F26B3A] text-white text-base">4</span>
                                            The "Bouncy Beats" Community Standards
                                        </h2>
                                        <div className="pl-11">
                                            <p className="text-[#2A2A2A] leading-relaxed">
                                                We aim to be your "Parenting Partner." When interacting with our community on social media (Instagram, TikTok, or YouTube Community tabs), we ask for a "no judgment" environment. Any harassing or inappropriate behavior will result in removal from our community spaces.
                                            </p>
                                        </div>
                                    </section>

                                    <section>
                                        <h2 className="font-['Fredoka_One'] text-2xl text-[#101010] mb-4 flex items-center gap-3">
                                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F26B3A] text-white text-base">5</span>
                                            External Links
                                        </h2>
                                        <div className="pl-11">
                                            <p className="text-[#2A2A2A] leading-relaxed">
                                                Our site contains links to external platforms like Spotify and PayPal. We are not responsible for the content or practices of these external sites.
                                            </p>
                                        </div>
                                    </section>

                                    <section>
                                        <h2 className="font-['Fredoka_One'] text-2xl text-[#101010] mb-4 flex items-center gap-3">
                                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F26B3A] text-white text-base">6</span>
                                            Limitation of Liability
                                        </h2>
                                        <div className="pl-11">
                                            <p className="text-[#2A2A2A] leading-relaxed">
                                                Aly Bouchnak provides music for entertainment and routine-building (utility) purposes. While we strive for "Guilt-Free" content, the music is provided "as is" without warranties of any kind.
                                            </p>
                                        </div>
                                    </section>
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

export default TermsOfService;
