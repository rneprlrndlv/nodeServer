
/*
 * GET reply to post.
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

exports.add = function(req, res) {
	var replyString = req.param('message');
	var postId = req.param('postid');
	var userName = req.param('username'); // local storage(android:preference)로 받아져있는 로그인 정보를 파라미터로 받는다.

	if (postId != "")
		connection.query('insert into sw_user_reply set reply_content=?, post_id=?, user_name=?', [replyString, postId, userName], function(err, data) {
			connection.query('select R.user_name, R.post_id, R.reply_content, R.reply_delete, R.reply_date, I.user_name, I.user_email from sw_user_reply R, sw_user_info I where R.post_id=? and R.user_name=? and R.reply_delete=0 and I.user_name=R.user_name', [postId, userName], function(error, results, fields) {
				if(error) {console.log('error: ' + error);}
				var data = JSON.stringify(results);
				res.send(data);
			});
		});
	
};

exports.delete = function(req, res) {
	var deleteIndex = req.param('postid');
	var userName = req.param('username');
	
	if (deleteIndex != "")
		connection.query("update sw_user_reply set reply_delete=? where post_id=? and user_name=?", ['1', deleteIndex, userName], function(err, data) {
			connection.query('select * from sw_user_reply where post_id=? and reply_delete=0', [deleteIndex] , function(error, results, fields) {
				if(error) {console.log('error: ' + error);}
				var data = JSON.stringify(results);
				res.send(data);
			});
		});

}