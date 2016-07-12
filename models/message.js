var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');

var schema = new Schema({
	title: {type: String, required: true},
	content: {type: String, required: true},
	created_at: {type: String, required: true},
	image: {type: String},
	user: {type: Schema.Types.ObjectId, ref: 'User'}
});

schema.post('remove', function (doc) {
	var deletedMessage = doc;

	User.findById(doc.user, function (err, doc) {
		doc.messages.pull(deletedMessage);
		doc.save();
	});
});

module.exports = mongoose.model('Message', schema);
