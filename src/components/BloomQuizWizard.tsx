import { useState } from 'react';
import { X, ChevronRight, Share2 } from 'lucide-react';

interface BloomQuizWizardProps {
    isOpen: boolean;
    onClose: () => void;
}

type Step = 'intro' | 'q1' | 'q2' | 'q3' | 'result';
type AgeGroup = '1-4' | '5-11' | '12+' | 'parent';
type Gender = 'boy' | 'girl' | 'prefer-not';
type Answer = 'A' | 'B' | 'C' | 'D';

interface UserData {
    name: string;
    age: AgeGroup | '';
    gender: Gender | '';
    answers: {
        q1: Answer | '';
        q2: Answer | '';
        q3: Answer | '';
    };
}

export default function BloomQuizWizard({ isOpen, onClose }: BloomQuizWizardProps) {
    const [step, setStep] = useState<Step>('intro');
    const [userData, setUserData] = useState<UserData>({
        name: '',
        age: '',
        gender: '',
        answers: { q1: '', q2: '', q3: '' }
    });

    if (!isOpen) return null;

    const handleNext = (nextStep: Step) => {
        setStep(nextStep);
    };

    const getResult = () => {
        const { age, gender } = userData;
        const aCount = Object.values(userData.answers).filter(v => v === 'A').length;
        const bCount = Object.values(userData.answers).filter(v => v === 'B').length;
        const cCount = Object.values(userData.answers).filter(v => v === 'C').length;
        const dCount = Object.values(userData.answers).filter(v => v === 'D').length;

        // The Guides (Parents/Caregivers)
        if (age === 'parent' || dCount >= 2) {
            return {
                id: 'guides',
                name: 'Mama Mia or Papa Leo',
                title: 'The Nurturing Guide',
                headline: 'I am a Trusted Guide!',
                personality: 'Like Mama Mia and Papa Leo, you provide the steady, nurturing presence that makes the Bloom\'s house feel cozy and safe.',
                tip: '"Safety First: Create a cozy corner today with some pillows and books where your little ones can retreat to when they feel overwhelmed."',
                colors: 'bg-gradient-to-br from-[#B5D8EB] to-[#C5D5C0]', // Soft Blue & Sage
                image: '/images/parents-bloom.webp' // Fallback image if specific one doesnt exist yet
            };
        }

        // The Explorers (Ages 1-4)
        if (age === '1-4') {
            if (gender === 'girl') {
                return {
                    id: 'amara',
                    name: 'Amara',
                    title: 'The First Friend',
                    headline: 'I am a Joyful Friend!',
                    personality: 'Like Amara, you are sweet-natured, love to share, and your giggles fill the room with happiness.',
                    tip: '"Share the Joy: Try a simple turn-taking game today with a soft ball to practice sharing and connection."',
                    colors: 'bg-gradient-to-br from-[#F4C2C2] to-[#FFF8F0]', // Gentle Pink & Cream
                    image: '/images/amara-bloom.webp'
                };
            }
            return {
                id: 'max',
                name: 'Max',
                title: 'The Heart',
                headline: 'I am a Joyful Explorer!',
                personality: 'Like Max, you find magic in the little things and lead with your heart. You are curious, happy, and love discovering the world.',
                tip: '"Maximize the Wonder: Spend 5 minutes today just following your child’s lead. If they stop to look at a pebble, stop with them!"',
                colors: 'bg-gradient-to-br from-[#FFD166] to-[#8ECAE6]', // Sunflower Yellow & Sky Blue (approximated)
                image: '/images/max-bloom.webp'
            };
        }

        // The Adventurers (Ages 5-11)
        if (age === '5-11') {
            if (gender === 'girl') {
                return {
                    id: 'ciara',
                    name: 'Ciara',
                    title: 'The Spirited Friend',
                    headline: 'I am a Dancing Star!',
                    personality: 'Like Ciara, you are bubbly, love to sing, and bring energetic sunshine wherever you go.',
                    tip: '"Dance it Out: Put on your favorite upbeat song and have a 3-minute freeze dance party to shake out the sillies!"',
                    colors: 'bg-gradient-to-br from-[#FF9B85] to-[#F4C2C2]', // Warm Coral & Gentle Pink
                    image: '/images/ciara-bloom.webp'
                };
            }
            if (bCount >= cCount && bCount >= aCount) {
                return {
                    id: 'theo',
                    name: 'Theo',
                    title: 'The Adventurer',
                    headline: 'I am a Brave Problem-Solver!',
                    personality: 'Like Theo, you are full of energy, imagination, and a "Try Again" spirit. You love leading songs about playing and building.',
                    tip: '"Energy into Action: Turn a chore into a \'Theo Quest.\' Can we find all the blue socks before the song ends?"',
                    colors: 'bg-gradient-to-br from-[#80B918] to-[#F48C06]', // Grass Green & Energetic Orange (approximated)
                    image: '/images/theo-bloom.webp'
                };
            }
            return {
                id: 'kenji',
                name: 'Kenji',
                title: 'The Discoverer',
                headline: 'I am a Thoughtful Learner!',
                personality: 'Like Kenji, you are an inquisitive explorer who loves learning how things work and appreciates the beauty of nature.',
                tip: '"The \'Why\' Game: Encourage Kenji’s curiosity today by asking \'Why do you think the clouds move?\' instead of giving the answer."',
                colors: 'bg-gradient-to-br from-[#2A9D8F] to-[#E9C46A]', // Teal & Earthy Brown (approximated)
                image: '/images/kenji-bloom.webp'
            };
        }

        // The Mentors (Ages 12+)
        if (cCount >= aCount && cCount >= bCount) {
            return {
                id: 'layla',
                name: 'Layla',
                title: 'The Mentor',
                headline: 'I am a Creative Helper!',
                personality: 'Like Layla, you are empathetic, artistic, and a great friend to everyone. You are a bridge between big feelings and social skills.',
                tip: '"Label the Feeling: When things get tough, try Layla’s trick: \'I see you’re feeling [emotion]. It’s okay to feel that way.\'"',
                colors: 'bg-gradient-to-br from-[#CDB4DB] to-[#FFC8DD]', // Soft Lavender & Rose Pink
                image: '/images/layla-bloom.webp'
            };
        }

        return {
            id: 'zayna',
            name: 'Zayna',
            title: 'The Cultural Bridge',
            headline: 'I am a Proud Creator!',
            personality: 'Like Zayna, you are confident, artistic, and proud of your heritage. You bring unique beautiful perspectives to the group.',
            tip: '"Story Time: Share a story or a recipe from your family\'s heritage today and talk about why it is special."',
            colors: 'bg-gradient-to-br from-[#E07A5F] to-[#F4F1DE]', // Warm terracotta & Cream
            image: '/images/zayna-bloom.webp'
        };
    };

    const handleCopyLink = () => {
        const text = `Finding our Bloom! 🌻 ${userData.name || 'I'} just took the quiz at https://alybouchnak.com. #TheBloomsHouse #BalancedStimulation #ParentingJoy`;
        navigator.clipboard.writeText(text);
        alert('Caption copied to clipboard! Ready to paste on Instagram.');
    };

    const renderIntro = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-2">
                <h2 className="font-['Fredoka_One'] text-3xl md:text-4xl text-[#101010]">🌻 Which Bloom Are You? 🌻</h2>
                <p className="text-[#2A2A2A] text-lg">Welcome to the House! Let's find out who you'd be in our world.</p>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-[#101010] mb-1">What is your name?</label>
                    <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border-2 border-transparent bg-[#FFF8F0] focus:border-[#F26B3A] focus:outline-none transition-colors"
                        placeholder="Enter your name"
                        value={userData.name}
                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-[#101010] mb-1">How old are you?</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {(['1-4', '5-11', '12+', 'parent'] as const).map((age) => (
                            <button
                                key={age}
                                className={`py-3 px-2 rounded-xl border-2 font-semibold transition-all ${userData.age === age
                                    ? 'border-[#F26B3A] bg-[#F26B3A] text-white shadow-md scale-[1.02]'
                                    : 'border-transparent bg-[#FFF8F0] text-[#2A2A2A] hover:bg-[#FFE5D9]'
                                    }`}
                                onClick={() => setUserData({ ...userData, age })}
                            >
                                {age === 'parent' ? 'Parent/Caregiver' : `${age} years`}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-[#101010] mb-1">What is your gender?</label>
                    <div className="grid grid-cols-3 gap-2">
                        {(['boy', 'girl', 'prefer-not'] as const).map((gender) => (
                            <button
                                key={gender}
                                className={`py-3 px-2 rounded-xl border-2 font-semibold transition-all ${userData.gender === gender
                                    ? 'border-[#F26B3A] bg-[#F26B3A] text-white shadow-md scale-[1.02]'
                                    : 'border-transparent bg-[#FFF8F0] text-[#2A2A2A] hover:bg-[#FFE5D9]'
                                    }`}
                                onClick={() => setUserData({ ...userData, gender })}
                            >
                                {gender === 'prefer-not' ? 'Prefer not to say' : gender.charAt(0).toUpperCase() + gender.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <button
                disabled={!userData.name || !userData.age || !userData.gender}
                onClick={() => handleNext('q1')}
                className="w-full inline-flex items-center justify-center px-6 py-3 bg-[#F26B3A] text-white font-bold rounded-full disabled:opacity-50 disabled:cursor-not-allowed mt-8 hover:bg-[#E05A2A] transition-all"
            >
                Let's Go! <ChevronRight className="ml-2 w-5 h-5" />
            </button>
        </div>
    );

    const renderQuestion = (
        stepNum: 'q1' | 'q2' | 'q3',
        question: string,
        options: { id: Answer; text: string }[],
        nextStep: Step
    ) => (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="text-center mb-8">
                <span className="inline-block px-3 py-1 bg-[#F4C2C2] text-[#101010] font-bold rounded-full text-sm mb-4">
                    Question {stepNum.replace('q', '')} of 3
                </span>
                <h2 className="font-['Fredoka_One'] text-2xl md:text-3xl text-[#101010]">{question}</h2>
            </div>

            <div className="space-y-3">
                {options.map((opt) => (
                    <button
                        key={opt.id}
                        onClick={() => {
                            setUserData({ ...userData, answers: { ...userData.answers, [stepNum]: opt.id } });
                            setTimeout(() => handleNext(nextStep), 300);
                        }}
                        className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 group flex items-center ${userData.answers[stepNum] === opt.id
                            ? 'border-[#F26B3A] bg-[#FFE5D9] shadow-md scale-[1.01]'
                            : 'border-transparent bg-[#FFF8F0] hover:bg-[#F26B3A]/10 hover:border-[#F26B3A]/30 hover:scale-[1.01]'
                            }`}
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 transition-colors ${userData.answers[stepNum] === opt.id ? 'bg-[#F26B3A] text-white' : 'bg-white text-[#F26B3A]'
                            }`}>
                            {opt.id}
                        </div>
                        <span className="text-[#2A2A2A] font-semibold flex-1">{opt.text}</span>
                    </button>
                ))}
            </div>
        </div>
    );

    const renderResult = () => {
        const result = getResult();

        return (
            <div className="animate-in zoom-in-95 duration-500 flex flex-col items-center">
                <h2 className="font-['Fredoka_One'] text-2xl md:text-3xl text-center text-[#101010] mb-2">
                    It's Official! ✨
                </h2>
                <p className="text-lg text-center text-[#2A2A2A] mb-8">
                    <span className="font-bold">{userData.name}</span>, you are just like <span className="font-bold text-[#F26B3A]">{result.name}</span>!
                </p>

                {/* Trading Card Container */}
                <div className={`relative w-full max-w-[400px] aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl ${result.colors} p-6 flex flex-col transform transition-transform hover:scale-[1.02]`}>

                    {/* Header */}
                    <div className="text-center mb-6">
                        <h3 className="font-['Fredoka_One'] text-xl text-white drop-shadow-md tracking-wider uppercase">
                            The Bloom's House
                        </h3>
                    </div>

                    {/* Character Image Area */}
                    <div className="flex-1 relative mb-6">
                        <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
                        {/* Fallback avatar if no image exists yet */}
                        <div className="w-full h-full min-h-[250px] flex items-center justify-center relative z-10">
                            <div className="w-48 h-48 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm shadow-inner border-4 border-white/40">
                                <span className="font-['Fredoka_One'] text-6xl text-white/80">{result.name.charAt(0)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Overlay Text */}
                    <div className="text-center mb-6 relative z-10">
                        <h2 className="font-['Fredoka_One'] text-3xl text-white drop-shadow-lg leading-tight">
                            {result.headline}
                        </h2>
                    </div>

                    {/* Info Box */}
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-xl relative z-10 border border-white/50">
                        <div className="mb-4">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#F26B3A] block mb-1">Personality Spotlight</span>
                            <p className="text-sm text-[#2A2A2A] leading-relaxed">
                                {result.personality}
                            </p>
                        </div>
                        <div className="bg-[#FFF8F0] rounded-xl p-3 border border-[#F26B3A]/20">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#80B918] block mb-1">Bloom Tip</span>
                            <p className="text-xs text-[#2A2A2A] italic">
                                {result.tip}
                            </p>
                        </div>
                    </div>

                    {/* Footer Ribbon */}
                    <div className="text-center mt-4">
                        <p className="text-xs text-white/80 font-medium tracking-widest uppercase">Limited Edition</p>
                    </div>
                </div>

                {/* Easter Egg */}
                <p className="mt-8 text-sm text-center text-[#2A2A2A] max-w-sm italic">
                    P.S. {userData.name}, have you heard our new song <a href="/track/pet-pop-animal-song" className="text-[#F26B3A] font-bold underline">Pet-Pop</a> yet? It's perfect for little adventurers like you!
                    <br /><br />
                    <span className="font-[cursive] text-lg opacity-70">With Love,<br />Aly Bouchnak</span>
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-[400px]">
                    <button onClick={handleCopyLink} className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-[#101010] text-white font-bold rounded-full hover:bg-[#2A2A2A] transition-colors">
                        <Share2 className="w-4 h-4 mr-2" /> Share to Story
                    </button>
                    <button onClick={onClose} className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-white text-[#101010] border-2 border-gray-200 font-bold rounded-full hover:bg-gray-50 transition-colors">
                        Done
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh]">
                {/* Progress Bar */}
                {step !== 'result' && (
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-100 rounded-t-3xl overflow-hidden">
                        <div
                            className="h-full bg-[#F26B3A] transition-all duration-500 ease-out"
                            style={{
                                width: step === 'intro' ? '25%' :
                                    step === 'q1' ? '50%' :
                                        step === 'q2' ? '75%' : '100%'
                            }}
                        />
                    </div>
                )}

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-[#101010] hover:bg-gray-100 rounded-full transition-colors z-10"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="p-6 sm:p-10 pt-12">
                    {step === 'intro' && renderIntro()}

                    {step === 'q1' && renderQuestion('q1', 'What are you picking first?', [
                        { id: 'A', text: 'Something soft that makes a funny crinkle sound!' },
                        { id: 'B', text: 'My favorite building blocks or a ball to kick outside!' },
                        { id: 'C', text: 'My sketchbook, a guitar, or a cool new craft kit.' },
                        { id: 'D', text: 'A big storybook to read to everyone on the sofa.' }
                    ], 'q2')}

                    {step === 'q2' && renderQuestion('q2', 'Where should we go on our adventure?', [
                        { id: 'A', text: 'Just to the garden to watch a butterfly land on a flower.' },
                        { id: 'B', text: 'To the playground to see how high I can climb!' },
                        { id: 'C', text: 'To a museum or a festival to learn about somewhere new.' },
                        { id: 'D', text: 'To the kitchen to bake something special for a neighbor.' }
                    ], 'q3')}

                    {step === 'q3' && renderQuestion('q3', 'How do you help a friend with "big feelings"?', [
                        { id: 'A', text: 'I give them my favorite toy to hold and a big gummy smile.' },
                        { id: 'B', text: 'I tell them a funny joke or invite them to run a race with me!' },
                        { id: 'C', text: 'I listen to their story and help them find the right words.' },
                        { id: 'D', text: 'I offer a warm hug and stay close until they feel safe.' }
                    ], 'result')}

                    {step === 'result' && renderResult()}
                </div>
            </div>
        </div>
    );
}
