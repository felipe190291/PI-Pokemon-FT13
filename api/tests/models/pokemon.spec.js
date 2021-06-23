const { Pokemon, conn, Type } = require("../../src/db.js");
const { expect } = require("chai");

describe("Pokemon model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Pokemon.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name", () => {
        Pokemon.create({ name: "Pikachu" });
      });

      it("error sin content", function (done) {
        Type.create({
          title: "hola",
        })
          .then(() => done("No deberia haberse creado"))
          .catch(() => done());
      });

      describe("Hooks", function () {
        it("setea typo basado en tiypes antes de validar ", function () {
          return Type.create({
            name: "poison",
          }).then((typo) => {
            expect(typo.name).to.equal("poison");
          });
        });
      });
      describe("Hooks", function () {
        it("setea name basado en Pokemon antes de validar ", function () {
          return Pokemon.create({
            name: "picachu",
            image:
              "https://www.ecestaticos.com/image/clipping/4eb2fe1b771826cf037b432e11352dea/la-curiosa-historia-del-perro-que-ayudo-a-una-mujer-enferma-a-volver-a-mover-el-brazo.jpg",
            id: "d21d3546-dd8d-4965-b02c-e1d8f10452f9",
            type: ["poison"],
            life: 34,
            attack: 23,
            defense: 12,
            speed: 11,
            height: 11,
            weight: 78,
          }).then((pokemon) => {
            expect(pokemon.weight).to.equal(78);
          });
        });
      });

      it("error sin title", function (done) {
        Type.create({
          content: "Hola",
        })
          .then(() => done("No debería haberse creado"))
          .catch(() => done());
      });
    });
  });
});
