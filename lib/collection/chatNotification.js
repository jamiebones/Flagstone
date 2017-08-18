
Chat_Notification = new Meteor.Collection('chat_notification');

//if (Meteor.isServer){
	//Tripart_Property._ensureIndex({type : 1});
//}


Chat_Notification_Schema = new SimpleSchema({
	"chatId" : {
		type : String,
		label : '',	
	},

	"message" : {
		type : String,
		label : '',	
		optional : true
	},

	"read" : {
		type : Boolean,
		label : '',	
		optional : true
	},

	"notification_owner" : {
		type : String,
		label : '',	
		optional : true
	},

	"date" : {
		type : Date,
		label : '',
		optional : true
	}

});


Chat_Notification.attachSchema(Chat_Notification_Schema);