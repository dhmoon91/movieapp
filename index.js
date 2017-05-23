var mysql = require('mysql');
var express = require('express');
var app = express();
var fs = require('fs');
var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');
var port = process.env.PORT ||3000;
var connection = mysql.createConnection({
 host     : 'movieapp.c8c1kk3wdvcn.us-west-2.rds.amazonaws.com',
 user     : 'admin',
 password : 'admin123',
 database: 'movieapp',
 // host     : 'localhost',
 // user     : 'root',
 // password : 'password',
 // database: 'moviedb',
 port     : 3306,
 ssl: {
  ca:fs.readFileSync('./config/amazon-rds-ca-cert.pem')
}
});

connection.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }

  console.log('Connected to database.');
});
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());

////////**   API CALLS   **////////

// USER SIGN UP
app.post('/auth/signup', function (req,res) {
  console.log("Signup user");
  var body = req.body;
  var sql = 'INSERT INTO user SET ?';

  //encrypt user's password using bcrypt
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(body.password, salt);

  console.log("HASHED PASSSWORd: "+ hash);
  var value = {uid:body.uid, username:body.username,password:hash};

  connection.query(sql,value,function (err, result){
    if(err) {
      if(err.code === 'ER_DUP_ENTRY'){
        console.log("USER ID TAKEN");
       res.status(400).send("Username Taken. try with different username Again");
      }
    }else {
      console.log("1 user record inserted");
      res.status(200).send('User signed up');
    }
  });
});

//USER login
app.post('/auth/login', function (req,res){
  console.log("Login user");
  var body = req.body;
  //select table, according to userid, get password and userid
  var sql = 'SELECT * FROM user WHERE username = ?';
  connection.query(sql,body.username,function(err,result){
    if(result.length == 0){
       res.status(400).send("Username not found. Please Try Again");
    }else if(bcrypt.compareSync(body.password,result[0].password)) {
        console.log("PASSWORD MATCHES!");
        var loginuser = {};
        loginuser.username = result[0].username;
        loginuser.uid = result[0].uid;
        res.status(200).send(loginuser);
    } else{
      res.status(400).send("Password does not match. Please Try Again");
    }
  });
});

//ADDING MOVIE
app.post('/add', function (req,res) {
  var now = new Date();
  var body = req.body;
  var sql = 'INSERT INTO movie SET ?';

  var value = {mid:body.mid, uid:body.uid, title:body.title, actors:body.actors, image:body.image,year:body.year,addedAt:now,released:body.released,genre:body.genre, director:body.director, plot:body.plot, runtime:body.runtime, imdbRating:body.imdbRating};

  connection.query(sql,value, function (err, result){
    if(err) throw err;
    res.status(200).send("Record Inserted");
  });
});

//Getting movie from user
app.get('/get', function (req,res,next){
  //Query movie table where uid matches with user.uid!!
  var uid = req.query.uid;
  var sql = "SELECT * FROM movie WHERE uid = ? ORDER BY addedAt DESC";
  connection.query (sql,[uid], function (err, result){
    if(err) throw err;
    // console.log(result);
    res.status(200).send(result);
  });
});

app.post('/delete', function (req,res) {
  var mid = req.body.mid;
  var sql = 'DELETE FROM movie WHERE mid = ?';
  connection.query(sql,mid, function (err, result){
    if(err) throw err;
      res.status(200).send("record deleted");
  });
});

////////**   API CALLS  END  **////////



app.use(express.static('./public'));

app.get('*', function (req,res){
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(port);
console.log("App listening on port" + port);
