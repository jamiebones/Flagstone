
Chat = new Meteor.Collection('chat');

//if (Meteor.isServer){
	//Tripart_Property._ensureIndex({type : 1});
//}

Code = new Meteor.Collection('code');



Chat_Schema = new SimpleSchema({
	"user1Id" : {
		type : String,
		label : '',	
	},

	"user2Id" : {
		type : String,
		label : '',	
	},

	"message.$.message" : {
		type : String,
		label : '',	
		optional : true
	},

	"message.$.userId" : {
		type : String,
		label : '',	
		optional : true
	},

	"message.$.date" : {
		type : Date,
		label : '',	
		optional : true
	},

});


Chat.attachSchema(Chat_Schema);






