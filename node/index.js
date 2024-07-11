const express = require("express");
const mysql = require("mysql");
const fs = require("fs");

const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};

const connection = mysql.createConnection(config);

const migrationScript = fs.readFileSync("./init.sql", "utf8");
connection.query(migrationScript, (err, results) => {
  if (err) throw err;
  console.log("Migration executada com sucesso");
});

const sql = `INSERT INTO people(name) values('Odair') `;
connection.query(sql);

const sql_users = `SELECT name FROM people `;
let users = [];
connection.query(sql_users, (error, results) => {
  if (error) {
    console.error("Erro ao executar a consulta:", error);
    return;
  }
  results.map((r) => users.push(r.name));
});

const app = express();

const port = 3000;

app.get("/", (req, res) => {
  res.send(
    `<h1>Fullcycle rocks 1!!</h1>${users.map(
      (value, index) => "</br>" + index + " " + value
    )}`
  );
});

app.listen(port, () => console.log(`Rodando na porta ${port}`));