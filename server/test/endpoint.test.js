const sinon = require("sinon");
const fetch = require("node-fetch");
const Mocks = require("./mocks");
const { ENDPOINTS, token, getAllFiles } = require("../utilities");
const { expect } = require("chai");

describe("Endpoints de la API", () => {
  let fetchStub;

  beforeEach(() => {
    fetchStub = sinon.stub(fetch, "Promise");
  });

  afterEach(() => {
    fetchStub.restore();
  });

  it("debería obtener todos los elementos formateados", async () => {
    fetchStub.returns(
      Promise.resolve({
        json: () => Promise.resolve(Mocks.listAll),
        text: () => Promise.resolve(Mocks.instance),
      })
    );

    const result = await getAllFiles();

    expect(result).to.be.an("array");
    for (let i = 0; i < result.length; i++) {
      const item = result[i];
      expect(item).to.be.an("object");
      expect(item).to.have.property("file");
      expect(item).to.have.property("lines");

      const lines = item.lines;
      expect(lines).to.be.an("array");
      for (let j = 0; j < lines.length; j++) {
        const line = lines[j];
        expect(line).to.be.an("object");
        expect(line).to.have.property("text").that.is.equal("text");
        expect(line).to.have.property("number").that.is.equal("number");
        expect(line).to.have.property("hex").that.is.equal("hex");
      }
    }
  });

  it("Deberia obtener los objetos no formateados", async () => {
    fetchStub.returns(
      Promise.resolve({
        json: () => Promise.resolve(Mocks.listAll),
      })
    );
    const result = await getAllFiles(false);
    expect(result).to.be.an("object");
    expect(result).to.have.property("files");
    expect(result.files).to.be.an("array");
    expect(result).to.deep.equal(Mocks.listAll);
  });

  it("Deberia filtrar por fileName", async () => {
    fetchStub.returns(
      Promise.resolve({
        json: () => Promise.resolve(Mocks.listAll),
        text: () => Promise.resolve(Mocks.instance),
      })
    );
    const result = await getAllFiles(true, Mocks.listAll.files[0]);
    expect(result).to.be.an("array");
    expect(result).to.have.lengthOf(1);
    expect(result[0].file).to.be.equal(Mocks.listAll.files[0]);
  });
});
