const mysql = require("mysql");

var con = mysql.createPool({
  host: "eu-cdbr-west-03.cleardb.net",
  user: "b28807ec9370cf",
  password: "53c8cb0b",
  database: "heroku_710101e64cc14fa",
});
/*
dsadsa
*/

module.exports = con;
