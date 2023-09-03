const requestSupertest = require("supertest");
const appServer = require("../server");

describe("Post /api/create-tiny-url", () => {
  it("Should return id, original and tiny URL", async () => {
    const testUrl = {
      url: "https://jestjs.io/ru/docs/getting-started",
    };
    const res = await requestSupertest(appServer)
      .post("/api/create-tiny-url")
      .send(testUrl);

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        long_url: expect.any(String),
        short_url: expect.any(String),
      })
    );
  });

  it("Should return unvalid URL error", async () => {
    const testUrl = {
      url: "aaa",
    };
    const res = await requestSupertest(appServer)
      .post("/api/create-tiny-url")
      .send(testUrl);

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
      })
    );
  });
});

describe("Get /:tinyUrl", () => {
  it("Should return original URL", async () => {
    const testUrl = "ob5hd3mc";

    const res = await requestSupertest(appServer).get(`/api/${testUrl}`).send();

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expect.any(String));
  });

  it("Should return 'URL not found' error", async () => {
    const testUrl = "aaa";

    const res = await requestSupertest(appServer).get(`/api/${testUrl}`).send();

    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: expect.any(String),
      })
    );
  });
});
