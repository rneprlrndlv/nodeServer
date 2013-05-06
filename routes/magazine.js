
/*
 * GET magazine to download.
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

exports.down = function(req, res) {
	var zineCategory = req.param('category');
	var userName = req.param('username');
	
	if (zineCategory != "")
		connection.query("update sw_magazine set zine_download=?, user_name=? where zine_category=?", ['1', userName, zineCategory], function(err, data) {
			connection.query('select * from sw_magazine M, sw_user_info I where M.user_name=I.user_name', function(error, results, fields) {
				if(error) {console.log('error: ' + error);}
				var data = JSON.stringify(results);
				res.send(data);
			});
		});

}