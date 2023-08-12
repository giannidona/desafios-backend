const fs = require("fs");

class ProductManager {
  static id = 0;

  constructor() {
    this.products = [];
    this.path = "./products.json";
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
  console.log(await productManager.getProducts());
  await productManager.addProduct(
    "product 1",
    "first product testing",
    "img",
    13,
    "abc123",
    23
  );
  await productManager.getProducts();
  await productManager.addProduct(
    "product 2",
    "second product testing",
    "img",
    13,
    "abc123",
    23
  );
  console.log(await productManager.getProducts());
  await productManager.getProductById(2);
  await productManager.addProduct(
    "product 3",
    "third product testing",
    "img",
    56,
    "3f3f3",
    1
  );
  await productManager.updateProduct(2, {
    name: "update Product",
    description: "updating product ",
    img: "no img",
    price: 444,
    code: "a0a0a0",
    stock: 3,
    id: 5,
  });
  await productManager.deleteProduct(2);
};

funcionAsync();
