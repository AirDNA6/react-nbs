var con = require("./database");

class Sql {
  constructor() {}

  getSql(res) {
    let sql =
      "SELECT id, valuta, kupovni, srednji, prodajni, DATE_FORMAT(datum, '%b %d %Y') AS datum FROM valute WHERE status = 'A' AND datum = CURDATE()";
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  }

  insertSql() {
    return "INSERT INTO valute(kupovni, srednji, prodajni, valuta) VALUES ?";
  }

  updateSql() {
    let updatesql =
      "UPDATE valute SET status='I' WHERE datum = CURDATE() AND status = 'A'";
    con.query(updatesql, (err, result, fields) => {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
  }

  countSql() {
    return "SELECT COUNT(*) AS brojac FROM valute WHERE status = 'A' AND datum = CURDATE()";
  }

  deleteSql() {
    let deleteAll = "DELETE FROM valute WHERE datum= CURDATE()";
    con.query(deleteAll, (err, result, fields) => {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) deleted");
    });
  }
}

module.exports = Sql;
