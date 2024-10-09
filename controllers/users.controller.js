const User = require("../models/users.model.js");
const jwt = require("jsonwebtoken");

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      status: 400,
      error: "Content can not be empty!",
    });
  }

  // Create a User
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    mobileno: req.body.mobileno,
    password: req.body.password,
    confirmpassword: req.body.confirmpassword,
    userrole: req.body.userrole,
  });

  try {
    // Save User in the database
    User.create(user, (err, data) => {
      if (err)
        res.status(500).send({
          status: 500,
          error: err.message || "Some error occurred while creating the User.",
        });
      else
        res.send({
          status: 200,
          error: null,
          response: "Created Successfully",
        });
    });
  } catch (err) {
    res.status(500).send({
      status: 500,
      error: err.message || "Some error occurred while creating the User.",
    });
  }
};

// Retrieve all Users from the database (with condition).
exports.findAll = (req, res) => {
  const email = req.query.email;
  try {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = req.get("Authorization");
    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      User.getAll(email, (err, data) => {
        if (err)
          res.status(500).send({
            status: 500,
            error: err.message || "Some error occurred while retrieving users.",
          });
        else
          res.send({
            status: 200,
            error: null,
            response: data,
          });
      });
    }
  } catch (err) {
    res.status(500).send({
      status: 500,
      error: err.message || "Some error occurred while retrieving users.",
    });
  }
};

// Find a single User by Id
exports.findOne = (req, res) => {
  try {
    User.findById(req.params.id, (err, results) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            status: 404,
            error: `Not found User with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            status: 500,
            error: "Error retrieving User with id " + req.params.id,
          });
        }
      } else {
        if (results.length !== 0) {
          let jwtSecretKey = process.env.JWT_SECRET_KEY;
          let data = {
            time: Date(),
            id: results.id,
          };
          const token = jwt.sign(data, jwtSecretKey);
          res.send({
            status: 200,
            error: null,
            response: { ...results, token: token },
          });
        } else {
          return res
            .status(404)
            .send({ status: 404, error: "Please Check Email and Password." });
        }
      }
    });
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        status: 404,
        error: `Not found User with id ${req.params.id}.`,
      });
    } else {
      res.status(500).send({
        status: 500,
        error: "Error retrieving User with id " + req.params.id,
      });
    }
  }
};

// Find a single User by Id
exports.findLoginUser = (req, res) => {
  try {
    User.findLogin(req.body.email, req.body.password, (err, results) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            status: 404,
            error: `Not found User with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            status: 500,
            error: "Error retrieving User with id " + req.params.id,
          });
        }
      } else {
        if (results.length !== 0) {
          let jwtSecretKey = process.env.JWT_SECRET_KEY;
          let data = {
            time: Date(),
            id: results.id,
          };
          const token = jwt.sign(data, jwtSecretKey);
          res.send({
            status: 200,
            error: null,
            response: { ...results, token: token },
          });
        } else {
          return res
            .status(404)
            .send({ status: 404, error: "Please Check Email and Password." });
        }
      }
    });
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        status: 404,
        error: `Not found User with id ${req.params.id}.`,
      });
    } else {
      res.status(500).send({
        status: 500,
        error: "Error retrieving User with id " + req.params.id,
      });
    }
  }
};

// Update a User identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      status: 400,
      error: "Content can not be empty!",
    });
  }

  try {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = req.get("Authorization");
    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      User.updateById(req.params.id, new User(req.body), (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              error: `Not found User with id ${req.params.id}.`,
            });
          } else {
            res.status(500).send({
              error: "Error updating User with id " + req.params.id,
            });
          }
        } else
          res.send({
            status: 200,
            error: null,
            response: data,
          });
      });
    }
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        error: `Not found User with id ${req.params.id}.`,
      });
    } else {
      res.status(500).send({
        error: "Error updating User with id " + req.params.id,
      });
    }
  }
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  try {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = req.get("Authorization");
    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      User.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              status: 404,
              error: `Not found User with id ${req.params.id}.`,
            });
          } else {
            res.status(500).send({
              status: 500,
              error: "Could not delete User with id " + req.params.id,
            });
          }
        } else
          res.send({
            status: 200,
            error: null,
            message: `User was deleted successfully!`,
          });
      });
    }
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        status: 404,
        error: `Not found User with id ${req.params.id}.`,
      });
    } else {
      res.status(500).send({
        status: 500,
        error: "Could not delete User with id " + req.params.id,
      });
    }
  }
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  try {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = req.get("Authorization");
    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      User.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            status: 500,
            error:
              err.message || "Some error occurred while removing all users.",
          });
        else
          res.send({
            status: 200,
            error: null,
            message: `All Users were deleted successfully!`,
          });
      });
    }
  } catch (err) {
    res.status(500).send({
      status: 500,
      error: err.message || "Some error occurred while removing all users.",
    });
  }
};
