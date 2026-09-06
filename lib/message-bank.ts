import { BankMessage, MessageCategory } from '@/types/card';

export interface CategoryInfo {
  id: MessageCategory;
  name: string;
  emoji: string;
  description: string;
}

export const MESSAGE_CATEGORIES: CategoryInfo[] = [
  { id: 'friend', name: 'Best Friend', emoji: '👯‍♂️', description: 'Fun, heartwarming, & memorable' },
  { id: 'partner', name: 'Partner / Love', emoji: '💖', description: 'Romantic, intimate, & sweet' },
  { id: 'parent', name: 'Parents / Family', emoji: '🏡', description: 'Grateful, loving, & respectful' },
  { id: 'coworker', name: 'Coworker / Peer', emoji: '☕', description: 'Warm, thoughtful, & professional' },
];

export const MESSAGE_BANK: BankMessage[] = [
  // --- BEST FRIEND (6 messages) ---
  {
    id: 'friend-1',
    category: 'friend',
    categoryTitle: 'Best Friend',
    title: 'Partner in Crime & Laughter',
    text: "Happy Birthday to my favorite human! Thank you for another year of laughs, late-night talks, and being the one person who always gets my jokes. May this year bring you all the love, happiness, and adventures you deserve!"
  },
  {
    id: 'friend-2',
    category: 'friend',
    categoryTitle: 'Best Friend',
    title: 'Aging Like Fine Wine',
    text: "Happy Birthday! They say wisdom comes with age, but honestly I just love that we get to be delightfully chaotic together forever. Here's to more trips, crazy memories, and endless joy!"
  },
  {
    id: 'friend-3',
    category: 'friend',
    categoryTitle: 'Best Friend',
    title: 'Grateful for Your Existence',
    text: "I couldn't imagine life without our spontaneous catch-ups and belly laughs. You make the world so much brighter just by being in it. Wishing you the happiest birthday and the biggest cake today!"
  },
  {
    id: 'friend-4',
    category: 'friend',
    categoryTitle: 'Best Friend',
    title: 'Dream Chaser',
    text: "To the most resilient, hilarious, and genuine person I know: keep shining and chasing your wildest dreams. Today is all about celebrating you! Happy Birthday bestie!"
  },
  {
    id: 'friend-5',
    category: 'friend',
    categoryTitle: 'Best Friend',
    title: 'Distance Can’t Stop Us',
    text: "Even miles apart, you're always right here in my heart. Sending you the biggest virtual hug, lots of confetti, and endless love on your special day. Happy Birthday!"
  },
  {
    id: 'friend-6',
    category: 'friend',
    categoryTitle: 'Best Friend',
    title: 'Another Chapter of Awesomeness',
    text: "Another year older, bolder, and even more fabulous! Hope your day is packed with good vibes, your favorite food, and people who love you unconditionally. Cheers to you!"
  },

  // --- PARTNER / ROMANTIC (6 messages) ---
  {
    id: 'partner-1',
    category: 'partner',
    categoryTitle: 'Partner / Love',
    title: 'My Whole World',
    text: "Happy Birthday to my favorite person in the entire universe. Falling in love with you was the easiest thing I've ever done, and loving you every day is my greatest blessing. Here is to celebrating you today and always."
  },
  {
    id: 'partner-2',
    category: 'partner',
    categoryTitle: 'Partner / Love',
    title: 'My Heart & Safe Place',
    text: "You make ordinary days feel like poetry and tough days feel bearable. Thank you for your warmth, your kindness, and the endless sunshine you bring into my life. Happy Birthday my love."
  },
  {
    id: 'partner-3',
    category: 'partner',
    categoryTitle: 'Partner / Love',
    title: 'To Many More Adventures',
    text: "Happy Birthday to my favorite travel partner, dance partner, and soulmate. Every memory with you is my favorite memory. I can't wait to see what this next year brings for us together."
  },
  {
    id: 'partner-4',
    category: 'partner',
    categoryTitle: 'Partner / Love',
    title: 'Still Falling For You',
    text: "With each passing year, you become more extraordinary. Thank you for choosing me and making home wherever we are. Wishing you the magical birthday you truly deserve, sweetheart."
  },
  {
    id: 'partner-5',
    category: 'partner',
    categoryTitle: 'Partner / Love',
    title: 'Sweet & Tender',
    text: "May your day be as sweet, radiant, and wonderful as your smile. I love you more than words can express. Happy Birthday, my darling!"
  },
  {
    id: 'partner-6',
    category: 'partner',
    categoryTitle: 'Partner / Love',
    title: 'My Forever Person',
    text: "Today is a celebration of the day the world was blessed with you. I am the luckiest person alive to hold your hand through this journey. Happy Birthday, gorgeous!"
  },

  // --- PARENTS / FAMILY (6 messages) ---
  {
    id: 'parent-1',
    category: 'parent',
    categoryTitle: 'Parents / Family',
    title: 'My Pillar of Strength',
    text: "Happy Birthday! Thank you for your endless sacrifices, your unconditional love, and for always being my guide whenever I felt lost. Wishing you good health, peace, and boundless happiness today."
  },
  {
    id: 'parent-2',
    category: 'parent',
    categoryTitle: 'Parents / Family',
    title: 'With Immense Gratitude',
    text: "Everything good in me came from watching you live with kindness, courage, and integrity. Thank you for being the heart of our family. Have the most wonderful birthday!"
  },
  {
    id: 'parent-3',
    category: 'parent',
    categoryTitle: 'Parents / Family',
    title: 'Warmest Wishes',
    text: "Sending you all my love, warmth, and tightest hugs on your birthday! May this year bless you with peaceful mornings, good health, and moments of pure joy."
  },
  {
    id: 'parent-4',
    category: 'parent',
    categoryTitle: 'Parents / Family',
    title: 'Timeless Inspiration',
    text: "Happy Birthday! You never stop inspiring me with your generous spirit and quiet strength. May your day be filled with your favorite things and people who treasure you deeply."
  },
  {
    id: 'parent-5',
    category: 'parent',
    categoryTitle: 'Parents / Family',
    title: 'Blessed to Have You',
    text: "No matter how old I get, your hugs will always be the safest place on earth. Wishing you the happiest birthday filled with laughter, delicious food, and love!"
  },
  {
    id: 'parent-6',
    category: 'parent',
    categoryTitle: 'Parents / Family',
    title: 'Cherished Always',
    text: "To the most loving parent anyone could ever ask for: thank you for making every day brighter. Happy Birthday, and here is to many more joyful years ahead!"
  },

  // --- COWORKER / PEER (6 messages) ---
  {
    id: 'coworker-1',
    category: 'coworker',
    categoryTitle: 'Coworker / Peer',
    title: 'Workplace MVP',
    text: "Happy Birthday! Working with you makes every project smoother and every workday infinitely more enjoyable. Hope you take some well-deserved time off to relax and celebrate!"
  },
  {
    id: 'coworker-2',
    category: 'coworker',
    categoryTitle: 'Coworker / Peer',
    title: 'Cheers to Great Teamwork',
    text: "Wishing a very Happy Birthday to an awesome teammate! May your year ahead be packed with high achievements, exciting challenges, and zero meeting overruns."
  },
  {
    id: 'coworker-3',
    category: 'coworker',
    categoryTitle: 'Coworker / Peer',
    title: 'Bright & Positive Energy',
    text: "Happy Birthday! Thank you for bringing such positive energy, patience, and brilliance to the team. Have a great celebration and enjoy your day!"
  },
  {
    id: 'coworker-4',
    category: 'coworker',
    categoryTitle: 'Coworker / Peer',
    title: 'Celebrate and Unplug',
    text: "Step away from the inbox, close the spreadsheets, and eat an extra slice of cake today! Wishing you a fantastic birthday and a thriving year ahead."
  },
  {
    id: 'coworker-5',
    category: 'coworker',
    categoryTitle: 'Coworker / Peer',
    title: 'True Professional & Friend',
    text: "It is rare to find someone who is both a consummate professional and a genuinely caring friend. Wishing you great success, happiness, and a very Happy Birthday!"
  },
  {
    id: 'coworker-6',
    category: 'coworker',
    categoryTitle: 'Coworker / Peer',
    title: 'Best Wishes on Your Day',
    text: "May your birthday bring you as much satisfaction and happiness as you bring to everyone around you. Have a wonderful celebration!"
  }
];
