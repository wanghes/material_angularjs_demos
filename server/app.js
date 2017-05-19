var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var authMee = '';
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

app.post('/auth/login',function(req,res){
	authMee = guid();
	var body = req.body;
	console.log(body)
	var nonObject = Object.keys(body).length>0
	if(!nonObject){
		return res.status(500).send("req.body参数错误");
	}
	if(nonObject && body.username!="wanghes"){
		return res.status(203).send("认证失败,无权访问,填写wanghes");
	}

	res.send({
		access_token:authMee,
		expire_in:3600 //一个小时
	});
});

app.get('/auth/user',function(req,res){
	console.log("authMee="+authMee);
	console.log("authorization="+req.headers.authorization);
	if(authMee != req.headers.authorization){
		return res.status(203).send("认证失败,无权访问");
	}
	res.send({
		username:"wanghaisong",
		create_at:"2017-05-12"
	});
});

app.listen(3003);