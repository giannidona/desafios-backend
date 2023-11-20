import { ProductRepository } from "../repository/productRepository.js";

const productRepository = new ProductRepository();

export class ProductController {
  execute(req, res) {
    const quantity = 100;
    const products = productRepository.get(quantity);
    const productDTO = products.map((product) => ({
      name: `${product.name}`,
      price: product.price,
      stock: product.stock,
    }));

    res.send(productDTO);
  }
}
