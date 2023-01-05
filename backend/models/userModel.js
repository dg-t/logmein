const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please provide your name'],
	},
	email: {
		type: String,
		required: [true, 'Please provide your email'],
		unique: true,
		lowercase: true,
		validate: [validator.isEmail, 'Please provide a valid email'],
	},
	password: {
		type: String,
		required: [true, 'Please provide a password'],
		minlength: 8,
	},
	passwordConfirm: {
		type: String,
		required: [true, 'Please confirm your password'],
		validate: {
			// Valaidator only works for CREATE and SAVE
			validator: function (el) {
				return el === this.password;
			},
			message: 'passwrods are not the same',
		},
	},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
