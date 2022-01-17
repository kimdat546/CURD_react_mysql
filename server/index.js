const express = require('express')
const mysql = require('mysql');
const cors = require('cors');
const app = express()
const port = 5000
app.use(express.json())
app.use(cors())
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    } else console.log('connect ok');
})

app.get('/api', (req, res) => {
    const sql = `select * from data`
    connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        res.json(results)
    });
})
app.post('/api/insert', (req, res) => {
    const { name, pass } = req.body
    const sql = `insert into data(name,pass) values (?,?)`
    connection.query(sql, [name, pass], function (error, results, fields) {
        if (error) throw error;
        console.log(results)
    });
})
app.listen(port, () => {
    console.log('server run host on port')
})


