
export const validationId = async (inputId:string) => {
    try {
      const response = await fetch(`http://10.0.2.2:3002/bp/products/verification/${inputId}`);
      const data = await response.json();
      return data
    } catch (error) {
        return true
    }
  };