const chai = require("chai");
const chaiHttp = require("chai-http");
const User = require("../models/user.model");
const server = require("../../app");

const should = chai.should(); //eslint-disable-line

chai.use(chaiHttp);

const user = {
  firstName: "Stergen",
  phone: "+123456789",
  password: "1234"
};

//Our parent block
describe("Users", () => {
  beforeEach(done => {
    User.remove({}, () => {
      done();
    });
  });

  describe("/GET users", () => {
    it("it should GET all the users", done => {
      chai
        .request(server)
        .get("/users")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it("it should GET one the user", done => {
      const newUser = new User({
        name: {
          first: user.firstName
        },
        password: user.password,
        phone: user.phone
      });

      newUser.save();

      chai
        .request(server)
        .get(`/users/${newUser._id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");

          res.body.should.have.property("name");
          res.body.name.should.be.a("object");
          res.body.name.should.have.property("first").eql(user.firstName);

          res.body.should.have.property("phone").eql(user.phone);
          res.body.should.have.property("password").eql(user.password);

          done();
        });
    });

    it("it shouldn't GET the user", done => {
      chai
        .request(server)
        .get("/users/someFakeId")
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          done();
        });
    });
  });

  describe("/POST user", () => {
    it("it should POST user with all needed fields", done => {
      let user = {
        firstName: "Stergen",
        phone: "+123456789",
        password: "1234"
      };
      chai
        .request(server)
        .post("/users")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("user");
          res.body.should.have.property("auth");
          res.body.should.have.property("auth").eql(true);
          done();
        });
    });

    it("it should POST user without one field", done => {
      let user = {
        firstName: "Stergen",
        phone: "+123456789"
      };

      chai
        .request(server)
        .post("/users")
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          done();
        });
    });

    it("it should POST user login data", done => {
      const newUser = new User({
        name: {
          first: user.firstName
        },
        password: user.password,
        phone: user.phone
      });

      newUser.save();

      chai
        .request(server)
        .post("/users/login")
        .send({
          phone: user.phone,
          password: user.password
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("user");
          res.body.should.have.property("auth");
          res.body.should.have.property("auth").eql(true);
          done();
        });
    });
  });
});
