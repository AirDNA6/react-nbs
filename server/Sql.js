var con = require("./database");

class Sql {
  constructor() {}

  getSql(res) {
    let sql =
      "SELECT id, valuta, kupovni, srednji, prodajni, DATE_FORMAT(datum, '%b %d %Y') AS datum FROM valute WHERE status = 'A' AND date_format(datum, '%M%D%Y') = date_format(sysdate(), '%M%D%Y')";
    con.query(sql, (err, result) => {
      
      res.send(result);
    });
  }

  insertSql() {
    return "INSERT INTO valute(kupovni, srednji, prodajni, valuta) VALUES ?";
  }

  updateSql() {
    let updatesql =
      "UPDATE valute SET status='I' WHERE status = 'A' AND date_format(datum, '%M%D%Y') = date_format(sysdate(), '%M%D%Y')";
    con.query(updatesql, (err, result, fields) => {
      
      console.log(result.affectedRows + " record(s) updated");
    });
  }

  countSql() {
    return "SELECT COUNT(*) AS brojac FROM valute WHERE status = 'A' AND date_format(datum, '%M%D%Y') = date_format(sysdate(), '%M%D%Y')";
  }

  deleteSql() {
    let deleteAll = "DELETE FROM valute";
    con.query(deleteAll, (err, result, fields) => {
      
      console.log(result.affectedRows + " record(s) deleted");
    });
  }
}

module.exports = Sql;
