const app = require("../app");
const mongoose = require("mongoose");
const request = require("supertest");
// const { json } = require("body-parser");
require("dotenv").config();
mongoose.set("strictQuery", true);

beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_PASSWORD);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("get all posts", () => {
  it("should return all posts", async () => {
    const res = await request(app).get("/getPosts");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("get post by id", () => {
  it("should return one post by id", async () => {
    const res = await request(app).get("/thefirstblog");
    expect(res.statusCode).toBe(200);
  });
});

describe("get all categories", () => {
  it("should return all categories", async () => {
    const res = await request(app).get("/getCategories");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
