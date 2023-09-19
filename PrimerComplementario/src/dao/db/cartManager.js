import cartModel from "../models/cartModel.js";

export default class cartManager {
  async getAllCarts() {
    const carts = await cartModel.find().lean();
    return carts;
  }

  async createCart(cart) {
    const newCart = await cartModel.create(cart);
    return newCart.id;
  }

  async getProductsInCart() {
    const cart = await this.getCartById(cartId);

    if (cart) {
      return cart.products;
    } else {
      console.log("cart not found");
      return [];
    }
  }

  async getCartById(id) {
    const cart = await cartModel.find({ _id: id }).lean();
    return cart;
  }
}
