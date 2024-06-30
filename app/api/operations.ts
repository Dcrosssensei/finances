import { ProductTypes, ProductTypesToSend } from "../models";
import { transformToSend } from "./helpers/transforClass";



export const AddProductPush = async (data:ProductTypes) => {
    try {
        const productToSend: ProductTypesToSend = transformToSend(data);
      const response = await fetch(`http://10.0.2.2:3002/bp/products`, {
        method: "POST",
        body: JSON.stringify({ ...productToSend }),
        headers: {
            'Content-Type': 'application/json'
          },
        });
        if (response.status === 200) {
            return true
        }
        return false
    } catch (error) {
        return false
    }
  };

export const UpdateProductPush = async (data:ProductTypes) => {
    try {
        const productToSend: ProductTypesToSend = transformToSend(data);
      const response = await fetch(`http://10.0.2.2:3002/bp/products/${data.id}`, {
        method: "PUT",
        body: JSON.stringify({ ...productToSend }),
        headers: {
            'Content-Type': 'application/json'
          },
        });
        if (response.status === 200) {
            return true
        }
        return false
    } catch (error) {
        return false
    }
  };

export const DeleteProductPush = async (ID:string) => {
    try {
      const response = await fetch(`http://10.0.2.2:3002/bp/products/${ID}`, {method: "DELETE"});
        if (response.status === 200) {
            return true
        }
        return false
    } catch (error) {
        return false
    }
  };