var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var Message = require('../models/message');

router.get('/', function (req, res, next) {
	Message.find()
		.populate('user', 'userName')
		.sort({created_at: -1})
		.exec(function(err, doc) {
			if (err) {
				return res.status(404).json({
					title: 'An error occured',
					error: err
				});
			}
			res.status(200).json({
				message: 'Success',
				obj: doc
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

router.post('/', function(req, res, next) {
	var decoded = jwt.decode(req.query.token);

	User.findById(decoded.user._id, function (err, doc) {
		if (err) {
			return res.status(404).json({
				title: 'an error occured',
				error: err
			});
		}

		var message = new Message({
			title: req.body.title,
			content: req.body.content,
			created_at: req.body.created_at,
			image: req.body.image,
			user: doc
		});

		message.save(function(err, result) {
			if (err) {
				return res.status(404).json({
					title: 'An error occured',
					error: err
				});
			}

			doc.messages.push(result);
			doc.save();

			res.status(201).json({
				message: 'Saved message',
				obj: result
			});
		});
	});
});

router.delete('/:id', function(req, res, next) {
	var decoded = jwt.decode(req.query.token);

	Message.findById(req.params.id, function(err, doc) {
		if (err) {
			return res.status(404).json({
				title: 'An error occured',
				error: err
			});
		}

		if (!doc) {
			return res.status(404).json({
				title: 'No message found',
				error: { message: 'Message wasn\'t found' }
			});
		}
		if (doc.user != decoded.user._id) {
			return res.status(401).json({
				title: 'Auth error',
				error: { message: 'User is not authorized' }
			});
		}

		doc.remove(function(err, result) {
			if (err) {
				return res.status(404).json({
					title: 'An error occured',
					error: err
				});
			}
			res.status(200).json({
				message: 'Succesfully deleted',
				obj: result
			});
		});
	});
});

router.patch('/:id', function (req, res, next) {
	var decoded = jwt.decode(req.query.token);

	Message.findById(req.params.id, function(err, doc) {
		if (err) {
			return res.status(404).json({
				title: 'An error occured',
				error: err
			});
		}

		if (!doc) {
			return res.status(404).json({
				title: 'No message found',
				error: { message: 'Message wasn\'t found' }
			});
		}

		if (doc.user != decoded.user._id) {
			return res.status(401).json({
				title: 'Auth error',
				error: { message: 'User is not authorized' }
			});
		}

		doc.title = req.body.title;
		doc.content = req.body.content;

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
