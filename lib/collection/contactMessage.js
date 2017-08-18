
Contact_Message = new Meteor.Collection('contact_message');


Contact_Message_Schema = new SimpleSchema({
	"name" : {
		type : String,
		label : 'enter name',	
	},

	"email" : {
		type : String,
		label : 'email address',
		optional : true	
	},

	"message" : {
		type : String,
		label : 'message',

	},
    
    "subject" : {
		type : String,
		label : 'subject',

	},
	
    "phone" : {
		type : String,
		label : 'phone number',	
		optional: true
	},

	"date" : {
		type : Date,
		label : '',

	},

	"message_read" : {
		type : Boolean,
		label : '',
	},

	"acted_upon" : {
		type : String,
		label : '',
		optional : true
	}
});


Contact_Message.attachSchema(Contact_Message_Schema);






