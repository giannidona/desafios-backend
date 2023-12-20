import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("test ticket content", () => {
  it("should view a ticket whit this info on /ticket", async () => {
    const ticketMock = {
      code: "adn20nawfni20",
      purchase_datetime: "time",
      amount: 2,
      purchaser: "GIanluca Donato",
    };

    const { statusCode, ok, _body } = await requester
      .post("/ticket")
      .send(ticketMock);
  });
});
