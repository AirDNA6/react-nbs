const fetch = require("node-fetch");
var con = require("./database");


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

module.exports = fetchData;