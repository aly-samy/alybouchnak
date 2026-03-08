import React, { useState, useEffect, useRef } from 'react';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';
import SEO from '../components/SEO';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BloomQuizWizard from '../components/BloomQuizWizard';
import './MeetTheBlooms.css';

gsap.registerPlugin(ScrollTrigger);

export default function MeetTheBlooms() {
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [isToastClosing, setIsToastClosing] = useState(false);
    const [isQuizOpen, setIsQuizOpen] = useState(false);
    const toastTimerContext = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

    const tracks = [
        "Welcome to The Bloom's House!",
        "The Sharing Song",
        "'Yalla!' Means 'Let's Go!'",
        "The 'Try Again' Song",
        "Twinkle Twinkle Little Star"
    ];

    const characterCardsRef = useRef<(HTMLElement | null)[]>([]);

    useEffect(() => {
        // Reveal animation for character cards using GSAP instead of IntersectionObserver
        characterCardsRef.current.forEach((card, index) => {
            if (card) {
                gsap.to(card, {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top bottom-=50',
                        toggleActions: 'play none none none'
                    }
                });
            }
        });
    }, []);

    const showToast = (message: string) => {
        if (toastTimerContext.current) {
            clearTimeout(toastTimerContext.current);
        }
        setIsToastClosing(false);
        setToastMessage(message);

        // Hide toast after 3 seconds
        toastTimerContext.current = setTimeout(() => {
            setIsToastClosing(true);
            setTimeout(() => {
                setToastMessage(null);
                setIsToastClosing(false);
            }, 300); // Matches the hide animation duration
        }, 2000);
    };

    const getSoundName = (type: string) => {
        const sounds: Record<string, string> = {
            'giggle': 'Baby Giggle',
            'letsplay': '"Let\'s Play!"',
            'piano': 'Gentle Piano',
            'ukulele': 'Soft Ukulele Strum',
            'comfort': 'Warm "There, there"',
            'chuckle': 'Warm Chuckle',
            'yalla': '"Yalla!"',
            'wonder': '"Hmm, I wonder..."',
            'babygiggle': 'Sweet Giggle',
            'woof': 'Happy Woof!',
            'meow': 'Soft Meow',
            'chirp': 'Cheerful Chirp'
        };
        return sounds[type] || 'Character Sound';
    };

    const playSound = (e: React.MouseEvent, type: string, audioFile: string) => {
        const card = e.currentTarget as HTMLElement;
        const indicator = card.querySelector('.sound-indicator') as HTMLElement;

        if (indicator) {
            indicator.textContent = '🔊';
            indicator.style.opacity = '1';
            indicator.style.transform = 'scale(1.2)';

            setTimeout(() => {
                indicator.style.transform = 'scale(1)';
            }, 200);
        }

        const audio = new Audio(`/audio/${audioFile}`);
        audio.play().catch(console.error);

        showToast(`Playing: ${getSoundName(type)}`);
    };

    const togglePlay = () => setIsPlaying(!isPlaying);

    const nextTrack = () => setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    const previousTrack = () => setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);

    const startQuiz = () => setIsQuizOpen(true);

    const handleDownload = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        const input = target.querySelector('input') as HTMLInputElement;
        showToast(`Coloring pages sent to ${input.value}! 🎨`);
        target.reset();
    };

    const subscribe = () => showToast('Thanks for subscribing! 🔔');

    return (
        <>
            <SEO
                title="Meet The Blooms | The Bloom's House"
                description="Meet the Bloom family – Max, Theo, Layla, Leo, and Mia – and their friends Zayna, Ciara, Kenji, and more! Discover who sings your favorite songs."
            />
            <Navigation />

            <div className="meet-the-blooms-container">
                {toastMessage && (
                    <div className={`toast-notification ${isToastClosing ? 'hide' : ''}`}>
                        {toastMessage}
                    </div>
                )}

                {/* Header Section */}
                <header className="blooms-hero">
                    <div className="hero-content">
                        <h1>Welcome to The Bloom's House!</h1>
                        <p className="hero-subtitle">Meet the family who loves to sing, play, and explore life's little moments together.</p>

                        <div className="family-illustration">
                            <div className="family-scene">
                                <img src="/images/The-Bloom's-Family.webp" alt="The Bloom's Family" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main>
                    {/* The Bloom Family (Core Cast) */}
                    <section className="blooms-section tier-1">
                        <div className="section-header">
                            <span className="section-tag">The Bloom Family</span>
                            <h2>Meet the Core Cast</h2>
                        </div>

                        <div className="character-grid">
                            {/* Max Bloom */}
                            <article className="character-card" ref={(el) => { characterCardsRef.current[0] = el; }} onClick={(e) => playSound(e, 'giggle', 'max.mp3')}>
                                <div className="card-visual" style={{ background: 'linear-gradient(135deg, #FFF8F0 0%, #FFE5B4 100%)' }}>
                                    <div className="character-avatar avatar-max">
                                        <img src="/images/Max-Bloom.webp" alt="Max Bloom" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div className="sound-indicator">🔊</div>
                                </div>
                                <div className="card-content">
                                    <div className="character-role">The Heart</div>
                                    <h3 className="character-name">Max Bloom</h3>
                                    <p className="character-bio">Max sees the world with fresh eyes every single day. Whether he's feeling the soft fur of Doby the dog, tasting a new food, or hearing a bird chirp for the first time, Max reminds us that life is full of wonderful discoveries.</p>
                                    <div className="character-meta">
                                        <div className="meta-item">
                                            <span className="meta-label">Favorite Song:</span>
                                            <span className="meta-value">Max's Discovery Songs (Coming Soon)</span>
                                        </div>
                                        <div className="meta-item">
                                            <span className="meta-label">Best Friend:</span>
                                            <span className="meta-value">Amara (they love parallel play!)</span>
                                        </div>
                                        <div className="meta-item">
                                            <span className="meta-label">Special Talent:</span>
                                            <span className="meta-value">Finding joy in the simplest things</span>
                                        </div>
                                    </div>
                                    <button className="play-button" onClick={(e) => { e.stopPropagation(); window.location.hash = '#sensory'; }}>
                                        <span>🧸</span> Explore with Max
                                    </button>
                                </div>
                            </article>

                            {/* Theo Bloom */}
                            <article className="character-card" ref={(el) => { characterCardsRef.current[1] = el; }} onClick={(e) => playSound(e, 'letsplay', 'Theo.mp3')}>
                                <div className="card-visual" style={{ background: 'linear-gradient(135deg, #E8F4F8 0%, #B5D8EB 100%)' }}>
                                    <div className="character-avatar avatar-theo">
                                        <img src="/images/Theo-Bloom.webp" alt="Theo Bloom" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div className="sound-indicator">🔊</div>
                                </div>
                                <div className="card-content">
                                    <div className="character-role">The Adventurer</div>
                                    <h3 className="character-name">Theo Bloom</h3>
                                    <p className="character-bio">Theo has energy for days and a heart just as big. He's always the first to suggest a game, invite a friend to play, or try something new. When things don't go as planned, Theo is learning that 'trying again' is part of the adventure.</p>
                                    <div className="character-meta">
                                        <div className="meta-item">
                                            <span className="meta-label">Favorite Song:</span>
                                            <span className="meta-value">"The 'Try Again' Song"</span>
                                        </div>
                                        <div className="meta-item">
                                            <span className="meta-label">Best Friends:</span>
                                            <span className="meta-value">Ciara and Kenji – the adventure trio!</span>
                                        </div>
                                        <div className="meta-item">
                                            <span className="meta-label">Special Talent:</span>
                                            <span className="meta-value">Turning ordinary moments into imaginative games</span>
                                        </div>
                                    </div>
                                    <button className="play-button" onClick={(e) => { e.stopPropagation(); window.location.hash = '#adventures'; }}>
                                        <span>🎮</span> Adventures with Theo
                                    </button>
                                </div>
                            </article>

                            {/* Layla Bloom */}
                            <article className="character-card" ref={(el) => { characterCardsRef.current[2] = el; }} onClick={(e) => playSound(e, 'piano', 'Layla.mp3')}>
                                <div className="card-visual" style={{ background: 'linear-gradient(135deg, #F0E6F6 0%, #D4C5E2 100%)' }}>
                                    <div className="character-avatar avatar-layla">
                                        <img src="/images/Layla-Bloom.webp" alt="Layla Bloom" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div className="sound-indicator">🔊</div>
                                </div>
                                <div className="card-content">
                                    <div className="character-role">The Gentle Mentor</div>
                                    <h3 className="character-name">Layla Bloom</h3>
                                    <p className="character-bio">Layla is the big sister everyone wishes they had. She's creative, responsible, and always knows how to help her younger brothers work through big feelings. When her best friend Zayna taught her the word 'Yalla,' Layla discovered how much fun it is to learn about other cultures.</p>
                                    <div className="character-meta">
                                        <div className="meta-item">
                                            <span className="meta-label">Favorite Song:</span>
                                            <span className="meta-value">"'Yalla!' Means 'Let's Go!'"</span>
                                        </div>
                                        <div className="meta-item">
                                            <span className="meta-label">Best Friend:</span>
                                            <span className="meta-value">Zayna – creative soulmates</span>
                                        </div>
                                        <div className="meta-item">
                                            <span className="meta-label">Special Talent:</span>
                                            <span className="meta-value">Helping little ones name their emotions</span>
                                        </div>
                                    </div>
                                    <button className="play-button" onClick={(e) => { e.stopPropagation(); window.location.hash = '#sel'; }}>
                                        <span>📖</span> Stories with Layla
                                    </button>
                                </div>
                            </article>

                            {/* Leo Bloom */}
                            <article className="character-card" ref={(el) => { characterCardsRef.current[3] = el; }} onClick={(e) => playSound(e, 'ukulele', 'Leo.mp3')}>
                                <div className="card-visual" style={{ background: 'linear-gradient(135deg, #FFE8E0 0%, #FF9B85 100%)' }}>
                                    <div className="character-avatar avatar-leo">
                                        <img src="/images/Leo-Bloom.webp" alt="Leo Bloom" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div className="sound-indicator">🔊</div>
                                </div>
                                <div className="card-content">
                                    <div className="character-role">The Steady Guide</div>
                                    <h3 className="character-name">Leo Bloom</h3>
                                    <p className="character-bio">Leo believes the best moments in life are the quiet ones – a bedtime lullaby, a morning snuggle, a walk where you stop to look at every leaf. He's the dad who's always ready to play, but also the dad who knows when it's time to be still and listen.</p>
                                    <div className="character-meta">
                                        <div className="meta-item">
                                            <span className="meta-label">Favorite Song:</span>
                                            <span className="meta-value">"Twinkle Twinkle Little Star" (go-to lullaby)</span>
                                        </div>
                                        <div className="meta-item">
                                            <span className="meta-label">Special Talent:</span>
                                            <span className="meta-value">Making everyone feel safe and loved</span>
                                        </div>
                                        <div className="meta-item">
                                            <span className="meta-label">Favorite Activity:</span>
                                            <span className="meta-value">Morning guitar sessions in the living room</span>
                                        </div>
                                    </div>
                                    <button className="play-button" onClick={(e) => { e.stopPropagation(); window.location.hash = '#lullabies'; }}>
                                        <span>🌙</span> Bedtime with Leo
                                    </button>
                                </div>
                            </article>

                            {/* Mia Bloom */}
                            <article className="character-card" ref={(el) => { characterCardsRef.current[4] = el; }} onClick={(e) => playSound(e, 'comfort', 'Mia.mp3')}>
                                <div className="card-visual" style={{ background: 'linear-gradient(135deg, #FCE8E8 0%, #F4C2C2 100%)' }}>
                                    <div className="character-avatar avatar-mia">
                                        <img src="/images/Mia-Bloom.webp" alt="Mia Bloom" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div className="sound-indicator">🔊</div>
                                </div>
                                <div className="card-content">
                                    <div className="character-role">The Nurturer</div>
                                    <h3 className="character-name">Mia Bloom</h3>
                                    <p className="character-bio">Mia has a special gift for turning everyday moments into memories. Whether she's helping Theo name his feelings, baking with Grandma Rose, or painting with Layla, Mia creates space for her children to grow, feel, and express themselves.</p>
                                    <div className="character-meta">
                                        <div className="meta-item">
                                            <span className="meta-label">Favorite Song:</span>
                                            <span className="meta-value">"The Rainbow Colors Song"</span>
                                        </div>
                                        <div className="meta-item">
                                            <span className="meta-label">Special Talent:</span>
                                            <span className="meta-value">Knowing exactly when someone needs a hug</span>
                                        </div>
                                        <div className="meta-item">
                                            <span className="meta-label">Favorite Activity:</span>
                                            <span className="meta-value">Family craft time around the kitchen table</span>
                                        </div>
                                    </div>
                                    <button className="play-button" onClick={(e) => { e.stopPropagation(); window.location.hash = '#creative'; }}>
                                        <span>🎨</span> Creative Time with Mia
                                    </button>
                                </div>
                            </article>
                        </div>
                    </section>

                    {/* Extended Family & Friends */}
                    <section className="blooms-section tier-2">
                        <div className="section-header">
                            <span className="section-tag">Extended Family & Friends</span>
                            <h2>Our Beloved Community</h2>
                        </div>

                        <div className="character-grid">
                            {/* Grandparents */}
                            <article className="character-card" ref={(el) => { characterCardsRef.current[5] = el; }} onClick={(e) => playSound(e, 'chuckle', 'Arthur-and-Rose.mp3')}>
                                <div className="card-visual" style={{ background: 'linear-gradient(135deg, #E8F0E5 0%, #C5D5C0 100%)' }}>
                                    <div className="character-avatar avatar-grandparents">
                                        <img src="/images/Arthur-and-Rose-Bloom.webp" alt="Grandpa Arthur & Grandma Rose" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div className="sound-indicator">🔊</div>
                                </div>
                                <div className="card-content">
                                    <div className="character-role">The Storytellers</div>
                                    <h3 className="character-name">Grandpa Arthur & Grandma Rose</h3>
                                    <p className="character-bio">Every family needs its historians, and that's Arthur and Rose. Grandpa Arthur tells the best stories about 'when your daddy was little,' and Grandma Rose's kitchen is where family traditions come to life.</p>
                                    <div className="character-meta">
                                        <div className="meta-item">
                                            <span className="meta-label">Favorite Song:</span>
                                            <span className="meta-value">"Let's Bake a Cake!"</span>
                                        </div>
                                        <div className="meta-item">
                                            <span className="meta-label">Special Talent:</span>
                                            <span className="meta-value">Making old stories feel new and exciting</span>
                                        </div>
                                    </div>
                                    <button className="play-button" onClick={(e) => { e.stopPropagation(); window.location.hash = '#traditions'; }}>
                                        <span>📚</span> Family Traditions
                                    </button>
                                </div>
                            </article>

                            {/* Zayna */}
                            <article className="character-card" ref={(el) => { characterCardsRef.current[6] = el; }} onClick={(e) => playSound(e, 'yalla', 'Zayna.mp3')}>
                                <div className="card-visual" style={{ background: 'linear-gradient(135deg, #F0E8F8 0%, #D4C5E2 100%)' }}>
                                    <div className="character-avatar avatar-zayna">
                                        <img src="/images/Zayna.webp" alt="Zayna" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div className="sound-indicator">🔊</div>
                                </div>
                                <div className="card-content">
                                    <div className="character-role">The Cultural Bridge</div>
                                    <h3 className="character-name">Zayna</h3>
                                    <p className="character-bio">Zayna is proud of her Egyptian heritage, and she loves sharing it with her friends. When she taught Layla the word 'Yalla,' a whole new song was born! Zayna shows us that our differences are something to celebrate.</p>
                                    <div className="character-meta">
                                        <div className="meta-item">
                                            <span className="meta-label">Favorite Song:</span>
                                            <span className="meta-value">"'Yalla!' Means 'Let's Go!'"</span>
                                        </div>
                                        <div className="meta-item">
                                            <span className="meta-label">Best Friend:</span>
                                            <span className="meta-value">Layla – creative soulmates</span>
                                        </div>
                                    </div>
                                    <button className="play-button" onClick={(e) => { e.stopPropagation(); window.location.hash = '#friendship'; }}>
                                        <span>🌍</span> Celebrating Friends
                                    </button>
                                </div>
                            </article>

                            {/* Ciara */}
                            <article className="character-card" ref={(el) => { characterCardsRef.current[7] = el; }} onClick={(e) => playSound(e, 'giggle', 'Ciara.mp3')}>
                                <div className="card-visual" style={{ background: 'linear-gradient(135deg, #FFE8E0 0%, #FF9B85 100%)' }}>
                                    <div className="character-avatar avatar-ciara">
                                        <img src="/images/Ciara.webp" alt="Ciara" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div className="sound-indicator">🔊</div>
                                </div>
                                <div className="card-content">
                                    <div className="character-role">The Spirited Friend</div>
                                    <h3 className="character-name">Ciara</h3>
                                    <p className="character-bio">If there's music playing, Ciara is dancing. This bubbly five-year-old brings Irish American charm and endless energy to every adventure with Theo and Kenji. She's the friend who will always get the dance party started!</p>
                                    <div className="character-meta">
                                        <div className="meta-item">
                                            <span className="meta-label">Favorite Song:</span>
                                            <span className="meta-value">Any song with a beat she can move to!</span>
                                        </div>
                                        <div className="meta-item">
                                            <span className="meta-label">Best Friends:</span>
                                            <span className="meta-value">Theo and Kenji – the adventure trio</span>
                                        </div>
                                    </div>
                                    <button className="play-button" onClick={(e) => { e.stopPropagation(); window.location.hash = '#dance'; }}>
                                        <span>🎵</span> Dance Party
                                    </button>
                                </div>
                            </article>

                            {/* Kenji */}
                            <article className="character-card" ref={(el) => { characterCardsRef.current[8] = el; }} onClick={(e) => playSound(e, 'wonder', 'Kenji.mp3')}>
                                <div className="card-visual" style={{ background: 'linear-gradient(135deg, #E0F0F8 0%, #B5D8EB 100%)' }}>
                                    <div className="character-avatar avatar-kenji">
                                        <img src="/images/Kenji.webp" alt="Kenji" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div className="sound-indicator">🔊</div>
                                </div>
                                <div className="card-content">
                                    <div className="character-role">The Thoughtful Explorer</div>
                                    <h3 className="character-name">Kenji</h3>
                                    <p className="character-bio">While Theo and Ciara are ready to run, Kenji is the one who stops to notice the little things – the pattern on a butterfly's wing, the way a seed grows, the sound of rain on leaves.</p>
                                    <div className="character-meta">
                                        <div className="meta-item">
                                            <span className="meta-label">Favorite Song:</span>
                                            <span className="meta-value">"Counting the Animals"</span>
                                        </div>
                                        <div className="meta-item">
                                            <span className="meta-label">Best Friends:</span>
                                            <span className="meta-value">Theo and Ciara – he balances their energy</span>
                                        </div>
                                    </div>
                                    <button className="play-button" onClick={(e) => { e.stopPropagation(); window.location.hash = '#nature'; }}>
                                        <span>🔍</span> Nature Explorers
                                    </button>
                                </div>
                            </article>

                            {/* Amara */}
                            <article className="character-card" ref={(el) => { characterCardsRef.current[9] = el; }} onClick={(e) => playSound(e, 'babygiggle', 'Amara.mp3')}>
                                <div className="card-visual" style={{ background: 'linear-gradient(135deg, #FFF0E8 0%, #FFE5B4 100%)' }}>
                                    <div className="character-avatar avatar-amara">
                                        <img src="/images/Amara.webp" alt="Amara" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div className="sound-indicator">🔊</div>
                                </div>
                                <div className="card-content">
                                    <div className="character-role">The First Friend</div>
                                    <h3 className="character-name">Amara</h3>
                                    <p className="character-bio">Amara and Max understand each other in that special way that babies do. They're learning the earliest lessons of friendship: how to sit side by side, how to share a toy, and how a giggle is even better when there's someone to share it with.</p>
                                    <div className="character-meta">
                                        <div className="meta-item">
                                            <span className="meta-label">Favorite Song:</span>
                                            <span className="meta-value">"The Sharing Song"</span>
                                        </div>
                                        <div className="meta-item">
                                            <span className="meta-label">Best Friend:</span>
                                            <span className="meta-value">Max – they're learning together</span>
                                        </div>
                                    </div>
                                    <button className="play-button" onClick={(e) => { e.stopPropagation(); window.location.hash = '#baby'; }}>
                                        <span>👶</span> Baby Friends
                                    </button>
                                </div>
                            </article>
                        </div>
                    </section>

                    {/* The Pets */}
                    <section className="blooms-section tier-3-section">
                        <div className="section-header">
                            <span className="section-tag">The Pets</span>
                            <h2>Our Furry & Feathered Friends</h2>
                        </div>

                        <div className="tier-3">
                            {/* Doby */}
                            <article className="character-card" ref={(el) => { characterCardsRef.current[10] = el; }} onClick={(e) => playSound(e, 'woof', 'Doby.mp3')}>
                                <div className="card-visual" style={{ background: 'linear-gradient(135deg, #F5E6D3 0%, #D4A373 100%)', height: '180px' }}>
                                    <div className="character-avatar avatar-doby" style={{ width: '120px', height: '120px' }}>
                                        <img src="/images/Doby.webp" alt="Doby" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div className="sound-indicator">🔊</div>
                                </div>
                                <div className="card-content" style={{ padding: '1rem 1.5rem 1.5rem' }}>
                                    <div className="character-role" style={{ fontSize: '0.75rem' }}>The Loyal Goof</div>
                                    <h3 className="character-name" style={{ fontSize: '1.4rem' }}>Doby</h3>
                                    <p className="character-bio" style={{ fontSize: '0.9rem' }}>Doby is convinced he's a lap dog. He's always ready for a game of fetch or to rest his head on someone's feet during story time.</p>
                                    <div className="character-meta" style={{ fontSize: '0.85rem' }}>
                                        <div className="meta-item">
                                            <span className="meta-label">Favorite:</span>
                                            <span className="meta-value">Playing chase with Theo</span>
                                        </div>
                                    </div>
                                </div>
                            </article>

                            {/* Mila */}
                            <article className="character-card" ref={(el) => { characterCardsRef.current[11] = el; }} onClick={(e) => playSound(e, 'meow', 'Mila.mp3')}>
                                <div className="card-visual" style={{ background: 'linear-gradient(135deg, #F0F0F0 0%, #D4D4D4 100%)', height: '180px' }}>
                                    <div className="character-avatar avatar-mila" style={{ width: '120px', height: '120px' }}>
                                        <img src="/images/Mila.webp" alt="Mila" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div className="sound-indicator">🔊</div>
                                </div>
                                <div className="card-content" style={{ padding: '1rem 1.5rem 1.5rem' }}>
                                    <div className="character-role" style={{ fontSize: '0.75rem' }}>The Graceful Observer</div>
                                    <h3 className="character-name" style={{ fontSize: '1.4rem' }}>Mila</h3>
                                    <p className="character-bio" style={{ fontSize: '0.9rem' }}>Mila prefers to watch the family chaos from a safe, high perch – preferably one with a sunbeam.</p>
                                    <div className="character-meta" style={{ fontSize: '0.85rem' }}>
                                        <div className="meta-item">
                                            <span className="meta-label">Favorite:</span>
                                            <span className="meta-value">Sunbeam naps</span>
                                        </div>
                                    </div>
                                </div>
                            </article>

                            {/* Coco */}
                            <article className="character-card" ref={(el) => { characterCardsRef.current[12] = el; }} onClick={(e) => playSound(e, 'chirp', 'Coco.mp3')}>
                                <div className="card-visual" style={{ background: 'linear-gradient(135deg, #FFF8E0 0%, #FFD93D 100%)', height: '180px' }}>
                                    <div className="character-avatar avatar-coco" style={{ width: '120px', height: '120px' }}>
                                        <img src="/images/Coco.webp" alt="Coco" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div className="sound-indicator">🔊</div>
                                </div>
                                <div className="card-content" style={{ padding: '1rem 1.5rem 1.5rem' }}>
                                    <div className="character-role" style={{ fontSize: '0.75rem' }}>The Cheerful Mimic</div>
                                    <h3 className="character-name" style={{ fontSize: '1.4rem' }}>Coco</h3>
                                    <p className="character-bio" style={{ fontSize: '0.9rem' }}>Coco doesn't just sing – she joins the conversation. She loves to mimic sounds, making her perfect for phonetic learning songs.</p>
                                    <div className="character-meta" style={{ fontSize: '0.85rem' }}>
                                        <div className="meta-item">
                                            <span className="meta-label">Favorite Song:</span>
                                            <span className="meta-value">"Old MacDonald Had a Farm"</span>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </section>

                    {/* Interactive Quiz Section */}
                    <section className="quiz-section">
                        <h2>Which Bloom Are You?</h2>
                        <p style={{ fontSize: '1.1rem', marginTop: '1rem', opacity: 0.9 }}>Take our fun quiz to find out which character matches your personality! Perfect for parents and kids to enjoy together.</p>
                        <button className="quiz-button" onClick={startQuiz}>Start the Quiz ✨</button>
                    </section>

                    {/* Coloring Pages Download */}
                    <section className="download-section">
                        <h3 style={{ marginBottom: '0.5rem' }}>🎨 Free Coloring Pages</h3>
                        <p style={{ color: 'var(--text-light)', marginBottom: '1rem' }}>Download line art of each character and the whole family. Perfect for little artists!</p>
                        <form className="email-form" onSubmit={handleDownload}>
                            <input type="email" className="email-input" placeholder="Enter your email for coloring pages..." required />
                            <button type="submit" className="submit-btn">Get Free Pages</button>
                        </form>
                    </section>
                </main>

                {/* Mini Player */}
                <div className="mini-player">
                    <div className="player-info">
                        <span className="player-title">Now Playing</span>
                        <span className={`player-subtitle ${isPlaying ? 'listening' : ''}`}>
                            {tracks[currentTrackIndex]}
                        </span>
                    </div>
                    <div className="player-controls">
                        <button className="control-btn" onClick={previousTrack}>⏮</button>
                        <button className="control-btn" onClick={togglePlay} id="playBtn">
                            {isPlaying ? '⏸' : '▶'}
                        </button>
                        <button className="control-btn" onClick={nextTrack}>⏭</button>
                    </div>
                </div>

                {/* Floating CTA */}
                <button className="floating-cta" onClick={subscribe}>
                    🔔 Subscribe for New Songs Every Friday
                </button>

                {/* The meet the blooms container needs styling adjustments here since navigation overlaps or footer overlaps. The layout assumes footer is inside or outside? The user put footer inside the page in original html. Let's place it outside for the React structure, but give space. */}
            </div>

            <BloomQuizWizard
                isOpen={isQuizOpen}
                onClose={() => setIsQuizOpen(false)}
            />

            <Footer />
        </>
    );
}
