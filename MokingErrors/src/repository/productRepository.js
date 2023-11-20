import { fakerES as faker } from "@faker-js/faker";

export class ProductRepository {
  get(quantity = 1) {
    const products = [];

    for (let i = 0; i < quantity; i++) {
      const product = {
        name: faker.commerce.product(),
        price: faker.commerce.price({ dec: 0 }),
        stock: faker.number.int(100),
      };

      products.push(product);
    }

    return products;
  }
}
