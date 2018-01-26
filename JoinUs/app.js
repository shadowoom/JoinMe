var express = require('express');
var mysql = require('mysql');
var bodyParser  = require("body-parser");
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

//DB connection   
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',  //your root username (leave as root)
  database : 'join_us',   //the name of your db (create this if you haven't already)
  password : process.env.MYSQL_PW   //your root user's password
});

app.get("/", function(req, res){
    // Find count of users in DB
    var q = "SELECT COUNT(*) AS count FROM users";
    connection.query(q, function(err, results){
        if(err) throw err;
        var count = results[0].count; 
        res.render("home", {count: count});
    });
});

app.post("/register", function(req, res){
    var person = {
        email: req.body.email
    };
    if(person.email === ''){
        res.redirect("/");
    }
    else{
        connection.query('INSERT INTO users SET ?', person, function(err, result) {
            if (err) {
                res.redirect("/");
            }
            res.redirect("/");
        });
    }
    
});

//app listener - start server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Has Started!")
});