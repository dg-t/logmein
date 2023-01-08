const nodemailer = require('nodemailer');
const { convert } = require('html-to-text');

const newTransport = () => {
	if (process.env.NODE_ENV === 'production') {
		return nodemailer.createTransport({
			service: 'SendGrid',
			auth: {
				user: process.env.SENDGRID_USERNAME,
				pass: process.env.SENDGRID_PASSWORD,
			},
		});
	}

	return nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: process.env.EMAIL_PORT,
		auth: {
			user: process.env.EMAIL_USERNAME,
			pass: process.env.EMAIL_PASSWORD,
		},
	});
};

module.exports = async (user, template, subject) => {
	// REAL EMAIL ONLY WORK IN PRODUCTION ENVIRONMENT
	const emailOptions = {
		from: `Thomas <${process.env.EMAIL_FROM}>`,
		to: user.email,
		subject,
		html: template,
		text: convert(template, { wordwrap: 130 }),
	};

	await newTransport().sendMail(emailOptions);
};
