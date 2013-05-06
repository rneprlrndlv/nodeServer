
/*
 * GET user to join.
 */

var mysqlp = require('mysql');
var urlp = require('url');

var connection = mysqlp.createConnection({
	host: '1.234.7.150',
	user: 'ts01',
	port: '3306',
	password: '1234'
});

connection.connect();
connection.query('use ts01');

exports.join = function(req, res){
	/*
		{
		  "_name" : "userID",
		  "_email" : "userEM@naver.com",
		  "_password" : "userPW",
		  "_phone" : "userPH"
		}
	*/
	
	var name = req.body._name; // form 태그 name 속성 값이 req.body.**로 들어온다.
	var email = req.body._email;
	var password = req.body._password;
	var phone = req.body._phone;

	// var jsonObject = JSON.parse(req.body.jsonObject);
	// var name = jsonObject._name; // form 태그 name 속성 값이 req.body.**로 들어온다.
	// var email = jsonObject._email;
	// var password = jsonObject._password;
	// var phone = jsonObject._phone;

	connection.query('insert into sw_user_info set user_name=?, user_email=?, user_password=?, user_phone=? ', [name, email, password, phone], function(err, data) {
		connection.query('select * from sw_user_info', function(error, results, fields) {
			if(error) {console.log('error: ' + error);}
			var data = JSON.stringify(results);
			res.send(data);
		});
	});
};

exports.login = function(req, res) {
	var email = req.body._email;
	var password = req.body._password;
	var success_Json = '{"status" : "200", "message" : "success"}';
	var fail_Json = '{"status" : "0", "message" : "fail"}';
	connection.query('select *from sw_user_info where user_email=? and user_password=?', [email, password], function(error, results, fields) {
		if(results.length > 0) {
			res.send(JSON.parse(success_Json));
		} else {
			res.send(JSON.parse(fail_Json));
		}
	});
}
