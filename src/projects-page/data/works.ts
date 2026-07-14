import Website1 from '../../assets/works/Website1.png';
import QIANets1 from '../../assets/works/QIANets1.jpg';
import Medvice2 from '../../assets/works/Medvice2.jpg';
import QIANets4 from '../../assets/works/QIANets4.jpg';

export interface Work {
  title: string;
  image: string;
  span: string;
  aspect: string;
}

export const WORKS: Work[] = [
  {
    title: 'Discern Match',
    image: Website1,
    span: 'md:col-span-7',
    aspect: 'aspect-[16/10]',
  },
  {
    title: 'QIANets',
    image: QIANets1,
    span: 'md:col-span-5',
    aspect: 'aspect-[4/5]',
  },
  {
    title: 'Medvice',
    image: Medvice2,
    span: 'md:col-span-7',
    aspect: 'aspect-[16/10]',
  },
  {
    title: 'Quantum Compression',
    image: QIANets4,
    span: 'md:col-span-5',
    aspect: 'aspect-[4/5]',
  },
];
