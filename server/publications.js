
Meteor.publish('showState',function(){
    return StateCollection.find({});
});


Meteor.publish('findState',function(state){
    return StateCollection.find({"state" : state});
});



Meteor.publish("userStatus", function() {
  return Meteor.users.find({"status.online" : true });
});


Meteor.publish('getPreviousChatMessage' , function(chatId) {
	return Chat.find(chatId);
});


Meteor.publish('getChatId' , function(user1 , user2){
	let filter = {}
	filter = {
		$or : [ 
		        {user1Id : user1 , user2Id : user2},
		        {user1Id : user2 , user2Id : user1}

		     ]
	}

	return Chat.find(filter);
});

Meteor.publish('showChatNotification' , function(){
	return Chat_Notification.find({"notification_owner" : this.userId , "read" : false})
});

Meteor.publish('getChatMessage' , function(chatId) {
	return Chat.find(chatId);
});

Meteor.publish('userList' , function(){
	return Meteor.users.find({});
});

Meteor.publish('code' , function(){
	return Code.find({} , {"_id" : 0 , "generate" : 1});
});

Meteor.publish('getUnreadMessages' , function() {
	return Contact_Message.find({"message_read" : false} , {sort : {"date" : 1}});
});


Meteor.publish('getContactMessage' , function(msgIg) {
	return Contact_Message.find({"_id" : msgIg});
});

Meteor.publish('getArchivedMessages' , function() {
	return Contact_Message.find({"message_read" : true} , {sort : {"date" : 1}});
});

Meteor.publish('getArchivedMessageCount' , function() {
	return Contact_Message.find({"message_read" : true} , {"_id" : 1});
});

Meteor.publish('showArchiveMessageDetails' , function(msgId) {
	return Contact_Message.find({"_id" : msgId});
});

Meteor.publish('showAdvert' , function() {
	return Advert.find({"advert_active" : true});
});

Meteor.publish('getOneAdvert' , function(id) {
	return Advert.find(id);
});

Meteor.publish('showAllAdvert' , function() {
	return Advert.find();
});


