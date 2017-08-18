Accounts.emailTemplates.siteName = 'Flagstone Properties';
Accounts.emailTemplates.from = 'noreply@flagstoneholdings.com';




//Accounts.emailTemplates.verifyEmail.subject = function (user) {
	//return 'Please confirm your Email Address ,' + user.username;
//};

//Accounts.emailTemplates.verifyEmail.text = function (user , url){
	//return 'Welcome to University of Uyo Staff Club 1980 \n' 
	//+ 'To verify your email addrress go ahead and and follow the link below: \n\n'
	//+ url;
//}

//Accounts.emailTemplates.verifyEmail.html = function (user , url){
	//return '<h1>Welcome to University of Uyo Staff Club 1980 </h1>' 
	//+ '<p>To verify your email addrress go ahead and and follow the link below: </p>'
	//+ url;
//}


Accounts.emailTemplates.verifyEmail = {
  subject() {
    return "[FlagStone Properties] Verify Your Email Address";
  },
  text( user, url ) {
    let emailAddress   = user.emails[0].address,
        urlWithoutHash = url.replace( '#/', '' ),
        supportEmail   = "support@flagstoneproperty.com",
        emailBody      = 'To verify your email address ' + emailAddress + ' visit the following link:\n\n ' + urlWithoutHash + '\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ' + supportEmail ;

    return emailBody;
  }
};


Accounts.emailTemplates.enrollAccount = {
  subject() {
    return "[FlagStone Properties]  Set your password";
  },
  text(user, url ) { 
      let urlWithoutHash = url.replace( '#/', '' ),
        emailBody      = 'To set your password visit the following link:\n\n ' + urlWithoutHash;

    return emailBody;
  }
};