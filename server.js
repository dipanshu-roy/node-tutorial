const express = require('express');
const app  = express();
const bodyParser = require("body-parser");
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  port: 3306,
  databasee: "nodejs",
  user: "root",
  password: ""
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
module.exports = con;

const port =  process.env.PORT||3000;
const appname = '➤ HRMS';
app.set('view engine','ejs');

app.get('/', (req, res) =>{
    var data = { title : 'Login '+appname};
    res.render('base', data);
});
app.get('/register', (req, res) =>{
    var data = { title : 'Registe '+appname};
    res.render('register', data);
})

app.use(bodyParser.json());

app.post('/login', function(req, res, next){
    if (req.method == 'POST') {
      var email = req.body.email;
      var password = req.body.password;
      con.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], function (err, rows, fields) {
          if (err) throw err
          if (rows.length <= 0) {
              //req.flash('error', 'Please correct enter email and Password!')
              res.redirect('/')
          }else {
              //req.session.loggedin = true;
              //req.session.name = name;
              res.redirect('/home');
          }
      });
    }
})   



app.listen(port, ()=>{ console.log("Lostening to the server on http://localhost:3000")});