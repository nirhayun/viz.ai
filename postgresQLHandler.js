const DbConnection = require("./dbConnection.js");

class PostgresQLHandler {
  constructor() {
    this.initialize();
  }

  async initialize() {
    this.client = new DbConnection().getInstance();
  }

  executeQuery(query) {
    this.client.query(query, function (err, res) {
      if (err) {
        console.log(err);
        return false;
      }
      return true;
    });
  }

  getAllScansFromDB(callback) {
    var get_scans_query = `SELECT * FROM public.scans WHERE type='NCCT' OR type='CTA' OR type='CTP'`;
    
    this.client.query(get_scans_query, function (err, res) {
      if (err) {
        return callback({ status: "error", message: err.message });
      }
      return callback(res.rows);
    });
  }

  getScanFromDB(scan_id, callback) {
    var get_scan_query = `SELECT * FROM public.scans WHERE id='${scan_id}'`;
    
    this.client.query(get_scan_query, function (err, res) {
      if (err) {
        return callback({ status: "error", message: err.message });
      }
      return callback(res.rows);
    });
  }

  getAllScansOfPatientFromDB(patient_id, callback) {
    var get_scan_query = `SELECT * FROM public.scans WHERE patient_id='${patient_id}'`;
    
    this.client.query(get_scan_query, function (err, res) {
      if (err) {
        return callback({ status: "error", message: err.message });
      }
      return callback(res.rows);
    });
  }

  updatePatient(id, name, gender, callback) {
    var update_query = `UPDATE public.patient SET name='${name}', gender='${gender}' WHERE id='${id}'`;
    
    this.client.query(update_query, function (err, res) {
      if (err) {
        return callback({ status: "error", message: err.message });
      }
      return callback(res.rows);
    });
  }

  updatePatient(id, callback) {
    var delete_query = `DELETE FROM public.patient WHERE id='${id}'`;
    
    this.client.query(delete_query, function (err, res) {
      if (err) {
        return callback({ status: "error", message: err.message });
      }
      return callback(res.rows);
    });
  }

};


module.exports = PostgresQLHandler;
