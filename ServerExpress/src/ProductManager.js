const fs = require("fs");
const path = require("path"); // SI NO PONIA ESTO NO ME ANDABA

class ProductManager {
  static id = 0;

  constructor() {
    this.products = [];
    this.path = path.join(__dirname, "products.json"); // SI NO PONIA ESTO NO ME ANDABA
  }

  async getProducts() {
    const data = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
    return data;
  }

  async addProduct(name, description, img, price, code, stock) {
    const newProd = {
      id: ProductManager.id++,
      name,
      description,
      img,
      price,
      code,
      stock,
    };

    this.products.push(newProd);

    await fs.promises.writeFile(
      this.path,
      JSON.stringify(this.products, null, 2)
    );

    return newProd;
  }

  async getProductById(id) {
    const data = await this.getProducts();
    const product = data.find((prod) => prod.id === id);

    if (product) {
      return product;
    } else {
      throw new Error(`El Producto con ${id} no fue encontrado.`);
    }
  }

  async deleteProduct(id) {
    const data = await this.getProducts();
    const index = data.findIndex((prod) => prod.id === id);

    if (index !== -1) {
      const deletedProduct = data.splice(index, 1)[0];
      await fs.promises.writeFile(this.path, JSON.stringify(data, null, 2));
      return deletedProduct;
    } else {
      throw new Error(`El Producto con ${id} no fue encontrado.`);
    }
  }

  async updateProduct(id, updatedFields) {
    const data = await this.getProducts();
    const index = data.findIndex((prod) => prod.id === id);

    if (index !== -1) {
      Object.assign(data[index], updatedFields);
      await fs.promises.writeFile(this.path, JSON.stringify(data, null, 2));
      return data[index];
    } else {
      throw new Error(`El Producto con id ${id} no fue encontrado.`);
    }
  }
}

const funcionAsync = async () => {
  const productManager = new ProductManager();
  await productManager.addProduct(
    "PRODUCT ADDED TEST",
    "testing",
    "img",
    13,
    "abc3333",
    23
  );
  await productManager.addProduct(
    "SECOND PRODUCT ADDED",
    "testing",
    "img",
    2,
    "222",
    22
  );
  await productManager.addProduct(
    "THIRD PRODUCT ADDED",
    "testing",
    "img",
    3,
    "333",
    33
  );
  await productManager.addProduct(
    "FOURTH PRODUCT ADDED",
    "testing",
    "img",
    4,
    "444",
    44
  );
  await productManager.addProduct(
    "FIFTH PRODUCT ADDED",
    "testing",
    "img",
    5,
    "555",
    55
  );
};

funcionAsync();

module.exports = ProductManager;
