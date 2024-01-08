import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("test create user", () => {
  it("should create a user on /register", async () => {
    const userMock = {
      username: "Gianluca",
      surname: "Donato",
      email: "giani@gmail.com",
      password: "111",
    };

    const { statusCode, ok, _body } = await requester
      .post("/register")
      .send(userMock);
  });

  it("should create a user whit role user /register", async () => {
    const userMock = {
      username: "Gianluca",
      surname: "Donato",
      email: "giani@gmail.com",
      role: "user",
    };

    const { statusCode, ok, _body } = await requester
      .post("/register")
      .send(userMock.role)
      .to.equal("user");
  });
});
