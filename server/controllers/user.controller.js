const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { secret } = require("../config/auth.config");

/**
 * @api {post} /users Create user
 * @apiName CreateUser
 * @apiGroup Users
 *
 * @apiParam {String} firstName User firstname.
 * @apiParam {String} phone User phone number.
 * @apiParam {String} password User password.
 *
 * @apiSuccess {Bool} auth
 * @apiSuccess {String} token User token.
 */
module.exports.create = (req, res) => {
  const { firstName, phone, password } = req.body;

  if (!firstName || !phone || !password) {
    return res.status(400).send({
      message: "User should be have: firstName, phone and password"
    });
  }

  const user = new User({
    name: {
      first: req.body.firstName
    },
    phone: req.body.phone,
    password: bcrypt.hashSync(req.body.password, 10)
  });

  user
    .save()
    .then(data => {
      const token = jwt.sign({ id: data._id }, secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User."
      });
    });

  return user;
};

/**
 * @api {get} /users Get all Users
 * @apiName GetUsers
 * @apiGroup Users
 *
 * @apiSuccess {Object[]} users           List of Users.
 * @apiSuccess {Object} users.name        User full name.
 * @apiSuccess {String} users.name.first  Firstname of the User
 * @apiSuccess {String} users.name.last   Lastname of the User
 * @apiSuccess {String} users.phone       Phone of the User
 * @apiSuccess {String} users.password    Password of the User
 */
module.exports.findAll = (req, res) => {
  User.find()
    .then(employers => {
      res.send(employers);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving employers."
      });
    });
};

/**
 * @api {get} /users/:id Get User information
 * @apiName GetUser
 * @apiGroup Users
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {Object} name            User full name.
 * @apiSuccess {String} name.first      Firstname of the User.
 * @apiSuccess {String} name.last       Lastname of the User.
 * @apiSuccess {String} users.phone     Phone of the User
 * @apiSuccess {String} users.password  Password of the User
 */
module.exports.findOne = (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: `Note not found with id ${req.params.userId}`
        });
      }

      res.send(user);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: `Note not found with id ${req.params.userId}`
        });
      }

      return res.status(500).send({
        message: `Error retrieving note with id ${req.params.userId}`
      });
    });
};

/**
 * @api {put} /users/:id Update user information
 * @apiName UpdateUser
 * @apiGroup Users
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiParam {String} firstName         User firstname.
 * @apiParam {String} lastName          User lastname.
 * @apiParam {String} phone             User phone number.
 * @apiParam {String} password          User password.
 *
 * @apiSuccess {String} message         Information
 */
module.exports.update = (req, res) => {
  User.findOneAndUpdate(
    req.params.userId,
    {
      name: {
        first: req.body.firstName,
        last: req.body.lastName
      },
      phone: req.body.phone,
      password: req.body.password
    },
    { new: true }
  )
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: `User not found with id ${req.params.userId}`
        });
      }
      res.status(200).send({
        message: `User ${req.params.userId} updated`
      });
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: `Note not found with id ${req.params.userId}`
        });
      }

      return res.status(500).send({
        message: `Error updating note with id ${req.params.userId}`
      });
    });
};

/**
 * @api {delete} /users/:id Delete User information
 * @apiName DeleteUser
 * @apiGroup Users
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} message Information
 */
module.exports.delete = (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: `User not found with id ${req.params.userId}`
        });
      }

      user.delete().then(() => {
        res.status(200).send({
          message: `User ${req.params.userId} deleted`
        });
      });
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: `Note not found with id ${req.params.userId}`
        });
      }

      return res.status(500).send({
        message: `Error retrieving user with id ${req.params.userId}`
      });
    });
};

module.exports.getUser = (req, res) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).send({ auth: false, message: "No token provided." });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    }

    User.findById(decoded.id, (err, user) => {
      if (err) {
        return res.status(500).send("There was a problem finding the user.");
      }

      if (!user) return res.status(404).send("No user found.");

      res.status(200).send(user);
    });
  });
};

module.exports.logout = (req, res) =>
  res.status(200).send({ auth: false, token: null });
