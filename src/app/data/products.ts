export type Variant = { label: string; weight: string; price: number; was?: number };

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: 'dahi' | 'ghee' | 'icecream';
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
    slug: 'fresh-set-dahi',
    name: 'Fresh Set Dahi',
    category: 'dahi',
    categoryLabel: 'Dahi Range',
    tag: 'PROBIOTIC CULTURE',
    tagline: 'Morning-fresh, every day',
    description: 'Hand-set in clay matkas with our heirloom culture. Thick, mildly tart, with the unmistakable cool weight of real dahi.',
    image: 'https://images.unsplash.com/photo-1655740261900-08d04a0b85f9?w=1080&q=80',
    variants: [
      { label: '200g', weight: '200g', price: 45 },
      { label: '400g', weight: '400g', price: 65, was: 75 },
      { label: '1kg',  weight: '1kg',  price: 145 },
    ],
    rating: 4.8, reviews: 1240,
    usps: ['Heirloom probiotic culture', 'Set in unglazed terracotta', 'No thickeners, no stabilisers', 'Cold-chain delivered'],
    story: 'Cultured overnight in matkas hand-thrown by potters in Bhagwanpur, just outside Hajipur. The clay wicks whey slowly, giving Mishri dahi its signature standing thickness.',
  },
  {
    id: 'p2',
    slug: 'bilona-desi-ghee',
    name: 'Desi Cow Ghee — Bilona',
    category: 'ghee',
    categoryLabel: 'Ghee Range',
    tag: 'BILONA METHOD',
    tagline: 'Slow-churned. Golden. Pure.',
    description: 'A2 Sahiwal & Bachaur cow milk, cultured to curd, hand-churned with a wooden bilona, then simmered on slow flame until the ghee parts golden and clean.',
    image: 'https://images.unsplash.com/photo-1573812461383-e5f8b759d12e?w=1080&q=80',
    variants: [
      { label: '250ml', weight: '250ml', price: 340 },
      { label: '500ml', weight: '500ml', price: 620, was: 720 },
      { label: '1L',    weight: '1L',    price: 1180 },
    ],
    rating: 4.9, reviews: 3402,
    badge: 'BEST SELLER',
    usps: ['A2 Sahiwal & Bachaur milk only', 'Traditional bilona — not centrifuge', 'No preservatives, no colour', 'FSSAI · ISO 9001:2015'],
    story: 'Twelve litres of milk for every one litre of ghee. The bilona is the difference — slow rotation breaks the butter molecules cleanly, leaving an aroma you cannot fake.',
  },
  {
    id: 'p3',
    slug: 'kesar-pista-kulfi',
    name: 'Kesar Pista Kulfi',
    category: 'icecream',
    categoryLabel: 'Ice Cream Range',
    tag: 'SUMMER SPECIAL',
    tagline: 'Saffron, pistachio, slow reduced milk',
    description: 'Milk reduced for four hours over coal, infused with Kashmiri kesar threads and slivers of pista. Set in kulhads thrown locally in Vaishali.',
    image: 'https://images.unsplash.com/photo-1635700982428-c3698d2a3a80?w=1080&q=80',
    variants: [
      { label: '4 × kulhad', weight: '4 pcs', price: 280 },
      { label: '6 × kulhad', weight: '6 pcs', price: 410 },
      { label: 'Family tub 750ml', weight: '750ml', price: 520 },
    ],
    rating: 4.9, reviews: 892,
    badge: 'NEW',
    usps: ['Kashmiri Mongra saffron', 'Iranian pista, hand-slivered', 'No artificial flavours, no colour', 'Reduced milk base — no cream'],
    story: 'We don’t make ice cream. We make kulfi — denser, slower, made the way every Patna street thela still makes it after midnight.',
  },
  {
    id: 'p4',
    slug: 'greek-strained-dahi',
    name: 'Hung Greek-Style Dahi',
    category: 'dahi',
    categoryLabel: 'Dahi Range',
    tag: 'HIGH PROTEIN',
    tagline: 'Strained 8 hours. 11g protein per 100g.',
    description: 'Our fresh dahi, slow-strained in muslin overnight. Thick enough to hold a spoon upright.',
    image: 'https://images.unsplash.com/photo-1680764955303-81618ecb67b5?w=1080&q=80',
    variants: [
      { label: '180g', weight: '180g', price: 95 },
      { label: '400g', weight: '400g', price: 195 },
    ],
    rating: 4.7, reviews: 612,
    usps: ['11g protein per 100g', 'No added milk powder', 'Live cultures, slow strained', 'Perfect for raita & marinades'],
    story: 'No shortcuts. We strain whole batches in muslin overnight — no powdered protein, no thickeners, no “Greek-style” gimmicks.',
  },
  {
    id: 'p5',
    slug: 'cultured-white-butter',
    name: 'Cultured White Butter (Makhan)',
    category: 'ghee',
    categoryLabel: 'Ghee Range',
    tag: 'HAND CHURNED',
    tagline: 'The makhan before the ghee',
    description: 'The same hand-churned makhan we cook into ghee — now available unsalted, untouched, the way Krishna would have it.',
    image: 'https://images.unsplash.com/photo-1707424963059-6a7a559cae28?w=1080&q=80',
    variants: [
      { label: '200g', weight: '200g', price: 240 },
      { label: '400g', weight: '400g', price: 460 },
    ],
    rating: 4.8, reviews: 451,
    badge: 'LIMITED',
    usps: ['Hand-churned bilona makhan', 'Unsalted, uncoloured', 'Made-to-order weekly', 'Cold-chain under 4°C'],
    story: 'We only churn what we know we can deliver fresh that week. Orders close every Wednesday night.',
  },
  {
    id: 'p6',
    slug: 'malai-kulfi-bar',
    name: 'Original Malai Kulfi Bars',
    category: 'icecream',
    categoryLabel: 'Ice Cream Range',
    tag: 'CLASSIC',
    tagline: 'Just reduced milk. Just sugar. Nothing else.',
    description: 'Three ingredients, four hours of reduction. The cleanest kulfi you’ll ever taste.',
    image: 'https://images.unsplash.com/photo-1669200236241-7c365035612a?w=1080&q=80',
    variants: [
      { label: '6 bars', weight: '6 × 60ml', price: 240 },
      { label: '12 bars', weight: '12 × 60ml', price: 460 },
    ],
    rating: 4.9, reviews: 1320,
    usps: ['3 ingredients only', 'No emulsifiers, no stabilisers', 'Slow reduced over coal flame', 'Wrapped in compostable kraft'],
    story: 'Our founder’s nani made this every summer in Hajipur for the entire mohalla. The recipe hasn’t changed since 1972 — we just write it down now.',
  },
];

