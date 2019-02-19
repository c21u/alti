/**
 * @jest-environment node
 */

describe("API", () => {
  const FakeData = {
    getAccounts: Promise.resolve({
      body: "anything"
    })
  };

  const fakeRequest = {};

  test("#Canvas-status", () => {
    const canvasStatusHandler = require("./canvasStatusHandler")(FakeData);
    return canvasStatusHandler(fakeRequest).then(response => {
      expect(response).toBeDefined();
      expect(response.status).toBeDefined();
      expect(response.status).toBe("success");
    });
  });
});
