export type IReturnTo = {
  reqUrl: string;
  reqQueryParams: string;
};

export type ILeftNav = {
  body: any;
  header: string;
  radioBtn?: boolean;
};

export type IDropdownOptions = {
  label: string;
  value: string | number;
};

export type IAddressFields = {
  id?: string;
  contactNo: string;
  line1: string;
  line2: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  isDefault: boolean;
  firstName?: string;
  lastName?: string;
  fullName?: string;
};

export type IOrderItem = {
  quantity: number;
  id: string;
  price: number;
  color?: string;
  szie?: string;
};

export type IOrder = {
  address: string;
  card: string;
  createdAt: string;
  deliveryDate: string;
  discount: number;
  id: string;
  items: IOrderItem[];
  tax: number;
  total: number;
  updatedAt: string;
  user: string;
};

export type IPaginationConfig = {
  itemsPerPage: number;
  currentPage: number;
  totalPages: number;
};
