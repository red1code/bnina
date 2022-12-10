export interface Meal {
  id: string;
  name: string;
  price: number;
  createdAt: number | Date;
  provider: string;
  imgSrc: string;
}
