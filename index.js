var express    = require('express');
var mysql   = require('mysql');
var app = express();

var bodyParser = require('body-parser');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database: 'clinic'
    }); 

connection.connect();

var o = {
  
  owner_name: 'madhu',
  pet_name: 'snigdha'
};

var query2 = connection.query('select * from owner' , function(err,  rows ,fields) {
  console.log(query2.sql);
  for (var i in rows) 
        console.log( rows[0].owner_name);
   		//console.log(fields);
    
});


app.get('/',function(req,res){

});
app.post('/users', function (req, res) {
var query1 = connection.query('insert into owner set ?', o, function (err, result) {
  if (err) {
    console.error(err);
    return;
  }
  console.error(result);
});
    
});


app.listen(3000);
console.log("Express server listening on port 3000 ");