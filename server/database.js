const mysql = require("mysql");

var con = mysql.createPool({
  host: "eu-cdbr-west-03.cleardb.net",
  user: "bfc49af198503e",
  password: "a68322c4",
  database: "heroku_1e1e467a1f62631",
});


module.exports = con;
