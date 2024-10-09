const Jobseeker = require("../models/jobseeker.model.js");
const jwt = require("jsonwebtoken");
// Create and Save a new Jobseeker
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      status: 400,
      error: "Content can not be empty!",
    });
  }

  // Create a Jobseeker
  const jobseeker = new Jobseeker({
    id: req.body.id,
    jobseekername: req.body.jobseekername,
    location: req.body.location,
    mobileno: req.body.mobileno,
    email: req.body.email,
    yearofxp: req.body.yearofxp,
    applieduserid: req.body.applieduserid,
    jobid: req.body.jobid,
  });
  try {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = req.get("Authorization");
    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      // Save Jobseeker in the database
      Jobseeker.create(jobseeker, (err, data) => {
        if (err)
          res.status(500).send({
            status: 500,
            error:
              err.message ||
              "Some error occurred while creating the Jobseeker.",
          });
        else
          res.send({
            status: 200,
            error: null,
            response: "Created Successfully",
          });
      });
    }
  } catch (err) {
    res.status(500).send({
      status: 500,
      error: err.message || "Some error occurred while creating the Jobseeker.",
    });
  }
};

// Retrieve all Users from the database (with condition).
exports.findAll = (req, res) => {
  const id = req.query.id;
  try {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = req.get("Authorization");
    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      Jobseeker.getAll(id, (err, data) => {
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

// Find a single Jobseeker by Id
exports.findOne = (req, res) => {
  try {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = req.get("Authorization");
    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      Jobseeker.findById(req.params.id, (err, results) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              status: 404,
              error: `Not found Jobseeker with id ${req.params.id}.`,
            });
          } else {
            res.status(500).send({
              status: 500,
              error: "Error retrieving Jobseeker with id " + req.params.id,
            });
          }
        } else
          res.send({
            status: 200,
            error: null,
            response: results,
          });
      });
    }
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        status: 404,
        error: `Not found Jobseeker with id ${req.params.id}.`,
      });
    } else {
      res.status(500).send({
        status: 500,
        error: "Error retrieving Jobseeker with id " + req.params.id,
      });
    }
  }
};

// Find a findUser
exports.findAppliedUserById = (req, res) => {
  try {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = req.get("Authorization");
    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      Jobseeker.findAppliedUserId(req.params.applieduserid, (err, results) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              status: 404,
              error: `Not found job with applieduserid ${req.params.applieduserid}.`,
            });
          } else {
            res.status(500).send({
              status: 500,
              error:
                "Error retrieving job with applieduserid " +
                req.params.applieduserid,
            });
          }
        } else
          res.send({
            status: 200,
            error: null,
            response: results,
          });
      });
    }
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        status: 404,
        error: `Not found job with applieduserid ${req.params.applieduserid}.`,
      });
    } else {
      res.status(500).send({
        status: 500,
        error:
          "Error retrieving job with applieduserid " + req.params.applieduserid,
      });
    }
  }
};

exports.findAppliedCandidate = (req, res) => {
  try {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = req.get("Authorization");
    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      Jobseeker.findAppliedCandidateById(req.params.id, (err, results) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              status: 404,
              error: `Not found job with applieduserid ${req.params.id}.`,
            });
          } else {
            res.status(500).send({
              status: 500,
              error: "Error retrieving job with applieduserid " + req.params.id,
            });
          }
        } else
          res.send({
            status: 200,
            error: null,
            response: results,
          });
      });
    }
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        status: 404,
        error: `Not found job with applieduserid ${req.params.id}.`,
      });
    } else {
      res.status(500).send({
        status: 500,
        error: "Error retrieving job with applieduserid " + req.params.id,
      });
    }
  }
};

exports.findAllAppliedCandidate = (req, res) => {
  try {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = req.get("Authorization");
    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      Jobseeker.findAllAppliedCandidateById("1", (err, results) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              status: 404,
              error: `Not found job with applieduserid ${req.params.id}.`,
            });
          } else {
            res.status(500).send({
              status: 500,
              error: "Error retrieving job with applieduserid " + req.params.id,
            });
          }
        } else
          res.send({
            status: 200,
            error: null,
            response: results,
          });
      });
    }
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        status: 404,
        error: `Not found job with applieduserid ${req.params.id}.`,
      });
    } else {
      res.status(500).send({
        status: 500,
        error: "Error retrieving job with applieduserid " + req.params.id,
      });
    }
  }
};

// Update a Jobseeker identified by the id in the request
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
      Jobseeker.updateById(
        req.params.id,
        new Jobseeker(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                error: `Not found Jobseeker with id ${req.params.id}.`,
              });
            } else {
              res.status(500).send({
                error: "Error updating Jobseeker with id " + req.params.id,
              });
            }
          } else
            res.send({
              status: 200,
              error: null,
              response: data,
            });
        }
      );
    }
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        error: `Not found Jobseeker with id ${req.params.id}.`,
      });
    } else {
      res.status(500).send({
        error: "Error updating Jobseeker with id " + req.params.id,
      });
    }
  }
};

// Delete a Jobseeker with the specified id in the request
exports.delete = (req, res) => {
  try {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = req.get("Authorization");
    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      Jobseeker.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              status: 404,
              error: `Not found Jobseeker with id ${req.params.id}.`,
            });
          } else {
            res.status(500).send({
              status: 500,
              error: "Could not delete Jobseeker with id " + req.params.id,
            });
          }
        } else
          res.send({
            status: 200,
            error: null,
            message: `Jobseeker was deleted successfully!`,
          });
      });
    }
  } catch (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        status: 404,
        error: `Not found Jobseeker with id ${req.params.id}.`,
      });
    } else {
      res.status(500).send({
        status: 500,
        error: "Could not delete Jobseeker with id " + req.params.id,
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
      Jobseeker.removeAll((err, data) => {
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
