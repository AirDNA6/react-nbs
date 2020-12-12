const mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nbs",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connect to the database");
});

module.exports = con;
