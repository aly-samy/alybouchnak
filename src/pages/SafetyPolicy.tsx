import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import SEO from '../components/SEO';
import OptimizedImage from '../components/OptimizedImage';

gsap.registerPlugin(ScrollTrigger);

const SafetyPolicy = () => {
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
                title="Safety & Values Commitment | Aly Bouchnak - The Bloom's House"
                description="Our commitment to 'Guilt-Free' entertainment. Balanced stimulation, strict privacy compliance, and content integrity for modern families."
                keywords="safety policy, children's safety, family values, balanced stimulation, kids media ethics"
                canonical="https://alybouchnak.com/safety-policy"
                ogImage="https://alybouchnak.com/images/Blooms-Safety-Seal.webp"
                ogType="website"
            />

            <div ref={sectionRef} className="relative min-h-screen bg-[#C8F0F7]">
                {/* Grain overlay */}
                <div className="grain-overlay" />

                <Navigation />

                {/* Header */}
                <div ref={headingRef} className="pt-32 pb-12 bg-[#F26B3A]">
                    <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 text-center text-white">
                        <div className="flex justify-center mb-6">
                            <OptimizedImage
                                src="/images/Blooms-Safety-Seal.webp"
                                alt="The Bloom's House Safety Seal"
                                width={128}
                                height={128}
                                sizes="128px"
                                className="w-24 h-24 sm:w-32 sm:h-32 drop-shadow-2xl"
                            />
                        </div>
                        <h1 className="font-['Fredoka_One'] text-4xl sm:text-5xl lg:text-6xl mb-4">
                            Safety & Values
                        </h1>
                        <p className="text-lg sm:text-xl opacity-90 max-w-2xl mx-auto">
                            Guilt-Free Entertainment for Modern Families
                        </p>
                    </div>
                </div>

                {/* Content Section */}
                <section className="py-16 lg:py-24">
                    <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
                        <div ref={contentRef} className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-[2rem] p-8 sm:p-12 lg:p-16 shadow-xl border border-white/40">
                            <div className="prose prose-lg prose-slate max-w-none">
                                <p className="lead font-medium text-[#2A2A2A] text-xl mb-12">
                                    At The Bloom's House, we know that today's parents are looking for more than just a distraction for their toddlers—they are looking for a <strong>Parenting Partner</strong>. Our mission is to provide high-quality, upbeat music and visuals that respect your child's development and your family's privacy.
                                </p>

                                <div className="space-y-16">
                                    {/* Section 1 */}
                                    <section>
                                        <h2 className="font-['Fredoka_One'] text-2xl text-[#101010] mb-6 flex items-center gap-4">
                                            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F26B3A] text-white text-lg shrink-0">1</span>
                                            Balanced Stimulation
                                        </h2>
                                        <div className="pl-14 space-y-4">
                                            <p className="text-[#2A2A2A] font-semibold italic text-lg opacity-80 mb-2">The "No-Overwhelm" Rule</p>
                                            <p className="text-[#2A2A2A] leading-relaxed">
                                                Unlike traditional high-energy kids' media that can lead to overstimulation, Aly Bouchnak's music and visuals are engineered for <strong>Balanced Stimulation</strong>.
                                            </p>
                                            <ul className="space-y-4 text-[#2A2A2A]">
                                                <li className="flex gap-3">
                                                    <span className="text-[#F26B3A] mt-1.5 shrink-0">•</span>
                                                    <span><strong>Visuals:</strong> Our 3D "Felt-Style" animation uses soft textures, warm lighting, and intentional pacing to engage your child without "trance-inducing" hyper-activity.</span>
                                                </li>
                                                <li className="flex gap-3">
                                                    <span className="text-[#F26B3A] mt-1.5 shrink-0">•</span>
                                                    <span><strong>Audio:</strong> Our "Utility Songs" (like Boom Teka Boom and The Yummy Tummy Song) are designed to help with routines, using clear lyrics and bouncy—but regulated—rhythms.</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </section>

                                    {/* Section 2 */}
                                    <section>
                                        <h2 className="font-['Fredoka_One'] text-2xl text-[#101010] mb-6 flex items-center gap-4">
                                            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F26B3A] text-white text-lg shrink-0">2</span>
                                            Strict Privacy Compliance
                                        </h2>
                                        <div className="pl-14 space-y-4">
                                            <p className="text-[#2A2A2A] font-semibold italic text-lg opacity-80 mb-2">COPPA & GDPR</p>
                                            <p className="text-[#2A2A2A] leading-relaxed">
                                                Your family's data is sacred. We operate under a <strong>"Zero-Data"</strong> policy for children:
                                            </p>
                                            <ul className="space-y-4 text-[#2A2A2A]">
                                                <li className="flex gap-3">
                                                    <span className="text-[#F26B3A] mt-1.5 shrink-0">•</span>
                                                    <span><strong>No Tracking:</strong> We do not collect personal information from children.</span>
                                                </li>
                                                <li className="flex gap-3">
                                                    <span className="text-[#F26B3A] mt-1.5 shrink-0">•</span>
                                                    <span><strong>Safe Platforms:</strong> We host our videos on YouTube Kids and our music on Spotify, ensuring all content is tagged "Made for Kids" to disable personalized ads and inappropriate comments.</span>
                                                </li>
                                                <li className="flex gap-3">
                                                    <span className="text-[#F26B3A] mt-1.5 shrink-0">•</span>
                                                    <span><strong>Parental Only:</strong> Any newsletters or "Founder's Club" sign-ups are strictly for parents and require adult verification.</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </section>

                                    {/* Section 3 */}
                                    <section>
                                        <h2 className="font-['Fredoka_One'] text-2xl text-[#101010] mb-6 flex items-center gap-4">
                                            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F26B3A] text-white text-lg shrink-0">3</span>
                                            Content Integrity
                                        </h2>
                                        <div className="pl-14 space-y-6">
                                            <p className="text-[#2A2A2A] leading-relaxed">
                                                Every song, from <em>Bock Bock Bock Chicken</em> to our <em>Tuned for Dreams</em> lullabies, undergoes a strict internal review:
                                            </p>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                <div className="bg-[#C8F0F7]/30 p-5 rounded-2xl border border-[#C8F0F7]/50">
                                                    <h4 className="font-bold text-[#101010] mb-2">No Hidden Agendas</h4>
                                                    <p className="text-sm text-[#2A2A2A]">Our lyrics focus on play, routines, and emotional regulation.</p>
                                                </div>
                                                <div className="bg-[#F7E859]/20 p-5 rounded-2xl border border-[#F7E859]/50">
                                                    <h4 className="font-bold text-[#101010] mb-2">Always "Clean"</h4>
                                                    <p className="text-sm text-[#2A2A2A]">All audio is tagged as "Clean" across all streaming platforms to ensure no surprises.</p>
                                                </div>
                                            </div>
                                            <p className="text-[#2A2A2A] leading-relaxed">
                                                <strong>Social Responsibility:</strong> We promote positive family values, celebrating grandparents (as heard in <em>Nanny & Papa</em>) and the bond between pets and children.
                                            </p>
                                        </div>
                                    </section>

                                    {/* Section 4 */}
                                    <section className="bg-gradient-to-br from-[#F26B3A] to-[#F28C3A] rounded-[2.5rem] p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
                                        {/* Decorative seal in background */}
                                        <OptimizedImage
                                            src="/images/Blooms-Safety-Seal.webp"
                                            alt=""
                                            width={192}
                                            height={192}
                                            sizes="192px"
                                            className="absolute -right-12 -bottom-12 w-48 h-48 opacity-10 pointer-events-none"
                                        />

                                        <h2 className="font-['Fredoka_One'] text-3xl mb-6">
                                            Our Promise to You
                                        </h2>
                                        <p className="text-xl leading-relaxed opacity-95">
                                            Aly Bouchnak is committed to creating a <strong>"Safe Harbor"</strong> in the digital world. We are constantly monitoring the latest research in early childhood media literacy to ensure The Bloom's House remains a place where kids can be kids, and parents can breathe easy.
                                        </p>
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

export default SafetyPolicy;
