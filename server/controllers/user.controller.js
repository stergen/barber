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
 *
 * @apiError (Error 400) {String} message Contain information
 * why the server can't process your request
 *
 * @apiError (Error 500) {String} message Contain information
 * why the server can't create User
 */
module.exports.create = (req, res) => {
  checkingUserData(req.body, res, userSchema);

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
      res.status(200).send({ user, auth: true, token });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
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
 *
 * @apiError (Error 500) {String} message Contain information
 * why the server can't return Users
 */
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
 *
 * @apiError (Error 404) {String} message Can't find User with <code>id</code>
 * @apiError (Error 500) {String} message Contain information
 * why the server can't return User
 */
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
 *
 * @apiError (Error 404) {String} message Can't find User with <code>id</code>
 * @apiError (Error 500) {String} message Contain information
 * why the server can't update User
 */
module.exports.update = (req, res) => {
  checkingUserData(req.body, res, userSchema);

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
      res.status(200).send({
        message: `User ${req.params.userId} updated`
      });
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: `User not found with id ${req.params.userId}`
        });
      }

      return res.status(500).send({
        message: `Error updating User with id ${req.params.userId}`
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
 *
 * @apiError (Error 404) {String} message Can't find User with <code>id</code>
 * @apiError (Error 500) {String} message Contain information
 * why the server can't delete User
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
          message: `User not found with id ${req.params.userId}`
        });
      }

      return res.status(500).send({
        message: `Error retrieving user with id ${req.params.userId}`
      });
    });
};

/**
 * @api {get} /users/me Get current User information
 * @apiName GetCurrentUser
 * @apiGroup Users
 *
 * @apiSuccess {Object} name            User full name.
 * @apiSuccess {String} name.first      Firstname of the User.
 * @apiSuccess {String} name.last       Lastname of the User.
 * @apiSuccess {String} users.phone     Phone of the User.
 * @apiSuccess {String} users.password  Password of the User.
 *
 * @apiError (Error 401) {String} message Can't get
 * <code>token</code> check your <code>x-access-token</code>.
 * @apiError (Error 404) {String} message Can't find User
 * @apiError (Error 500) {String} message Contain information
 * why the server can't authenticate token.
 */
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

/**
 * @api {post} /users/login Login User
 * @apiName LoginUser
 * @apiGroup Users
 *
 * @apiParam {String} phone User phone number.
 * @apiParam {String} password User password.
 *
 * @apiSuccess {Bool} auth
 * @apiSuccess {String} token User token.
 * @apiSuccess {Object} user              List of Users.
 * @apiSuccess {Object} user.name         User full name.
 * @apiSuccess {String} user.name.first   Firstname of the User
 * @apiSuccess {String} user.name.last    Lastname of the User
 * @apiSuccess {String} user.phone        Phone of the User
 * @apiSuccess {String} user.password     Password of the User
 *
 * @apiError (Error 400) {String} message Contain information
 * why the server can't process your request
 *
 * @apiError (Error 500) {String} message Contain information
 * why the server can't create User
 */
module.exports.login = (req, res) => {
  checkingUserData(req.body, res, userSchema.optionalKeys("firstName"));

  User.find({ phone: req.body.phone })
    .then(user => {
      const token = jwt.sign({ id: user._id }, secret, {
        expiresIn: 86400
      });
      res.status(200).send({ user, auth: true, token });
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: `User not found with phone ${req.body.phone}`
        });
      }

      return res.status(500).send({
        message: `Error retrieving user with phone ${req.body.phone}`
      });
    });
};

/**
 * @api {get} /users/logout Logout User
 * @apiName LogoutUser
 * @apiGroup Users
 *
 * @apiSuccess {Bool} auth will return false
 * @apiSuccess {String} token will return null
 */
module.exports.logout = (req, res) =>
  res.status(200).send({ auth: false, token: null });

function checkingUserData(body, res, userSchema) {
  const result = Joi.validate(body, userSchema, { abortEarly: false });

  if (result.error === null) return true;

  res.status(400).send({
    message: result.error.toString()
  });
}
