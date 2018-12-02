const User = require('../models/user.model');

// Create and Save a new Note
exports.create = (req, res) => {
  // Validate request
  // if(!req.body.content) {
  //   return res.status(400).send({
  //     message: "Note content can not be empty"
  //   });
  // }

  console.log(req.body);

  // Create a Note
  const user = new User({
    firstName: req.body.firstName, 
    lastName: req.body.lastName,
    nickname: req.body.nickname,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password
  });

  // Save User in the database
  user.save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Employee."
      });
    });
};

// Retrieve and return all employers from the database.
exports.findAll = (req, res) => {
  User.find()
    .then(employers => {
      res.send(employers);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving employers."
      });
    });
};

// Find a single employee with a userId
exports.findOne = (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      console.log(user, !user);
      if (!user) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.userId
        });            
      }

      res.send(user);
    })
    .catch(err => {
      if(err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Note not found with id " + req.params.userId
        });                
      }

      return res.status(500).send({
        message: "Error retrieving note with id " + req.params.userId
      });
    });
};

// Update a employee identified by the employeeId in the request
exports.update = (req, res) => {
  console.log(req.body);
  User.findOneAndUpdate(req.params.userId, {
    firstName: req.body.firstName, 
    lastName: req.body.lastName,
    nickname: req.body.nickname,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password
  }, { new: true })
    .then(user => {
      if(!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId
        });
      }
      res.send(user);
    })
  .catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
        message: "Note not found with id " + req.params.userId
      });                
    }

    return res.status(500).send({
      message: "Error updating note with id " + req.params.userId
    }); 
  });
};

// Delete a employee with the specified employeeId in the request
exports.delete = (req, res) => {

};

// Employee ----

