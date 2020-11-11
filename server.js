
const express = require('express')
const server = express()
const port = 3000
const PostgresQLHandler = require("./postgresQLHandler.js");

server.get("/api/get_all_scans", (req, res) => { // I made sure that the scans are of type NCCT, CTA or CTP in the query, should I limit it ibn the DB to enums?
    var postgresQLHandler = new PostgresQLHandler();
    postgresQLHandler.getAllScansFromDB(function (r) {
        if (r.status == "error") {
            res.status(500);
            res.json({
                status: "error",
                message: r.message,
            });
        } else {
            res.json({
                status: "success",
                message: r,
            });
        }
    });
});

server.get("/api/get_scan", (req, res) => {
    var scan_id = JSON.parse(JSON.stringify(req.query)).id;
    var postgresQLHandler = new PostgresQLHandler();
    postgresQLHandler.getScanFromDB(scan_id, function (r) {
        if (r.status == "error") {
            res.status(500);
            res.json({
                status: "error",
                message: r.message,
            });
        } else {
            res.json({
                status: "success",
                message: r,
            });
        }
    });
});

server.get("/api/get_scans_of_patient", (req, res) => {
    var patient_id = JSON.parse(JSON.stringify(req.query)).patient_id;
    var postgresQLHandler = new PostgresQLHandler();
    postgresQLHandler.getAllScansOfPatientFromDB(patient_id, function (r) {
        if (r.status == "error") {
            res.status(500);
            res.json({
                status: "error",
                message: r.message,
            });
        } else {
            res.json({
                status: "success",
                message: r,
            });
        }
    });
});

server.post("/api/update_patient", (req, res) => { //When we update a patient we should get from the user all the fields? or only some of them? 
    var id = JSON.parse(JSON.stringify(req.query)).id;
    var name = JSON.parse(JSON.stringify(req.query)).name;
    var gender = JSON.parse(JSON.stringify(req.query)).gender; // I wasn't sure if I should limit in the DB the values only to male and female or allow other as well or just leave it open with a 6 charechters limit
    var postgresQLHandler = new PostgresQLHandler();  // This is a code duplication, I would have extracted it into a function if I had more time
    postgresQLHandler.updatePatient(id, name, gender, function (r) {
        if (r.status == "error") {
            res.status(500);
            res.json({
                status: "error",
                message: r.message,
            });
        } else {
            res.json({
                status: "success",
                message: "Successfully updated patient",
            });
        }
    });
});

server.delete("/api/delete_patient", (req, res) => {
    var id = JSON.parse(JSON.stringify(req.query)).id;
    var postgresQLHandler = new PostgresQLHandler();
    postgresQLHandler.updatePatient(id, function (r) {
        if (r.status == "error") {
            res.status(500);
            res.json({
                status: "error",
                message: r.message,
            });
        } else {
            res.json({
                status: "success",
                message: "Successfully deleted patient",
            });
        }
    });
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})