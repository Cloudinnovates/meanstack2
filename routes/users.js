var express = require('express');
var router = express.Router();
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');

var User = require('../models/user');

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

router.use('/', function (req, res, next) {
	jwt.verify(req.query.token, 'secret', function (err, decoded) {
		if (err) {
			return res.status(401).json({
				title: 'Auth failed',
				error: err
			});
		}
		next();
	});
});

router.get('/:id', function(req, res, next) {
	var decoded = jwt.decode(req.query.token);

	User.findById(decoded.user._id, function(err, doc) {
		if (err) {
			return res.status(404).json({
				title: 'an error occured',
				error: err
			});
		}
		if (!doc) {
			return res.status(400).json({
				title: 'An error occured',
				error: 'User not found'
			});
		}
		res.status(200).json({
			message: 'User found',
			obj: doc
		});
	});
});

router.patch('/:id', function (req, res, next) {
	var decoded = jwt.decode(req.query.token);

	User.findById(decoded.user._id, function(err, doc) {
		if (err) {
			return res.status(404).json({
				title: 'an error occured',
				error: err
			});
		}
		if (!doc) {
			return res.status(400).json({
				title: 'An error occured',
				error: 'User not found'
			});
		}
		if (req.body.firstName) {
			doc.firstName = req.body.firstName;
		}
		if (req.body.lastName) {
			doc.lastName = req.body.lastName;
		}
		doc.email = req.body.email;
		doc.save(function(err, result) {
			if (err) {
				return res.status(404).json({
					title: 'An error occured',
					error: err
				});
			}
			res.status(200).json({
				message: 'Success',
				obj: result
			});
		});
	});
});

module.exports = router;
