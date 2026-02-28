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

export interface foodForm {
  name: string;
  description: string;
  imageUrl: string;
  ingredients: Array<string>;
  price: number;
  priceDiscount: number | null;
}

export interface cart {
  id: string;
  userId: string;
  foodId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  food: food;
}
