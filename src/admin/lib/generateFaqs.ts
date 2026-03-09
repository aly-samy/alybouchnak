import type { FAQ } from '../../data/faqs';

const FAQ_INTERFACE = `export interface FAQ {
  id: number;
  category: 'About Aly Bouchnak' | 'Music & Parenting' | 'The Bloom\\'s House' | 'General';
  question: string;
  answer: string;
}`;

const FAQ_FUNCTIONS = `
export function getFaqById(id: number): FAQ | undefined {
  return faqs.find(faq => faq.id === id);
}

export function getAllFaqs(): FAQ[] {
  return faqs;
}
`;

export function generateFaqsFile(faqs: FAQ[]): string {
    const dataString = JSON.stringify(faqs, null, 2);
    return `${FAQ_INTERFACE}\n\nexport const faqs: FAQ[] = ${dataString};\n${FAQ_FUNCTIONS}`;
}
