
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , list = require('./routes/list')
  , reply = require('./routes/reply')
  , user = require('./routes/user')
  , magazine = require('./routes/magazine')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 5002);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/sportswriter/joinTest', function(req,res){
  res.sendfile(__dirname + '/userJoinTest.html');
}); 
app.get('/sportswriter/loginTest', function(req,res){
  res.sendfile(__dirname + '/userLoginTest.html');
});
app.get('/sportswriter/writer', function(req, res){
  res.sendfile(__dirname + '/writer.html');
});

app.get('/sportswriter/lists', list.key); // 게시글을 받아오기위한 데이터
app.get('/sportswriter/lists/:writer', list.writer); // 작성자 이름 받아오기(리스트에 뿌리기 위해)
app.get('/sportswriter/replys/add/:message/:postid/:username', reply.add); // 댓글 내용을 API에서 받아온 ID를 통해 해당하는 글에 분류해서 넣고 로그인 정보를 받아와서 키로 사용해 사용자의 이름을 테이블에서 인덱스에 맞게 추출한다.
app.get('/sportswriter/replys/delete/:postid/:username', reply.delete); // 댓글 지우기
app.get('/sportswriter/magazine/download/:category/:username', magazine.down); // 매거진 다운로드 체크

app.post('/sportswriter/users/join', user.join); // 회원가입
app.post('/sportswriter/users/login', user.login); // 로그인

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
