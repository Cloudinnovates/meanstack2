var express = require('express');
var router = express.Router();
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');

var User = require('../models/user');

/* /user */
router.post('/', function(req, res, next) {
	var user = new User({
		userName: req.body.userName,
		email: req.body.email,
		password: passwordHash.generate(req.body.password)
	});

	user.save(function (err, result) {

		if (err) {
			return res.status(404).json({
				title: 'An error occured',
				error: err
			});
		}

		res.status(200).json({
			message: 'Created User',
			obj: result
		});
	});
});

router.post('/signin', function(req, res, next) {
	User.findOne({ email: req.body.email }, function(err, doc) {

		if (err) {
			return res.status(400).json({
				title: 'An error occured',
				error: err
			});
		}

		if (!doc) {
			return res.status(400).json({
				title: 'An error occured',
				error: 'User not found'
			});
		}

		if (!passwordHash.verify(req.body.password, doc.password)) {
			return res.status(404).json({
				title: 'Validation Error',
				error: 'Invalid password'
			});
		}

		var token = jwt.sign({user: doc}, 'secret', {expiresIn: Date.now() + 1});

		res.status(200).json({
			message: 'Successfully logged in',
			token: token,
			userName: doc.userName,
			userId: doc._id
		});

	});
});


module.exports = router;