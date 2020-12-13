const express = require("express");
var con = require("./database");
var fetchData = require("./fetchData");
var Sql = require("./Sql");
const popup = require('node-popup');



const mySql = new Sql();

const cors = require("cors");
const app = express();

const api_id = "81d135abffd9dd9e927e4df49214b464";
let url = `http://api.kursna-lista.info/${api_id}/kursna_lista/json`;

app.use(cors());
app.use(express.json());

app.listen(3001, () => {
  console.log("Running on port 3001");
});

app.get("/api/get", function (req, res, next) {
  mySql.getSql(res);
});



app.post("/api/insert", (req, res) => {
  let countsql = mySql.countSql();
  con.query(countsql, (err, result) => {
    if (err) throw err;
    let brojac = result[0].brojac;
    if (brojac > 0) {
      mySql.updateSql();
      let insertsql = mySql.insertSql();
      fetchData(url, insertsql, res);
    } else {
      let insertsql = mySql.insertSql();
      fetchData(url, insertsql, res);
    }
  });
});

app.delete("/api/delete", function (req, res, next) {
  let deleteAll = mySql.deleteSql();
  let countsql = mySql.countSql();
  con.query(countsql, (err, result) => {
    if (err) throw err;
    let brojac = result[0].brojac;
    if (brojac > 0) {
      deleteAll
    } else {
    
    }
  });
});
