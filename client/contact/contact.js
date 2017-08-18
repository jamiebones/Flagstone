
Template.contact.onCreated(function(){
	let template = Template.instance();
	template.subscribe('showAdvert');
})



Template.contact.rendered = function() {  
       
        $('#sendMsg').validate();       
};




Template.contact.events({
	'submit form#sendMsg' : function(event , template){
		event.preventDefault();
		let button = $('#btnSendMsg');
		button.attr('disabled' , true).text('Sending Message Please Wait---------');
		let name = template.find('[name="name"]').value,
		    email = template.find('[name="email"]').value,
		    phone = template.find('[name="phone"]').value,
		 message = template.find('[name="message"]').value.trim(),
		 subject = template.find('[name="subject"]').value.trim();

		 let messageObj = {}

		 messageObj.name = name;
		 
		 if (phone !== ''){
		 	 messageObj.phone = phone;
		 }

		 if (subject !== ''){
		 	messageObj.subject = subject;
		 }

		 if (email !== ''){
		 	messageObj.email = email;
		 }
		
		 messageObj.message = message;
		 messageObj.message_read = false;
		 messageObj.date = new Date();
		 Meteor.call('saveMessage', messageObj, function (error, result) {
		 	if (! error){
		 		sAlert.success('Your message has been sent. We will contact you as soon as possible');
		 		

		 		//send an email letting the administrator know that the comment has been posted on the website.
       
            		 let emailObj = {};
            		 emailObj.to = "jamiebones2000@yahoo.co.uk";
            		 emailObj.from = "[FlagStone Properties] <noreply@flagstoneholdings.com>";
            		 emailObj.subject = '[Flagstone Client Message] :  ' + subject;
            		 emailObj.text = " "  +  "\n" + "Email Address & Phone :" + email + " - " + "\n"  + phone + "\n" + "\n" + "\n"  + message + " "
                     emailObj.html = "<p>"  +  "\n" + "Email Address & Phone :" + email + " - "  + "\n" + phone + "\n" + "\n" + "\n"  + message + "</p>"
                     //clear the textboxes of all values
				 		$('#name').val('');
				        $('#email').val('');
				        $('#phone').val('');
				        $('#message').val('');
				        $('#subject').val('');
				        button.attr('disabled' , false).text('Send');

						Meteor.call('sendAdminPropertySubmissionEmail' , emailObj ,(error,result) =>{
							  if (error){
							  	alert(error.reason);
							  	Meteor.setTimeout(()=>{
							  		Meteor.call('sendAdminPropertySubmissionEmail' , emailObj , (error) => {
							  			if (error){
							  				
							  			}
							  		})

							  	}, 3000)
							  }
							

					    });
		 	       }
		 	       else{
		 	       	//there was an error
		 	       	 button.attr('disabled' , false).text('Send');
		 	       }
		 });

	}
});