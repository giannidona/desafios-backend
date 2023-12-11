import userDAO from "../dao/userDAO.js";
import productDAO from "../dao/productDAO.js";

import UserRepository from "../repository/userRepository.js";
import ProductRepository from "../repository/productRepository.js";

export const usersService = new UserRepository(new userDAO());
export const productService = new ProductRepository(new productDAO());
