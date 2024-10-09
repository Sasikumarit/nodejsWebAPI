module.exports = (app) => {
    const jobs = require("../controllers/jobs.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Job
    router.post("/", jobs.create);
  
    // Retrieve alls Job
    router.get("/", jobs.findAll);
  
    // Retrieve a single Job with id
    router.get("/:id", jobs.findOne);

    // Retrieve a single Job with id
    router.get("/findUser/:userid", jobs.findUser);

    // Retrieve a single findAppliedUser with id
    router.get("/findAppliedUser/:id", jobs.findAppliedUser);

    // Retrieve a single findAppliedUser with id
    router.get("/findAllAppliedUser/:id", jobs.findAllAppliedUser);

    // Retrieve a single findAppliedUser with id
    router.get("/findJobByUser/:id", jobs.findJobByUser);

     // Update a Job with id
    router.put("/:id", jobs.update);
  
    // Delete a Job with id
    router.delete("/:id", jobs.delete);
  
    // Delete all Jobs
    router.delete("/", jobs.deleteAll);
  
    app.use("/jobs", router);
  };
  