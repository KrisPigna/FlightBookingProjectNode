
var express = require('express');
var mysql = require('mysql');
var bodyParser = require("body-parser");

var app = express();
app.use('/',express.static('./'));

app.use(bodyParser.json()); 

//app.use(express.static(__dirname + "/public"));

//LOGGER
var log4js = require('log4js');
var log = log4js.getLogger("server");

var pool = mysql.createPool({
	host: "127.0.0.1",
	connectionLimit : 100,
	user: "user",
	password: "password",
	database: "project",
	port: "3306"
});



//connection.connect();

pool.getConnection(function (err, connection) {
	if (!err) {
		log.info('Database is connected ... ');
		connection.release();
	} else {
		log.error('Error connecting database ... ');
	}
});


app.post('/verifyUser', function (req, res) {
	var uname = req.body.uname;
	var pword = req.body.pword;
	log.info(req);
	var data = {
			"error": 1,
			"user": ""
	};
	pool.getConnection(function (err, connection) {
		
		connection.query('select * from user where username = ? and password=?',[uname,  pword], function (err, rows, fields){
			log.info(rows);
			
			if (rows!==undefined) {
				if( rows.length !== 0 && !err) {
					data.error = 0;
					data.user = rows;
					res.json(data);
				} else if (rows.length === 0) {
					data.error = 1;
					res.json(data);
				}
			}  else {				
				data.error = 1;
				res.json(data);
				log.error('Error while performing Query: ' + err);
			}
		});

	});
});


var server = app.listen(8080);
//app.listen(8085);

