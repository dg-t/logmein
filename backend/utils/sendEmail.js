const nodemailer = require('nodemailer');
const { convert } = require('html-to-text');

module.exports = class Email {
	constructor(user, url) {
		this.to = user.email;
		this.name = user.name;
		this.url = url;
		this.from = `Thomas <${process.env.EMAIL_FROM}>`;
	}

	newTransport() {
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
	}

	async sendEmail(template, subject) {
		const emailOptions = {
			from: this.from,
			to: this.to,
			subject,
			html: template,
			text: convert(template, { wordwrap: 130 }),
		};

		await this.newTransport().sendMail(emailOptions);
	}
};
