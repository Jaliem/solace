export interface Professional {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  image?: string;
  specialties: string[];
  languages: string[];
  bio: string;
  rating: number;
  reviews: number;
  experience: string;
  availability?: {
    [key: string]: boolean;
  };
  price?: string;
  verified?: boolean;
  location?: string;
}