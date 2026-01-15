
import { Destination } from './types';

export const FEATURED_DESTINATIONS: Destination[] = [
  {
    id: '1',
    name: 'Kyoto',
    country: 'Japan',
    description: 'A blend of ancient temples and modern elegance, surrounded by emerald hills.',
    price: 1200,
    rating: 4.9,
    reviewCount: 342,
    image: 'https://picsum.photos/seed/kyoto/800/600',
    category: 'History',
    highlights: ['Arashiyama Bamboo Grove', 'Fushimi Inari Shrine', 'Kinkaku-ji']
  },
  {
    id: '2',
    name: 'Santorini',
    country: 'Greece',
    description: 'Pristine white-washed villages perched atop volcanic cliffs overlooking the Aegean.',
    price: 1500,
    rating: 4.8,
    reviewCount: 521,
    image: 'https://picsum.photos/seed/santorini/800/600',
    category: 'Beach',
    highlights: ['Oia Sunsets', 'Black Sand Beaches', 'Caldera Views']
  },
  {
    id: '3',
    name: 'Banff',
    country: 'Canada',
    description: 'The heart of the Rockies, offering turquoise lakes and majestic peaks.',
    price: 950,
    rating: 4.9,
    reviewCount: 218,
    image: 'https://picsum.photos/seed/banff/800/600',
    category: 'Nature',
    highlights: ['Lake Louise', 'Moraine Lake', 'Sulphur Mountain']
  },
  {
    id: '4',
    name: 'Tuscany',
    country: 'Italy',
    description: 'Rolling hills, vineyards, and medieval towns steeped in artistic heritage.',
    price: 1100,
    rating: 4.7,
    reviewCount: 403,
    image: 'https://picsum.photos/seed/tuscany/800/600',
    category: 'History',
    highlights: ['Florence Art Galleries', 'Chianti Wine Tour', 'Siena Square']
  },
  {
    id: '5',
    name: 'Reykjavik',
    country: 'Iceland',
    description: 'The gateway to dramatic glaciers, hot springs, and Northern Lights.',
    price: 1800,
    rating: 4.8,
    reviewCount: 156,
    image: 'https://picsum.photos/seed/iceland/800/600',
    category: 'Nature',
    highlights: ['Blue Lagoon', 'Golden Circle', 'Aurora Borealis']
  },
  {
    id: '6',
    name: 'Barcelona',
    country: 'Spain',
    description: 'Vibrant architecture, bustling markets, and golden city beaches.',
    price: 850,
    rating: 4.6,
    reviewCount: 892,
    image: 'https://picsum.photos/seed/barcelona/800/600',
    category: 'City',
    highlights: ['Sagrada Familia', 'Park Güell', 'Las Ramblas']
  }
];
