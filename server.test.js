/**
 * @jest-environment node
 */

const request = require("supertest");

const app = require("./server");
const fakeAuth = require("./config")["fakeStrategyCredentials"];

test("Can POST to be authenticated", () => {
  expect.assertions(2);

  // Expect the fake credentials to exist.
  expect(fakeAuth.username).toBeDefined();
  expect(fakeAuth.password).toBeDefined();

  return request(app)
    .post("/")
    .send(`username=${fakeAuth.username}`)
    .send(`password=${fakeAuth.password}`)
    .expect(302)
    .expect("Location", /^\/\?token=.+\..+\..+$/);
});

test("Should not authenticate with bad credentials", () => {
  return request(app)
    .post("/")
    .send(`username=incorrect`)
    .send(`password=password`)
    .expect(401);
});

test("GET / should be protected", () => {
  return request(app)
    .get("/")
    .expect(401);
});

test("/api routes should be protected", () => {
  return request(app)
    .get("/api")
    .expect(401);
});

test("Health check returns 200", () => {
  return request(app)
    .get("/z")
    .expect(200);
});
