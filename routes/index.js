var express = require('express');
var router = express.Router();

/* apps start */
/* home page. */
router.get('/', function(req, res) {
	res.render('apps/index', { "title": "jl" });
});

/* userlist page */
router.get('/userlist', function(req, res) {
	var db = req.db;
	var collection = db.get('user');
	collection.find({}, {}, function(e, users) {
		res.render('apps/user/userlist', {
			"title": "用户列表",
			"users": users
		});
	});
});

/* apps end */

module.exports = router;
