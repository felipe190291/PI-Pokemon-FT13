/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');


const agent = session(app);
const pokemon = {
  name: "Pikachu",
  image:"https://www.ecestaticos.com/image/clipping/4eb2fe1b771826cf037b432e11352dea/la-curiosa-historia-del-perro-que-ayudo-a-una-mujer-enferma-a-volver-a-mover-el-brazo.jpg",
  id:"d21d3546-dd8d-4965-b02c-e1d8f10452f9",
  type:"poison",
  life:34,
  force:23,
  defense:12,
  velocity:11,
  height:11,
  weight:78
};
describe('Pokemon routes', () => {
  
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Pokemon.sync({ force: true })
  .then(() =>   Pokemon.create(pokemon)))

  describe('GET /pokemons', () => {
    it('should get 200', () =>
      agent.get('/pokemons').expect(200)
    )
  });
  describe('GET /types', () => {
    it('should get 200', () =>
      agent.get('/types').expect(200)
    )
  });

});
describe("GET /pokemons", function () {
  it("cuantos pokemon hay en mi inicio", () => {
    return agent
      .get("/pokemons")
      .expect(200)
      .then((res) => {
        expect(res.body.length).to.be.deep.equal(
         12
         
         );
        });
      });
    });

      describe("GET /pokemons?name=xxx", () => {
        it("responds with  a string message, Lo sentimos no se encontro tu pokemon", () => {
          return agent
            .get("/pokemons?name=xxx")
            .expect(200)
            .expect((res) => {
              expect(res.body).to.be.deep.equal({"message":"Lo sentimos no se encontro tu pokemon"});
            });
          });
        });
        describe("GET /pokemons/:id", () => {
          it("responds with  a id message, Lo sentimos no se encontro tu pokemon", () => {
            return agent
              .get("/pokemons/1")
              .expect(200)
              .expect((res) => {
                expect(res.body[0].name).to.be.deep.equal("bulbasaur");
              });
            });
          });
          it("crea una page en la base de datos", function () {
            return agent
              .post("/pokemons")
              .send({
                name: "henry",
                image:"https://www.ecestaticos.com/image/clipping/4eb2fe1b771826cf037b432e11352dea/la-curiosa-historia-del-perro-que-ayudo-a-una-mujer-enferma-a-volver-a-mover-el-brazo.jpg",
                id:"d21d3546-dd8d-4965-b02c-e1d8f10452f9",
                type:"poison",
                life:34,
                force:23,
                defense:12,
                velocity:11,
                height:11,
                weight:78
              
              })
              .then(() => {
                return Pokemon.findOne({
                  where: {
                    name: "henry",
                  },
                });
              })
              .then((pokemon) => {
                expect(pokemon).to.exist;
              });
          });


