var faker   = require('faker'),
    express = require("express"),
    app     = express(),
    mysql   = require('mysql');
 
//DB connection   
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',  //your root username (leave as root)
  database : 'join_us',   //the name of your db (create this if you haven't already)
  password : process.env.MYSQL_PW   //your root user's password
});

//data insertion
var data = [];
for(var i = 0; i < 500; i++){
    data.push([faker.internet.email(), faker.date.past()]);
}
var q = 'INSERT INTO users (email, created_at) VALUES ?';
connection.query(q, [data], function (error, results, fields) {
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
    }
});

connection.end();

//app listener - start server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Has Started!")
});

// var person = {
//     email: faker.internet.email(),
//     created_at: faker.date.past()         
// };
// connection.query('INSERT INTO users SET ?', person, function (error, results, fields) {
//   if (error){
//     console.log(error);  
//   } 
//   else{
//      console.log(results);
//   }
// });

// var q = 'SELECT CURTIME() as time, CURDATE() as date, NOW() as now';
// connection.query(q, function (error, results, fields) {
//   if (error){
//     console.log(error);  
//   } 
//   else{
//      console.log(results);
//      console.log(results[0].time);
//      console.log(results[0].date);
//      console.log(results[0].now); 
//   }
// });

//var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
//var randomDate = faker.date.past();

// var q = 'SELECT count(*) AS total FROM users';
// connection.query(q, function (error, results, fields) {
//   if (error){
//     console.log(error);  
//   } 
//   else{
//      console.log(results[0].total);
//   }
// });



