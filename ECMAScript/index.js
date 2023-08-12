/// GIANLUCA DONATO

class ProductManajer {
  static id = 0;
  nombre;
  products;

  constructor(nombre) {
    this.nombre = nombre;
    this.products = [];
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      throw new Error("Todos los campos del producto son obligatorios");
    }

    if (this.products.some((product) => product.code === code)) {
      throw new Error("El código del producto ya existe");
    }
    const product = {
      id: ProductManajer.id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(product);
    ProductManajer.id++;
    return product;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      throw new Error("Producto no encontrado");
    }

    return product;
  }
}

const store = new ProductManajer("Store");
const prod1 = store.addProduct("remera", "azul", 25, "img", "vbv2323", 78);
const prod2 = store.addProduct("campera", "negra", 32, "img", "aaa1111", 32);

// CLG
console.log(store.getProducts());
console.log(store.getProductById());
