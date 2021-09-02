const Block = require("./Block");
const { GENESIS_DATA } = require("../../config");
const cryptoHash = require("../../utils/crypto-hash");
const { mineBlock } = require("./Block");

describe("Block", () => {
  const timestamp = "a-date";
  const hash = "foo-hash";
  const lastHash = "foo-lastHash";
  const data = ["blockchain", "data"];
  const block = new Block({ timestamp, hash, lastHash, data });

  it("has a timestamp", () => {
    expect(block.timestamp).toEqual(timestamp);
  });
  it("has a lastHash", () => {
    expect(block.lastHash).toEqual(lastHash);
  });
  it("has a hash", () => {
    expect(block.hash).toEqual(hash);
  });
  it("has a data", () => {
    expect(block.data).toEqual(data);
  });

  describe("genesis()", () => {
    const genesisBlock = Block.genesis();

    // console.log("genesisBlock", genesisBlock);

    it("returns a Block instance", () => {
      expect(genesisBlock instanceof Block).toBe(true);
    });

    it("returns the genesis data", () => {
      expect(genesisBlock).toEqual(GENESIS_DATA);
    });
  });

  describe("mineBlock()", () => {
    const lastBlock = Block.genesis();
    const data = "mined data";
    const minedBlock = Block.mineBlock({ lastBlock, data });

    it("returns a Block instance", () => {
      expect(minedBlock instanceof Block).toBe(true);
    });

    it("sets the `lastHash` equal to the `hash`of the lastBlock", () => {
      expect(minedBlock.lastHash).toEqual(lastBlock.hash);
    });

    it("sets the `data`", () => {
      expect(minedBlock.data).toEqual(data);
    });

    it("sets the `timestamp`", () => {
      expect(minedBlock.timestamp).not.toEqual(undefined);
    });

    it("creates a SHA-256 `hash` based on the proper inputs", () => {
      expect(minedBlock.hash).toEqual(
        cryptoHash(minedBlock.timestamp, minedBlock.lastHash, minedBlock.data)
      );
    });
  });
});
