import Admin1 from '../../assets/works/Admin1.png';
import QIANets5 from '../../assets/works/QIANets5.jpg';
import Medvice1 from '../../assets/works/Medvice1.jpg';
import QIANets3 from '../../assets/works/QIANets3.jpg';

export interface JournalEntry {
  title: string;
  image: string;
  readTime: string;
  date: string;
}

export const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    title: 'Building Discern Match: Inside the Monorepo',
    image: Admin1,
    readTime: '6 min read',
    date: 'Jul 3, 2026',
  },
  {
    title: 'Quantum-Inspired Compression: What NeurIPS Taught Me',
    image: QIANets5,
    readTime: '5 min read',
    date: 'Jan 7, 2025',
  },
  {
    title: 'Building Medvice: A Symptom-Checker API in Flask',
    image: Medvice1,
    readTime: '4 min read',
    date: 'Oct 22, 2024',
  },
  {
    title: 'Training a CNN on CIFAR-10, End to End',
    image: QIANets3,
    readTime: '3 min read',
    date: 'Sep 25, 2024',
  },
];
