var express    = require('express');
var mysql   = require('mysql');
var app = express();
var bodyParser = require('body-parser');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('.html', require('ejs').__express);
app.set('view engine', 'ejs');

var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database: 'clinic'
    }); 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }});
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
app.get('/dlogin',function(req,res){
	res.sendFile(__dirname +'/public/doctorlogin.html');
})

app.get('/ologin',function(req,res){
	res.sendFile(__dirname +'/public/ownerlogin.html');
})

app.get('/ologincheck',function(req,res){
	var cuser=req.query.username;
	var cpass=req.query.password;
	connection.query('select * from ownerreg where oname= ? ',cuser,function(err,result){

		if(cpass==result[0].password)
			{	connection.query('select * from doctor,owner,treated where doctor.did=treated.did and owner.oid=treated.oid and owner_name=?',cuser , function(err,  rows ,fields) 
				{	console.log(rows);
					if(rows.length!=0)
					res.render('ownerpage',{username:rows});
				else
				{connection.query('select * from owner where owner_name=?',cuser,function(err,rows){
					res.render('ownerpage2',{username:rows});
				})
					
				}
				});
			}
			else
			res.sendFile(__dirname +'/public/error.html');	
	})
});

app.get('/dlogincheck',function(req,res){
	var cuser=req.query.username;
	var cpass=req.query.password;
	connection.query('select * from doctorreg where oname= ? ',cuser,function(err,result){

		if(cpass==result[0].password)
			{	connection.query('select * from doctor,owner,treated where doctor.did=treated.did and owner.oid=treated.oid and dname_name=?',cuser , function(err,  rows ,fields) 
				{
					console.log(rows);
					if(rows.length!=0)
					res.render('doctorpage',{username:rows});
				else
				{connection.query('select * from doctor where dname_name=?',cuser,function(err,rows){
					res.render('doctorpage2',{username:rows});
				})
					
				}
				
				});
			}
			else
			res.sendFile(__dirname +'/public/error.html');	
	})
});

app.get('/seeappointments',function(req,res){
var username=req.query.id;
//console.log(username);

connection.query('select * from doctor where dname_name=?',username , function(err,  rows ,fields) 
 	{
 		console.log(rows[0].dID);
 		connection.query('select * from appoinment,owner where owner.OID=appoinment.OID and dID=?',rows[0].dID , function(err,  result ,fields) 
 	{console.log(result);

var hel=[{doctors:result},{username:username}];
 console.log(hel[1].username);
 console.log(hel);
	if(result==undefined)
	res.send("You Dont Hav any appointments for the day come back later");
	else
		res.render('seeappointments',{hello:hel});
	}); 				
});

});

app.get('/appointment',function(req,res){
var username=req.query.id;
console.log(username);

connection.query('select * from doctor' , function(err,  rows ,fields) 
 	{
var hel=[{doctors:rows},{username:username}];
console.log(hel[1].username);
console.log(hel);
		res.render('appointment',{hello:hel});
	}); 				
});

app.post('/appointment',function(req,res){
var username=req.query.id;
var doc=req.body.dname;
var reason=req.body.reason;
console.log(doc+"doc");
console.log(username+"username");
connection.query('select oid from owner where owner_name=?',username,function(err,result,fields)
{
	console.log(result[0].oid);
connection.query('select * from doctor where dname_name = ?',doc,function(err,rows,fields)
{
	console.log(rows[0].dID);

var o={OID:result[0].oid,dID:rows[0].dID,reason:reason}	;
connection.query('insert into appoinment set ?', o, function (err, rows) {
	console
 res.render('success',{username:username,doctor:doc});
});

})	

})
			
});
app.post('/treatment',function(req,res){
var username=req.query.id;
var doc=req.body.oname;
var presc=req.body.pres;
var reason=req.body.reason;
console.log(doc+"doc");
console.log(username+"username");
connection.query('select dID from doctor where dname_name=?',username,function(err,result,fields)
{
	console.log(result[0].dID);
connection.query('select * from owner where owner_name = ?',doc,function(err,rows,fields)
{
	console.log(rows[0].OID);

var o={dID:result[0].dID,OID:rows[0].OID,reason:reason,prescription:presc}	;
connection.query('insert into treated set ?', o, function (err, rows) {
	
 res.render('successDoc',{username:username,doctor:doc});
});

})	

})
			
});

app.post("/createowner",function(req,res){
	var a=req.body.username;
	var b=req.body.password;
	var c=req.body.pet;
	var e=req.body.address;
	var f=req.body.city;
	var g=req.body.age;
	console.log(a);
	console.log(owner);
	var o={
			owner_name:a,pet_name:c,Address:e,City:f,Age:g
	};
	var p={
		oname:a,password:b
	}
	connection.query('insert into ownerreg set ?',p,function(err,result){
console.log(result);
console.log(result+"success");
	})
connection.query('insert into owner set ?', o, function (err, result) {
	if(err)
		throw err;
  console.error(result);
  res.sendFile(__dirname +'/public/ownerlogin.html');
  
});

})
app.post("/createdoctor",function(req,res){
	var a=req.body.Doctorname;
	var b=req.body.password;
	var c=req.body.spec;
	var d=req.body.exp;
	var e=req.body.address;
	var f=req.body.city;
	var g=req.body.age;

	var o={
			dname_name:a,Specialisation :c,Experience:d,Address:e,City:f,Age:g,
	};
	var p={
		oname:a,password:b
	}
	connection.query('insert into doctorreg set ?',p,function(err,result){
console.log(result);
console.log(result+"success");
	})
connection.query('insert into doctor set ?', o, function (err, result) {
	if(err)
		throw err;
  console.error(result);
  res.sendFile(__dirname +'/public/doctorlogin.html');
  
});

})

app.listen(3000);
console.log("Express server listening on port 3000 ");