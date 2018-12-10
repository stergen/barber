const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { secret } = require("../config/auth.config");

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

// Retrieve and return all user from the database.
module.exports.findAll = (req, res) => {
  User.find()
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users."
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
  const { firstName, phone, password } = body;

  if (!firstName || !phone || !password) {
    res.status(400).send({
      message: "User should be have: firstName, phone and password"
    });

    return false;
  }

  return true;
}
