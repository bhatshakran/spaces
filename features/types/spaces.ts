export interface Space {
  id: number;
  name: string;
  city: string;
  category: string;
  price: number;
  capacity: number;
  rating: number;
  reviewCount: number;
  amenities: string[];
  imageUrl: string;
  description: string;
}

export interface SpaceCardProps {
  space: Space;
  onRemove?: () => void;
}
