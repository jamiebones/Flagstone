
Template.chat.onCreated(function(){
	let template = Template.instance();
	template.chatId = new ReactiveVar();
    template.clickUserId = new ReactiveVar();
    template.messageSent = new ReactiveVar(false);
    template.soundBell = new ReactiveVar(false)
	template.subscribe('userStatus');
    
	template.autorun(function(){
        //sound the funcking bell if a new message is received
        if (template.soundBell.get()){
           if  (Session.get('playNotification')){
                let audio = new Audio('audio/popsound.mp3');
                audio.play();
                template.soundBell.set(false);
            }
        }

		template.subscribe('getPreviousChatMessage' , template.chatId.get());
         let o = template.messageSent.get();
         
	})

});


Template.chat.rendered = function (){
        let template = Template.instance();
        if (!Session.get('showChat')){
            template.$('.panel-chat').toggleClass('hide');
        }
        
        
};


Template.chat.events({
    'click .closeChat' : function(event , template){
        event.preventDefault();
        $('.panel-chat').toggleClass('hide');
    	
    },

    'click .js-startChat' : function(event , template){
    	event.preventDefault();
        let chatPanel = $('.panel-chat');
        chatPanel.toggleClass('hide');
        
        template.clickUserId.set(event.currentTarget.dataset.id);
        if (! Meteor.userId()){
            //check if there is a localStorage key set on the browser
            if (localStorage){
                let userKey = localStorage.getItem('clientUserKey');
                if (! userKey){
                    //no key saved yet save the key on the system for the client
                    let key = FlagStone.CreateGuid()
                    localStorage.setItem('clientUserKey' , key);

                    //insert a new chat based on the id
                    let user1Id = key
                    let user2Id = event.currentTarget.dataset.id;
                    let message = [];
                    let chatObj = {}
                    chatObj.user1Id = user1Id;
                    chatObj.user2Id = user2Id;
                    chatObj.message = message
                    Meteor.call('insertChat', chatObj, function (error, result) {
                        if (result){
                            template.chatId.set(result);
                            template.soundBell.set(true);
                        }
                    });

                }

                else{
                    debugger;
                    //theres a key find out if the key is associated with that particular selected person to chat with
                    let user1 = localStorage.getItem('clientUserKey');
                    let user2 = event.currentTarget.dataset.id;
                    let message = [];

                    let handle = Meteor.subscribe('getChatId' , user1 , user2);
                    Tracker.autorun(function(){
                        if (handle.ready()){
                            let filter = {
                             $or : [ 
                                      {user1Id : user1 , user2Id : user2},
                                      {user1Id : user2 , user2Id : user1}

                                ]
                            }
                            let chat = Chat.findOne(filter);
                            if (chat){
                                debugger;
                                 
                                  template.chatId.set(chat._id);
                            }

                            else{
                                let chatObj = {}
                                chatObj.user1Id = user1;
                                chatObj.user2Id = user2;
                                chatObj.message = message
                                Meteor.call('insertChat', chatObj, function (error, result) {
                                 if (result){
                                   template.chatId.set(result);
                                   template.soundBell.set(true);
                               }
                    });
                            }
                          
                      }
                    })
                    
                }
            }
                 //no localstorage fall back to something else
               else{
                    alert('Please update your browser so that you can chat with us. Thank you');
                    return false;
            }
           

        
        }

        //chat initiated by someone who is login into the system
        else{




        }

      
    	

    	
    },

    'click .js-btnChat' : function(event , template){
    	event.preventDefault();
        debugger;
        let chatMsg = $(".js-chatMsg").val();
        if (chatMsg == ''){
            return false
        }
        //get the userId of the people who initiated the chat
         let userId = localStorage.getItem('clientUserKey');
         if (! Meteor.userId()){
            
              let chat = Chat.findOne(template.chatId.get());
              if (chat){
                Session.set('playNotification', true);
                let chatId = chat._id;
                let msgObj = {};
                msgObj.message = $(".js-chatMsg").val()
                msgObj.userId = userId;
                msgObj.date = new Date();

                Meteor.call('updateChat', chatId, msgObj, function (error, result) {
                    if (result){
                        template.messageSent.set(true);
                        
                        //i am saving the notification object here so that the loggin user can get to see it
                        //this is not the best way to go about this but i will definetely give it another lookup
                        //maybe when i am kind of less sober.
                        let notifObj = {}
                        notifObj.chatId = chatId;
                        notifObj.notification_owner = template.clickUserId.get();
                        notifObj.message = $(".js-chatMsg").val();
                        notifObj.read = false;
                        notifObj.date = new Date();
                        Meteor.call('insertChatNotification', notifObj, function (error, result) {
                            if (! error){
                                $(".js-chatMsg").val('');
                                 template.soundBell.set(true);
                            }

                            });
                        };
                    });
                };
        }

         //chat between people that have login in the system

          else {
            debugger;
              let user = Meteor.userId();
              let chatId = Session.get('loginUserChatId');
              let chat = Chat.findOne(chatId);
              if (chat){
                Session.set('playNotification', true);
                let chatId = chat._id;
                let msgObj = {};
                msgObj.message = $(".js-chatMsg").val()
                msgObj.userId = user;
                msgObj.date = new Date();

                Meteor.call('updateChat', chatId, msgObj, function (error, result) {
                    if (result){
                        template.messageSent.set(true);
                        $(".js-chatMsg").val('');
                        template.soundBell.set(true);
                    }
                });


              }

         }

    },

    'focus .js-chatMsg' : function(event , template){
        event.preventDefault();
        let chatId = Session.get('loginUserChatId');
        if (chatId){
            Meteor.call('updateChatNotification', chatId, function (error, result) {});
        }
        
    },

    'click #btn-LeaveMsg': function (event , template) {
        event.preventDefault();
        Router.go('/contactus')
    }       
});



Template.chat.helpers({
	onlineUsers(){
		//let onlineUsers = Meteor.users.find({"status.online": true });
		let onlineUsers = Meteor.users.find({_id : {$not : Meteor.userId()}});
		return onlineUsers;
	},

    getMessage(){
        let chatId = Template.instance().chatId.get()
        let previousMessage = Chat.findOne(chatId);
        return previousMessage
    },

    getMessageLoginUser(){
        let chatId = Session.get('loginUserChatId');                   
        let previousMessage = Chat.findOne(chatId);
        console.log(previousMessage);
        return previousMessage
    },


    


});



