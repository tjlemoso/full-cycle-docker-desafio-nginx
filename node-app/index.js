const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

const config = {
  host: 'mysql',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};

const connection = mysql.createConnection(config);

const createTable = `CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL)`;
connection.query(createTable);

app.get('/', (req, res) => {
  const name = 'Full Cycle';
  const insertName = `INSERT INTO people(name) VALUES('${name}')`;
  connection.query(insertName, (err) => {
    if (err) throw err;

    connection.query('SELECT * FROM people', (err, results) => {
      if (err) throw err;

      let response = '<h1>Full Cycle Rocks!</h1>';
      response += '<ul>';
      results.forEach(person => {
        response += `<li>${person.name}</li>`;
      });
      response += '</ul>';
      res.send(response);
    });
  });
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
