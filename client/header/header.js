
Template.header.onCreated(function(){
	let template = Template.instance();
	template.subscribe('showChatNotification');
	template.subscribe('getUnreadMessages');
	template.subscribe('getArchivedMessageCount');
	
     //if (Session.get('playNotification')){
           // let audio = new Audio('audio/popsound.mp3');
            //audio.play();
         //}
	
});




Template.header.rendered = function (){
        let template = Template.instance();
        if (! Session.get('showChat')){
            template.$('.panel-chat').toggleClass('hide');
        }    
        template.$('.subSmall').addClass('animated slideInLeft infinite');
};




Template.header.helpers({
	isSearchSaved (){
		if (localStorage){
			let storedData = localStorage.getItem('savedPropertySearch');
			if (storedData !== null){
				storedData = JSON.parse(storedData);
				if (storedData.length === 0){
					return false;
				}
				else{
					return true;
				}
			}
		}
	},

	showChatNotification(){
		return Chat_Notification.find({}).fetch();
	},

	showUnreadMessage(){
		return Contact_Message.find({"message_read" : false} , {sort : {"date" : 1}}).fetch();
	},

	showArchivedMessage(){
	  return Contact_Message.find({"message_read" : true}).fetch();
	}
});


Template.header.events({
	'click .js-showNotification' : function(event, template){
		event.preventDefault();
		let chatId = event.currentTarget.dataset.chatid;
		Session.set('loginUserChatId', chatId);
		Meteor.call('updateChatNotification', chatId, function (error, result) {});

		let chatPanel = $('.panel-chat');
		if (chatPanel.hasClass('hide')){
		   chatPanel.toggleClass('hide');
		}
		Session.set('showChat' , true);
		Router.go('/view_chat/?chatId=' + chatId);
	},

	'click .js-unreadMsg' : function(event, template){
		event.preventDefault();
		let msgId = event.currentTarget.dataset.id;
		Router.go('/view_message_details/?msgId=' + msgId);

    },

    'mouseover .bigLetters' : function(event , template){
    	debugger;
    	event.preventDefault();
    	$('.bigLetters').animateCss('bounce');
    }


});


$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});