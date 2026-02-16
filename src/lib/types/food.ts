export interface food {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  ingredients: Array<string>;
  price: number;
  priceDiscount: number | null;
  rating: number;
  totalLikes: number;
  isLike: boolean;
}
