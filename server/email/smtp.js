Meteor.startup(function(){

    tripartServices = {}

	tripartServices.smtp = {
		username : 'noreply@flagstoneholdings.com',
		password : 'Mnijoiafesflagstone147/',
		server : 'smtp.mailgun.org',
		port : 587
	}


	process.env.MAIL_URL = 'smtp://' + 
				encodeURIComponent(tripartServices.smtp.username) + ':' +
				encodeURIComponent(tripartServices.smtp.password) + '@' +
				encodeURIComponent(tripartServices.smtp.server) + ':' + 
				tripartServices.smtp.port;
});


