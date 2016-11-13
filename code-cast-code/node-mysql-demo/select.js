var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'clinic'
});
connection.connect();


// website.com/articles?id=1
// website.com/articles?id=1; drop table articles;

var id = '1';

var query = connection.query('select * from owner' , function(err,  rows ,fields) {
  console.log(query.sql);
  for (var i in rows) 
        console.log( rows[0].owner_name);
   		//console.log(fields);
    
});