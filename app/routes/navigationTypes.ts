import { ProductTypes } from "../models";

export type RootStackParamList = {
    Home: undefined;
    Details: { register: ProductTypes; index: number }; 
  };