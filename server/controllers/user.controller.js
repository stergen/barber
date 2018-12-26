const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const User = require("../models/user.model");
const { secret } = require("../config/auth.config");

const userSchema = Joi.object().keys({
  firstName: Joi.string()
    .regex(/^[a-zA-Zа-яА-Я]{3,30}$/)
    .min(2)
    .required(),
  lastName: Joi.string()
    .regex(/^[a-zA-Zа-яА-Я]{3,30}$/)
    .min(2),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  phone: Joi.string().required(),
  email: Joi.string().email({ minDomainAtoms: 2 })
});

// Create and save new user to the database
module.exports.create = (req, res) => {
  if (!checkingUserData(req.body, res)) return;

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
        expiresIn: 86400
      });
      res.status(200).send({ auth: true, token });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });

  return user;
};

// Retrieve and return all user from the database.
module.exports.findAll = (req, res) => {
  User.find()
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};

// Find a single user with a userId
module.exports.findOne = (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: `User not found with id ${req.params.userId}`
        });
      }

      res.send(user);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: `User not found with id ${req.params.userId}`
        });
      }

      return res.status(500).send({
        message: `Error retrieving user with id ${req.params.userId}`
      });
    });
};

// Update a user identified by the userId in the request
module.exports.update = (req, res) => {
  if (!checkingUserData(req.body, res)) return;

  User.findOneAndUpdate(
    req.params.userId,
    {
      name: {
        first: req.body.firstName,
        last: req.body.lastName
      },
      password: bcrypt.hashSync(req.body.password, 10),
      phone: req.body.phone,
      email: req.body.email
    },
    { new: true }
  )
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: `User not found with id ${req.params.userId}`
        });
      }
      res.send(user);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: `User not found with id ${req.params.userId}`
        });
      }

      return res.status(500).send({
        message: `Error updating user with id ${req.params.userId}`
      });
    });
};

// Delete a user with the specified userId in the request
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

// Get user data by of token
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

function checkingUserData(body, res) {
  const result = Joi.validate(body, userSchema, { abortEarly: false });

  if (result.error === null) return true;

  res.status(400).send({
    message: result.error.toString()
  });

  return false;
}
