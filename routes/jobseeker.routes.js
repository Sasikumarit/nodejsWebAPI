module.exports = (app) => {
  const jobseeker = require("../controllers/jobseeker.controller.js");

  var router = require("express").Router();

  // Create a new Jobseeker
  router.post("/", jobseeker.create);

  // Retrieve all Jobseekers
  router.get("/", jobseeker.findAll);

  // Retrieve a single Jobseeker with id
  router.get("/:id", jobseeker.findOne);

  // Retrieve a single Jobs with id
  router.get("/findAppliedUser/:id", jobseeker.findAppliedUserById);

  router.get("/findAppliedCandidate/:id", jobseeker.findAppliedCandidate); 
   
  router.get("/findAllAppliedCandidate/:id", jobseeker.findAllAppliedCandidate);  

  // Update a Jobseeker with id
  router.put("/:id", jobseeker.update);

  // Delete a Jobseeker with id
  router.delete("/:id", jobseeker.delete);

  // Delete all Jobseekers
  router.delete("/", jobseeker.deleteAll);

  app.use("/jobseeker", router);
};
