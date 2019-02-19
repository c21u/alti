/**
 * @jest-environment node
 */

describe("API routes", () => {
  describe("/api/canvas-status", () => {
    test("Should get a successful response.", () => {
      const FakeDataLayer = {
        getAccounts: Promise.resolve({
          body: "anything"
        })
      };
      const canvasStatusHandler = require("./canvasStatusHandler")(
        FakeDataLayer
      );
      const fakeRequest = {};
      return canvasStatusHandler(fakeRequest).then(response => {
        expect(response).toBeDefined();
        expect(response.status).toBeDefined();
        expect(response.status).toBe("success");
      });
    });

    test("Should get 'error' if response body missing.", () => {
      const FakeDataLayerNoBody = {
        getAccounts: Promise.resolve({})
      };
      const canvasStatusHandler = require("./canvasStatusHandler")(
        FakeDataLayerNoBody
      );
      const fakeRequest = {};
      return canvasStatusHandler(fakeRequest).then(response => {
        expect(response).toBeDefined();
        expect(response.status).toBeDefined();
        expect(response.status).toBe("error");
      });
    });
    test("Should get 'error' when data layer fails.", () => {
      const FakeDataLayerReject = {
        getAccounts: Promise.reject(new Error("REJECTEDPROMISE"))
      };
      const canvasStatusHandler = require("./canvasStatusHandler")(
        FakeDataLayerReject
      );
      const fakeRequest = {};
      return canvasStatusHandler(fakeRequest).then(response => {
        expect(response).toBeDefined();
        expect(response.status).toBeDefined();
        expect(response.status).toBe("error");
        expect(response.status).toBeDefined();
        expect(response.message).toBe("REJECTEDPROMISE");
      });
    });
  });
});
