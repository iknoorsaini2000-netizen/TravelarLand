
export type CurrencyCode = 'USD' | 'INR' | 'EUR' | 'GBP';

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  rate: number; // Rate relative to USD
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  price: number; // Base price in USD
  rating: number;
  reviewCount: number; // New property for social proof
  image: string;
  category: 'Nature' | 'City' | 'History' | 'Beach';
  highlights: string[];
}

export interface TravelPackage {
  id: string;
  title: string;
  destination: Destination;
  duration: string;
  amenities: string[];
}

export interface AIRecommendation {
  reason: string;
  suggestedDestinations: string[];
}
