import { PopoMoment, QuizQuestion } from '../types';

export const MOMENTS: PopoMoment[] = [
  {
    id: 'school',
    title: 'After School Sprint',
    tagline: 'The final bell rings, the mission begins.',
    story:
      'Tossing the heavy schoolbag onto the sofa, racing down the lane with your best friend to grab an icy orange stick or strawberry scoop before homework calls.',
    vibe: 'Pure nostalgia & unrestrained freedom',
    flavourRecommendation: 'Orange Sunset or Strawberry Valley',
    iconName: 'Backpack',
    bgGradient: 'from-orange-100 to-amber-100'
  },
  {
    id: 'friends',
    title: 'Gully & Rooftop Hangouts',
    tagline: 'When 1 scoop turns into 5 spoons sharing.',
    story:
      'Sitting on the rooftop parapet under twilight skies, dissecting life, gossip, and dream plans while passing around a chilled family tub of Butterscotch.',
    vibe: 'Endless laughter & shared memories',
    flavourRecommendation: 'Butterscotch Kingdom',
    iconName: 'Users',
    bgGradient: 'from-amber-100 to-yellow-100'
  },
  {
    id: 'football',
    title: 'Match-Day Highs & Thrills',
    tagline: '90 minutes of sweat, celebration, and cool-downs.',
    story:
      'Scoring the winning goal in muddy sneakers under the blinding afternoon heat, rewarded with an icy mango blitz that drips right down your fingers.',
    vibe: 'Adrenaline, team spirit & victory sweetness',
    flavourRecommendation: 'Mango Island',
    iconName: 'Trophy',
    bgGradient: 'from-yellow-100 to-amber-100'
  },
  {
    id: 'celebration',
    title: 'Festival & Family Masti',
    tagline: 'Diwali lights, birthday beats & sweet traditions.',
    story:
      'Grandparents, cousins, and kids gathered in the drawing room, clinking silver spoons into rich Kesar Kulfi as dhol beats echo in the street.',
    vibe: 'Warmth, royal heritage & unconditional love',
    flavourRecommendation: 'Kesar Kulfi Palace',
    iconName: 'Sparkles',
    bgGradient: 'from-orange-100 to-yellow-200'
  },
  {
    id: 'family',
    title: 'Sunday Post-Dinner Stroll',
    tagline: 'The unwritten law of Indian dinners.',
    story:
      'No Sunday dinner is officially concluded until the entire family walks together to the local parlour, arguing passionately over cone versus tub.',
    vibe: 'Comfort, togetherness & bedtime bliss',
    flavourRecommendation: 'Vanilla Cloud or Strawberry Valley',
    iconName: 'Heart',
    bgGradient: 'from-rose-100 to-pink-100'
  },
  {
    id: 'late-night',
    title: '2 AM Binge & Brain Freeze',
    tagline: 'When the fridge light becomes your spotlight.',
    story:
      'Quietly sneaking into the kitchen while the house sleeps, opening the freezer with surgical precision, and burying a tablespoon deep into dark chocolate fudge.',
    vibe: 'Secret midnight luxury & guilty happiness',
    flavourRecommendation: 'Chocolate Mountain',
    iconName: 'Moon',
    bgGradient: 'from-stone-200 to-amber-100'
  }
];

export const QUIZ_DATA: QuizQuestion = {
  id: 'mood-quiz',
  prompt: "What's your mood right now?",
  subtitle: 'Answer honestly, explorer! The POPO Flavourverse will teleport your exact soul-scoop.',
  options: [
    {
      id: 'chill',
      label: 'Chill & Peaceful',
      description: 'Need a soft cloud to float on and unwind from the noise.',
      icon: 'Cloud',
      flavourId: 'vanilla',
      color: '#F4DDA2'
    },
    {
      id: 'wild',
      label: 'Wild & Adventurous',
      description: 'Zesty electric energy ready to do backflips in the sun.',
      icon: 'Zap',
      flavourId: 'orange',
      color: '#FF6D2A'
    },
    {
      id: 'sweet',
      label: 'Sweet & Romantic',
      description: 'Soft pink skies, butterflies, and sparkling berry moments.',
      icon: 'Heart',
      flavourId: 'strawberry',
      color: '#FF6B8B'
    },
    {
      id: 'classic',
      label: 'Classic & Crunchy',
      description: 'Warm golden nostalgia with loud, satisfying praline crunches.',
      icon: 'Smile',
      flavourId: 'butterscotch',
      color: '#E5A024'
    },
    {
      id: 'desi',
      label: 'Desi Royalty',
      description: 'Grand festive celebrations, saffron aromas, and pistachio royalty.',
      icon: 'Crown',
      flavourId: 'kesar-kulfi',
      color: '#FF8008'
    },
    {
      id: 'chocolate',
      label: 'Chocolate Obsessed',
      description: 'Rich, unapologetic, deep cocoa fudge without excuses.',
      icon: 'Coffee',
      flavourId: 'chocolate',
      color: '#5C382A'
    },
    {
      id: 'sunny',
      label: 'Sunny & Tropical',
      description: 'Lush golden sunshine and king-tier Ratnagiri Alphonso ecstasy.',
      icon: 'Sun',
      flavourId: 'mango',
      color: '#FFA812'
    }
  ]
};
