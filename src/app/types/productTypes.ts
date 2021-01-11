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
  sizes?: number[] | string[];
  stock: number;
  updatedAt: string;
};

export type ISwatch = {
  label: string;
  value: string;
  style: string;
  isSelected: boolean;
};

export type IProductAltImg = {
  name: string;
  src: string;
};

export type ICartItem = {
  brand: string;
  id: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
};
