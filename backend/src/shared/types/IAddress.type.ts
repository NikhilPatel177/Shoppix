export interface IAddress {
  name: string;
  phone: string;
  address: string;
  pincode: string;
  city: string;
  state: string;
  landmark: string;
  label: 'home' | 'work';
  isDefault: boolean;
  id: string;
}
