const Blockchain = require("./Blockchain");
const Block = require("../Block/Block");

describe("Blockchain", () => {
  let blockchain, newChain, originaChain;

  beforeEach(() => {
    blockchain = new Blockchain();
    newChain = new Blockchain();

    originaChain = blockchain.chain;
  });

  it("contains a `chain` Array instance", () => {
    expect(blockchain.chain instanceof Array).toBe(true);
  });

  it("starts with genesis block", () => {
    expect(blockchain.chain[0]).toEqual(Block.genesis());
  });

  it("adds a new block to the chain", () => {
    const newData = "foo-data";
    blockchain.addBlock({ data: newData });

    expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData);
  });

  describe("isValidChain()", () => {
    describe("when the chain does not start with the genesis block", () => {
      it("returns false", () => {
        blockchain.chain[0] = { data: "fake-genesis" };

        expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
      });
    });

    describe("when the chain starts with genesis block and has mutiple blocks", () => {
      beforeEach(() => {
        blockchain.addBlock({ data: "Bears" });
        blockchain.addBlock({ data: "Beets" });
        blockchain.addBlock({ data: "Battlestar Galactica" });
      });

      describe("and a lastHash reference has changed", () => {
        it("returns false", () => {
          blockchain.chain[2].lastHash = "broken-lastHash";

          expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
        });
      });

      describe("and the chain contains a block with an invalid field", () => {
        it("returns false", () => {
          blockchain.chain[2].data = "some-bad-and-evil-data";

          expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
        });
      });

      describe("an the chain does not contain any invalid block", () => {
        it("returns True", () => {
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
        });
      });
    });
  });

  describe("replaceChain()", () => {
    describe("when the new chain is not longer", () => {
      it("does not replace the chain", () => {
        blockchain.replaceChain(newChain.chain);

        expect(blockchain.chain).toEqual(originaChain);
      });
    });

    describe("when the chain is longer", () => {
      describe("and the chain is invalid", () => {
        it("does not replace the chain", () => {});
      });

      describe("and the chain is valid", () => {
        it("replaces the chain", () => {});
      });
    });
  });
});
