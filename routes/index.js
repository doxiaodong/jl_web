var express = require('express');
var router = express.Router();

/* apps start */
/* home page. */
router.get('/', function(req, res) {
	res.render('apps/index', { title: 'jl' });
});

/* apps end */

module.exports = router;
