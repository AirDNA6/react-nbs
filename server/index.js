const express = require("express");
var con = require("./database");
var fetchData = require("./fetchData");
var Sql = require("./Sql");
require('dotenv').config();

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const bcrypt = require("bcrypt")
const saltRounds = 10

const mySql = new Sql();

const cors = require("cors");
const app = express();

var api_id = require("./api_nbs")

let url = `http://api.kursna-lista.info/${api_id}/kursna_lista/json`;

app.use(express.json());

app.use(
  cors({
    origin: ["https://kursnalista.netlify.app"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  key: "userId",
  secret: "QwertY123456",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 900000
  }
}))

app.get("/api/get", function (req, res, next) {
  mySql.getSql(res);
});

app.post("/api/insert", cors(), (req, res) => {
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
  deleteAll
});

app.post('/api/register', (req, res) => {
  const username = req.body.username
  const password = req.body.password

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err)
    }
    con.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hash],
      (err, result) => {
        console.log(err)
      })
  })

})

app.get("/api/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user })
  } else {
    res.send({ loggedIn: false })
  }
})

app.post('/api/login', (req, res) => {
  const username = req.body.username
  const password = req.body.password
  con.query("SELECT * FROM users WHERE username = ?", username, (err, result) => {
    if (err) {
      res.send({ err: err })
    }
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (response) {
          req.session.user = result
          console.log(req.session)
          res.send(result)
        } else {
          res.send({ message: "Wrong username/password combination" })
        }
      })
    } else {
      res.send({ message: "User dosen't exist" })
    }
  }
  )
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

