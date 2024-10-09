const sql = require("./db.js");

// constructor
const Jobseeker = function(jobseeker) {
  //this.id = jobseeker.id;
  this.jobseekername = jobseeker.jobseekername;
  this.location = jobseeker.location;
  this.mobileno = jobseeker.mobileno;
  this.email = jobseeker.email;
  this.yearofxp = jobseeker.yearofxp;
  this.applieduserid = jobseeker.applieduserid;
  this.jobid=jobseeker.jobid;
};

Jobseeker.create = (newJobseeker, result) => {
  sql.query("INSERT INTO job_seeker SET ?", newJobseeker, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
   //console.log("created jobseeker: ", { userid: res.insertId, ...newJobseeker });
    result(null, {...newJobseeker });
  });
};

Jobseeker.findById = (id, result) => {
  sql.query(`SELECT * FROM job_seeker WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    // not found Jobseeker with the id
    result({ kind: "not_found" }, null);
  });
};

Jobseeker.findAppliedUserId = (applieduserid, result) => {
  sql.query(`SELECT row_number() over(order by id) as sno,* FROM job_seeker WHERE applieduserid = ${applieduserid}`, (err, res) => {
    if (err) {
      // console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      //console.log("found job: ", res[0]);
      result(null, res);
      return;
    }

    // not found Job with the id
    result({ kind: "not_found" }, null);
  });
};

Jobseeker.findAppliedCandidateById = (id, result) => {
  sql.query(`select row_number() over(order by js.id) as sno,js.jobid 
  , js.id, js.jobseekername, js.location, js.mobileno, js.email as email, js.yearofxp,js.applieduserid,j.userid
  , ud2.username, ud2.email as useremail
  from job_seeker js
  inner join jobs j on js.jobid = j.id
  inner join user_details ud1 on js.applieduserid = ud1.id
  inner join user_details ud2 on j.userid = ud2.id
where  j.userid = ${id}`, (err, res) => {
    if (err) {
      // console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      //console.log("found job: ", res[0]);
      result(null, res);
      return;
    }

    // not found Job with the id
    result({ kind: "not_found" }, null);
  });
};

Jobseeker.findAllAppliedCandidateById = (id, result) => {
  sql.query(`select row_number() over(order by js.id) as sno,js.jobid 
  , js.id, js.jobseekername, js.location, js.mobileno, js.email as email, js.yearofxp,js.applieduserid,j.userid
  , ud2.username, ud2.email as useremail,j.jobdescription
  from job_seeker js
  inner join jobs j on js.jobid = j.id
  inner join user_details ud1 on js.applieduserid = ud1.id
  inner join user_details ud2 on j.userid = ud2.id`, (err, res) => {
    if (err) {
      // console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      //console.log("found job: ", res[0]);
      result(null, res);
      return;
    }

    // not found Job with the id
    result({ kind: "not_found" }, null);
  });
};


Jobseeker.getAll = (id, result) => {
  let query = "SELECT row_number() over(order by js.id) as sno,js.* FROM job_seeker js";

  if (id) {
    query += ` WHERE js.id '%${id}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    //console.log("user_details: ", res);
    result(null, res);
  });
};

Jobseeker.updateById = (id, jobseeker, result) => {
  sql.query(
    "UPDATE job_seeker SET jobseekername = ?, location = ?, mobileno = ?,  email = ?, yearofxp = ?,applieduserid=?,jobid=? WHERE id = ?",
    [
      jobseeker.jobseekername,
      jobseeker.location,
      jobseeker.mobileno,
      jobseeker.email,
      jobseeker.yearofxp,
      jobseeker.applieduserid,
      jobseeker.jobid,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Jobseeker with the id
        result({ kind: "not_found" }, null);
        return;
      }

     // console.log("updated jobseeker: ", { id: id, ...jobseeker });
      result(null, { id: id, ...jobseeker });
    }
  );
};

Jobseeker.remove = (id, result) => {
  sql.query("DELETE FROM job_seeker WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Jobseeker with the id
      result({ kind: "not_found" }, null);
      return;
    }

    //console.log("deleted jobseeker with id: ", id);
    result(null, res);
  });
};

Jobseeker.removeAll = result => {
  sql.query("DELETE FROM job_seeker", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    //console.log(`deleted ${res.affectedRows} user_details`);
    result(null, res);
  });
};

module.exports = Jobseeker;