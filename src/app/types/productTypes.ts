export type IProductPromo = {
  label: string;
  val: number;
  condition: string;
};

export type IProductFetch = {
  brand: string;
  category: string;
  categoryPage: string;
  createdAt: string;
  detailsPage: string;
  id: string;
  image: string;
  name: string;
  price: number;
  promo: IProductPromo;
  ratings: number;
  reviews: number;
  salePrice?: number;
  colors?: string[];
  sizes?: number[];
  stock: number;
  updatedAt: string;
};
