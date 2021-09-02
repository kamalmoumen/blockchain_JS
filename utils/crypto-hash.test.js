const cryptoHash = require("./crypto-hash");

describe("cryptoHash()", () => {
  FOO_HASH = "2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae";

  it("generats a SHA-256 output", () => {
    expect(cryptoHash("foo")).toEqual(FOO_HASH);
  });

  it("produce the same output for the same inputs in any order", () => {
    expect(cryptoHash("one", "two", "three")).toEqual(
      cryptoHash("two", "three", "one")
    );
  });
});
