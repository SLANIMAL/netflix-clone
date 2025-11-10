import { Category, Content, Profile } from '../types';

// Helper function to generate a random match percentage between 70 and 99
const generateMatchPercentage = () => Math.floor(Math.random() * 30) + 70;

export const featuredContent: Content = {
  id: 1,
  title: "Stranger Things",
  description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
  posterImage: "https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg",
  backdropImage: "https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg",
  year: 2022,
  ageRating: "TV-14",
  duration: "3 Seasons",
  genres: ["Horror", "Thriller", "Drama"],
  isTrending: true,
  matchPercentage: 97
};

export const contentList: Content[] = [
  {
    id: 2,
    title: "Breaking Point",
    description: "A chemistry teacher diagnosed with a terminal illness teams with a former student to manufacture drugs to secure his family's future.",
    posterImage: "https://images.pexels.com/photos/3945317/pexels-photo-3945317.jpeg",
    backdropImage: "https://images.pexels.com/photos/3945317/pexels-photo-3945317.jpeg",
    year: 2020,
    ageRating: "TV-MA",
    duration: "5 Seasons",
    genres: ["Drama", "Crime", "Thriller"],
    matchPercentage: generateMatchPercentage()
  },
  {
    id: 3,
    title: "Crown Jewel",
    description: "The story of Queen Elizabeth II's reign of the United Kingdom, and how it adapted to the 21st century.",
    posterImage: "https://images.pexels.com/photos/3900437/pexels-photo-3900437.jpeg",
    backdropImage: "https://images.pexels.com/photos/3900437/pexels-photo-3900437.jpeg",
    year: 2021,
    ageRating: "TV-MA",
    duration: "4 Seasons",
    genres: ["Drama", "History", "Biography"],
    matchPercentage: generateMatchPercentage()
  },
  {
    id: 4,
    title: "Cosmic Odyssey",
    description: "A team of explorers travel through a wormhole in space in an attempt to find a new home for humanity.",
    posterImage: "https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg",
    backdropImage: "https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg",
    year: 2019,
    ageRating: "PG-13",
    duration: "2h 49m",
    genres: ["Adventure", "Sci-Fi", "Drama"],
    matchPercentage: generateMatchPercentage()
  },
  {
    id: 5,
    title: "Red Notice",
    description: "An FBI profiler pursuing the world's most wanted art thief becomes his unwilling partner in crime to catch an elusive crook who's always one step ahead.",
    posterImage: "https://images.pexels.com/photos/8942614/pexels-photo-8942614.jpeg",
    backdropImage: "https://images.pexels.com/photos/8942614/pexels-photo-8942614.jpeg",
    year: 2021,
    ageRating: "PG-13",
    duration: "1h 58m",
    genres: ["Action", "Comedy", "Thriller"],
    matchPercentage: generateMatchPercentage()
  },
  {
    id: 6,
    title: "Mystic River",
    description: "The lives of three men who were childhood friends are shattered when one of them suffers a family tragedy.",
    posterImage: "https://images.pexels.com/photos/1738537/pexels-photo-1738537.jpeg",
    backdropImage: "https://images.pexels.com/photos/1738537/pexels-photo-1738537.jpeg",
    year: 2018,
    ageRating: "R",
    duration: "2h 18m",
    genres: ["Crime", "Drama", "Mystery"],
    matchPercentage: generateMatchPercentage()
  },
  {
    id: 7,
    title: "Starlight",
    description: "A young woman discovers she has supernatural abilities and joins a group of others like her as they become hunted by those who wish to destroy them.",
    posterImage: "https://images.pexels.com/photos/1819650/pexels-photo-1819650.jpeg",
    backdropImage: "https://images.pexels.com/photos/1819650/pexels-photo-1819650.jpeg",
    year: 2022,
    ageRating: "TV-MA",
    duration: "1 Season",
    genres: ["Sci-Fi", "Fantasy", "Drama"],
    isTrending: true,
    matchPercentage: generateMatchPercentage()
  },
  {
    id: 8,
    title: "Lost Empire",
    description: "An archaeologist embarks on a thrilling adventure to find a legendary lost city, facing dangers and discovering secrets that should have remained buried.",
    posterImage: "https://images.pexels.com/photos/3863793/pexels-photo-3863793.jpeg",
    backdropImage: "https://images.pexels.com/photos/3863793/pexels-photo-3863793.jpeg",
    year: 2021,
    ageRating: "PG-13",
    duration: "2h 13m",
    genres: ["Adventure", "Action", "Fantasy"],
    matchPercentage: generateMatchPercentage()
  }
];

export const categories: Category[] = [
  {
    id: 1,
    name: "Trending Now",
    contents: [...contentList].sort(() => 0.5 - Math.random()).slice(0, 5)
  },
  {
    id: 2,
    name: "Popular on Netflix",
    contents: [...contentList].sort(() => 0.5 - Math.random()).slice(0, 5)
  },
  {
    id: 3,
    name: "Award-Winning TV Shows",
    contents: [...contentList].sort(() => 0.5 - Math.random()).slice(0, 5)
  },
  {
    id: 4,
    name: "New Releases",
    contents: [...contentList].sort(() => 0.5 - Math.random()).slice(0, 5)
  }
];

export const profiles: Profile[] = [
  {
    id: 1,
    name: "John",
    avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150"
  },
  {
    id: 2,
    name: "Sarah",
    avatar: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150"
  },
  {
    id: 3,
    name: "Kids",
    avatar: "https://images.pexels.com/photos/1416736/pexels-photo-1416736.jpeg?auto=compress&cs=tinysrgb&w=150"
  },
  {
    id: 4,
    name: "Add Profile",
    avatar: "https://via.placeholder.com/150"
  }
];