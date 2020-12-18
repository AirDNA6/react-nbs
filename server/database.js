const mysql = require("mysql");

var con = mysql.createPool({
  host: "eu-cdbr-west-03.cleardb.net",
  user: "bf3270f99b543f",
  password: "e7bb8661",
  database: "heroku_5c7ca100f79586a",
});


module.exports = con;
