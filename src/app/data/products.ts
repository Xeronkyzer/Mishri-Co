export type Variant = { label: string; weight: string; price?: number; was?: number };

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: 'ghee' | 'oil' | 'honey' | 'makhana';
  categoryLabel: string;
  tag: string;
  tagline: string;
  description: string;
  image: string;
  variants: Variant[];
  rating: number;
  reviews: number;
  badge?: string;
  usps: string[];
  story: string;
};

export const products: Product[] = [
  {
    id: 'p1',
    slug: 'a2-bilona-ghee',
    name: 'A2 Bilona Ghee',
    category: 'ghee',
    categoryLabel: 'Ghee Range',
    tag: 'BILONA CHURNED',
    tagline: 'Cultured from pure A2 milk and hand-churned before dawn.',
    description: 'Our signature A2 Ghee is made using the traditional Bilona method. A2 milk from native cow breeds is cultured to curd, hand-churned in clay pots, and slow-boiled over charcoal to produce rich, granular, aromatic ghee.',
    image: '',
    variants: [{ label: '500ml', weight: '500ml' }, { label: '1L', weight: '1L' }],
    rating: 4.9,
    reviews: 320,
    usps: ['A2 Desi Cow Milk only', 'Traditional wood Bilona', 'Slow charcoal flame cooked', 'No artificial colors or preservatives'],
    story: 'Twelve liters of pure milk are churned to produce just one jar of this liquid gold.'
  },
  {
    id: 'p2',
    slug: 'kachi-ghani-sarso',
    name: 'Kachi Ghani Sarso',
    category: 'oil',
    categoryLabel: 'Cold Pressed Oils',
    tag: 'COLD PRESSED',
    tagline: 'Cold-pressed mustard oil, preserving pungent aroma and nutrients.',
    description: 'Extracted slowly in wooden pressers (Kachi Ghani) at low temperatures to retain its natural pungent aroma, deep color, and essential fatty acids. Perfect for traditional cooking and pickling.',
    image: '',
    variants: [{ label: '1L', weight: '1L' }],
    rating: 4.8,
    reviews: 180,
    usps: ['100% pure mustard seed oil', 'Cold-pressed in wooden mills', 'Zero chemicals or mineral oil', 'Naturally high pungency'],
    story: 'Cold-pressed at low temperatures to ensure all native enzymes and aroma stay intact.'
  },
  {
    id: 'p3',
    slug: 'forest-raw-honey',
    name: 'Forest Raw Honey',
    category: 'honey',
    categoryLabel: 'Raw Honey Range',
    tag: '100% NATURAL',
    tagline: 'Unfiltered nectar sourced straight from wild forest hives.',
    description: 'Sourced directly from native honeycombs in deep deciduous forests. Wild, unfiltered, raw honey that tastes like the forest itself. Rich in natural pollens and antioxidants.',
    image: '',
    variants: [{ label: '250g', weight: '250g' }, { label: '500g', weight: '500g' }],
    rating: 4.9,
    reviews: 245,
    usps: ['Raw and unfiltered honey', 'Sourced from wild forest hives', 'Zero added sugars or syrup', 'Naturally high in pollen'],
    story: 'Harvested ethically in seasons when the forest wild flowers are at their peak.'
  },
  {
    id: 'p4',
    slug: 'fresh-makhana',
    name: 'Fresh Makhana',
    category: 'makhana',
    categoryLabel: 'Premium Superfoods',
    tag: 'HAND ROASTED',
    tagline: 'Crispy, hand-roasted lotus seeds packed with protein and antioxidants.',
    description: 'Premium phool makhana (fox nuts) gently roasted to perfection. A light, wholesome, and crunchy snack that serves as an excellent source of calcium and protein. Perfect for anytime munching.',
    image: '',
    variants: [{ label: '250g', weight: '250g' }, { label: '500g', weight: '500g' }],
    rating: 4.9,
    reviews: 190,
    usps: ['100% natural lotus seeds', 'Roasted to perfection', 'Rich in calcium & protein', 'No artificial flavors'],
    story: 'Sourced directly from native lotus ponds and hand-roasted in small batches to preserve their natural crunch and nutritional value.'
  }
];

export const processSteps = [
  { num: '01', title: 'Ethical Grazing', body: 'Free-range native cows on natural pastures. Trusted farmers, no middlemen.' },
  { num: '02', title: 'Quality Testing', body: 'Every batch tested for purity, fat content, and antibiotic residue.' },
  { num: '03', title: 'Traditional Methods', body: 'Bilona-churned ghee, cold-pressed oils, and raw wild honey.' },
  { num: '04', title: 'Delivered Fresh', body: 'Freshly prepared batches shipped immediately to retain natural nutrients.' }
];
