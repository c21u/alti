/**
 * @jest-environment node
 */

const jwtDecode = require("jwt-decode");
const request = require("supertest");

const app = require("./server");
const fakeAuth = require("./config")["fakeStrategyCredentials"];
const parseQueryParameters = require("./lib/util").parseQueryParameters;

/**
 * Utility function for Passport LTI auth step.
 * @return {Promise}
 */
const getFakeAuthenticated = () => {
  return request(app)
    .post("/")
    .send(`username=${fakeAuth.username}`)
    .send(`password=${fakeAuth.password}`)
    .set("Accept", "applicaton/json");
};

describe("Authentication via Passport middleware", () => {
  test("Should get successful Passport authentication.", () => {
    expect.assertions(4);

    // Expect the fake credentials to exist.
    expect(fakeAuth.username).toBeDefined();
    expect(fakeAuth.password).toBeDefined();

    return getFakeAuthenticated()
      .expect(302)
      .expect("Cache-Control", "no-store")
      .expect("Pragma", "no-cache")
      .then(response => {
        const queryParameters = parseQueryParameters(response.header);
        expect(queryParameters.token).toBeDefined();
        expect(() => {
          jwtDecode(queryParameters.token);
        }).not.toThrow();
      });
  });
});

describe("Unauthenticated server routes", () => {
  test("Health check returns 200", () => {
    return request(app)
      .get("/z")
      .expect(200);
  });
  test("Should not authenticate with bad credentials", () => {
    return request(app)
      .post("/")
      .send(`username=incorrect`)
      .send(`password=password`)
      .expect(401);
  });

  test("/api route should be protected", () => {
    return request(app)
      .get("/api")
      .expect(401);
  });
});
