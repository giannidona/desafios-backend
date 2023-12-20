import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("test create product", () => {
  it("should create a product on /createproduct", async () => {
    const prodMock = {
      prod_name: "product",
      description: "description",
      stock: 2,
      price: 23,
      prod_image: "awd.png",
    };

    const { statusCode, ok, _body } = await requester
      .post("/createproduct")
      .send(prodMock);
  });
});
