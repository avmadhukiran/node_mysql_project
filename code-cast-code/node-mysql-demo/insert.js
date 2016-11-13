var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'clinic'
});
connection.connect();

var o = {
  
  owner_name: 'madhu',
  pet_name: 'snigdha'
};

var query = connection.query('insert into owner set ?', o, function (err, result) {
  if (err) {
    console.error(err);
    return;
  }
  console.error(result);
});