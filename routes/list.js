
/*
 * GET key to post.
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

exports.key = function(req, res) {
	connection.query('select * from sw_board_list', function(error, results, fields) {
		if(error) {console.log('error: ' + error);}
		var data = JSON.stringify(results);
		res.send(data);
	});
};

exports.writer = function(req, res) {
	var writerString = req.param('writer');

	// connection.query('insert into sw_board_list set ?', [writerString], function(err, data) {
		connection.query('select * from sw_board_list where post_writer=?',[writerString] ,function(error, results, fields) {
			if(error) {console.log('error: ' + error);}
			var data = JSON.stringify(results);
			res.send(data);
		});
	// });
}