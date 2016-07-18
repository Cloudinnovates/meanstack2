var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
	userName: {type: String, unique: true},
	password: {type: String},
	email: {type: String, unique: true},
	firstName: {type: String},
	lastName: {type: String},
	messages: [{type: Schema.Types.ObjectId, ref: 'Message'}]
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);