export const testimonials = [
  { name: 'Priya Sinha', city: 'Patna', quote: 'The dahi tastes exactly like my nani used to set in Hajipur in the 80s. I haven’t bought from anyone else since the launch.', avatar: 'https://images.unsplash.com/photo-1533128361669-69c065857a13?w=200&q=80' },
  { name: 'Rajesh Choudhary', city: 'Muzaffarpur', quote: 'I gave a jar of the bilona ghee to my mother. She called me asking where I found it. That is the only review that matters.', avatar: 'https://images.unsplash.com/photo-1625665965959-82a419ddf0d9?w=200&q=80' },
  { name: 'Kavita Jha', city: 'Darbhanga', quote: 'My toddler refuses store dahi now. He will only eat Mishri. We are stuck for life.', avatar: 'https://images.unsplash.com/photo-1463335361701-e90f4c5045d0?w=200&q=80' },
  { name: 'Dr. Anil Prasad', city: 'Hajipur', quote: 'Cold chain is real. The dahi arrives at 4°C, every single time. As a doctor, that is what convinced me.', avatar: 'https://images.unsplash.com/photo-1696371269777-88d1ce71642c?w=200&q=80' },
  { name: 'Deepa Ranjan', city: 'Bhagalpur', quote: 'The kesar kulfi made me cry. It tastes like my wedding in 1998. Thank you for keeping this alive.', avatar: 'https://images.unsplash.com/photo-1516239482977-b550ba7253f2?w=200&q=80' },
];

export const processSteps = [
  { num: '01', title: 'Ethical Grazing', body: 'Free-range Sahiwal & native Bachaur cows on Vaishali pasture along the Gandak. Eighteen farmers, no middlemen.' },
  { num: '02', title: 'Quality Testing', body: 'Every batch tested for fat %, SNF, antibiotic residue and bacteria count before it enters our facility.' },
  { num: '03', title: 'Traditional Methods', body: 'Bilona-churned ghee, hand-set dahi cultures, slow-reduced kulfi base. No centrifuges, no shortcuts.' },
  { num: '04', title: 'Cold Chain', body: 'Farm to facility in under four hours, held continuously below 4°C until your doorstep.' },
  { num: '05', title: 'Delivered Fresh', body: 'Morning collection, afternoon delivery across Hajipur, Patna, Muzaffarpur, Darbhanga and Bhagalpur.' },
];
