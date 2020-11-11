const { Client } = require("pg");

class DbConnection {
  constructor() {
    if (!DbConnection.instance) {
      DbConnection.instance = new Client({
        user: "postgres",
        host: "127.0.0.1",
        database: "postgres",
        password: "zadara",
        port: "5432",
      });

      DbConnection.instance.connect();
    }
  }

  getInstance() {
    return DbConnection.instance;
  }
}

module.exports = DbConnection;
