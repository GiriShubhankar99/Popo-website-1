export type FlavourId =
  | 'vanilla'
  | 'strawberry'
  | 'mango'
  | 'orange'
  | 'chocolate'
  | 'butterscotch'
  | 'kesar-kulfi';

export interface WorldProperty {
  skyColor: string;
  groundColor: string;
  accentColor: string;
  particleColor: string;
  features: string[];
  ambientLightColor: string;
  environmentDescription: string;
}

export interface FlavourConfig {
  id: FlavourId;
  name: string;
  slug: string;
  hindiName?: string;
  colour: string;
  secondaryColour: string;
  darkColour: string;
  tagline: string;
  headline: string;
  subheading: string;
  description: string;
  microcopy: string[];
  mood: string[];
  worldName: string;
  worldProperties: WorldProperty;
  keyIngredients: string[];
  textureNotes: string;
  sweetnessLevel: number;
  richnessLevel: number;
  calories: string;
  formats: string[];
  mapCoordinates: { x: number; y: number }; // Percentage on interactive map
}

export interface ProductItem {
  id: string;
  name: string;
  flavourId: FlavourId;
  format: 'Tub (500ml)' | 'Waffle Cone' | 'Gourmet Stick' | 'Kulfi Bar' | 'Mini Cup (120ml)';
  tagline: string;
  price: string;
  badge?: string;
  rating: number;
  highlight: string;
}

export interface PopoMoment {
  id: string;
  title: string;
  tagline: string;
  story: string;
  vibe: string;
  flavourRecommendation: string;
  iconName: string;
  bgGradient: string;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  subtitle: string;
  options: {
    id: string;
    label: string;
    description: string;
    icon: string;
    flavourId: FlavourId;
    color: string;
  }[];
}

export interface GameCatchItem {
  id: number;
  x: number; // 0 to 100 percentage
  y: number; // 0 to 100 percentage
  speed: number;
  type: 'normal' | 'golden' | 'melting' | 'ice';
  flavourId?: FlavourId;
  size: number;
}

export type MascotReaction =
  | 'idle'
  | 'blink'
  | 'wave'
  | 'jump'
  | 'celebrate'
  | 'freeze'
  | 'look-cursor';
