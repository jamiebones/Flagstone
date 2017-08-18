
EmailSubscription = new Meteor.Collection('emailsubscription');

EmailSubscription_Schema = new SimpleSchema({
	
	"name" : {
		type : String,
		label : 'full name',	
	},

	"email" : {
		type : String,
		label : 'email address',	
	},

	"date_subscribe" : {
		type : Date,
		label : '',	
	}


});

EmailSubscription.attachSchema(EmailSubscription_Schema);