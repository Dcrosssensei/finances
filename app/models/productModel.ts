export interface ProductTypes {
    id: string;
    name: string;
    description: string;
    logo: string;
    date_release: Date;
    date_revision: Date;
  }

  export interface ProductTypesToSend extends Omit<ProductTypes, 'date_release' | 'date_revision'> {
    date_release: string;
    date_revision: string;
  }
  