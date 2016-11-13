var express    = require('express');
var mysql   = require('mysql');
var app = express();

var bodyParser = require('body-parser');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database: 'clinic'
    }); 

connection.connect();

var o={
  owner_name: 'madhu',
  pet_name: 'snigdha'
      };
 var owner=
 [
	 {	oname: 'madhu',
	 	password: '123456'
	 },
	 {	oname: 'kiran',
	 	password: '123456'
	 }
];
var doctor=
 [
	 {	dname: 'madhu',
	 	password: '123456'
	 },
	 {	dname: 'kiran',
	 	password: '123456'
	 }
];

var query2 = connection.query('select * from owner' , function(err,  rows ,fields) {
  console.log(query2.sql);
  for (var i in rows) 
        console.log( rows[0].owner_name);
   		//console.log(fields);
    
});
app.get('/dlogin',function(req,res){
	res.sendFile(__dirname +'/public/doctorlogin.html');
})

app.get('/ologin',function(req,res){
	res.sendFile(__dirname +'/public/ownerlogin.html');
})
app.post('/dlogincheck',function(req,res){
	var cuser=req.body.username;
	var cpass=req.body.password;
	for (var i = 0; i < doctor.length; i++) {
		console.log(doctor[i].dname);
		if(doctor[i].dname==cuser&&doctor[i].password==cpass)
		{
			//go to doctor page
		res.sendFile(__dirname +'/public/doctorpage.html');
		}
		else
			res.sendFile(__dirname +'/public/error.html');

	}
})
app.post('/ologincheck',function(req,res){
	var cuser=req.body.username;
	var cpass=req.body.password;
	for (var i = 0; i < owner.length; i++) {
		if(owner[i].oname==cuser&&owner[i].password==cpass)
		{
			//go to user page
		res.sendFile(__dirname +'/public/ownerpage.html');
		
		}
		else
			res.sendFile(__dirname +'/public/error.html');

	}
})
app.get('/petsofowner/:owner',function(req,res){
var c_owner=req.params.owner
connection.query('select * from owner where owner_name=?',c_owner , function(err,  rows ,fields) 
 	{
	  	ownid=rows[0].oid;
	  	console.log(rows[0]);
	 console.log(docid);
	  connection.query('select * from treated where oid=?',ownid, function(err,  rows ,fields)
	  {
		  connection.query('select * from doctor where did=?',rows[0].did, function(err,  rows ,fields)
		  {
		  	console.log(rows[0].dname_name);
		  });
	  });
	}); 	
});
app.get('/doctors/:doctor',function(req,res){
var c_doctor=req.params.doctor
 connection.query('select * from doctor where dname_name=?',c_doctor , function(err,  rows ,fields) 
 	{
	  	docid=rows[0].did;
	  console.log(docid);
	  connection.query('select * from treated where did=?',docid, function(err,  rows ,fields)
	  {
		  connection.query('select * from owner where oid=?',rows[0].oid, function(err,  rows ,fields)
		  {
		  	console.log(rows[0].pet_name);
		  });
	  });
	}); 		
});
	
app.get('/:ev',function(req,res){

})

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