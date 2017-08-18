
//methods

Meteor.methods({

	sendEmail: function (to, from, subject, text , html) {
    check([to, from, subject, text ,html], [String]);
    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    Email.send({
      to: to,
      from: from,
      subject: subject,
      text: text,
      html:html
    });
  },

	sendAdminPropertySubmissionEmail : function(emailObj){
		Email.send({
			to: emailObj.to,
			from: emailObj.from,
			subject: emailObj.subject,
			text: emailObj.text,
			html : emailObj.html
		});

	},


	saveSubscription : function(subscription){
		check(subscription , EmailSubscription_Schema);
		return EmailSubscription.insert(subscription);
	},

	updateChat:function(chatId , msgObj){
		//check(chat, Chat_Schema);
		return Chat.update(chatId , {$push : {message:msgObj}});
   },


  insertChat:function (chatObj){
  	//check(chatObj , Chat_Schema);
  	return Chat.insert(chatObj);   
},

 insertChatNotification : function(notificationObj){
 	return Chat_Notification.insert(notificationObj);
},

updateChatNotification : function(chatId){
	return Chat_Notification.update({"chatId" : chatId} , 
		{$set : {read : true}} , { multi: true });
},

updateUserRole : function(userId , role){
	if (!Roles.userIsInRole(userId ,[role] , 'flagstone')){
		 Roles.setUserRoles(userId , role , 'flagstone');
	}
},

deleteUserAccount : function(userId){
	return Meteor.users.remove(userId);
},

insertCode:function (code){
  	//check(chatObj , Chat_Schema);
  	return Code.insert(code);   
},

exportAllContacts : function(){
	return Code.find({} , {"_id" : 0}).fetch();
},

saveMessage : function(messageObject) {
	check(messageObject ,Contact_Message_Schema);
	return Contact_Message.insert(messageObject);
},

MessageActedUpon : function(msgId , userId){
	return Contact_Message.update(msgId , {$set : 
		         {"acted_upon" : userId , "message_read" : true}});
},

 removeAdvertImage: function (selectedPhotoUrl , id){
      check( selectedPhotoUrl, String );
	  let bucket = Meteor.settings.BucketName;

	    // URL string: e.g. https://mybucket.s3.amazonaws.com/images/myimage.jpg is saved in DB,
	    // I only want: 'images/myimage.jpg'
	    //var currentPhotoURL = currentPhoto.url.replace('https://' + bucket + '.s3.amazonaws.com/', '');

	    var splitUrl = selectedPhotoUrl.split('/');
        var deleteUrl = splitUrl[splitUrl.length - 2] + '/' + splitUrl[splitUrl.length - 1];

	    AWS.config.update({
	      accessKeyId: Meteor.settings.AWSAccessKeyId,
	      secretAccessKey: Meteor.settings.AWSSecretAccessKey,
	    });

	    var s3 = new AWS.S3();
	    var params = {
	      Bucket: bucket, // 'mybucket'
	      Key: deleteUrl // 'images/myimage.jpg'
	    };

	    var deleteObject = Meteor.wrapAsync(
	    s3.deleteObject(params, Meteor.bindEnvironment(function (error, data) {
	        if (error) {
	          console.log(error);
	        }
	        else {
	          if (id){
	          		Advert.remove({"_id" : id});
	          }
	        	
	           // Remove the entry in the database. (Want to only trigger this if there is no error from Amazon).     
	        }
	      }))
	    );
   
  },

  saveAdvertName : function(adObj){
  		return Advert.insert(adObj);
  },

  saveAdvert : function(id , url){
  	return Advert.update(id , {$set : {'imageUrl' : url}});
  },

   updateAdvertActive : function(id , option){
  	return Advert.update(id , {$set : {'advert_active' : option}});
  },

   updateStatus : function(id , status){
  	return Advert.update(id , {$set : {'advert_active' : status}});
  },

  deleteAdvert : function(id){
  	return Advert.remove(id);
  }
});



