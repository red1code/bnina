export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  role: ROLES;
  signupDate: number | Date;
  lastLoggedin: number | Date;
  address?: string;
}

export enum ROLES {
  ADMIN = 'admin',
  CUTOMER = 'customer',
  SELLER = 'seller'
}
