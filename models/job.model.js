const sql = require("./db.js");

// constructor
const Jobs = function (job) {
  //this.id = job.id;
  this.jobdescription = job.jobdescription;
  this.wageperday = job.wageperday;
  this.location = job.location;
  this.fromdate = job.fromdate;
  this.todate = job.todate;
  this.userid = job.userid;
};

Jobs.create = (newJob, result) => {
  sql.query("INSERT INTO jobs SET ?", newJob, (err, res) => {
    if (err) {
      // console.log("error: ", err);
      result(err, null);
      return;
    }
    //console.log("created jobs: ", { id: res.insertId, ...newJob });
    result(null, { ...newJob });
  });
};

Jobs.findById = (id, result) => {
  sql.query(`SELECT * FROM jobs WHERE id = ${id}`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res[0]);
      return;
    }

    // not found Job with the id
    result({ kind: "not_found" }, null);
  });
};

Jobs.findUserId = (userid, result) => {
  sql.query(
    `SELECT row_number() over(order by js.id) as sno,js.*,us.username FROM jobs js inner join user_details us on js.userid=us.id WHERE js.userid= ${userid}`,
    (err, res) => {
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
    }
  );
};

Jobs.findAppliedUserById = (id, result) => {
  sql.query(
    `SELECT row_number() over(order by js.id) as sno,js.*,us.username FROM jobs js 
  inner join job_seeker jbs on jbs.jobid=js.id 
  inner join user_details us on js.userid=us.id 
  WHERE jbs.applieduserid=${id}`,
    (err, res) => {
      if (err) {
        // console.log("error: ", err);
        result(err, []);
        return;
      }
      if (res?.length) {
        //console.log("found job: ", res[0]);
        result(null, res);
        return;
      }

      // not found Job with the id
      result({ kind: "not_found" }, []);
    }
  );
};

Jobs.findAllAppliedUserById = (id, result) => {
  sql.query(
    `SELECT row_number() over(order by js.id) as sno,js.*,us.username FROM jobs js 
  inner join job_seeker jbs on jbs.jobid=js.id 
  inner join user_details us on js.userid=us.id`,
    (err, res) => {
      if (err) {
        // console.log("error: ", err);
        result(err, []);
        return;
      }
      if (res.length) {
        //console.log("found job: ", res[0]);
        result(null, res);
        return;
      }

      // not found Job with the id
      result({ kind: "not_found" }, []);
    }
  );
};

Jobs.findJobByUserId = (id, result) => {
  sql.query(
    `select row_number() over(order by js.id) as sno,js.*,us.username from jobs js inner join user_details us on js.userid=us.id where js.id not in(select jb.id from jobs jb inner join job_seeker js on jb.id = js.jobid where js.applieduserid=${id})`,
    (err, res) => {
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
    }
  );
};

Jobs.getAll = (id, result) => {
  let query =
    "select row_number() over(order by js.id) as sno,js.*,us.username from jobs js left join user_details us on js.userid=us.id";

  if (id) {
    query += ` WHERE id '%${id}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      // console.log("error: ", err);
      result(null, err);
      return;
    }

    //console.log("jobs: ", res);
    result(null, res);
  });
};

Jobs.updateById = (id, job, result) => {
  sql.query(
    "UPDATE jobs SET jobdescription = ?, wageperday = ?, location = ?,  fromdate = ?, todate = ?,userid=? WHERE id = ?",
    [
      job.jobdescription,
      job.wageperday,
      job.location,
      job.fromdate,
      job.todate,
      job.userid,
      id,
    ],
    (err, res) => {
      if (err) {
        // console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Jobs with the id
        result({ kind: "not_found" }, null);
        return;
      }

      // console.log("updated jobs: ", { id: id, ...job });
      result(null, job);
    }
  );
};

Jobs.remove = (id, result) => {
  sql.query("DELETE FROM jobs WHERE id = ?", id, (err, res) => {
    if (err) {
      // console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Job with the id
      result({ kind: "not_found" }, null);
      return;
    }

    //console.log("deleted job with id: ", id);
    result(null, res);
  });
};

Jobs.removeAll = (result) => {
  sql.query("DELETE FROM jobs", (err, res) => {
    if (err) {
      // console.log("error: ", err);
      result(null, err);
      return;
    }

    //console.log(`deleted ${res.affectedRows} jobs`);
    result(null, res);
  });
};

module.exports = Jobs;
