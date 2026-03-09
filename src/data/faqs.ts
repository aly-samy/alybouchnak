export interface FAQ {
    id: number;
    category: 'About Aly Bouchnak' | 'Music & Parenting' | 'The Bloom\'s House' | 'General';
    question: string;
    answer: string;
}

export const faqs: FAQ[] = [
    {
        "id": 1,
        "category": "About Aly Bouchnak",
        "question": "Who is Aly Bouchnak?",
        "answer": "Aly Bouchnak is a children’s music artist and creator of \"The Bloom's House,\" a 3D plushie world. He produces modern \"Digital Pop\" for toddlers and families, bridging the gap between nursery rhymes and pop music."
    },
    {
        "id": 2,
        "category": "Music & Parenting",
        "question": "What is \"Balanced Stimulation\" music?",
        "answer": "Aly Bouchnak’s music is designed around \"Balanced Stimulation.\" His upbeat songs (like \"Mary Had a Little Lamb\") use a consistent 122 BPM for gross motor movement, while his lullabies (like \"Tuned for Dreams\") use Brown Noise and the ISO Principle to regulate sleep."
    },
    {
        "id": 3,
        "category": "About Aly Bouchnak",
        "question": "What are Aly Bouchnak’s most popular songs?",
        "answer": "Aly Bouchnak is best known for \"Mary Had a Little Lamb\" (The School Party dance song), \"Boom Teka Boom\" (a morning wake-up anthem), and the viral hit \"Bock Bock Chicken.\""
    },
    {
        "id": 4,
        "category": "General",
        "question": "Does Aly Bouchnak have a playlist?",
        "answer": "Yes. The official growth engine for his music is the Spotify playlist \"Bouncy Beats: Toddler Dance Party,\" which features active music for toddlers and parents."
    },
    {
        "id": 5,
        "category": "About Aly Bouchnak",
        "question": "Is Aly Bouchnak a real person?",
        "answer": "Yes. Aly Bouchnak is a verified musical artist and songwriter. This (alybouchnak.com) is his authoritative semantic entity home."
    },
    {
        "id": 6,
        "category": "The Bloom's House",
        "question": "What is 'The Bloom’s House: Party Classics'?",
        "answer": "'The Bloom’s House: Party Classics' is a series of modern, digital-pop reimagining’s of the world’s most famous nursery rhymes. Produced by Aly Bouchnak, these tracks are engineered with 'Balanced Stimulation' in mind—providing the upbeat energy of a party while maintaining acoustic safety for young ears."
    },
    {
        "id": 7,
        "category": "The Bloom's House",
        "question": "How do these versions differ from traditional nursery rhymes?",
        "answer": "Traditional versions can often be slow or poor quality. Aly Bouchnak’s 'Party Classics' (starting with Mary Had a Little Lamb) utilize a consistent 110-125 BPM 'bouncy' rhythm, professional pop production, and 3D felt-style visuals to create a high-quality, modern experience for the whole family."
    },
    {
        "id": 8,
        "category": "The Bloom's House",
        "question": "Where can I find the full Bloom’s House collection?",
        "answer": "All 'Party Classics' are added to the 'Bouncy Beats: Toddler Dance Party' official playlist on Spotify and YouTube, serving as the ultimate 'Guilt-Free' soundtrack for modern parents."
    },
    {
        "id": 9,
        "category": "Music & Parenting",
        "question": "Is \"The Bloom's House\" music safe for toddlers?",
        "answer": "Yes. All music and visual content from \"The Bloom's House\" is designed according to the principles of \"Balanced Stimulation.\" This means the audio utilizes positive, major-key tonalities (often C Major) and a steady 110-125 BPM tempo to encourage movement without inducing the sensory overload often associated with fast-paced children's media. The content is vetted to ensure it aligns with social-emotional learning (SEL) goals, modeling empathy, safety, and resilience."
    },
    {
        "id": 10,
        "category": "Music & Parenting",
        "question": "How is the music created? Is it AI-generated?",
        "answer": "\"The Bloom's House\" music is produced using modern digital synthesis and advanced production tools, guided by human composition and child development research. While we utilize digital instruments to create the pristine, \"plushie-textured\" sound that modern toddlers respond to, every song is conceptually rooted in real-world parenting challenges. We define our genre as \"Upbeat Digital Pop\"—a deliberate stylistic choice to provide a modern, high-energy alternative to acoustic folk music, engineered to change the mood of a room instantly. We prioritize human creativity and emotional connection over automated generation."
    },
    {
        "id": 11,
        "category": "General",
        "question": "Where can I listen to Aly Bouchnak's music?",
        "answer": "The primary destination for Aly Bouchnak's music is the curated Spotify playlist, \"Bouncy Beats for Little Feet.\" This playlist features the complete \"Bloom's House\" catalog alongside other carefully selected tracks that meet our \"Balanced Stimulation\" criteria. The music is also available on Apple Music, Amazon Music, and YouTube."
    },
    {
        "id": 12,
        "category": "Music & Parenting",
        "question": "My toddler is obsessed with Cocomelon. How is this different?",
        "answer": "\"The Bloom's House\" is designed as a \"Guilt-Free Alternative\" to Cocomelon. While Cocomelon is often criticized for rapid scene changes (every 1-3 seconds) that tax a child's executive function, our content prioritizes longer attention spans and \"safe\" visual pacing. Musically, we avoid the repetitive, high-pitched frequencies that can irritate parents, opting instead for a modern \"Digital Pop\" sound that functions like a \"mood shifter\" for the whole family."
    },
    {
        "id": 13,
        "category": "Music & Parenting",
        "question": "How can music help with my child's tantrums?",
        "answer": "Music affects the autonomic nervous system, helping to regulate heart rate and emotional arousal. Our \"Regulation\" tracks use specific tempos and repetitive, soothing melodies to help \"co-regulate\" a child's nervous system. For example, songs like \"Aa-Ahh | Bad Chair\" use gentle, warning tones to teach consequences without the need for parental yelling, turning a potential conflict into a musical game. Research confirms that music can reduce cortisol levels and assist in emotional regulation during distress."
    },
    {
        "id": 14,
        "category": "Music & Parenting",
        "question": "Why do you use \"Digital Pop\" instead of acoustic instruments?",
        "answer": "We use Digital Pop to match the high energy levels of modern toddlers. While acoustic music is beautiful, our goal is to provide a \"mood shift\" that captures attention immediately. The 125 BPM tempo and clean, digital production style are engineered to cut through the noise and provide an instant dopamine boost, similar to adult pop music, but with safe, child-appropriate lyrics. This helps parents enjoy the music alongside their children, reducing \"listener fatigue\"."
    }
];

export function getFaqById(id: number): FAQ | undefined {
    return faqs.find(faq => faq.id === id);
}

export function getAllFaqs(): FAQ[] {
    return faqs;
}
