import GenericRepository from "./indexRepository.js";

export default class ProductRepository extends GenericRepository {
  constructor(dao) {
    super(dao);
  }
}
