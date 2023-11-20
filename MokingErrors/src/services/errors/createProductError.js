export const createProductError = (newProduct) => {
  return `
    One or more fields are incomplete:
     name: ${newProduct.name || "Not provided"}
     description: ${newProduct.description || "Not provided"}
     stock: ${newProduct.stock || "Not provided"}
     price: ${newProduct.price || "Not provided"}
  `;
};
