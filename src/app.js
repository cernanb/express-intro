'use strict';

var express = require('express'),
			posts = require('./mock/posts.json');

var port = Number(process.env.PORT || 3000);

//convert the object of posts from posts.json to an array so we can iterate & add to the template 
var postsLists = Object.keys(posts).map(function(value) {
																		return posts[value]});

var app = express();

app.use('/static', express.static(__dirname + '/public'));

app.set('view engine', 'jade');
app.set('views', __dirname + '/templates');

app.get('/', function(req, res) {

	var path = req.path;
	res.locals.path = path;
	res.render('index');

});

app.get('/blog/:title?', function(req, res) {

	
	var title = req.params.title;
	if (title === undefined) {
		res.status(503);
		res.render('blog', { posts: postsLists });
	} else {
		var post = posts[title] || {};
		res.render('post', { post: post });
}

});

app.get('/posts', function(req, res) {

	if (req.query.raw) {
		res.json(posts);
	}
	else {
		res.json(postsLists);
	}

});

app.listen(port, function() {

	console.log("The frontend server is running on port 3000...")

});

