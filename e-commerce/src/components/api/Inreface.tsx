enum AuthenticationMode {
  Password = 'Password',
}
export interface IAddress {
  street: string;
  city: string;
  country: string;
  postalCode: string;
}
export interface IUser {
  id: string;
  version: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: {
    clientId: string;
    isPlatformClient: boolean;
  };
  createdBy: {
    clientId: string;
    isPlatformClient: boolean;
  };
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  addresses: IAddress[];
  shippingAddressIds: string[];
  billingAddressIds: string[];
  isEmailVerified: boolean;
  authenticationMode: AuthenticationMode;
}

export interface IRegister {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  // dateOfBirth: Date;
  // addresses: IAddress[];
}

export interface ILogin {
  email: string;
  password: string;
}

/* FORMS */
export interface IFormDataRegister {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  address: IAddress;
  addressForInvoice: boolean;
  addressInvoice: IAddress;
}
