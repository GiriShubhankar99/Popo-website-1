import { FlavourConfig } from '../types';

export const FLAVOURS: FlavourConfig[] = [
  {
    id: 'vanilla',
    name: 'Vanilla Cloud',
    slug: 'vanilla-cloud-land',
    hindiName: 'वेनिला क्लाउड',
    colour: '#FFF5DC',
    secondaryColour: '#F4DDA2',
    darkColour: '#684E29',
    tagline: 'Pure Madagascar beans spun into fluffy dreamscapes',
    headline: 'VANILLA MODE: DREAMING.',
    subheading: 'Soft creamy clouds you can scoop right out of the sky.',
    description:
      'Float across rolling cream hills and white chocolate gazebos where fragrant orchid blossoms drift lazily in soft golden sunlight.',
    microcopy: [
      'Simple? Never. Classic? Forever.',
      'Soft clouds, zero turbulence.',
      'Real vanilla bean specks or bust.',
      'Peace in every spoonful.'
    ],
    mood: ['Calm', 'Soft', 'Dreamy', 'Magical'],
    worldName: 'Vanilla Cloud Land',
    worldProperties: {
      skyColor: '#FFF8E7',
      groundColor: '#FDF1CE',
      accentColor: '#E6C075',
      particleColor: '#F7E7B4',
      features: [
        'Floating vanilla bean clouds',
        'Creamy rolling hills',
        'White chocolate-like structures',
        'Floating vanilla orchid flowers',
        'Soft dreamy sunlight'
      ],
      ambientLightColor: '#FFF6E0',
      environmentDescription:
        'A tranquil sanctuary where billowy clouds made of velvety whipped cream drift across rolling hills of sweet milk.'
    },
    keyIngredients: ['Madagascar Bourbon Vanilla', 'Fresh Buffalo Milk', 'White Cocoa Butter', 'Cane Sugar'],
    textureNotes: 'Silk-smooth, airy yet dense, melt-in-mouth finish',
    sweetnessLevel: 3,
    richnessLevel: 4,
    calories: '138 kcal / scoop',
    formats: ['Tub (500ml)', 'Waffle Cone', 'Mini Cup (120ml)'],
    mapCoordinates: { x: 50, y: 18 }
  },
  {
    id: 'strawberry',
    name: 'Strawberry Valley',
    slug: 'strawberry-valley',
    hindiName: 'स्ट्रॉबेरी वैली',
    colour: '#FFE3EA',
    secondaryColour: '#FF6B8B',
    darkColour: '#991136',
    tagline: 'Sun-ripened Mahabaleshwar berries in ruby rivers of cream',
    headline: 'BERRY RUSH: UNLEASHED.',
    subheading: 'Sweet, tart, sparkling mountain euphoria.',
    description:
      'Dive into vibrant pink valleys where ruby strawberry rivers cascade over candy blossoms and sparkling fruit dew sparkles in the breeze.',
    microcopy: [
      'Pink isn’t just a colour, it’s an attitude.',
      'Sweet like a first crush, tart like drama.',
      'Packed with real chunky Mahabaleshwar strawberries.',
      'One scoop? Cute.'
    ],
    mood: ['Romantic', 'Fun', 'Sweet', 'Energetic'],
    worldName: 'Strawberry Valley',
    worldProperties: {
      skyColor: '#FFE7EE',
      groundColor: '#FFB8C9',
      accentColor: '#FF3B66',
      particleColor: '#FF8DA6',
      features: [
        'Giant plump strawberries',
        'Strawberry cream rivers',
        'Pink rolling hills',
        'Floating strawberry slices',
        'Candy-like sugar flowers'
      ],
      ambientLightColor: '#FFD6E2',
      environmentDescription:
        'A candy-coated gorge of sparkling ruby streams, towering berry mountains, and sweet fragrant breezes.'
    },
    keyIngredients: ['Fresh Mahabaleshwar Strawberries', 'Double Cream', 'Beet Juice Tint', 'Pure Strawberry Purée'],
    textureNotes: 'Creamy with crunchy seed pops and fruit chunks',
    sweetnessLevel: 4,
    richnessLevel: 3,
    calories: '142 kcal / scoop',
    formats: ['Tub (500ml)', 'Waffle Cone', 'Gourmet Stick'],
    mapCoordinates: { x: 26, y: 32 }
  },
  {
    id: 'mango',
    name: 'Mango Island',
    slug: 'mango-island',
    hindiName: 'मैंगो आइलैंड',
    colour: '#FFF0C8',
    secondaryColour: '#FFA812',
    darkColour: '#8C4B00',
    tagline: '100% Ratnagiri Alphonso king of kings in liquid sunshine form',
    headline: 'MANGO MODE: ON.',
    subheading: 'Sunshine you can scoop.',
    description:
      'Explore mango-shaped islands surrounded by shimmering golden waterfalls, floating juicy mango cubes, and warm tropical breezes.',
    microcopy: [
      'Too mango to handle.',
      'No artificial junk. Pure Ratnagiri king.',
      'Summer vacation compressed into a bowl.',
      'Brain freeze incoming.'
    ],
    mood: ['Summer', 'Juicy', 'Energetic', 'Tropical'],
    worldName: 'Mango Island',
    worldProperties: {
      skyColor: '#FFF2C6',
      groundColor: '#FFCD42',
      accentColor: '#FF8800',
      particleColor: '#FFB428',
      features: [
        'Mango-shaped islands',
        'Juicy mango waterfalls',
        'Floating mango cubes',
        'Golden glowing sky',
        'Glossy liquid mango surfaces'
      ],
      ambientLightColor: '#FFE088',
      environmentDescription:
        'A vibrant tropical archipelago bathed in golden hour glow with cascading waterfalls of pure Alphonso pulp.'
    },
    keyIngredients: ['Ratnagiri Alphonso Pulp', 'Condensed Milk', 'Cardamom Pinch', 'Natural Mango Nectar'],
    textureNotes: 'Dense, luscious, velvety custard-like fruit pull',
    sweetnessLevel: 5,
    richnessLevel: 4,
    calories: '155 kcal / scoop',
    formats: ['Tub (500ml)', 'Waffle Cone', 'Gourmet Stick', 'Kulfi Bar'],
    mapCoordinates: { x: 74, y: 34 }
  },
  {
    id: 'orange',
    name: 'Orange Sunset Land',
    slug: 'orange-sunset-land',
    hindiName: 'ऑरेंज सनसेट',
    colour: '#FFEAD8',
    secondaryColour: '#FF6D2A',
    darkColour: '#8C2B00',
    tagline: 'Nagpur citrus zing kissed by glowing twilight skies',
    headline: 'ZING LEVEL: MAXIMUM.',
    subheading: 'Crisp citrus fizz that wakes up your entire soul.',
    description:
      'Wander through translucent citrus arches where an orange-slice sun illuminates citrus bubble geysers and sparkling orange soda falls.',
    microcopy: [
      'Nagpur oranges doing backflips.',
      'Zesty, juicy, unapologetically tangy.',
      'Electric sunset in your mouth.',
      'Instant mood lifter.'
    ],
    mood: ['Fresh', 'Zesty', 'Energetic', 'Radiant'],
    worldName: 'Orange Sunset Land',
    worldProperties: {
      skyColor: '#FFE2D1',
      groundColor: '#FFA56D',
      accentColor: '#FF5400',
      particleColor: '#FF8542',
      features: [
        'Orange slice sun in the sky',
        'Effervescent citrus bubbles',
        'Orange juice waterfalls',
        'Floating translucent citrus rings',
        'Crystalline sugar structures'
      ],
      ambientLightColor: '#FFD3B5',
      environmentDescription:
        'A radiant sunset horizon aglow with orange peel warmth, fizzy citrus springs, and crystal-clear fruit rings.'
    },
    keyIngredients: ['Nagpur Mandarins', 'Orange Blossom Essence', 'Sweet Cream', 'Citrus Zest Candies'],
    textureNotes: 'Bright and punchy with tiny crystal crunch',
    sweetnessLevel: 3,
    richnessLevel: 2,
    calories: '128 kcal / scoop',
    formats: ['Tub (500ml)', 'Gourmet Stick', 'Mini Cup (120ml)'],
    mapCoordinates: { x: 84, y: 64 }
  },
  {
    id: 'chocolate',
    name: 'Chocolate Mountain',
    slug: 'chocolate-mountain',
    hindiName: 'चॉकलेट माउंटेन',
    colour: '#F0E6DF',
    secondaryColour: '#5C382A',
    darkColour: '#24140D',
    tagline: '70% single-origin dark cocoa, fudgy brownie craters & ganache rivers',
    headline: 'DARK. RICH. UNSTOPPABLE.',
    subheading: 'Deep cocoa indulgence engineered for true chocoholics.',
    description:
      'Ascend towering cocoa peaks sculpted from fudgy brownies, where warm rivers of molten chocolate carve pathways through dark chocolate shards.',
    microcopy: [
      'Warning: Highly addictive ganache.',
      'Seven deadly scoops of chocolate.',
      'Brownie chunks bigger than your problems.',
      'Indulgence without apologies.'
    ],
    mood: ['Rich', 'Premium', 'Indulgent', 'Bold'],
    worldName: 'Chocolate Mountain',
    worldProperties: {
      skyColor: '#E6D7CD',
      groundColor: '#4A2E22',
      accentColor: '#8C523B',
      particleColor: '#C4977D',
      features: [
        'Craggy chocolate mountains',
        'Flowing chocolate rivers',
        'Brownie cliffs & craters',
        'Dark chocolate shards',
        'Cocoa dust cloud particles'
      ],
      ambientLightColor: '#C9B09F',
      environmentDescription:
        'An imposing yet cozy mountain range of dense fudge peaks, glistening ganache streams, and dusting of Dutch cocoa.'
    },
    keyIngredients: ['70% Single Origin Cocoa', 'Belgian Chocolate Chips', 'Baked Fudge Brownies', 'Dark Chocolate Ganache'],
    textureNotes: 'Deep, fudgy, chewy brownie pockets in silky dark ice cream',
    sweetnessLevel: 4,
    richnessLevel: 5,
    calories: '185 kcal / scoop',
    formats: ['Tub (500ml)', 'Waffle Cone', 'Gourmet Stick', 'Mini Cup (120ml)'],
    mapCoordinates: { x: 38, y: 78 }
  },
  {
    id: 'butterscotch',
    name: 'Butterscotch Kingdom',
    slug: 'butterscotch-kingdom',
    hindiName: 'बटरस्कॉच किंगडम',
    colour: '#FFF3DC',
    secondaryColour: '#E5A024',
    darkColour: '#7A4900',
    tagline: 'Salted butter caramel drizzle with explosive cashew praline crunch',
    headline: 'CRUNCH IT. CRACKLE IT.',
    subheading: 'The golden kingdom of butter, brown sugar, and toasted praline.',
    description:
      'Enter royal caramel halls surrounded by cascading golden butterscotch fountains, glowing crystal rocks, and crunchy praline boulder paths.',
    microcopy: [
      'That crunch heard across the universe.',
      'Butter + brown sugar = Pure royalty.',
      'Never settle for smooth when you can have praline.',
      'Nostalgia turned up to eleven.'
    ],
    mood: ['Luxurious', 'Crunchy', 'Golden', 'Fun'],
    worldName: 'Butterscotch Kingdom',
    worldProperties: {
      skyColor: '#FFF5E0',
      groundColor: '#E8A738',
      accentColor: '#FFB833',
      particleColor: '#F7C974',
      features: [
        'Caramel waterfalls',
        'Crunchy praline rocks',
        'Golden floating crystals',
        'Butterscotch rivers',
        'Warm glowing ambient lanterns'
      ],
      ambientLightColor: '#FFDF9B',
      environmentDescription:
        'A magnificent palace of spun golden toffee, bubbling caramel lagoons, and glittering praline gravel.'
    },
    keyIngredients: ['Slow-Cooked Brown Sugar Caramel', 'Amul Butter', 'Handcrafted Cashew Praline', 'Sea Salt Flakes'],
    textureNotes: 'Velvety buttery base with shatteringly crisp praline bites',
    sweetnessLevel: 5,
    richnessLevel: 4,
    calories: '172 kcal / scoop',
    formats: ['Tub (500ml)', 'Waffle Cone', 'Kulfi Bar'],
    mapCoordinates: { x: 16, y: 62 }
  },
  {
    id: 'kesar-kulfi',
    name: 'Kesar Kulfi Palace',
    slug: 'kesar-kulfi-palace',
    hindiName: 'केसर कुल्फी पैलेस',
    colour: '#FFF7DD',
    secondaryColour: '#E6A117',
    darkColour: '#684503',
    tagline: 'Kashmiri saffron strands, slivered pistachios, and slow-rabri nostalgia',
    headline: 'ROYALTY IN EVERY BITE.',
    subheading: 'Traditional Indian heritage reimagined for modern wanderers.',
    description:
      'Step inside golden palatial domes where Kashmiri saffron strands drift through scented sunset air and emerald pistachio dust sparkles.',
    microcopy: [
      'Desi soul with world-class swagger.',
      'Real Kashmiri saffron. No shortcuts.',
      'Pistachio crunch that demands respect.',
      'Kesar aura: Unlocked.'
    ],
    mood: ['Regal', 'Saffron-Gold', 'Warm Sunset', 'Sophisticated'],
    worldName: 'Kesar Kulfi Palace',
    worldProperties: {
      skyColor: '#FFF2D0',
      groundColor: '#F4C056',
      accentColor: '#FF8008',
      particleColor: '#95C11E',
      features: [
        'Saffron-gold atmosphere',
        'Contemporary palace-inspired arches',
        'Pistachio particles floating',
        'Saffron strands in the air',
        'Kulfi-shaped architectural towers'
      ],
      ambientLightColor: '#FFE296',
      environmentDescription:
        'A contemporary Indian palace glowing in amber sunset tones, scented with royal cardamom, saffron threads, and pistachio.'
    },
    keyIngredients: ['Grade-A Kashmiri Saffron', 'Roasted Irani Pistachios', 'Slow-Simmered Rabri Cream', 'Cardamom Pods'],
    textureNotes: 'Dense, slow-melting traditional kulfi texture with nut slivers',
    sweetnessLevel: 4,
    richnessLevel: 5,
    calories: '168 kcal / scoop',
    formats: ['Tub (500ml)', 'Kulfi Bar', 'Mini Cup (120ml)'],
    mapCoordinates: { x: 62, y: 82 }
  }
];

export const FLAVOUR_MAP = Object.fromEntries(
  FLAVOURS.map((f) => [f.id, f])
) as Record<FlavourConfig['id'], FlavourConfig>;
