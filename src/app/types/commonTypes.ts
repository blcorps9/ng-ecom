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
