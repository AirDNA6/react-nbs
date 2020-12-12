const express = require("express");
const bodyParser = require("body-parser"); //formatira u obliku JSON-a
var con = require("./database");

const cors = require("cors");
const app = express();
const mysql = require("mysql");
const fetch = require("node-fetch");

const api_id = "81d135abffd9dd9e927e4df49214b464";
let url = `http://api.kursna-lista.info/${api_id}/kursna_lista/json`;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); //middleware

const fetchData = (url, sql, res) => {
  fetch(url)
    .then((result) => result.json())
    .then((data) => {
      let kljucevi = Object.entries(data.result);
      kljucevi.shift();
      let arr = [];

      for (let [kljuc, val] of kljucevi) {
        let podaci = Object.values(val).concat(kljuc);
        arr.push(podaci);
      }

      con.query(sql, [arr], (err, result) => {
        if (err) throw err;
        res.send("if Inserted data");
      });
    });
};

app.listen(3001, () => {
  console.log("Running on port 3001");
});

app.get("/api/get", function (req, res, next) {
  var sql =
    "SELECT valuta, kupovni, srednji, prodajni, DATE_FORMAT(datum, '%b %d %Y') AS datum FROM valute WHERE status = 'A' AND datum = CURDATE()";
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  let countsql =
    "SELECT COUNT(*) AS brojac FROM valute WHERE status = 'A' AND datum = CURDATE()";
  con.query(countsql, (err, result, fields) => {
    if (err) throw err;
    let brojac = result[0].brojac;
    if (brojac > 0) {
      let updatesql =
        "UPDATE valute SET status='I' WHERE datum = CURDATE() AND status = 'A'";
      con.query(updatesql, (err, result, fields) => {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
      });
      let insertsql =
        "INSERT INTO valute(kupovni, srednji, prodajni, valuta) VALUES ?";
      fetchData(url, insertsql, res);
    } else {
      let insertsql =
        "INSERT INTO valute(kupovni, srednji, prodajni, valuta) VALUES ?";
      fetchData(url, insertsql, res);
    }
  });
});
