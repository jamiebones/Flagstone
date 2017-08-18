

Template.viewContactMessage.events({
	'click #btnActedUpon': function (event , template) {
		event.preventDefault();
		let button = $('#btnActedUpon');
		button.attr('disabled' , true).text('Please wait');
		let userId = Meteor.userId();
		let msgId = event.currentTarget.dataset.id
		if (msgId){
			Meteor.call('MessageActedUpon', msgId, userId , function (error, result) {
				if (! error){
					    sAlert.success('Message acted upon', {effect: 'genie', 
    					position: 'top-right', timeout: 2000, onRouteClose: false, stack: false, offset: '80px'});
    					button.attr('disabled' , false).text('Act on Message');
				}

				else{
					alert(error.reason);
					button.attr('disabled' , false).text('Act on Message');
				}

		      });
		}
		
	}
});



Template.viewContactMessage.helpers({
	getMessage(){
		return this.message;	
	},
	
});


//archivedMessage events and helpers


Template.archivedMessage.events({
	'click .js-viewArchiveMessage' : function(event , template){
		event.preventDefault
		let id = event.currentTarget.dataset.id;
		let alink = $(event.currentTarget);
		let link = alink.closest('li');
		//link.toggleClass('active');
		
		if (id){
			Session.set('sessionArchivedMessageId', id);
		}

	}
});

Template.archivedMessage.helpers({
	getArchivedMessage(){
		return this.message;	
	}

});



//viewMessageArchiveDetails events and helpers

Template.viewMessageArchiveDetails.onCreated(function(){
	let template = Template.instance();
	Tracker.autorun( () =>{
		Meteor.subscribe('showArchiveMessageDetails' , Session.get('sessionArchivedMessageId'))
	});
});




Template.viewMessageArchiveDetails.helpers({
	getMessage(){
		let msgId = Session.get('sessionArchivedMessageId');
		if (msgId){
			return Contact_Message.find({"_id" : msgId}).fetch();
		}
		
	}
})

